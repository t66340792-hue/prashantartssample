import { clips, weddingData } from "@/config/wedding";
import { MapButton } from "@/components/MapButton";

export function SectionEightBaraat() {
  const videoSrc = clips.six?.src;
  const posterSrc = clips.six?.poster;

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
