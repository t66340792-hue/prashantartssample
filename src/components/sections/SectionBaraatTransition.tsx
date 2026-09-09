import { useCinematicReveal } from "@/hooks/useCinematicReveal";
import { useState, useEffect } from "react";

type Star = { width: string; height: string; top: string; left: string; opacity: number; animation: string; animationDelay: string; };

export function SectionBaraatTransition() {
  const { ref, isVisible } = useCinematicReveal(0.3);
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars only on client to avoid SSR/hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, () => ({
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        top: `${Math.random() * 75}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0.3 + Math.random() * 0.7,
        animation: `soft-pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 4}s`,
      }))
    );
  }, []);

  return (
    <section
      ref={ref as any}
      className="relative w-full overflow-hidden bg-[#0a0118] flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      {/* Starry night sky */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: s.width,
              height: s.height,
              top: s.top,
              left: s.left,
              opacity: s.opacity,
              animation: s.animation,
              animationDelay: s.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div
        className="absolute top-12 right-24 w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fffde7, #f0c040)",
          boxShadow: "0 0 60px 20px rgba(240,192,64,0.25), 0 0 120px 40px rgba(240,192,64,0.1)",
        }}
      />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#1a1a2e]" />
      {/* Road markings */}
      <div className="absolute bottom-12 left-0 right-0 flex gap-16 px-8" style={{ overflow: "hidden" }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="h-2 flex-shrink-0 rounded"
            style={{ width: 60, background: "rgba(255,255,255,0.2)" }}
          />
        ))}
      </div>

      {/* Centre text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 select-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 0.2s",
        }}
      >
        <p
          className="font-script text-4xl md:text-6xl mb-2"
          style={{ color: "#C9A24D", textShadow: "0 0 30px rgba(201,162,77,0.6)" }}
        >
          Baraat is arriving…
        </p>
        <p className="font-body text-white/50 uppercase tracking-[0.3em] text-xs">
          16 July 2026
        </p>
      </div>

      {/* ── Animated car ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-28 z-20"
        style={{
          animation: isVisible ? "baraat-drive 3.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards" : "none",
          left: "-260px",
        }}
      >
        {/* Car SVG — decorated baraat car */}
        <svg
          width="220"
          height="110"
          viewBox="0 0 220 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chassis shadow */}
          <ellipse cx="110" cy="108" rx="90" ry="4" fill="rgba(0,0,0,0.5)" />

          {/* Car body */}
          <rect x="20" y="50" width="180" height="48" rx="10" fill="#2d1a5e" />

          {/* Car roof / cabin */}
          <path d="M55 50 Q65 20 90 18 L145 18 Q165 18 170 50 Z" fill="#3d2070" />

          {/* Windshield */}
          <path d="M62 50 Q70 28 90 26 L135 26 Q152 28 158 50 Z" fill="#5b8dee" opacity="0.7" />

          {/* Side windows */}
          <rect x="60" y="30" width="35" height="18" rx="4" fill="#5b8dee" opacity="0.6" />
          <rect x="103" y="30" width="45" height="18" rx="4" fill="#5b8dee" opacity="0.6" />

          {/* Gold trim */}
          <rect x="20" y="60" width="180" height="4" rx="2" fill="#C9A24D" />
          <rect x="20" y="90" width="180" height="3" rx="1.5" fill="#C9A24D" opacity="0.6" />

          {/* Wheels */}
          <circle cx="60" cy="100" r="16" fill="#1a1a2e" stroke="#C9A24D" strokeWidth="3" />
          <circle cx="60" cy="100" r="8" fill="#333" stroke="#C9A24D" strokeWidth="2" />
          <circle cx="60" cy="100" r="3" fill="#C9A24D" />
          <circle cx="155" cy="100" r="16" fill="#1a1a2e" stroke="#C9A24D" strokeWidth="3" />
          <circle cx="155" cy="100" r="8" fill="#333" stroke="#C9A24D" strokeWidth="2" />
          <circle cx="155" cy="100" r="3" fill="#C9A24D" />

          {/* Decorative flowers on roof */}
          {[75, 95, 115, 135].map((x, i) => (
            <g key={i} transform={`translate(${x}, 14)`}>
              <circle cx="0" cy="0" r="5" fill={i % 2 === 0 ? "#E85B91" : "#C9A24D"} opacity="0.9" />
              <circle cx="0" cy="-6" r="3" fill={i % 2 === 0 ? "#E85B91" : "#C9A24D"} opacity="0.7" />
              <circle cx="6" cy="0" r="3" fill={i % 2 === 0 ? "#E85B91" : "#C9A24D"} opacity="0.7" />
              <circle cx="-6" cy="0" r="3" fill={i % 2 === 0 ? "#E85B91" : "#C9A24D"} opacity="0.7" />
              <circle cx="0" cy="6" r="3" fill={i % 2 === 0 ? "#E85B91" : "#C9A24D"} opacity="0.7" />
            </g>
          ))}

          {/* Marigold garland on body */}
          {[30, 50, 70, 90, 110, 130, 150, 170, 190].map((x, i) => (
            <circle key={i} cx={x} cy="64" r="3" fill={i % 2 === 0 ? "#f59e0b" : "#E85B91"} opacity="0.9" />
          ))}

          {/* Headlights */}
          <ellipse cx="200" cy="68" rx="7" ry="5" fill="#fff9c4" opacity="0.95" />
          <ellipse cx="200" cy="68" rx="4" ry="3" fill="white" />

          {/* Tail lights */}
          <rect x="18" y="64" width="8" height="6" rx="2" fill="#ef4444" opacity="0.9" />

          {/* Exhaust puff  */}
          <circle cx="14" cy="90" r="4" fill="white" opacity="0.12" />
          <circle cx="6" cy="88" r="3" fill="white" opacity="0.08" />
          <circle cx="0" cy="86" r="2" fill="white" opacity="0.05" />
        </svg>

        {/* Headlight beam */}
        <div
          className="absolute"
          style={{
            top: "34px",
            left: "218px",
            width: "120px",
            height: "18px",
            background: "linear-gradient(90deg, rgba(255,249,196,0.6), transparent)",
            clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0 60%)",
          }}
        />
      </div>

      {/* Road dust trail */}
      <div
        className="absolute bottom-28 z-10"
        style={{
          animation: isVisible ? "baraat-dust 3.2s ease 0.4s forwards" : "none",
          left: "-260px",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              top: `${50 + i * 4}px`,
              left: `${-i * 15}px`,
              opacity: 0.04 + i * 0.02,
              filter: "blur(4px)",
            }}
          />
        ))}
      </div>

      {/* "Arrived!" tag that pops in after car stops */}
      <div
        className="absolute bottom-36 z-30 text-center"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          animation: isVisible ? "arrived-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 3.8s both" : "none",
          opacity: 0,
        }}
      >
        <div
          className="px-6 py-2 rounded-full font-body text-xs uppercase tracking-widest text-white border border-white/20"
          style={{ background: "rgba(201,162,77,0.25)", backdropFilter: "blur(8px)" }}
        >
          🎊 The Baraat has arrived!
        </div>
      </div>

      <style>{`
        @keyframes baraat-drive {
          0%   { left: -260px; }
          75%  { left: calc(50% - 110px); }
          82%  { left: calc(50% - 95px); }
          88%  { left: calc(50% - 105px); }
          93%  { left: calc(50% - 100px); }
          100% { left: calc(50% - 110px); }
        }
        @keyframes baraat-dust {
          0%   { left: -300px; opacity: 1; }
          75%  { opacity: 1; }
          100% { left: calc(50% - 260px); opacity: 0; }
        }
        @keyframes arrived-pop {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.5); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </section>
  );
}
