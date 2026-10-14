"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Layers,
  GitBranch,
  MessageSquarePlus,
  ShieldCheck,
  ArrowUp,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";
import {
  DEVELOPMENT_ROADMAP,
  MISSING_ANIME_ASSETS_CHECKLIST,
} from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

interface CraftAndFooterSectionProps {
  weather: WeatherMode;
}

export default function CraftAndFooterSection({
  weather,
}: CraftAndFooterSectionProps) {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (!showPrivacyModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrivacyModal(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showPrivacyModal]);

  return (
    <footer className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* =====================================================================
          SECTION 16: DEVELOPMENT JOURNEY (LỘ TRÌNH PHÁT TRIỂN MINH BẠCH)
      ====================================================================== */}
      <section
        id="lo-trinh-phat-trien"
        aria-label="Hành trình phát triển và định hướng công nghệ"
        className="mb-20 scroll-mt-16"
      >
        <div className="mb-10">
          <Wood3DPlaqueTitle
            eyebrow="MINH BẠCH TIẾN ĐỘ & CÔNG NGHỆ"
            title="HÀNH TRÌNH PHÁT TRIỂN TRẢI ĐỜI"
            subtitle="Phân biệt rõ những hệ thống đã hoạt động thực tế trong bản Pixel Build #658 hiện tại và định hướng nâng cấp dài hạn lên nền tảng Unity 6 Stylized 3D Anime."
            align="center"
            size="xl"
          />
        </div>

        {/* 2 Roadmap Phase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {DEVELOPMENT_ROADMAP.map((phase) => {
            const isCurrent = phase.status === "current";
            return (
              <div
                key={phase.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${
                  isCurrent
                    ? "surface-elevated-card border-[#F2D39B]/55"
                    : "surface-editorial border-[#F2D39B]/25"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F2D39B]">
                      {phase.phaseLabel}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        isCurrent
                          ? "bg-emerald-950/90 border-emerald-400/50 text-emerald-300"
                          : "bg-amber-950/90 border-amber-400/50 text-amber-300"
                      }`}
                    >
                      {isCurrent ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      <span>{phase.badge}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#F7F3E8] mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#F2D39B] mb-3">
                    Nền tảng kỹ thuật: {phase.engine}
                  </p>
                  <p className="text-sm text-[#D9D2C5] leading-relaxed mb-5">
                    {phase.summary}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                        Hạng mục đã hoàn thiện & xác minh
                      </h4>
                      <ul className="space-y-2">
                        {phase.completedItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F3E8]/90"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#F2D39B]/15">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                        Hạng mục đang tiếp tục triển khai
                      </h4>
                      <ul className="space-y-2">
                        {phase.inProgressItems.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#D9D2C5]"
                          >
                            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Asset Pipeline Checklist for Unity 6 Stylized 3D Anime */}
        <div className="surface-editorial rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F2D39B]" />
              <h3 className="text-base sm:text-lg font-bold text-[#F7F3E8]">
                Danh Mục Tài Nguyên Cần Sản Xuất Cho Định Hướng Unity 6 Stylized 3D Anime
              </h3>
            </div>
            <span className="text-xs font-medium text-[#9BA8A3]">
              Minh bạch giữa tài nguyên hiện có và lộ trình mỹ thuật 3D
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MISSING_ANIME_ASSETS_CHECKLIST.map((row, idx) => (
              <div
                key={idx}
                className="bg-[#0E1F1D]/80 border border-[#F2D39B]/20 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#F2D39B]">
                    {row.category}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#2B6657]/40 text-[#F7F3E8]">
                    {row.priority}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#F7F3E8] mb-1">
                  {row.item}
                </p>
                <p className="text-xs text-[#9BA8A3]">{row.currentFallback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 17: COMMUNITY & TWILIGHT PORCH SANCTUARY
      ====================================================================== */}
      <section
        id="cong-dong"
        aria-label="Cộng đồng và lời nhắn từ hiên nhà Ngoại"
        className="mb-16 scroll-mt-16"
      >
        <div className="relative rounded-3xl carved-wood-box p-6 sm:p-10 lg:p-12 overflow-hidden">
          <img
            src="/game-assets/ornaments/decor/corner-wood-tl.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 left-3 w-8 h-8 object-contain pixelated z-20 pointer-events-none"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-tr.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 right-3 w-8 h-8 object-contain pixelated z-20 pointer-events-none"
          />

          <div className="absolute inset-0 z-0">
            <img
              src="/game-assets/screenshots/world-thodia.png"
              alt=""
              aria-hidden="true"
              className={`w-full h-full object-cover pixelated opacity-25 ${
                weather === "night" ? "brightness-50" : "brightness-75"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D] via-[#0E1F1D]/85 to-[#0E1F1D]/65" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#142C2A] border-2 border-[#F2D39B] p-1.5 shadow-xl">
                <img
                  src="/game-assets/pixel/portrait-grandma-talk.png"
                  alt="Bà Ngoại"
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="-ml-2">
                <ThoDiaAnimatedSprite mode="wave" size={76} />
              </div>
            </div>

            <div className="mb-3">
              <BitmapWoodText
                text="KẾT NỐI CÙNG XÓM BẾN DỪA"
                size="xl"
                align="center"
                as="h2"
              />
            </div>

            <p className="text-base sm:text-xl font-bold text-[#F2D39B] mb-2">
              “Đi đâu cũng nhớ chạy chậm, tới bữa về ăn cơm nghen con.”
            </p>
            <p className="text-xs sm:text-sm text-[#D9D2C5] leading-relaxed mb-8 max-w-xl">
              TRẢI ĐỜI đang được phát triển từng bước với sự trân trọng dành cho văn hóa và đời sống Việt Nam. Bạn có thể theo dõi mã nguồn, xem bản cập nhật hoặc gửi góp ý trực tiếp cho nhóm phát triển.
            </p>

            {/* Verified Community & Action Channels (Zero Fake Links) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
              <a
                href="https://github.com/nolyminhdz-dev/traidoi-web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#142C2A]/90 hover:bg-[#2B6657]/80 border border-[#F2D39B]/40 transition-colors"
              >
                <GitBranch className="w-5 h-5 text-[#F2D39B] mb-1.5" />
                <span className="text-xs font-bold text-[#F7F3E8] flex items-center gap-1">
                  <span>GitHub Dự Án</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[11px] text-[#D9D2C5] mt-0.5">
                  Theo dõi bản dựng & mã nguồn
                </span>
              </a>

              <a
                href="https://github.com/nolyminhdz-dev/traidoi-web/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#142C2A]/90 hover:bg-[#2B6657]/80 border border-[#F2D39B]/40 transition-colors"
              >
                <MessageSquarePlus className="w-5 h-5 text-[#F2D39B] mb-1.5" />
                <span className="text-xs font-bold text-[#F7F3E8] flex items-center gap-1">
                  <span>Góp Ý & Báo Lỗi</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[11px] text-[#D9D2C5] mt-0.5">
                  Gửi đề xuất tính năng trực tiếp
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setShowPrivacyModal(true);
                  soundEngine.playSfx("interact", 0.35);
                }}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#142C2A]/90 hover:bg-[#2B6657]/80 border border-[#F2D39B]/40 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-300 mb-1.5" />
                <span className="text-xs font-bold text-[#F7F3E8]">
                  Quyền Riêng Tư & Dữ Liệu
                </span>
                <span className="text-[11px] text-[#D9D2C5] mt-0.5">
                  Lưu tiến trình cục bộ an toàn
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#vuon-nha-ngoai"
                onClick={() => soundEngine.playBronzeGong()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-[#FFF3C4] via-[#F2D39B] to-[#C88412] text-[#142C2A] font-extrabold text-sm shadow-lg hover:brightness-105 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Quay Lại Khu Trải Nghiệm</span>
              </a>

              <a
                href="#cong-lang"
                onClick={() => soundEngine.playSfx("interact", 0.35)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0E1F1D]/90 hover:bg-[#142C2A] border border-[#F2D39B]/40 text-[#F7F3E8] font-bold text-sm transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-[#F2D39B]" />
                <span>Lên Đầu Trang</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 18: SITE FOOTER
      ====================================================================== */}
      <div className="pt-8 border-t border-[#F2D39B]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#9BA8A3]">
        <div className="flex items-center gap-3">
          <img
            src="/game-assets/pixel/portrait-tho-dia.png"
            alt="TRẢI ĐỜI"
            className="w-8 h-8 rounded-lg bg-[#142C2A] border border-[#F2D39B]/40 p-0.5 object-contain pixelated"
          />
          <div>
            <span className="font-bold text-[#F7F3E8] block">
              TRẢI ĐỜI — Thế Giới Đời Sống & Văn Hóa Việt Nam
            </span>
            <span>
              Phiên bản trình diễn web từ Build #658 • Định hướng phát triển dài hạn trên Unity 6
            </span>
          </div>
        </div>

        <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center justify-center gap-4">
          <a href="#cong-lang" className="hover:text-[#F2D39B] transition-colors">
            Trang Chủ
          </a>
          <a href="#the-living-world" className="hover:text-[#F2D39B] transition-colors">
            Thế Giới
          </a>
          <a href="#loi-choi" className="hover:text-[#F2D39B] transition-colors">
            Lối Chơi
          </a>
          <a href="#ban-do-viet-nam" className="hover:text-[#F2D39B] transition-colors">
            Bản Đồ
          </a>
          <a href="#nhan-vat" className="hover:text-[#F2D39B] transition-colors">
            Nhân Vật
          </a>
          <a href="#lo-trinh-phat-trien" className="hover:text-[#F2D39B] transition-colors">
            Lộ Trình
          </a>
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="hover:text-[#F2D39B] transition-colors cursor-pointer"
          >
            Chính Sách Dữ Liệu
          </button>
        </nav>
      </div>

      {/* Privacy & Data Transparency Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Chính sách quyền riêng tư và lưu trữ dữ liệu"
            onClick={() => setShowPrivacyModal(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full surface-elevated-card rounded-3xl p-6 border border-[#F2D39B]/45 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F2D39B]/20">
                <h3 className="text-lg font-bold text-[#F7F3E8] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Chính Sách Quyền Riêng Tư & Lưu Trữ</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  aria-label="Đóng cửa sổ"
                  className="w-8 h-8 rounded-lg bg-[#142C2A] flex items-center justify-center text-[#F7F3E8] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#D9D2C5] leading-relaxed">
                <p>
                  <strong className="text-[#F7F3E8]">1. Tiền tệ trong game (Xu Làng):</strong> Mọi đơn vị Xu Làng, vật phẩm và lượt quay trên website hoàn toàn là dữ liệu mô phỏng trong trò chơi, không có giá trị quy đổi tiền thật và không thu phí người dùng.
                </p>
                <p>
                  <strong className="text-[#F7F3E8]">2. Lưu trữ cục bộ (LocalStorage):</strong> Tiến trình trải nghiệm (số dư Xu Làng, lượt quay, thời tiết yêu thích) được lưu trực tiếp trên trình duyệt của bạn thông qua <code>localStorage</code> với cơ chế kiểm tra phiên bản an toàn.
                </p>
                <p>
                  <strong className="text-[#F7F3E8]">3. Không thu thập dữ liệu cá nhân:</strong> Website không yêu cầu đăng nhập, không thu thập thông tin nhạy cảm và không sử dụng trình theo dõi quảng cáo của bên thứ ba.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#F2D39B] text-[#142C2A] font-extrabold text-xs cursor-pointer"
                >
                  Đã Hiểu (Esc)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
