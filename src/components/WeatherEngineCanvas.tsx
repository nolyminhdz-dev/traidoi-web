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
  pulseSpeed: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
}

/**
 * Atmospheric Lighting & Weather Canvas Engine (Section XI & XVI)
 * - Ban ngày (sun): ánh nắng ấm áp từ góc trên, hạt bụi vàng nhẹ trong nắng (tối đa 18 hạt để siêu mượt).
 * - Mưa (rain): hạt mưa rơi nhẹ nhàng, dễ chịu, không làm tối sầm màn hình.
 * - Hoàng hôn (sunset): ánh chiều vàng cam ấm áp.
 * - Đêm (night): có chiều sâu xanh lam đậm và đom đóm phát sáng dịu (tối đa 22 đom đóm).
 * - Tự động tạm dừng requestAnimationFrame khi tab ẩn (document.hidden) hoặc prefers-reduced-motion.
 */
export default function WeatherEngineCanvas({ weather }: WeatherEngineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let isPaused = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion media query
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;

    // Helper: Draw static atmospheric tint when reduced motion is enabled
    const drawStaticAtmosphere = () => {
      ctx.clearRect(0, 0, width, height);
      if (weather === "sun") {
        const sunGrad = ctx.createRadialGradient(
          width * 0.85,
          0,
          20,
          width * 0.85,
          0,
          Math.max(width, height) * 0.75
        );
        sunGrad.addColorStop(0, "rgba(255, 238, 180, 0.08)");
        sunGrad.addColorStop(0.5, "rgba(245, 204, 114, 0.03)");
        sunGrad.addColorStop(1, "rgba(245, 204, 114, 0)");
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (weather === "sunset") {
        const sunsetGrad = ctx.createLinearGradient(width * 0.2, 0, width * 0.65, height);
        sunsetGrad.addColorStop(0, "rgba(251, 146, 60, 0.10)");
        sunsetGrad.addColorStop(0.55, "rgba(233, 128, 101, 0.035)");
        sunsetGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = sunsetGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (weather === "night") {
        const nightGrad = ctx.createRadialGradient(
          width * 0.5,
          0,
          40,
          width * 0.5,
          height * 0.45,
          Math.max(width, height) * 0.95
        );
        nightGrad.addColorStop(0, "rgba(24, 52, 95, 0.16)");
        nightGrad.addColorStop(0.6, "rgba(12, 28, 55, 0.08)");
        nightGrad.addColorStop(1, "rgba(4, 10, 22, 0)");
        ctx.fillStyle = nightGrad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    // Particle caps strictly adhering to specification:
    // - Sun: max 18 golden dust particles (desktop: 18, mobile: 11)
    // - Night: max 22 fireflies (desktop: 22, mobile: 14)
    // - Sunset: max 16 amber dust motes
    // - Rain: max 40 crystal rain drops (light and gentle, desktop: 40, mobile: 20)
    const isMobile = width < 768;
    const maxParticles =
      weather === "sun"
        ? (isMobile ? 11 : 18)
        : weather === "night"
        ? (isMobile ? 14 : 22)
        : weather === "sunset"
        ? (isMobile ? 10 : 16)
        : (isMobile ? 20 : 40);

    const particles: Particle[] = Array.from({ length: maxParticles }, () => {
      const z = 0.35 + Math.random() * 0.65;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx:
          weather === "rain"
            ? -1.6 * z
            : (Math.random() - 0.5) * 0.35 * z,
        vy:
          weather === "rain"
            ? (9.5 + Math.random() * 3.5) * z
            : weather === "sun"
            ? (0.16 + Math.random() * 0.32) * z
            : (Math.random() - 0.5) * 0.3 * z,
        size:
          weather === "rain"
            ? 12 + 10 * z
            : weather === "night"
            ? 2.2 + 2.4 * z
            : 1.8 + 2.0 * z,
        alpha: 0.28 + Math.random() * 0.52,
        phase: Math.random() * Math.PI * 2,
        hue:
          weather === "night"
            ? 64 + Math.random() * 18     // Đom đóm: màu vàng lục ánh trăng
            : weather === "sunset"
            ? 24 + Math.random() * 16     // Hoàng hôn: cam hổ phách ấm
            : 44 + Math.random() * 8,     // Ban ngày: vàng nắng ấm
        pulseSpeed: 1.2 + Math.random() * 1.5,
      };
    });

    const ripples: Ripple[] = [];

    // Animation render loop
    const render = (time: number) => {
      if (isPaused || prefersReducedMotion) return;

      ctx.clearRect(0, 0, width, height);
      const t = time * 0.001;

      // ====================================================================
      // 1. DIRECTIONAL ATMOSPHERIC LIGHTING & DEPTH
      // ====================================================================
      if (weather === "sun") {
        // Ánh nắng ấm áp tỏa từ góc trên phải
        ctx.save();
        const sunSourceX = width * 0.82;
        const sunSourceY = -20;
        const sunRadius = Math.max(width, height) * 0.72;

        const sunGlow = ctx.createRadialGradient(
          sunSourceX,
          sunSourceY,
          30,
          sunSourceX,
          sunSourceY,
          sunRadius
        );
        sunGlow.addColorStop(0, "rgba(255, 244, 210, 0.10)");
        sunGlow.addColorStop(0.35, "rgba(245, 204, 114, 0.04)");
        sunGlow.addColorStop(0.7, "rgba(245, 204, 114, 0.015)");
        sunGlow.addColorStop(1, "rgba(245, 204, 114, 0)");
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, width, height);

        // 2 vệt nắng xiên nhẹ nhàng ấm áp
        for (let i = 0; i < 2; i++) {
          const rayShift = Math.sin(t * 0.28 + i * 1.6) * 32;
          const rayGrad = ctx.createLinearGradient(
            sunSourceX - 60 + i * 140 + rayShift,
            0,
            sunSourceX - 350 + i * 160 + rayShift,
            height * 0.95
          );
          rayGrad.addColorStop(0, "rgba(255, 246, 220, 0.05)");
          rayGrad.addColorStop(0.5, "rgba(245, 204, 114, 0.02)");
          rayGrad.addColorStop(1, "rgba(245, 204, 114, 0)");

          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(sunSourceX - 80 + i * 150 + rayShift, 0);
          ctx.lineTo(sunSourceX + 40 + i * 150 + rayShift, 0);
          ctx.lineTo(sunSourceX - 160 + i * 180 + rayShift, height);
          ctx.lineTo(sunSourceX - 340 + i * 180 + rayShift, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else if (weather === "sunset") {
        // Ánh chiều vàng cam ấm áp từ góc tây
        ctx.save();
        const sunsetGrad = ctx.createLinearGradient(width * 0.15, 0, width * 0.65, height);
        sunsetGrad.addColorStop(0, "rgba(251, 146, 60, 0.10)");
        sunsetGrad.addColorStop(0.45, "rgba(233, 128, 101, 0.045)");
        sunsetGrad.addColorStop(0.8, "rgba(245, 204, 114, 0.02)");
        sunsetGrad.addColorStop(1, "rgba(20, 15, 25, 0)");
        ctx.fillStyle = sunsetGrad;
        ctx.fillRect(0, 0, width, height);

        const warmRay = ctx.createRadialGradient(
          width * 0.18,
          height * 0.15,
          20,
          width * 0.18,
          height * 0.15,
          width * 0.6
        );
        warmRay.addColorStop(0, "rgba(251, 191, 36, 0.07)");
        warmRay.addColorStop(0.5, "rgba(244, 63, 94, 0.025)");
        warmRay.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = warmRay;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      } else if (weather === "night") {
        // Chiều sâu xanh lam đậm (deep celestial blue depth)
        ctx.save();
        const nightDepth = ctx.createRadialGradient(
          width * 0.5,
          -40,
          50,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.95
        );
        nightDepth.addColorStop(0, "rgba(28, 60, 110, 0.18)");
        nightDepth.addColorStop(0.5, "rgba(14, 32, 62, 0.09)");
        nightDepth.addColorStop(0.85, "rgba(8, 20, 38, 0.03)");
        nightDepth.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = nightDepth;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // ====================================================================
      // 2. PARTICLES RENDERING
      // ====================================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        if (weather === "rain") {
          // Hạt mưa rơi nhẹ nhàng, dễ chịu, không làm tối sầm màn hình
          if (p.y > height + 20) {
            if (ripples.length < 10 && Math.random() < 0.22) {
              ripples.push({
                x: p.x,
                y: height - (14 + Math.random() * 80),
                r: 1,
                maxR: 9 + p.z * 11,
                alpha: 0.32 * p.z,
              });
            }
            p.y = -25;
            p.x = Math.random() * (width + 120);
          }
          if (p.x < -30) p.x = width + 30;

          // Vệt mưa mỏng pha lê trong suốt
          ctx.strokeStyle = `rgba(186, 230, 253, ${0.32 * p.z})`;
          ctx.lineWidth = 0.95 * p.z;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.4, p.y + p.size);
          ctx.stroke();
        } else if (weather === "night") {
          // Đom đóm phát sáng dịu (tối đa 22 đom đóm)
          p.x += Math.sin(t * 0.85 + p.phase) * 0.45;
          p.y += Math.cos(t * 0.65 + p.phase * 1.3) * 0.35;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Hào quang phát sáng dịu mắt
          const breathe = 0.45 + 0.55 * Math.abs(Math.sin(t * p.pulseSpeed + p.phase));
          const coreRadius = p.size;
          const outerGlowRadius = p.size * 3.4;

          const fireflyGlow = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            outerGlowRadius
          );
          fireflyGlow.addColorStop(0, `hsla(${p.hue}, 96%, 80%, ${breathe * 0.95})`);
          fireflyGlow.addColorStop(0.38, `hsla(${p.hue}, 90%, 62%, ${breathe * 0.45})`);
          fireflyGlow.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = fireflyGlow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, outerGlowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Lõi đom đóm sáng thanh thoát
          ctx.fillStyle = `rgba(255, 255, 230, ${breathe * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, coreRadius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Cảnh ban ngày (sun) hạt bụi vàng nhẹ trong nắng OR hoàng hôn (sunset)
          p.x += Math.sin(t * 0.75 + p.phase) * 0.3;
          if (p.y > height + 20) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          if (p.y < -20) p.y = height + 15;
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          const shimmer = 0.35 + 0.65 * Math.abs(Math.sin(t * p.pulseSpeed + p.phase));
          const moteRadius = p.size * (weather === "sun" ? 0.7 : 0.85);

          if (weather === "sun") {
            // Hạt bụi vàng ấm áp lơ lửng trong nắng (tối đa 18 hạt)
            const moteGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, moteRadius * 2.2);
            moteGrad.addColorStop(0, `rgba(255, 246, 210, ${shimmer * 0.75 * p.z})`);
            moteGrad.addColorStop(0.5, `rgba(245, 204, 114, ${shimmer * 0.35 * p.z})`);
            moteGrad.addColorStop(1, "rgba(245, 204, 114, 0)");
            ctx.fillStyle = moteGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, moteRadius * 2.2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Hoàng hôn: hạt bụi ấm vàng cam
            const sunsetMoteGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, moteRadius * 2.4);
            sunsetMoteGrad.addColorStop(0, `rgba(254, 215, 170, ${shimmer * 0.8 * p.z})`);
            sunsetMoteGrad.addColorStop(0.5, `rgba(251, 146, 60, ${shimmer * 0.35 * p.z})`);
            sunsetMoteGrad.addColorStop(1, "rgba(251, 146, 60, 0)");
            ctx.fillStyle = sunsetMoteGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, moteRadius * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ====================================================================
      // 3. RAIN GROUND RIPPLES (Mưa rơi thanh tao, gợn sóng mờ dần)
      // ====================================================================
      if (weather === "rain") {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.r += 0.45;
          rp.alpha *= 0.94;
          ctx.strokeStyle = `rgba(186, 230, 253, ${rp.alpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.32, 0, 0, Math.PI * 2);
          ctx.stroke();
          if (rp.r >= rp.maxR || rp.alpha < 0.015) {
            ripples.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    // ======================================================================
    // 4. PERFORMANCE & ACCESSIBILITY HANDLERS (SECTION XVI)
    // ======================================================================
    const updateLoopState = () => {
      if (document.hidden || prefersReducedMotion) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
        isPaused = true;
        if (prefersReducedMotion) {
          drawStaticAtmosphere();
        }
      } else {
        if (!animId) {
          isPaused = false;
          animId = requestAnimationFrame(render);
        }
      }
    };

    const handleVisibilityChange = () => {
      updateLoopState();
    };

    const handleMotionQueryChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      updateLoopState();
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) {
        drawStaticAtmosphere();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionQueryChange);
    window.addEventListener("resize", handleResize);

    // Initial start
    if (prefersReducedMotion) {
      drawStaticAtmosphere();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId) {
        cancelAnimationFrame(animId);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionQueryChange);
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
