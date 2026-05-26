import { useEffect, useRef, useState } from "react";

export default function ScrollGlitchOverlay() {
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);
  const [glitch, setGlitch] = useState({
    opacity: 0,
    shift: 0,
    skew: 0,
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;

    const onScroll = () => {
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || window.pageYOffset;
        const velocity = Math.min(Math.abs(currentScrollY - lastScrollY.current), 80);
        const intensity = Math.min(velocity / 80, 1);

        setGlitch({
          opacity: intensity * 0.18,
          shift: intensity * 10,
          skew: intensity * 0.45,
        });

        lastScrollY.current = currentScrollY;
        frameRef.current = null;

        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setGlitch({ opacity: 0, shift: 0, skew: 0 });
        }, 120);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeoutRef.current);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      className="scroll-glitch-overlay"
      style={{
        "--scroll-glitch-opacity": glitch.opacity,
        "--scroll-glitch-shift": `${glitch.shift}px`,
        "--scroll-glitch-skew": `${glitch.skew}deg`,
      }}
      aria-hidden="true"
    >
      <div className="scroll-glitch-slice scroll-glitch-slice-top" />
      <div className="scroll-glitch-slice scroll-glitch-slice-middle" />
      <div className="scroll-glitch-slice scroll-glitch-slice-bottom" />
    </div>
  );
}
