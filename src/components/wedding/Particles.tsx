import { useMemo } from "react";

type Tone = "gold" | "marigold" | "rose" | "mint";

const toneClass: Record<Tone, string> = {
  gold: "bg-gold",
  marigold: "bg-gold-soft",
  rose: "bg-rani",
  mint: "bg-mint",
};

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Slow falling petals — pure CSS transforms, no JS loop. */
export function PetalRain({
  count = 14,
  tone = "rose",
  className = "",
}: {
  count?: number;
  tone?: Tone;
  className?: string;
}) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 1) * 100,
        size: 7 + seeded(i + 20) * 10,
        duration: 12 + seeded(i + 40) * 14,
        delay: -seeded(i + 60) * 20,
        drift: (seeded(i + 80) - 0.5) * 220,
        opacity: 0.35 + seeded(i + 100) * 0.4,
      })),
    [count],
  );

  return (
    <div
      data-particle-layer
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {petals.map((p, i) => (
        <span
          key={i}
          className={`absolute top-0 ${toneClass[tone]}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.62,
            opacity: p.opacity,
            borderRadius: "70% 30% 65% 35% / 60% 65% 35% 40%",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Floating gold dust rising slowly. */
export function GoldDust({ count = 18, className = "" }: { count?: number; className?: string }) {
  const dust = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 3) * 100,
        size: 2 + seeded(i + 33) * 4,
        duration: 16 + seeded(i + 53) * 18,
        delay: -seeded(i + 73) * 24,
        drift: (seeded(i + 93) - 0.5) * 160,
      })),
    [count],
  );

  return (
    <div
      data-particle-layer
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dust.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px currentColor",
            animation: `float-up ${d.duration}s linear ${d.delay}s infinite`,
            ["--drift" as string]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Hanging fairy lights for the evening section. */
export function FairyLights({ className = "" }: { className?: string }) {
  const bulbs = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 90" preserveAspectRatio="none" className="h-full w-full text-gold">
        <path
          d="M0 6 Q125 62 250 12 Q375 62 500 12 Q625 62 750 12 Q875 62 1000 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.55"
        />
      </svg>
      <div className="absolute inset-0">
        {bulbs.map((i) => {
          const t = i / (bulbs.length - 1);
          const wave = Math.abs(Math.sin(t * Math.PI * 4));
          return (
            <span
              key={i}
              data-particle-layer
              className="animate-soft-pulse absolute h-2 w-2 rounded-full bg-gold"
              style={{
                left: `${t * 100}%`,
                top: `${8 + (1 - wave) * 44}px`,
                boxShadow: "0 0 12px 3px currentColor",
                animationDelay: `${(i % 6) * 0.35}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
