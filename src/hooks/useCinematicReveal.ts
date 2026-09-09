import { useEffect, useRef, useState } from "react";

/**
 * Tracks visibility of an element and returns its intersection state.
 * Used to trigger cinematic entrance animations on video sections 3-6.
 */
export function useCinematicReveal(threshold = 0.25) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible) setHasBeenVisible(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return { ref, isVisible, hasBeenVisible };
}
