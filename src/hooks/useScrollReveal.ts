import { useEffect, useRef } from "react";

export function useScrollReveal(options = { threshold: 0.15, rootMargin: "0px" }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        // Optionally unobserve after revealing if we only want it to happen once
        // observer.unobserve(el);
      }
    }, options);

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
}
