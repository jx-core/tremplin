"use client";
import { useEffect, useRef, useState } from "react";
import type { ResultBar } from "@/db/types";
import { formatPercent } from "@/lib/format";

export default function ResultsBars({ bars }: { bars: ResultBar[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        }),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {bars.map((b) => {
        const pct = Math.max(0, Math.min(100, b.value));
        return (
          <div key={b.id} className="mb-[22px] last:mb-0">
            <div className="flex justify-between items-baseline mb-2 gap-3.5">
              <div className="font-semibold text-[14.5px] text-white">{b.name}</div>
              <div
                className="font-display font-semibold text-[30px] leading-none text-cream-yellow"
                style={{ fontFeatureSettings: '"tnum" 1' }}
              >
                {formatPercent(b.value)}
              </div>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(202,153,0,0.12)" }}
            >
              <div className="bar-fill h-full rounded-full bg-cream-yellow" style={{ width: show ? `${pct}%` : "0%" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
