import { useEffect, useState } from "react";
import { weddingDate } from "@/config/wedding";
import { GoldDivider } from "./Ornaments";
import { GoldDust } from "./Particles";
import { Reveal } from "./Reveal";

type Parts = { days: number; hours: number; minutes: number; seconds: number } | null;

function diff(target: number): Parts {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="panel-cream relative flex min-w-[4.4rem] flex-1 flex-col items-center rounded-2xl px-2 py-4 sm:min-w-24 sm:py-6">
      <span
        key={text}
        className="font-display text-3xl leading-none text-plum tabular-nums sm:text-5xl"
        style={{ animation: "scale-in 0.35s ease-out" }}
      >
        {text}
      </span>
      <span className="mt-2 font-body text-[0.55rem] tracking-[0.24em] text-teal uppercase sm:text-[0.62rem]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const target = new Date(weddingDate).getTime();
  const [parts, setParts] = useState<Parts>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setParts(diff(target));
    setReady(true);
    const id = window.setInterval(() => setParts(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--background),color-mix(in_oklab,var(--mint)_22%,var(--background)))] px-5 py-24">
      <GoldDust count={12} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Reveal as="h2" className="font-script text-4xl text-teal sm:text-5xl">
          Counting down to our forever
        </Reveal>
        <GoldDivider className="my-8" delay={120} />

        {ready && !parts ? (
          <Reveal as="p" className="font-display text-2xl text-plum sm:text-3xl">
            The celebration has begun ❤️
          </Reveal>
        ) : (
          <Reveal delay={180} className="flex items-stretch justify-center gap-2 sm:gap-4">
            <Unit value={parts?.days ?? 0} label="Days" />
            <Unit value={parts?.hours ?? 0} label="Hours" />
            <Unit value={parts?.minutes ?? 0} label="Minutes" />
            <Unit value={parts?.seconds ?? 0} label="Seconds" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
