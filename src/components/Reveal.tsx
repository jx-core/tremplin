"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Adds .is-in when the element enters the viewport (removes on exit, like the legacy site).
   Content is always in the DOM (good for SEO); the no-JS override in layout keeps it visible. */
export default function Reveal({
  className = "",
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={`reveal ${inView ? "is-in" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
