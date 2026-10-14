"use client";

import React, { useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import BitmapWoodText from "./BitmapWoodText";

export interface HeroDioramaProps {
  weather: WeatherMode;
  setWeather?: (w: WeatherMode) => void;
  onSelectOriginBonus: () => void;
  onBonusWallet?: (amount: number) => void;
}

interface WeatherPreset {
  id: WeatherMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  sceneFilter: string;
  overlayClass: string;
  emissiveOpacity: number;
  glowColor: string;
}

const WEATHER_PRESETS: WeatherPreset[] = [
  {
    id: "sun",
    label: "Ban ngày",
    icon: Sun,
    sceneFilter: "brightness-[1.04] saturate-[1.12]",
    overlayClass: "from-amber-950/20 via-transparent to-[#0E1F1D]/80",
    emissiveOpacity: 0.25,
    glowColor: "rgba(245, 158, 11, 0.45)",
  },
  {
    id: "rain",
    label: "Mưa rào",
    icon: CloudRain,
    sceneFilter: "brightness-[0.84] contrast-[1.08] saturate-[0.92]",
    overlayClass: "from-sky-950/35 via-slate-900/25 to-[#0E1F1D]/90",
    emissiveOpacity: 0.45,
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "sunset",
    label: "Hoàng hôn",
    icon: Sunset,
    sceneFilter: "brightness-[0.94] sepia-[0.2] saturate-[1.28]",
    overlayClass: "from-amber-950/35 via-rose-950/25 to-[#0E1F1D]/90",
    emissiveOpacity: 0.75,
    glowColor: "rgba(249, 115, 22, 0.75)",
  },
  {
    id: "night",
    label: "Đêm trăng",
    icon: Moon,
    sceneFilter: "brightness-[0.62] contrast-[1.18] saturate-[0.85]",
    overlayClass: "from-[#060E0D]/80 via-[#091514]/50 to-[#0E1F1D]/95",
    emissiveOpacity: 1.0,
    glowColor: "rgba(245, 158, 11, 0.95)",
  },
];

export default function HeroDiorama({
  weather,
  setWeather,
  onSelectOriginBonus,
  onBonusWallet,
}: HeroDioramaProps) {
  const [incenseCount, setIncenseCount] = useState<number>(0);
  const [wateredCount, setWateredCount] = useState<number>(0);
  const [moCombo, setMoCombo] = useState<number>(0);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => {
      setActionToast((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleLightShrine = () => {
    const next = incenseCount + 1;
    setIncenseCount(next);
    soundEngine.playBronzeGong();
    soundEngine.playSfx("fire-crackle", 0.5);
    onSelectOriginBonus();
    triggerToast("Thắp nhang Miếu Đỏ thành tâm (+1 Lượt quay)");
  };

  const handleScoopWater = () => {
    const next = wateredCount + 1;
    setWateredCount(next);
    soundEngine.playSfx("water", 0.6);
    onBonusWallet?.(2000);
    triggerToast("Múc nước lu mưa mát lành (+2.000 Xu Làng)");
  };

  const handleKnockMo = () => {
    const next = moCombo + 1;
    setMoCombo(next);
    soundEngine.playBambooPegTick(1.2);
    soundEngine.playSfx("bird", 0.5);
    onBonusWallet?.(1500);
    triggerToast("Gõ mõ tre ngân vang, chim ríu rít (+1.500 Xu Làng)");
  };

  const handleWeatherChange = (mode: WeatherMode) => {
    setWeather?.(mode);
    if (mode === "rain") {
      soundEngine.playSfx("water", 0.45);
    } else if (mode === "sun") {
      soundEngine.playSfx("bird", 0.4);
    } else {
      soundEngine.playSfx("interact", 0.35);
    }
  };

  const currentState =
    WEATHER_PRESETS.find((p) => p.id === weather) ?? WEATHER_PRESETS[0];

  const handleScrollTo = (targetId: string, fallbackId?: string) => {
    if (typeof document === "undefined") return;
    const el =
      document.getElementById(targetId) ||
      (fallbackId ? document.getElementById(fallbackId) : null);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="trang-chu"
      aria-label="TRẢI ĐỜI - Về xóm chơi!"
      className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-start select-none"
    >
      {/* Compatibility anchor bookmarks */}
      <span id="cong-lang" className="sr-only" />
      <span id="the-living-world" className="sr-only" />

      {/* HERO DIORAMA CONTAINER */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#F2D39B]/40 shadow-[0_24px_70px_rgba(0,0,0,0.85)] bg-[#0E1F1D] flex flex-col justify-between p-5 sm:p-8 lg:p-10 min-h-[520px] sm:min-h-[560px]">
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

        {/* BACKGROUND 2.5D SCENE: Authentic Xóm Bến Dừa Screenshot + Atmosphere Lighting */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0E1F1D]">
          <img
            src="/game-assets/screenshots/world-thodia.png"
            alt="Khung cảnh Xóm Bến Dừa trong TRẢI ĐỜI"
            className={`w-full h-full object-cover object-center pixelated transition-all duration-700 ${currentState.sceneFilter}`}
          />
          {/* Dynamic Atmosphere Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t transition-colors duration-700 ${currentState.overlayClass}`}
          />
          {/* Horizontal Gradient for Crystal Clear Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E1F1D]/92 via-[#0E1F1D]/60 sm:via-[#0E1F1D]/35 to-transparent" />
        </div>

        {/* TOP BAR: Living World Tag & Quick 4 Time/Weather Presets */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1F1D]/85 backdrop-blur-md border border-[#F2D39B]/40 text-xs font-semibold text-[#F7F3E8]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Xóm Bến Dừa • Miền Tây Nam Bộ</span>
          </div>

          {/* 4 Time/Weather Presets */}
          <div
            role="tablist"
            aria-label="Khung cảnh thời gian"
            className="inline-flex items-center p-1 rounded-2xl bg-[#0E1F1D]/90 backdrop-blur-md border border-[#F2D39B]/35 shadow-lg"
          >
            {WEATHER_PRESETS.map((item) => {
              const Icon = item.icon;
              const active = weather === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => handleWeatherChange(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#FFF3C4] to-[#F2D39B] text-[#142C2A] shadow-md scale-105"
                      : "text-[#D9D2C5] hover:text-[#F2D39B] hover:bg-[#142C2A]/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER: BRAND & HEADLINE & CTAs & 2.5D SHRINE SHOWCASE */}
        <div className="relative z-20 my-auto py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Column: Game Title, Headline, Description, CTAs */}
          <div className="max-w-xl text-left w-full">
            <div className="mb-2">
              <BitmapWoodText
                text="TRẢI ĐỜI"
                size="hero"
                align="left"
                as="div"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#FFF3C4] leading-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] tracking-tight">
              Về xóm chơi!
            </h1>

            <p className="text-base sm:text-lg text-[#F7F3E8] font-medium leading-relaxed mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Trồng rau, ghé chợ, nhận lộc và khám phá một Việt Nam đầy sắc màu.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#trong-rau"
                onClick={(e) => {
                  soundEngine.playBronzeGong();
                  e.preventDefault();
                  handleScrollTo("trong-rau", "vuon-nha-ngoai");
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-gradient-to-b from-[#FFF5CE] via-[#F2D39B] to-[#C88412] text-[#142C2A] font-black text-base sm:text-lg shadow-[0_6px_0_#3A1D08,0_16px_35px_rgba(0,0,0,0.7)] hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#3A1D08] transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>Chơi ngay</span>
              </a>

              <a
                href="#kham-pha"
                onClick={(e) => {
                  soundEngine.playSfx("interact", 0.4);
                  e.preventDefault();
                  handleScrollTo("kham-pha", "ban-do-viet-nam");
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#1A3833] border-2 border-[#F2D39B]/60 text-[#F7F3E8] font-bold text-base sm:text-lg backdrop-blur-md transition-all shadow-lg hover:border-[#F2D39B] cursor-pointer"
              >
                <Compass className="w-5 h-5 text-[#F2D39B]" />
                <span>Khám phá thế giới</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2.5D Living Shrine with Emissive Pass */}
          <div className="relative flex flex-col items-center">
            <div className="relative group p-4 sm:p-5 rounded-3xl bg-[#0E1F1D]/85 backdrop-blur-md border-2 border-[#F2D39B]/40 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col items-center">
              {/* Pulsing Emissive Halo */}
              <div
                className="absolute -inset-2 rounded-3xl blur-xl pointer-events-none transition-all duration-700"
                style={{
                  backgroundColor: currentState.glowColor,
                  opacity: currentState.emissiveOpacity,
                }}
              />

              {/* Shrine Sprite & Emissive Mask */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <img
                  src="/game-assets/pixel/mieu.png"
                  alt="Miếu Đỏ Bến Dừa"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain pixelated relative z-10 drop-shadow-[0_6px_14px_rgba(0,0,0,0.9)]"
                />
                <img
                  src="/game-assets/pixel/tho-dia-mieu__emit.png"
                  alt=""
                  aria-hidden="true"
                  style={{ opacity: currentState.emissiveOpacity }}
                  className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 object-contain pixelated mix-blend-screen transition-opacity duration-700 pointer-events-none drop-shadow-[0_0_20px_rgba(245,158,11,1)]"
                />
              </div>

              {/* Ong Tho Dia Greeting Pill */}
              <div className="flex items-center gap-2.5 mt-2 bg-[#142C2A]/90 border border-[#F2D39B]/30 rounded-xl px-3 py-1.5 relative z-10">
                <ThoDiaAnimatedSprite mode="laugh" size={32} />
                <div className="text-left">
                  <span className="block text-[10px] font-bold text-[#F2D39B] uppercase tracking-wider">
                    Miếu Đỏ Bến Dừa
                  </span>
                  <span className="block text-xs font-semibold text-[#F7F3E8]">
                    Khói hương ấm cúng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: 3 INTERACTIVE TOUCHPOINTS ON VILLAGE SCENE */}
        <div className="relative z-20 pt-4 border-t border-[#F2D39B]/25 flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#F2D39B]">
                Tương tác nhanh tại xóm
              </span>
              <span className="text-[11px] text-[#D9D2C5]/80 hidden sm:inline">
                (Chạm để nhận lộc và cảm nhận thế giới sống động)
              </span>
            </div>

            <AnimatePresence>
              {actionToast && (
                <motion.span
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  className="text-xs font-black text-amber-200 bg-[#3A1D08]/95 border border-[#F2D39B]/70 px-3 py-1 rounded-full shadow-lg"
                >
                  {actionToast}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* 3 Interactive Touchpoint Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* 1. Thắp nhang Miếu Đỏ */}
            <button
              type="button"
              onClick={handleLightShrine}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/35 hover:border-[#F2D39B] active:scale-[0.98] transition-all cursor-pointer group text-left shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8] group-hover:text-[#FFF3C4]">
                    Thắp nhang Miếu Đỏ
                  </span>
                  <span className="block text-[11px] text-amber-300 font-extrabold">
                    +1 Lượt quay
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#D9D2C5] bg-[#142C2A] px-2 py-0.5 rounded-md border border-[#F2D39B]/20 shrink-0">
                {incenseCount > 0 ? `Đã thắp ${incenseCount}` : "Chạm"}
              </span>
            </button>

            {/* 2. Múc nước lu mưa */}
            <button
              type="button"
              onClick={handleScoopWater}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/35 hover:border-[#F2D39B] active:scale-[0.98] transition-all cursor-pointer group text-left shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Droplets className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8] group-hover:text-sky-200">
                    Múc nước lu mưa
                  </span>
                  <span className="block text-[11px] text-sky-300 font-extrabold">
                    +2.000 Xu Làng
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#D9D2C5] bg-[#142C2A] px-2 py-0.5 rounded-md border border-[#F2D39B]/20 shrink-0">
                {wateredCount > 0 ? `Đã múc ${wateredCount}` : "Chạm"}
              </span>
            </button>

            {/* 3. Gõ mõ tre nghe chim hót */}
            <button
              type="button"
              onClick={handleKnockMo}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#0E1F1D]/85 hover:bg-[#142C2A] border border-[#F2D39B]/35 hover:border-[#F2D39B] active:scale-[0.98] transition-all cursor-pointer group text-left shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Music className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-[#F7F3E8] group-hover:text-emerald-200">
                    Gõ mõ tre nghe chim hót
                  </span>
                  <span className="block text-[11px] text-emerald-300 font-extrabold">
                    +1.500 Xu Làng
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#D9D2C5] bg-[#142C2A] px-2 py-0.5 rounded-md border border-[#F2D39B]/20 shrink-0">
                {moCombo > 0 ? `Nhịp ${moCombo}` : "Chạm"}
              </span>
            </button>
          </div>

          {/* Scroll Cue pointing to Trong rau */}
          <div className="flex justify-center pt-1">
            <a
              href="#trong-rau"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("trong-rau", "vuon-nha-ngoai");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9D2C5] hover:text-[#F2D39B] transition-colors py-1 cursor-pointer"
            >
              <span>Cuộn xuống trồng rau</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#F2D39B]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
