"use client";

import React, { useEffect, useRef } from "react";

export type WeatherMode = "sun" | "rain" | "sunset" | "night";

interface WeatherEngineCanvasProps {
  weather: WeatherMode;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  hue: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

/**
 * Performant Atmospheric Lighting & Weather Canvas (Section IX.21–22 & X.26)
 * - Low particle count tuned for 60FPS across desktop & mobile
 * - Respects prefers-reduced-motion (disables lightning flashes and fast motion)
 */
export default function WeatherEngineCanvas({ weather }: WeatherEngineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const isMobile = width < 768;
    const densityScale = isMobile ? 0.45 : 1;

    const baseCount =
      weather === "rain"
        ? 64
        : weather === "night"
        ? 26
        : weather === "sun"
        ? 22
        : 20;

    const particleCount = Math.max(8, Math.round(baseCount * densityScale));

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const z = 0.35 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx:
          weather === "rain"
            ? -2.8 * z
            : (Math.random() - 0.5) * 0.45 * z,
        vy:
          weather === "rain"
            ? (12 + Math.random() * 6) * z
            : weather === "sun"
            ? (0.25 + Math.random() * 0.4) * z
            : (Math.random() - 0.5) * 0.35 * z,
        size:
          weather === "rain"
            ? 14 + 12 * z
            : weather === "night"
            ? 2 + 2.5 * z
            : 2 + 2.5 * z,
        alpha: 0.25 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        hue:
          weather === "night"
            ? 48 + Math.random() * 25
            : weather === "sunset"
            ? 22 + Math.random() * 20
            : 45,
      };
    });

    const ripples: Ripple[] = [];

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      // 1. Directional Sunlight / Sunset Ambient Gradient Rays
      if (weather === "sun" || weather === "sunset") {
        ctx.save();
        for (let i = 0; i < 3; i++) {
          const rayX = width * (0.18 + i * 0.28) + Math.sin(t * 0.35 + i) * 28;
          const grad = ctx.createLinearGradient(rayX, 0, rayX + 180, height * 0.85);
          if (weather === "sun") {
            grad.addColorStop(0, "rgba(242, 211, 155, 0.09)");
            grad.addColorStop(0.5, "rgba(242, 211, 155, 0.03)");
            grad.addColorStop(1, "rgba(242, 211, 155, 0)");
          } else {
            grad.addColorStop(0, "rgba(251, 146, 60, 0.11)");
            grad.addColorStop(0.5, "rgba(244, 63, 94, 0.04)");
            grad.addColorStop(1, "rgba(15, 23, 42, 0)");
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(rayX - 60, 0);
          ctx.lineTo(rayX + 90, 0);
          ctx.lineTo(rayX + 340, height);
          ctx.lineTo(rayX + 80, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. Subtle Atmospheric Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.025;

        if (weather === "rain") {
          if (p.y > height) {
            if (ripples.length < 14 && Math.random() < 0.25) {
              ripples.push({
                x: p.x,
                y: height - (16 + Math.random() * 90),
                r: 1,
                maxR: 12 + p.z * 14,
                alpha: 0.35 * p.z,
              });
            }
            p.y = -20;
            p.x = Math.random() * (width + 160);
          }
          if (p.x < -40) p.x = width + 40;

          ctx.strokeStyle = `rgba(186, 230, 253, ${0.28 * p.z})`;
          ctx.lineWidth = 1.1 * p.z;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.6, p.y + p.size);
          ctx.stroke();
        } else if (weather === "night") {
          p.x += Math.sin(t + p.phase) * 0.3;
          p.y += Math.cos(t * 0.7 + p.phase) * 0.25;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const glow = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.8 + p.phase));
          const rad = p.size * 3.2;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          g.addColorStop(0, `hsla(${p.hue}, 95%, 78%, ${glow * 0.85})`);
          g.addColorStop(0.45, `hsla(${p.hue}, 90%, 58%, ${glow * 0.3})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.x += Math.sin(t * 0.9 + p.phase) * 0.35;
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.fillStyle =
            weather === "sun"
              ? `rgba(242, 211, 155, ${0.32 * p.z})`
              : `rgba(251, 146, 60, ${0.32 * p.z})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Rain Ground Ripples
      if (weather === "rain") {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.r += 0.55;
          rp.alpha *= 0.95;
          ctx.strokeStyle = `rgba(186, 230, 253, ${rp.alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
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
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
}
