"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shovel,
  Sprout,
  Droplets,
  Sparkles,
  Heart,
  Flame,
  Moon,
  UtensilsCrossed,
  Radio,
  MapPin,
  Coins,
  ShoppingBag,
  AlertCircle,
  Check,
  ArrowRight,
  Sun,
} from "lucide-react";
import { NGOAI_KEEPSAKES, NgoaiKeepsake } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound-engine";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface GardenAndMemoriesSectionProps {
  wallet: number;
  setWallet: React.Dispatch<React.SetStateAction<number>>;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
  hunger: number;
  setHunger: React.Dispatch<React.SetStateAction<number>>;
  thirst: number;
  setThirst: React.Dispatch<React.SetStateAction<number>>;
  weather?: WeatherMode;
}

type PlotStage = 0 | 1 | 2 | 3 | 4;

interface FarmPlot {
  id: number;
  stage: PlotStage;
}

interface FloatingEffect {
  id: number;
  plotId?: number;
  text: string;
  color?: string;
}

const FARMING_STORAGE_KEY = "traidoi_farming_state_v2";

const STAGE_ACTION: Record<PlotStage, string> = {
  0: "Xới Đất",
  1: "Gieo Hạt",
  2: "Tưới Nước",
  3: "Tưới Đợt 2",
  4: "Thu Hoạch",
};

const STAGE_NAME: Record<PlotStage, string> = {
  0: "Đất trống",
  1: "Đất tơi xốp",
  2: "Mầm vừa nhú",
  3: "Rau đang lớn",
  4: "Sẵn sàng thu hoạch",
};

function renderKeepsakeIcon(type: NgoaiKeepsake["iconType"]) {
  switch (type) {
    case "flame":
      return <Flame className="w-5 h-5 text-[#F5CC72]" />;
    case "moon":
      return <Moon className="w-5 h-5 text-sky-300" />;
    case "hearth":
      return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
    case "droplets":
      return <Droplets className="w-5 h-5 text-cyan-300" />;
    case "radio":
      return <Radio className="w-5 h-5 text-emerald-400" />;
  }
}

export default function GardenAndMemoriesSection({
  wallet,
  setWallet,
  setSpinsLeft,
  hunger,
  setHunger,
  thirst,
  setThirst,
  weather = "sun",
}: GardenAndMemoriesSectionProps) {
  // 1. Core Farming & Progression State
  const [plots, setPlots] = useState<FarmPlot[]>([
    { id: 1, stage: 2 },
    { id: 2, stage: 3 },
    { id: 3, stage: 4 },
  ]);

  const [harvestedMuong, setHarvestedMuong] = useState<number>(1);
  const [eggsOwned, setEggsOwned] = useState<number>(0);
  const [activeKeepsake, setActiveKeepsake] = useState<NgoaiKeepsake>(
    NGOAI_KEEPSAKES[0]
  );
  const [lineIndexMap, setLineIndexMap] = useState<Record<string, number>>({
    altar: 0,
    hammock: 0,
    hearth: 0,
    water: 0,
    porch: 0,
  });
  const [visitedKeepsakes, setVisitedKeepsakes] = useState<string[]>(["altar"]);

  // 2. Visual Polish & Micro-interaction States
  const [floatingReward, setFloatingReward] = useState<string | null>(null);
  const [floatingEffects, setFloatingEffects] = useState<FloatingEffect[]>([]);
  const [wateringPlots, setWateringPlots] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // General Toast notification
  const showPop = (msg: string) => {
    setFloatingReward(msg);
    setTimeout(() => setFloatingReward(null), 2800);
  };

  // Plot-specific or global floating numbers effect
  const addFloatingFx = (
    text: string,
    plotId?: number,
    color = "text-[#F5CC72]"
  ) => {
    const id = Date.now() + Math.random();
    setFloatingEffects((prev) => [...prev, { id, plotId, text, color }]);
    setTimeout(() => {
      setFloatingEffects((prev) => prev.filter((fx) => fx.id !== id));
    }, 1500);
  };

  const triggerWateringAnim = (plotId: number) => {
    setWateringPlots((prev) => [...prev, plotId]);
    setTimeout(() => {
      setWateringPlots((prev) => prev.filter((id) => id !== plotId));
    }, 1000);
  };

  // Safe localStorage Hydration (Bảo toàn plots, harvestedMuong, eggsOwned, visitedKeepsakes)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FARMING_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.plots) && parsed.plots.length === 3) {
          const validPlots = parsed.plots.every(
            (p: { id: unknown; stage: unknown }) =>
              typeof p.id === "number" &&
              typeof p.stage === "number" &&
              p.stage >= 0 &&
              p.stage <= 4
          );
          if (validPlots) {
            setPlots(parsed.plots);
          }
        }
        if (
          typeof parsed.harvestedMuong === "number" &&
          !Number.isNaN(parsed.harvestedMuong) &&
          parsed.harvestedMuong >= 0
        ) {
          setHarvestedMuong(parsed.harvestedMuong);
        }
        if (
          typeof parsed.eggsOwned === "number" &&
          !Number.isNaN(parsed.eggsOwned) &&
          parsed.eggsOwned >= 0
        ) {
          setEggsOwned(parsed.eggsOwned);
        }
        if (Array.isArray(parsed.visitedKeepsakes)) {
          const validKeepsakes = parsed.visitedKeepsakes.filter(
            (k: unknown) => typeof k === "string"
          );
          if (validKeepsakes.length > 0) {
            setVisitedKeepsakes(validKeepsakes);
          }
        }
      }
    } catch {
      // Safe fallback
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist updated farming state to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        FARMING_STORAGE_KEY,
        JSON.stringify({
          plots,
          harvestedMuong,
          eggsOwned,
          visitedKeepsakes,
          version: 2,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [plots, harvestedMuong, eggsOwned, visitedKeepsakes, hydrated]);

  // Rain Weather Synergy: Automatically waters planted plots (stage 2 -> 4, stage 3 -> 4)
  useEffect(() => {
    if (weather === "rain") {
      setPlots((prev) =>
        prev.map((p) =>
          p.stage === 2 || p.stage === 3 ? { ...p, stage: 4 } : p
        )
      );
      setWateringPlots([1, 2, 3]);
      setTimeout(() => setWateringPlots([]), 1200);
      showPop("Mưa rào miền Tây tự động tưới xanh cả 3 luống rau!");
    }
  }, [weather]);

  // Handle plot progression: 0: Đất trống -> 1: Đã xới đất -> 2: Đã gieo hạt -> 3: Đang lớn -> 4: Thu hoạch
  const handlePlotClick = (plotId: number) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id !== plotId) return p;

        if (p.stage === 0) {
          soundEngine.playSfx("hoe", 0.55);
          addFloatingFx("🚜 Đã xới tơi xốp", plotId, "text-[#F5CC72]");
          return { ...p, stage: 1 };
        }
        if (p.stage === 1) {
          soundEngine.playSfx("seed", 0.55);
          addFloatingFx("🌱 Đã gieo hạt muống", plotId, "text-[#BEF264]");
          return { ...p, stage: 2 };
        }
        if (p.stage === 2) {
          soundEngine.playSfx("water", 0.55);
          triggerWateringAnim(plotId);
          addFloatingFx("💧 Tưới đợt 1 mát lành", plotId, "text-sky-300");
          return { ...p, stage: 3 };
        }
        if (p.stage === 3) {
          soundEngine.playSfx("water", 0.55);
          triggerWateringAnim(plotId);
          addFloatingFx("🌿 Rau lớn xanh mướt!", plotId, "text-[#BEF264]");
          return { ...p, stage: 4 };
        }
        // Stage 4: Thu hoạch rau muống
        soundEngine.playSfx("harvest", 0.65);
        setHarvestedMuong((c) => c + 1);
        addFloatingFx("+1 Bó Rau Muống", plotId, "text-[#BEF264]");
        showPop("+1 Bó Rau Muống Tươi");
        return { ...p, stage: 0 };
      })
    );
  };

  // Water All Plots Action
  const handleWaterAll = () => {
    soundEngine.playSfx("water", 0.65);
    setPlots((prev) =>
      prev.map((p) => {
        if (p.stage === 2) return { ...p, stage: 3 };
        if (p.stage === 3) return { ...p, stage: 4 };
        return p;
      })
    );
    setWateringPlots([1, 2, 3]);
    setTimeout(() => setWateringPlots([]), 1200);
    addFloatingFx("💧 Múc nước tưới cả vườn!", undefined, "text-sky-300");
    showPop("Đã múc nước lu tưới mát cả 3 luống rau!");
  };

  // Sell Vegetables at Sạp Cô Sáu Hiền (+3.800 Xu Làng / bó & +1 Lượt Quay)
  const handleSellMuong = () => {
    if (harvestedMuong <= 0) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    const revenue = harvestedMuong * 3800;
    soundEngine.playSfx("coins", 0.65);
    setWallet((prev) => prev + revenue);
    setSpinsLeft((prev) => prev + 1);
    const count = harvestedMuong;
    setHarvestedMuong(0);
    addFloatingFx(
      `+${revenue.toLocaleString("vi-VN")} Xu Làng & +1 Lượt Quay`,
      undefined,
      "text-[#F5CC72]"
    );
    showPop(
      `Đã bán ${count} bó rau: +${revenue.toLocaleString("vi-VN")} Xu Làng & +1 Lượt Quay`
    );
  };

  // Buy Garden Eggs at Sạp Cô Sáu Hiền (1.400 Xu Làng -> +15 Độ No)
  const handleBuyEgg = () => {
    if (wallet < 1400) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    soundEngine.playSfx("coins", 0.55);
    setWallet((prev) => prev - 1400);
    setEggsOwned((prev) => prev + 1);
    setHunger((prev) => Math.min(100, prev + 15));
    addFloatingFx("🥚 +1 Trứng Gà Ta (+15 Độ No)", undefined, "text-[#FFF6E5]");
    showPop("Đã mua 1 Trứng Gà Ta (+15 Độ No)");
  };

  // Interact with Grandma's Keepsakes
  const handleTouchKeepsake = (item: NgoaiKeepsake) => {
    setActiveKeepsake(item);
    soundEngine.playSfx("interact", 0.45);

    setLineIndexMap((prev) => ({
      ...prev,
      [item.id]: ((prev[item.id] ?? 0) + 1) % item.lines.length,
    }));

    if (item.id === "hearth") {
      soundEngine.playSfx("fire-crackle", 0.5);
      setHunger((prev) => Math.min(100, prev + 20));
      addFloatingFx("🔥 +20 Độ No", undefined, "text-amber-400");
    } else if (item.id === "water") {
      soundEngine.playSfx("water", 0.5);
      setThirst((prev) => Math.min(100, prev + 20));
      addFloatingFx("💧 +20 Độ Mát", undefined, "text-cyan-300");
    }

    if (!visitedKeepsakes.includes(item.id)) {
      setVisitedKeepsakes((prev) => [...prev, item.id]);
    }
  };

  const currentKeepsakeLine =
    activeKeepsake.lines[lineIndexMap[activeKeepsake.id] ?? 0];

  return (
    <section
      id="trong-rau"
      aria-label="Vườn rau & Chợ quê Xóm Bến Dừa"
      className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 select-none"
    >
      {/* Anchor phụ giữ tương thích hoàn hảo với mọi link & bookmark #vuon-nha-ngoai */}
      <div id="vuon-nha-ngoai" className="sr-only" aria-hidden="true" />

      {/* Floating Bottom Toast Notification */}
      <AnimatePresence>
        {floatingReward && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            role="status"
            className="fixed bottom-8 right-6 z-50 inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#142C2A]/95 border-2 border-[#F5CC72] text-[#FFF6E5] font-bold text-sm shadow-[0_16px_45px_rgba(0,0,0,0.85)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#F5CC72] shrink-0 animate-spin-slow" />
            <span>{floatingReward}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Floating Numbers Effect (Not tied to a single plot) */}
      <div className="pointer-events-none fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {floatingEffects
            .filter((fx) => fx.plotId === undefined)
            .map((fx) => (
              <motion.div
                key={fx.id}
                initial={{ opacity: 0, y: 15, scale: 0.85 }}
                animate={{ opacity: 1, y: -20, scale: 1.05 }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className={`px-4 py-2 rounded-2xl bg-[#193D34]/95 border-2 border-[#F5CC72] shadow-[0_10px_30px_rgba(0,0,0,0.7)] font-black text-sm sm:text-base ${
                  fx.color ?? "text-[#F5CC72]"
                }`}
              >
                {fx.text}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Section Header: Tiêu chuẩn Vibrant Vietnamese Fantasy */}
      <div className="mb-10 sm:mb-12">
        <Wood3DPlaqueTitle
          eyebrow="KHU TRẢI NGHIỆM ĐỜI SỐNG QUÊ NGOẠI"
          title="VƯỜN RAU & CHỢ QUÊ XÓM BẾN DỪA"
          subtitle="Tự tay xới đất, gieo hạt, tưới nước mưa và mang rau tươi ra sạp Cô Sáu Hiền đổi Xu Làng."
          align="center"
          size="xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* =========================================================================
            LEFT 6 COLS: 2.5D SUNNY COZY FARM PLOTS + SẠP CÔ SÁU HIỀN
            ========================================================================= */}
        <div className="lg:col-span-6 carved-wood-box rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle warm sunlight radial sheen overlay */}
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-br from-[#F5CC72]/20 via-[#BEF264]/10 to-transparent blur-2xl pointer-events-none" />

          <div>
            {/* Garden Header & Quick Water-All Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2B806A]/40 border border-[#BEF264]/40 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#BEF264]" />
                </div>
                <div>
                  <h3 className="font-wood text-xl sm:text-2xl text-[#F5CC72] tracking-wide">
                    BA LUỐNG RAU SAU HÈ
                  </h3>
                  <p className="text-[11px] text-[#E6DEC8] flex items-center gap-1">
                    <Sun className="w-3 h-3 text-[#F5CC72]" />
                    <span>Đất phù sa sông Tiền màu mỡ</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleWaterAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-b from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-black text-xs shadow-md border border-sky-300/60 cursor-pointer transition-all active:scale-95"
              >
                <Droplets className="w-3.5 h-3.5 fill-current" />
                <span>Múc Nước Tưới Cả Vườn</span>
              </button>
            </div>

            {/* 2.5D Cozy Garden Bed with 3 Interactive Plots */}
            <div className="relative py-5 px-3 sm:px-4 rounded-2xl bg-gradient-to-b from-[#24150D] via-[#1D0F08] to-[#140A05] border-2 border-[#F5CC72]/30 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {plots.map((plot) => {
                  const isReady = plot.stage === 4;
                  const isWatering = wateringPlots.includes(plot.id);

                  return (
                    <motion.div
                      key={plot.id}
                      whileHover={{ y: -4 }}
                      className={`group relative rounded-2xl p-3 sm:p-3.5 flex flex-col items-center justify-between min-h-[225px] border-2 transition-all overflow-hidden ${
                        isReady
                          ? "bg-gradient-to-b from-[#2A5D3F] via-[#1E4831] to-[#143322] border-[#BEF264] shadow-[0_8px_25px_rgba(103,175,101,0.5)] ring-2 ring-[#BEF264]/40"
                          : "bg-gradient-to-b from-[#3B261A] to-[#21140D] border-[#7C4E2B] hover:border-[#F5CC72]/70 shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
                      }`}
                    >
                      {/* Plot Number & Stage Tag */}
                      <div className="w-full flex items-center justify-between text-[11px] font-bold">
                        <span className="text-[#F5CC72] uppercase tracking-wider">
                          Ô Đất #{plot.id}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isReady
                              ? "bg-[#BEF264] text-[#142C2A]"
                              : "bg-[#140A05] text-[#E6DEC8] border border-[#65533D]"
                          }`}
                        >
                          {STAGE_NAME[plot.stage]}
                        </span>
                      </div>

                      {/* Water Splash Particles Overlay when Watering */}
                      {isWatering && (
                        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.3, 1.7] }}
                            transition={{ duration: 0.9 }}
                            className="absolute w-24 h-24 rounded-full bg-sky-400/25 border-2 border-sky-300/50"
                          />
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ y: -35, opacity: 0, x: (i - 2) * 14 }}
                              animate={{ y: [ -35, 15 ], opacity: [0, 1, 0] }}
                              transition={{ duration: 0.6 + i * 0.08, ease: "easeIn" }}
                              className="absolute text-sky-300"
                            >
                              <Droplets className="w-5 h-5 fill-sky-300/60" />
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Floating Numbers & Badges on the Plot */}
                      <AnimatePresence>
                        {floatingEffects
                          .filter((fx) => fx.plotId === plot.id)
                          .map((fx) => (
                            <motion.div
                              key={fx.id}
                              initial={{ opacity: 0, y: 15, scale: 0.8 }}
                              animate={{ opacity: 1, y: -24, scale: 1.05 }}
                              exit={{ opacity: 0, y: -45, scale: 0.9 }}
                              transition={{ duration: 1.3, ease: "easeOut" }}
                              className={`absolute top-2 z-40 pointer-events-none font-black text-xs px-2.5 py-1 rounded-full bg-[#120A06]/95 border border-[#F5CC72] shadow-[0_6px_16px_rgba(0,0,0,0.85)] whitespace-nowrap ${
                                fx.color ?? "text-[#F5CC72]"
                              }`}
                            >
                              {fx.text}
                            </motion.div>
                          ))}
                      </AnimatePresence>

                      {/* Center Crop Sprite with 2.5D Sunlight Highlights */}
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center my-1">
                        {plot.stage === 0 && (
                          <div className="w-16 h-12 rounded-[50%] bg-[#482B18] border-2 border-[#6E4225] shadow-inner relative flex items-center justify-center">
                            <div className="w-12 h-7 rounded-[50%] bg-[#2E190E] opacity-90" />
                            <Shovel className="w-6 h-6 text-[#F5CC72] absolute drop-shadow-md" />
                          </div>
                        )}

                        {plot.stage === 1 && (
                          <div className="relative flex items-center justify-center">
                            <img
                              src="/game-assets/pixel/muong-seed.png"
                              alt="Hạt giống rau muống"
                              className="w-14 h-14 sm:w-16 sm:h-16 object-contain pixelated drop-shadow-md"
                            />
                          </div>
                        )}

                        {plot.stage === 2 && (
                          <img
                            src="/game-assets/pixel/muong-1.png"
                            alt="Mầm rau muống"
                            className="w-14 h-14 sm:w-16 sm:h-16 object-contain pixelated drop-shadow-md"
                          />
                        )}

                        {plot.stage === 3 && (
                          <img
                            src="/game-assets/pixel/muong-2.png"
                            alt="Rau muống đang lớn"
                            className="w-14 h-14 sm:w-16 sm:h-16 object-contain pixelated drop-shadow-md"
                          />
                        )}

                        {plot.stage === 4 && (
                          <motion.div
                            animate={{ y: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                            className="relative flex items-center justify-center"
                          >
                            <img
                              src="/game-assets/pixel/muong-3.png"
                              alt="Rau muống sẵn sàng thu hoạch"
                              className="w-16 h-16 sm:w-18 sm:h-18 object-contain pixelated drop-shadow-[0_4px_12px_rgba(190,242,100,0.65)]"
                            />
                            <Sparkles className="w-4 h-4 text-[#BEF264] absolute -top-1 -right-1 animate-pulse" />
                          </motion.div>
                        )}
                      </div>

                      {/* 4-Step Progress Indicator (Tiến độ 4 nấc rõ ràng) */}
                      <div className="w-full my-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-[#E6DEC8] mb-1">
                          <span>Tiến độ phát triển</span>
                          <span
                            className={
                              isReady
                                ? "text-[#BEF264] font-extrabold"
                                : "text-[#F5CC72]"
                            }
                          >
                            {plot.stage}/4 nấc
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 w-full bg-[#120A06] p-0.5 rounded-full border border-[#65533D]/60">
                          {[1, 2, 3, 4].map((step) => {
                            const isFilled = plot.stage >= step;
                            return (
                              <div
                                key={step}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  isFilled
                                    ? isReady
                                      ? "bg-gradient-to-r from-[#BEF264] to-[#67AF65] shadow-[0_0_6px_#BEF264]"
                                      : "bg-gradient-to-r from-[#F5CC72] to-[#BEF264]"
                                    : "bg-[#25150C]"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Tactical Action Button (Large Touch Target) */}
                      <button
                        type="button"
                        onClick={() => handlePlotClick(plot.id)}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95 ${
                          isReady
                            ? "bg-gradient-to-b from-[#BEF264] to-[#67AF65] text-[#142C2A] hover:brightness-110 shadow-[0_4px_12px_rgba(103,175,101,0.5)] border border-[#FFF6E5]"
                            : "bg-gradient-to-b from-[#382315] to-[#21130A] text-[#FFF6E5] hover:border-[#F5CC72] border border-[#7C4A28]"
                        }`}
                      >
                        {plot.stage === 0 && (
                          <Shovel className="w-3.5 h-3.5 text-[#F5CC72]" />
                        )}
                        {plot.stage === 1 && (
                          <Sprout className="w-3.5 h-3.5 text-[#BEF264]" />
                        )}
                        {plot.stage === 2 && (
                          <Droplets className="w-3.5 h-3.5 text-sky-300" />
                        )}
                        {plot.stage === 3 && (
                          <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                        )}
                        {plot.stage === 4 && (
                          <Sparkles className="w-3.5 h-3.5 text-[#142C2A]" />
                        )}
                        <span>{STAGE_ACTION[plot.stage]}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =========================================================================
              SẠP NÔNG SẢN CÔ SÁU HIỀN (Giao Dịch Bằng Xu Làng & Nhận Lượt Quay)
              ========================================================================= */}
          <div className="mt-6 bg-[#180E09] border border-[#F5CC72]/30 rounded-2xl p-4 sm:p-5 shadow-inner">
            <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-[#F5CC72]/20">
              <div className="flex items-center gap-2.5">
                <img
                  src="/game-assets/pixel/portrait-vendor-talk.png"
                  alt="Cô Sáu Hiền"
                  className="w-12 h-12 rounded-xl bg-[#0D0704] border-2 border-[#F5CC72]/50 p-0.5 object-contain pixelated shrink-0 shadow-md"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#FFF6E5] flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#F5CC72]" />
                    <span>Sạp Nông Sản Cô Sáu Hiền</span>
                  </h4>
                  <p className="text-[11px] text-[#E6DEC8]">
                    Đơn vị giao dịch:{" "}
                    <strong className="text-[#F5CC72]">Xu Làng</strong> (Tiền trong game)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wider text-[#B2C4BC]">
                  Túi tiền hiện có
                </span>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-black text-[#F5CC72]">
                  <Coins className="w-4 h-4 text-[#F5CC72]" />
                  {wallet.toLocaleString("vi-VN")} Xu Làng
                </span>
              </div>
            </div>

            {/* 2 Sạp Items: Sell Rau Muống & Buy Trứng Gà Ta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Item 1: Bán Rau Muống Thu Hoạch */}
              <div className="bg-[#120B07] border border-[#F5CC72]/25 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/game-assets/pixel/muong-3.png"
                    alt="Rau muống vườn nhà"
                    className="w-11 h-11 object-contain pixelated bg-[#1C110B] rounded-lg p-1 border border-[#F5CC72]/30 shrink-0"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#FFF6E5]">
                      Rau Muống Vườn Nhà
                    </span>
                    <span className="block text-[11px] text-[#F5CC72] font-semibold">
                      Thu mua: 3.800 Xu Làng & +1 Lượt quay
                    </span>
                    <span className="block text-[10px] text-[#B2C4BC]">
                      Đang có trong giỏ:{" "}
                      <strong className="text-[#BEF264]">{harvestedMuong} bó</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSellMuong}
                  disabled={harvestedMuong <= 0}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    harvestedMuong > 0
                      ? "bg-gradient-to-b from-[#2B806A] to-[#1E5C4C] hover:brightness-110 text-[#FFF6E5] border border-[#F5CC72] cursor-pointer shadow-md active:scale-95"
                      : "bg-[#1C120C] text-[#B2C4BC]/50 border border-[#3E291D] cursor-not-allowed"
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>
                    {harvestedMuong > 0
                      ? `Bán ${harvestedMuong} bó (+${(harvestedMuong * 3800).toLocaleString("vi-VN")} Xu)`
                      : "Chưa có rau thu hoạch để bán"}
                  </span>
                </button>
              </div>

              {/* Item 2: Mua Trứng Gà Ta Mới Đẻ */}
              <div className="bg-[#120B07] border border-[#F5CC72]/25 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/game-assets/pixel/eggs.png"
                    alt="Trứng gà ta mới đẻ"
                    className="w-11 h-11 object-contain pixelated bg-[#1C110B] rounded-lg p-1 border border-[#F5CC72]/30 shrink-0"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#FFF6E5]">
                      Trứng Gà Ta Mới Đẻ
                    </span>
                    <span className="block text-[11px] text-[#F5CC72] font-semibold">
                      Giá bán: 1.400 Xu Làng / quả
                    </span>
                    <span className="block text-[10px] text-[#B2C4BC]">
                      Đã mua:{" "}
                      <strong className="text-[#FFF6E5]">{eggsOwned} quả</strong> (+15 Độ No)
                    </span>
                  </div>
                </div>

                {wallet >= 1400 ? (
                  <button
                    type="button"
                    onClick={handleBuyEgg}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#4A3224] to-[#2B1B12] hover:border-[#F5CC72] border border-[#F5CC72]/60 text-[#FFF6E5] text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F5CC72]" />
                    <span>Mua 1 Trứng (1.400 Xu Làng)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2.5 px-3 rounded-xl bg-[#1C120C] border border-rose-500/35 text-rose-300/80 text-[11px] font-bold flex items-center justify-center gap-1 cursor-not-allowed"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Thiếu {(1400 - wallet).toLocaleString("vi-VN")} Xu Làng</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT 6 COLS: NĂM KỶ VẬT TRONG NHÀ NGOẠI (MINDFULNESS SANCTUARY)
            ========================================================================= */}
        <div className="lg:col-span-6 carved-wood-box rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Top Bar: Header & Live Stamina Gauges */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-wood text-xl sm:text-2xl text-[#F5CC72] tracking-wide">
                  NĂM KỶ VẬT TRONG NHÀ NGOẠI
                </h3>
                <p className="text-xs text-[#E6DEC8] mt-0.5">
                  Không gian ký ức bình yên — Chạm vào từng kỷ vật để lắng nghe lời Ngoại dặn
                </p>
              </div>

              <div className="flex items-center gap-2.5 bg-[#0D0704] border border-[#F5CC72]/40 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-inner">
                <span className="flex items-center gap-1 text-[#BEF264]">
                  <Heart className="w-3.5 h-3.5 fill-current" /> No {hunger}%
                </span>
                <span className="text-[#65533D]">|</span>
                <span className="flex items-center gap-1 text-sky-300">
                  <Droplets className="w-3.5 h-3.5 fill-current" /> Mát {thirst}%
                </span>
              </div>
            </div>

            {/* 5 Interactive Keepsake Tab Buttons */}
            <div
              role="tablist"
              aria-label="5 Kỷ vật trong nhà Ngoại"
              className="grid grid-cols-5 gap-2 mb-5"
            >
              {NGOAI_KEEPSAKES.map((item) => {
                const isSelected = activeKeepsake.id === item.id;
                const isVisited = visitedKeepsakes.includes(item.id);
                return (
                  <button
                    key={item.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => handleTouchKeepsake(item)}
                    className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[86px] ${
                      isSelected
                        ? "bg-gradient-to-b from-[#2B806A] to-[#142C2A] border-[#F5CC72] scale-105 shadow-[0_10px_25px_rgba(0,0,0,0.75)] z-10"
                        : isVisited
                        ? "bg-[#22150E] border-[#88603D] hover:border-[#F5CC72]"
                        : "bg-[#140C08] border-[#38251B] opacity-85 hover:opacity-100"
                    }`}
                  >
                    {/* Small Checkmark if Visited */}
                    {isVisited && (
                      <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#2B806A] border border-[#BEF264] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#FFF6E5]" />
                      </div>
                    )}

                    <div className="mb-1.5">{renderKeepsakeIcon(item.iconType)}</div>
                    <span className="text-[10px] font-bold text-[#FFF6E5] text-center leading-tight line-clamp-2">
                      {item.title.replace(" của ngoại", "")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grandma's Voice Card (High-Contrast Warm Cream Parchment) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeKeepsake.id}-${lineIndexMap[activeKeepsake.id]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col justify-between bg-gradient-to-b from-[#FFFBF0] to-[#FFF3D6] text-[#24160E] rounded-2xl p-5 sm:p-6 border-2 border-[#D5A353] shadow-[inset_0_1px_0_#FFFFFF,0_8px_25px_rgba(0,0,0,0.5)] mt-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#7C2D12]">
                  <MapPin className="w-3.5 h-3.5 text-[#A96745]" />
                  <span>{activeKeepsake.location}</span>
                </span>
                <span className="text-[11px] font-bold text-[#1E5C4C] bg-[#2B806A]/15 border border-[#2B806A]/30 px-3 py-1 rounded-full">
                  {activeKeepsake.rewardText}
                </span>
              </div>

              <div className="flex items-center gap-4 my-4">
                <img
                  src="/game-assets/pixel/portrait-grandma-talk.png"
                  alt="Bà Ngoại"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#22150E] border-2 border-[#A96745] p-1 object-contain pixelated shrink-0 shadow-md"
                />
                <p className="font-wood text-lg sm:text-xl leading-snug text-[#24160E]">
                  “{currentKeepsakeLine}”
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#A96745]/30">
                <span className="text-xs font-black text-[#7C2D12]">
                  Lời dặn {(lineIndexMap[activeKeepsake.id] ?? 0) + 1}/5
                </span>
                <button
                  type="button"
                  onClick={() => handleTouchKeepsake(activeKeepsake)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#193D34] hover:bg-[#2B806A] text-[#FFF6E5] font-bold text-xs cursor-pointer transition-colors shadow-sm"
                >
                  <span>Nghe lời dặn tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5CC72]" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
