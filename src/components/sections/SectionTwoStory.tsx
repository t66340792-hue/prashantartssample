import { useEffect, useRef, useState, useCallback } from "react";
import { clips, weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";

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

export function SectionTwoStory() {
  const revealRef = useScrollReveal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingData.weddingDate);

  const videoSrc = clips.two ? clips.two.src : clips.one?.src;

  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Scratch card logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const brushSize = 30;

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
      
      // Base layer color
      ctx.fillStyle = "#E85B91"; // Rani pink theme for scratch layer
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add elegant pattern/texture
      ctx.strokeStyle = "#C9A24D"; // Gold
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width + canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(0, i);
        ctx.stroke();
      }

      ctx.fillStyle = "#C9A24D";
      ctx.font = "italic 20px 'Cormorant Garamond', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to Reveal", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0]!.clientX;
        clientY = e.touches[0]!.clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      isDrawing = true;
      setIsScratching(true);
      const pos = getMousePos(e);
      lastX = pos.x;
      lastY = pos.y;
      
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const pos = getMousePos(e);
      
      ctx.beginPath();
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      
      lastX = pos.x;
      lastY = pos.y;
      
      checkReveal();
    };

    const handleEnd = () => {
      isDrawing = false;
      setIsScratching(false);
    };

    const checkReveal = () => {
      if (isRevealed) return;
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalPixelsToCheck = pixels.length / 16;
      const percentRevealed = (transparentPixels / totalPixelsToCheck) * 100;

      if (percentRevealed > 60) {
        setIsRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  // Video intersection observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {
            console.log("Autoplay blocked");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div id="story" className="w-full flex flex-col bg-ivory">
      {/* Confetti canvas — fixed over FULL VIEWPORT, above everything */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />

      {/* Video Section with Scratch Card */}
      <section className="relative w-full h-screen overflow-hidden bg-ivory flex flex-col items-center justify-end pb-[12vh] md:pb-[15vh]">
        {/* Background Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={`${videoSrc}#t=0.001`}
            preload="metadata"
            // autoPlay removed to only play when in view
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
        )}

        {/* Content overlay */}
        <div ref={revealRef as any} className="reveal relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center">
          {/* Scratch Card Section */}
          <div className="flex flex-col items-center w-full">
            {/* Reduced size scratch card container */}
            <div 
              ref={containerRef}
              className={`relative w-full max-w-[200px] h-[120px] md:max-w-[240px] md:h-[150px] mx-auto rounded-xl overflow-hidden shadow-2xl transition-transform duration-700
                ${isRevealed ? "scale-105 shadow-gold ring-1 ring-gold/40" : "scale-100 ring-4 ring-gold"}
              `}
              style={{ backgroundColor: "var(--softwhite)" }}
            >
              {/* Content underneath */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 border-2 border-gold/30 m-1 rounded-lg">
                <h3 className="font-display text-xl md:text-2xl text-plum tracking-[0.1em] mb-1">
                  {weddingData.displayDate}
                </h3>
                <div className="gold-rule w-12 mb-1" />
                <p className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] text-ink/80 text-center leading-tight">
                  The Wedding<br/>Celebration
                </p>
                {isRevealed && (
                  <p className="absolute bottom-1 font-script text-sm md:text-lg text-gold animate-pulse">
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
              <div className="mt-2 animate-bounce opacity-80">
                <span className="text-lg drop-shadow-md">☝️</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section (Between Video 2 and Video 3) */}
      <section className={`w-full bg-ivory overflow-hidden transition-all duration-1000 ${isRevealed ? "max-h-[500px] py-12 md:py-16 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
            <h3 className="font-script text-3xl md:text-4xl text-rani mb-6">
              {isPast ? "The celebration has begun ❤️" : "Counting down to forever"}
            </h3>
            
            <div className="grid grid-cols-4 gap-2 md:gap-6 w-full px-2">
              <CountdownBlock value={days} label="Days" />
              <CountdownBlock value={hours} label="Hrs" />
              <CountdownBlock value={minutes} label="Min" />
              <CountdownBlock value={seconds} label="Sec" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  const formattedValue = value < 10 ? `0${value}` : value.toString();
  return (
    <div className="relative flex flex-col items-center justify-center w-[70px] h-[70px] md:w-24 md:h-24 mx-auto group">
      {/* SVG Heart Background */}
      <svg viewBox="0 0 32 29.6" className="absolute inset-0 w-full h-full drop-shadow-md text-rani/90 group-hover:text-rani transition-colors duration-300">
        <path fill="currentColor" d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
      
      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center mt-[-4px] md:mt-[-8px]">
        <span className="font-display text-lg md:text-2xl text-white mb-0 leading-none drop-shadow-sm font-medium">
          {formattedValue}
        </span>
        <span className="font-body text-[8px] md:text-[10px] uppercase tracking-widest text-white/90">
          {label}
        </span>
      </div>
    </div>
  );
}
