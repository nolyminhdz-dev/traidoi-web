"use client";

import React from "react";
import { WeatherMode } from "./WeatherEngineCanvas";

interface Tropical3DFoliageFrameProps {
  weather: WeatherMode;
}

/**
 * Weather-adaptive 2.5D foliage color adjustments
 * Keeps foliage vibrant and fresh in all weather conditions without muddy darkening
 */
const WEATHER_FOLIAGE_FILTER: Record<WeatherMode, string> = {
  sun: "brightness(1.05) saturate(1.1) drop-shadow(0 6px 16px rgba(10,32,24,0.35))",
  rain: "brightness(0.98) saturate(1.15) hue-rotate(5deg) drop-shadow(0 6px 18px rgba(5,20,32,0.4))",
  sunset: "brightness(1.02) saturate(1.18) sepia(0.18) hue-rotate(-8deg) drop-shadow(0 6px 18px rgba(35,15,10,0.4))",
  night: "brightness(0.85) saturate(1.12) hue-rotate(18deg) drop-shadow(0 6px 20px rgba(4,16,24,0.55))",
};

/**
 * Tropical 2.5D Foliage Frame (Section XI & XVI)
 * - Khung lá dừa & tre 2.5D ở rìa màn hình tinh tế, tươi sáng, mang đậm chất Làng Quê Việt Nam.
 * - Hiển thị hài hòa trên cả Desktop & Mobile, thu nhỏ tinh gọn tại các góc ngoài cùng.
 * - Tuyệt đối không che khuất bất kỳ nút bấm, thanh điều hướng hay nội dung nào (pointer-events-none).
 */
export default function Tropical3DFoliageFrame({ weather }: Tropical3DFoliageFrameProps) {
  return (
    <aside
      aria-hidden="true"
      style={{ filter: WEATHER_FOLIAGE_FILTER[weather] }}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none transition-all duration-700 opacity-80"
    >
      <style>{`
        @keyframes foliageSwayLeft {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1.4deg) scale(1.01); }
        }
        @keyframes foliageSwayRight {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-1.3deg) scale(1.01); }
        }
        .anim-foliage-left {
          transform-origin: top left;
          animation: foliageSwayLeft 9s ease-in-out infinite;
        }
        .anim-foliage-right {
          transform-origin: top right;
          animation: foliageSwayRight 8.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-foliage-left,
          .anim-foliage-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. TOP-LEFT: TÁN LÁ DỪA MIỀN TÂY 2.5D (VIBRANT COCONUT PALM FROND)
          ==================================================================== */}
      <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 lg:-top-8 lg:-left-8 w-[110px] h-[95px] sm:w-[170px] sm:h-[145px] lg:w-[260px] lg:h-[225px] 2xl:w-[290px] 2xl:h-[250px] pointer-events-none anim-foliage-left">
        <svg
          viewBox="0 0 320 260"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id="palmStemGrad" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#12382B" />
              <stop offset="45%" stopColor="#1E5C47" />
              <stop offset="85%" stopColor="#3B8A6E" />
              <stop offset="100%" stopColor="#F5CC72" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="palmLeafGrad" x1="0%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#1B4D3E" />
              <stop offset="35%" stopColor="#2E7D63" />
              <stop offset="75%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#F5CC72" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="palmHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22604E" />
              <stop offset="60%" stopColor="#67AF65" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>

          <g>
            {/* Cuống lá dừa chính (Central Spine) */}
            <path
              d="M -15,10 Q 120,28 275,110"
              fill="none"
              stroke="url(#palmStemGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />

            {/* Các phiến lá dừa 2.5D tỏa ra tự nhiên */}
            {[
              { d: "M 20,18 Q 36,54 22,90", w: 3.4 },
              { d: "M 45,22 Q 68,64 50,112", w: 3.6 },
              { d: "M 75,28 Q 102,74 80,132", w: 3.8 },
              { d: "M 108,36 Q 138,88 114,148", w: 3.9 },
              { d: "M 142,47 Q 174,102 148,162", w: 3.7 },
              { d: "M 178,61 Q 208,114 185,172", w: 3.4 },
              { d: "M 212,77 Q 240,126 220,178", w: 3.1 },
              { d: "M 244,95 Q 268,138 252,182", w: 2.7 },
              { d: "M 270,110 Q 288,146 276,180", w: 2.2 },
            ].map((leaf, i) => (
              <g key={`palm-leaf-${i}`}>
                {/* Lớp bóng đổ 2.5D phía sau phiến lá */}
                <path
                  d={leaf.d}
                  fill="none"
                  stroke="#0C251C"
                  strokeWidth={leaf.w + 1.2}
                  strokeLinecap="round"
                  opacity="0.38"
                  transform="translate(1.5, 2.5)"
                />
                {/* Phiến lá chính tươi sáng */}
                <path
                  d={leaf.d}
                  fill="none"
                  stroke={i % 2 === 0 ? "url(#palmLeafGrad)" : "url(#palmHighlightGrad)"}
                  strokeWidth={leaf.w}
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ====================================================================
          2. TOP-RIGHT: CÀNH TRE TRÚC VIỆT NAM 2.5D (VIBRANT BAMBOO FOLIAGE)
          ==================================================================== */}
      <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 lg:-top-8 lg:-right-8 w-[110px] h-[95px] sm:w-[170px] sm:h-[145px] lg:w-[260px] lg:h-[225px] 2xl:w-[290px] 2xl:h-[250px] pointer-events-none anim-foliage-right">
        <svg
          viewBox="0 0 320 260"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <linearGradient id="bambooCaneGrad" x1="100%" y1="0%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#1E441E" />
              <stop offset="50%" stopColor="#3F7528" />
              <stop offset="85%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#F5CC72" />
            </linearGradient>

            <linearGradient id="bambooLeafGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1D4A27" />
              <stop offset="40%" stopColor="#2E7D44" />
              <stop offset="80%" stopColor="#67AF65" />
              <stop offset="100%" stopColor="#BEF264" />
            </linearGradient>

            <linearGradient id="bambooLeafHighlight" x1="100%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#2F6E36" />
              <stop offset="55%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>

          <g>
            {/* Cành tre mảnh uốn lượn từ góc trên phải vào trong */}
            <path
              d="M 330,8 Q 190,32 55,108"
              fill="none"
              stroke="url(#bambooCaneGrad)"
              strokeWidth="4.2"
              strokeLinecap="round"
            />

            {/* Các đốt tre 2.5D thanh nhã */}
            {[
              { cx: 275, cy: 19 },
              { cx: 215, cy: 36 },
              { cx: 155, cy: 59 },
              { cx: 100, cy: 84 },
            ].map((node, i) => (
              <ellipse
                key={`bamboo-node-${i}`}
                cx={node.cx}
                cy={node.cy}
                rx="3.2"
                ry="5"
                transform={`rotate(-22 ${node.cx} ${node.cy})`}
                fill="#F5CC72"
                stroke="#1B4D20"
                strokeWidth="1.2"
              />
            ))}

            {/* Cụm lá tre hình mũi mác tươi sáng rủ mềm */}
            {[
              { d: "M 270,22 Q 240,68 245,115 Q 262,75 270,22", g: "bambooLeafGrad" },
              { d: "M 268,22 Q 225,58 210,98 Q 238,62 268,22", g: "bambooLeafHighlight" },
              { d: "M 212,38 Q 178,82 172,130 Q 195,88 212,38", g: "bambooLeafGrad" },
              { d: "M 210,38 Q 165,65 142,110 Q 175,70 210,38", g: "bambooLeafHighlight" },
              { d: "M 152,62 Q 115,102 105,152 Q 132,106 152,62", g: "bambooLeafGrad" },
              { d: "M 150,62 Q 105,82 82,126 Q 118,88 150,62", g: "bambooLeafHighlight" },
              { d: "M 98,86 Q 64,124 50,168 Q 78,126 98,86", g: "bambooLeafGrad" },
              { d: "M 55,108 Q 24,142 8,185 Q 38,144 55,108", g: "bambooLeafHighlight" },
            ].map((leaf, idx) => (
              <g key={`bamboo-cluster-${idx}`}>
                {/* Bóng đổ 2.5D cho cụm lá tre */}
                <path
                  d={leaf.d}
                  fill="#0E2813"
                  opacity="0.32"
                  transform="translate(-1.5, 2)"
                />
                {/* Lá tre nổi bật */}
                <path
                  d={leaf.d}
                  fill={`url(#${leaf.g})`}
                  stroke="#1B4D20"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ====================================================================
          3. BOTTOM-LEFT: NHÁNH TRÚC NON GÓC DƯỚI (SUBTLE ACCENT CORNER)
          ==================================================================== */}
      <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-[80px] h-[75px] sm:w-[125px] sm:h-[115px] lg:w-[165px] lg:h-[150px] pointer-events-none anim-foliage-left">
        <svg
          viewBox="0 0 180 160"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <g>
            <path
              d="M -10,165 Q 40,110 115,65"
              fill="none"
              stroke="url(#bambooCaneGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {[
              { d: "M 35,115 Q 70,82 105,75 Q 75,98 35,115" },
              { d: "M 75,88 Q 115,55 148,45 Q 118,72 75,88" },
              { d: "M 115,65 Q 155,36 172,18 Q 148,48 115,65" },
            ].map((accentLeaf, i) => (
              <path
                key={`bamboo-bottom-left-${i}`}
                d={accentLeaf.d}
                fill="url(#bambooLeafHighlight)"
                stroke="#1B4D20"
                strokeWidth="0.7"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* ====================================================================
          4. BOTTOM-RIGHT: TÁN DỪA NƯỚC GÓC DƯỚI PHẢI (SUBTLE ACCENT CORNER)
          ==================================================================== */}
      <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 w-[85px] h-[80px] sm:w-[130px] sm:h-[120px] lg:w-[170px] lg:h-[155px] pointer-events-none anim-foliage-right">
        <svg
          viewBox="0 0 180 160"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <g transform="scale(-1, 1) translate(-180, 0)">
            <path
              d="M -10,165 Q 40,110 115,65"
              fill="none"
              stroke="url(#palmStemGrad)"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            {[
              { d: "M 25,125 Q 58,95 88,85" },
              { d: "M 65,95 Q 102,68 132,56" },
              { d: "M 105,72 Q 142,42 168,26" },
            ].map((palmAccent, i) => (
              <path
                key={`palm-bottom-right-${i}`}
                d={palmAccent.d}
                fill="none"
                stroke="url(#palmHighlightGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
      </div>
    </aside>
  );
}
