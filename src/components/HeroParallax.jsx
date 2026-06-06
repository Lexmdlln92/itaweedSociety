// src/components/HeroParallax.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

// Importar imágenes
import cieloImage from '../assets/parallex/cielo.webp';
import cloud1Image from '../assets/parallex/cloud 1.webp';
import cloud2Image from '../assets/parallex/cloud 2.webp';
import cloud3Image from '../assets/parallex/cloud 3.webp';
import cloud4Image from '../assets/parallex/cloud 4.webp';
import cloud5Image from '../assets/parallex/cloud 5.webp';
import astroImage from '../assets/parallex/new astro (1).webp';
import logoLex from "../assets/logo LEX.png";

export default function HeroParallax() {
  const containerRef = useRef(null);
  const latestScroll = useRef(0);
  const rafRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [containerWidth, setContainerWidth] = useState(360);

  // ---------- Control de Scroll Optimizado ----------
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      latestScroll.current = window.scrollY || window.pageYOffset;
      if (!ticking) {
        ticking = true;
        rafRef.current = window.requestAnimationFrame(() => {
          setScrollY(latestScroll.current);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ---------- Control de Dimensiones Adaptativas ----------
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = containerWidth < 768;

  // ---------- Parallax Tuning ----------
  const skyParallaxY = scrollY * 0.10;
  const astroParallaxY = scrollY * 0.72;     // Caída rápida del astro detrás de las nubes
  const cloudParallaxY = scrollY * 0.12;    // Movimiento mínimo para retener cobertura

  // Variaciones de deriva y pivote vertical orgánico para las nubes
  const cloudDriftAndPivot = (xValue, duration = 25) => ({
    x: [0, xValue, 0],
    y: [-6, 6, -6],
    transition: { duration, repeat: Infinity, ease: "easeInOut" }
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[85vh] w-full overflow-hidden bg-[#07050a] "
      aria-label="Vision LEX Drop Parallax Screen"
    >
      {/* MALLA TÉCNICA GEOMÉTRICA */}
      <div
        className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none lg:mb-4"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "40px 40px" : "80px 80px",
        }}
      />

      {/* ANCLAJE ABSOLUTO SUPERIOR: METADATA DE DROP (z-50) */}
      <div className="absolute top-4 left-0 w-full z-50 px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
          <div className="flex items-center gap-3 mx-auto md:mx-0 text-center md:text-left">
            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            <span>ITAWEED // LEX_2026</span>
          </div>
          <div className="hidden md:flex flex-col items-end text-right">
            <span>VISIONARY ARC // 01</span>
            <span className="text-white/10 mt-0.5 text-[9px]">COORD: 6.1732° N // 75.6041° W</span>
          </div>
        </div>
      </div>

      {/* GRADIENTES DE AMBIENTACIÓN INDUSTRIAL */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-20 pointer-events-none" />
      
      {/* GRADIENTE INFERIOR RESTAURADO (z-45): Delante de nubes, detrás de textos */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-[#07050a] via-[#07050a]/85 to-transparent z-45 pointer-events-none" />

      {/* -----------------------------------------------------
         CAPA BASE [z-0]: CIELO / ESPACIO PROFUNDO
      ----------------------------------------------------- */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${cieloImage})`,
          y: skyParallaxY,
        }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* -----------------------------------------------------
         CAPA 1 [z-10]: ASTRONAUTA
      ----------------------------------------------------- */}
      <motion.div
        className="absolute top-[11%] md:top-[11%] left-0 w-full flex items-center justify-center md:justify-start md:pl-24 lg:pl-50 z-10 pointer-events-none"
        style={{ y: astroParallaxY }}
      >
        <div className="relative w-[63%] md:w-[20%] max-w-[420px]">
          <motion.img
            src={astroImage}
            alt="Astro Aspect"
            className="w-full h-auto drop-shadow-[0_25px_30px_rgba(139,92,246,0.18)] select-none"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* -----------------------------------------------------
         CAPA 2 [z-40]: NUBES MASIVAS
         Móvil: Conserva intactos los valores h-[80%] y los bottoms originales
         Desktop (md): Limita la altura general a la mitad del contenedor (md:h-[50%])
         y fuerza a que las imágenes se hundan/ajusten al ras inferior del viewport.
      ----------------------------------------------------- */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[80%] md:h-[55%] z-40 pointer-events-none"
        style={{ y: cloudParallaxY }}
      >
        {/* Nube 4 - Trasera Base Profunda */}
        <div className="absolute bottom-[-5%] md:bottom-[-150%] left-[-15%] w-[80%] opacity-30 mix-blend-screen">
          <motion.img src={cloud4Image} animate={cloudDriftAndPivot(-8, 28)} className="w-full h-auto" />
        </div>

        {/* Nube 5 - Trasera Base Profunda */}
        <div className="absolute bottom-[-5%] md:bottom-[-150%] right-[-15%] w-[85%] opacity-25 mix-blend-screen">
          <motion.img src={cloud5Image} animate={cloudDriftAndPivot(10, 26)} className="w-full h-auto" />
        </div>

        {/* Nube 1 - Intermedia Izquierda Gigante */}
        <div className="absolute bottom-[-2%] md:bottom-[-70%] left-[-25%] w-[95%] md:w-[75%] opacity-90 mix-blend-screen">
          <motion.img src={cloud1Image} animate={cloudDriftAndPivot(-14, 24)} className="w-full h-auto" />
        </div>

        {/* Nube 2 - Intermedia Derecha Gigante */}
        <div className="absolute bottom-[-2%] md:bottom-[-150%] right-[-25%] w-[95%] md:w-[75%] opacity-90 mix-blend-screen">
          <motion.img src={cloud2Image} animate={cloudDriftAndPivot(14, 24)} className="w-full h-auto" />
        </div>

        {/* Nube 3 - Cierre Frontal del Drop Absoluto */}
        <div className="absolute bottom-[-6%] md:bottom-[-320%] left-1/2 -translate-x-1/2 w-[185%] md:w-[140%] opacity-95">
          <motion.img src={cloud3Image} animate={cloudDriftAndPivot(6, 20)} className="w-full h-auto" />
        </div>
      </motion.div>

      {/* -----------------------------------------------------
         CAPA 3 [z-50]: TEXTOS PRINCIPALES Y LOGO (Fijos en el frente total)
      ----------------------------------------------------- */}
      <div className="absolute inset-0 w-full z-50 pointer-events-none flex flex-col justify-start px-6 pt-76 md:pt-40">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-start h-full relative">
          
          {/* Bloque de títulos y textos descriptivos */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right md:ml-auto">
            <h2 className="font-sans font-black tracking-tighter text-7xl md:text-[180px] text-white uppercase leading-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)]">
              MAJESTIC
            </h2>
            
            <div className="mt-4 md:mt-6 w-full max-w-[480px] md:max-w-[260px] drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] ">
              <img
                src={logoLex}
                alt="LEX Logo"
                className="w-full h-auto object-contain select-none pointer-events-none"
                style={{
                  filter: "invert(42%) sepia(93%) saturate(1352%) hue-rotate(231deg) brightness(97%) contrast(95%)"
                }}
              />
            </div>

            {/* Texto Descriptivo */}
            <p className="text-white font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] opacity-8xl pt-2 mt-2 max-w-[290px] md:max-w-md leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Consigue las prendas del drop exclusivo de la calle de la mano con LEX.
            </p>
          </div>

          <div className="hidden md:block absolute bottom-12 left-0 font-mono text-[9px] text-purple-400/30 tracking-widest text-right">
            <span>[ SYSTEM_DEPLOY: ACTIVE ]</span>
          </div>

        </div>
      </div>

      {/* PARTÍCULAS AMBIENTALES DE SOPORTE */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{
              top: `${10 + Math.random() * 40}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.10 + Math.random() * 0.25,
            }}
          />
        ))}
      </div>
    </section>
  );
}