"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Compass,
  Grid,
  Sparkles,
} from "lucide-react";
import { GALLERY_MEDIA_ITEMS, GalleryMediaItem } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface Gliding3DGameScreensProps {
  weather?: WeatherMode;
}

type FilterCategory = "all" | "gameplay" | "environment" | "ui";

const FILTER_TABS: {
  id: FilterCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "all", label: "Tất cả", icon: <Grid className="w-3.5 h-3.5" /> },
  {
    id: "gameplay",
    label: "Hoạt Động Trong Xóm",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: "environment",
    label: "Bản Đồ Vùng Đất",
    icon: <Compass className="w-3.5 h-3.5" />,
  },
  {
    id: "ui",
    label: "Giao Diện Mộc Mạc",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
];

export default function Gliding3DGameScreens({
  weather,
}: Gliding3DGameScreensProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryMediaItem | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_MEDIA_ITEMS
      : GALLERY_MEDIA_ITEMS.filter((item) => item.category === activeFilter);

  // Keyboard navigation for Lightbox Modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxItem(null);
        soundEngine.playSfx("interact", 0.25);
      } else if (e.key === "ArrowRight") {
        const idx = filteredItems.findIndex((i) => i.id === lightboxItem.id);
        if (idx !== -1) {
          setLightboxItem(filteredItems[(idx + 1) % filteredItems.length]);
          soundEngine.playSfx("interact", 0.3);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = filteredItems.findIndex((i) => i.id === lightboxItem.id);
        if (idx !== -1) {
          setLightboxItem(
            filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length]
          );
          soundEngine.playSfx("interact", 0.3);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItem, filteredItems]);

  const handleNavigateLightbox = (dir: -1 | 1) => {
    if (!lightboxItem) return;
    const idx = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[nextIdx]);
    soundEngine.playSfx("interact", 0.35);
  };

  return (
    <section
      id="bo-suu-tap"
      aria-label="Thư viện cảnh sắc & bộ sưu tập Trại Đời"
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none"
    >
      {/* Anchor compatibility */}
      <div
        id="thu-vien-hinh-anh"
        className="relative -top-24 pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="mb-10">
        <Wood3DPlaqueTitle
          title="THƯ VIỆN CẢNH SẮC & BỘ SƯU TẬP"
          subtitle="Những khoảnh khắc đời thường bình yên tại Xóm Bến Dừa và các vùng đất di sản."
          align="center"
          size="xl"
        />
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Bộ lọc bộ sưu tập hình ảnh"
        className="flex flex-wrap items-center justify-center gap-2 mb-8"
      >
        {FILTER_TABS.map((tab) => {
          const active = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => {
                setActiveFilter(tab.id);
                soundEngine.playSfx("interact", 0.3);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                active
                  ? "bg-[#F2D39B] text-[#142C2A] border-[#F7F3E8] shadow-sm font-bold"
                  : "surface-editorial text-[#D9D2C5] hover:text-[#F7F3E8] hover:border-[#F2D39B]/45"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Responsive Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="surface-elevated-card rounded-3xl overflow-hidden flex flex-col justify-between group border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 transition-all shadow-lg"
          >
            {/* Image Container with 16:10 Aspect Ratio & Pixel-art sharpness */}
            <button
              type="button"
              onClick={() => {
                setLightboxItem(item);
                soundEngine.playSfx("interact", 0.35);
              }}
              aria-label={`Phóng to hình ảnh: ${item.title}`}
              className="relative aspect-[16/10] w-full bg-[#081211] overflow-hidden cursor-pointer text-left border-b border-[#F2D39B]/20 group"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={`w-full h-full object-cover pixelated group-hover:scale-[1.03] transition-transform duration-500 ${
                  weather === "night" ? "brightness-90" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D]/85 via-transparent to-transparent pointer-events-none" />

              {/* Category Badge & Expand Icon */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/40 text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]">
                  {item.categoryLabel}
                </span>

                <span className="w-8 h-8 rounded-full bg-[#0E1F1D]/85 border border-[#F2D39B]/40 flex items-center justify-center text-[#F7F3E8] group-hover:bg-[#F2D39B] group-hover:text-[#142C2A] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Sprite Badge Corner */}
              {item.spriteBadge && (
                <div className="absolute bottom-2.5 right-3 pointer-events-none">
                  <img
                    src={item.spriteBadge}
                    alt=""
                    className="w-7 h-7 object-contain pixelated drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  />
                </div>
              )}
            </button>

            {/* Caption & Title */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F7F3E8] mb-1.5 group-hover:text-[#F2D39B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D9D2C5] leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
            onClick={() => {
              setLightboxItem(null);
              soundEngine.playSfx("interact", 0.25);
            }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full surface-elevated-card rounded-3xl overflow-hidden border border-[#F2D39B]/45 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-[#0E1F1D] border-b border-[#F2D39B]/20">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#142C2A] border border-[#F2D39B]/40 text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]">
                    {lightboxItem.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#F7F3E8]">
                    {lightboxItem.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setLightboxItem(null);
                    soundEngine.playSfx("interact", 0.25);
                  }}
                  aria-label="Đóng cửa sổ xem ảnh (Esc)"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#142C2A] hover:bg-[#2B6657] border border-[#F2D39B]/40 text-xs font-bold text-[#F7F3E8] cursor-pointer transition-colors"
                >
                  <span>Đóng (Esc)</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pixel-Art Display */}
              <div className="relative bg-[#070E0D] flex items-center justify-center min-h-[40vh] max-h-[65vh] p-2 overflow-hidden">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="max-h-[62vh] w-auto max-w-full object-contain pixelated"
                />

                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handleNavigateLightbox(-1)}
                  aria-label="Ảnh trước (phím ←)"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E1F1D]/90 hover:bg-[#F2D39B] text-[#F7F3E8] hover:text-[#142C2A] border border-[#F2D39B]/45 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handleNavigateLightbox(1)}
                  aria-label="Ảnh tiếp theo (phím →)"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E1F1D]/90 hover:bg-[#F2D39B] text-[#F7F3E8] hover:text-[#142C2A] border border-[#F2D39B]/45 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Caption & Navigation Hint */}
              <div className="p-4 sm:p-5 bg-[#0E1F1D] border-t border-[#F2D39B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {lightboxItem.spriteBadge && (
                    <img
                      src={lightboxItem.spriteBadge}
                      alt=""
                      className="w-7 h-7 object-contain pixelated shrink-0"
                    />
                  )}
                  <p className="text-xs sm:text-sm text-[#D9D2C5] leading-relaxed">
                    {lightboxItem.caption}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#9BA8A3] shrink-0 self-end sm:self-center">
                  Phím ← / → chuyển ảnh • Esc đóng
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
