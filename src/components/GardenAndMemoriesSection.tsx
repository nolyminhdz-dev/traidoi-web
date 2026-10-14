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

const STAGE_SPRITES: Record<PlotStage, string> = {
  0: "/game-assets/pixel/soil-dry.png",
  1: "/game-assets/pixel/soil-tilled.png",
  2: "/game-assets/pixel/muong-1.png",
  3: "/game-assets/pixel/muong-2.png",
  4: "/game-assets/pixel/muong-3.png",
};

const STAGE_ACTION: Record<PlotStage, string> = {
  0: "Xới Đất",
  1: "Gieo Hạt",
  2: "Tưới Nước",
  3: "Tưới Đợt 2",
  4: "Thu Hoạch",
};

function renderKeepsakeIcon(type: NgoaiKeepsake["iconType"]) {
  switch (type) {
    case "flame":
      return <Flame className="w-5 h-5 text-[#F2D39B]" />;
    case "moon":
      return <Moon className="w-5 h-5 text-sky-300" />;
    case "hearth":
      return <UtensilsCrossed className="w-5 h-5 text-orange-400" />;
    case "droplets":
      return <Droplets className="w-5 h-5 text-cyan-300" />;
    case "radio":
      return <Radio className="w-5 h-5 text-emerald-300" />;
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
  const [floatingReward, setFloatingReward] = useState<string | null>(null);

  const showPop = (msg: string) => {
    setFloatingReward(msg);
    setTimeout(() => setFloatingReward(null), 2600);
  };

  // Rain Weather Synergy: Automatically waters planted plots (stage 2 -> 4)
  useEffect(() => {
    if (weather === "rain") {
      setPlots((prev) =>
        prev.map((p) =>
          p.stage === 2 || p.stage === 3 ? { ...p, stage: 4 } : p
        )
      );
      showPop("Mưa rào miền Tây tự động tưới xanh cả 3 luống rau!");
    }
  }, [weather]);

  const handlePlotClick = (plotId: number) => {
    setPlots((prev) =>
      prev.map((p) => {
        if (p.id !== plotId) return p;

        if (p.stage === 0) {
          soundEngine.playSfx("hoe", 0.55);
          return { ...p, stage: 1 };
        }
        if (p.stage === 1) {
          soundEngine.playSfx("seed", 0.55);
          return { ...p, stage: 2 };
        }
        if (p.stage === 2) {
          soundEngine.playSfx("water", 0.55);
          return { ...p, stage: 3 };
        }
        if (p.stage === 3) {
          soundEngine.playSfx("water", 0.55);
          return { ...p, stage: 4 };
        }
        soundEngine.playSfx("harvest", 0.65);
        setHarvestedMuong((c) => c + 1);
        showPop("+1 Bó Rau Muống Tươi");
        return { ...p, stage: 0 };
      })
    );
  };

  const handleWaterAll = () => {
    soundEngine.playSfx("water", 0.65);
    setPlots((prev) =>
      prev.map((p) => {
        if (p.stage === 2) return { ...p, stage: 3 };
        if (p.stage === 3) return { ...p, stage: 4 };
        return p;
      })
    );
    showPop("Đã múc nước lu tưới mát cả 3 luống rau!");
  };

  const handleSellMuong = () => {
    if (harvestedMuong <= 0) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    const revenue = harvestedMuong * 3800;
    soundEngine.playSfx("coins", 0.65);
    setWallet((prev) => prev + revenue);
    setSpinsLeft((prev) => prev + 1);
    setHarvestedMuong(0);
    showPop(`Đã bán rau: +${revenue.toLocaleString("vi-VN")} Xu Làng & +1 Lượt Quay`);
  };

  const handleBuyEgg = () => {
    if (wallet < 1400) {
      soundEngine.playSfx("denied", 0.5);
      return;
    }
    soundEngine.playSfx("coins", 0.55);
    setWallet((prev) => prev - 1400);
    setEggsOwned((prev) => prev + 1);
    setHunger((prev) => Math.min(100, prev + 15));
    showPop("Đã mua 1 Trứng Gà Ta (+15 Độ No)");
  };

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
    } else if (item.id === "water") {
      soundEngine.playSfx("water", 0.5);
      setThirst((prev) => Math.min(100, prev + 20));
    }

    if (!visitedKeepsakes.includes(item.id)) {
      setVisitedKeepsakes((prev) => [...prev, item.id]);
    }
  };

  const currentKeepsakeLine =
    activeKeepsake.lines[lineIndexMap[activeKeepsake.id] ?? 0];

  return (
    <section
      id="vuon-nha-ngoai"
      aria-label="Khu trải nghiệm Vườn Nhà Ngoại, Sạp Cô Sáu Hiền và 5 Kỷ Vật"
      className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 select-none"
    >
      {/* Floating Feedback Toast */}
      <AnimatePresence>
        {floatingReward && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            role="status"
            className="fixed bottom-8 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#142C2A] border-2 border-[#F2D39B] text-[#F7F3E8] font-bold text-sm shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          >
            <Sparkles className="w-4 h-4 text-[#F2D39B] shrink-0" />
            <span>{floatingReward}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="mb-10">
        <Wood3DPlaqueTitle
          eyebrow="KHU TRẢI NGHIỆM ĐỜI SỐNG QUÊ NGOẠI"
          title="VƯỜN RAU SẠP CHỢ VÀ KỶ VẬT NHÀ XƯA"
          subtitle="Thử nghiệm trực tiếp vòng lặp canh tác rau muống, giao dịch bằng Xu Làng tại Sạp Cô Sáu Hiền và lắng nghe những lời dặn dò ấm áp bên hiên nhà."
          align="center"
          size="xl"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT 6 COLS: FARMING PLOTS + CÔ SÁU HIỀN SHOP */}
        <div className="lg:col-span-6 carved-wood-box rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5">
                <Sprout className="w-5 h-5 text-[#BEF264]" />
                <h3 className="font-wood text-xl sm:text-2xl text-[#F2D39B]">
                  BA LUỐNG RAU SAU HÈ
                </h3>
              </div>

              <button
                type="button"
                onClick={handleWaterAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm cursor-pointer transition-colors"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Múc Nước Tưới Cả Vườn</span>
              </button>
            </div>

            {/* 3 Interactive Farm Plots */}
            <div className="relative py-6 px-3 rounded-2xl bg-gradient-to-b from-[#2A1B12] to-[#170E09] border border-[#F2D39B]/35 shadow-inner">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {plots.map((plot) => {
                  const isReady = plot.stage === 4;
                  return (
                    <motion.button
                      key={plot.id}
                      type="button"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handlePlotClick(plot.id)}
                      className={`group relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between min-h-[168px] border-2 transition-all cursor-pointer ${
                        isReady
                          ? "bg-gradient-to-b from-[#357350] to-[#1E4631] border-[#F2D39B] shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                          : "bg-gradient-to-b from-[#3B261A] to-[#23150E] border-[#88603D] hover:border-[#F2D39B]"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F2D39B]">
                        Ô Đất #{plot.id}
                      </span>

                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center my-1">
                        <img
                          src={STAGE_SPRITES[plot.stage]}
                          alt={`Ô đất ${plot.id} - ${STAGE_ACTION[plot.stage]}`}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-contain pixelated"
                        />
                      </div>

                      <span
                        className={`w-full py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center ${
                          isReady
                            ? "bg-[#F2D39B] text-[#142C2A]"
                            : "bg-[#120A06] text-[#F7F3E8] border border-[#65533D]"
                        }`}
                      >
                        {STAGE_ACTION[plot.stage]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SẠP RAU CỦ CÔ SÁU HIỀN (Standardized Shop UI with Xu Làng & Clear States) */}
          <div className="mt-6 bg-[#1A100B] border border-[#F2D39B]/35 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#F2D39B]/15">
              <div className="flex items-center gap-2.5">
                <img
                  src="/game-assets/pixel/portrait-vendor-talk.png"
                  alt="Cô Sáu Hiền"
                  className="w-11 h-11 rounded-xl bg-[#0D0704] border border-[#F2D39B]/40 p-0.5 object-contain pixelated shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#F7F3E8] flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F2D39B]" />
                    <span>Sạp Nông Sản Cô Sáu Hiền</span>
                  </h4>
                  <p className="text-[11px] text-[#D9D2C5]">
                    Đơn vị giao dịch: <strong className="text-[#F2D39B]">Xu Làng</strong> (Tiền trong game)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wider text-[#9BA8A3]">
                  Số dư hiện có
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#F2D39B]">
                  <Coins className="w-3.5 h-3.5" />
                  {wallet.toLocaleString("vi-VN")} Xu Làng
                </span>
              </div>
            </div>

            {/* 2 Shop Items with Price, Quantity & Disabled States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Item 1: Sell Harvested Rau Muống */}
              <div className="bg-[#120B07] border border-[#F2D39B]/20 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/game-assets/pixel/muong-3.png"
                    alt="Rau muống vườn nhà"
                    className="w-10 h-10 object-contain pixelated bg-[#1C110B] rounded-lg p-1 border border-[#F2D39B]/25 shrink-0"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#F7F3E8]">
                      Rau Muống Vườn Nhà
                    </span>
                    <span className="block text-[11px] text-[#F2D39B] font-semibold">
                      Giá thu mua: 3.800 Xu Làng / bó
                    </span>
                    <span className="block text-[10px] text-[#9BA8A3]">
                      Đang có trong giỏ: <strong className="text-[#F7F3E8]">{harvestedMuong} bó</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSellMuong}
                  disabled={harvestedMuong <= 0}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-extrabold transition-all ${
                    harvestedMuong > 0
                      ? "bg-[#2B6657] hover:bg-[#357A68] text-[#F7F3E8] border border-[#F2D39B] cursor-pointer"
                      : "bg-[#1C120C] text-[#9BA8A3]/60 border border-[#3E291D] cursor-not-allowed"
                  }`}
                >
                  {harvestedMuong > 0
                    ? `Bán ${harvestedMuong} bó (+${(harvestedMuong * 3800).toLocaleString("vi-VN")} Xu Làng)`
                    : "Chưa có rau thu hoạch để bán"}
                </button>
              </div>

              {/* Item 2: Buy Trứng Gà Ta */}
              <div className="bg-[#120B07] border border-[#F2D39B]/20 rounded-xl p-3 flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/game-assets/pixel/eggs.png"
                    alt="Trứng gà ta mới đẻ"
                    className="w-10 h-10 object-contain pixelated bg-[#1C110B] rounded-lg p-1 border border-[#F2D39B]/25 shrink-0"
                  />
                  <div>
                    <span className="block text-xs font-bold text-[#F7F3E8]">
                      Trứng Gà Ta Mới Đẻ
                    </span>
                    <span className="block text-[11px] text-[#F2D39B] font-semibold">
                      Giá bán: 1.400 Xu Làng / quả
                    </span>
                    <span className="block text-[10px] text-[#9BA8A3]">
                      Đã mua: <strong className="text-[#F7F3E8]">{eggsOwned} quả</strong> (+15 Độ No)
                    </span>
                  </div>
                </div>

                {wallet >= 1400 ? (
                  <button
                    type="button"
                    onClick={handleBuyEgg}
                    className="w-full py-2 px-3 rounded-xl bg-[#38251B] hover:bg-[#4D3325] border border-[#F2D39B]/60 text-[#F7F3E8] text-xs font-extrabold transition-all cursor-pointer"
                  >
                    Mua 1 Trứng (1.400 Xu Làng)
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-[#1C120C] border border-rose-500/30 text-rose-300/80 text-[11px] font-bold flex items-center justify-center gap-1 cursor-not-allowed"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Thiếu {(1400 - wallet).toLocaleString("vi-VN")} Xu Làng</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 6 COLS: 5 KEEPSAKES OF GRANDMA (MINDFULNESS SANCTUARY) */}
        <div className="lg:col-span-6 carved-wood-box rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Top Bar: Keepsakes Header & Stamina Gauges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="font-wood text-xl sm:text-2xl text-[#F2D39B]">
                NĂM KỶ VẬT TRONG NHÀ NGOẠI
              </h3>
              <p className="text-xs text-[#D9D2C5] mt-0.5">
                Không gian ký ức bình yên — Chạm vào từng kỷ vật để lắng nghe lời Ngoại dặn
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#0D0704] border border-[#F2D39B]/30 px-3 py-1.5 rounded-xl text-xs font-bold">
              <span className="flex items-center gap-1 text-emerald-300">
                <Heart className="w-3.5 h-3.5 fill-current" /> No {hunger}%
              </span>
              <span className="text-[#9BA8A3]">|</span>
              <span className="flex items-center gap-1 text-sky-300">
                <Droplets className="w-3.5 h-3.5 fill-current" /> Mát {thirst}%
              </span>
            </div>
          </div>

          {/* 5 Interactive Keepsake Buttons with SVG Icons */}
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
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[82px] ${
                    isSelected
                      ? "bg-gradient-to-b from-[#2B6657] to-[#142C2A] border-[#F2D39B] scale-105 shadow-[0_10px_25px_rgba(0,0,0,0.75)]"
                      : isVisited
                      ? "bg-[#22150E] border-[#88603D] hover:border-[#F2D39B]"
                      : "bg-[#140C08] border-[#38251B] opacity-85 hover:opacity-100"
                  }`}
                >
                  <div className="mb-1.5">{renderKeepsakeIcon(item.iconType)}</div>
                  <span className="text-[10px] font-bold text-[#F7F3E8] text-center leading-tight line-clamp-2">
                    {item.title.replace(" của ngoại", "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grandma's Voice Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeKeepsake.id}-${lineIndexMap[activeKeepsake.id]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col justify-between bg-[#FFF8E6] text-[#1C110B] rounded-2xl p-5 sm:p-6 border-2 border-[#A96745] shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#7C2D12]">
                  <MapPin className="w-3.5 h-3.5 text-[#A96745]" />
                  <span>{activeKeepsake.location}</span>
                </span>
                <span className="text-[11px] font-bold text-[#2B6657] bg-[#2B6657]/12 px-2.5 py-0.5 rounded-full">
                  {activeKeepsake.rewardText}
                </span>
              </div>

              <div className="flex items-center gap-4 my-4">
                <img
                  src="/game-assets/pixel/portrait-grandma-talk.png"
                  alt="Bà Ngoại"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#22150E] border-2 border-[#A96745] p-1 object-contain pixelated shrink-0 shadow-md"
                />
                <p className="font-wood text-lg sm:text-xl leading-snug text-[#1C110B]">
                  “{currentKeepsakeLine}”
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#A96745]/25">
                <span className="text-xs font-bold text-[#7C2D12]">
                  Lời dặn {(lineIndexMap[activeKeepsake.id] ?? 0) + 1}/5
                </span>
                <button
                  type="button"
                  onClick={() => handleTouchKeepsake(activeKeepsake)}
                  className="px-4 py-2 rounded-xl bg-[#142C2A] hover:bg-[#2B6657] text-[#F7F3E8] font-bold text-xs cursor-pointer transition-colors"
                >
                  Nghe lời dặn tiếp theo →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
