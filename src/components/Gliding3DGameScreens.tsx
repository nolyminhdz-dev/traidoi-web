"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Eye, Sparkles, Play } from "lucide-react";
import { soundEngine } from "@/lib/sound";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

interface GameScreenItem {
  id: string;
  title: string;
  tag: string;
  quote: string;
  screenImg: string;
  popoutSprite: string;
  popoutLabel: string;
  accent: string;
  stats: string[];
}

const ALL_GAME_SCREENS: GameScreenItem[] = [
  {
    id: "village-thodia",
    title: "XÓM BẾN DỪA",
    tag: "BUILD 658 TRỰC TIẾP",
    quote: "“Mới về xóm hả con? Lại miếu ông biểu cái này!”",
    screenImg: "/game-assets/screenshots/world-thodia.png",
    popoutSprite: "/game-assets/pixel/portrait-tho-dia-talk.png",
    popoutLabel: "Ông Thổ Địa",
    accent: "#f59e0b",
    stats: ["60 FPS Pixel", "Thời Tiết 4D"],
  },
  {
    id: "shop-sauhien",
    title: "SẠP RAU CÔ SÁU",
    tag: "CHỢ QUÊ MIỀN TÂY",
    quote: "“Rau muống mới cắt hả con? Cô Sáu thu hết cho!”",
    screenImg: "/game-assets/screenshots/shop-sauhien.png",
    popoutSprite: "/game-assets/pixel/portrait-vendor-talk.png",
    popoutLabel: "Cô Sáu Hiền",
    accent: "#10b981",
    stats: ["+15.000đ Mỗi Vụ", "Quà Biếu Ngoại"],
  },
  {
    id: "ornate-ui",
    title: "SƠN MÀI NẸP TRE",
    tag: "MỘC BẢN THỦ CÔNG",
    quote: "“Từng khớp tre, từng nét chữ gỗ chạm khắc thủ công.”",
    screenImg: "/game-assets/screenshots/redesign-ornate-concept.png",
    popoutSprite: "/game-assets/pixel/portrait-grandma-talk.png",
    popoutLabel: "Bà Ngoại",
    accent: "#eab308",
    stats: ["Khung Tre 9-Slice", "Mộc Cầm Thực"],
  },
  {
    id: "garden-ngoai",
    title: "VƯỜN NHÀ NGOẠI",
    tag: "GIEO HẠT TƯỚI NƯỚC",
    quote: "“Đất có bàn tay người chăm mới không hóa đất hoang.”",
    screenImg: "/game-assets/travel/garden.png",
    popoutSprite: "/game-assets/pixel/muong-3.png",
    popoutLabel: "Rau Muống Xanh",
    accent: "#22c55e",
    stats: ["3 Ô Đất Tổ", "Mưa Tự Tưới"],
  },
  {
    id: "hoi-an-night",
    title: "PHỐ CỔ HỘI AN",
    tag: "ĐÊM RẰM HOA ĐĂNG",
    quote: "“Đèn lồng soi bóng nước Hoài Giang, cá Koi vàng quẫy sóng.”",
    screenImg: "/game-assets/travel/hoiAn.png",
    popoutSprite: "/game-assets/koi/koi-gold.png",
    popoutLabel: "Koi Hoàng Kim",
    accent: "#f97316",
    stats: ["Koi Quý Hiếm", "Đèn Lồng 3D"],
  },
  {
    id: "ha-noi-capital",
    title: "PHỐ CỔ HÀ NỘI",
    tag: "BA MƯƠI SÁU PHỐ PHƯỜNG",
    quote: "“Chuyến xe đò xuyên Việt mở ra phố thị rêu phong.”",
    screenImg: "/game-assets/travel/haNoi.png",
    popoutSprite: "/game-assets/vehicles/supra-icon.png",
    popoutLabel: "Supra Phố Cổ",
    accent: "#ef4444",
    stats: ["Đua Xe Hà Nội", "Showroom Sáu Lộc"],
  },
  {
    id: "quang-ninh-mine",
    title: "HẦM MỎ QUẢNG NINH",
    tag: "TỔ ĐỘI ĐÀO KIM CƯƠNG",
    quote: "“Đập vỡ vỉa đá sâu, lộ diện Kim Cương Khổng Lồ!”",
    screenImg: "/game-assets/travel/quangNinh.png",
    popoutSprite: "/game-assets/mining/giant-diamond.png",
    popoutLabel: "Kim Cương Đại",
    accent: "#38bdf8",
    stats: ["Kim Cương Đỏ", "Ferrari SF90 XX"],
  },
  {
    id: "ba-den-peak",
    title: "ĐỈNH NÚI BÀ ĐEN",
    tag: "ĐỈNH THIÊNG NAM BỘ",
    quote: "“Mây phủ đỉnh núi thiêng, chuông chùa ngân trong gió sớm.”",
    screenImg: "/game-assets/travel/baDen.png",
    popoutSprite: "/game-assets/ornaments/decor/flower-gold.png",
    popoutLabel: "Sen Vàng Núi Chúa",
    accent: "#c084fc",
    stats: ["Săn Mây 986m", "Lộc Tâm Linh"],
  },
  {
    id: "bamboo-settings",
    title: "ĐÀI PHÁT THANH THÔN",
    tag: "RADIO XÓM BẾN DỪA",
    quote: "“Tiếng đài phát thanh rè rè giữa trưa hè gió lộng...”",
    screenImg: "/game-assets/screenshots/settings-bamboo.png",
    popoutSprite: "/game-assets/animals/buffalo.png",
    popoutLabel: "Trâu Làng Bến Dừa",
    accent: "#a3e635",
    stats: ["Village Radio OGG", "Âm Thanh Quê"],
  },
];

interface Gliding3DGameScreensProps {
  weather: WeatherMode;
}

export default function Gliding3DGameScreens({ weather }: Gliding3DGameScreensProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, cursorX: 50, cursorY: 50 });

  const activeScreen = ALL_GAME_SCREENS[activeIndex];
  const trackA = ALL_GAME_SCREENS.slice(0, 5);
  const trackB = ALL_GAME_SCREENS.slice(4, 9);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const nx = (px / 100 - 0.5) * 2;
    const ny = (py / 100 - 0.5) * 2;
    setTilt({ x: -ny * 11, y: nx * 14, cursorX: px, cursorY: py });
  };

  return (
    <section
      id="gliding-screens"
      className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 3D CARVED WOOD SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
        <Wood3DPlaqueTitle
          eyebrow="KHÔNG GIAN 3D ĐA PHƯƠNG VỊ"
          title="TẬN MẮT SOI TỪNG TẤC ĐẤT QUÊ HƯƠNG"
          align="left"
          size="lg"
        />

        <button
          onClick={() => {
            soundEngine.play("interact");
            setIsPaused((p) => !p);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#3B2314] to-[#1C0F08] hover:from-[#4D2E1B] border-2 border-[#B88244] text-[#FFE89E] text-xs font-black tracking-wider uppercase flex items-center gap-2 transition cursor-pointer shadow-[0_4px_0_#120803,0_10px_24px_rgba(0,0,0,0.85)]"
        >
          <Eye className="w-4 h-4 text-[#FFD700]" />
          {isPaused ? "Tiếp Tục Lướt 3D" : "Giữ Khung Hình"}
        </button>
      </div>

      {/* =====================================================================
          1. CENTER HOLO-STAGE WITH CURSOR GYRO-TILT & Z+75px POP-OUT SPRITE
      ====================================================================== */}
      <div
        className="relative mb-14"
        style={{ perspective: "1600px" }}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0, cursorX: 50, cursorY: 50 })}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen.id}
            initial={{ opacity: 0, rotateX: 14, rotateY: -16, scale: 0.93 }}
            animate={{
              opacity: 1,
              rotateX: 5 + tilt.x,
              rotateY: tilt.y,
              scale: isPreviewing ? 1.03 : 1,
            }}
            exit={{ opacity: 0, rotateX: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 170, damping: 22 }}
            style={{ transformStyle: "preserve-3d" }}
            className={`relative mx-auto max-w-5xl rounded-[28px] p-3.5 sm:p-5 carved-wood-box transition-shadow duration-300 ${
              isPreviewing
                ? "shadow-[0_0_80px_rgba(255,215,0,0.65),0_35px_90px_rgba(0,0,0,0.95)]"
                : ""
            }`}
          >
            {/* 4 Handcrafted Bamboo Corner Collars — Correct /decor/ Path & Z-Elevation */}
            <img
              src="/game-assets/ornaments/decor/corner-bamboo-tl.png"
              alt=""
              style={{ transform: "translateZ(45px)" }}
              className="w-12 h-12 absolute -top-3 -left-3 pointer-events-none z-30 pixelated drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
            />
            <img
              src="/game-assets/ornaments/decor/corner-bamboo-tr.png"
              alt=""
              style={{ transform: "translateZ(45px)" }}
              className="w-12 h-12 absolute -top-3 -right-3 pointer-events-none z-30 pixelated drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
            />
            <img
              src="/game-assets/ornaments/decor/corner-bamboo-bl.png"
              alt=""
              style={{ transform: "translateZ(45px)" }}
              className="w-12 h-12 absolute -bottom-3 -left-3 pointer-events-none z-30 pixelated drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
            />
            <img
              src="/game-assets/ornaments/decor/corner-bamboo-br.png"
              alt=""
              style={{ transform: "translateZ(45px)" }}
              className="w-12 h-12 absolute -bottom-3 -right-3 pointer-events-none z-30 pixelated drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
            />

            {/* Screen Image Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border-2 border-[#88603D]">
              <img
                src={activeScreen.screenImg}
                alt={activeScreen.title}
                className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                  isPreviewing ? "scale-110" : "scale-[1.02]"
                }`}
              />

              {/* Cursor-Tracked Specular Sapphire Glass Reflection */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle 340px at ${tilt.cursorX}% ${tilt.cursorY}%, rgba(255,255,255,0.34) 0%, rgba(245,158,11,0.12) 45%, transparent 80%)`,
                  mixBlendMode: "screen",
                }}
              />

              {/* Bottom Cinematic Vignette */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

              {/* Top-Left Live Tag Plaque */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#160D08]/90 backdrop-blur-md border-2 border-[#B88244] shadow-lg">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeScreen.accent }}
                />
                <span className="text-[11px] font-black tracking-widest text-[#FFE89E] uppercase">
                  MÀN 0{activeIndex + 1} — {activeScreen.tag}
                </span>
              </div>

              {/* Top-Right Interactive "CHƠI THỬ CẢNH NÀY" Button */}
              <div className="absolute top-4 right-4 z-20">
                <motion.button
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    soundEngine.playBambooPegTick(1.6);
                    soundEngine.play("success");
                    setIsPreviewing(true);
                    confetti({
                      particleCount: 40,
                      spread: 60,
                      origin: { y: 0.55 },
                    });
                    setTimeout(() => setIsPreviewing(false), 1600);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#FFE082] via-[#F59E0B] to-[#B45309] text-[#1C110B] font-black text-xs uppercase tracking-wider border-2 border-white shadow-[0_4px_0_#5C2804,0_10px_25px_rgba(245,158,11,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPreviewing ? "ĐANG HOÀ NHẬP CẢNH..." : "TRẢI NGHIỆM CẢNH NÀY"}</span>
                </motion.button>
              </div>

              {/* Bottom-Left Surgical 3D Title + 1-Sentence Voice Quote */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-72 z-10">
                <div className="mb-1">
                  <BitmapWoodText
                    text={activeScreen.title}
                    size="lg"
                    align="left"
                  />
                </div>
                <p className="text-amber-100/95 text-sm sm:text-base italic font-semibold drop-shadow">
                  {activeScreen.quote}
                </p>
              </div>
            </div>

            {/* 4D POP-OUT PIXEL SPRITE BREAKING THE 4TH WALL (translateZ +75px) */}
            <motion.div
              style={{ transform: "translateZ(75px)" }}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -bottom-6 right-6 z-30 items-center gap-3.5 px-4 py-3 rounded-2xl carved-wood-box"
            >
              <div className="relative w-14 h-14 rounded-xl bg-amber-500/15 border-2 border-amber-400/50 flex items-center justify-center p-1.5">
                <img
                  src={activeScreen.popoutSprite}
                  alt={activeScreen.popoutLabel}
                  className="w-full h-full object-contain pixelated drop-shadow-[0_8px_12px_rgba(0,0,0,0.85)]"
                />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#FFD700] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> NHÂN VẬT NỔI 3D
                </div>
                <div className="text-sm font-black text-[#FFF8E6]">{activeScreen.popoutLabel}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  {activeScreen.stats.map((st, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-amber-500/25 text-amber-200 border border-amber-400/40 font-bold"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================================
          2. DUAL-TRACK COUNTER-GLIDING 3D ISOMETRIC RIBBON ("LƯỚT LƯỚT 2 CHIỀU")
      ====================================================================== */}
      <div
        className="relative py-4 space-y-7 overflow-visible"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* TRACK A: Glides Left-to-Right in 3D Isometric Pitch */}
        <motion.div
          animate={isPaused ? {} : { x: ["0%", "-38%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(11deg) rotateY(-12deg)",
          }}
          className="flex items-center gap-6 min-w-max px-4"
        >
          {[...trackA, ...trackA].map((item, idx) => {
            const globalIdx = ALL_GAME_SCREENS.findIndex((s) => s.id === item.id);
            const isSelected = globalIdx === activeIndex;
            return (
              <motion.button
                key={`trackA-${item.id}-${idx}`}
                onClick={() => {
                  soundEngine.play("interact");
                  setActiveIndex(globalIdx);
                }}
                whileHover={{
                  scale: 1.08,
                  y: -14,
                  rotateY: 0,
                  rotateX: 0,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`group relative w-[260px] sm:w-[310px] rounded-2xl p-2 text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-b from-amber-400/50 to-amber-950/95 border-2 border-[#FFD700] shadow-[0_6px_0_#451A03,0_24px_50px_rgba(245,158,11,0.45)]"
                    : "carved-wood-box opacity-85 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
                  <img
                    src={item.screenImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-12">
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                      {item.tag}
                    </div>
                    <div className="text-sm font-black text-white truncate">{item.title}</div>
                  </div>
                </div>
                <img
                  src={item.popoutSprite}
                  alt=""
                  className="w-12 h-12 object-contain pixelated absolute -top-3 -right-2 drop-shadow-[0_10px_14px_rgba(0,0,0,0.95)] group-hover:scale-125 group-hover:-translate-y-1.5 transition-transform z-20"
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* TRACK B: Counter-Glides Right-to-Left at Deeper Z-Plane */}
        <motion.div
          animate={isPaused ? {} : { x: ["-32%", "0%", "-32%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(11deg) rotateY(10deg)",
          }}
          className="flex items-center gap-6 min-w-max px-4"
        >
          {[...trackB, ...trackB].map((item, idx) => {
            const globalIdx = ALL_GAME_SCREENS.findIndex((s) => s.id === item.id);
            const isSelected = globalIdx === activeIndex;
            return (
              <motion.button
                key={`trackB-${item.id}-${idx}`}
                onClick={() => {
                  soundEngine.play("interact");
                  setActiveIndex(globalIdx);
                }}
                whileHover={{
                  scale: 1.08,
                  y: -14,
                  rotateY: 0,
                  rotateX: 0,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`group relative w-[250px] sm:w-[295px] rounded-2xl p-2 text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-b from-amber-400/50 to-amber-950/95 border-2 border-[#FFD700] shadow-[0_6px_0_#451A03,0_24px_50px_rgba(245,158,11,0.45)]"
                    : "carved-wood-box opacity-85 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
                  <img
                    src={item.screenImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-12">
                    <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                      {item.tag}
                    </div>
                    <div className="text-sm font-black text-white truncate">{item.title}</div>
                  </div>
                </div>
                <img
                  src={item.popoutSprite}
                  alt=""
                  className="w-12 h-12 object-contain pixelated absolute -top-3 -right-2 drop-shadow-[0_10px_14px_rgba(0,0,0,0.95)] group-hover:scale-125 group-hover:-translate-y-1.5 transition-transform z-20"
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
