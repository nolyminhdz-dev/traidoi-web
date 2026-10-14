"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Fish, Gem, Car } from "lucide-react";
import { WORLD_REGIONS } from "@/lib/game-data";
import { soundEngine } from "@/lib/sound";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";
import BitmapWoodText from "./BitmapWoodText";

interface WorldAtlasSectionProps {
  weather: WeatherMode;
}

const FISH_COLLECTION = [
  { name: "Cá Hô Sông Tiền", rarity: "THẦN THOẠI", weight: "48.5 kg", price: "250.000đ", icon: "/game-assets/fish/ca-ho.png" },
  { name: "Koi Hoàng Kim", rarity: "CỰC PHẨM", weight: "9.2 kg", price: "180.000đ", icon: "/game-assets/koi/koi-gold.png" },
  { name: "Koi Tam Sắc", rarity: "CỰC PHẨM", weight: "8.4 kg", price: "150.000đ", icon: "/game-assets/koi/koi-tricolor.png" },
  { name: "Cá Chép Vàng", rarity: "QUÝ HIẾM", weight: "5.8 kg", price: "65.000đ", icon: "/game-assets/fish/ca-chep.png" },
  { name: "Cá Bống Tượng", rarity: "QUÝ HIẾM", weight: "3.4 kg", price: "48.000đ", icon: "/game-assets/fish/ca-bong-tuong.png" },
  { name: "Cá Tai Tượng", rarity: "ĐẶC SẢN", weight: "4.2 kg", price: "35.000đ", icon: "/game-assets/fish/ca-tai-tuong.png" },
  { name: "Cá Hè Vàng", rarity: "ĐẶC SẢN", weight: "2.1 kg", price: "28.000đ", icon: "/game-assets/fish/ca-he-vang.png" },
  { name: "Lươn Đồng Quê", rarity: "DÂN DÃ", weight: "1.4 kg", price: "22.000đ", icon: "/game-assets/fish/luon-dong.png" },
];

const MINING_GEMS = [
  { name: "Kim Cương Đại", depth: "Tầng 500m", value: "500.000đ", icon: "/game-assets/mining/giant-diamond.png" },
  { name: "Ngọc Lục Bảo", depth: "Tầng 380m", value: "210.000đ", icon: "/game-assets/mining/emerald.png" },
  { name: "Hồng Ngọc Đỏ", depth: "Tầng 320m", value: "185.000đ", icon: "/game-assets/mining/ruby.png" },
  { name: "Bạch Kim Khối", depth: "Tầng 260m", value: "120.000đ", icon: "/game-assets/mining/platinum.png" },
  { name: "Vàng Ròng 9999", depth: "Tầng 180m", value: "95.000đ", icon: "/game-assets/mining/gold.png" },
  { name: "Bạc Nguyên Chất", depth: "Tầng 120m", value: "45.000đ", icon: "/game-assets/mining/silver.png" },
  { name: "Đồng Đỏ Mỏ", depth: "Tầng 60m", value: "20.000đ", icon: "/game-assets/mining/copper.png" },
  { name: "Than Tinh Chế", depth: "Tầng 30m", value: "12.000đ", icon: "/game-assets/mining/refined-coal.png" },
];

const GARAGE_AND_PETS = [
  { name: "Ferrari SF90 XX", category: "SIÊU XE ĐẶC QUYỀN", speed: "320 km/h", icon: "/game-assets/pixel/body.png" },
  { name: "Toyota Supra MK4", category: "ĐỘ SÁU LỘC", speed: "285 km/h", icon: "/game-assets/vehicles/supra-icon.png" },
  { name: "Xe Tải Rồng Vàng", category: "CHỞ QUẶNG", speed: "Hạng Nặng", icon: "/game-assets/vehicles/dragon-truck-icon.png" },
  { name: "VinFast VF3 Độ", category: "XE PHỐ", speed: "Linh Hoạt", icon: "/game-assets/pixel/vf3-92x92.png" },
  { name: "Trâu Làng Bến Dừa", category: "BẠN NHÀ NÔNG", speed: "Cày Ruộng", icon: "/game-assets/animals/buffalo.png" },
  { name: "Cậu Vàng Giữ Nhà", category: "THÚ CƯNG", speed: "Trung Thành", icon: "/game-assets/animals/dog.png" },
  { name: "Mèo Mướp Bếp Củi", category: "THÚ CƯNG", speed: "Bắt Chuột", icon: "/game-assets/animals/cat.png" },
  { name: "Gà Trống Gáy Sớm", category: "VẬT NUÔI", speed: "Báo Thức", icon: "/game-assets/animals/rooster.png" },
];

const REGION_TROPHIES: Record<string, { icon: string; label: string; cleanBadge: string; cleanWeather: string; npcPortrait: string; npcQuote: string }> = {
  "ben-dua": {
    icon: "/game-assets/fish/ca-ho.png",
    label: "Cá Hô Sông Tiền",
    cleanBadge: "MIỀN TÂY QUÊ NGOẠI",
    cleanWeather: "Nắng Hạ Gió Sông Mát Rượi",
    npcPortrait: "/game-assets/pixel/portrait-tho-dia-talk.png",
    npcQuote: "“Sông Bến Dừa chiều nay cá quẫy đặc bến luôn con!”",
  },
  "hoi-an": {
    icon: "/game-assets/koi/koi-gold.png",
    label: "Koi Hoàng Kim",
    cleanBadge: "DI SẢN MIỀN TRUNG",
    cleanWeather: "Hoàng Hôn Phố Cổ Lên Đèn",
    npcPortrait: "/game-assets/pixel/portrait-vendor-talk.png",
    npcQuote: "“Đêm rằm phố cổ thả đèn hoa đăng nhớ ghé tiệm cô nghen!”",
  },
  "ha-noi": {
    icon: "/game-assets/vehicles/supra-icon.png",
    label: "Supra Phố Cổ",
    cleanBadge: "THỦ ĐÔ PHỒN HOA",
    cleanWeather: "Tiết Thu Se Lạnh Đua Xe Đêm",
    npcPortrait: "/game-assets/pixel/portrait-npc-nam-talk.png",
    npcQuote: "“Từ bến xe quê ngoại bắt chuyến xe đò ra tận nghìn năm văn hiến.”",
  },
  "quang-ninh": {
    icon: "/game-assets/mining/giant-diamond.png",
    label: "Kim Cương Đại",
    cleanBadge: "TỔ ĐỘI VÙNG MỎ",
    cleanWeather: "Lò Tinh Chế Rực Lửa Đêm Ngày",
    npcPortrait: "/game-assets/pixel/portrait-npc-dung-talk.png",
    npcQuote: "“Xuống tầng hầm sâu nhất mới đào trúng mạch Kim Cương Đỏ!”",
  },
  "tay-ninh": {
    icon: "/game-assets/ornaments/decor/flower-gold.png",
    label: "Sen Vàng Núi Chúa",
    cleanBadge: "ĐỈNH THIÊNG NAM BỘ",
    cleanWeather: "Mây Trắng Phủ Đỉnh 986m",
    npcPortrait: "/game-assets/pixel/portrait-grandma-talk.png",
    npcQuote: "“Lên đỉnh núi thắp nén nhang cầu bình an cho cả nhà nghen con.”",
  },
};

export default function WorldAtlasSection({ weather }: WorldAtlasSectionProps) {
  const [activeRegionId, setActiveRegionId] = useState<string>(WORLD_REGIONS[0].id);
  const [activeVaultTab, setActiveVaultTab] = useState<"fish" | "mining" | "garage">("fish");
  const [selectedLootIdx, setSelectedLootIdx] = useState<number>(0);

  const vaultItems =
    activeVaultTab === "fish"
      ? FISH_COLLECTION.map((f) => ({
          name: f.name,
          badge: f.rarity,
          sub: f.weight,
          val: f.price,
          icon: f.icon,
          color: "#38bdf8",
        }))
      : activeVaultTab === "mining"
      ? MINING_GEMS.map((m) => ({
          name: m.name,
          badge: m.depth,
          sub: "Khoáng sản quý",
          val: m.value,
          icon: m.icon,
          color: "#f43f5e",
        }))
      : GARAGE_AND_PETS.map((g) => ({
          name: g.name,
          badge: g.category,
          sub: g.speed,
          val: "Sở hữu",
          icon: g.icon,
          color: "#f59e0b",
        }));

  const currentLoot = vaultItems[selectedLootIdx] || vaultItems[0];

  return (
    <section id="world" className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* 3D CHISELED GOLD SECTION HEADER — ZERO MIDDLE DOTS */}
      <div className="mb-12">
        <Wood3DPlaqueTitle
          eyebrow="HÀNH TRÌNH ĐẠI VIỆT 3D"
          title="BẢN ĐỒ NĂM CÕI KHAI MỞ VẠN BÁU VẬT"
          align="center"
          size="xl"
        />
      </div>

      {/* =====================================================================
          1. ZERO-TEXT 3D EXPANDING POSTCARD ACCORDION (5 REGIONS)
      ====================================================================== */}
      <div
        className="flex flex-col lg:flex-row gap-3.5 min-h-[420px] mb-16"
        style={{ perspective: "1400px" }}
      >
        {WORLD_REGIONS.map((region) => {
          const isExpanded = region.id === activeRegionId;
          const meta = REGION_TROPHIES[region.id] || REGION_TROPHIES["ben-dua"];

          return (
            <motion.div
              key={region.id}
              layout
              onClick={() => {
                soundEngine.play("interact");
                setActiveRegionId(region.id);
              }}
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                flex: isExpanded ? 3.6 : 1,
                rotateY: isExpanded ? 0 : -6,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border-3 transition-colors ${
                isExpanded
                  ? "border-[#FFD700] shadow-[0_8px_0_#3D1906,0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.3)]"
                  : "border-[#88603D] hover:border-[#FFD700] opacity-85 hover:opacity-100 shadow-xl"
              } min-h-[140px] lg:min-h-[430px]`}
            >
              {/* Region Background Artwork */}
              <img
                src={region.image}
                alt={region.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  isExpanded ? "scale-105" : "scale-100 group-hover:scale-110"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25" />

              {/* Top Badge — Zero Middle Dots */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-lg bg-[#160D08]/90 backdrop-blur-md border border-[#B88244] text-[11px] font-black uppercase tracking-wider text-[#FFE89E]">
                  {meta.cleanBadge}
                </span>
                {isExpanded && (
                  <span className="px-3 py-1 rounded-lg bg-amber-500/25 border border-amber-300/60 text-[11px] font-black text-amber-200">
                    {meta.cleanWeather}
                  </span>
                )}
              </div>

              {/* Collapsed Vertical/Compact Title vs Expanded 3D Diorama HUD */}
              <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col justify-end">
                <BitmapWoodText
                  text={region.name.replace(" · ", " ")}
                  size={isExpanded ? "md" : "sm"}
                  align="left"
                />

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-amber-400/30"
                    >
                      {/* Speech Bubble NPC */}
                      <div className="flex items-center gap-3 bg-[#160D08]/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border-2 border-[#B88244] max-w-md">
                        <img
                          src={meta.npcPortrait}
                          alt=""
                          className="w-11 h-11 rounded-xl object-contain pixelated bg-amber-500/15 border border-amber-400/30 p-1 shrink-0"
                        />
                        <p className="text-xs sm:text-sm text-amber-100 font-semibold italic leading-snug">
                          {meta.npcQuote}
                        </p>
                      </div>

                      {/* Pop-Out 3D Regional Trophy Badge */}
                      <div className="flex items-center gap-2.5 bg-[#160D08]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-[#FFD700] shrink-0">
                        <img
                          src={meta.icon}
                          alt={meta.label}
                          className="w-10 h-10 object-contain pixelated drop-shadow-[0_6px_10px_rgba(0,0,0,0.85)]"
                        />
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-[#FFD700]">
                            BÁU VẬT VÙNG
                          </div>
                          <div className="text-xs font-black text-white">{meta.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================================
          2. 3D FLOATING LOOT PEDESTAL (ĐÀI BÁU VẬT LƠ LỬNG 3D)
      ====================================================================== */}
      <div className="relative rounded-3xl p-6 sm:p-8 carved-wood-box overflow-hidden">
        {/* 4 Carved Wood Corners */}
        <img
          src="/game-assets/ornaments/decor/corner-wood-tl.png"
          alt=""
          className="w-12 h-12 absolute top-2 left-2 pointer-events-none pixelated"
        />
        <img
          src="/game-assets/ornaments/decor/corner-wood-tr.png"
          alt=""
          className="w-12 h-12 absolute top-2 right-2 pointer-events-none pixelated"
        />
        <img
          src="/game-assets/ornaments/decor/corner-wood-bl.png"
          alt=""
          className="w-12 h-12 absolute bottom-2 left-2 pointer-events-none pixelated"
        />
        <img
          src="/game-assets/ornaments/decor/corner-wood-br.png"
          alt=""
          className="w-12 h-12 absolute bottom-2 right-2 pointer-events-none pixelated"
        />

        {/* Category Switcher Pills */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-[#FFD700]" />
            <BitmapWoodText text="ĐÀI BÁU VẬT LƠ LỬNG" size="md" align="left" />
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#0D0704] p-1.5 rounded-2xl border-2 border-[#88603D]">
            {[
              { id: "fish", label: "Thủy Sản Sông Quê", icon: Fish },
              { id: "mining", label: "Khoáng Sản Hầm Mỏ", icon: Gem },
              { id: "garage", label: "Siêu Xe & Thú Cưng", icon: Car },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeVaultTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundEngine.play("interact");
                    setActiveVaultTab(tab.id as "fish" | "mining" | "garage");
                    setSelectedLootIdx(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    active
                      ? "bg-gradient-to-b from-[#FFE082] to-[#C99A35] text-[#1C110B] shadow-[0_4px_0_#5C2804]"
                      : "text-amber-200/75 hover:text-amber-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center 3D Pedestal + Tactile Selector Dock */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D LEVITATING PEDESTAL STAGE */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-center py-6 relative"
            style={{ perspective: "1000px" }}
          >
            {/* Glowing Aura Behind Loot */}
            <div
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-45 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: currentLoot.color }}
            />

            {/* Floating 3D Sprite */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLoot.name}
                initial={{ opacity: 0, scale: 0.7, y: 20, rotateY: -30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -14, 0],
                  rotateY: [0, 8, -8, 0],
                }}
                exit={{ opacity: 0, scale: 0.75, y: -15 }}
                transition={{
                  y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center"
              >
                <img
                  src={currentLoot.icon}
                  alt={currentLoot.name}
                  className="w-full h-full object-contain pixelated drop-shadow-[0_22px_28px_rgba(0,0,0,0.9)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* 3D Extruded Golden Wood Pedestal Disc */}
            <div
              style={{ transform: "rotateX(68deg)" }}
              className="w-52 h-52 -mt-12 rounded-full bg-gradient-to-b from-amber-500/40 via-amber-900/80 to-stone-950 border-4 border-[#FFD700] shadow-[0_25px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.35)] flex items-center justify-center"
            >
              <div
                className="w-36 h-36 rounded-full border-2 border-dashed border-amber-300/60 animate-spin"
                style={{ animationDuration: "18s" }}
              />
            </div>

            {/* Active Loot Name & Value Pill — Zero Middle Dots */}
            <div className="mt-2 text-center z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400/50 text-[11px] font-black text-amber-300 uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> [{currentLoot.badge}] {currentLoot.sub}
              </div>
              <h4 className="font-wood text-2xl sm:text-3xl text-[#FFE89E]">{currentLoot.name}</h4>
              <div className="text-sm font-black text-emerald-400 mt-0.5">{currentLoot.val}</div>
            </div>
          </div>

          {/* TACTILE ORB SELECTOR GRID (Right 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {vaultItems.map((item, idx) => {
              const isSelected = idx === selectedLootIdx;
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ y: -6, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    soundEngine.play("coins");
                    setSelectedLootIdx(idx);
                  }}
                  className={`relative rounded-2xl p-3.5 flex flex-col items-center text-center transition cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-b from-amber-500/40 to-amber-950/95 border-2 border-[#FFD700] shadow-[0_6px_0_#451A03,0_14px_30px_rgba(245,158,11,0.35)]"
                      : "bg-[#1A0F09]/90 hover:bg-[#26170E] border-2 border-[#6B4930] opacity-85 hover:opacity-100"
                  }`}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-2">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-14 h-14 object-contain pixelated drop-shadow-[0_8px_10px_rgba(0,0,0,0.85)]"
                    />
                  </div>
                  <div className="text-xs font-black text-[#FFF8E6] truncate w-full">{item.name}</div>
                  <div className="text-[11px] font-bold text-[#FFD700] mt-0.5">{item.val}</div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
