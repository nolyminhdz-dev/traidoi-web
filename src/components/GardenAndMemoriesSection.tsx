"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Droplets,
  Shovel,
  CheckCircle2,
  Coins,
  CloudRain,
} from "lucide-react";
import { NGOAI_KEEPSAKES, NgoaiKeepsake } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound";
import { AnimatedNpcPortrait } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

type PlotStage = "untilled" | "tilled" | "seeded" | "watered" | "ready";

interface GardenAndMemoriesProps {
  wallet: number;
  setWallet: React.Dispatch<React.SetStateAction<number>>;
  setSpinsLeft: React.Dispatch<React.SetStateAction<number>>;
  hunger: number;
  setHunger: React.Dispatch<React.SetStateAction<number>>;
  thirst: number;
  setThirst: React.Dispatch<React.SetStateAction<number>>;
  weather: WeatherMode;
}

export default function GardenAndMemoriesSection({
  wallet,
  setWallet,
  setSpinsLeft,
  setHunger,
  setThirst,
  weather,
}: GardenAndMemoriesProps) {
  const [plots, setPlots] = useState<PlotStage[]>(["untilled", "tilled", "ready"]);
  const [harvestedMuong, setHarvestedMuong] = useState<number>(2);
  const [chickenEggs, setChickenEggs] = useState<number>(1);
  const [floatingReward, setFloatingReward] = useState<string | null>(null);

  const [activeKeepsake, setActiveKeepsake] = useState<NgoaiKeepsake>(NGOAI_KEEPSAKES[0]);
  const [lineIndexMap, setLineIndexMap] = useState<Record<string, number>>({
    altar: 0,
    hammock: 0,
    hearth: 0,
    water: 0,
    porch: 0,
  });
  const [visitedKeepsakes, setVisitedKeepsakes] = useState<string[]>(["altar"]);

  // Weather synergy: When it rains, any seeded plot automatically gets watered and ripens!
  useEffect(() => {
    if (weather === "rain") {
      setPlots((curr) =>
        curr.map((st) => (st === "seeded" || st === "watered" ? "ready" : st))
      );
    }
  }, [weather]);

  const showPop = (msg: string) => {
    setFloatingReward(msg);
    setTimeout(() => setFloatingReward(null), 1800);
  };

  const handlePlotClick = (idx: number) => {
    const stage = plots[idx];
    const nextPlots = [...plots];

    if (stage === "untilled") {
      soundEngine.playSfx("build", 0.55);
      nextPlots[idx] = "tilled";
      setPlots(nextPlots);
      return;
    }

    if (stage === "tilled") {
      soundEngine.playSfx("plant", 0.6);
      // If raining, rain waters it immediately!
      nextPlots[idx] = weather === "rain" ? "ready" : "seeded";
      setPlots(nextPlots);
      return;
    }

    if (stage === "seeded") {
      soundEngine.playSfx("water", 0.65);
      nextPlots[idx] = "watered";
      setPlots(nextPlots);
      setTimeout(() => {
        setPlots((curr) => {
          const updated = [...curr];
          if (updated[idx] === "watered") updated[idx] = "ready";
          return updated;
        });
      }, 700);
      return;
    }

    if (stage === "ready") {
      soundEngine.playSfx("harvest", 0.7);
      nextPlots[idx] = "untilled";
      setPlots(nextPlots);
      setHarvestedMuong((prev) => prev + 1);
      showPop("+1 Bó Rau Muống Tươi!");
    }
  };

  const handleSellMuong = () => {
    if (harvestedMuong <= 0) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    const revenue = harvestedMuong * 3800;
    soundEngine.playSfx("coins", 0.7);
    setWallet((prev) => prev + revenue);
    setHarvestedMuong(0);
    setSpinsLeft((prev) => prev + 1);
    showPop(`+${revenue.toLocaleString("vi-VN")}đ Nhận Ngay 1 Lượt Quay!`);
  };

  const handleBuyEgg = () => {
    if (wallet < 1400) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    soundEngine.playSfx("coins", 0.6);
    setWallet((prev) => prev - 1400);
    setChickenEggs((prev) => prev + 1);
    setHunger((prev) => Math.min(100, prev + 12));
    showPop("+1 Trứng Gà Ta Cô Sáu!");
  };

  const handleInteractKeepsake = (item: NgoaiKeepsake) => {
    soundEngine.playSfx("interact", 0.55);
    setActiveKeepsake(item);
    setLineIndexMap((prev) => ({
      ...prev,
      [item.id]: ((prev[item.id] ?? 0) + 1) % item.lines.length,
    }));

    if (item.id === "hearth") {
      soundEngine.playSfx("fire-crackle", 0.5);
      setHunger((prev) => Math.min(100, prev + 15));
    } else if (item.id === "water") {
      soundEngine.playSfx("water", 0.5);
      setThirst((prev) => Math.min(100, prev + 15));
    }

    if (!visitedKeepsakes.includes(item.id)) {
      const next = [...visitedKeepsakes, item.id];
      setVisitedKeepsakes(next);
      if (next.length === NGOAI_KEEPSAKES.length) {
        soundEngine.playSfx("success", 0.65);
        setSpinsLeft((prev) => prev + 1);
        showPop("Đủ 5 Kỷ Vật Nhận Ngay 1 Lượt Quay!");
      }
    }
  };

  const currentKeepsakeLine =
    activeKeepsake.lines[lineIndexMap[activeKeepsake.id] ?? 0];

  return (
    <section
      id="vuon-nha-ngoai"
      className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
    >
      {/* Floating Reward Popup */}
      <AnimatePresence>
        {floatingReward && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-2xl bg-[#357350] border-2 border-[#FFD700] text-[#FFF8E6] font-wood text-lg shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          >
            ✨ {floatingReward}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Carved Wood Plaque Header */}
      <div className="mb-12">
        <Wood3DPlaqueTitle
          eyebrow="CHẠM VÀO ĐẤT MẸ LẮNG NGHE YÊU THƯƠNG"
          title="MẢNH VƯỜN ĐỢI BƯỚC VÀ NĂM LỜI NGOẠI DẶN"
          align="center"
          size="xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT 6 COLS: 3D ISOMETRIC GARDEN BED + SẠP CÔ SÁU HIỀN */}
        <div
          className="lg:col-span-6 rounded-[32px] carved-wood-box p-6 flex flex-col justify-between relative overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <BitmapWoodText text="BA LUỐNG RAU SAU HÈ" size="md" align="left" />

            {weather === "rain" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-900/80 border border-sky-400 text-sky-200 text-xs font-black">
                <CloudRain className="w-3.5 h-3.5 animate-bounce" />
                <span>Mưa đang tự tưới cây!</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-lg bg-[#1A100A] border border-[#6B4930] text-xs font-black text-[#86EFAC]">
                Bấm vào ô đất để Cuốc / Gieo / Hái
              </span>
            )}
          </div>

          {/* 3D Tilted Garden Bed */}
          <div
            className="relative rounded-3xl bg-[radial-gradient(circle_at_center,#2B5836_0%,#16301D_100%)] border-4 border-[#513727] p-6 sm:p-8 shadow-inner my-2"
            style={{
              transform: "rotateX(12deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {plots.map((stage, idx) => {
                const actionLabel =
                  stage === "untilled"
                    ? "CUỐC ĐẤT"
                    : stage === "tilled"
                    ? "GIEO HẠT"
                    : stage === "seeded"
                    ? "TƯỚI NƯỚC"
                    : stage === "watered"
                    ? "ĐANG LỚN..."
                    : "THU HOẠCH!";

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handlePlotClick(idx)}
                    className={`group relative aspect-square rounded-2xl border-4 border-b-[10px] flex flex-col items-center justify-center p-3 cursor-pointer transition-all shadow-[0_14px_26px_rgba(0,0,0,0.8)] ${
                      stage === "untilled"
                        ? "bg-[#5C4028] border-[#38251B]"
                        : stage === "tilled"
                        ? "bg-[#3F2717] border-[#88603D]"
                        : stage === "seeded"
                        ? "bg-[#3A2314] border-[#C99A35]"
                        : stage === "watered"
                        ? "bg-[#2A1B12] border-[#38BDF8]"
                        : "bg-[#24381F] border-[#4ADE80] shadow-[0_0_35px_rgba(74,222,128,0.55)]"
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      {stage === "untilled" && (
                        <Shovel className="w-9 h-9 text-[#D0A477] group-hover:rotate-12 transition-transform" />
                      )}
                      {stage === "tilled" && (
                        <img
                          src="/game-assets/pixel/muong-seed.png"
                          alt=""
                          className="w-12 h-12 object-contain pixelated group-hover:scale-110 transition-transform"
                        />
                      )}
                      {stage === "seeded" && (
                        <img
                          src="/game-assets/pixel/muong-2.png"
                          alt=""
                          className="w-14 h-14 object-contain pixelated animate-pulse"
                        />
                      )}
                      {stage === "watered" && (
                        <Droplets className="w-10 h-10 text-sky-400 animate-bounce" />
                      )}
                      {stage === "ready" && (
                        <motion.img
                          animate={{ scale: [1, 1.12, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          src="/game-assets/pixel/muong-3.png"
                          alt=""
                          className="w-18 h-18 object-contain pixelated drop-shadow-[0_6px_10px_rgba(0,0,0,0.8)]"
                        />
                      )}
                    </div>

                    <span
                      className={`mt-2 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-black tracking-wider ${
                        stage === "ready"
                          ? "bg-[#4ADE80] text-[#0F291A]"
                          : "bg-black/75 text-[#FFF8E6]"
                      }`}
                    >
                      {actionLabel}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sleek Quầy Cô Sáu Hiền Dock — Zero Middle Dots */}
          <div className="mt-4 rounded-2xl bg-[#F8EDCE] text-[#2B251C] border-3 border-[#513727] p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <AnimatedNpcPortrait
                baseSrc="/game-assets/pixel/portrait-vendor.png"
                talkSrc="/game-assets/pixel/portrait-vendor-talk.png"
                size={46}
                alt="Cô Sáu Hiền"
              />
              <div>
                <div className="font-wood text-lg text-[#38251B] leading-tight">
                  Sạp Cô Sáu Hiền
                </div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#357350] mt-0.5">
                  <span className="px-2 py-0.5 rounded bg-[#357350]/15">
                    Rau: {harvestedMuong} bó
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-900/15 text-[#7C2D12]">
                    Trứng: {chickenEggs} quả
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBuyEgg}
                className="px-3 py-2 rounded-xl bg-[#38251B] hover:bg-[#513727] text-[#F5DC8B] text-xs font-black flex items-center gap-1.5 cursor-pointer"
              >
                <img src="/game-assets/pixel/eggs.png" alt="" className="w-4 h-4 pixelated" />
                <span>Mua Trứng (1.400đ)</span>
              </button>

              <button
                onClick={handleSellMuong}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all ${
                  harvestedMuong > 0
                    ? "bg-[#357350] hover:bg-[#285943] text-white shadow-[0_4px_0_#173C2D] animate-pulse"
                    : "bg-[#DBC093] text-[#65533D]"
                }`}
              >
                <Coins className="w-4 h-4 text-[#FFD700]" />
                <span>Bán Rau (+{(harvestedMuong * 3800).toLocaleString("vi-VN")}đ)</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT 6 COLS: 5 TACTILE MEMORY SHRINES + GRANDMA'S VOICE STAGE */}
        <div className="lg:col-span-6 rounded-[32px] carved-wood-box p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <BitmapWoodText text="NĂM KỶ VẬT NGOẠI DẶN" size="md" align="left" />
              <span className="px-3 py-1 rounded-lg bg-[#1A100A] border border-[#FFD700]/50 text-xs font-black text-[#FFD700]">
                Đã chạm {visitedKeepsakes.length}/5 (+1 Lượt Quay)
              </span>
            </div>

            {/* 5 Visual Icon Pedestals */}
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3 mb-6">
              {NGOAI_KEEPSAKES.map((item) => {
                const active = activeKeepsake.id === item.id;
                const visited = visitedKeepsakes.includes(item.id);
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInteractKeepsake(item)}
                    className={`relative rounded-2xl p-3 border-2 border-b-[6px] flex flex-col items-center justify-center text-center cursor-pointer transition-all aspect-square ${
                      active
                        ? "bg-[#F8EDCE] text-[#2B251C] border-[#FFD700] shadow-[0_0_25px_rgba(255,215,0,0.45)]"
                        : "bg-[#1A100A]/90 text-[#FFF8E6] border-[#513727] hover:border-[#AC7850]"
                    }`}
                  >
                    {visited && (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 absolute top-1.5 right-1.5 ${
                          active ? "text-[#357350]" : "text-emerald-400"
                        }`}
                      />
                    )}
                    <span className="text-2xl sm:text-3xl mb-1">{item.icon}</span>
                    <span className="text-[10px] sm:text-xs font-black leading-tight line-clamp-2">
                      {item.title.replace(" của ngoại", "")}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Centerpiece Emotional Voice Scroll with Seal Ornament */}
          <div
            onClick={() => handleInteractKeepsake(activeKeepsake)}
            className="relative flex-1 rounded-3xl bg-[#FFF8E6] text-[#2B251C] border-4 border-[#AC7850] p-6 flex flex-col justify-between cursor-pointer hover:border-[#FFD700] transition-colors shadow-inner"
          >
            <img
              src="/game-assets/ornaments/decor/paper-seal.png"
              alt=""
              className="w-8 h-10 object-contain pixelated absolute top-3 right-3 opacity-85 pointer-events-none"
            />

            <div className="flex items-center justify-between gap-3 pr-8">
              <div className="flex items-center gap-3">
                <AnimatedNpcPortrait
                  baseSrc="/game-assets/pixel/portrait-grandma.png"
                  talkSrc="/game-assets/pixel/portrait-grandma-talk.png"
                  blinkSrc="/game-assets/pixel/portrait-grandma-blink.png"
                  isTalking={true}
                  size={60}
                  alt="Bà Ngoại"
                />
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#8A332B] block">
                    LỜI NGOẠI DẶN — {activeKeepsake.title.toUpperCase()}
                  </span>
                  <span className="text-xs font-extrabold text-[#357350]">
                    {activeKeepsake.rewardText}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`${activeKeepsake.id}-${lineIndexMap[activeKeepsake.id]}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-wood text-xl sm:text-2xl md:text-3xl text-[#22140C] leading-snug my-6"
              >
                “{currentKeepsakeLine}”
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center justify-between text-xs font-extrabold text-[#65533D] pt-3 border-t border-[#DBC093]">
              <span>📍 {activeKeepsake.location}</span>
              <span className="text-[#8A332B]">
                Bấm nghe câu tiếp ({(lineIndexMap[activeKeepsake.id] ?? 0) + 1}/5) →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
