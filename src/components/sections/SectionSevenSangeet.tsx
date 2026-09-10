import { clips, weddingData } from "@/config/wedding";
import { MapButton } from "@/components/MapButton";

export function SectionSevenSangeet() {
  const videoSrc = clips.five?.src;
  const posterSrc = clips.five?.poster;
  const event = weddingData.events.find(e => e.id === "sangeet");

  if (!event) return null;

  return (
    <section className="relative w-full bg-ivory overflow-hidden">
      {videoSrc && (
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-h-[100dvh] object-contain block mx-auto"
        />
      )}
      <MapButton />
    </section>
  );
}
