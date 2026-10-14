"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Sparkles,
  ArrowUp,
  Compass,
  CheckCircle2,
  X,
  BookOpen,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { ThoDiaAnimatedSprite } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import BitmapWoodText from "./BitmapWoodText";

interface CraftAndFooterSectionProps {
  weather: WeatherMode;
}

export default function CraftAndFooterSection({
  weather,
}: CraftAndFooterSectionProps) {
  const [showGuideDialog, setShowGuideDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!showGuideDialog) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowGuideDialog(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showGuideDialog]);

  return (
    <footer className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* =====================================================================
          KHU VỰC ĐIỂM NHẤN THẾ GIỚI & LỜI MỜI TRẢI NGHIỆM
      ====================================================================== */}
      <section
        id="diem-nhan-the-gioi"
        aria-label="Bắt đầu ngày mới tại Xóm Bến Dừa"
        className="mb-14 scroll-mt-16"
      >
        <div className="relative rounded-3xl carved-wood-box p-6 sm:p-10 lg:p-12 overflow-hidden border border-[#F2D39B]/35 shadow-[0_24px_64px_rgba(0,0,0,0.65)]">
          {/* Corner Wood Ornaments */}
          <img
            src="/game-assets/ornaments/decor/corner-wood-tl.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 left-3 w-8 h-8 object-contain pixelated z-20 pointer-events-none opacity-85"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-tr.png"
            alt=""
            aria-hidden="true"
            className="absolute top-3 right-3 w-8 h-8 object-contain pixelated z-20 pointer-events-none opacity-85"
          />

          {/* Atmospheric Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/game-assets/screenshots/world-thodia.png"
              alt=""
              aria-hidden="true"
              className={`w-full h-full object-cover pixelated opacity-20 ${
                weather === "night" ? "brightness-50" : "brightness-75"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F1D] via-[#0E1F1D]/85 to-[#0E1F1D]/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Friendly Village Icons (Bà Ngoại & Thổ Địa) */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#142C2A] border-2 border-[#F2D39B] p-1.5 shadow-xl hover:rotate-2 transition-transform">
                <img
                  src="/game-assets/pixel/portrait-grandma-talk.png"
                  alt="Bà Ngoại Xóm Dừa"
                  className="w-full h-full object-contain pixelated"
                />
              </div>
              <div className="-ml-1">
                <ThoDiaAnimatedSprite mode="wave" size={76} />
              </div>
            </div>

            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#142C2A]/90 border border-[#F2D39B]/40 text-[#F2D39B] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F5CC72]" />
              <span>Điểm Hẹn Bình Yên Nơi Xóm Nhỏ</span>
            </div>

            {/* Headline */}
            <div className="mb-3">
              <BitmapWoodText
                text="BẮT ĐẦU NGÀY MỚI TẠI XÓM BẾN DỪA"
                size="xl"
                align="center"
                as="h2"
              />
            </div>

            {/* Folk Quote & Atmosphere */}
            <p className="text-base sm:text-xl font-bold text-[#F2D39B] mb-2">
              “Nắng sớm lên rồi đó con ơi! Ra vườn tưới liếp cải, hái dưa hấu rồi ghé miếu quay lộc đầu ngày nghen!”
            </p>
            <p className="text-xs sm:text-sm text-[#D9D2C5] leading-relaxed mb-8 max-w-2xl">
              TRẢI ĐỜI mở ra một không gian làng quê Việt Nam thanh bình, nơi bạn tự do gieo trồng rau củ, tích lũy may mắn, sưu tập kỷ vật phương Nam và cùng bà con chòm xóm tận hưởng nhịp sống êm ả mỗi ngày.
            </p>

            {/* 3 Highlight Cards for Players */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8 text-left">
              <div className="p-4 rounded-2xl bg-[#142C2A]/90 border border-[#F2D39B]/30 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2 text-[#67AF65]">
                  <Sprout className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-[#F7F3E8]">
                    Vườn Nhà Ngoại
                  </span>
                </div>
                <p className="text-xs text-[#D9D2C5] leading-relaxed">
                  Gieo hạt, tưới nước, bón phân chăm sóc rau quả tươi tốt và thu hoạch Xu Làng mỗi ngày.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#142C2A]/90 border border-[#F2D39B]/30 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2 text-[#F5CC72]">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-[#F7F3E8]">
                    Đại Luân Quay Lộc
                  </span>
                </div>
                <p className="text-xs text-[#D9D2C5] leading-relaxed">
                  Quay bánh xe phúc đức mỗi buổi sớm để nhận lì xì, vật phẩm trợ duyên và lộc xuân may mắn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#142C2A]/90 border border-[#F2D39B]/30 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2 text-[#8BD3F4]">
                  <Compass className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-extrabold uppercase tracking-wide text-[#F7F3E8]">
                    Khám Phá Non Sông
                  </span>
                </div>
                <p className="text-xs text-[#D9D2C5] leading-relaxed">
                  Chu du qua 5 vùng văn hóa rực rỡ sắc màu, lưu giữ những kỷ vật và khoảnh khắc làng quê độc bản.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#trong-rau"
                onClick={() => {
                  soundEngine.playSfx("interact", 0.35);
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-[#FFF3C4] via-[#F5CC72] to-[#C88412] text-[#142C2A] font-extrabold text-sm sm:text-base shadow-[0_4px_16px_rgba(245,204,114,0.35)] hover:brightness-110 active:scale-95 transition-all"
              >
                <Sprout className="w-4 h-4 fill-[#142C2A]" />
                <span>Trồng rau ngay</span>
              </a>

              <a
                href="#quay-loc"
                onClick={() => {
                  soundEngine.playBronzeGong();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2B6657] hover:bg-[#347A69] border border-[#F2D39B]/60 text-[#FFF6E5] font-extrabold text-sm sm:text-base shadow-[0_4px_16px_rgba(43,102,87,0.45)] active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#F5CC72]" />
                <span>Quay lộc đầu mùa</span>
              </a>

              <a
                href="#trang-chu"
                onClick={() => soundEngine.playSfx("interact", 0.25)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0E1F1D]/90 hover:bg-[#142C2A] border border-[#F2D39B]/35 text-[#F7F3E8] font-bold text-xs sm:text-sm active:scale-95 transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-[#F2D39B]" />
                <span>Về đầu cổng làng</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER CHÍNH THỨC CỦA GAME TRẢI ĐỜI
      ====================================================================== */}
      <div className="pt-10 border-t border-[#F2D39B]/25">
        {/* Brand & Quick Navigation Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 text-center lg:text-left">
          {/* Logo & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#142C2A] border-2 border-[#F2D39B]/60 p-1 flex items-center justify-center shadow-md shrink-0">
              <img
                src="/game-assets/pixel/mieu.png"
                alt="TRẢI ĐỜI"
                className="w-9 h-9 object-contain pixelated"
              />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-wood text-2xl tracking-wider text-wood-gold">
                  TRẢI ĐỜI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#2B6657]/60 text-[#8BD3F4] border border-[#8BD3F4]/30">
                  Xóm Bến Dừa
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#D9D2C5] mt-1 font-medium">
                Một thế giới Việt Nam đầy sắc màu để sống, khám phá và kết nối.
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <nav
            aria-label="Liên kết điều hướng nhanh"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <a
              href="#trang-chu"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Trang chủ
            </a>
            <a
              href="#trong-rau"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Trồng rau
            </a>
            <a
              href="#quay-loc"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Quay lộc
            </a>
            <a
              href="#kham-pha"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Khám phá
            </a>
            <a
              href="#nhan-vat"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Nhân vật
            </a>
            <a
              href="#thu-vien"
              onClick={() => soundEngine.playSfx("interact", 0.2)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#142C2A]/70 hover:bg-[#2B6657]/80 text-[#F7F3E8] border border-[#F2D39B]/25 hover:border-[#F2D39B]/60 hover:text-[#F5CC72] transition-colors"
            >
              Bộ sưu tập
            </a>
          </nav>
        </div>

        {/* Status & Guide Row */}
        <div className="pt-6 border-t border-[#F2D39B]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9BA8A3]">
          {/* Storage Status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142C2A]/80 border border-emerald-500/35 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Tự động lưu tiến trình trên trình duyệt</span>
          </div>

          {/* Modal Open Button */}
          <button
            type="button"
            onClick={() => {
              setShowGuideDialog(true);
              soundEngine.playSfx("interact", 0.3);
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#142C2A]/90 hover:bg-[#2B6657]/70 border border-[#F2D39B]/35 text-[#F5CC72] font-semibold transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Hướng dẫn chơi & Dữ liệu lưu trữ</span>
          </button>
        </div>

        {/* Warm Folk Blessing */}
        <div className="mt-6 text-center text-[11px] text-[#9BA8A3]/80">
          <p>© 2026 TRẢI ĐỜI — Một thế giới game văn hóa và đời sống Việt Nam.</p>
          <p className="mt-1 text-[#9BA8A3]/60">
            Chúc bạn luôn tìm thấy những khoảnh khắc bình yên, ấm áp và thư thái tại Xóm Bến Dừa.
          </p>
        </div>
      </div>

      {/* =====================================================================
          MODAL: HƯỚNG DẪN CHƠI & DỮ LIỆU LƯU TRỮ
      ====================================================================== */}
      <AnimatePresence>
        {showGuideDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Hướng dẫn chơi & Dữ liệu lưu trữ"
            onClick={() => setShowGuideDialog(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full surface-elevated-card rounded-3xl p-6 sm:p-7 border-2 border-[#F2D39B]/50 shadow-[0_24px_64px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#F2D39B]/25">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#142C2A] border border-[#F2D39B]/60 flex items-center justify-center text-[#F5CC72]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F7F3E8]">
                      Hướng Dẫn Chơi & Dữ Liệu Lưu Trữ
                    </h3>
                    <p className="text-xs text-[#F2D39B]">
                      Cẩm nang dạo chơi Xóm Bến Dừa
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuideDialog(false)}
                  aria-label="Đóng cửa sổ"
                  className="w-8 h-8 rounded-lg bg-[#142C2A] hover:bg-[#2B6657] border border-[#F2D39B]/30 flex items-center justify-center text-[#F7F3E8] cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 text-xs sm:text-sm text-[#D9D2C5] leading-relaxed">
                {/* 1. Trồng rau & vườn quê */}
                <div className="p-3.5 rounded-2xl bg-[#0E1F1D]/80 border border-[#F2D39B]/20">
                  <h4 className="font-extrabold text-[#F7F3E8] flex items-center gap-2 mb-1.5 text-xs sm:text-sm">
                    <Sprout className="w-4 h-4 text-[#67AF65]" />
                    <span>1. Trồng trọt & Thu hoạch tại Vườn Nhà Ngoại</span>
                  </h4>
                  <p className="text-[#D9D2C5] text-xs">
                    Hãy xới đất, gieo hạt dưa hấu và rau xanh. Chăm chỉ tưới nước mỗi khi đất khô để cây mau lớn. Khi cây chín rộ, bấm thu hoạch để nhận về nông sản tươi ngon và Xu Làng mua sắm.
                  </p>
                </div>

                {/* 2. Quay lộc */}
                <div className="p-3.5 rounded-2xl bg-[#0E1F1D]/80 border border-[#F2D39B]/20">
                  <h4 className="font-extrabold text-[#F7F3E8] flex items-center gap-2 mb-1.5 text-xs sm:text-sm">
                    <Sparkles className="w-4 h-4 text-[#F5CC72]" />
                    <span>2. Đại Luân Quay Lộc & Túi Kỷ Vật</span>
                  </h4>
                  <p className="text-[#D9D2C5] text-xs">
                    Mỗi ngày ghé miếu Thổ Địa quay bánh xe may mắn để tích lũy điểm phúc đức, mở bao lì xì và sưu tập các kỷ vật dân gian Nam Bộ quý giá mang đậm hồn quê.
                  </p>
                </div>

                {/* 3. Khám phá 5 Vùng Non Sông */}
                <div className="p-3.5 rounded-2xl bg-[#0E1F1D]/80 border border-[#F2D39B]/20">
                  <h4 className="font-extrabold text-[#F7F3E8] flex items-center gap-2 mb-1.5 text-xs sm:text-sm">
                    <Compass className="w-4 h-4 text-[#8BD3F4]" />
                    <span>3. Chu Du Non Sông & Kết Nối Chòm Xóm</span>
                  </h4>
                  <p className="text-[#D9D2C5] text-xs">
                    Xem bản đồ tương tác để khám phá cảnh quan 5 miền Việt Nam, chuyển đổi thời tiết nắng mưa, ngày đêm và lắng nghe câu chuyện tâm tình từ những người dân hiền hậu.
                  </p>
                </div>

                {/* 4. Dữ liệu lưu trữ an toàn */}
                <div className="p-3.5 rounded-2xl bg-[#0E1F1D]/80 border border-emerald-500/30">
                  <h4 className="font-extrabold text-[#F7F3E8] flex items-center gap-2 mb-1.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>4. Tiến Trình Tự Động Lưu Trên Trình Duyệt</span>
                  </h4>
                  <p className="text-[#D9D2C5] text-xs">
                    Số dư Xu Làng, lượt quay lộc, tình trạng vườn rau và các kỷ vật bạn thu thập được tự động ghi nhớ trực tiếp trên trình duyệt của máy bạn. Bạn không cần đăng ký tài khoản, không lo mất dữ liệu khi tắt máy và hoàn toàn không thu bất kỳ chi phí nào.
                  </p>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-[#F2D39B]/20">
                <button
                  type="button"
                  onClick={() => {
                    setShowGuideDialog(false);
                    soundEngine.playSfx("interact", 0.25);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#FFF3C4] via-[#F5CC72] to-[#C88412] text-[#142C2A] font-extrabold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 cursor-pointer transition-all"
                >
                  Đã rõ, quay lại chơi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
