"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Compass,
  Sun,
  CloudRain,
  Sunset,
  Moon,
  Flame,
  Droplets,
  Music,
  Eye,
  ChevronDown,
  Clock,
  Layers,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

interface HeroDioramaProps {
  weather: WeatherMode;
  setWeather?: (w: WeatherMode) => void;
  onSelectOriginBonus: () => void;
  onBonusWallet?: (amount: number) => void;
}

const LIVING_WORLD_STATES: Record<
  WeatherMode,
  {
    id: WeatherMode;
    label: string;
    timeRange: string;
    title: string;
    atmosphereDesc: string;
    lightingSpec: string;
    npcActivity: string;
    npcName: string;
    npcPortrait: string;
    sceneFilter: string;
    overlayClass: string;
    emissiveOpacity: number;
  }
> = {
  sun: {
    id: "sun",
    label: "Bình Minh Nắng Sớm",
    timeRange: "06:00 — 11:30",
    title: "Nắng Sớm Chiếu Qua Tán Dừa & Sương Mai Tan Trên Ao Sen",
    atmosphereDesc:
      "Ánh nắng ban mai ấm áp chiếu xiên qua rặng dừa Bến Dừa, làm bừng sáng mái ngói miếu cổ và những luống rau muống còn đọng sương đêm.",
    lightingSpec: "Directional Warm Sunlight (#F2D39B) • Tán xạ hạt nắng nhẹ • Bóng đổ tự nhiên",
    npcActivity: "Cô Sáu Hiền dọn sạp rau củ tươi mới hái ra chợ sớm; Bà Ngoại quét lá ngoài hiên.",
    npcName: "Cô Sáu Hiền",
    npcPortrait: "/game-assets/pixel/portrait-vendor-talk.png",
    sceneFilter: "brightness-[1.03] saturate-[1.08]",
    overlayClass: "from-[#142C2A]/35 via-transparent to-[#0E1F1D]/90",
    emissiveOpacity: 0,
  },
  rain: {
    id: "rain",
    label: "Mưa Rào Miền Tây",
    timeRange: "13:30 — 15:30",
    title: "Cơn Mưa Rào Nhiệt Đới Tưới Mát Mảnh Vườn Quê",
    atmosphereDesc:
      "Những hạt mưa chéo rơi xuống mặt ao tạo vòng sóng gợn lăn tăn. Cơn mưa tự động tưới ẩm ba luống đất sau hè mà người chơi không cần múc nước.",
    lightingSpec: "Cool Overcast Ambient (#1E293B) • Hiệu ứng gợn nước mặt đất • Sương ẩm nhẹ",
    npcActivity: "Bà con kéo bạt che sạp hàng; Ông Thổ Địa đứng dưới mái hiên miếu phe phẩy quạt mo.",
    npcName: "Ông Thổ Địa",
    npcPortrait: "/game-assets/pixel/portrait-tho-dia.png",
    sceneFilter: "brightness-[0.82] contrast-[1.08] saturate-[0.9]",
    overlayClass: "from-slate-950/55 via-sky-950/25 to-[#0E1F1D]/92",
    emissiveOpacity: 0.25,
  },
  sunset: {
    id: "sunset",
    label: "Hoàng Hôn Bến Nước",
    timeRange: "16:30 — 18:30",
    title: "Ráng Chiều Đỏ Cam & Tiếng Đờn Kìm Vọng Cổ Bên Bến Đò",
    atmosphereDesc:
      "Bầu trời chuyển sắc vàng cam ấm áp phản chiếu xuống dòng kênh. Khói bếp từ những mái nhà bắt đầu bay lên, báo hiệu giờ cơm chiều sum họp.",
    lightingSpec: "Golden-Hour Directional Gradient (#FB923C -> #A96745) • Chớm sáng đèn dầu (45%)",
    npcActivity: "Nghệ nhân Vinh mang đờn kìm ra bến đò so dây, dạo khúc vọng cổ chiều quê.",
    npcName: "Nghệ Nhân Vinh",
    npcPortrait: "/game-assets/pixel/portrait-npc-vinh-talk.png",
    sceneFilter: "brightness-[0.94] sepia-[0.16] saturate-[1.25]",
    overlayClass: "from-amber-950/45 via-rose-950/20 to-[#0E1F1D]/92",
    emissiveOpacity: 0.55,
  },
  night: {
    id: "night",
    label: "Đêm Đèn Lồng & Đom Đóm",
    timeRange: "19:30 — 04:30",
    title: "Đêm Tĩnh Mịch, Đom Đóm Bay & Ánh Đèn Dầu Miếu Cổ",
    atmosphereDesc:
      "Khi màn đêm buông xuống, lớp bản đồ phát sáng (Emissive Pass) của Miếu Ông Thổ Địa và đèn lồng tự động rực sáng giữa những đàn đom đóm lập lòe.",
    lightingSpec: "Deep Night Ambient (#091413) • Dual-Pass Emissive Light Mask (100%) • Đom đóm điểm sáng",
    npcActivity: "Chú Mười và bà con ngồi uống trà trước hiên nhà, nghe đài phát thanh đêm khuya.",
    npcName: "Chú Mười",
    npcPortrait: "/game-assets/pixel/portrait-npc-dung-talk.png",
    sceneFilter: "brightness-[0.58] contrast-[1.15] saturate-[0.88]",
    overlayClass: "from-[#060E0D]/75 via-[#091514]/45 to-[#0E1F1D]/95",
    emissiveOpacity: 1,
  },
};

export default function HeroDiorama({
  weather,
  setWeather,
  onSelectOriginBonus,
  onBonusWallet,
}: HeroDioramaProps) {
  const [inspectWorld, setInspectWorld] = useState(false);
  const [showEmissiveOnly, setShowEmissiveOnly] = useState(false);
  const [incenseCount, setIncenseCount] = useState(0);
  const [moCombo, setMoCombo] = useState(0);
  const [wateredCount, setWateredCount] = useState(0);
  const [actionToast, setActionToast] = useState<string | null>(null);

  useEffect(() => {
    if (!inspectWorld) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectWorld(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [inspectWorld]);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 2600);
  };

  const handleLightShrineIncense = () => {
    const next = incenseCount + 1;
    setIncenseCount(next);
    soundEngine.playBronzeGong();
    soundEngine.playSfx("fire-crackle", 0.45);
    if (next === 1) {
      onSelectOriginBonus();
      triggerToast("Đã thắp nén nhang đầu mùa (+1 Lượt Quay Lộc)");
    } else {
      onBonusWallet?.(500);
      triggerToast("Hương trầm lan tỏa (+500 Xu Làng)");
    }
  };

  const handleKnockBambooMo = () => {
    const next = moCombo + 1;
    setMoCombo(next);
    soundEngine.playBambooPegTick(Math.min(1, 0.35 + (next % 8) * 0.08));
    onBonusWallet?.(200);
    triggerToast(`Tiếng mõ tre thanh tịnh (+200 Xu Làng)`);
  };

  const handleScoopRainwater = () => {
    const next = wateredCount + 1;
    setWateredCount(next);
    soundEngine.playSfx("water", 0.55);
    onBonusWallet?.(300);
    triggerToast("Nước mưa mát lành từ lu đất nung (+300 Xu Làng)");
  };

  const currentLivingState = LIVING_WORLD_STATES[weather];

  return (
    <>
      {/* =====================================================================
          SECTION 10: CINEMATIC HERO SECTION
      ====================================================================== */}
      <section
        id="cong-lang"
        aria-label="Giới thiệu TRẢI ĐỜI"
        className="relative min-h-[88vh] pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none"
      >
        {/* HERO DIORAMA CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden border border-[#F2D39B]/35 shadow-[0_28px_80px_rgba(0,0,0,0.85)] min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Corner Traditional Wood Ornaments */}
          <img
            src="/game-assets/ornaments/decor/corner-wood-tl.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 left-3 w-8 h-8 object-contain pixelated z-30 pointer-events-none opacity-85"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-tr.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 right-3 w-8 h-8 object-contain pixelated z-30 pointer-events-none opacity-85"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-bl.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-3 left-3 w-8 h-8 object-contain pixelated z-30 pointer-events-none opacity-85"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-br.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-3 right-3 w-8 h-8 object-contain pixelated z-30 pointer-events-none opacity-85"
          />

          {/* BACKGROUND LAYER: Authentic Xóm Bến Dừa World Scene + Controlled Lighting */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#0E1F1D]">
            <img
              src="/game-assets/screenshots/world-thodia.png"
              alt="Khung cảnh Xóm Bến Dừa và Miếu Ông Thổ Địa trong TRẢI ĐỜI"
              className={`w-full h-full object-cover object-center pixelated transition-all duration-1000 ${currentLivingState.sceneFilter}`}
            />
            {/* Directional Sunlight / Atmospheric Vignette Overlay for Readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-t transition-colors duration-1000 ${currentLivingState.overlayClass}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F1D]/90 via-[#0E1F1D]/45 to-transparent" />
          </div>

          {/* TOP BAR: Development Status Pill & Clean View Toggle */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1F1D]/85 backdrop-blur-md border border-[#F2D39B]/40 text-xs font-semibold text-[#F7F3E8]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Bản thử nghiệm Pixel Build #658 • Định hướng dài hạn: Unity 6 Stylized 3D
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setInspectWorld(!inspectWorld);
                soundEngine.playSfx("interact", 0.35);
              }}
              className="inline-flex items-center gap-2 bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/45 text-[#F7F3E8] px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#F2D39B]" />
              <span>{inspectWorld ? "Hiện Nội Dung Giới Thiệu" : "Ngắm Trọn Cảnh Làng"}</span>
            </button>
          </div>

          {/* CENTER: BRAND STORYTELLING & CLEAR VALUE PROPOSITION */}
          <AnimatePresence>
            {!inspectWorld && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45 }}
                className="relative z-20 my-auto max-w-2xl py-6"
              >
                <div className="mb-2">
                  <BitmapWoodText
                    text="TRẢI ĐỜI"
                    size="hero"
                    align="left"
                    as="h1"
                  />
                </div>

                <p
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F7F3E8] leading-snug mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                >
                  Một thế giới Việt Nam để sống, khám phá và kết nối.
                </p>

                <p className="text-sm sm:text-base text-[#D9D2C5] leading-relaxed mb-6 max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  Bắt đầu từ Xóm Bến Dừa miền Tây. Gặp gỡ những con người thân thuộc, tự tay chăm sóc mảnh vườn quê ngoại, khám phá 5 vùng đất văn hóa và tạo nên câu chuyện của riêng mình.
                </p>

                {/* Primary & Secondary CTAs (Pointing to Real Interactive Sections) */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#vuon-nha-ngoai"
                    onClick={() => soundEngine.playBronzeGong()}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-[#FFF3C4] via-[#F2D39B] to-[#C88412] text-[#142C2A] font-extrabold text-sm sm:text-base shadow-[0_6px_0_#3A1D08,0_16px_35px_rgba(0,0,0,0.75)] hover:brightness-105 active:translate-y-0.5 transition-all"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Chơi Thử Tương Tác Ngay</span>
                  </a>

                  <a
                    href="#ban-do-viet-nam"
                    onClick={() => soundEngine.playSfx("interact", 0.4)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#142C2A]/90 hover:bg-[#2B6657]/80 border border-[#F2D39B]/50 text-[#F7F3E8] font-bold text-sm sm:text-base backdrop-blur-md transition-all"
                  >
                    <Compass className="w-4 h-4 text-[#F2D39B]" />
                    <span>Khám Phá 5 Vùng Đất</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTTOM BAR: Ambient NPC Greeting & Subtle Scroll Cue */}
          <div className="relative z-20 flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-[#F2D39B]/20">
            <div className="flex items-center gap-3 bg-[#0E1F1D]/85 backdrop-blur-md border border-[#F2D39B]/30 rounded-2xl px-3.5 py-2 max-w-md">
              <div className="shrink-0 -my-1">
                <ThoDiaAnimatedSprite mode="laugh" size={56} />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]">
                  Ông Thổ Địa Bến Dừa
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#F7F3E8] leading-snug">
                  “Mới về xóm nhỏ hả con? Chuyển thử Nắng — Mưa — Chiều — Đêm ở góc trên để ngắm cảnh quê mình nghen!”
                </p>
              </div>
            </div>

            <a
              href="#the-living-world"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9D2C5] hover:text-[#F2D39B] transition-colors py-1"
            >
              <span>Cuộn xuống khám phá thế giới</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#F2D39B]" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11: THE LIVING WORLD (THẾ GIỚI SỐNG ĐỘNG THEO THỜI GIAN)
      ====================================================================== */}
      <section
        id="the-living-world"
        aria-label="Thế giới sống động theo thời gian và thời tiết"
        className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
      >
        <div className="mb-10">
          <Wood3DPlaqueTitle
            eyebrow="MÔI TRƯỜNG & ÁNH SÁNG SỐNG ĐỘNG"
            title="THẾ GIỚI THỞ THEO NHỊP THỜI GIAN"
            subtitle="Chuyển đổi giữa Sáng, Mưa, Hoàng Hôn và Đêm để quan sát cách ánh sáng môi trường, bản đồ phát sáng (Emissive Pass) và nhịp sinh hoạt của cư dân thay đổi."
            align="center"
            size="xl"
          />
        </div>

        {/* 4 Time/Weather Selector Tabs */}
        <div
          role="tablist"
          aria-label="Chọn thời gian và thời tiết trong Xóm Bến Dừa"
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6"
        >
          {(
            [
              { id: "sun", icon: <Sun className="w-4 h-4" /> },
              { id: "rain", icon: <CloudRain className="w-4 h-4" /> },
              { id: "sunset", icon: <Sunset className="w-4 h-4" /> },
              { id: "night", icon: <Moon className="w-4 h-4" /> },
            ] as const
          ).map((item) => {
            const st = LIVING_WORLD_STATES[item.id];
            const active = weather === item.id;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => {
                  setWeather?.(item.id);
                  soundEngine.playSfx(item.id === "rain" ? "water" : "interact", 0.4);
                }}
                className={`flex flex-col items-start p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? "bg-[#2B6657]/55 border-[#F2D39B] shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    : "surface-editorial hover:border-[#F2D39B]/45"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F2D39B]">
                    {item.icon}
                    <span>{st.label}</span>
                  </span>
                  <span className="text-[11px] font-medium text-[#D9D2C5]">
                    {st.timeRange}
                  </span>
                </div>
                <span className="text-xs text-[#D9D2C5] line-clamp-1">
                  {st.npcName}: {st.npcActivity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Split Showcase: Live Environment Viewport + Atmospheric Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 7 Cols: Interactive Lighting & Emissive Stage */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#F2D39B]/35 bg-[#081211] min-h-[360px] sm:min-h-[420px] flex flex-col justify-between p-5">
            <img
              src="/game-assets/screenshots/world-thodia.png"
              alt={currentLivingState.title}
              className={`absolute inset-0 w-full h-full object-cover pixelated transition-all duration-700 ${
                showEmissiveOnly
                  ? "brightness-[0.18] contrast-[1.3] saturate-[0.5]"
                  : currentLivingState.sceneFilter
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${currentLivingState.overlayClass}`}
            />

            {/* Top Lighting Spec Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/35 text-xs font-semibold text-[#F2D39B]">
                <Clock className="w-3.5 h-3.5" />
                <span>Khung giờ game: {currentLivingState.timeRange}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setShowEmissiveOnly((prev) => !prev);
                  soundEngine.playSfx("interact", 0.35);
                }}
                aria-pressed={showEmissiveOnly}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  showEmissiveOnly
                    ? "bg-[#F2D39B] text-[#142C2A] border-[#F7F3E8]"
                    : "bg-[#0E1F1D]/90 text-[#F7F3E8] border-[#F2D39B]/35 hover:border-[#F2D39B]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {showEmissiveOnly ? "Đang soi lớp Emissive Light" : "Soi lớp phát sáng (Emissive)"}
                </span>
              </button>
            </div>

            {/* Center Shrine Emissive Demonstration Card */}
            <div className="relative z-10 my-auto mx-auto flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0E1F1D]/80 backdrop-blur-md border border-[#F2D39B]/45 flex items-center justify-center p-3 shadow-2xl">
                <img
                  src="/game-assets/pixel/mieu.png"
                  alt="Miếu Ông Địa"
                  className={`w-20 h-20 object-contain pixelated transition-all duration-500 ${
                    showEmissiveOnly ? "brightness-[0.25]" : ""
                  }`}
                />
                <img
                  src="/game-assets/pixel/tho-dia-mieu__emit.png"
                  alt="Lớp ánh sáng đèn dầu Miếu Ông Địa"
                  style={{
                    opacity: showEmissiveOnly ? 1 : currentLivingState.emissiveOpacity,
                  }}
                  className="absolute inset-0 m-auto w-20 h-20 object-contain pixelated mix-blend-screen transition-opacity duration-500 drop-shadow-[0_0_16px_rgba(245,158,11,0.95)]"
                />
              </div>
              <span className="mt-2 px-3 py-0.5 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/30 text-[11px] font-semibold text-[#F2D39B]">
                Miếu Đỏ + Lớp phát sáng{" "}
                {Math.round((showEmissiveOnly ? 1 : currentLivingState.emissiveOpacity) * 100)}%
              </span>
            </div>

            {/* Bottom Description Overlay */}
            <div className="relative z-10 bg-[#0E1F1D]/90 backdrop-blur-md border border-[#F2D39B]/25 rounded-2xl p-4">
              <h3 className="text-base sm:text-lg font-bold text-[#F7F3E8] mb-1">
                {currentLivingState.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D9D2C5] leading-relaxed">
                {currentLivingState.atmosphereDesc}
              </p>
            </div>
          </div>

          {/* Right 5 Cols: Resident Schedule & Interactive Village Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Active Resident Schedule Box */}
            <div className="surface-elevated-card rounded-3xl p-5">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F2D39B] mb-2">
                Nhịp sống cư dân theo giờ ({currentLivingState.timeRange})
              </span>
              <div className="flex items-center gap-3.5 bg-[#0E1F1D]/80 border border-[#F2D39B]/25 rounded-2xl p-3.5 mb-3">
                <img
                  src={currentLivingState.npcPortrait}
                  alt={currentLivingState.npcName}
                  className="w-14 h-14 rounded-xl object-contain pixelated bg-[#142C2A] border border-[#F2D39B]/40 p-1 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#F7F3E8]">
                    {currentLivingState.npcName}
                  </h4>
                  <p className="text-xs text-[#D9D2C5] leading-relaxed mt-0.5">
                    {currentLivingState.npcActivity}
                  </p>
                </div>
              </div>
              <div className="text-xs text-[#9BA8A3] bg-[#0E1F1D]/60 rounded-xl px-3.5 py-2.5 border border-[#F2D39B]/15">
                <strong className="text-[#F2D39B]">Kỹ thuật ánh sáng: </strong>
                {currentLivingState.lightingSpec}
              </div>
            </div>

            {/* Interactive Village Life Micro-Actions (SVG Icons & Game Sprites, No Raw Emojis) */}
            <div className="surface-elevated-card rounded-3xl p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#F2D39B]">
                    Tương Tác Nhanh Tại Cổng Làng
                  </h3>
                  {actionToast && (
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-400/50 px-2.5 py-0.5 rounded-full">
                      {actionToast}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleLightShrineIncense}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/30 hover:border-[#F2D39B] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2B6657]/35 border border-[#F2D39B]/40 flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5 text-[#F2D39B]" />
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8]">
                          Thắp Hương Miếu Ông Địa
                        </span>
                        <span className="block text-[11px] text-[#D9D2C5]">
                          {incenseCount === 0
                            ? "Nhận +1 Lượt Quay Lộc đầu mùa"
                            : `Đã thắp ${incenseCount} nén nhang (+500 Xu Làng)`}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F2D39B]/15 text-[#F2D39B] text-xs font-bold shrink-0">
                      Thắp hương
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleKnockBambooMo}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/30 hover:border-[#F2D39B] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2B6657]/35 border border-[#F2D39B]/40 flex items-center justify-center shrink-0">
                        <Music className="w-5 h-5 text-[#F2D39B]" />
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8]">
                          Gõ Mõ Tre Đầu Làng
                        </span>
                        <span className="block text-[11px] text-[#D9D2C5]">
                          Âm thanh mộc mạc thanh tịnh (+200 Xu Làng • Nhịp {moCombo})
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F2D39B]/15 text-[#F2D39B] text-xs font-bold shrink-0">
                      Gõ nhịp
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleScoopRainwater}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/30 hover:border-[#F2D39B] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2B6657]/35 border border-[#F2D39B]/40 flex items-center justify-center shrink-0">
                        <Droplets className="w-5 h-5 text-sky-300" />
                      </div>
                      <div>
                        <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8]">
                          Múc Nước Mưa Lu Đất Nung
                        </span>
                        <span className="block text-[11px] text-[#D9D2C5]">
                          Nước mưa ngọt lành tưới rau (+300 Xu Làng • {wateredCount} gáo)
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F2D39B]/15 text-[#F2D39B] text-xs font-bold shrink-0">
                      Múc nước
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
