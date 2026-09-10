import { useState, useRef, useEffect } from "react";
import { clips } from "@/config/wedding";

let globalAudio: HTMLAudioElement | null = null;

export function SectionOneIntro() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  // alreadySeen is always false on SSR; set client-side after mount
  const [alreadySeen, setAlreadySeen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Run only on client after hydration — safe to read sessionStorage here
  useEffect(() => {
    setMounted(true);
    const seen = window.sessionStorage.getItem("introSeen") === "true";
    setAlreadySeen(seen);
    if (seen) setIsVideoFinished(true);
  }, []);

  // Lock scroll only while video is actively playing (first visit)
  useEffect(() => {
    if (!mounted) return; // don't touch overflow until mounted
    if (!isVideoFinished) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoFinished, mounted]);

  if (!clips.one) return null;

  const handleOpenInvitation = () => {
    setHasStarted(true);
    
    if (typeof window !== 'undefined') {
      if (!globalAudio) {
        globalAudio = new Audio('/music.mp3');
        globalAudio.loop = true;
      }
      globalAudio.play().catch((err) => console.error("Audio play failed:", err));
    }

    videoRef.current?.play().catch((err) => {
      console.error("Video play failed:", err);
    });
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
    window.sessionStorage.setItem("introSeen", "true");
    window.dispatchEvent(new Event("firstVideoFinished"));
  };

  // Before mount, render the same default HTML for both server and client
  // to avoid hydration mismatch
  if (!mounted) {
    return (
      <section id="home" className="relative w-full h-screen overflow-hidden bg-ivory flex items-center justify-center">
        <video
          src={`${clips.one.src}#t=0.001`}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none opacity-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 z-20 opacity-100 scale-100">
          <button className="panel-cream px-10 py-4 rounded-full border border-gold/50 shadow-gold text-plum font-display uppercase tracking-widest text-lg">
            Open Invitation
          </button>
        </div>
      </section>
    );
  }

  // Already seen — show unblocked minimal section
  if (alreadySeen) {
    return (
      <section id="home" className="relative w-full h-screen overflow-hidden bg-ivory flex items-center justify-center">
        <video
          src={`${clips.one.src}#t=0.001`}
          preload="metadata"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/90 animate-scroll-hint z-10">
          <span className="text-xs uppercase tracking-[0.3em] mb-2 font-medium">Scroll to begin</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    );
  }

  // First visit — full experience with scroll lock
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-ivory flex items-center justify-center">
      <video
        ref={videoRef}
        src={`${clips.one.src}#t=0.001`}
        preload="metadata"
        muted={!hasStarted}
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none transition-opacity duration-1000 ${hasStarted && !isVideoFinished ? "opacity-0" : "opacity-100"}`} />

      <div className={`absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 z-20 transition-all duration-1000 ${hasStarted ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"}`}>
        <button
          onClick={handleOpenInvitation}
          className="panel-cream px-10 py-4 rounded-full border border-gold/50 shadow-gold text-plum font-display uppercase tracking-widest text-lg hover:bg-white transition-colors duration-300 pointer-events-auto"
        >
          Open Invitation
        </button>
      </div>

      {isVideoFinished && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/90 animate-scroll-hint z-10">
          <span className="text-xs uppercase tracking-[0.3em] mb-2 font-medium text-shadow">Scroll to begin our story</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </section>
  );
}
