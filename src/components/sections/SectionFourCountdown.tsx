import { useCountdown } from "@/hooks/useCountdown";
import { weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SectionFourCountdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingData.weddingDate);
  const revealRef = useScrollReveal();

  return (
    <section className="relative w-full py-24 flex items-center justify-center bg-ivory overflow-hidden">
      
      {/* Decorative floral hints */}
      <div className="absolute top-0 right-10 w-32 h-32 bg-mint opacity-20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-40 h-40 bg-gold opacity-10 rounded-full blur-[80px] pointer-events-none" />

      <div ref={revealRef as any} className="reveal max-w-4xl w-full mx-auto px-6 text-center z-10">
        
        <h2 className="font-display text-3xl md:text-5xl text-teal mb-16 tracking-widest uppercase">
          Counting down to our forever
        </h2>

        {isPast ? (
          <div className="panel-cream rounded-2xl p-12 max-w-xl mx-auto shadow-lux border-gold/30 ring-1 ring-gold/20">
            <h3 className="font-script text-4xl md:text-5xl text-rani">
              The celebration has begun ❤️
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
            <CountdownBlock value={days} label="Days" />
            <CountdownBlock value={hours} label="Hours" />
            <CountdownBlock value={minutes} label="Minutes" />
            <CountdownBlock value={seconds} label="Seconds" />
          </div>
        )}

      </div>
    </section>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  // Format with leading zero
  const formattedValue = value < 10 ? `0${value}` : value.toString();

  return (
    <div className="panel-cream rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lux border-gold/20 relative overflow-hidden group hover:border-gold/50 transition-colors duration-500">
      {/* Inner glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="font-display text-4xl md:text-6xl text-plum mb-2 tracking-wider relative z-10 font-medium tabular-nums">
        {formattedValue}
      </span>
      <span className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-ink/60 relative z-10">
        {label}
      </span>
    </div>
  );
}
