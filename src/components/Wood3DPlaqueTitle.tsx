"use client";

import React from "react";
import { motion } from "framer-motion";
import BitmapWoodText from "./BitmapWoodText";

interface Wood3DPlaqueTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3" | "div";
}

/**
 * Radiant "VERSION TRAILER" Luminous Ivory-Champagne Gold Section Header
 * - Semantic heading level (defaults to h2 for section headers)
 * - Tall, razor-sharp Vietnamese block typography
 */
export default function Wood3DPlaqueTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "lg",
  as = "h2",
}: Wood3DPlaqueTitleProps) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } select-none`}
    >
      {/* Eyebrow Radiant Trailer Crest */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-[#142C2A]/90 border border-[#F2D39B]/45 shadow-[0_4px_16px_rgba(0,0,0,0.65)] mb-2.5"
        >
          <span className="w-2 h-2 rotate-45 bg-[#FFFBEB] shadow-[0_0_8px_#F2D39B]" />
          <span
            className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              fontFamily: "var(--font-game-display), sans-serif",
              backgroundImage:
                "linear-gradient(180deg, #FFFFFF 0%, #FFF5C0 60%, #F2D39B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {eyebrow}
          </span>
          <span className="w-2 h-2 rotate-45 bg-[#2B6657] border border-[#F2D39B]/70" />
        </motion.div>
      )}

      {/* Main Radiant Ivory-Champagne Gold Headline */}
      <div className="relative inline-flex items-center gap-2 sm:gap-3 py-0.5 max-w-full">
        <BitmapWoodText
          text={title}
          size={size === "xl" ? "xl" : size === "lg" ? "lg" : "md"}
          align={align}
          as={as}
        />
      </div>

      {/* Luminous Golden Trailer Divider Line */}
      {align === "center" && (
        <div className="relative mt-2 flex items-center justify-center w-52 sm:w-72 h-2" aria-hidden="true">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#F2D39B] to-transparent opacity-80" />
          <span className="absolute w-2.5 h-2.5 rotate-45 bg-[#F7F3E8] border border-[#A96745]" />
        </div>
      )}

      {subtitle && (
        <p className="mt-3 text-sm sm:text-base font-medium text-[#D9D2C5] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
