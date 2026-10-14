"use client";

import React, { useState } from "react";
import {
  Sun,
  CloudRain,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Coins,
} from "lucide-react";
import { soundEngine } from "@/lib/sound";
import { WeatherMode } from "./WeatherEngineCanvas";
import BitmapWoodText from "./BitmapWoodText";

interface BambooHudNavProps {
  wallet: number;
  spinsLeft: number;
  weather: WeatherMode;
  setWeather: (w: WeatherMode) => void;
}

const WEATHER_OPTIONS: {
  id: WeatherMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}[] = [
  {
    id: "sun",
    label: "Nắng Hạ",
    icon: Sun,
    activeClass: "bg-amber-500/90 border-yellow-200 text-[#1C110B] shadow-[0_0_18px_rgba(251,191,36,0.75)]",
  },
  {
    id: "rain",
    label: "Mưa Rào",
    icon: CloudRain,
    activeClass: "bg-sky-600/90 border-sky-200 text-white shadow-[0_0_18px_rgba(56,189,248,0.75)]",
  },
  {
    id: "sunset",
    label: "Hoàng Hôn",
    icon: Sunset,
    activeClass: "bg-orange-600/90 border-orange-200 text-white shadow-[0_0_18px_rgba(249,115,22,0.75)]",
  },
  {
    id: "night",
    label: "Đêm Đom Đóm",
    icon: Moon,
    activeClass: "bg-indigo-950/95 border-[#FFD700] text-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.65)]",
  },
];

export default function BambooHudNav({
  wallet,
  spinsLeft,
  weather,
  setWeather,
}: BambooHudNavProps) {
  const [muted, setMuted] = useState(false);
  const [radioOn, setRadioOn] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none select-none">
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 bg-[#160D08]/90 backdrop-blur-2xl border-2 border-[#B88244] rounded-full px-3 sm:px-4 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.95)]">
        {/* Brand Emblem with Authentic Wood Bitmap Font */}
        <a
          href="#"
          className="flex items-center gap-2 pr-2.5 border-r border-[#513727]"
        >
          <img
            src="/game-assets/logo.png"
            alt="Trải Đời"
            className="w-8 h-8 rounded-full border-2 border-[#FFD700] object-cover pixelated"
          />
          <div className="hidden md:block">
            <BitmapWoodText text="TRẢI ĐỜI" size="sm" align="left" />
          </div>
        </a>

        {/* Wallet Counter */}
        <div className="flex items-center gap-1.5 bg-[#0D0704] border border-[#6B4930] rounded-full px-3 py-1 text-xs font-extrabold text-[#FFD700]">
          <Coins className="w-3.5 h-3.5 text-[#C99A35]" />
          <span>{wallet.toLocaleString("vi-VN")}đ</span>
        </div>

        {/* 4-WAY REALTIME WEATHER SWITCHER PILL */}
        <div className="flex items-center gap-1 bg-[#0D0704]/90 border border-[#513727] rounded-full p-1">
          {WEATHER_OPTIONS.map((w) => {
            const Icon = w.icon;
            const active = weather === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  setWeather(w.id);
                  soundEngine.playSfx("interact", 0.35);
                  soundEngine.setWeatherAudio(w.id);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? w.activeClass
                    : "border-transparent text-[#D0A477] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{w.label}</span>
              </button>
            );
          })}
        </div>

        {/* Jump to Wheel Pill */}
        <a
          href="#vong-quay-nhan-qua"
          onClick={() => soundEngine.playSfx("interact", 0.4)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#CB5245] to-[#8A241B] border border-[#FFD700] text-[#FFF8E6] text-xs font-extrabold shadow-[0_0_16px_rgba(203,82,69,0.55)] hover:scale-105 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>Quay Lộc ({spinsLeft})</span>
        </a>

        {/* Audio Controls */}
        <div className="flex items-center gap-1 pl-1 border-l border-[#513727]">
          <button
            onClick={() => setRadioOn(soundEngine.toggleRadio())}
            title="Đài Radio Quê Ngoại"
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              radioOn
                ? "bg-[#357350] border-[#BEF264] text-white shadow-[0_0_12px_rgba(134,239,172,0.5)]"
                : "bg-[#26170F] border-[#513727] text-[#D0A477] hover:text-white"
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${radioOn ? "animate-pulse" : ""}`} />
          </button>

          <button
            onClick={() => {
              const next = !muted;
              setMuted(next);
              soundEngine.muted = next;
              if (next) soundEngine.setWeatherAudio("sunset");
            }}
            title="Tắt/Bật Âm Thanh"
            className="p-2 rounded-full bg-[#26170F] hover:bg-[#3A2317] border border-[#513727] text-[#F5DC8B] cursor-pointer"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
