"use client";

import React from "react";
import { WeatherMode } from "./WeatherEngineCanvas";

interface Tropical3DFoliageFrameProps {
  weather: WeatherMode;
}

const WEATHER_FOLIAGE_FILTER: Record<WeatherMode, string> = {
  sun: "brightness(1.02) saturate(1.05) drop-shadow(0 12px 24px rgba(0,0,0,0.65))",
  rain: "brightness(0.8) saturate(0.9) hue-rotate(8deg) drop-shadow(0 14px 26px rgba(2,12,27,0.8))",
  sunset: "brightness(0.92) sepia(0.22) saturate(1.2) drop-shadow(0 14px 26px rgba(45,10,20,0.8))",
  night: "brightness(0.5) saturate(0.75) hue-rotate(25deg) drop-shadow(0 14px 28px rgba(0,0,0,0.9))",
};

/**
 * Subtle Framing Coconut Fronds & Bamboo Silhouettes (Desktop Only)
 * - Hidden on mobile (< lg) so it never blocks text, navigation, or interactive touch targets
 */
export default function Tropical3DFoliageFrame({ weather }: Tropical3DFoliageFrameProps) {
  return (
    <div
      aria-hidden="true"
      style={{ filter: WEATHER_FOLIAGE_FILTER[weather] }}
      className="hidden xl:block fixed inset-0 pointer-events-none z-30 overflow-hidden select-none transition-all duration-700 opacity-75"
    >
      {/* Top-Left Subtle Coconut Frond Frame */}
      <div className="absolute -top-12 -left-16 w-[250px] h-[220px]">
        <svg viewBox="0 0 320 260" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="palmLeafLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#142C2A" />
              <stop offset="55%" stopColor="#2B6657" />
              <stop offset="100%" stopColor="#F2D39B" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M -10,15 Q 115,30 250,95"
              fill="none"
              stroke="url(#palmLeafLeft)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {Array.from({ length: 11 }).map((_, i) => {
              const t = (i + 1) / 12;
              const bx = -10 + t * 260;
              const by = 15 + t * 80 - Math.sin(t * Math.PI) * 14;
              return (
                <path
                  key={i}
                  d={`M ${bx},${by} Q ${bx + 12},${by + 36} ${bx - 8},${by + 68}`}
                  fill="none"
                  stroke="url(#palmLeafLeft)"
                  strokeWidth={3.2 - t * 1.4}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Top-Right Subtle Coconut Frond Frame */}
      <div className="absolute -top-12 -right-16 w-[250px] h-[220px] scale-x-[-1]">
        <svg viewBox="0 0 320 260" className="w-full h-full overflow-visible">
          <g>
            <path
              d="M -10,15 Q 115,30 250,95"
              fill="none"
              stroke="url(#palmLeafLeft)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {Array.from({ length: 11 }).map((_, i) => {
              const t = (i + 1) / 12;
              const bx = -10 + t * 260;
              const by = 15 + t * 80 - Math.sin(t * Math.PI) * 14;
              return (
                <path
                  key={i}
                  d={`M ${bx},${by} Q ${bx + 12},${by + 36} ${bx - 8},${by + 68}`}
                  fill="none"
                  stroke="url(#palmLeafLeft)"
                  strokeWidth={3.2 - t * 1.4}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
