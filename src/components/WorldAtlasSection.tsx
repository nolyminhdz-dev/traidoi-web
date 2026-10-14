"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Compass,
  CheckCircle2,
  Clock,
  CloudSun,
  Users,
  Navigation,
  Sparkles,
} from "lucide-react";
import { WORLD_REGIONS } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface WorldAtlasSectionProps {
  weather: WeatherMode;
}

export default function WorldAtlasSection({ weather }: WorldAtlasSectionProps) {
  const [activeId, setActiveId] = useState<string>(WORLD_REGIONS[0].id);

  const activeRegion =
    WORLD_REGIONS.find((r) => r.id === activeId) || WORLD_REGIONS[0];

  const handleSelectRegion = (id: string) => {
    setActiveId(id);
    soundEngine.playSfx("interact", 0.35);
  };

  const handleKeyDownRegion = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = WORLD_REGIONS[(idx + 1) % WORLD_REGIONS.length];
      handleSelectRegion(next.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev =
        WORLD_REGIONS[(idx - 1 + WORLD_REGIONS.length) % WORLD_REGIONS.length];
      handleSelectRegion(prev.id);
    }
  };

  return (
    <section
      id="ban-do-viet-nam"
      aria-label="Khám phá bản đồ 5 vùng đất Việt Nam"
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
    >
      <div className="mb-10">
        <Wood3DPlaqueTitle
          eyebrow="HÀNH TRÌNH XUYÊN VIỆT"
          title="KHÁM PHÁ 5 VÙNG ĐẤT DI SẢN"
          subtitle="Khởi hành từ Xóm Bến Dừa miền Tây, theo tuyến xe liên tỉnh ghé thăm Phố Cổ Hội An, Thủ Đô Hà Nội, Vùng Mỏ Quảng Ninh và Đỉnh Núi Bà Đen."
          align="center"
          size="xl"
        />
      </div>

      {/* Accessible Region Selector Strip (Works on Mobile Touch, Desktop Click & Keyboard) */}
      <div
        role="tablist"
        aria-label="Chọn vùng đất trên bản đồ Việt Nam"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6"
      >
        {WORLD_REGIONS.map((reg, idx) => {
          const isSelected = reg.id === activeRegion.id;
          return (
            <button
              key={reg.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => handleSelectRegion(reg.id)}
              onKeyDown={(e) => handleKeyDownRegion(e, idx)}
              className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#2B6657]/65 border-[#F2D39B] shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                  : "surface-editorial hover:border-[#F2D39B]/45"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-1 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]">
                  {reg.regionArea}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    reg.status === "live" ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#F7F3E8] truncate w-full">
                {reg.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Interactive Waypoint Map Canvas (Left) + Location Detail Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT 5 COLS: Interactive Vietnam Travel Route & Waypoint Map */}
        <div className="lg:col-span-5 surface-elevated-card rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[420px]">
          <img
            src="/game-assets/travel/travel-bg.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pixelated opacity-25 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1F1D]/80 via-[#142C2A]/70 to-[#0E1F1D]/95 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F2D39B]">
              <Compass className="w-4 h-4" />
              <span>Bản Đồ Tuyến Hành Trình</span>
            </span>
            <span className="text-[11px] font-medium text-[#D9D2C5]">
              Chạm vào điểm mốc để xem
            </span>
          </div>

          {/* Interactive SVG + Button Waypoint Map */}
          <div className="relative z-10 my-auto w-full h-[310px] sm:h-[340px] rounded-2xl bg-[#091514]/85 border border-[#F2D39B]/25 overflow-hidden">
            {/* Stylized Connecting Travel Route SVG */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path
                d="M 62 16 L 48 20 L 64 52 L 46 70 L 42 82"
                fill="none"
                stroke="#F2D39B"
                strokeWidth="0.8"
                strokeDasharray="2.5 2"
                strokeOpacity="0.65"
              />
            </svg>

            {/* 5 Interactive Waypoint Pins */}
            {WORLD_REGIONS.map((reg) => {
              const active = reg.id === activeRegion.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => handleSelectRegion(reg.id)}
                  style={{
                    left: `${reg.mapCoords.x}%`,
                    top: `${reg.mapCoords.y}%`,
                  }}
                  aria-label={`Chọn vùng đất ${reg.name}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    active
                      ? "bg-[#F2D39B] text-[#142C2A] border-white font-extrabold scale-105 z-20 shadow-[0_0_20px_rgba(242,211,155,0.8)]"
                      : "bg-[#0E1F1D]/95 text-[#F7F3E8] border-[#F2D39B]/45 hover:border-[#F2D39B] z-10"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] whitespace-nowrap">{reg.name}</span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] text-[#D9D2C5]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Đã có trong Build #658 (4 vùng)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Đang phát triển mở rộng (1 vùng)</span>
            </span>
          </div>
        </div>

        {/* RIGHT 7 COLS: Selected Region Detail Panel */}
        <div className="lg:col-span-7 surface-elevated-card rounded-3xl overflow-hidden flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              {/* Region Visual Banner */}
              <div className="relative h-56 sm:h-64 w-full bg-[#081211] overflow-hidden border-b border-[#F2D39B]/25">
                <img
                  src={activeRegion.image}
                  alt={activeRegion.name}
                  className={`w-full h-full object-cover pixelated ${
                    weather === "night" ? "brightness-75" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D] via-[#0E1F1D]/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/45 text-xs font-bold text-[#F2D39B]">
                    {activeRegion.badge} • {activeRegion.regionArea}
                  </span>

                  {activeRegion.status === "live" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{activeRegion.statusText}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-400/50 text-xs font-bold text-amber-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeRegion.statusText}</span>
                    </span>
                  )}
                </div>

                {/* Title on Banner Bottom */}
                <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3E8] drop-shadow-md">
                      {activeRegion.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F2D39B] font-medium flex items-center gap-1.5 mt-0.5">
                      <CloudSun className="w-4 h-4" />
                      <span>{activeRegion.weather}</span>
                    </p>
                  </div>

                  {/* Signature Regional Item */}
                  <div className="hidden sm:flex items-center gap-2.5 bg-[#0E1F1D]/90 backdrop-blur-md border border-[#F2D39B]/40 rounded-2xl px-3 py-2">
                    <img
                      src={activeRegion.signatureItem.sprite}
                      alt={activeRegion.signatureItem.name}
                      className="w-9 h-9 object-contain pixelated"
                    />
                    <div>
                      <span className="block text-[10px] font-bold uppercase text-[#F2D39B]">
                        {activeRegion.signatureItem.tier}
                      </span>
                      <span className="block text-xs font-bold text-[#F7F3E8]">
                        {activeRegion.signatureItem.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Region Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <p className="text-sm sm:text-base text-[#D9D2C5] leading-relaxed mb-4">
                    {activeRegion.tagline}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2D39B] mb-2.5">
                    Hoạt động & Đặc điểm vùng đất
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeRegion.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 bg-[#0E1F1D]/70 border border-[#F2D39B]/15 rounded-xl p-3 text-xs text-[#F7F3E8]/90"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F2D39B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Meta Bar: NPCs & Transport */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F2D39B]/15 text-xs">
                  <div className="flex items-center gap-2.5 text-[#D9D2C5]">
                    <Users className="w-4 h-4 text-[#F2D39B] shrink-0" />
                    <span>
                      <strong className="text-[#F7F3E8]">Cư dân: </strong>
                      {activeRegion.npcs.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#D9D2C5]">
                    <Navigation className="w-4 h-4 text-[#F2D39B] shrink-0" />
                    <span>
                      <strong className="text-[#F7F3E8]">Di chuyển: </strong>
                      {activeRegion.transport}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
