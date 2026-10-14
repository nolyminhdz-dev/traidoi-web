"use client";

import React, { useEffect, useState } from "react";

interface ThoDiaSpriteProps {
  mode?: "fan" | "laugh" | "wave";
  size?: number;
  className?: string;
}

/**
 * Renders the real 4x3 sprite sheet `/game-assets/pixel/actor-tho-dia.png`
 * Row 0: Standing & fanning with quạt mo
 * Row 1: Rubbing belly & laughing khà khà
 * Row 2: Shaking head & waving fan
 */
export function ThoDiaAnimatedSprite({
  mode = "fan",
  size = 112,
  className = "",
}: ThoDiaSpriteProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, mode === "laugh" ? 150 : 220);
    return () => clearInterval(interval);
  }, [mode]);

  const row = mode === "fan" ? 0 : mode === "laugh" ? 1 : 2;
  const bgPosX = (frame / 3) * 100;
  const bgPosY = (row / 3) * 100;

  return (
    <div
      className={`pixelated select-none inline-block overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url('/game-assets/pixel/actor-tho-dia.png')`,
        backgroundSize: "400% 400%",
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        backgroundRepeat: "no-repeat",
        filter: "drop-shadow(0 8px 12px rgba(20, 10, 4, 0.55))",
      }}
      aria-label="Ông Thổ Địa Bến Dừa"
    />
  );
}

interface PortraitAnimatorProps {
  baseSrc: string;
  talkSrc?: string;
  blinkSrc?: string;
  isTalking?: boolean;
  size?: number;
  className?: string;
  alt?: string;
}

export function AnimatedNpcPortrait({
  baseSrc,
  talkSrc,
  blinkSrc,
  isTalking = false,
  size = 72,
  className = "",
  alt = "NPC",
}: PortraitAnimatorProps) {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!isTalking || !talkSrc) {
      setMouthOpen(false);
      return;
    }
    const timer = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 150);
    return () => clearInterval(timer);
  }, [isTalking, talkSrc]);

  useEffect(() => {
    if (!blinkSrc) return;
    const blinkLoop = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 160);
    }, 3400);
    return () => clearInterval(blinkLoop);
  }, [blinkSrc]);

  const currentSrc =
    isTalking && mouthOpen && talkSrc
      ? talkSrc
      : blinking && blinkSrc
      ? blinkSrc
      : baseSrc;

  return (
    <div
      className={`relative overflow-hidden rounded-md border-2 border-[#38251B] bg-[#EAD8AE] shadow-inner shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className="w-full h-full object-contain pixelated"
        draggable={false}
      />
      {/* Corner bamboo studs */}
      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-[#6B4930] rounded-xs" />
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#6B4930] rounded-xs" />
      <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-[#6B4930] rounded-xs" />
      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#6B4930] rounded-xs" />
    </div>
  );
}
