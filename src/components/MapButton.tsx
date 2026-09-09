import { MapPin } from "lucide-react";
import { weddingData } from "@/config/wedding";

export function MapButton() {
  const href = weddingData.mapUrl || "https://maps.google.com";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full border border-white/20 text-white/90 transition-all duration-300 hover:scale-105 group shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      aria-label="View Location Map"
    >
      <MapPin className="w-4 h-4 group-hover:animate-bounce" />
      <span className="font-body text-xs uppercase tracking-[0.15em] font-medium mt-[2px]">Map</span>
    </a>
  );
}
