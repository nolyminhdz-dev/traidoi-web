"use client";

import React, { useState, useEffect } from "react";
import BambooHudNav from "@/components/BambooHudNav";
import WeatherEngineCanvas, { WeatherMode } from "@/components/WeatherEngineCanvas";
import Tropical3DFoliageFrame from "@/components/Tropical3DFoliageFrame";
import HeroDiorama from "@/components/HeroDiorama";
import GardenAndMemoriesSection from "@/components/GardenAndMemoriesSection";
import KarmaWheelSection from "@/components/KarmaWheelSection";
import WorldAtlasSection from "@/components/WorldAtlasSection";
import GameplayPillarsSection from "@/components/GameplayPillarsSection";
import Gliding3DGameScreens from "@/components/Gliding3DGameScreens";
import CraftAndFooterSection from "@/components/CraftAndFooterSection";

// Vibrant Vietnamese Fantasy Palette (#193D34, #2B806A, #1E4A3E) - Không đen đặc
const WEATHER_BG_THEMES: Record<WeatherMode, string> = {
  sun: "bg-gradient-to-b from-[#193D34] via-[#24584C] to-[#1E4A3E]",
  rain: "bg-gradient-to-b from-[#163B34] via-[#1E4941] to-[#183932]",
  sunset: "bg-gradient-to-b from-[#2E2822] via-[#244A40] to-[#193D34]",
  night: "bg-gradient-to-b from-[#122A24] via-[#1A3D34] to-[#15312A]",
};

const STORAGE_KEY = "traidoi_web_state_v2";

export default function HomePage() {
  const [wallet, setWallet] = useState<number>(10000); // 10.000 Xu Làng khởi đầu
  const [spinsLeft, setSpinsLeft] = useState<number>(3); // 3 lượt quay khởi đầu
  const [hunger, setHunger] = useState<number>(89); // Chỉ số no 0-100
  const [thirst, setThirst] = useState<number>(85); // Chỉ số nước 0-100
  const [weather, setWeather] = useState<WeatherMode>("sun");
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Safe Versioned State Hydration from localStorage (Bảo toàn wallet, spinsLeft, hunger, thirst, weather)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        React.startTransition(() => {
          if (typeof parsed.wallet === "number" && !Number.isNaN(parsed.wallet) && parsed.wallet >= 0) {
            setWallet(parsed.wallet);
          }
          if (typeof parsed.spinsLeft === "number" && !Number.isNaN(parsed.spinsLeft) && parsed.spinsLeft >= 0) {
            setSpinsLeft(parsed.spinsLeft);
          }
          if (typeof parsed.hunger === "number" && !Number.isNaN(parsed.hunger) && parsed.hunger >= 0 && parsed.hunger <= 100) {
            setHunger(parsed.hunger);
          }
          if (typeof parsed.thirst === "number" && !Number.isNaN(parsed.thirst) && parsed.thirst >= 0 && parsed.thirst <= 100) {
            setThirst(parsed.thirst);
          }
          if (
            parsed.weather === "sun" ||
            parsed.weather === "rain" ||
            parsed.weather === "sunset" ||
            parsed.weather === "night"
          ) {
            setWeather(parsed.weather);
          }
        });
      }
    } catch {
      // Fallback to default state safely
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist updated player state to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          wallet,
          spinsLeft,
          hunger,
          thirst,
          weather,
          version: 2,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [wallet, spinsLeft, hunger, thirst, weather, hydrated]);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 overflow-x-hidden ${WEATHER_BG_THEMES[weather]}`}
    >
      {/* 1. PERFORMANT 2D ATMOSPHERIC WEATHER & LIGHTING CANVAS */}
      <WeatherEngineCanvas weather={weather} />

      {/* 2. SUBTLE DESKTOP FOLIAGE SILHOUETTE FRAME */}
      <Tropical3DFoliageFrame weather={weather} />

      {/* 1. HEADER (BAMBOO HUD NAV) */}
      <BambooHudNav
        wallet={wallet}
        spinsLeft={spinsLeft}
        weather={weather}
        setWeather={setWeather}
      />

      {/* MAIN HOMEPAGE SECTIONS - THỨ TỰ BẮT BUỘC (MỤC VII: ĐƯA GAMEPLAY LÊN ĐẦU) */}
      <main className="relative z-10">
        {/* 2. HERO: Cinematic Hero & Khởi đầu tại Xóm Bến Dừa */}
        <div id="trang-chu">
          <HeroDiorama
            weather={weather}
            setWeather={setWeather}
            onSelectOriginBonus={() => {
              setSpinsLeft((prev) => prev + 1);
            }}
            onBonusWallet={(amt) => {
              setWallet((prev) => prev + amt);
            }}
          />
        </div>

        {/* 3. TRỒNG RAU: Vườn Nhà Ngoại, Chăm Sóc Cây Trồng, Nấu Ăn & Kỷ Vật */}
        <div id="trong-rau">
          <GardenAndMemoriesSection
            wallet={wallet}
            setWallet={setWallet}
            setSpinsLeft={setSpinsLeft}
            hunger={hunger}
            setHunger={setHunger}
            thirst={thirst}
            setThirst={setThirst}
            weather={weather}
          />
        </div>

        {/* 4. QUAY LỘC: Đại Luân Quay Lộc, Nhận Thưởng May Mắn & Túi Lộc */}
        <div id="quay-loc">
          <KarmaWheelSection
            spinsLeft={spinsLeft}
            setSpinsLeft={setSpinsLeft}
            wallet={wallet}
            setWallet={setWallet}
            weather={weather}
          />
        </div>

        {/* 5. KHÁM PHÁ THẾ GIỚI: Bản Đồ Tương Tác 5 Vùng Đất Kỳ Thú Việt Nam */}
        <div id="kham-pha">
          <WorldAtlasSection weather={weather} />
        </div>

        {/* 6. NHÂN VẬT & LỐI CHƠI: 4 Trụ Cột Gameplay & Những Con Người Nơi Xóm Nhỏ */}
        <GameplayPillarsSection />

        {/* 7. BỘ SƯU TẬP / THƯ VIỆN: Trình Chiếu Ảnh & Video Khoảnh Khắc Làng Quê */}
        <div id="thu-vien">
          <Gliding3DGameScreens weather={weather} />
        </div>

        {/* 8. FOOTER: Lộ Trình Phát Triển, Kết Nối Cộng Đồng & Thông Tin Game */}
        <CraftAndFooterSection weather={weather} />
      </main>
    </div>
  );
}
