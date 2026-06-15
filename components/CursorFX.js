"use client";

import { useEffect, useRef } from "react";

const CANVAS_VARIANTS = ["trail", "fire", "sparkle"];

export default function CursorFX({ variant = "glow" }) {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const cleanups = [];

    if (variant === "glow" || variant === "spotlight") {
      const el = glowRef.current;
      if (!el) return;
      const move = (e) => {
        el.style.setProperty("--cx", `${e.clientX}px`);
        el.style.setProperty("--cy", `${e.clientY}px`);
      };
      window.addEventListener("mousemove", move);
      cleanups.push(() => window.removeEventListener("mousemove", move));
    } else if (variant === "ring") {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      const m = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const r = { x: m.x, y: m.y };
      const move = (e) => {
        m.x = e.clientX;
        m.y = e.clientY;
        dot.style.transform = `translate(${m.x}px, ${m.y}px) translate(-50%, -50%)`;
      };
      window.addEventListener("mousemove", move);
      cleanups.push(() => window.removeEventListener("mousemove", move));
      const loop = () => {
        r.x += (m.x - r.x) * 0.18;
        r.y += (m.y - r.y) * 0.18;
        ring.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(loop);
      };
      if (!reduce) loop();
    } else if (CANVAS_VARIANTS.includes(variant)) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let w = 0;
      let h = 0;
      let parts = [];
      const m = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const sparkColors = [
        [255, 215, 120],
        [255, 255, 255],
        [120, 200, 255],
      ];
      const makeSpark = (x, y) => ({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        size: Math.random() * 2 + 1.2,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      });
      const makeFire = (x, y) => ({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 1.4 + 0.5),
        life: 1,
        size: Math.random() * 8 + 6,
      });

      const move = (e) => {
        m.x = e.clientX;
        m.y = e.clientY;
        m.active = true;
        if (variant === "trail") {
          parts.push({ x: m.x, y: m.y, life: 1 });
          if (parts.length > 70) parts.shift();
        } else if (variant === "sparkle") {
          for (let i = 0; i < 3; i++) parts.push(makeSpark(m.x, m.y));
        }
      };

      const loop = (t) => {
        ctx.clearRect(0, 0, w, h);

        if (variant === "fire" && m.active) {
          for (let i = 0; i < 3; i++) parts.push(makeFire(m.x, m.y));
        }

        if (variant === "trail") {
          const hue = (t * 0.08) % 360;
          for (const p of parts) {
            p.life -= 0.022;
            if (p.life <= 0) continue;
            ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${p.life * 0.7})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.life * 7, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (variant === "fire") {
          ctx.globalCompositeOperation = "lighter";
          for (const p of parts) {
            p.vy -= 0.02;
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.03;
            p.size *= 0.97;
            if (p.life <= 0) continue;
            const g = Math.round(120 + 135 * p.life);
            const b = Math.round(50 * p.life);
            ctx.fillStyle = `rgba(255, ${g}, ${b}, ${p.life * 0.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(p.size, 0.5), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalCompositeOperation = "source-over";
        } else if (variant === "sparkle") {
          for (const p of parts) {
            p.vy += 0.05;
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.025;
            if (p.life <= 0) continue;
            const [r, g, b] = p.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.life})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0;
          if (m.active) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.beginPath();
            ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        parts = parts.filter((p) => p.life > 0);
        raf = requestAnimationFrame(loop);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", move);
      if (!reduce) raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", move);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [variant]);

  if (variant === "glow") return <div ref={glowRef} className="cfx-glow" aria-hidden="true" />;
  if (variant === "spotlight") return <div ref={glowRef} className="cfx-spotlight" aria-hidden="true" />;
  if (variant === "ring")
    return (
      <>
        <div ref={ringRef} className="cfx-ring" aria-hidden="true" />
        <div ref={dotRef} className="cfx-dot" aria-hidden="true" />
      </>
    );
  if (CANVAS_VARIANTS.includes(variant))
    return <canvas ref={canvasRef} className="cfx-trail" aria-hidden="true" />;
  return null;
}
