"use client";

import React, { useState, useEffect } from "react";
import BambooHudNav from "@/components/BambooHudNav";
import WeatherEngineCanvas, { WeatherMode } from "@/components/WeatherEngineCanvas";
import Tropical3DFoliageFrame from "@/components/Tropical3DFoliageFrame";
import HeroDiorama from "@/components/HeroDiorama";
import GameplayPillarsSection from "@/components/GameplayPillarsSection";
import WorldAtlasSection from "@/components/WorldAtlasSection";
import GardenAndMemoriesSection from "@/components/GardenAndMemoriesSection";
import KarmaWheelSection from "@/components/KarmaWheelSection";
import Gliding3DGameScreens from "@/components/Gliding3DGameScreens";
import CraftAndFooterSection from "@/components/CraftAndFooterSection";

const WEATHER_BG_THEMES: Record<WeatherMode, string> = {
  sun: "bg-gradient-to-b from-[#0E1F1D] via-[#142C2A] to-[#0B1816]",
  rain: "bg-gradient-to-b from-[#09131C] via-[#0F1E2B] to-[#070E14]",
  sunset: "bg-gradient-to-b from-[#231215] via-[#1C141A] to-[#0E1517]",
  night: "bg-gradient-to-b from-[#050B0B] via-[#091314] to-[#040808]",
};

const STORAGE_KEY = "traidoi_web_state_v2";

export default function HomePage() {
  const [wallet, setWallet] = useState<number>(10000); // 10.000 Xu Làng khởi đầu
  const [spinsLeft, setSpinsLeft] = useState<number>(3); // 3 lượt quay khởi đầu
  const [hunger, setHunger] = useState<number>(89);
  const [thirst, setThirst] = useState<number>(85);
  const [weather, setWeather] = useState<WeatherMode>("sun");
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Safe Versioned State Hydration from localStorage (Section XV.41)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.wallet === "number" && parsed.wallet >= 0) {
          setWallet(parsed.wallet);
        }
        if (typeof parsed.spinsLeft === "number" && parsed.spinsLeft >= 0) {
          setSpinsLeft(parsed.spinsLeft);
        }
        if (
          parsed.weather === "sun" ||
          parsed.weather === "rain" ||
          parsed.weather === "sunset" ||
          parsed.weather === "night"
        ) {
          setWeather(parsed.weather);
        }
      }
    } catch {
      // Fallback to default state safely
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ wallet, spinsLeft, weather, version: 2 })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [wallet, spinsLeft, weather, hydrated]);

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 overflow-x-hidden ${WEATHER_BG_THEMES[weather]}`}
    >
      {/* 1. PERFORMANT 2D ATMOSPHERIC WEATHER & LIGHTING CANVAS */}
      <WeatherEngineCanvas weather={weather} />

      {/* 2. SUBTLE DESKTOP FOLIAGE SILHOUETTE FRAME */}
      <Tropical3DFoliageFrame weather={weather} />

      {/* 3. GLOBAL NAVIGATION HEADER & MOBILE DRAWER */}
      <BambooHudNav
        wallet={wallet}
        spinsLeft={spinsLeft}
        weather={weather}
        setWeather={setWeather}
      />

      {/* 4. MAIN PAGE ARCHITECTURE (SECTION XVI.45) */}
      <main className="relative z-10">
        {/* Section 10: Cinematic Hero + Section 11: The Living World */}
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

        {/* Section 12: 4 Gameplay Pillars + Section 14: Characters & Stories */}
        <GameplayPillarsSection />

        {/* Section 13: Explore Vietnam — Interactive 5-Region World Map */}
        <WorldAtlasSection weather={weather} />

        {/* Section 19 & 20: Interactive Village Experience (Farming, Shop & Keepsakes) */}
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

        {/* Section 20: Đại Luân Quay Lộc & Túi Lộc */}
        <KarmaWheelSection
          spinsLeft={spinsLeft}
          setSpinsLeft={setSpinsLeft}
          wallet={wallet}
          setWallet={setWallet}
          weather={weather}
        />

        {/* Section 15: Filterable Game Preview & Media Gallery + Lightbox */}
        <Gliding3DGameScreens weather={weather} />

        {/* Section 16: Development Journey + Section 17: Community + Section 18: Footer */}
        <CraftAndFooterSection weather={weather} />
      </main>
    </div>
  );
}
