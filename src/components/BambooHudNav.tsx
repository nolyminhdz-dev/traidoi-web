"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Radio,
  Sun,
  CloudRain,
  Sunset,
  Moon,
  Coins,
  Menu,
  X,
  Sprout,
  Compass,
  Sparkles,
  Users,
  Play,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";

interface BambooHudNavProps {
  wallet: number;
  spinsLeft: number;
  weather: WeatherMode;
  setWeather: React.Dispatch<React.SetStateAction<WeatherMode>>;
}

const WEATHER_OPTIONS: {
  id: WeatherMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "sun", label: "Ban ngày", icon: Sun },
  { id: "rain", label: "Mưa rào", icon: CloudRain },
  { id: "sunset", label: "Hoàng hôn", icon: Sunset },
  { id: "night", label: "Đêm trăng", icon: Moon },
];

const NAV_LINKS = [
  { href: "#trang-chu", label: "Trang chủ", icon: Sparkles },
  { href: "#trong-rau", label: "Trồng rau", icon: Sprout },
  { href: "#quay-loc", label: "Quay lộc", icon: Sparkles },
  { href: "#kham-pha", label: "Khám phá", icon: Compass },
  { href: "#nhan-vat", label: "Nhân vật", icon: Users },
];

export default function BambooHudNav({
  wallet,
  weather,
  setWeather,
}: BambooHudNavProps) {
  const [muted, setMuted] = useState<boolean>(false);
  const [radioOn, setRadioOn] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>("#trang-chu");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleToggleSound = () => {
    const isNowMuted = soundEngine.toggleMute();
    setMuted(isNowMuted);
  };

  const handleToggleRadio = () => {
    const nextState = !radioOn;
    setRadioOn(nextState);
    if (muted && nextState) {
      soundEngine.toggleMute();
      setMuted(false);
    }
    soundEngine.switchTrack(nextState ? "radio" : "village");
  };

  const handleChangeWeather = (mode: WeatherMode) => {
    setWeather(mode);
    soundEngine.setWeatherAudio(mode);
    soundEngine.playSfx("interact", 0.35);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 select-none ${
        scrolled
          ? "bg-[#193D34]/95 backdrop-blur-md border-b border-[#F5CC72]/35 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
          : "bg-[#193D34]/82 backdrop-blur-sm border-b border-[#F5CC72]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3">
        {/* LEFT: BRAND LOGO */}
        <a
          href="#trang-chu"
          onClick={() => setActiveHash("#trang-chu")}
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="TRẢI ĐỜI — Về trang chủ"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#3A2316] to-[#24160E] border-2 border-[#F5CC72] flex items-center justify-center shadow-[0_3px_0_#140B06] group-hover:scale-105 transition-transform">
            <img
              src="/game-assets/pixel/mieu.png"
              alt=""
              className="w-7 h-7 object-contain pixelated"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-wood text-xl sm:text-2xl tracking-wider text-wood-gold leading-none">
              TRẢI ĐỜI
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#8BD3F4] mt-0.5">
              Xóm Bến Dừa
            </span>
          </div>
        </a>

        {/* CENTER: DESKTOP NAVIGATION */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-[#122D26]/80 border border-[#F5CC72]/25 rounded-full px-2 py-1"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveHash(link.href);
                  soundEngine.playSfx("interact", 0.25);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-[#F5CC72] text-[#24160E] shadow-sm"
                    : "text-[#FFF6E5]/90 hover:text-[#F5CC72] hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: GAME WALLET HUD + SOUND + PRIMARY CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Weather Quick Switcher (Desktop XL) */}
          <div
            role="group"
            aria-label="Thời gian trong xóm"
            className="hidden xl:flex items-center bg-[#122D26]/90 border border-[#F5CC72]/25 rounded-full p-1 gap-0.5"
          >
            {WEATHER_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = weather === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChangeWeather(opt.id)}
                  title={opt.label}
                  aria-label={opt.label}
                  aria-pressed={active}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    active
                      ? "bg-[#F5CC72] text-[#24160E] shadow-sm"
                      : "text-[#FFF6E5]/75 hover:text-[#FFF6E5]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>

          {/* Clean Game Wallet Badge */}
          <a
            href="#trong-rau"
            title="Số dư Xu Làng của bạn"
            className="flex items-center gap-1.5 bg-[#2A1A11] border-2 border-[#F5CC72]/70 rounded-full px-3 py-1.5 shadow-[0_2px_0_#140B06] hover:border-[#F5CC72] transition-colors"
          >
            <Coins className="w-4 h-4 text-[#F5CC72] shrink-0" />
            <span className="text-xs sm:text-sm font-extrabold text-[#FFF6E5] tabular-nums">
              {wallet.toLocaleString("vi-VN")}
            </span>
            <span className="hidden sm:inline text-[11px] font-bold text-[#F5CC72]">
              Xu Làng
            </span>
          </a>

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
            title={muted ? "Bật âm thanh" : "Tắt âm thanh"}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              muted
                ? "bg-[#2A1A11]/80 border-[#E98065]/50 text-[#E98065]"
                : "bg-[#122D26] border-[#F5CC72]/40 text-[#F5CC72] hover:bg-[#1E463B]"
            }`}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Primary CTA: Chơi ngay */}
          <a
            href="#trong-rau"
            onClick={() => {
              setActiveHash("#trong-rau");
              soundEngine.playSfx("interact", 0.4);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-game-primary font-extrabold text-xs lg:text-sm tracking-wide cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Chơi ngay</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-game-menu"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            className="md:hidden p-2 rounded-xl bg-[#122D26] border border-[#F5CC72]/45 text-[#FFF6E5] hover:border-[#F5CC72] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#F5CC72]" />
            ) : (
              <Menu className="w-5 h-5 text-[#F5CC72]" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div
          id="mobile-game-menu"
          role="dialog"
          aria-label="Menu điều hướng trên di động"
          className="md:hidden bg-[#193D34]/98 border-b-2 border-[#F5CC72]/50 px-4 pt-3 pb-5 shadow-2xl"
        >
          <nav className="grid grid-cols-2 gap-2 mb-4">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveHash(link.href);
                    setMobileMenuOpen(false);
                    soundEngine.playSfx("interact", 0.3);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#214E43] border border-[#F5CC72]/25 text-xs font-bold text-[#FFF6E5] active:bg-[#2B806A]"
                >
                  <Icon className="w-4 h-4 text-[#F5CC72] shrink-0" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Weather & Radio Controls on Mobile */}
          <div className="flex flex-col gap-2.5 pt-3 border-t border-[#F5CC72]/20">
            <div className="grid grid-cols-4 gap-1.5">
              {WEATHER_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = weather === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleChangeWeather(opt.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-[#F5CC72] text-[#24160E] border-[#FFF6E5]"
                        : "bg-[#122D26] text-[#FFF6E5]/80 border-[#F5CC72]/20"
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleToggleRadio}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  radioOn
                    ? "bg-[#67AF65] text-[#FFF6E5] border-[#FFF6E5]"
                    : "bg-[#122D26] text-[#FFF6E5] border-[#F5CC72]/35"
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>{radioOn ? "Đang bật Đài Quê" : "Bật Đài Phát Thanh"}</span>
              </button>

              <a
                href="#trong-rau"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl btn-game-primary text-xs font-extrabold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Vào xóm chơi</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
