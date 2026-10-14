"use client";

import React from "react";

interface BitmapWoodTextProps {
  text: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  align?: "left" | "center" | "right";
  className?: string;
}

/**
 * Radiant "VERSION TRAILER" Luminous Ivory-Champagne Gold Display Typography
 * - Tall, condensed, razor-sharp cinematic block letters (Oswald 700 Vietnamese)
 * - Blazing Pure Ivory-White top (#FFFFFF -> #FFF8DC) to Brushed Champagne Gold bottom (#FDE68A -> #D99B16)
 * - Warm golden outer bloom + signature Crimson Flame Silk Wisps & Floating Gold Diamond Sparks
 */
export default function BitmapWoodText({
  text,
  size = "lg",
  align = "center",
  className = "",
}: BitmapWoodTextProps) {
  const sizeClasses =
    size === "hero"
      ? "text-3xl sm:text-5xl md:text-6xl tracking-[0.07em]"
      : size === "xl"
      ? "text-2xl sm:text-4xl md:text-[44px] tracking-[0.06em]"
      : size === "lg"
      ? "text-xl sm:text-3xl md:text-4xl tracking-[0.06em]"
      : size === "md"
      ? "text-lg sm:text-xl md:text-2xl tracking-[0.05em]"
      : "text-base sm:text-lg md:text-xl tracking-[0.05em]";

  const alignClasses =
    align === "center"
      ? "justify-center text-center"
      : align === "right"
      ? "justify-end text-right"
      : "justify-start text-left";

  const showTrailerAccents = size === "hero" || size === "xl" || size === "lg";

  return (
    <div
      role="heading"
      aria-label={text}
      className={`relative inline-flex items-center ${alignClasses} select-none group ${className}`}
    >
      {/* Ambient Golden Trailer Back-Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-2 rounded-full opacity-75 blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 230, 145, 0.32) 0%, rgba(234, 179, 8, 0.12) 55%, transparent 80%)",
        }}
      />

      {/* Left Crimson Flame Wisp & Floating Gold Diamond Sparks (VERSION TRAILER signature) */}
      {showTrailerAccents && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pointer-events-none w-6 h-6 sm:w-8 sm:h-8 -mr-1 sm:-mr-1.5 shrink-0 overflow-visible opacity-95"
        >
          {/* Crimson Silk Flame Wisp curling from top-left */}
          <path
            d="M42 10 C30 4, 18 12, 10 22 C18 18, 26 20, 36 16 Z"
            fill="url(#crimsonWispLeft)"
            style={{ filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.85))" }}
          />
          <path
            d="M36 28 C24 26, 14 32, 6 40 C16 37, 25 34, 34 32 Z"
            fill="url(#crimsonWispLeft)"
            opacity="0.8"
          />
          {/* Floating Golden Diamond & Square Embers */}
          <rect
            x="14"
            y="8"
            width="4.5"
            height="4.5"
            transform="rotate(45 14 8)"
            fill="#FFFDF0"
            style={{ filter: "drop-shadow(0 0 5px #FDE047)" }}
          />
          <rect
            x="6"
            y="18"
            width="3.5"
            height="3.5"
            transform="rotate(20 6 18)"
            fill="#FDE047"
            opacity="0.9"
          />
          <rect
            x="24"
            y="36"
            width="3"
            height="3"
            transform="rotate(45 24 36)"
            fill="#F59E0B"
            opacity="0.85"
          />
          <defs>
            <linearGradient id="crimsonWispLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7878" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Main Radiant Ivory-Champagne Gold Block Text */}
      <span
        className={`relative z-10 font-bold uppercase leading-[1.12] py-0.5 ${sizeClasses}`}
        style={{
          fontFamily: "var(--font-game-display), 'TraiDoiCrafted', sans-serif",
          backgroundImage:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFDF5 28%, #FFF3C4 54%, #F6C85F 78%, #C88412 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter:
            "drop-shadow(0 2px 2px rgba(28, 10, 2, 0.95)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 16px rgba(255, 228, 135, 0.55))",
          transform: "scaleY(1.05)",
        }}
      >
        {text}
      </span>

      {/* Right Crimson Flame Wisp & Floating Gold Diamond Sparks */}
      {showTrailerAccents && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pointer-events-none w-6 h-6 sm:w-8 sm:h-8 -ml-1 sm:-ml-1.5 shrink-0 overflow-visible opacity-95"
        >
          {/* Crimson Silk Flame Wisp trailing bottom-right */}
          <path
            d="M6 34 C18 40, 30 34, 40 22 C30 27, 20 26, 10 30 Z"
            fill="url(#crimsonWispRight)"
            style={{ filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.85))" }}
          />
          <path
            d="M10 16 C22 12, 32 16, 42 8 C32 10, 22 10, 12 13 Z"
            fill="url(#crimsonWispRight)"
            opacity="0.85"
          />
          {/* Floating Golden Diamond & Square Embers */}
          <rect
            x="32"
            y="12"
            width="4.5"
            height="4.5"
            transform="rotate(45 32 12)"
            fill="#FFFDF0"
            style={{ filter: "drop-shadow(0 0 5px #FDE047)" }}
          />
          <rect
            x="38"
            y="28"
            width="3.5"
            height="3.5"
            transform="rotate(15 38 28)"
            fill="#FDE047"
            opacity="0.9"
          />
          <rect
            x="22"
            y="6"
            width="3"
            height="3"
            transform="rotate(45 22 6)"
            fill="#F59E0B"
            opacity="0.85"
          />
          <defs>
            <linearGradient id="crimsonWispRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF7878" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
