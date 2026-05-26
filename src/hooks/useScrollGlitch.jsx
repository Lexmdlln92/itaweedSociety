import { useEffect, useRef } from "react";

export default function useScrollGlitch() {
  const lastScrollY = useRef(0);
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Evitar ejecutar si el usuario prefiere movimiento reducido
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return undefined;

    // Inicializar el valor actual de scroll
    lastScrollY.current = window.scrollY || window.pageYOffset;

    const onScroll = () => {
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || window.pageYOffset;
        // Calcular la velocidad (diferencia de píxeles desde el último frame)
        const velocity = Math.min(Math.abs(currentScrollY - lastScrollY.current), 100);

        // Umbral mínimo de velocidad muy bajo para activarse casi de inmediato (antigravity)
        if (velocity > 1) {
          // Divisor menor para alcanzar la intensidad máxima con menor esfuerzo de scroll (antigravity)
          const intensity = Math.min(velocity / 40, 1); // Valor de 0 a 1
          
          // Mapeo controlado para el movimiento lateral pero manteniendo scanlines visibles (antigravity)
          const shift = intensity * 12;      // Máximo 12px de desplazamiento (más controlado)
          const skew = intensity * 0.8;      // Inclinación de hasta 0.8 grados (sutil)
          const opacity = intensity * 0.60;  // Mantiene hasta 45% de opacidad en scanlines/interferencias

          // Aplicar directamente al DOM para evitar re-renders innecesarios en React (antigravity)
          document.body.style.setProperty("--scroll-glitch-shift", `${shift}px`);
          document.body.style.setProperty("--scroll-glitch-skew", `${skew}deg`);
          document.body.style.setProperty("--scroll-glitch-opacity", `${opacity}`);
          document.body.classList.add("scroll-glitch-active");
        }

        lastScrollY.current = currentScrollY;
        frameRef.current = null;

        // Limpiar timeout previo y programar remover el glitch cuando cese el movimiento
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        
        timeoutRef.current = window.setTimeout(() => {
          document.body.classList.remove("scroll-glitch-active");
          document.body.style.removeProperty("--scroll-glitch-shift");
          document.body.style.removeProperty("--scroll-glitch-skew");
          document.body.style.removeProperty("--scroll-glitch-opacity");
        }, 120); // 120ms después del último scroll se limpia el efecto
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      
      // Limpieza preventiva
      document.body.classList.remove("scroll-glitch-active");
      document.body.style.removeProperty("--scroll-glitch-shift");
      document.body.style.removeProperty("--scroll-glitch-skew");
      document.body.style.removeProperty("--scroll-glitch-opacity");
    };
  }, []);
}
