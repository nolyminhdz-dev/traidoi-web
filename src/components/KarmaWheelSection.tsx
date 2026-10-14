"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Flame,
  Check,
  Copy,
  RotateCw,
  Coins,
  PackageOpen,
  Sparkles,
  Zap,
  X,
} from "lucide-react";
import { WHEEL_PRIZES, WheelPrize } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface KarmaWheelSectionProps {
  spinsLeft: number;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
  wallet: number;
  setWallet: React.Dispatch<React.SetStateAction<number>>;
  weather: WeatherMode;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function createWedgePath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
) {
  const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
  const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);
  const startInner = polarToCartesian(cx, cy, rInner, endAngle);
  const endInner = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    startOuter.x,
    startOuter.y,
    "A",
    rOuter,
    rOuter,
    0,
    largeArc,
    0,
    endOuter.x,
    endOuter.y,
    "L",
    endInner.x,
    endInner.y,
    "A",
    rInner,
    rInner,
    0,
    largeArc,
    1,
    startInner.x,
    startInner.y,
    "Z",
  ].join(" ");
}

const ORBITAL_SEALS = [
  {
    id: "seal-ngoai",
    title: "Thăm Ngoại",
    rewardSpins: 1,
    rewardCash: 3000,
    icon: "/game-assets/pixel/portrait-grandma.png",
  },
  {
    id: "seal-muong",
    title: "Hái Rau Muống",
    rewardSpins: 1,
    rewardCash: 4500,
    icon: "/game-assets/pixel/muong-3.png",
  },
  {
    id: "seal-sauhien",
    title: "Ghé Chợ Quê",
    rewardSpins: 2,
    rewardCash: 8000,
    icon: "/game-assets/pixel/portrait-vendor.png",
  },
];

const CELESTIAL_RUNES = [
  "PHÚC",
  "LỘC",
  "THỌ",
  "KHANG",
  "NINH",
  "ĐỨC",
  "TÂM",
  "AN",
  "THỊNH",
  "VƯỢNG",
  "CÁT",
  "TƯỜNG",
];

interface SparkParticle {
  id: number;
  dx: number;
  dy: number;
  color: string;
}

export default function KarmaWheelSection({
  spinsLeft,
  setSpinsLeft,
  wallet,
  setWallet,
  weather,
}: KarmaWheelSectionProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [clapperAngle, setClapperAngle] = useState<number>(0);
  const [wonPrize, setWonPrize] = useState<WheelPrize | null>(null);
  const [giftCode, setGiftCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [claimedSeals, setClaimedSeals] = useState<string[]>([
    "seal-ngoai",
    "seal-muong",
  ]);
  const [incenseLit, setIncenseLit] = useState<boolean>(false);
  const [lootBag, setLootBag] = useState<WheelPrize[]>([]);
  const [wheelTilt, setWheelTilt] = useState({ x: 6, y: 0 });
  const [pegSparks, setPegSparks] = useState<SparkParticle[]>([]);

  // Hold-to-charge & 3D Dragon Pull-Lever state
  const [chargeLevel, setChargeLevel] = useState<number>(0);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [leverPulled, setLeverPulled] = useState<boolean>(false);
  const [godburstActive, setGodburstActive] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);
  const chargeTimerRef = useRef<number | null>(null);
  const lastPegIndexRef = useRef<number>(-1);
  const sparkIdRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (chargeTimerRef.current) clearInterval(chargeTimerRef.current);
    };
  }, []);

  const launchSpin = useCallback(
    (powerMultiplier = 1) => {
      if (isSpinning) return;
      if (spinsLeft <= 0) {
        soundEngine.playSfx("denied", 0.5);
        return;
      }

      setSpinsLeft((prev) => Math.max(0, prev - 1));
      setIsSpinning(true);
      setWonPrize(null);
      setCopied(false);
      setGodburstActive(false);

      soundEngine.playBronzeGong();

      const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
      const selectedPrize = WHEEL_PRIZES[prizeIndex];

      const sliceAngle = 360 / WHEEL_PRIZES.length; // 45 deg
      const targetSliceCenter = prizeIndex * sliceAngle + sliceAngle / 2;
      const jitter = (Math.random() - 0.5) * 18;
      const extraSpins = (7 + Math.round(powerMultiplier * 4)) * 360;

      const startRotation = rotation;
      const currentMod = ((startRotation % 360) + 360) % 360;
      const desiredEndMod = (360 - targetSliceCenter + jitter + 360) % 360;
      let delta = desiredEndMod - currentMod;
      if (delta <= 0) delta += 360;

      const totalDelta = extraSpins + delta;
      const duration = 6400 + powerMultiplier * 900;
      const startTime = performance.now();

      const animateWheel = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 4.3);
        const currentRot = startRotation + totalDelta * eased;

        setRotation(currentRot);

        // 24 pegs around 360 deg => every 15 deg
        const pegSlot = Math.floor(((currentRot % 360) + 360) / 15);
        if (pegSlot !== lastPegIndexRef.current && progress < 0.985) {
          lastPegIndexRef.current = pegSlot;
          const velocityRatio = Math.max(0.08, 1 - progress);
          soundEngine.playBambooPegTick(velocityRatio);

          const kick = -Math.min(36, 12 + velocityRatio * 30);
          setClapperAngle(kick);
          setTimeout(() => setClapperAngle(0), 55);

          // Emit 8-12 Real-time Incandescent Peg Sparks (Ethan Cole Spec)
          const sparkCount = velocityRatio > 0.4 ? 8 : 4;
          const newSparks: SparkParticle[] = Array.from({ length: sparkCount }).map(
            (_, si) => ({
              id: ++sparkIdRef.current + si,
              dx: (Math.random() - 0.5) * 90 * (0.5 + velocityRatio),
              dy: (Math.random() * 45 + 10) * (0.5 + velocityRatio),
              color: si % 2 === 0 ? "#FFD700" : "#FB923C",
            })
          );
          setPegSparks(newSparks);
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animateWheel);
        } else {
          setIsSpinning(false);
          setClapperAngle(0);
          setPegSparks([]);
          setWonPrize(selectedPrize);
          setLootBag((prev) => [selectedPrize, ...prev.slice(0, 2)]);
          setWallet((prev) => prev + selectedPrize.moneyBonus);
          setGodburstActive(true);

          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          setGiftCode(`${selectedPrize.codePrefix}-${randomSuffix}`);

          soundEngine.playBronzeGong();
          soundEngine.playSfx("success", 0.7);
          soundEngine.playSfx("coins", 0.65);

          confetti({
            particleCount: 120,
            spread: 95,
            origin: { y: 0.52 },
            colors: ["#FFD700", "#CB5245", "#50865A", "#FFF8E6", "#38BDF8"],
          });
        }
      };

      animFrameRef.current = requestAnimationFrame(animateWheel);
    },
    [isSpinning, rotation, setSpinsLeft, setWallet, spinsLeft]
  );

  // Pull the 3D Dragon Lever on the right side of the wheel
  const handlePullDragonLever = () => {
    if (isSpinning || leverPulled) return;
    if (spinsLeft <= 0) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    setLeverPulled(true);
    soundEngine.playChargeTick(0.6);
    setTimeout(() => {
      soundEngine.playChargeTick(1.0);
    }, 180);
    setTimeout(() => {
      setLeverPulled(false);
      launchSpin(1.65);
    }, 420);
  };

  const startCharge = (e: React.MouseEvent | React.TouchEvent) => {
    if ("button" in e && e.button !== 0) return;
    if (isSpinning || spinsLeft <= 0) {
      if (spinsLeft <= 0) soundEngine.playSfx("denied", 0.5);
      return;
    }
    setIsCharging(true);
    setChargeLevel(0.15);
    let current = 0.15;
    if (chargeTimerRef.current) clearInterval(chargeTimerRef.current);
    chargeTimerRef.current = window.setInterval(() => {
      current = Math.min(1, current + 0.08);
      setChargeLevel(current);
      soundEngine.playChargeTick(current);
    }, 80);
  };

  const releaseCharge = useCallback(() => {
    if (!isCharging) return;
    if (chargeTimerRef.current) {
      clearInterval(chargeTimerRef.current);
      chargeTimerRef.current = null;
    }
    const finalPower = chargeLevel;
    setIsCharging(false);
    setChargeLevel(0);
    launchSpin(0.65 + finalPower * 0.9);
  }, [chargeLevel, isCharging, launchSpin]);

  useEffect(() => {
    if (!isCharging) return;
    const handleGlobalUp = () => {
      releaseCharge();
    };
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchend", handleGlobalUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isCharging, releaseCharge]);

  useEffect(() => {
    if (!wonPrize) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWonPrize(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [wonPrize]);

  const handleLightIncense = () => {
    if (incenseLit) return;
    setIncenseLit(true);
    setSpinsLeft((prev) => prev + 1);
    soundEngine.playBronzeGong();
    soundEngine.playSfx("fire-crackle", 0.5);
  };

  const handleClaimSeal = (seal: (typeof ORBITAL_SEALS)[0]) => {
    if (claimedSeals.includes(seal.id)) return;
    setClaimedSeals((prev) => [...prev, seal.id]);
    setSpinsLeft((prev) => prev + seal.rewardSpins);
    setWallet((prev) => prev + seal.rewardCash);
    soundEngine.playSfx("coins", 0.6);
    soundEngine.playSfx("success", 0.5);
  };

  const handleWheelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setWheelTilt({ x: 7 - ny * 12, y: nx * 12 });
  };

  const cx = 250;
  const cy = 250;
  const rOuter = 224;
  const rInner = 64;
  const sliceDeg = 360 / WHEEL_PRIZES.length;

  return (
    <section
      id="vong-quay-nhan-qua"
      className="relative py-20 px-3 sm:px-6 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* 1. TRUE 3D CHISELED GOLD HEADER — ZERO MIDDLE DOTS */}
      <div className="mb-12">
        <Wood3DPlaqueTitle
          eyebrow="ĐẠI TRẬN THẦN CƠ MIẾU ĐỎ"
          title="THIÊN CƠ ĐẠI LUÂN ĐỔI VẬN"
          subtitle="Nhấn giữ Trống Đồng ở tâm hoặc kéo Cần Gạt Rồng Vàng bên phải để khai mở vận may"
          align="center"
          size="xl"
        />
      </div>

      {/* 2. 3D SPATIAL SHRINE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: 3 FLOATING ORBITAL SEALS + BRONZE INCENSE SHRINE */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 order-2 lg:order-1">
          <div className="carved-wood-box rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
                ẤN LỘC THỔ ĐỊA (+LƯỢT QUAY)
              </span>
              <span className="text-xs font-black text-[#BEF264]">
                {claimedSeals.length}/3 Ấn
              </span>
            </div>

            <div className="space-y-2.5">
              {ORBITAL_SEALS.map((seal) => {
                const done = claimedSeals.includes(seal.id);
                return (
                  <button
                    key={seal.id}
                    onClick={() => handleClaimSeal(seal)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      done
                        ? "bg-[#285943]/35 border-[#50865A] text-[#FFF8E6]"
                        : "bg-[#24160E] border-[#FFD700] text-[#FFF8E6] hover:scale-[1.03] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0D0704] border border-[#88603D] p-1 shrink-0 relative">
                      <img
                        src={seal.icon}
                        alt=""
                        className="w-full h-full object-contain pixelated"
                      />
                      {done && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#357350] border border-[#BEF264] flex items-center justify-center text-white">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-xs font-black">{seal.title}</div>
                      <div className="text-[11px] font-bold text-[#FFD700]">
                        +{seal.rewardSpins} Lượt • +
                        {seal.rewardCash.toLocaleString("vi-VN")} Xu Làng
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 1-Tap Incense Button + Rising Golden Smoke */}
            <button
              type="button"
              onClick={handleLightIncense}
              disabled={incenseLit}
              className={`mt-4 w-full py-3 rounded-xl border-2 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                incenseLit
                  ? "bg-[#261810] border-[#513727] text-[#A88B73]"
                  : "bg-gradient-to-b from-[#E15B4C] to-[#992218] border-[#FFD700] text-[#FFF8E6] shadow-[0_4px_0_#4A0E09,0_0_20px_rgba(203,82,69,0.55)] hover:scale-[1.02]"
              }`}
            >
              <Flame className="w-4 h-4 text-[#FFD700]" />
              <span>
                {incenseLit
                  ? "ĐÃ DÂNG HƯƠNG (+1 LƯỢT)"
                  : "DÂNG NÉN NHANG NHẬN 1 LƯỢT"}
              </span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            CENTER COLUMN: TRIPLE-RING 3D MECHANICAL RELIC WHEEL + PULL LEVER
        ==================================================================== */}
        <div
          onMouseMove={handleWheelMouseMove}
          onMouseLeave={() => setWheelTilt({ x: 6, y: 0 })}
          style={{ perspective: "1500px" }}
          className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2"
        >
          {/* 8-Ray Godburst Climax Overlay */}
          <AnimatePresence>
            {(isCharging || godburstActive) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: isCharging ? 0.35 + chargeLevel * 0.55 : 0.8,
                  scale: isCharging ? 0.92 + chargeLevel * 0.25 : 1.18,
                  rotate: 360,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.25 },
                }}
                className="
                  absolute w-[560px] h-[560px] rounded-full pointer-events-none z-0
                  bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,215,0,0.32)_20deg,transparent_45deg,rgba(255,215,0,0.32)_65deg,transparent_90deg,rgba(255,215,0,0.32)_110deg,transparent_135deg,rgba(255,215,0,0.32)_155deg,transparent_180deg,rgba(255,215,0,0.32)_200deg,transparent_225deg,rgba(255,215,0,0.32)_245deg,transparent_270deg,rgba(255,215,0,0.32)_290deg,transparent_315deg,rgba(255,215,0,0.32)_335deg,transparent_360deg)]
                  blur-md
                "
              />
            )}
          </AnimatePresence>

          <div className="relative flex items-center justify-center">
            {/* MAIN 3D TILTED TRIPLE-RING RELIC STAGE */}
            <motion.div
              animate={{
                rotateX: wheelTilt.x + (isCharging ? chargeLevel * 7 : 0),
                rotateY: wheelTilt.y,
                scale: isCharging ? 1 + chargeLevel * 0.045 : 1,
              }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-[340px] h-[340px] sm:w-[490px] sm:h-[490px] lg:w-[530px] lg:h-[530px] flex items-center justify-center"
            >
              {/* LAYER 0: Deep Floor Contact Shadow */}
              <div
                style={{ transform: "translateZ(-45px) translateY(24px)" }}
                className="absolute inset-4 rounded-full bg-black/90 blur-2xl pointer-events-none"
              />

              {/* =============================================================
                  RING 1 (OUTER COUNTER-ROTATING CELESTIAL BAGUA & TALISMAN RING)
              ============================================================== */}
              <div
                style={{ transform: "translateZ(-24px)" }}
                className="absolute -inset-4 sm:-inset-7 rounded-full border-4 border-[#C99A35]/80 bg-gradient-to-b from-[#2A160B] via-[#120A05] to-[#080402] shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_0_30px_rgba(255,215,0,0.25)] animate-spin-reverse-slow pointer-events-none flex items-center justify-center"
              >
                {/* 12 Glowing Celestial Runes Around Outer Perimeter */}
                {CELESTIAL_RUNES.map((rune, ri) => {
                  const deg = ri * 30;
                  return (
                    <span
                      key={rune}
                      style={{
                        transform: `rotate(${deg}deg) translateY(-46.5%)`,
                      }}
                      className="absolute inset-y-0 flex items-start justify-center text-[9px] sm:text-[10px] font-black tracking-widest text-[#FFD700]/85 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                    >
                      {rune}
                    </span>
                  );
                })}
              </div>

              {/* 4 Floating Paper Talismans Orbiting in 3D Space (paper-seal.png) */}
              {[0, 90, 180, 270].map((angle, ti) => (
                <motion.img
                  key={ti}
                  src="/game-assets/ornaments/decor/paper-seal.png"
                  alt=""
                  animate={{
                    y: [0, -10, 0],
                    rotateZ: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 3.2 + ti * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: `translateZ(35px)`,
                    top: ti === 0 ? "-14px" : ti === 2 ? "auto" : "46%",
                    bottom: ti === 2 ? "-14px" : "auto",
                    left: ti === 3 ? "-16px" : ti === 1 ? "auto" : "46%",
                    right: ti === 1 ? "-16px" : "auto",
                  }}
                  className="hidden sm:block absolute w-9 h-11 object-contain pixelated pointer-events-none z-30 drop-shadow-[0_8px_16px_rgba(255,215,0,0.5)]"
                />
              ))}

              {/* LAYER 1: 3D Extruded Carved Mahogany & Gold Drum Cylinder Rim */}
              <div
                style={{ transform: "translateZ(-12px) translateY(10px)" }}
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#6B4930] via-[#2B1910] to-[#0D0704] border-[6px] border-[#C99A35] shadow-[0_22px_0_#140A05]"
              />

              {/* =============================================================
                  TOP DRAGON CLAPPER POINTER + REALTIME SPARK BURST EMITTER
              ============================================================== */}
              <div
                style={{ transform: "translateZ(65px)" }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center"
              >
                <motion.div
                  animate={{ rotate: clapperAngle }}
                  transition={{ type: "spring", stiffness: 520, damping: 14 }}
                  style={{ transformOrigin: "50% 10px" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#FFF8E6] via-[#FFD700] to-[#B45309] border-4 border-[#2C1A10] shadow-[0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#CB5245] border border-[#FFF8E6] animate-pulse" />
                  </div>
                  <div
                    className="w-0 h-0 -mt-2"
                    style={{
                      borderLeft: "16px solid transparent",
                      borderRight: "16px solid transparent",
                      borderTop: "32px solid #FFD700",
                      filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.95))",
                    }}
                  />
                </motion.div>

                {/* Real-time Tangential Peg Spark Burst Emitter */}
                <div className="relative w-2 h-2 -mt-2">
                  {pegSparks.map((sp) => (
                    <motion.span
                      key={sp.id}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1.3 }}
                      animate={{
                        x: sp.dx,
                        y: sp.dy,
                        opacity: 0,
                        scale: 0.2,
                      }}
                      transition={{ duration: 0.34, ease: "easeOut" }}
                      style={{ backgroundColor: sp.color }}
                      className="absolute w-2 h-2 rounded-full shadow-[0_0_12px_#FFD700]"
                    />
                  ))}
                </div>
              </div>

              {/* =============================================================
                  RING 2 & 3: ROTATING 8-WEDGE WHEEL SVG + 24 GOLDEN PEGS
              ============================================================== */}
              <div
                className="w-full h-full rounded-full shadow-[inset_0_0_45px_rgba(0,0,0,0.9)] relative"
                style={{
                  transform: `translateZ(0px) rotate(${
                    rotation - (isCharging ? chargeLevel * 18 : 0)
                  }deg)`,
                  transition: isSpinning
                    ? "none"
                    : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="bronzeRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF8E6" />
                      <stop offset="30%" stopColor="#FFD700" />
                      <stop offset="68%" stopColor="#B88238" />
                      <stop offset="100%" stopColor="#4A2E1B" />
                    </linearGradient>

                    <radialGradient id="pegGold" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="45%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#7C2D12" />
                    </radialGradient>

                    {WHEEL_PRIZES.map((prize, i) => (
                      <radialGradient key={prize.id} id={`wedgeGrad-${i}`} cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor={prize.bgGradient[0]} />
                        <stop offset="100%" stopColor={prize.bgGradient[1]} />
                      </radialGradient>
                    ))}
                  </defs>

                  {/* Outer Carved Wood & Bronze Rim */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={246}
                    fill="#1C110B"
                    stroke="url(#bronzeRimGrad)"
                    strokeWidth="9"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={233}
                    fill="none"
                    stroke="#C99A35"
                    strokeWidth="2.5"
                    strokeDasharray="8 5"
                  />

                  {/* 8 Carved Lacquer Prize Wedges */}
                  {WHEEL_PRIZES.map((prize, idx) => {
                    const startAngle = idx * sliceDeg;
                    const endAngle = (idx + 1) * sliceDeg;
                    const midAngle = startAngle + sliceDeg / 2;
                    const pathData = createWedgePath(cx, cy, rInner, rOuter, startAngle, endAngle);
                    const iconPos = polarToCartesian(cx, cy, 146, midAngle);
                    const textPos = polarToCartesian(cx, cy, 196, midAngle);

                    return (
                      <g key={prize.id}>
                        <path
                          d={pathData}
                          fill={`url(#wedgeGrad-${idx})`}
                          stroke="#D99B26"
                          strokeWidth="3"
                        />
                        <path
                          d={createWedgePath(cx, cy, rOuter - 12, rOuter, startAngle, endAngle)}
                          fill={prize.accentHex}
                          opacity={0.45}
                        />

                        {/* High-Contrast Carved Label on Rim */}
                        <g
                          transform={`translate(${textPos.x}, ${textPos.y}) rotate(${midAngle})`}
                        >
                          <text
                            x="0"
                            y="-2"
                            textAnchor="middle"
                            fill="#FFFDF2"
                            fontSize="11.5"
                            fontWeight="900"
                            letterSpacing="0.8"
                            style={{
                              textShadow: "0 2px 4px rgba(0,0,0,0.95)",
                            }}
                          >
                            {prize.shortTitle}
                          </text>
                          <text
                            x="0"
                            y="10"
                            textAnchor="middle"
                            fill={prize.tierColor}
                            fontSize="8.5"
                            fontWeight="900"
                          >
                            {prize.tier}
                          </text>
                        </g>

                        {/* Prize Medallion Frame + High-Res Sprite */}
                        <g
                          transform={`translate(${iconPos.x}, ${iconPos.y}) rotate(${midAngle})`}
                        >
                          <circle
                            cx="0"
                            cy="0"
                            r="29"
                            fill="#0D0704"
                            fillOpacity="0.82"
                            stroke={prize.accentHex}
                            strokeWidth="2.5"
                          />
                          <image
                            href={prize.sprite}
                            x="-23"
                            y="-23"
                            width="46"
                            height="46"
                            preserveAspectRatio="xMidYMid meet"
                          />
                        </g>
                      </g>
                    );
                  })}

                  {/* 24 Physical Golden Pegs */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const angle = i * 15;
                    const p = polarToCartesian(cx, cy, rOuter + 4, angle);
                    return (
                      <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="5.5"
                        fill="url(#pegGold)"
                        stroke="#1A0D06"
                        strokeWidth="1.6"
                      />
                    );
                  })}

                  {/* Inner Dong Son Sun Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rInner + 6}
                    fill="none"
                    stroke="url(#bronzeRimGrad)"
                    strokeWidth="6"
                  />
                </svg>
              </div>

              {/* Specular Anisotropic Sheen Layer */}
              <div
                style={{
                  transform: "translateZ(20px)",
                  background: `radial-gradient(circle at ${50 + wheelTilt.y * 2}% ${
                    35 - wheelTilt.x * 2
                  }%, rgba(255,255,255,0.24), transparent 55%)`,
                }}
                className="absolute inset-6 rounded-full pointer-events-none"
              />

              {/* =============================================================
                  CENTER 3D SHRINE HUB BUTTON (HOLD TO CHARGE OR CLICK TO SPIN)
              ============================================================== */}
              <div
                style={{ transform: "translateZ(48px)" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <button
                  type="button"
                  onMouseDown={startCharge}
                  onMouseUp={releaseCharge}
                  onTouchStart={startCharge}
                  onTouchEnd={releaseCharge}
                  disabled={isSpinning}
                  className={`pointer-events-auto relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center border-4 transition-shadow duration-200 cursor-pointer active:scale-95 ${
                    spinsLeft > 0 && !isSpinning
                      ? "bg-gradient-to-b from-[#FFF8E6] via-[#FFD700] to-[#B45309] border-[#2C1A10] text-[#1C110B] shadow-[0_12px_30px_rgba(0,0,0,0.95),0_0_40px_rgba(255,215,0,0.75)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.95),0_0_60px_rgba(255,235,120,0.95)] hover:brightness-105"
                      : "bg-gradient-to-b from-[#4E3629] to-[#261810] border-[#88603D] text-[#A88B73]"
                  }`}
                >
                  {/* Charge Progress Ring */}
                  {isCharging && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="#CB5245"
                        strokeWidth="6"
                        strokeDasharray={`${chargeLevel * 310} 310`}
                      />
                    </svg>
                  )}

                  <span className="text-[10px] font-black uppercase tracking-widest text-[#7C2D12] pointer-events-none">
                    {isSpinning
                      ? "ĐANG XOAY"
                      : isCharging
                      ? `TỤ KHÍ ${Math.round(chargeLevel * 100)}%`
                      : "TRỐNG ĐỒNG"}
                  </span>
                  <span className="font-wood text-xl sm:text-2xl leading-none my-0.5 text-[#1C110B] pointer-events-none">
                    {isSpinning ? "..." : "QUAY LỘC"}
                  </span>
                  <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#1C110B] text-[#FFD700] text-[10px] font-black pointer-events-none">
                    {spinsLeft} LƯỢT
                  </span>
                </button>
              </div>
            </motion.div>

            {/* ===============================================================
                3D DRAGON PULL-LEVER ON THE RIGHT FLANK (DANTE ROSSI & ETHAN COLE)
            ================================================================ */}
            <div className="hidden md:flex flex-col items-center ml-5 z-30">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700] mb-2 text-center">
                CẦN GẠT<br />THẦN CƠ
              </div>
              <div className="relative w-14 h-52 rounded-2xl carved-wood-box flex flex-col items-center justify-between p-2.5">
                {/* Lever Slot Track */}
                <div className="w-3 h-36 rounded-full bg-black border border-[#6B4930] shadow-inner relative flex justify-center">
                  {/* Animated 3D Pull Arm & Dragon Orb Handle */}
                  <motion.button
                    onClick={handlePullDragonLever}
                    animate={{
                      y: leverPulled ? 88 : 0,
                      scale: leverPulled ? 0.94 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 16,
                    }}
                    whileHover={{ scale: 1.12 }}
                    title="Kéo Cần Gạt Rồng Vàng để Quay Lộc Cực Đại!"
                    className=" -top-2 w-12 h-12 rounded-full bg-gradient-to-b from-[#FFE885] via-[#EF4444] to-[#7F1D1D] border-3 border-[#FFD700] shadow-[0_8px_18px_rgba(0,0,0,0.9),0_0_20px_rgba(239,68,68,0.7)] flex items-center justify-center cursor-pointer"
                  >
                    <Zap className="w-5 h-5 text-[#FFF8E6] fill-current" />
                  </motion.button>
                </div>
                <span className="text-[9px] font-black text-amber-300 uppercase">
                  KÉO XUỐNG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D SPEECH SHRINE + 3-SLOT TREASURE CHEST */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 order-3">
          {/* Ông Thổ Địa Live Animated Shrine Box */}
          <div className="carved-wood-box rounded-2xl p-4 flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-1">
              <img
                src="/game-assets/pixel/mieu.png"
                alt="Miếu Ông Địa"
                className="w-20 h-20 object-contain pixelated opacity-90"
              />
              <div className="-ml-3">
                <ThoDiaAnimatedSprite
                  mode={isSpinning ? "wave" : wonPrize ? "laugh" : "fan"}
                  size={84}
                />
              </div>
            </div>

            <div className="w-full bg-[#FFF8E6] text-[#22150E] rounded-xl p-3 border-2 border-[#88603D] shadow-inner">
              <p className="font-wood text-sm leading-snug text-[#1C110B]">
                {wonPrize
                  ? `“${wonPrize.thoDiaQuote}”`
                  : isSpinning
                  ? "“Xoay cho mạnh vô con! Lộc lớn đang tới!”"
                  : "“Nhấn giữ Trống Đồng hoặc kéo Cần Gạt Rồng Vàng bên cạnh để phóng lộc!”"}
              </p>
            </div>
          </div>

          {/* 3-Slot Visual Loot Chest with Clear Empty State */}
          <div className="carved-wood-box rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
                TÚI LỘC ĐÃ NHẬN
              </span>
              <span className="text-xs font-black text-[#BEF264] flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                {wallet.toLocaleString("vi-VN")} Xu Làng
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((slotIdx) => {
                const item = lootBag[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1.5 relative ${
                      item
                        ? "bg-[#261810] border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.25)]"
                        : "bg-[#0D0704]/70 border-dashed border-[#513727]"
                    }`}
                  >
                    {item ? (
                      <>
                        <img
                          src={item.sprite}
                          alt={item.shortTitle}
                          className="w-10 h-10 object-contain pixelated"
                        />
                        <span className="text-[9px] font-black text-[#FFF8E6] truncate w-full text-center mt-1">
                          {item.shortTitle}
                        </span>
                      </>
                    ) : (
                      <>
                        <PackageOpen className="w-4 h-4 text-[#6B4930]" />
                        <span className="text-[9px] font-semibold text-[#8C7667] mt-1">
                          Ngăn Trống
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {lootBag.length === 0 && (
              <p className="mt-2.5 text-[11px] text-[#D9D2C5] text-center">
                Chưa có vật phẩm. Hãy nhấn giữ Trống Đồng để quay lộc đầu mùa!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. ULTRA-CLEAN VISUAL PRIZE REVEAL MODAL */}
      <AnimatePresence>
        {wonPrize && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            role="dialog"
            aria-label={`Phần thưởng đạt được: ${wonPrize.fullName}`}
            className="mt-10 carved-wood-box rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setWonPrize(null)}
              aria-label="Đóng thông báo phần thưởng"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1C110B] border border-[#F2D39B]/40 flex items-center justify-center text-[#F7F3E8] hover:border-[#F2D39B] cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-28 h-28 rounded-2xl bg-[#0D0704] border-2 border-[#FFD700] flex items-center justify-center p-3 shrink-0 shadow-[0_0_40px_rgba(255,215,0,0.4)]">
                <img
                  src={wonPrize.sprite}
                  alt={wonPrize.fullName}
                  className="w-20 h-20 object-contain pixelated"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-[#FFD700] text-[#1C110B] mb-2">
                  {wonPrize.tier} • +{wonPrize.moneyBonus.toLocaleString("vi-VN")} Xu Làng
                </span>
                <h3 className="font-wood text-2xl sm:text-3xl text-[#FFE89E]">
                  {wonPrize.fullName}
                </h3>
                <p className="text-sm font-bold text-[#FFD700] mt-1">
                  “{wonPrize.thoDiaQuote}”
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 bg-[#0D0704] border-2 border-[#FFD700] rounded-xl px-4 py-2.5">
                  <code className="text-sm font-black text-[#FFD700] tracking-wider">
                    {giftCode}
                  </code>
                  <button
                    type="button"
                    aria-label="Sao chép mã kỷ niệm"
                    onClick={() => {
                      navigator.clipboard.writeText(giftCode);
                      setCopied(true);
                      soundEngine.playSfx("interact", 0.4);
                    }}
                    className="p-1.5 rounded-lg bg-[#FFD700] text-[#1C110B] font-bold cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => launchSpin(1)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-b from-[#FFE082] to-[#C99A35] border-2 border-white text-[#1C110B] font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_4px_0_#5C2804]"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Quay Tiếp ({spinsLeft})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
