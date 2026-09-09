import { clips, weddingData } from "@/config/wedding";
import { VideoBackdrop } from "./VideoBackdrop";
import { GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

const tones = {
  mint: { ring: "border-mint/70", dot: "bg-mint", title: "text-teal" },
  rani: { ring: "border-rani/60", dot: "bg-rani", title: "text-rani" },
  gold: { ring: "border-gold/70", dot: "bg-gold", title: "text-gold" },
  plum: { ring: "border-plum/50", dot: "bg-plum", title: "text-plum" },
} as const;

export function EventTimeline() {
  return (
    <section id="events" className="relative overflow-hidden px-5 py-24">
      <VideoBackdrop clip={clips.three} overlay="cream" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal as="h2" className="text-center font-display text-4xl uppercase tracking-[0.16em] text-plum sm:text-5xl">
          Our Wedding
          <span className="font-script block text-5xl normal-case tracking-normal text-rani sm:text-6xl">
            Celebrations
          </span>
        </Reveal>
        <GoldDivider className="my-10" delay={140} />

        <div className="relative">
          <span className="absolute left-4 top-0 h-full w-px bg-[var(--gradient-gold)] sm:left-1/2" />
          <ul className="space-y-8">
            {weddingData.events.map((ev, i) => {
              const tone = tones[ev.tone];
              const right = i % 2 === 1;
              return (
                <li key={ev.id} className="relative">
                  <Reveal
                    delay={i * 120}
                    className={`ml-11 sm:ml-0 sm:w-[calc(50%-2.25rem)] ${right ? "sm:ml-auto" : ""}`}
                  >
                    <div
                      className={`panel-cream rounded-2xl border ${tone.ring} px-6 py-6 ${right ? "sm:text-right" : ""}`}
                    >
                      <p className="font-body text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                        {ev.date}
                      </p>
                      <h3
                        className={`mt-2 font-display text-2xl uppercase tracking-[0.12em] ${tone.title} sm:text-3xl`}
                      >
                        {ev.title}
                      </h3>
                      <span className={`gold-rule my-3 block w-24 ${right ? "sm:ml-auto" : ""}`} />
                      <p className="font-display text-xl text-plum">{ev.time}</p>
                      <p className="mt-1 font-body text-[0.68rem] tracking-[0.2em] text-muted-foreground uppercase">
                        {ev.note}
                      </p>
                    </div>
                  </Reveal>
                  <span
                    className={`absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full ${tone.dot} ring-4 ring-[color-mix(in_oklab,var(--softwhite)_70%,transparent)] sm:left-1/2`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
