import { Reveal } from "./Reveal";

export function GoldDivider({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Reveal
      variant="line"
      delay={delay}
      className={`mx-auto flex w-full max-w-xs items-center gap-3 ${className}`}
    >
      <span className="gold-rule flex-1" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true">
        <path
          d="M12 2c1.6 4 4.4 6.8 8.4 8.4-4 1.6-6.8 4.4-8.4 8.4-1.6-4-4.4-6.8-8.4-8.4C7.6 8.8 10.4 6 12 2z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
      <span className="gold-rule flex-1" />
    </Reveal>
  );
}

export function MandalaRing({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 200 200"
      className={`animate-slow-spin text-gold ${className}`}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle
        cx="100"
        cy="100"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="3 5"
      />
      {petals.map((i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i} 100 100)`}>
          <ellipse
            cx="100"
            cy="26"
            rx="4.5"
            ry="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <circle cx="100" cy="46" r="1.2" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 260" className={className} aria-hidden="true">
      <path
        d="M60 258C60 190 58 150 60 120"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        opacity="0.7"
      />
      <ellipse
        cx="60"
        cy="70"
        rx="42"
        ry="66"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <ellipse
        cx="60"
        cy="68"
        rx="26"
        ry="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.7"
      />
      <ellipse cx="60" cy="66" rx="14" ry="20" fill="currentColor" opacity="0.25" />
      <ellipse cx="60" cy="64" rx="7" ry="10" fill="currentColor" opacity="0.55" />
      {Array.from({ length: 18 }, (_, i) => (
        <line
          key={i}
          x1="60"
          y1="70"
          x2={60 + Math.cos((i / 18) * Math.PI * 2) * 44}
          y2={70 + Math.sin((i / 18) * Math.PI * 2) * 68}
          stroke="currentColor"
          strokeWidth="0.35"
          opacity="0.28"
        />
      ))}
    </svg>
  );
}

export function FloralCorners({ className = "" }: { className?: string }) {
  const corner = (
    <svg viewBox="0 0 80 80" className="h-12 w-12 text-gold" aria-hidden="true">
      <path
        d="M2 2c26 0 44 12 52 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
      <path d="M2 2c0 26 12 44 34 52" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
      <circle cx="8" cy="8" r="2.6" fill="currentColor" />
      <path
        d="M22 14c6-4 12-2 14 4-6 3-11 2-14-4zM14 22c-4 6-2 12 4 14 3-6 2-11-4-14z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  );
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute left-2 top-2">{corner}</div>
      <div className="absolute right-2 top-2 rotate-90">{corner}</div>
      <div className="absolute bottom-2 right-2 rotate-180">{corner}</div>
      <div className="absolute bottom-2 left-2 -rotate-90">{corner}</div>
    </div>
  );
}
