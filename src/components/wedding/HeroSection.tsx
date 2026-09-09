import { useEffect, useState } from "react";
import { clips, weddingData } from "@/config/wedding";
import { VideoBackdrop } from "./VideoBackdrop";
import { GoldDust } from "./Particles";
import { MandalaRing } from "./Ornaments";

export function HeroSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [600, 2600, 4200, 5400].map((ms, i) =>
      window.setTimeout(() => setStep(i + 1), ms),
    );
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const on = (n: number) =>
    step >= n
      ? "opacity-100 translate-y-0 blur-0"
      : "opacity-0 translate-y-6 blur-[6px] pointer-events-none";

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <VideoBackdrop clip={clips.one} overlay="soft" />
      <GoldDust count={16} />

      <MandalaRing className="pointer-events-none absolute -right-24 top-10 h-72 w-72 opacity-20 sm:h-96 sm:w-96" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <div
          className={`transition-all duration-1000 ease-out ${step >= 1 && step < 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} ${step >= 3 ? "hidden" : ""}`}
        >
          <p className="font-script text-3xl text-gold-soft sm:text-4xl">Two hearts</p>
          <p
            className={`mt-2 font-display text-xl tracking-[0.32em] text-softwhite/90 uppercase transition-all duration-1000 sm:text-2xl ${step >= 2 ? "opacity-100" : "opacity-0"}`}
          >
            One beautiful journey
          </p>
        </div>

        <div className={`transition-all duration-[1400ms] ease-out ${on(3)}`}>
          <p className="font-script text-2xl text-mint sm:text-3xl">The Wedding of</p>
          <h1 className="mt-3 font-display text-5xl uppercase tracking-[0.16em] text-softwhite sm:text-7xl">
            {weddingData.groom}
          </h1>
          <div className="my-3 flex items-center justify-center gap-4">
            <span className="gold-rule w-16" />
            <span className="text-gilded font-script text-4xl leading-none">&amp;</span>
            <span className="gold-rule w-16" />
          </div>
          <h1 className="font-display text-5xl uppercase tracking-[0.16em] text-softwhite sm:text-7xl">
            {weddingData.bride}
          </h1>
          <p className="mt-6 font-body text-xs tracking-[0.42em] text-gold-soft uppercase">
            {weddingData.displayDate}
          </p>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-8 z-10 text-center transition-opacity duration-1000 ${step >= 4 ? "opacity-100" : "opacity-0"}`}
      >
        <p className="font-body text-[0.7rem] tracking-[0.3em] text-softwhite/80 uppercase">
          Scroll to begin our story
        </p>
        <div className="animate-scroll-hint mt-2 text-lg text-gold">↓</div>
      </div>
    </section>
  );
}
