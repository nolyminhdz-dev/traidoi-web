"use client";

import React from "react";

interface BitmapWoodTextProps {
  text: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
}

/**
 * Radiant "VERSION TRAILER" Luminous Ivory-Champagne Gold Display Typography
 * - Semantic HTML heading support (h1, h2, h3, div) for WCAG 2.2 AA compliance
 * - Tall, condensed, razor-sharp cinematic block letters (Oswald 700 Vietnamese)
 * - Blazing Pure Ivory-White top (#FFFFFF -> #FFF8DC) to Brushed Champagne Gold bottom (#F2D39B -> #C88412)
 */
export default function BitmapWoodText({
  text,
  size = "lg",
  align = "center",
  as: Tag = "div",
  className = "",
}: BitmapWoodTextProps) {
  const sizeClasses =
    size === "hero"
      ? "text-3xl sm:text-5xl md:text-6xl tracking-[0.06em]"
      : size === "xl"
      ? "text-2xl sm:text-4xl md:text-[42px] tracking-[0.05em]"
      : size === "lg"
      ? "text-xl sm:text-3xl md:text-4xl tracking-[0.05em]"
      : size === "md"
      ? "text-lg sm:text-xl md:text-2xl tracking-[0.04em]"
      : "text-base sm:text-lg md:text-xl tracking-[0.04em]";

  const alignClasses =
    align === "center"
      ? "justify-center text-center"
      : align === "right"
      ? "justify-end text-right"
      : "justify-start text-left";

  const showTrailerAccents = size === "hero" || size === "xl" || size === "lg";

  return (
    <Tag
      className={`relative inline-flex items-center ${alignClasses} select-none group m-0 ${className}`}
    >
      {/* Ambient Golden Trailer Back-Glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-2 rounded-full opacity-70 blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(242, 211, 155, 0.28) 0%, rgba(234, 179, 8, 0.1) 55%, transparent 80%)",
        }}
      />

      {/* Left Crimson Flame Wisp & Floating Gold Diamond Sparks */}
      {showTrailerAccents && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pointer-events-none w-5 h-5 sm:w-7 sm:h-7 -mr-0.5 sm:-mr-1 shrink-0 overflow-visible opacity-90"
        >
          <path
            d="M42 10 C30 4, 18 12, 10 22 C18 18, 26 20, 36 16 Z"
            fill="url(#crimsonWispLeft)"
            style={{ filter: "drop-shadow(0 0 5px rgba(239, 68, 68, 0.75))" }}
          />
          <rect
            x="14"
            y="8"
            width="4"
            height="4"
            transform="rotate(45 14 8)"
            fill="#FFFDF0"
          />
          <rect
            x="8"
            y="22"
            width="3"
            height="3"
            transform="rotate(20 8 22)"
            fill="#F2D39B"
            opacity="0.9"
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
        className={`relative z-10 font-bold uppercase leading-[1.15] py-0.5 ${sizeClasses}`}
        style={{
          fontFamily: "var(--font-game-display), 'TraiDoiCrafted', sans-serif",
          backgroundImage:
            "linear-gradient(180deg, #FFFFFF 0%, #FFFDF5 28%, #FFF3C4 54%, #F2D39B 78%, #C88412 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter:
            "drop-shadow(0 2px 2px rgba(20, 10, 4, 0.95)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 14px rgba(242, 211, 155, 0.45))",
        }}
      >
        {text}
      </span>

      {/* Right Crimson Flame Wisp & Floating Gold Diamond Sparks */}
      {showTrailerAccents && (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="pointer-events-none w-5 h-5 sm:w-7 sm:h-7 -ml-0.5 sm:-ml-1 shrink-0 overflow-visible opacity-90"
        >
          <path
            d="M6 34 C18 40, 30 34, 40 22 C30 27, 20 26, 10 30 Z"
            fill="url(#crimsonWispRight)"
            style={{ filter: "drop-shadow(0 0 5px rgba(239, 68, 68, 0.75))" }}
          />
          <rect
            x="32"
            y="12"
            width="4"
            height="4"
            transform="rotate(45 32 12)"
            fill="#FFFDF0"
          />
          <rect
            x="36"
            y="28"
            width="3"
            height="3"
            transform="rotate(15 36 28)"
            fill="#F2D39B"
            opacity="0.9"
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
    </Tag>
  );
}
