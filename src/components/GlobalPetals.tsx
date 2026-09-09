import { useState, useEffect } from "react";

export function GlobalPetals() {
  const [showPetals, setShowPetals] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const handleVideoFinished = () => {
      setShowPetals(true);
    };

    window.addEventListener("firstVideoFinished", handleVideoFinished);

    return () => {
      window.removeEventListener("firstVideoFinished", handleVideoFinished);
    };
  }, []);

  useEffect(() => {
    if (showPetals) {
      setParticles(
        [...Array(5)].map(() => ({
          left: `${Math.random() * 100}%`,
          animation: `petal-fall ${12 + Math.random() * 8}s linear infinite`,
          animationDelay: `${Math.random() * 10}s`,
          drift: `${-80 + Math.random() * 160}px`,
          scale: 0.5 + Math.random() * 0.5,
        }))
      );
    }
  }, [showPetals]);

  if (!showPetals) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[100]">
      {particles.map((p, i) => (
        <div 
          key={i}
          className="absolute top-0 opacity-40"
          style={{
            left: p.left,
            animation: p.animation,
            animationDelay: p.animationDelay,
            "--drift": p.drift,
          } as any}
        >
          <div 
            className="w-4 h-4 bg-rani rounded-tl-full rounded-br-full"
            style={{
              transform: `scale(${p.scale})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
