import { useCallback, useEffect, useRef, useState } from "react";
import { weddingData } from "@/config/wedding";
import { FloralCorners, GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

const REVEAL_THRESHOLD = 0.66;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Burst({ show }: { show: boolean }) {
  if (!show) return null;
  const bits = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2;
    const r = 90 + (i % 5) * 34;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, d: (i % 7) * 40, rose: i % 3 === 0 };
  });
  return (
    <div
      data-particle-layer
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {bits.map((b, i) => (
        <span
          key={i}
          className={`absolute h-2 w-2 rounded-full ${b.rose ? "bg-rani" : "bg-gold"}`}
          style={{
            boxShadow: "0 0 10px currentColor",
            animation: `burst-out 1.5s ease-out ${b.d}ms forwards`,
            ["--bx" as string]: `${b.x}px`,
            ["--by" as string]: `${b.y}px`,
          }}
        />
      ))}
    </div>
  );
}

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const checkTick = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const reduced = useReducedMotion();

  const paintCover = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#E7D3AE");
    g.addColorStop(0.35, "#C9A24D");
    g.addColorStop(0.6, "#F0E0BC");
    g.addColorStop(1, "#B8913F");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // peacock-feather inspired pattern on the foil
    ctx.strokeStyle = "rgba(22,124,122,0.28)";
    ctx.lineWidth = 1;
    for (let y = 18; y < rect.height + 40; y += 34) {
      for (let x = 18; x < rect.width + 40; x += 34) {
        ctx.beginPath();
        ctx.ellipse(x, y, 9, 13, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x, y, 3.5, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(84,40,79,0.22)";
        ctx.fill();
      }
    }
    ctx.globalCompositeOperation = "source-over";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paintCover(canvas);
    const onResize = () => {
      if (!revealed) paintCover(canvas);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintCover, revealed]);

  useEffect(() => {
    if (reduced) setRevealed(true);
  }, [reduced]);

  const scratchedRatio = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return 0;
    const step = 8;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if ((data[i] ?? 255) < 40) clear++;
    }
    return total ? clear / total : 0;
  };

  const scratchTo = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 21, 0, Math.PI * 2);
    ctx.fill();
    last.current = { x, y };

    checkTick.current += 1;
    if (checkTick.current % 8 === 0 && scratchedRatio() > REVEAL_THRESHOLD) {
      setRevealed(true);
    }
  };

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <section
      id="date"
      className="relative overflow-hidden bg-background px-5 py-24"
      aria-label="Scratch to reveal the wedding date"
    >
      <div className="relative z-10 mx-auto max-w-md text-center">
        <Reveal as="h2" className="font-script text-4xl text-rani sm:text-5xl">
          A little surprise awaits...
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="mt-3 font-body text-[0.72rem] tracking-[0.28em] text-muted-foreground uppercase"
        >
          Scratch to reveal our special day
        </Reveal>
        <GoldDivider className="my-8" delay={200} />

        <Reveal delay={260} className="relative">
          <div
            className="relative mx-auto aspect-[16/10] w-full max-w-sm overflow-hidden rounded-2xl"
            style={{ boxShadow: revealed ? "var(--shadow-gold)" : "var(--shadow-lux)" }}
          >
            {/* prize layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(140deg,var(--softwhite),color-mix(in_oklab,var(--rani)_14%,var(--ivory)))] px-5">
              <FloralCorners />
              <p className="font-body text-[0.6rem] tracking-[0.34em] text-teal uppercase">
                Save the date
              </p>
              <p className="mt-2 font-display text-4xl tracking-[0.1em] text-plum sm:text-5xl">
                15 JULY 2026
              </p>
              <span className="gold-rule my-3 w-32" />
              <p className="font-body text-[0.62rem] tracking-[0.3em] text-muted-foreground uppercase">
                The Wedding Celebration
              </p>
            </div>

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
                revealed ? "pointer-events-none opacity-0" : "cursor-crosshair opacity-100"
              }`}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                drawing.current = true;
                setTouched(true);
                const p = pos(e);
                last.current = p;
                scratchTo(p.x, p.y);
              }}
              onPointerMove={(e) => {
                if (!drawing.current) return;
                const p = pos(e);
                scratchTo(p.x, p.y);
              }}
              onPointerUp={() => {
                drawing.current = false;
                last.current = null;
                if (scratchedRatio() > REVEAL_THRESHOLD) setRevealed(true);
              }}
              onPointerLeave={() => {
                drawing.current = false;
                last.current = null;
              }}
            />

            {!revealed && !touched && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="animate-soft-pulse rounded-full bg-plum/70 px-4 py-2 font-body text-[0.68rem] tracking-[0.24em] text-softwhite uppercase">
                  Scratch here ✨
                </span>
              </div>
            )}

            <Burst show={revealed} />
          </div>
        </Reveal>

        <p
          className={`mt-8 font-script text-4xl text-teal transition-all duration-1000 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Save the Date
        </p>
      </div>
    </section>
  );
}
