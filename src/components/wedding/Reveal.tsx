import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "fade" | "line";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  as,
  variant = "fade",
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const Tag = (as ?? "div") as ElementType;
  const base = variant === "line" ? "reveal-line" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
