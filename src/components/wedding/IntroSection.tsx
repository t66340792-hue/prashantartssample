import { clips, weddingData } from "@/config/wedding";
import { VideoBackdrop } from "./VideoBackdrop";
import { Reveal } from "./Reveal";
import { FloralCorners, GoldDivider, PeacockFeather } from "./Ornaments";

export function IntroSection() {
  return (
    <section
      id="story"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24"
    >
      <VideoBackdrop clip={clips.two} overlay="cream" />

      <PeacockFeather className="pointer-events-none absolute -left-6 top-12 h-56 w-28 text-teal opacity-25 sm:h-80 sm:w-40" />
      <PeacockFeather className="pointer-events-none absolute -right-6 bottom-12 h-56 w-28 rotate-180 text-teal opacity-20 sm:h-80 sm:w-40" />

      <Reveal className="panel-cream relative z-10 w-full max-w-md rounded-3xl px-7 py-12 text-center sm:max-w-lg sm:px-12">
        <FloralCorners />

        <Reveal as="p" delay={80} className="font-script text-3xl text-teal sm:text-4xl">
          Together with our families
        </Reveal>

        <GoldDivider className="my-6" delay={160} />

        <Reveal
          as="p"
          delay={240}
          className="font-body text-sm leading-7 tracking-[0.06em] text-muted-foreground"
        >
          We request your gracious presence with family
          <br />
          on the occasion of the wedding of
        </Reveal>

        <Reveal delay={340} className="mt-8">
          <h2 className="font-display text-4xl uppercase tracking-[0.18em] text-plum sm:text-5xl">
            {weddingData.groom}
          </h2>
          <p className="mt-2 font-body text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase">
            {weddingData.groomParents}
          </p>
        </Reveal>

        <Reveal delay={420} className="my-7 flex items-center justify-center gap-4">
          <span className="gold-rule w-14" />
          <span className="font-script text-4xl text-rani">&amp;</span>
          <span className="gold-rule w-14" />
        </Reveal>

        <Reveal delay={500}>
          <h2 className="font-display text-4xl uppercase tracking-[0.18em] text-plum sm:text-5xl">
            {weddingData.bride}
          </h2>
          <p className="mt-2 font-body text-[0.72rem] tracking-[0.14em] text-muted-foreground uppercase">
            {weddingData.brideParents}
          </p>
        </Reveal>

        <GoldDivider className="mt-9" delay={580} />
      </Reveal>
    </section>
  );
}
