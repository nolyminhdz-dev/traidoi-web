"use client";

import React, { useState } from "react";
import BambooHudNav from "@/components/BambooHudNav";
import WeatherEngineCanvas, { WeatherMode } from "@/components/WeatherEngineCanvas";
import Tropical3DFoliageFrame from "@/components/Tropical3DFoliageFrame";
import HeroDiorama from "@/components/HeroDiorama";
import Gliding3DGameScreens from "@/components/Gliding3DGameScreens";
import KarmaWheelSection from "@/components/KarmaWheelSection";
import GardenAndMemoriesSection from "@/components/GardenAndMemoriesSection";
import WorldAtlasSection from "@/components/WorldAtlasSection";
import CraftAndFooterSection from "@/components/CraftAndFooterSection";

const WEATHER_BG_THEMES: Record<WeatherMode, string> = {
  sun: "bg-gradient-to-b from-[#1E130C] via-[#271910] to-[#140C07]",
  rain: "bg-gradient-to-b from-[#09131C] via-[#0F1E2B] to-[#070E14]",
  sunset: "bg-gradient-to-b from-[#2A1015] via-[#231118] to-[#12080C]",
  night: "bg-gradient-to-b from-[#050811] via-[#090D18] to-[#04060B]",
};

export default function HomePage() {
  const [wallet, setWallet] = useState<number>(10000); // 10.000đ tiền chợ Ngoại đưa
  const [spinsLeft, setSpinsLeft] = useState<number>(3); // 3 lượt quay nhân quả khởi đầu
  const [hunger, setHunger] = useState<number>(89);
  const [thirst, setThirst] = useState<number>(85);
  const [weather, setWeather] = useState<WeatherMode>("sun");

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 overflow-x-hidden ${WEATHER_BG_THEMES[weather]}`}
    >
      {/* 1. REALTIME 4D CANVAS WEATHER & ATMOSPHERIC PHYSICS ENGINE */}
      <WeatherEngineCanvas weather={weather} />

      {/* 2. MULTI-PLANE 3D/4D COCONUT PALMS & JOINTED BAMBOO GROVES FRAME */}
      <Tropical3DFoliageFrame weather={weather} />

      {/* 3. FLOATING DYNAMIC ISLAND HUD WITH 4-WAY WEATHER SWITCHER */}
      <BambooHudNav
        wallet={wallet}
        spinsLeft={spinsLeft}
        weather={weather}
        setWeather={setWeather}
      />

      {/* 4. SPATIAL 3D/4D WORLD CONTENT */}
      <main className="relative z-10">
        {/* Stage 1: 3D Living Diorama & Emotional Family Origin Hook */}
        <HeroDiorama
          weather={weather}
          onSelectOriginBonus={() => {
            setSpinsLeft((prev) => prev + 1);
          }}
          onBonusWallet={(amt) => {
            setWallet((prev) => prev + amt);
          }}
        />

        {/* Stage 2: Dual-Track 3D Isometric Gliding Game Screens + Holo-Stage ("Màn Hình Lướt Lướt 3D") */}
        <Gliding3DGameScreens weather={weather} />

        {/* Stage 3: 5-Layer 3D Extruded Karma Wheel & Hold-to-Charge Energy */}
        <KarmaWheelSection
          spinsLeft={spinsLeft}
          setSpinsLeft={setSpinsLeft}
          wallet={wallet}
          setWallet={setWallet}
          weather={weather}
        />

        {/* Stage 4: 3D Tilted Garden Bed, Rain Synergy & 5 Keepsakes of Ngoại */}
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

        {/* Stage 5: Zero-Text 3D Expanding Postcard Deck & 3D Floating Loot Pedestal */}
        <WorldAtlasSection weather={weather} />

        {/* Stage 6: 3D Twilight Porch Sanctuary Finale ("Hiên Nhà Ngoại 3D") */}
        <CraftAndFooterSection weather={weather} />
      </main>
    </div>
  );
}
