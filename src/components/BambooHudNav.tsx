"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Sun,
  CloudRain,
  Sunset,
  Moon,
  Coins,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";

interface BambooHudNavProps {
  wallet: number;
  spinsLeft: number;
  weather: WeatherMode;
  setWeather: (w: WeatherMode) => void;
}

const WEATHER_BUTTONS: {
  id: WeatherMode;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "sun", label: "Nắng Sớm", icon: <Sun className="w-3.5 h-3.5" /> },
  { id: "rain", label: "Mưa Rào", icon: <CloudRain className="w-3.5 h-3.5" /> },
  { id: "sunset", label: "Hoàng Hôn", icon: <Sunset className="w-3.5 h-3.5" /> },
  { id: "night", label: "Đêm Đèn", icon: <Moon className="w-3.5 h-3.5" /> },
];

const NAV_LINKS = [
  { label: "Thế Giới", href: "#the-living-world" },
  { label: "Lối Chơi", href: "#loi-choi" },
  { label: "Bản Đồ", href: "#ban-do-viet-nam" },
  { label: "Nhân Vật", href: "#nhan-vat" },
  { label: "Trải Nghiệm", href: "#vuon-nha-ngoai" },
  { label: "Thư Viện", href: "#thu-vien-hinh-anh" },
  { label: "Lộ Trình", href: "#lo-trinh-phat-trien" },
];

export default function BambooHudNav({
  wallet,
  spinsLeft,
  weather,
  setWeather,
}: BambooHudNavProps) {
  const [muted, setMuted] = useState(true);
  const [radioActive, setRadioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleToggleAudio = () => {
    const isNowMuted = soundEngine.toggleMute();
    setMuted(isNowMuted);
  };

  const handleToggleRadio = () => {
    if (muted) {
      soundEngine.toggleMute();
      setMuted(false);
    }
    const nextState = !radioActive;
    setRadioActive(nextState);
    soundEngine.switchTrack(nextState ? "radio" : "village");
    soundEngine.playSfx("interact", 0.5);
  };

  const handleSelectWeather = (mode: WeatherMode) => {
    setWeather(mode);
    soundEngine.playSfx(mode === "rain" ? "water" : "interact", 0.4);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 select-none ${
        scrolled
          ? "bg-[#0E1F1D]/92 backdrop-blur-md border-b border-[#F2D39B]/25 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.65)]"
          : "bg-gradient-to-b from-[#0E1F1D]/90 via-[#0E1F1D]/60 to-transparent py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
        {/* LEFT: Brand Identity */}
        <a
          href="#cong-lang"
          aria-label="TRẢI ĐỜI — Trang chủ"
          onClick={() => soundEngine.playSfx("interact", 0.35)}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#142C2A] border border-[#F2D39B]/60 flex items-center justify-center p-1 shadow-inner group-hover:scale-105 transition-transform">
            <img
              src="/game-assets/pixel/portrait-tho-dia.png"
              alt="Biểu tượng Trải Đời"
              className="w-full h-full object-contain pixelated"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-wood text-base sm:text-lg tracking-wider text-wood-gold leading-none">
              TRẢI ĐỜI
            </span>
            <span className="text-[10px] font-medium text-[#D9D2C5] tracking-wider hidden sm:inline">
              Xóm Bến Dừa • Build #658
            </span>
          </div>
        </a>

        {/* CENTER: Desktop Navigation Links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex items-center gap-1 bg-[#142C2A]/75 border border-[#F2D39B]/20 rounded-full px-3 py-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundEngine.playSfx("interact", 0.25)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#F7F3E8]/90 hover:text-[#F2D39B] hover:bg-[#2B6657]/35 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT: Weather Switcher, Currency HUD & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop 4-Mode Weather Switcher */}
          <div
            role="group"
            aria-label="Chế độ thời tiết và thời gian"
            className="hidden md:flex items-center gap-1 bg-[#142C2A]/90 border border-[#F2D39B]/25 rounded-full p-1"
          >
            {WEATHER_BUTTONS.map((btn) => {
              const active = weather === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => handleSelectWeather(btn.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#F2D39B] text-[#142C2A] shadow-sm"
                      : "text-[#D9D2C5] hover:text-[#F7F3E8]"
                  }`}
                >
                  {btn.icon}
                  <span className="hidden lg:inline">{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* In-Game Currency Pill: Xu Làng (Separated from real-money VND) */}
          <div
            title="Tiền tệ trong game: Xu Làng"
            className="flex items-center gap-1.5 bg-[#142C2A]/95 border border-[#F2D39B]/40 rounded-full px-2.5 sm:px-3 py-1 text-xs font-bold text-[#F2D39B]"
          >
            <Coins className="w-3.5 h-3.5 text-[#F2D39B] shrink-0" />
            <span>{wallet.toLocaleString("vi-VN")}</span>
            <span className="hidden sm:inline text-[11px] text-[#D9D2C5] font-medium">
              Xu Làng
            </span>
          </div>

          {/* Primary CTA to Interactive Wheel / Sandbox */}
          <a
            href="#vong-quay-nhan-qua"
            onClick={() => soundEngine.playSfx("interact", 0.35)}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-b from-[#F2D39B] to-[#C88412] hover:brightness-105 text-[#142C2A] border border-[#FFF8E6]/60 rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quay Lộc ({spinsLeft})</span>
          </a>

          {/* Audio Controls */}
          <button
            type="button"
            onClick={handleToggleRadio}
            aria-label={radioActive ? "Tắt đài phát thanh làng" : "Bật đài phát thanh làng"}
            title="Đài Phát Thanh Xóm Bến Dừa"
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full border transition-all cursor-pointer ${
              radioActive && !muted
                ? "bg-[#2B6657] border-[#F2D39B] text-[#F7F3E8]"
                : "bg-[#142C2A]/90 border-[#F2D39B]/30 text-[#D9D2C5] hover:text-[#F7F3E8]"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label={muted ? "Bật âm thanh môi trường" : "Tắt âm thanh môi trường"}
            className={`flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-full border transition-all cursor-pointer ${
              !muted
                ? "bg-[#2B6657] border-[#F2D39B] text-[#F7F3E8]"
                : "bg-[#142C2A]/90 border-[#F2D39B]/30 text-[#D9D2C5]"
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button (< xl) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
            className="xl:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#142C2A] border border-[#F2D39B]/45 text-[#F7F3E8] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-label="Menu điều hướng di động"
          className="xl:hidden mt-2 mx-3 rounded-2xl bg-[#0E1F1D]/98 border border-[#F2D39B]/35 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          {/* Weather Selector inside Mobile Menu */}
          <div className="mb-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#9BA8A3] mb-2">
              Thời tiết & Thời gian môi trường
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WEATHER_BUTTONS.map((btn) => {
                const active = weather === btn.id;
                return (
                  <button
                    key={btn.id}
                    type="button"
                    onClick={() => handleSelectWeather(btn.id)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      active
                        ? "bg-[#F2D39B] text-[#142C2A] border-[#F7F3E8]"
                        : "bg-[#142C2A] text-[#D9D2C5] border-[#F2D39B]/20"
                    }`}
                  >
                    {btn.icon}
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Links */}
          <nav aria-label="Danh mục trang" className="grid grid-cols-2 gap-2 mb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundEngine.playSfx("interact", 0.25);
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#142C2A]/90 border border-[#F2D39B]/20 text-xs font-semibold text-[#F7F3E8] hover:border-[#F2D39B]"
              >
                <Compass className="w-3.5 h-3.5 text-[#F2D39B] shrink-0" />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Mobile CTA & Radio */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F2D39B]/15">
            <button
              type="button"
              onClick={handleToggleRadio}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#142C2A] border border-[#F2D39B]/30 text-xs font-semibold text-[#F7F3E8]"
            >
              <Radio className="w-4 h-4 text-[#F2D39B]" />
              <span>{radioActive && !muted ? "Đang bật Radio Làng" : "Nghe Radio Làng"}</span>
            </button>

            <a
              href="#vong-quay-nhan-qua"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#F2D39B] to-[#C88412] text-[#142C2A] text-xs font-extrabold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Quay Lộc Đầu Mùa ({spinsLeft} Lượt)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
