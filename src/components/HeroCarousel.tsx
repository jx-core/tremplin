"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroCarousel({
  slides,
  interval = 6000,
}: {
  slides: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (n < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => setI((p) => (p + 1) % n), Math.max(2000, interval));
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [n, interval]);

  if (n === 0) return null;

  return (
    <>
      <div className="absolute inset-0 z-0" aria-hidden>
        {slides.map((src, idx) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover transition-opacity duration-[1200ms] ease-in-out"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundPosition: "center 35%",
              opacity: idx === i ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className="absolute left-0 right-0 bottom-11 z-[4] flex items-center justify-center gap-3.5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Diaporama">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Image ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[3px] rounded-sm transition-all duration-300 ${
                idx === i
                  ? "w-10 bg-cream-yellow"
                  : "w-6 bg-[rgba(253,246,234,0.3)] hover:bg-[rgba(253,246,234,0.55)]"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-on-dark-muted tracking-[0.1em] min-w-[48px] text-center">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}
