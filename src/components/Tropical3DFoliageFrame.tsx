"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WeatherMode } from "./WeatherEngineCanvas";

interface Tropical3DFoliageFrameProps {
  weather: WeatherMode;
}

/**
 * 3D/4D Spatial Environment Frame:
 * - Multi-plane Coconut Palms (Cây Dừa Bến Nước) & Jointed Bamboo Groves (Rặng Tre Làng)
 * - Reacts in 4D to Time-of-Day lighting (Sun / Rain / Sunset / Night), Wind Velocity, Scroll Depth, and Mouse Parallax
 */
export default function Tropical3DFoliageFrame({ weather }: Tropical3DFoliageFrameProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Scroll-driven 3D camera vertical parallax
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // 4D Wind & Lighting Parameters per WeatherMode
  const windDuration = weather === "rain" ? 2.4 : weather === "sunset" ? 5.2 : 4.2;
  const windLean = weather === "rain" ? 9 : 0;

  const palette = {
    sun: {
      trunkDark: "#3e2723",
      trunkLight: "#8d6e63",
      frondMain: "#2e7d32",
      frondRim: "#cddc39",
      bambooMain: "#33691e",
      bambooNode: "#aed581",
      bambooRim: "#fff59d",
      coconutColor: "#689f38",
      CoconutHighlight: "#dce775",
      ambientGlow: "rgba(253, 224, 71, 0.22)",
      filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.45))",
    },
    rain: {
      trunkDark: "#1e293b",
      trunkLight: "#475569",
      frondMain: "#0f5132",
      frondRim: "#5eead4",
      bambooMain: "#115e59",
      bambooNode: "#2dd4bf",
      bambooRim: "#99f6e4",
      coconutColor: "#15803d",
      CoconutHighlight: "#6ee7b7",
      ambientGlow: "rgba(56, 189, 248, 0.22)",
      filter: "drop-shadow(0 20px 32px rgba(2,6,23,0.75))",
    },
    sunset: {
      trunkDark: "#27121b",
      trunkLight: "#7c2d12",
      frondMain: "#3f2318",
      frondRim: "#fb923c",
      bambooMain: "#3b1d14",
      bambooNode: "#f97316",
      bambooRim: "#fde047",
      coconutColor: "#7c2d12",
      CoconutHighlight: "#fdba74",
      ambientGlow: "rgba(249, 115, 22, 0.26)",
      filter: "drop-shadow(0 20px 32px rgba(45,10,25,0.75))",
    },
    night: {
      trunkDark: "#090d16",
      trunkLight: "#1e293b",
      frondMain: "#0b2922",
      frondRim: "#34d399",
      bambooMain: "#09221c",
      bambooNode: "#10b981",
      bambooRim: "#fde047",
      coconutColor: "#064e3b",
      CoconutHighlight: "#34d399",
      ambientGlow: "rgba(245, 158, 11, 0.18)",
      filter: "drop-shadow(0 22px 36px rgba(0,0,0,0.88))",
    },
  }[weather];

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      {/* =====================================================================
          1. TOP-LEFT 3D COCONUT PALM CANOPY (CÂY DỪA XIÊM BẾN NƯỚC - TRÁI)
      ====================================================================== */}
      <motion.div
        style={{
          y: foregroundY,
          transform: `translate3d(${mouse.x * -22}px, ${mouse.y * -14}px, 80px) rotateY(${mouse.x * 6}deg) rotateX(${-mouse.y * 5}deg)`,
          transformStyle: "preserve-3d",
          filter: palette.filter,
        }}
        className="absolute -top-12 -left-16 md:-left-10 w-[340px] md:w-[500px] h-[440px] md:h-[580px] origin-top-left transition-transform duration-300 ease-out"
      >
        <motion.svg
          viewBox="0 0 500 560"
          fill="none"
          className="w-full h-full overflow-visible"
          animate={{
            rotateZ: [0 + windLean * 0.4, 2.2 + windLean, -0.8 + windLean * 0.2, 0 + windLean * 0.4],
          }}
          transition={{ duration: windDuration, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="palmTrunkLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={palette.trunkDark} />
              <stop offset="65%" stopColor={palette.trunkLight} />
              <stop offset="100%" stopColor={palette.frondRim} stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="palmFrondGrad" x1="0" y1="0" x2="1" y2="0.4">
              <stop offset="0%" stopColor={palette.frondMain} />
              <stop offset="70%" stopColor={palette.bambooMain} />
              <stop offset="100%" stopColor={palette.frondRim} />
            </linearGradient>
            <radialGradient id="coconutGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor={palette.CoconutHighlight} />
              <stop offset="55%" stopColor={palette.coconutColor} />
              <stop offset="100%" stopColor={palette.trunkDark} />
            </radialGradient>
          </defs>

          {/* Curved 3D Segmented Coconut Trunk */}
          <path
            d="M -25 460 Q 45 270 155 115 L 195 135 Q 92 285 28 490 Z"
            fill="url(#palmTrunkLeft)"
          />
          {/* 3D Trunk Rings (Khấc thân dừa 3D) */}
          {[0.15, 0.28, 0.42, 0.56, 0.7, 0.84].map((t, i) => {
            const cx = -10 + t * 175;
            const cy = 450 - t * 320;
            return (
              <path
                key={i}
                d={`M ${cx - 22} ${cy - 8} Q ${cx} ${cy + 8} ${cx + 24} ${cy + 2}`}
                stroke={palette.frondRim}
                strokeOpacity={0.28}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* 3D Swaying Coconut Fronds (Tàu Lá Dừa Xòe 3D) */}
          {[
            { angle: -28, scale: 1.05, delay: 0 },
            { angle: -4, scale: 1.15, delay: 0.4 },
            { angle: 22, scale: 1.08, delay: 0.8 },
            { angle: 48, scale: 0.96, delay: 1.2 },
            { angle: 76, scale: 0.88, delay: 0.3 },
          ].map((frond, idx) => (
            <motion.g
              key={idx}
              style={{ transformOrigin: "172px 124px" }}
              animate={{
                rotate: [
                  frond.angle + windLean,
                  frond.angle + 4.5 + windLean * 1.3,
                  frond.angle - 2 + windLean * 0.6,
                  frond.angle + windLean,
                ],
              }}
              transition={{
                duration: windDuration + idx * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: frond.delay,
              }}
            >
              {/* Main Frond Spine (Sống tàu dừa) */}
              <path
                d={`M 172 124 Q ${290 * frond.scale} ${75 * frond.scale} ${435 * frond.scale} ${145 * frond.scale}`}
                stroke={palette.frondRim}
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Pinnate Leaflets (Lá chét dừa rủ xuống 3D) */}
              {Array.from({ length: 14 }).map((_, li) => {
                const p = (li + 1) / 15;
                const lx = 172 + p * (260 * frond.scale);
                const ly = 124 - Math.sin(p * Math.PI) * 34 + p * 22;
                const leafLen = (1 - Math.abs(p - 0.45) * 1.1) * 68 * frond.scale;
                return (
                  <g key={li}>
                    {/* Lower hanging leaflet */}
                    <path
                      d={`M ${lx} ${ly} Q ${lx + 10} ${ly + leafLen * 0.55} ${lx - 6} ${ly + leafLen}`}
                      fill="url(#palmFrondGrad)"
                      stroke={palette.frondRim}
                      strokeOpacity="0.35"
                      strokeWidth="0.9"
                    />
                    {/* Upper flaring leaflet */}
                    <path
                      d={`M ${lx} ${ly} Q ${lx + 14} ${ly - leafLen * 0.42} ${lx + 28} ${ly - leafLen * 0.55}`}
                      fill="url(#palmFrondGrad)"
                      opacity="0.88"
                    />
                  </g>
                );
              })}
            </motion.g>
          ))}

          {/* Cluster of 3D Young Coconuts (Buồng Dừa Xiêm Xanh/Vàng 3D) */}
          <g transform="translate(148, 118)">
            {[
              { cx: 10, cy: 18, r: 16 },
              { cx: 30, cy: 22, r: 17 },
              { cx: 20, cy: 36, r: 18 },
              { cx: 2, cy: 34, r: 15 },
              { cx: 36, cy: 38, r: 15 },
            ].map((coco, ci) => (
              <circle
                key={ci}
                cx={coco.cx}
                cy={coco.cy}
                r={coco.r}
                fill="url(#coconutGrad)"
                stroke={palette.frondRim}
                strokeOpacity="0.4"
                strokeWidth="1.2"
              />
            ))}
          </g>
        </motion.svg>
      </motion.div>

      {/* =====================================================================
          2. TOP-RIGHT 3D COCONUT PALM & HANGING LANTERN (CÂY DỪA & ĐÈN LỒNG PHẢI)
      ====================================================================== */}
      <motion.div
        style={{
          y: foregroundY,
          transform: `translate3d(${mouse.x * 22}px, ${mouse.y * -14}px, 80px) rotateY(${mouse.x * 6}deg)`,
          transformStyle: "preserve-3d",
          filter: palette.filter,
        }}
        className="absolute -top-14 -right-20 md:-right-10 w-[330px] md:w-[480px] h-[420px] md:h-[540px] origin-top-right transition-transform duration-300 ease-out"
      >
        <motion.svg
          viewBox="0 0 500 540"
          fill="none"
          className="w-full h-full overflow-visible scale-x-[-1]"
          animate={{
            rotateZ: [0 - windLean * 0.3, 2.5 - windLean * 0.8, -1.2, 0 - windLean * 0.3],
          }}
          transition={{ duration: windDuration + 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Curved Trunk */}
          <path
            d="M -25 430 Q 40 250 145 105 L 182 125 Q 85 265 20 460 Z"
            fill="url(#palmTrunkLeft)"
          />
          {/* Swaying Fronds */}
          {[
            { angle: -22, scale: 1.0, delay: 0.2 },
            { angle: 5, scale: 1.12, delay: 0.6 },
            { angle: 32, scale: 1.02, delay: 1.0 },
            { angle: 58, scale: 0.9, delay: 0.4 },
          ].map((frond, idx) => (
            <motion.g
              key={idx}
              style={{ transformOrigin: "162px 114px" }}
              animate={{
                rotate: [frond.angle, frond.angle + 4, frond.angle - 2, frond.angle],
              }}
              transition={{
                duration: windDuration + idx * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: frond.delay,
              }}
            >
              <path
                d={`M 162 114 Q ${275 * frond.scale} ${68 * frond.scale} ${420 * frond.scale} ${138 * frond.scale}`}
                stroke={palette.frondRim}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {Array.from({ length: 13 }).map((_, li) => {
                const p = (li + 1) / 14;
                const lx = 162 + p * (250 * frond.scale);
                const ly = 114 - Math.sin(p * Math.PI) * 30 + p * 20;
                const leafLen = (1 - Math.abs(p - 0.45) * 1.1) * 62 * frond.scale;
                return (
                  <path
                    key={li}
                    d={`M ${lx} ${ly} Q ${lx + 9} ${ly + leafLen * 0.55} ${lx - 5} ${ly + leafLen}`}
                    fill="url(#palmFrondGrad)"
                    stroke={palette.frondRim}
                    strokeOpacity="0.3"
                    strokeWidth="0.8"
                  />
                );
              })}
            </motion.g>
          ))}

          {/* Young Coconuts */}
          <g transform="translate(138, 110)">
            {[
              { cx: 12, cy: 16, r: 15 },
              { cx: 28, cy: 22, r: 16 },
              { cx: 18, cy: 34, r: 17 },
            ].map((coco, ci) => (
              <circle key={ci} cx={coco.cx} cy={coco.cy} r={coco.r} fill="url(#coconutGrad)" />
            ))}
          </g>
        </motion.svg>
      </motion.div>

      {/* =====================================================================
          3. LEFT & RIGHT 3D JOINTED BAMBOO GROVES (RẶNG TRE LÀNG 3D ĐAN KHỚP)
      ====================================================================== */}
      {/* LEFT BAMBOO GROVE */}
      <motion.div
        style={{
          y: midgroundY,
          transform: `translate3d(${mouse.x * -16}px, ${mouse.y * -8}px, 40px)`,
          filter: palette.filter,
        }}
        className="hidden sm:block absolute bottom-[-40px] -left-8 w-[150px] md:w-[210px] h-[78vh] origin-bottom-left"
      >
        <motion.svg
          viewBox="0 0 220 700"
          fill="none"
          className="w-full h-full overflow-visible"
          animate={{
            skewX: [0 - windLean * 0.4, -1.8 - windLean * 0.8, 0.8, 0 - windLean * 0.4],
          }}
          transition={{ duration: windDuration * 1.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="bambooCulm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.trunkDark} />
              <stop offset="45%" stopColor={palette.bambooMain} />
              <stop offset="85%" stopColor={palette.bambooNode} />
              <stop offset="100%" stopColor={palette.bambooRim} />
            </linearGradient>
          </defs>

          {/* 3 Layered Bamboo Culms (3 Thân Tre Làng ở các độ sâu Z khác nhau) */}
          {[
            { xBase: 22, xTop: 68, width: 16, opacity: 0.95 },
            { xBase: 54, xTop: 112, width: 12, opacity: 0.78 },
            { xBase: 8, xTop: 32, width: 10, opacity: 0.6 },
          ].map((culm, ci) => (
            <g key={ci} opacity={culm.opacity}>
              {/* Bamboo Stalk */}
              <path
                d={`M ${culm.xBase} 700 Q ${(culm.xBase + culm.xTop) * 0.45} 350 ${culm.xTop} 20`}
                stroke="url(#bambooCulm)"
                strokeWidth={culm.width}
                strokeLinecap="round"
              />
              {/* Bamboo Internode Rings (Đốt tre 3D) & Leaf Clusters (Chùm lá tre) */}
              {[0.15, 0.3, 0.45, 0.6, 0.75, 0.88].map((t, ni) => {
                const bx = culm.xBase + (culm.xTop - culm.xBase) * t - Math.sin(t * Math.PI) * 6;
                const by = 700 - t * 680;
                return (
                  <g key={ni}>
                    {/* Node Ring */}
                    <line
                      x1={bx - culm.width * 0.65}
                      y1={by}
                      x2={bx + culm.width * 0.65}
                      y2={by}
                      stroke={palette.bambooRim}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    {/* Bamboo Leaf Sprigs (Cành lá tre mảnh bay trong gió) */}
                    {ni % 2 === ci % 2 && (
                      <motion.g
                        style={{ transformOrigin: `${bx}px ${by}px` }}
                        animate={{
                          rotate: [0 + windLean, 6 + windLean * 1.4, -3, 0 + windLean],
                        }}
                        transition={{
                          duration: windDuration * 0.85,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: ni * 0.25,
                        }}
                      >
                        <path
                          d={`M ${bx} ${by} Q ${bx + 38} ${by - 18} ${bx + 76} ${by - 6}`}
                          stroke={palette.bambooNode}
                          strokeWidth="1.5"
                          fill="none"
                        />
                        {/* 4 Lanceolate Bamboo Leaves */}
                        {[
                          { dx: 24, dy: -10, rot: -18 },
                          { dx: 44, dy: -12, rot: 12 },
                          { dx: 62, dy: -9, rot: 28 },
                          { dx: 74, dy: -5, rot: 42 },
                        ].map((lf, lfi) => (
                          <path
                            key={lfi}
                            d={`M ${bx + lf.dx} ${by + lf.dy} Q ${bx + lf.dx + 22} ${by + lf.dy + 4} ${bx + lf.dx + 38} ${by + lf.dy + 18} Q ${bx + lf.dx + 16} ${by + lf.dy + 14} ${bx + lf.dx} ${by + lf.dy} Z`}
                            fill={palette.bambooNode}
                            stroke={palette.bambooRim}
                            strokeWidth="0.6"
                            transform={`rotate(${lf.rot} ${bx + lf.dx} ${by + lf.dy})`}
                          />
                        ))}
                      </motion.g>
                    )}
                  </g>
                );
              })}
            </g>
          ))}
        </motion.svg>
      </motion.div>

      {/* RIGHT BAMBOO GROVE + SWINGING LANTERN */}
      <motion.div
        style={{
          y: midgroundY,
          transform: `translate3d(${mouse.x * 16}px, ${mouse.y * -8}px, 40px)`,
          filter: palette.filter,
        }}
        className="hidden sm:block absolute bottom-[-40px] -right-8 w-[150px] md:w-[210px] h-[78vh] origin-bottom-right"
      >
        <motion.svg
          viewBox="0 0 220 700"
          fill="none"
          className="w-full h-full overflow-visible scale-x-[-1]"
          animate={{
            skewX: [0 + windLean * 0.4, 1.8 + windLean * 0.8, -0.8, 0 + windLean * 0.4],
          }}
          transition={{ duration: windDuration * 1.15, repeat: Infinity, ease: "easeInOut" }}
        >
          {[
            { xBase: 24, xTop: 64, width: 15, opacity: 0.92 },
            { xBase: 52, xTop: 104, width: 11, opacity: 0.72 },
          ].map((culm, ci) => (
            <g key={ci} opacity={culm.opacity}>
              <path
                d={`M ${culm.xBase} 700 Q ${(culm.xBase + culm.xTop) * 0.45} 350 ${culm.xTop} 35`}
                stroke="url(#bambooCulm)"
                strokeWidth={culm.width}
                strokeLinecap="round"
              />
              {[0.18, 0.34, 0.5, 0.66, 0.82].map((t, ni) => {
                const bx = culm.xBase + (culm.xTop - culm.xBase) * t - Math.sin(t * Math.PI) * 5;
                const by = 700 - t * 665;
                return (
                  <g key={ni}>
                    <line
                      x1={bx - culm.width * 0.65}
                      y1={by}
                      x2={bx + culm.width * 0.65}
                      y2={by}
                      stroke={palette.bambooRim}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                    <motion.g
                      style={{ transformOrigin: `${bx}px ${by}px` }}
                      animate={{
                        rotate: [0, 5, -3, 0],
                      }}
                      transition={{
                        duration: windDuration * 0.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: ni * 0.3,
                      }}
                    >
                      {[
                        { dx: 18, dy: -8, rot: -14 },
                        { dx: 36, dy: -10, rot: 16 },
                        { dx: 54, dy: -6, rot: 32 },
                      ].map((lf, lfi) => (
                        <path
                          key={lfi}
                          d={`M ${bx + lf.dx} ${by + lf.dy} Q ${bx + lf.dx + 20} ${by + lf.dy + 4} ${bx + lf.dx + 34} ${by + lf.dy + 16} Q ${bx + lf.dx + 14} ${by + lf.dy + 12} ${bx + lf.dx} ${by + lf.dy} Z`}
                          fill={palette.bambooNode}
                          stroke={palette.bambooRim}
                          strokeWidth="0.6"
                          transform={`rotate(${lf.rot} ${bx + lf.dx} ${by + lf.dy})`}
                        />
                      ))}
                    </motion.g>
                  </g>
                );
              })}
            </g>
          ))}
        </motion.svg>

        {/* Hanging Village Lantern on Right Bamboo Branch (Glows brightly at Sunset/Night) */}
        <motion.div
          animate={{
            rotate: [-4 + windLean * 0.8, 5 + windLean * 1.2, -4 + windLean * 0.8],
          }}
          transition={{ duration: windDuration * 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] right-14 origin-top"
        >
          <div className="w-[2px] h-10 bg-amber-900/80 mx-auto" />
          <div className="relative">
            {(weather === "night" || weather === "sunset") && (
              <div className="absolute -inset-6 rounded-full bg-amber-500/45 blur-xl animate-pulse" />
            )}
            <img
              src="/game-assets/ornaments/decor/lantern.png"
              alt=""
              className="w-9 h-12 object-contain drop-shadow-[0_8px_16px_rgba(245,158,11,0.5)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          4. AMBIENT 4D ATMOSPHERIC VIGNETTE & SUN/MOON RIM GLOW
      ====================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${palette.ambientGlow}, transparent 62%)`,
        }}
      />
    </div>
  );
}
