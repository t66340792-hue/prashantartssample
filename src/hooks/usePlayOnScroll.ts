import { useEffect, RefObject } from 'react';

export function usePlayOnScroll(videoRef: RefObject<HTMLVideoElement | null>, playOnce: boolean = false, threshold: number = 0.5) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
          if (playOnce) {
            observer.disconnect();
          }
        } else if (entry && !entry.isIntersecting && videoRef.current && !playOnce) {
          videoRef.current.pause();
        }
      },
      { threshold }
    );

    const currentRef = videoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoRef, playOnce, threshold]);
}
