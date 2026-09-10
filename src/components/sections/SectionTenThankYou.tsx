import { useState, useEffect } from "react";
import { weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SectionTenThankYou() {
  const revealRef = useScrollReveal();

  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        animation: `petal-fall ${6 + Math.random() * 6}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`,
        drift: `${-60 + Math.random() * 120}px`,
      }))
    );
  }, []);

  return (
    <section className="relative w-full bg-ivory flex flex-col">
      {/* Text block */}
      <div className="relative w-full py-32 flex flex-col items-center justify-center text-center px-6 z-10 bg-ivory overflow-hidden">
        
        {/* Floating petals for the finale */}
        <div className="absolute inset-0 pointer-events-none" data-particle-layer>
          {particles.map((p, i) => (
            <div 
              key={i}
              className="absolute top-0 w-4 h-4 bg-rani opacity-50 rounded-tl-full rounded-br-full"
              style={{
                left: p.left,
                animation: p.animation,
                animationDelay: p.animationDelay,
                "--drift": p.drift
              } as any}
            />
          ))}
        </div>

        <div ref={revealRef as any} className="reveal max-w-2xl mx-auto flex flex-col items-center relative z-10">
          
          <h2 className="font-script text-5xl md:text-7xl text-gold mb-8">With Love</h2>
          
          <h3 className="font-display text-4xl md:text-6xl text-plum tracking-[0.15em] mb-2">
            {weddingData.groom.toUpperCase()}
          </h3>
          <span className="font-script text-3xl text-gold my-2">&amp;</span>
          <h3 className="font-display text-4xl md:text-6xl text-plum tracking-[0.15em] mb-12">
            {weddingData.bride.toUpperCase()}
          </h3>

          <p className="font-body text-ink/80 tracking-widest leading-relaxed max-w-md mx-auto mb-16 italic text-sm md:text-base">
            "We're truly grateful for your<br />
            love and support.<br /><br />
            Can't wait to celebrate this<br />
            special day with you!"
          </p>

          <h4 className="font-script text-5xl md:text-6xl text-rani mb-6">Thank You</h4>
          
          <p className="font-body uppercase tracking-[0.2em] text-ink/60 text-xs mt-12">
            Designed by @prashantarts
          </p>
        </div>
      </div>
    </section>
  );
}
