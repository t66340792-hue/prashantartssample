import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/config/wedding";

type Props = {
  clip: Clip;
  /** Overlay strength: cream washes for bright scenes, night for dark ones. */
  overlay?: "cream" | "night" | "soft";
  className?: string;
};

const overlays: Record<NonNullable<Props["overlay"]>, string> = {
  cream:
    "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ivory)_78%,transparent)_0%,color-mix(in_oklab,var(--ivory)_46%,transparent)_45%,color-mix(in_oklab,var(--ivory)_86%,transparent)_100%)]",
  night:
    "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--plum)_82%,black)_0%,color-mix(in_oklab,var(--plum)_46%,black)_45%,color-mix(in_oklab,var(--plum)_86%,black)_100%)]",
  soft: "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--plum)_46%,transparent)_0%,color-mix(in_oklab,var(--ink)_22%,transparent)_50%,color-mix(in_oklab,var(--plum)_52%,transparent)_100%)]",
};

/**
 * Full-bleed wedding film. Loads only when scrolled near, keeps aspect with
 * object-cover, and falls back to the poster frame (then a gradient) on error.
 */
export function VideoBackdrop({ clip, overlay = "soft", className = "" }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const v = videoRef.current;
          if (entry.isIntersecting) {
            setActive(true);
            void v?.play().catch(() => undefined);
          } else {
            v?.pause();
          }
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[var(--gradient-night)]" />
      {clip && !failed && (
        <>
          {clip.poster && (
            <img
              src={clip.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <video
            ref={videoRef}
            {...(active ? { src: clip.src } : {})}
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className={`animate-ken-burns absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
      <div className={`absolute inset-0 ${overlays[overlay]}`} />
    </div>
  );
}
