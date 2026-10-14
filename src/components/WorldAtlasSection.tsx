"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  X,
  Info,
  Gem,
} from "lucide-react";
import { WORLD_REGIONS } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface WorldAtlasSectionProps {
  weather: WeatherMode;
}

// NPC info mapping with pixel portraits and concise roles
const NPC_INFO: Record<string, { role: string; avatar: string }> = {
  "Bà Ngoại": {
    role: "Nấu mâm cơm quê & truyền dạy nếp nhà",
    avatar: "/game-assets/pixel/portrait-player-female.png",
  },
  "Ông Thổ Địa": {
    role: "Thần đất làng quê, ban quẻ & lì xì may mắn",
    avatar: "/game-assets/pixel/portrait-tho-dia.png",
  },
  "Cô Sáu Hiền": {
    role: "Chủ sạp Chợ Quê thu mua nông sản",
    avatar: "/game-assets/pixel/portrait-vendor.png",
  },
  "Nghệ nhân Vinh": {
    role: "Giữ nhịp đờn ca tài tử bến sông chiều",
    avatar: "/game-assets/pixel/portrait-npc-vinh.png",
  },
  "Chú Mười": {
    role: "Hàng xóm nghĩa tình, coi sóc mảnh vườn",
    avatar: "/game-assets/pixel/portrait-player-male.png",
  },
  "Thợ may Hội An": {
    role: "May cổ phục & áo dài truyền thống",
    avatar: "/game-assets/pixel/portrait-npc-mai.png",
  },
  "Cô bán đèn lồng": {
    role: "Thắp sáng đèn lồng & thả hoa đăng",
    avatar: "/game-assets/pixel/portrait-npc-lan.png",
  },
  "Khách thập phương": {
    role: "Du khách dạo bước phố đêm sông Hoài",
    avatar: "/game-assets/pixel/portrait-npc-tam.png",
  },
  "Sáu Lộc (Thợ máy)": {
    role: "Độ xe thể thao & tinh chỉnh động cơ",
    avatar: "/game-assets/pixel/portrait-npc-phuc.png",
  },
  "Cảnh sát giao thông": {
    role: "Điều phối lưu thông đại lộ thủ đô",
    avatar: "/game-assets/pixel/portrait-officerTraffic.png",
  },
  "Quản lý Showroom": {
    role: "Trưng bày bộ sưu tập xe độc bản",
    avatar: "/game-assets/pixel/portrait-npc-nam.png",
  },
  "Đội trưởng Hầm Lò": {
    role: "Dẫn đoàn khai thác tầng mỏ sâu",
    avatar: "/game-assets/pixel/portrait-npc-ti.png",
  },
  "Thợ Máy Tinh Chế": {
    role: "Vận hành lò tinh chế quặng quý & kim cương",
    avatar: "/game-assets/pixel/portrait-npc-sen.png",
  },
  "Thủ Quỹ Tổ Mỏ": {
    role: "Thu đổi khoáng sản tích lũy Xu Làng",
    avatar: "/game-assets/pixel/portrait-npc-thu.png",
  },
  "Ẩn sĩ Núi Bà": {
    role: "Chỉ lối lên đỉnh mây 986m linh thiêng",
    avatar: "/game-assets/pixel/portrait-npc-tu.png",
  },
};

// Specialty lore details for expandable modal/popover
const SPECIALTY_DETAILS: Record<string, string> = {
  "ben-dua":
    "Cá Hô nước ngọt quý hiếm bậc nhất sông Mekong, mang lại lượng Xu Làng lớn và danh hiệu vinh dự.",
  "hoi-an":
    "Cá Koi tam sắc phong thủy bơi lượn trong hồ cảnh quan, tượng trưng cho may mắn và tài lộc nơi phố cổ.",
  "ha-noi":
    "Mẫu xe thể thao huyền thoại được tinh chỉnh tại xưởng thợ máy Sáu Lộc, tốc độ vượt trội trên đường đua phố.",
  "quang-ninh":
    "Kim cương nguyên khối tinh chế từ tầng mỏ sâu, khoáng vật quý giá nhất của vịnh di sản Đông Bắc.",
  "tay-ninh":
    "Tinh thể ngọc xanh biếc ẩn sâu trong vách đá núi thiêng 986m, gắn liền với huyền tích non cao.",
};

export default function WorldAtlasSection({ weather }: WorldAtlasSectionProps) {
  const [activeId, setActiveId] = useState<string>(WORLD_REGIONS[0].id);
  const [activeDrawer, setActiveDrawer] = useState<"none" | "specialty" | "npcs">("none");
  const touchStartXRef = useRef<number | null>(null);

  const currentIndex = WORLD_REGIONS.findIndex((r) => r.id === activeId);
  const activeRegion = WORLD_REGIONS[currentIndex] || WORLD_REGIONS[0];

  const handleSelectRegion = (id: string) => {
    setActiveId(id);
    setActiveDrawer("none");
    soundEngine.playSfx("interact", 0.35);
  };

  const handleNextRegion = () => {
    const next = WORLD_REGIONS[(currentIndex + 1) % WORLD_REGIONS.length];
    handleSelectRegion(next.id);
  };

  const handlePrevRegion = () => {
    const prev = WORLD_REGIONS[(currentIndex - 1 + WORLD_REGIONS.length) % WORLD_REGIONS.length];
    handleSelectRegion(prev.id);
  };

  // Keyboard navigation ←/→
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextRegion();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevRegion();
      } else if (e.key === "Escape") {
        setActiveDrawer("none");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Touch Swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNextRegion();
      } else {
        handlePrevRegion();
      }
    }
    touchStartXRef.current = null;
  };

  // True in-game realistic status helper
  const isRegionLive = (id: string, status: string) => {
    return status === "live" && id !== "tay-ninh";
  };

  return (
    <section
      id="kham-pha"
      aria-label="Khám phá thế giới Việt Nam"
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none"
    >
      {/* Anchor for backward compatibility with existing links */}
      <div id="ban-do-viet-nam" className="absolute -top-20 left-0 pointer-events-none" aria-hidden="true" />

      {/* Header Plaque */}
      <div className="mb-8">
        <Wood3DPlaqueTitle
          eyebrow="BẢN ĐỒ DU KÝ"
          title="KHÁM PHÁ THẾ GIỚI VIỆT NAM"
          subtitle="Chạm vào từng địa danh trên bản đồ để chiêm ngưỡng cảnh sắc và đặc sản từng vùng miền."
          align="center"
          size="xl"
        />
      </div>

      {/* Region Selector Tab Strip (Touch, Click & Keyboard accessible) */}
      <div
        role="tablist"
        aria-label="Danh sách vùng đất Việt Nam"
        className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none sm:grid sm:grid-cols-5 sm:overflow-visible"
      >
        {WORLD_REGIONS.map((reg, idx) => {
          const isSelected = reg.id === activeRegion.id;
          const live = isRegionLive(reg.id, reg.status);
          return (
            <button
              key={reg.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => handleSelectRegion(reg.id)}
              className={`flex-shrink-0 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer min-w-[140px] sm:min-w-0 ${
                isSelected
                  ? "bg-[#2B6657]/70 border-[#F2D39B] shadow-[0_4px_16px_rgba(242,211,155,0.25)]"
                  : "surface-editorial hover:border-[#F2D39B]/40"
              }`}
            >
              <div className="truncate">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]/85">
                  {reg.regionArea}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#F7F3E8] truncate block">
                  {reg.name}
                </span>
              </div>
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  live ? "bg-emerald-400 shadow-[0_0_8px_#34D399]" : "bg-amber-400 shadow-[0_0_8px_#FBBF24]"
                }`}
                title={live ? "Đang mở cửa" : "Sắp mở"}
              />
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Interactive Waypoint Map (Left) + Large Preview & Summaries (Right) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT 5 COLS: Vietnam Waypoint Map Canvas */}
        <div className="lg:col-span-5 surface-elevated-card rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden min-h-[440px]">
          <img
            src="/game-assets/travel/travel-bg.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pixelated opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1F1D]/85 via-[#142C2A]/70 to-[#0E1F1D]/95 pointer-events-none" />

          {/* Map Header */}
          <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F2D39B]">
              <Compass className="w-4 h-4" />
              <span>Bản Đồ Tuyến Hành Trình</span>
            </span>
            <span className="text-[11px] font-medium text-[#D9D2C5]/80 flex items-center gap-1">
              <span>Phím</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#091514] border border-[#F2D39B]/30 text-[10px] text-[#F2D39B]">
                ←
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#091514] border border-[#F2D39B]/30 text-[10px] text-[#F2D39B]">
                →
              </kbd>
            </span>
          </div>

          {/* Interactive SVG + Button Waypoint Canvas */}
          <div className="relative z-10 my-auto w-full h-[320px] sm:h-[350px] rounded-2xl bg-[#091514]/90 border border-[#F2D39B]/25 overflow-hidden">
            {/* Vietnam Connecting S-Route */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path
                d="M 62 16 L 48 20 L 64 52 L 46 70 L 42 82"
                fill="none"
                stroke="#F2D39B"
                strokeWidth="1"
                strokeDasharray="3 2"
                strokeOpacity="0.7"
              />
            </svg>

            {/* 5 Waypoint Buttons */}
            {WORLD_REGIONS.map((reg) => {
              const active = reg.id === activeRegion.id;
              const live = isRegionLive(reg.id, reg.status);
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => handleSelectRegion(reg.id)}
                  style={{
                    left: `${reg.mapCoords.x}%`,
                    top: `${reg.mapCoords.y}%`,
                  }}
                  aria-label={`Chọn địa danh ${reg.name}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    active
                      ? "bg-[#F2D39B] text-[#142C2A] border-white font-extrabold scale-110 z-20 shadow-[0_0_24px_rgba(242,211,155,0.85)]"
                      : "bg-[#0E1F1D]/90 text-[#F7F3E8] border-[#F2D39B]/40 hover:border-[#F2D39B] hover:scale-105 z-10"
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${active ? "text-[#142C2A]" : "text-[#F2D39B]"}`} />
                  <span className="text-[11px] whitespace-nowrap">{reg.name}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      live ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Clean Legend (No Tech Jargon) */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 text-[11px] text-[#D9D2C5]">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span>Đang mở cửa (4 vùng)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#FBBF24]" />
              <span>Sắp mở (1 vùng)</span>
            </span>
          </div>
        </div>

        {/* RIGHT 7 COLS: Large Environment Preview & Concise Summaries */}
        <div className="lg:col-span-7 surface-elevated-card rounded-3xl overflow-hidden flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              {/* Large Environment Preview Banner */}
              <div className="relative h-60 sm:h-72 w-full bg-[#081211] overflow-hidden border-b border-[#F2D39B]/25 group">
                <img
                  src={activeRegion.image}
                  alt={activeRegion.name}
                  className={`w-full h-full object-cover pixelated transition-transform duration-500 group-hover:scale-105 ${
                    weather === "night" ? "brightness-75" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D] via-[#0E1F1D]/30 to-transparent pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/40 text-xs font-bold text-[#F2D39B]">
                      {activeRegion.regionArea}
                    </span>
                    {isRegionLive(activeRegion.id, activeRegion.status) ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đang mở cửa</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-400/50 text-xs font-bold text-amber-300">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Sắp mở</span>
                      </span>
                    )}
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#0E1F1D]/80 border border-[#F2D39B]/25 text-[11px] font-bold text-[#F2D39B] flex items-center gap-1">
                    <CloudSun className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{activeRegion.weather}</span>
                  </span>
                </div>

                {/* Floating Navigation Chevrons */}
                <div className="absolute inset-y-0 left-3 flex items-center z-10">
                  <button
                    type="button"
                    onClick={handlePrevRegion}
                    aria-label="Vùng trước"
                    className="p-2 rounded-full bg-[#0E1F1D]/80 hover:bg-[#F2D39B] text-[#F7F3E8] hover:text-[#142C2A] border border-[#F2D39B]/40 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center z-10">
                  <button
                    type="button"
                    onClick={handleNextRegion}
                    aria-label="Vùng kế tiếp"
                    className="p-2 rounded-full bg-[#0E1F1D]/80 hover:bg-[#F2D39B] text-[#F7F3E8] hover:text-[#142C2A] border border-[#F2D39B]/40 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Title & Tagline on Banner Bottom */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3E8] drop-shadow-md">
                      {activeRegion.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D9D2C5] line-clamp-1 mt-0.5">
                      {activeRegion.tagline}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#F2D39B]/80 px-2 py-0.5 rounded bg-[#0E1F1D]/80 border border-[#F2D39B]/20 shrink-0">
                    0{currentIndex + 1} / 0{WORLD_REGIONS.length}
                  </span>
                </div>
              </div>

              {/* Concise Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                {/* 3 Compact Summary Cards: Specialty, NPCs, Transport */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Card 1: Regional Specialty (Clickable Popover) */}
                  <div
                    onClick={() =>
                      setActiveDrawer(activeDrawer === "specialty" ? "none" : "specialty")
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveDrawer(activeDrawer === "specialty" ? "none" : "specialty");
                      }
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 border border-[#F2D39B]/25 hover:border-[#F2D39B] transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#091514] border border-[#F2D39B]/30 flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={activeRegion.signatureItem.sprite}
                        alt={activeRegion.signatureItem.name}
                        className="w-full h-full object-contain pixelated"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F2D39B] truncate">
                        Đặc sản vùng
                      </span>
                      <span className="block text-xs font-bold text-[#F7F3E8] truncate">
                        {activeRegion.signatureItem.name}
                      </span>
                      <span className="text-[10px] text-[#D9D2C5]/70 underline">
                        {activeDrawer === "specialty" ? "Đóng" : "Xem chi tiết"}
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Local NPCs (Clickable Popover) */}
                  <div
                    onClick={() => setActiveDrawer(activeDrawer === "npcs" ? "none" : "npcs")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveDrawer(activeDrawer === "npcs" ? "none" : "npcs");
                      }
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 border border-[#F2D39B]/25 hover:border-[#F2D39B] transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#091514] border border-[#F2D39B]/30 flex items-center justify-center shrink-0 text-[#F2D39B] group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F2D39B] truncate">
                        Cư dân ({activeRegion.npcs.length})
                      </span>
                      <span className="block text-xs font-bold text-[#F7F3E8] truncate">
                        {activeRegion.npcs[0]}, {activeRegion.npcs[1]}...
                      </span>
                      <span className="text-[10px] text-[#D9D2C5]/70 underline">
                        {activeDrawer === "npcs" ? "Đóng" : "Xem danh sách"}
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Transport Route */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0E1F1D]/85 border border-[#F2D39B]/25">
                    <div className="w-10 h-10 rounded-xl bg-[#091514] border border-[#F2D39B]/30 flex items-center justify-center shrink-0 text-[#F2D39B]">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F2D39B] truncate">
                        Di chuyển
                      </span>
                      <span className="block text-xs font-medium text-[#F7F3E8] truncate">
                        {activeRegion.transport}
                      </span>
                      <span className="block text-[10px] text-[#D9D2C5]/70">
                        Liên tỉnh thuận tiện
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Popover Panel (Only visible when toggled) */}
                <AnimatePresence>
                  {activeDrawer !== "none" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-[#091514]/95 border border-[#F2D39B]/40 rounded-2xl p-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F2D39B]/20">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#F2D39B] flex items-center gap-1.5">
                          {activeDrawer === "specialty" ? (
                            <>
                              <Gem className="w-4 h-4" />
                              <span>Chi Tiết Đặc Sản: {activeRegion.signatureItem.name}</span>
                            </>
                          ) : (
                            <>
                              <Users className="w-4 h-4" />
                              <span>Cư Dân Nổi Bật Tại {activeRegion.name}</span>
                            </>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveDrawer("none")}
                          className="p-1 rounded-full hover:bg-white/10 text-[#D9D2C5] hover:text-white transition-colors"
                          aria-label="Đóng"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {activeDrawer === "specialty" ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={activeRegion.signatureItem.sprite}
                            alt={activeRegion.signatureItem.name}
                            className="w-14 h-14 object-contain pixelated shrink-0 p-2 rounded-xl bg-[#142C2A] border border-[#F2D39B]/40"
                          />
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2D39B]/20 text-[#F2D39B] border border-[#F2D39B]/40">
                              {activeRegion.signatureItem.tier}
                            </span>
                            <p className="text-xs text-[#D9D2C5] leading-relaxed">
                              {SPECIALTY_DETAILS[activeRegion.id] ||
                                "Vật phẩm đặc trưng có thể thu thập hoặc trao đổi khi đặt chân tới vùng đất này."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                          {activeRegion.npcs.map((npcName) => {
                            const npc = NPC_INFO[npcName] || {
                              role: "Cư dân địa phương",
                              avatar: "/game-assets/pixel/portrait-player-male.png",
                            };
                            return (
                              <div
                                key={npcName}
                                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0E1F1D]/80 border border-[#F2D39B]/15"
                              >
                                <img
                                  src={npc.avatar}
                                  alt={npcName}
                                  className="w-8 h-8 rounded-lg object-cover pixelated border border-[#F2D39B]/30 shrink-0"
                                />
                                <div className="min-w-0">
                                  <span className="block text-xs font-bold text-[#F7F3E8] truncate">
                                    {npcName}
                                  </span>
                                  <span className="block text-[10px] text-[#D9D2C5]/80 truncate">
                                    {npc.role}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Concise Highlights (3 short bullets) */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#F2D39B]/90 mb-2">
                    Trải Nghiệm Tiêu Biểu
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeRegion.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 bg-[#0E1F1D]/60 border border-[#F2D39B]/15 rounded-xl p-2.5 text-xs text-[#F7F3E8]/90"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F2D39B] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
