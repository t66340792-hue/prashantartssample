import { clips, weddingData } from "@/config/wedding";
import { MapButton } from "@/components/MapButton";

export function SectionSevenSangeet() {
  const videoSrc = clips.five?.src;
  const posterSrc = clips.five?.poster;
  const event = weddingData.events.find(e => e.id === "sangeet");

  if (!event) return null;

  return (
    <section className="relative w-full bg-black overflow-hidden">
      {videoSrc && (
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
        />
      )}
      <MapButton />
    </section>
  );
}
