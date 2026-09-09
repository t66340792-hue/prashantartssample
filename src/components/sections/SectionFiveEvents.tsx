import { clips, weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapButton } from "@/components/MapButton";

export function SectionFiveEvents() {
  const revealRef = useScrollReveal();
  const videoSrc = clips.three?.src;
  const posterSrc = clips.three?.poster;

  return (
    <section id="events" className="w-full bg-ivory flex flex-col">
      
      <div className="w-full px-6 py-16 md:py-20 text-center">
        <div ref={revealRef as any} className="reveal">
          <h2 className="font-script text-5xl md:text-6xl text-gold mb-2">Our Wedding</h2>
          <h3 className="font-display text-3xl md:text-5xl text-plum tracking-[0.15em] uppercase">
            Celebrations
          </h3>
          <div className="gold-rule max-w-[150px] mx-auto mt-6" />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {videoSrc && (
          <video
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[100dvh] object-contain block opacity-90"
            style={{ filter: "saturate(1.2)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <MapButton />
      </div>
    </section>
  );
}
