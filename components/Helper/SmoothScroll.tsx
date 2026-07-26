// components/Helper/SmoothScroll.tsx
"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const target = useRef(0);
  const current = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    target.current = window.scrollY;
    current.current = window.scrollY;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = Math.min(Math.max(target.current + e.deltaY, 0), max);
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    }

    function update() {
      current.current += (target.current - current.current) * 0.12; // easing strength
      if (Math.abs(target.current - current.current) < 0.5) {
        current.current = target.current;
        ticking.current = false;
      } else {
        requestAnimationFrame(update);
      }
      window.scrollTo(0, current.current);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}

