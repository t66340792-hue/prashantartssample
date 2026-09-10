import { useEffect, useRef, useState, useCallback } from "react";
import { weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  rotation: number; rotSpeed: number;
  size: number;
  color: string;
  opacity: number;
  shape: "rect" | "circle";
};

const COLORS = ["#E85B91", "#ff90bb", "#ff4d7d", "#ffb3d0", "#ff1a6b", "#C9A24D", "#ffd6e7", "#ff69a5", "#E85B91", "#ff1493"];

export function SectionThreeDate() {
  const revealRef = useScrollReveal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // confetti canvas is FIXED over the entire viewport
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // ── Confetti blast ────────────────────────────────────────────
  const launchConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    // Size canvas to full viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get card center in viewport coordinates
    const cardRect = containerRef.current?.getBoundingClientRect();
    const cx = cardRect ? cardRect.left + cardRect.width / 2 : canvas.width / 2;
    const cy = cardRect ? cardRect.top + cardRect.height / 2 : canvas.height / 2;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    // Spawn 150 particles from the card's centre
    particlesRef.current = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 14;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        rotation: Math.random() * 360,
        rotSpeed: -8 + Math.random() * 16,
        size: 6 + Math.random() * 9,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        opacity: 1,
        shape: Math.random() > 0.35 ? "rect" : "circle",
      };
    });

    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;    // gravity
        p.vx *= 0.98;   // air drag
        p.rotation += p.rotSpeed;
        p.opacity -= 0.014;
        if (p.opacity <= 0) continue;
        alive = true;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  // ── Scratch card logic ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const brushSize = 40;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        fillCanvas();
      }
    };

    const fillCanvas = () => {
      if (!ctx || isRevealed) return;
      ctx.fillStyle = "#E85B91";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#C9A24D";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width + canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(0, i);
        ctx.stroke();
      }

      ctx.fillStyle = "#C9A24D";
      ctx.font = "italic 24px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to Reveal", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = "touches" in e ? e.touches[0]! : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      isDrawing = true;
      setIsScratching(true);
      const pos = getPos(e);
      lastX = pos.x; lastY = pos.y;
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x; lastY = pos.y;
      checkReveal();
    };

    const handleEnd = () => { isDrawing = false; setIsScratching(false); };

    const checkReveal = () => {
      if (isRevealed) return;
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) transparentPixels++;
      }
      const pct = (transparentPixels / (pixels.length / 16)) * 100;
      if (pct > 65) {
        setIsRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 🎊 FIRE!
        launchConfetti();
      }
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isRevealed, launchConfetti]);

  return (
    <section id="date" className="relative w-full min-h-screen py-24 flex items-center justify-center bg-ivory text-center px-4 overflow-hidden">

      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rani opacity-5 rounded-full blur-[120px] pointer-events-none" />

      {/* Confetti canvas — fixed over FULL VIEWPORT, above everything */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />

      <div ref={revealRef as any} className="reveal max-w-2xl w-full mx-auto flex flex-col items-center">

        <h2 className="font-script text-4xl md:text-5xl text-plum mb-2">A little surprise awaits...</h2>
        <p className="font-body tracking-widest uppercase text-sm text-ink/60 mb-12">
          Scratch to reveal our special day
        </p>

        {/* Scratch Card */}
        <div
          ref={containerRef}
          className={`relative w-full max-w-[400px] h-[250px] mx-auto rounded-xl overflow-hidden shadow-2xl transition-transform duration-700
            ${isRevealed ? "scale-105 shadow-gold ring-1 ring-gold/40" : "scale-100 ring-4 ring-gold"}
          `}
          style={{ backgroundColor: "var(--softwhite)" }}
        >
          {/* Content underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 border-2 border-gold/30 m-2 rounded-lg">
            <h3 className="font-display text-4xl md:text-5xl text-plum tracking-[0.1em] mb-4">
              {weddingData.displayDate}
            </h3>
            <div className="gold-rule w-24 mb-4" />
            <p className="font-body text-sm md:text-base uppercase tracking-[0.25em] text-ink/80">
              The Wedding Celebration
            </p>
            {isRevealed && (
              <p className="absolute bottom-4 font-script text-2xl text-gold animate-pulse">
                Save the Date
              </p>
            )}
          </div>

          {/* Scratch Layer */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full touch-none cursor-crosshair transition-opacity duration-1000 ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          />
        </div>

        {!isRevealed && !isScratching && (
          <div className="mt-8 animate-bounce opacity-60">
            <span className="text-2xl">☝️</span>
          </div>
        )}

      </div>
    </section>
  );
}
