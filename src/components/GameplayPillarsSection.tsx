"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareQuote,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { VILLAGE_CHARACTERS } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

/**
 * Character Showcase Section — "Người Quen Trong Xóm" (Xóm Bến Dừa)
 * Adheres strictly to:
 * - Mục VII: Đưa gameplay lên đầu, loại bỏ mô tả 4 trụ cột dài dòng
 * - Mục XII: Giảm tối đa mô tả văn bản
 * - Mục 13.2: Một nhân vật nổi bật tại một thời điểm, chân dung pixel-art lớn rõ nét,
 *   tên, vai trò, câu thoại đặc trưng (đổi được), một câu mô tả ngắn, thanh chọn 5 nhân vật.
 */
export default function GameplayPillarsSection() {
  const [selectedCharId, setSelectedCharId] = useState<string>(
    VILLAGE_CHARACTERS[0]?.id || "ba-ngoai"
  );
  const [quoteIdx, setQuoteIdx] = useState<number>(0);

  const activeCharacter =
    VILLAGE_CHARACTERS.find((c) => c.id === selectedCharId) ||
    VILLAGE_CHARACTERS[0];

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    setQuoteIdx(0);
    soundEngine.playSfx("interact", 0.35);
  };

  const handleNextQuote = () => {
    if (!activeCharacter.quotes?.length) return;
    setQuoteIdx((prev) => (prev + 1) % activeCharacter.quotes.length);
    soundEngine.playSfx("interact", 0.3);
  };

  const handlePrevCharacter = () => {
    const currentIndex = VILLAGE_CHARACTERS.findIndex(
      (c) => c.id === activeCharacter.id
    );
    const prevIndex =
      (currentIndex - 1 + VILLAGE_CHARACTERS.length) % VILLAGE_CHARACTERS.length;
    setSelectedCharId(VILLAGE_CHARACTERS[prevIndex].id);
    setQuoteIdx(0);
    soundEngine.playSfx("interact", 0.3);
  };

  const handleNextCharacter = () => {
    const currentIndex = VILLAGE_CHARACTERS.findIndex(
      (c) => c.id === activeCharacter.id
    );
    const nextIndex = (currentIndex + 1) % VILLAGE_CHARACTERS.length;
    setSelectedCharId(VILLAGE_CHARACTERS[nextIndex].id);
    setQuoteIdx(0);
    soundEngine.playSfx("interact", 0.3);
  };

  return (
    <section
      id="nhan-vat"
      aria-label="Người quen trong Xóm Bến Dừa"
      className="relative py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20 select-none"
    >
      {/* Anchor for backward compatibility with previous #loi-choi links */}
      <div id="loi-choi" className="sr-only" aria-hidden="true" />

      {/* Section Header: Title & Description */}
      <div className="mb-10">
        <Wood3DPlaqueTitle
          eyebrow="NHÂN VẬT XÓM BẾN DỪA"
          title="NGƯỜI QUEN TRONG XÓM"
          subtitle="Gặp gỡ những con người bình dị, ấm áp luôn chào đón bạn mỗi ngày tại Xóm Bến Dừa."
          align="center"
          size="xl"
        />
      </div>

      {/* 5-Character Smooth Selector Bar */}
      <div
        role="tablist"
        aria-label="Chọn nhân vật Xóm Bến Dừa"
        className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8"
      >
        {VILLAGE_CHARACTERS.map((char) => {
          const isSelected = char.id === activeCharacter.id;
          return (
            <button
              key={char.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleSelectCharacter(char.id)}
              className={`group relative flex items-center sm:flex-col sm:items-center sm:text-center gap-3 p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-b from-[#2B6657] to-[#1B4339] border-[#F2D39B] shadow-[0_8px_20px_rgba(0,0,0,0.4)] ring-2 ring-[#F2D39B]/50"
                  : "bg-[#142C2A]/70 border-[#F2D39B]/25 hover:border-[#F2D39B]/50 hover:bg-[#1C3B37]/80 text-[#D9D2C5]"
              }`}
            >
              <div
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#0E1F1D] border p-1 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isSelected
                    ? "border-[#F2D39B] shadow-md shadow-[#F2D39B]/20"
                    : "border-[#F2D39B]/30"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isSelected ? char.portraitTalk : char.portrait}
                  alt={char.name}
                  className="w-full h-full object-contain pixelated"
                />
              </div>

              <div className="min-w-0 flex-1 sm:flex-initial">
                <h4
                  className={`text-xs sm:text-sm font-extrabold truncate ${
                    isSelected
                      ? "text-[#FFF8E7]"
                      : "text-[#F7F3E8] group-hover:text-[#F2D39B]"
                  }`}
                >
                  {char.name}
                </h4>
                <p className="text-[11px] text-[#F2D39B]/85 truncate hidden sm:block mt-0.5">
                  {char.role.split("—")[0].trim()}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="activeCharIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#F2D39B] rounded-full shadow-[0_0_8px_#F2D39B]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Spotlight Character Showcase (Một nhân vật nổi bật tại một thời điểm) */}
      <div className="surface-elevated-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden border-2 border-[#F2D39B]/35 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCharacter.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
          >
            {/* Chân dung Pixel-Art lớn rõ nét (pixelated) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl bg-gradient-to-b from-[#142C2A] to-[#0A1715] border-2 border-[#F2D39B]/60 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,211,155,0.18)_0%,transparent_70%)] pointer-events-none" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeCharacter.portraitTalk || activeCharacter.portrait}
                  alt={activeCharacter.name}
                  className="w-full h-full object-contain pixelated relative z-10 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/40 text-[11px] font-bold text-[#F2D39B] shadow-md backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-[#F2D39B]" />
                  <span>{activeCharacter.statusBadge}</span>
                </div>
              </div>

              {/* Vị trí sinh hoạt */}
              <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9D2C5] bg-[#0E1F1D]/70 px-3 py-1 rounded-lg border border-[#F2D39B]/20">
                <MapPin className="w-3.5 h-3.5 text-[#F2D39B] shrink-0" />
                <span>{activeCharacter.location}</span>
              </div>
            </div>

            {/* Thông tin nhân vật & Lời thoại */}
            <div className="md:col-span-7 flex flex-col justify-center">
              {/* Tên & Vai trò */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F7F3E8] tracking-wide font-wood">
                    {activeCharacter.name}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-[#F2D39B] mt-0.5">
                    {activeCharacter.role}
                  </p>
                </div>

                {/* Điều hướng nhanh giữa 5 nhân vật */}
                <div className="flex items-center gap-1.5 bg-[#0E1F1D]/80 border border-[#F2D39B]/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handlePrevCharacter}
                    aria-label="Nhân vật trước"
                    className="p-1.5 rounded-lg hover:bg-[#2B6657] text-[#D9D2C5] hover:text-[#FFF8E7] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-[#F2D39B] px-1">
                    {VILLAGE_CHARACTERS.findIndex(
                      (c) => c.id === activeCharacter.id
                    ) + 1}{" "}
                    / {VILLAGE_CHARACTERS.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextCharacter}
                    aria-label="Nhân vật kế tiếp"
                    className="p-1.5 rounded-lg hover:bg-[#2B6657] text-[#D9D2C5] hover:text-[#FFF8E7] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Một câu mô tả ngắn */}
              <p className="text-sm sm:text-base text-[#D9D2C5] leading-relaxed mb-4 bg-[#0E1F1D]/45 p-3 rounded-xl border border-[#F2D39B]/15">
                {activeCharacter.backstory}
              </p>

              {/* Một câu thoại đặc trưng (Classic JRPG Dialogue Box) */}
              <div className="surface-cream-card rounded-2xl p-4 sm:p-5 relative mt-1">
                {/* Tiêu đề hộp thoại */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D5A353]/30">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#7C2D12]">
                    <MessageSquareQuote className="w-4 h-4" />
                    <span>Lời trò chuyện của {activeCharacter.name}</span>
                  </span>
                  <span className="text-xs font-bold text-[#7C2D12]/80">
                    Câu thoại {quoteIdx + 1} / {activeCharacter.quotes.length}
                  </span>
                </div>

                {/* Nội dung câu thoại đặc trưng */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIdx}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className="text-sm sm:text-base md:text-lg font-bold text-[#24160E] leading-relaxed italic min-h-[3.25rem] flex items-center"
                  >
                    “{activeCharacter.quotes[quoteIdx]}”
                  </motion.p>
                </AnimatePresence>

                {/* Chân hộp thoại: Gợi ý & Nút đổi câu thoại */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-[#D5A353]/30">
                  <span className="text-xs font-semibold text-[#5C2804] truncate max-w-[240px] sm:max-w-none">
                    🌾 {activeCharacter.questHint}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextQuote}
                    className="btn-game-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5" />
                    <span>Đổi câu thoại tiếp theo →</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
