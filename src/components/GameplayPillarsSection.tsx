"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquareQuote,
  MapPin,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { GAMEPLAY_PILLARS, VILLAGE_CHARACTERS } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

export default function GameplayPillarsSection() {
  const [selectedCharId, setSelectedCharId] = useState<string>(VILLAGE_CHARACTERS[0].id);
  const [quoteIdx, setQuoteIdx] = useState<number>(0);

  const activeCharacter =
    VILLAGE_CHARACTERS.find((c) => c.id === selectedCharId) || VILLAGE_CHARACTERS[0];

  const handleSelectCharacter = (id: string) => {
    setSelectedCharId(id);
    setQuoteIdx(0);
    soundEngine.playSfx("interact", 0.35);
  };

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % activeCharacter.quotes.length);
    soundEngine.playSfx("interact", 0.3);
  };

  return (
    <>
      {/* =====================================================================
          SECTION 12: GAMEPLAY — WHAT YOU CAN DO (4 EDITORIAL PILLARS)
      ====================================================================== */}
      <section
        id="loi-choi"
        aria-label="Lối chơi và các hoạt động cốt lõi"
        className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
      >
        <div className="mb-12">
          <Wood3DPlaqueTitle
            eyebrow="4 TRỤ CỘT LỐI CHƠI CỐT LÕI"
            title="KHÁM PHÁ SỐNG BỒI ĐẮP VÀ KẾT NỐI"
            subtitle="Thiết kế theo nhịp sống đời thường gần gũi của người Việt: mỗi ngày trong game là một hành trình thư thái nhưng luôn có mục tiêu để gắn bó."
            align="center"
            size="xl"
          />
        </div>

        {/* Alternating Editorial Spotlight Layout (Avoiding 4 Identical Boxes) */}
        <div className="space-y-8 sm:space-y-12">
          {GAMEPLAY_PILLARS.map((pillar, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center surface-editorial rounded-3xl p-5 sm:p-8"
              >
                {/* Media Showcase Column */}
                <div
                  className={`lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#F2D39B]/30 bg-[#081211] aspect-[16/10] ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    loading="lazy"
                    className="w-full h-full object-cover pixelated hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D]/85 via-transparent to-transparent" />

                  {/* Floating Authentic Game Sprite Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 bg-[#0E1F1D]/90 backdrop-blur-md border border-[#F2D39B]/35 rounded-xl px-3.5 py-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={pillar.secondarySprite}
                        alt=""
                        className="w-8 h-8 object-contain pixelated shrink-0"
                      />
                      <span className="text-xs font-bold text-[#F7F3E8]">
                        {pillar.eyebrow}
                      </span>
                    </div>
                    {pillar.status === "ready" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-400/40 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Sẵn sàng</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Đang mở rộng</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Editorial Storytelling Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#F2D39B]">
                      {pillar.eyebrow}
                    </span>
                    <span className="text-xs text-[#9BA8A3]">•</span>
                    <span className="text-xs font-medium text-[#D9D2C5]">
                      {pillar.statusLabel}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F7F3E8] leading-snug mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-[#F2D39B] mb-3">
                    {pillar.subtitle}
                  </p>

                  <p className="text-sm text-[#D9D2C5] leading-relaxed mb-4">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {pillar.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F3E8]/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#F2D39B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <a
                      href={pillar.ctaHref}
                      onClick={() => soundEngine.playSfx("interact", 0.35)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2B6657]/55 hover:bg-[#2B6657] border border-[#F2D39B]/45 text-xs sm:text-sm font-bold text-[#F7F3E8] transition-colors"
                    >
                      <span>{pillar.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4 text-[#F2D39B]" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 14: CHARACTERS & STORIES (NHÂN VẬT & CÂU CHUYỆN XÓM BẾN DỪA)
      ====================================================================== */}
      <section
        id="nhan-vat"
        aria-label="Nhân vật và câu chuyện Xóm Bến Dừa"
        className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
      >
        <div className="mb-10">
          <Wood3DPlaqueTitle
            eyebrow="CON NGƯỜI & KÝ ỨC QUÊ HƯƠNG"
            title="NHỮNG NGƯỜI ĐỢI BẠN NƠI XÓM NHỎ"
            subtitle="Mỗi nhân vật tại Xóm Bến Dừa đều có tính cách, câu chuyện và nhịp sinh hoạt riêng. Trò chuyện và gắn kết hoàn toàn tự nhiên, tôn trọng cảm xúc người chơi."
            align="center"
            size="xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 4 Cols: Character Roster Selector */}
          <div
            role="tablist"
            aria-label="Danh sách nhân vật Xóm Bến Dừa"
            className="lg:col-span-4 flex flex-col gap-2.5"
          >
            {VILLAGE_CHARACTERS.map((char) => {
              const active = char.id === activeCharacter.id;
              return (
                <button
                  key={char.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => handleSelectCharacter(char.id)}
                  className={`flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    active
                      ? "bg-[#2B6657]/60 border-[#F2D39B] shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
                      : "surface-editorial hover:border-[#F2D39B]/40"
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0E1F1D] border border-[#F2D39B]/40 p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={active ? char.portraitTalk : char.portrait}
                      alt={char.name}
                      className="w-full h-full object-contain pixelated"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#F7F3E8] truncate">
                        {char.name}
                      </h3>
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-[#F2D39B] shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#F2D39B] truncate">{char.role}</p>
                    <p className="text-[11px] text-[#9BA8A3] truncate mt-0.5">
                      {char.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 8 Cols: Active Character Portrait & Story Panel */}
          <div className="lg:col-span-8 surface-elevated-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCharacter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                {/* Top Header & Portrait */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0E1F1D] border-2 border-[#F2D39B]/60 p-2.5 shrink-0 shadow-xl flex items-center justify-center">
                    <img
                      src={activeCharacter.portraitTalk}
                      alt={activeCharacter.name}
                      className="w-full h-full object-contain pixelated"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1F1D]/90 border border-[#F2D39B]/35 text-xs font-semibold text-[#F2D39B] mb-2">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{activeCharacter.statusBadge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3E8]">
                      {activeCharacter.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#F2D39B] mt-0.5">
                      {activeCharacter.role}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-[#D9D2C5]">
                      <span className="inline-flex items-center gap-1 bg-[#0E1F1D]/70 px-2.5 py-1 rounded-lg border border-[#F2D39B]/20">
                        <MapPin className="w-3.5 h-3.5 text-[#F2D39B]" />
                        {activeCharacter.location}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#0E1F1D]/70 px-2.5 py-1 rounded-lg border border-[#F2D39B]/20">
                        <Sparkles className="w-3.5 h-3.5 text-[#F2D39B]" />
                        Tính cách: {activeCharacter.personality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Backstory */}
                <div className="bg-[#0E1F1D]/70 border border-[#F2D39B]/20 rounded-2xl p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9BA8A3] mb-1">
                    Câu chuyện nhân vật
                  </span>
                  <p className="text-sm text-[#F7F3E8]/90 leading-relaxed">
                    {activeCharacter.backstory}
                  </p>
                </div>

                {/* Interactive NPC Dialogue Box */}
                <div className="bg-[#FFF8E6] text-[#1C110B] rounded-2xl p-4 sm:p-5 border-2 border-[#A96745] shadow-md">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#7C2D12]">
                      <MessageSquareQuote className="w-4 h-4" />
                      <span>Lời trò chuyện của {activeCharacter.name}</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#7C2D12]/80">
                      Câu thoại {quoteIdx + 1}/{activeCharacter.quotes.length}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-[#1C110B] leading-relaxed mb-3">
                    “{activeCharacter.quotes[quoteIdx]}”
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#A96745]/25">
                    <span className="text-xs font-semibold text-[#5C2804]">
                      {activeCharacter.questHint}
                    </span>
                    {activeCharacter.quotes.length > 1 && (
                      <button
                        type="button"
                        onClick={handleNextQuote}
                        className="px-3.5 py-1.5 rounded-xl bg-[#142C2A] hover:bg-[#2B6657] text-[#F7F3E8] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Nghe câu thoại tiếp theo →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
