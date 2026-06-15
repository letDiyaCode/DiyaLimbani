"use client";

import { useEffect, useRef } from "react";

const palette = [
  [124, 92, 255],
  [56, 189, 248],
  [236, 72, 153],
  [45, 212, 191],
  [167, 139, 250],
];

const CONFIG = {
  classic: { div: 16000, link: 130, sMin: 1.4, sMax: 1.8, glow: false, pulse: false, nodeLinks: true, cursor: "link", mDist: 170, lineA: 0.3 },
  glow: { div: 18000, link: 150, sMin: 1, sMax: 2.8, glow: true, pulse: true, nodeLinks: true, cursor: "link", mDist: 180, lineA: 0.28 },
  reactive: { div: 15000, link: 130, sMin: 1.4, sMax: 2, glow: false, pulse: false, nodeLinks: true, cursor: "repel", mDist: 150, lineA: 0.3 },
  cursorWeb: { div: 13000, link: 0, sMin: 1, sMax: 1.8, glow: false, pulse: false, nodeLinks: false, cursor: "web", mDist: 240, lineA: 0.5 },
  dense: { div: 9000, link: 95, sMin: 0.8, sMax: 1.4, glow: false, pulse: false, nodeLinks: true, cursor: "link", mDist: 150, lineA: 0.18 },
};

export default function NetworkBackground({ variant = "classic" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cfg = CONFIG[variant] || CONFIG.classic;

    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;
    const start = performance.now();
    const mouse = { x: -9999, y: -9999 };

    function init() {
      const count = Math.min(variant === "dense" ? 150 : 90, Math.floor((width * height) / cfg.div));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * (cfg.sMax - cfg.sMin) + cfg.sMin,
        color: palette[Math.floor(Math.random() * palette.length)],
        phase: Math.random() * Math.PI * 2,
        sp: Math.random() * 1.4 + 0.5,
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function render(time) {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (cfg.cursor === "repel") {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < cfg.mDist && d > 0.1) {
            const f = (1 - d / cfg.mDist) * 1.6;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (cfg.nodeLinks) {
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < cfg.link) {
              const [r, g, bl] = a.color;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${(1 - dist / cfg.link) * cfg.lineA})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        if (cfg.cursor === "link" || cfg.cursor === "web") {
          const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (md < cfg.mDist) {
            const [r, g, bl] = a.color;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${(1 - md / cfg.mDist) * cfg.lineA})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const [r, g, bl] = p.color;
        let size = p.size;
        let alpha = 0.85;
        if (cfg.pulse) {
          const pulse = 0.6 + 0.4 * Math.sin(time * p.sp + p.phase);
          size = p.size * (0.7 + pulse * 0.6);
          alpha = 0.5 + pulse * 0.4;
        }
        if (cfg.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${r}, ${g}, ${bl}, 0.8)`;
        }
        ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        if (cfg.glow) ctx.shadowBlur = 0;
      }
    }

    function tick(t) {
      render((t - start) / 1000);
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    if (reduce) render(0);
    else raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="tech-bg" aria-hidden="true" />;
}
