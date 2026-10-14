"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Eye, Sparkles, Flame, Droplets, Car, Volume2 } from "lucide-react";
import { soundEngine } from "@/lib/sound";
import { AnimatedNpcPortrait, ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

interface HeroDioramaProps {
  onSelectOriginBonus: () => void;
  onBonusWallet?: (amount: number) => void;
  weather: WeatherMode;
}

const SINGLE_HEART_ORIGINS = [
  {
    id: "both",
    label: "Còn cả Ông Bà",
    who: "BÀ NGOẠI",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    heartLine:
      "“Trời ơi cục vàng của ngoại, mới về sao không báo trước để bà nấu cơm?”",
  },
  {
    id: "ba",
    label: "Chỉ còn Bà Ngoại",
    who: "BÀ NGOẠI",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    heartLine:
      "“Vô thắp cho ông mày nén nhang trước đi con, ổng trông mày dữ lắm.”",
  },
  {
    id: "ong",
    label: "Chỉ còn Ông Ngoại",
    who: "ÔNG NGOẠI",
    portrait: "/game-assets/pixel/portrait-npc-nam.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-nam-talk.png",
    heartLine:
      "“Bà mày mất rồi, nhà vắng hoe. Mày về ở chơi với ông mấy bữa nghen.”",
  },
  {
    id: "memories",
    label: "Ông Bà trong ký ức",
    who: "CHÚ MƯỜI HÀNG XÓM",
    portrait: "/game-assets/pixel/portrait-npc-dung.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-dung-talk.png",
    heartLine:
      "“Nhà ngoại con chú vẫn quét dọn mỗi ngày. Vô thắp nén nhang cho ấm cửa ấm nhà.”",
  },
];

const WEATHER_STAGE_OVERLAY: Record<WeatherMode, string> = {
  sun: "from-amber-400/15 via-transparent to-[#0E0805]/95",
  rain: "from-sky-900/45 via-slate-950/35 to-[#060D14]/95",
  sunset: "from-orange-600/30 via-rose-950/25 to-[#14070B]/95",
  night: "from-indigo-950/65 via-[#070B16]/55 to-[#04060C]/98",
};

export default function HeroDiorama({
  onSelectOriginBonus,
  onBonusWallet,
  weather,
}: HeroDioramaProps) {
  const [selectedId, setSelectedId] = useState<string>("both");
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [inspectWorld, setInspectWorld] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Instant 4-Action Playable Village Toy Dock State (Julian Mercer Spec)
  const [playedActions, setPlayedActions] = useState<string[]>([]);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [moCombo, setMoCombo] = useState<number>(1);
  const [screenShake, setScreenShake] = useState(false);
  const [dockBonusClaimed, setDockBonusClaimed] = useState(false);

  const currentOrigin =
    SINGLE_HEART_ORIGINS.find((o) => o.id === selectedId) ||
    SINGLE_HEART_ORIGINS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 7, y: nx * 9 });
  };

  const triggerVillageToy = (actionId: string, message: string) => {
    setActiveToast(message);
    const nextPlayed = playedActions.includes(actionId)
      ? playedActions
      : [...playedActions, actionId];
    setPlayedActions(nextPlayed);

    if (nextPlayed.length === 4 && !dockBonusClaimed) {
      setDockBonusClaimed(true);
      onSelectOriginBonus();
      soundEngine.play("success");
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#FFD700", "#10B981", "#F97316"],
      });
      setActiveToast("ĐỦ 4 TRẢI NGHIỆM QUÊ HƯƠNG — TẶNG +1 LƯỢT QUAY ĐẠI CÁT!");
    }
  };

  return (
    <section className="relative pt-24 pb-8 px-3 sm:px-6 max-w-7xl mx-auto select-none">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ perspective: "1500px" }}
        className="w-full"
      >
        <motion.div
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            x: screenShake ? [-6, 6, -5, 5, 0] : 0,
          }}
          transition={{ type: "spring", stiffness: 130, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative min-h-[660px] lg:min-h-[720px] rounded-[32px] border-4 border-[#B88244] shadow-[0_10px_0_#261207,0_40px_100px_rgba(0,0,0,0.95)] overflow-hidden bg-[#120B07] flex flex-col justify-between p-5 sm:p-8 lg:p-10"
        >
          {/* 4 REAL CARVED WOOD CORNERS (Correct /decor/ path!) */}
          <img
            src="/game-assets/ornaments/decor/corner-wood-tl.png"
            alt=""
            className="w-14 h-14 absolute top-2 left-2 z-30 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-tr.png"
            alt=""
            className="w-14 h-14 absolute top-2 right-2 z-30 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-bl.png"
            alt=""
            className="w-14 h-14 absolute bottom-2 left-2 z-30 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-br.png"
            alt=""
            className="w-14 h-14 absolute bottom-2 right-2 z-30 pointer-events-none pixelated drop-shadow-lg"
          />

          {/* LAYER 1: FULL-BLEED GAME WORLD SCREENSHOT */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/game-assets/screenshots/world-thodia.png"
              alt="Xóm Bến Dừa"
              style={{
                transform: `scale(1.06) translate3d(${tilt.y * -1.3}px, ${tilt.x * 1.3}px, 0)`,
              }}
              className={`w-full h-full object-cover object-center transition-all duration-700 ${
                weather === "night"
                  ? "brightness-[0.55] contrast-125 saturate-110"
                  : weather === "rain"
                  ? "brightness-[0.72] contrast-115 hue-rotate-[8deg]"
                  : weather === "sunset"
                  ? "brightness-[0.82] contrast-115 sepia-[0.22]"
                  : "brightness-[0.94] contrast-105"
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 ${WEATHER_STAGE_OVERLAY[weather]}`}
            />
          </div>

          {/* LAYER 2: TOP BAR — 3D CARVED WOOD TITLE & CLEAN VIEW TOGGLE */}
          <div
            style={{ transform: "translateZ(35px)" }}
            className="relative z-20 flex flex-wrap items-center justify-between gap-4"
          >
            <Wood3DPlaqueTitle
              eyebrow="THẾ GIỚI XÃ HỘI PIXEL VIỆT NAM"
              title="CỔNG LÀNG BẾN DỪA"
              align="left"
              size="md"
            />

            <button
              onClick={() => {
                setInspectWorld(!inspectWorld);
                soundEngine.playSfx("interact", 0.35);
              }}
              className="flex items-center gap-2 bg-[#160D08]/90 hover:bg-[#2A1910] border-2 border-[#C99A35] text-[#FFF8E6] px-4 py-2 rounded-xl text-xs font-extrabold shadow-[0_4px_0_#261207,0_10px_24px_rgba(0,0,0,0.85)] cursor-pointer transition-all"
            >
              <Eye className="w-4 h-4 text-[#FFD700]" />
              <span>{inspectWorld ? "Hiện Giao Diện" : "Ngắm Trọn Xóm Làng"}</span>
            </button>
          </div>

          {/* LAYER 3: CENTER 3D FLOATING SHRINE + GRANDPARENTS EMOTIONAL HOOK */}
          <AnimatePresence>
            {!inspectWorld && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                style={{ transform: "translateZ(55px)" }}
                className="relative z-20 my-auto py-4 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  {/* Left: Floating 3D Miếu Ông Thổ Địa & Live Animated Sprite */}
                  <div className="lg:col-span-5 flex items-center gap-4 bg-[#160D08]/85 backdrop-blur-xl border-2 border-[#B88244] rounded-2xl p-4 shadow-[0_6px_0_#241106,0_24px_50px_rgba(0,0,0,0.9)]">
                    <div className="relative shrink-0">
                      <img
                        src="/game-assets/pixel/mieu.png"
                        alt="Miếu Đỏ"
                        className="w-20 h-20 object-contain pixelated drop-shadow-[0_10px_18px_rgba(0,0,0,0.9)]"
                      />
                      {(weather === "night" || weather === "sunset") && (
                        <img
                          src="/game-assets/pixel/tho-dia-mieu__emit.png"
                          alt=""
                          className="absolute inset-0 w-20 h-20 object-contain pixelated mix-blend-screen animate-pulse"
                        />
                      )}
                    </div>
                    <div className="shrink-0 -ml-3">
                      <ThoDiaAnimatedSprite mode="laugh" size={84} />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#FFD700] bg-[#CB5245]/40 border border-[#FFD700]/50 px-2.5 py-0.5 rounded-md">
                        ÔNG THỔ ĐỊA BẾN DỪA
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-[#FFF8E6] leading-snug">
                        “Mới về quê ngoại hả con? Ghé miếu quay lộc đầu mùa nghen!”
                      </p>
                    </div>
                  </div>

                  {/* Right: 1-Sentence Psychological Hook */}
                  <div className="lg:col-span-7 bg-[#160D08]/90 backdrop-blur-2xl border-2 border-[#FFD700]/75 rounded-2xl p-5 sm:p-6 shadow-[0_8px_0_#261207,0_25px_70px_rgba(0,0,0,0.95)]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <BitmapWoodText
                        text="Ông bà ngoại của bạn còn chứ?"
                        size="md"
                        align="left"
                      />
                      <span className="text-[11px] font-black text-[#BEF264] bg-[#285943]/80 border border-[#BEF264]/50 px-3 py-1 rounded-lg">
                        Chạm chọn nhận +1 Lượt Quay
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {SINGLE_HEART_ORIGINS.map((item) => {
                        const active = selectedId === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setSelectedId(item.id);
                              soundEngine.playSfx("interact", 0.45);
                              if (!bonusClaimed) {
                                setBonusClaimed(true);
                                onSelectOriginBonus();
                                soundEngine.playSfx("success", 0.5);
                              }
                            }}
                            className={`px-3 py-2.5 rounded-xl border-2 text-xs font-extrabold transition-all cursor-pointer ${
                              active
                                ? "bg-gradient-to-b from-[#FFE082] to-[#C99A35] border-white text-[#1C110B] shadow-[0_4px_0_#5C3409,0_0_20px_rgba(255,215,0,0.6)] -translate-y-0.5"
                                : "bg-[#24160E]/90 border-[#6B4930] text-[#EAD8AE] hover:border-[#C99A35]"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentOrigin.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center gap-3.5 bg-[#FFF8E6] text-[#22150E] rounded-xl p-3.5 border-2 border-[#88603D] shadow-inner"
                      >
                        <AnimatedNpcPortrait
                          baseSrc={currentOrigin.portrait}
                          talkSrc={currentOrigin.portraitTalk}
                          isTalking={true}
                          size={58}
                          alt={currentOrigin.who}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-black uppercase tracking-wider text-[#8A332B]">
                            {currentOrigin.who}
                          </div>
                          <p className="font-wood text-base sm:text-lg text-[#1C110B] leading-snug">
                            {currentOrigin.heartLine}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* =============================================================
                    INSTANT PLAYABLE 4-ACTION VILLAGE TOY DOCK (JULIAN MERCER)
                ============================================================== */}
                <div className="carved-wood-box rounded-2xl p-3.5 sm:p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#FFE89E]">
                        CHẠM THỬ 4 THÚ VUI XÓM BẾN DỪA ({playedActions.length}/4 NHẬN THÊM 1 LƯỢT QUAY)
                      </span>
                    </div>
                    {activeToast && (
                      <motion.span
                        key={activeToast}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-black text-emerald-300 bg-emerald-950/90 border border-emerald-400/50 px-3 py-1 rounded-lg"
                      >
                        {activeToast}
                      </motion.span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Toy 1: Thắp Nhang Miếu Đỏ */}
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        soundEngine.playBronzeGong();
                        soundEngine.playSfx("coins", 0.5);
                        if (onBonusWallet) onBonusWallet(888);
                        triggerVillageToy(
                          "incense",
                          "🕯️ Khói nhang trầm bay lên — Ông Địa ban +888đ Lộc May!"
                        );
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition cursor-pointer ${
                        playedActions.includes("incense")
                          ? "bg-amber-500/25 border-[#FFD700]"
                          : "bg-[#1A0F09] hover:bg-[#28180E] border-[#6B4930]"
                      }`}
                    >
                      <img
                        src="/game-assets/pixel/mieu.png"
                        alt=""
                        className="w-10 h-10 object-contain pixelated shrink-0"
                      />
                      <div>
                        <div className="text-xs font-black text-[#FFE89E]">
                          1. Thắp Nhang Miếu
                        </div>
                        <div className="text-[11px] font-bold text-amber-300/80">
                          Nghe chuông đồng +888đ
                        </div>
                      </div>
                    </motion.button>

                    {/* Toy 2: Gõ Mõ Tre Giải Nghiệp */}
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        soundEngine.playBambooPegTick(1.4 + (moCombo % 5) * 0.2);
                        const next = moCombo + 1;
                        setMoCombo(next);
                        triggerVillageToy(
                          "wooden-fish",
                          `🪵 Cốc! Cốc! Combo ${next}x — Tan biến muộn phiền deadline!`
                        );
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition cursor-pointer ${
                        playedActions.includes("wooden-fish")
                          ? "bg-amber-500/25 border-[#FFD700]"
                          : "bg-[#1A0F09] hover:bg-[#28180E] border-[#6B4930]"
                      }`}
                    >
                      <img
                        src="/game-assets/ornaments/decor/bamboo-corner-collar.png"
                        alt=""
                        className="w-10 h-10 object-contain pixelated shrink-0"
                      />
                      <div>
                        <div className="text-xs font-black text-[#FFE89E]">
                          2. Gõ Mõ Tre Làng
                        </div>
                        <div className="text-[11px] font-bold text-amber-300/80">
                          Combo {moCombo}x Tịnh Tâm
                        </div>
                      </div>
                    </motion.button>

                    {/* Toy 3: Múc Nước Lu Mưa */}
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        soundEngine.playSfx("water", 0.65);
                        triggerVillageToy(
                          "rain-jar",
                          "💧 Nước mưa trong lu mát lạnh — Ngọt lịm ký ức tuổi thơ!"
                        );
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition cursor-pointer ${
                        playedActions.includes("rain-jar")
                          ? "bg-amber-500/25 border-[#FFD700]"
                          : "bg-[#1A0F09] hover:bg-[#28180E] border-[#6B4930]"
                      }`}
                    >
                      <img
                        src="/game-assets/ornaments/decor/basket.png"
                        alt=""
                        className="w-10 h-10 object-contain pixelated shrink-0"
                      />
                      <div>
                        <div className="text-xs font-black text-[#FFE89E]">
                          3. Múc Nước Lu Mưa
                        </div>
                        <div className="text-[11px] font-bold text-sky-300">
                          Gáo dừa mát rượi
                        </div>
                      </div>
                    </motion.button>

                    {/* Toy 4: Đạp Ga Ferrari SF90 Giữa Xóm */}
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 2 }}
                      onClick={() => {
                        soundEngine.playSfx("build", 0.6);
                        setScreenShake(true);
                        setTimeout(() => setScreenShake(false), 500);
                        triggerVillageToy(
                          "ferrari",
                          "🏎️ Vác Ferrari SF90 XX nẹt pô qua cầu khỉ — Cả xóm chạy ra coi!"
                        );
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition cursor-pointer ${
                        playedActions.includes("ferrari")
                          ? "bg-amber-500/25 border-[#FFD700]"
                          : "bg-[#1A0F09] hover:bg-[#28180E] border-[#6B4930]"
                      }`}
                    >
                      <img
                        src="/game-assets/pixel/body.png"
                        alt=""
                        className="w-10 h-10 object-contain pixelated shrink-0"
                      />
                      <div>
                        <div className="text-xs font-black text-[#FFE89E]">
                          4. Nẹt Pô Siêu Xe
                        </div>
                        <div className="text-[11px] font-bold text-rose-400">
                          Ferrari SF90 XX Giữa Làng
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 4: BOTTOM ACTION — SINGLE GIANT 3D GOLDEN GONG CTA */}
          <div
            style={{ transform: "translateZ(65px)" }}
            className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/15"
          >
            <a
              href="#vong-quay-nhan-qua"
              onClick={() => soundEngine.playBronzeGong()}
              className="inline-flex items-center gap-3 bg-gradient-to-b from-[#FFE082] via-[#F59E0B] to-[#B45309] text-[#1C110B] font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl border-2 border-[#FFF8E6] shadow-[0_6px_0_#5C2804,0_15px_35px_rgba(245,158,11,0.55)] hover:-translate-y-0.5 active:translate-y-1 transition-all"
            >
              <span>BƯỚC VÀO ĐẠI LUÂN QUAY LỘC ÔNG ĐỊA</span>
            </a>

            <div className="flex items-center gap-2">
              {[
                "/game-assets/pixel/body.png",
                "/game-assets/mining/giant-diamond.png",
                "/game-assets/fish/ca-ho.png",
                "/game-assets/koi/koi-tricolor.png",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-xl bg-[#160D08]/90 border-2 border-[#88603D] flex items-center justify-center p-1.5 shadow-lg"
                >
                  <img src={src} alt="" className="w-full h-full object-contain pixelated" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
