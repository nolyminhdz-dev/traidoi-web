"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Volume2, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/sound";
import { ThoDiaAnimatedSprite, AnimatedNpcPortrait } from "./SpriteAnimator";
import { WeatherMode } from "./WeatherEngineCanvas";
import Wood3DPlaqueTitle from "./Wood3DPlaqueTitle";

interface CraftAndFooterSectionProps {
  weather: WeatherMode;
}

export default function CraftAndFooterSection({ weather }: CraftAndFooterSectionProps) {
  const [enteredPorch, setEnteredPorch] = useState(false);

  const handleReturnHome = () => {
    soundEngine.playGong();
    soundEngine.play("success");
    setEnteredPorch(true);
    confetti({
      particleCount: 95,
      spread: 85,
      origin: { y: 0.75 },
      colors: ["#fde047", "#f59e0b", "#10b981", "#fb7185"],
    });
  };

  return (
    <footer className="relative pt-16 pb-28 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="relative" style={{ perspective: "1400px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-[36px] p-8 sm:p-14 carved-wood-box overflow-hidden text-center"
        >
          {/* 4 Ornate Wood Corner Frames — Fixed /decor/ Paths! */}
          <img
            src="/game-assets/ornaments/decor/corner-wood-tl.png"
            alt=""
            className="w-14 h-14 absolute top-2 left-2 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-tr.png"
            alt=""
            className="w-14 h-14 absolute top-2 right-2 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-bl.png"
            alt=""
            className="w-14 h-14 absolute bottom-2 left-2 pointer-events-none pixelated drop-shadow-lg"
          />
          <img
            src="/game-assets/ornaments/decor/corner-wood-br.png"
            alt=""
            className="w-14 h-14 absolute bottom-2 right-2 pointer-events-none pixelated drop-shadow-lg"
          />

          {/* Hanging Swinging Lanterns on the Porch Roof */}
          <motion.img
            src="/game-assets/ornaments/decor/lantern.png"
            alt=""
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-14 object-contain absolute top-4 left-16 sm:left-24 origin-top pixelated drop-shadow-[0_0_20px_rgba(245,158,11,0.75)]"
          />
          <motion.img
            src="/game-assets/ornaments/decor/lantern.png"
            alt=""
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-14 object-contain absolute top-4 right-16 sm:right-24 origin-top pixelated drop-shadow-[0_0_20px_rgba(245,158,11,0.75)]"
          />

          {/* Warm Hearth Glow Behind Grandma & Ông Địa */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[240px] rounded-full bg-amber-500/20 blur-[90px] pointer-events-none" />

          {/* 3D Character Pair Waiting on the Porch: Bà Ngoại & Ông Thổ Địa */}
          <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-10 mb-6">
            <motion.div
              whileHover={{ scale: 1.08, y: -6 }}
              onClick={() => soundEngine.play("interact")}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-500/15 border-2 border-amber-400/50 p-2 flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.8)]">
                <AnimatedNpcPortrait
                  baseSrc="/game-assets/pixel/portrait-grandma.png"
                  talkSrc="/game-assets/pixel/portrait-grandma-talk.png"
                  blinkSrc="/game-assets/pixel/portrait-grandma-blink.png"
                  alt="Bà Ngoại"
                  size={76}
                  isTalking={enteredPorch}
                />
              </div>
              <span className="mt-2 text-xs font-extrabold text-amber-300 tracking-wider uppercase">
                Bà Ngoại
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08, y: -6 }}
              onClick={() => soundEngine.playGong()}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-red-500/15 border-2 border-amber-400/50 p-2 flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.8)]">
                <ThoDiaAnimatedSprite mode={enteredPorch ? "laugh" : "fan"} size={78} />
              </div>
              <span className="mt-2 text-xs font-extrabold text-amber-300 tracking-wider uppercase">
                Ông Thổ Địa
              </span>
            </motion.div>
          </div>

          {/* THE SINGLE IMMORTAL EMOTIONAL LINE */}
          <div className="relative z-10 max-w-3xl mx-auto mb-9">
            <Wood3DPlaqueTitle
              eyebrow="HIÊN NHÀ QUÊ NGOẠI LÚC LÊN ĐÈN"
              title="“Đi đâu cũng nhớ chạy chậm, tới bữa về ăn cơm nghen con.”"
              align="center"
              size="lg"
            />
          </div>

          {/* SINGLE IRRESISTIBLE THRESHOLD CTA */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleReturnHome}
              className="group relative px-8 sm:px-12 py-4.5 rounded-2xl bg-gradient-to-b from-[#FFE082] via-[#F59E0B] to-[#B45309] text-[#1C110B] font-black text-base sm:text-xl tracking-wide shadow-[0_6px_0_#5C2804,0_20px_50px_rgba(245,158,11,0.5)] border-2 border-amber-100 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles
                className="w-6 h-6 text-[#1C110B] animate-spin"
                style={{ animationDuration: "6s" }}
              />
              <span>
                {enteredPorch
                  ? "Ngoại Đang Dọn Cơm Chờ Con Trong Xóm Bến Dừa!"
                  : "“DẠ NGOẠI, CON MỚI VỀ TỚI BẬC CỬA!”"}
              </span>
              <Heart className="w-5 h-5 text-red-700 fill-red-600 group-hover:scale-125 transition-transform" />
            </motion.button>

            {/* Clean Signature Without Middle Dots */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-amber-200/75">
              <span>TRẢI ĐỜI XÓM BẾN DỪA (BUILD 658)</span>
              <button
                onClick={() => soundEngine.toggleRadio()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/35 text-amber-200 hover:bg-amber-500/25 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#FFD700]" />
                Bật Đài Phát Thanh Quê Ngoại
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
