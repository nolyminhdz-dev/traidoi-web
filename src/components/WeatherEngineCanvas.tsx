"use client";

import React, { useEffect, useRef } from "react";
import { soundEngine } from "@/lib/sound";

export type WeatherMode = "sun" | "rain" | "sunset" | "night";

interface WeatherEngineCanvasProps {
  weather: WeatherMode;
}

interface Particle {
  x: number;
  y: number;
  z: number; // 0.25 (far) to 1.25 (near-camera)
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  angle: number;
  vAngle: number;
  pitch: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  splashVx: number;
  splashVy: number;
}

interface SunsetBird {
  x: number;
  y: number;
  z: number;
  speed: number;
  wingPhase: number;
}

export default function WeatherEngineCanvas({ weather }: WeatherEngineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lightningFlashRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const birds: SunsetBird[] = [];

    const count =
      weather === "rain" ? 175 : weather === "night" ? 80 : weather === "sun" ? 55 : 50;

    for (let i = 0; i < count; i++) {
      const z = 0.25 + Math.random() * 0.95;
      if (weather === "rain") {
        particles.push({
          x: Math.random() * width * 1.2,
          y: Math.random() * height,
          z,
          vx: -3.4 * z,
          vy: (15 + Math.random() * 8) * z,
          size: 20 + Math.random() * 18,
          alpha: (0.24 + Math.random() * 0.42) * z,
          phase: Math.random() * Math.PI * 2,
          angle: 0,
          vAngle: 0,
          pitch: 0,
          color: "#bae6fd",
        });
      } else if (weather === "night") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.9 * z,
          vy: (-0.25 - Math.random() * 0.45) * z,
          size: (2.2 + Math.random() * 3.8) * z,
          alpha: 0.45 + Math.random() * 0.55,
          phase: Math.random() * Math.PI * 2,
          angle: 0,
          vAngle: 0,
          pitch: 0,
          color: Math.random() > 0.28 ? "#fde047" : "#34d399",
        });
      } else if (weather === "sun") {
        // Bamboo leaves & golden pollen motes in 3D space
        const isLeaf = i % 3 === 0;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (0.5 + Math.random() * 0.9) * z,
          vy: (0.4 + Math.random() * 0.65) * z,
          size: isLeaf ? (9 + Math.random() * 8) * z : (2.2 + Math.random() * 3) * z,
          alpha: 0.4 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          angle: Math.random() * Math.PI * 2,
          vAngle: (Math.random() - 0.5) * 0.04,
          pitch: Math.random() * Math.PI,
          color: isLeaf ? "#84cc16" : "#fef08a",
        });
      } else {
        // Sunset: warm embers & incense smoke motes
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (0.35 + Math.random() * 0.55) * z,
          vy: (-0.2 - Math.random() * 0.35) * z,
          size: (2.4 + Math.random() * 4.2) * z,
          alpha: 0.35 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          angle: Math.random() * Math.PI * 2,
          vAngle: 0.015,
          pitch: 0,
          color: Math.random() > 0.45 ? "#fb923c" : "#fde047",
        });
      }
    }

    // Sunset Bird Flock (Đàn chim chiều bay về tổ)
    if (weather === "sunset") {
      for (let b = 0; b < 11; b++) {
        birds.push({
          x: Math.random() * width,
          y: height * (0.12 + Math.random() * 0.28),
          z: 0.5 + Math.random() * 0.5,
          speed: 0.65 + Math.random() * 0.45,
          wingPhase: Math.random() * Math.PI * 2,
        });
      }
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const rawDt = (time - lastTime) / 16.667; // Normalized to 60fps = 1.0
      const dt = Math.min(Math.max(rawDt, 0.2), 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      // 4D Dynamic Wind Gust Envelope
      const windGust = Math.sin(time * 0.0012) * 0.8 + Math.sin(time * 0.0031) * 0.4;

      // 1. VOLUMETRIC GOD RAYS (SUN & SUNSET)
      if (weather === "sun" || weather === "sunset") {
        ctx.save();
        const rayCount = 4;
        for (let r = 0; r < rayCount; r++) {
          const swing = Math.sin(time * 0.0004 + r * 1.3) * 75;
          const xStart = width * (0.15 + r * 0.24) + swing;
          const grad = ctx.createLinearGradient(xStart, 0, xStart + 240, height * 0.88);
          if (weather === "sun") {
            grad.addColorStop(0, "rgba(254, 240, 138, 0.14)");
            grad.addColorStop(0.55, "rgba(253, 224, 71, 0.05)");
            grad.addColorStop(1, "rgba(253, 224, 71, 0)");
          } else {
            grad.addColorStop(0, "rgba(251, 146, 60, 0.16)");
            grad.addColorStop(0.55, "rgba(244, 63, 94, 0.06)");
            grad.addColorStop(1, "rgba(15, 23, 42, 0)");
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(xStart - 90, 0);
          ctx.lineTo(xStart + 110, 0);
          ctx.lineTo(xStart + 460, height);
          ctx.lineTo(xStart + 90, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. SUNSET FLOCKING BIRDS IN 3D HORIZON
      if (weather === "sunset" && birds.length > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(254, 215, 170, 0.65)";
        ctx.lineCap = "round";
        for (const bird of birds) {
          bird.x += bird.speed * bird.z * dt;
          bird.y += Math.sin(time * 0.0015 + bird.wingPhase) * 0.15 * dt;
          if (bird.x > width + 40) bird.x = -40;

          const flap = Math.sin(time * 0.009 + bird.wingPhase) * 6 * bird.z;
          const span = 11 * bird.z;
          ctx.lineWidth = 1.6 * bird.z;
          ctx.beginPath();
          ctx.moveTo(bird.x - span, bird.y - flap);
          ctx.quadraticCurveTo(bird.x - span * 0.4, bird.y - Math.abs(flap) * 0.5, bird.x, bird.y);
          ctx.quadraticCurveTo(bird.x + span * 0.4, bird.y - Math.abs(flap) * 0.5, bird.x + span, bird.y - flap);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. RAIN LIGHTNING FLASH
      if (weather === "rain") {
        if (Math.random() < 0.0018 && lightningFlashRef.current <= 0.05) {
          lightningFlashRef.current = 0.42;
          soundEngine.playThunder();
        }
        if (lightningFlashRef.current > 0) {
          ctx.fillStyle = `rgba(224, 242, 254, ${lightningFlashRef.current})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlashRef.current *= Math.pow(0.9, dt);
        }
      }

      // 4. RENDER 4D PARTICLES
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (weather === "rain") {
          const shearedVx = p.vx + windGust * 1.4 * p.z;
          p.x += shearedVx * dt;
          p.y += p.vy * dt;

          ctx.strokeStyle = `rgba(186, 230, 253, ${p.alpha})`;
          ctx.lineWidth = 1.25 * p.z;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + shearedVx * 1.6, p.y + p.size * p.z);
          ctx.stroke();

          if (p.y > height) {
            if (Math.random() < 0.32 && ripples.length < 45) {
              ripples.push({
                x: p.x,
                y: height - 8 - Math.random() * 110,
                r: 2,
                maxR: (16 + Math.random() * 22) * p.z,
                alpha: 0.52 * p.z,
                splashVx: (Math.random() - 0.5) * 2.5,
                splashVy: -2.5 - Math.random() * 2,
              });
            }
            p.y = -25;
            p.x = Math.random() * (width + 240);
          }
          if (p.x < -60) p.x = width + 120;
        } else if (weather === "night") {
          p.x += (p.vx + Math.sin(time * 0.0015 + p.phase) * 0.45) * dt;
          p.y += (p.vy + Math.cos(time * 0.0012 + p.phase) * 0.3) * dt;

          const pulse = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.0028 + p.phase));
          const r = p.size * (0.85 + pulse * 0.45);

          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.2);
          glow.addColorStop(0, p.color);
          glow.addColorStop(0.35, p.color + "88");
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.globalAlpha = p.alpha * pulse;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 4.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (p.y < -20) p.y = height + 20;
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
        } else {
          // SUN & SUNSET: 3D Tumbling Bamboo Leaves & Golden Motes
          p.x += (p.vx + windGust * 0.65 * p.z + Math.sin(time * 0.001 + p.phase) * 0.45) * dt;
          p.y += p.vy * dt;
          p.angle += p.vAngle * dt;
          p.pitch += 0.03 * dt;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.globalAlpha = p.alpha;

          if (weather === "sun" && p.size > 5) {
            // 3D Tumbling Bamboo Leaf with Pitch Foreshortening
            const pitchScale = 0.35 + 0.65 * Math.abs(Math.cos(p.pitch));
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.28 * pitchScale, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalCompositeOperation = "lighter";
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.6);
            glow.addColorStop(0, p.color);
            glow.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 2.6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          if (p.y > height + 25) p.y = -25;
          if (p.y < -25) p.y = height + 25;
          if (p.x > width + 25) p.x = -25;
        }
      }

      // 5. TWO-PHASE RAIN RIPPLES & BALLISTIC MICRO-DROPLETS
      if (weather === "rain") {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.r += 0.85 * dt;
          rp.alpha *= Math.pow(0.94, dt);

          // Concentric Fresnel Ripple
          ctx.strokeStyle = `rgba(186, 230, 253, ${rp.alpha})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.28, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Upward Ballistic Splash Droplet
          if (rp.r < rp.maxR * 0.55) {
            ctx.fillStyle = `rgba(224, 242, 254, ${rp.alpha * 1.2})`;
            ctx.beginPath();
            ctx.arc(rp.x + rp.splashVx * rp.r * 0.3, rp.y - rp.r * 0.45, 1.3, 0, Math.PI * 2);
            ctx.fill();
          }

          if (rp.r >= rp.maxR || rp.alpha < 0.02) {
            ripples.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
