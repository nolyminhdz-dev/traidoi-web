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
}

/**
 * Radiant "VERSION TRAILER" Luminous Ivory-Champagne Gold Section Header
 * - Tall, razor-sharp Vietnamese block typography with pure white-ivory to champagne gold gradient
 * - Crimson flame wisps & floating golden diamond ember accents
 * - Zero middle dots (·)
 */
export default function Wood3DPlaqueTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "lg",
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
          className="inline-flex items-center gap-2.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#2A1208]/90 via-[#3D1B0C]/95 to-[#2A1208]/90 border border-[#FDE68A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.85),0_0_15px_rgba(253,224,71,0.22)] mb-2.5"
        >
          <span className="w-2 h-2 rotate-45 bg-[#FFFBEB] shadow-[0_0_8px_#FDE047]" />
          <span
            className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-game-display), sans-serif",
              backgroundImage:
                "linear-gradient(180deg, #FFFFFF 0%, #FFF5C0 60%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {eyebrow}
          </span>
          <span className="w-2 h-2 rotate-45 bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
        </motion.div>
      )}

      {/* Main Radiant Ivory-Champagne Gold Headline */}
      <div className="relative inline-flex items-center gap-2 sm:gap-3 py-0.5 max-w-full">
        <BitmapWoodText
          text={title}
          size={size === "xl" ? "xl" : size === "lg" ? "lg" : "md"}
          align={align}
        />
      </div>

      {/* Luminous Golden Trailer Divider Line (for centered section headers) */}
      {align === "center" && (
        <div className="relative mt-2 flex items-center justify-center w-56 sm:w-80 h-2">
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#FFF6C8] to-transparent opacity-85 shadow-[0_0_10px_#FDE047]" />
          <span className="absolute w-2.5 h-2.5 rotate-45 bg-[#FFFFFF] border border-[#F59E0B] shadow-[0_0_10px_#FDE047]" />
        </div>
      )}

      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base font-semibold text-[#FFFDF2]/90 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
