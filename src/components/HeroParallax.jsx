// src/components/HeroParallax.jsx
import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Importar imágenes
import cieloImage from '../assets/parallex/cielo.webp';
import cloud1Image from '../assets/parallex/cloud 1.webp';
import cloud2Image from '../assets/parallex/cloud 2.webp';
import cloud3Image from '../assets/parallex/cloud 3.webp';
import cloud4Image from '../assets/parallex/cloud 4.webp';
import cloud5Image from '../assets/parallex/cloud 5.webp';
import astroImage from '../assets/parallex/new astro (1).webp';

/*
  HeroParallax Combinado:
  - Animaciones de entrada del código 2
  - Estructura y configuración responsive del código 1
  - Nubes más grandes y mejor distribuidas
  - Prioriza vista móvil pero funciona responsive
  - Astronauta centrado horizontalmente (cambio solicitado)
*/

export default function HeroParallax() {
  const containerRef = useRef(null);
  const latestScroll = useRef(0);
  const rafRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [containerHeight, setContainerHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 360
  );

  // ---------- Lectura optimizada de scroll (rAF) ----------
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

  // ---------- Medir contenedor (alto / ancho) ----------
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      setContainerHeight(el?.clientHeight ?? window.innerHeight);
      setContainerWidth(el?.clientWidth ?? window.innerWidth);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ---------------- CONFIGURACIÓN ACTUALIZADA ----------------
  const MOBILE_BREAKPOINT_PX = 768;

  // Nubes más grandes: 60-65% del alto del contenedor
  const cloudHeightRatioMobile = 0.65; // 70% del alto en móvil
  const cloudHeightRatioDesktop = 0.60; // 60% en desktop

  // Offset bottom (negativo para centrar mejor las nubes)
  const cloudBottomOffsetMobile = -containerHeight * 0.18;
  const cloudBottomOffsetDesktop = -containerHeight * 0.28;

  // Astronauta: posición inicial más arriba
  const astroBaseOffsetMobile = -containerHeight * 0.15; // Más arriba en móvil
  const astroBaseOffsetDesktop = -containerHeight * 0.15; // Más arriba en desktop

  // Astronauta: velocidad de descenso
  const astroSpeedMobile = 0.9;
  const astroSpeedDesktop = 0.6;

  // Astronauta: límite de desplazamiento hacia abajo
  const astroMaxMobile = containerHeight * 0.5;
  const astroMaxDesktop = containerHeight * 0.65;

  // Astronauta: tamaños
  const astroWidthMobile = Math.round(containerWidth * 0.90); // ~90% ancho contenedor en móvil
  const astroWidthDesktop = 340; // px en desktop
  // ------------------------------------------------------------

  const useMobileLayout = containerWidth < MOBILE_BREAKPOINT_PX;

  // Calcular valores finales
  const cloudHeightPx = Math.round(
    containerHeight * (useMobileLayout ? cloudHeightRatioMobile : cloudHeightRatioDesktop)
  );
  const cloudBottomOffset = useMobileLayout ? cloudBottomOffsetMobile : cloudBottomOffsetDesktop;

  const ASTRO_BASE_OFFSET = useMobileLayout ? astroBaseOffsetMobile : astroBaseOffsetDesktop;
  const ASTRO_SPEED_MULT = useMobileLayout ? astroSpeedMobile : astroSpeedDesktop;
  const ASTRO_MAX_OFFSET = useMobileLayout ? astroMaxMobile : astroMaxDesktop;
  const ASTRO_WIDTH_PX = useMobileLayout ? astroWidthMobile : astroWidthDesktop;

  // Parallax transforms mejorados
  const skyTransform = `translateY(${scrollY * 0.015}px)`;
  
  // Astronauta: combinación base + desplazamiento por scroll (limitado)
  const computedYOffset = Math.min(scrollY * ASTRO_SPEED_MULT, ASTRO_MAX_OFFSET);
  const astroOuterTranslateY = ASTRO_BASE_OFFSET + computedYOffset;

  // --- Framer Motion variants mejorados ---
  const astroFloat = {
    y: [0, -12, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  const cloudDriftSmall = {
    x: [0, 6, 0, -6, 0],
    transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
  };
  const cloudDriftMedium = {
    x: [0, -8, 0, 8, 0],
    transition: { duration: 24, repeat: Infinity, ease: 'easeInOut' }
  };
  const cloudDriftLarge = {
    x: [0, 10, 0, -10, 0],
    transition: { duration: 28, repeat: Infinity, ease: 'easeInOut' }
  };

  // Variante para el parallax de nubes con scroll
  const cloudParallaxY = scrollY * 0.25;

  // ------------------ RENDER ------------------
  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero Visión LEX"
    >
      {/* Fondo: cielo con animación de entrada */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${cieloImage})`,
          transform: skyTransform,
          willChange: 'transform'
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        aria-hidden
      />

      {/* Overlay para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3f0f4f]/40 z-5" aria-hidden />

      {/* Texto y CTA con animaciones de entrada del código 2 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full px-4 z-50 pointer-events-none">
        <div className="max-w-xs mx-auto text-center pointer-events-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-1"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            VISIÓN LEX
          </motion.h1>
          <motion.p 
            className="text-xs sm:text-sm text-white/90 drop-shadow-md mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            prendas que trascienden lo ordinario
          </motion.p>
          <div className="flex justify-center">
            <motion.button 
              className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#3f0f4f] transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Descubrir Colección
            </motion.button>
          </div>
        </div>
      </div>

      {/* ASTRONAUTA con animaciones mejoradas
          ------- CAMBIO REALIZADO: ahora centrado horizontalmente y posicionado con top (ajustable) -------
      */}
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: '50%',
          top: useMobileLayout ? '35%' : '40%', // ajusta aquí si quieres más arriba/abajo
          transform: `translate(-50%, ${astroOuterTranslateY}px)`,
          willChange: 'transform',
          transition: 'transform 120ms linear'
        }}
        aria-hidden
      >
        <motion.div
          animate={astroFloat}
          className="relative flex items-center justify-center"
        >
          <motion.img
            src={astroImage}
            alt="Astronauta Vision LEX"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.6 },
              scale: { duration: 1, delay: 0.6 },
              y: { duration: 1, delay: 0.6 }
            }}
            className="object-contain drop-shadow-2xl"
            style={{
              width: '800px',      // tamaño fijo
              maxWidth: '100%',     // límite relativo al contenedor
              pointerEvents: 'none'
            }}
            loading="eager"
          />
        </motion.div>
      </div>

      {/* NUBES MEJORADAS con animaciones de entrada */}
      {/* Cloud 1 - izquierda principal */}
      <motion.div
        className="absolute z-40 opacity-90 pointer-events-none"
        style={{
          bottom: `${cloudBottomOffset}px`,
          left: useMobileLayout ? '-25%' : '-12%',
          height: `${cloudHeightPx}px`,
          width: 'auto',
          transform: `translateY(${cloudParallaxY}px)`,
          willChange: 'transform'
        }}
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 0.9 }}
        transition={{ duration: 1.8, delay: 1, ease: 'easeOut' }}
        aria-hidden
      >
        <motion.img
          src={cloud1Image}
          alt="Nube 1"
          style={{ height: '100%', width: 'auto', display: 'block' }}
          animate={cloudDriftLarge}
          loading="eager"
        />
      </motion.div>

      {/* Cloud 2 - derecha principal */}
      <motion.div
        className="absolute z-40 opacity-85 pointer-events-none"
        style={{
          bottom: `${cloudBottomOffset}px`,
          right: useMobileLayout ? '-60%' : '-10%',
          height: `${cloudHeightPx}px`,
          width: 'auto',
          transform: `translateY(${cloudParallaxY}px)`,
          willChange: 'transform'
        }}
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 0.85 }}
        transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }}
        aria-hidden
      >
        <motion.img
          src={cloud2Image}
          alt="Nube 2"
          style={{ height: '100%', width: 'auto', display: 'block' }}
          animate={cloudDriftMedium}
          loading="eager"
        />
      </motion.div>

      {/* Cloud 3 - centro (la más prominente) */}
      <motion.div
        className="absolute z-40 opacity-95 pointer-events-none"
        style={{
          bottom: `${Math.round(cloudBottomOffset * 0.9)}px`,
          left: '50%',
          transform: `translateX(-50%) translateY(${cloudParallaxY}px)`,
          height: `${Math.round(cloudHeightPx * 1.1)}px`, // 10% más grande
          width: 'auto',
          willChange: 'transform'
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 0.95 }}
        transition={{ duration: 1.8, delay: 1.4, ease: 'easeOut' }}
        aria-hidden
      >
        <motion.img
          src={cloud3Image}
          alt="Nube 3"
          style={{ height: '100%', width: 'auto', display: 'block' }}
          animate={cloudDriftSmall}
          loading="eager"
        />
      </motion.div>

      {/* Cloud 4 - centro-derecha */}
      <motion.div
        className="absolute z-40 opacity-88 pointer-events-none"
        style={{
          bottom: `${Math.round(cloudBottomOffset * 0.4)}px`,
          right: useMobileLayout ? '-20%' : '15%',
          height: `${cloudHeightPx}px`,
          width: 'auto',
          transform: `translateY(${cloudParallaxY}px)`,
          willChange: 'transform'
        }}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 0.88 }}
        transition={{ duration: 1.8, delay: 1.6, ease: 'easeOut' }}
        aria-hidden
      >
        <motion.img
          src={cloud4Image}
          alt="Nube 4"
          style={{ height: '100%', width: 'auto', display: 'block' }}
          animate={cloudDriftMedium}
          loading="eager"
        />
      </motion.div>

      {/* Cloud 5 - centro-izquierda */}
      <motion.div
        className="absolute z-40 opacity-83 pointer-events-none"
        style={{
          bottom: `${Math.round(cloudBottomOffset * 0.6)}px`,
          left: useMobileLayout ? '-60%' : '18%',
          height: `${cloudHeightPx}px`,
          width: 'auto',
          transform: `translateY(${cloudParallaxY}px)`,
          willChange: 'transform'
        }}
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 0.83 }}
        transition={{ duration: 1.8, delay: 1.8, ease: 'easeOut' }}
        aria-hidden
      >
        <motion.img
          src={cloud5Image}
          alt="Nube 5"
          style={{ height: '100%', width: 'auto', display: 'block' }}
          animate={cloudDriftLarge}
          loading="eager"
        />
      </motion.div>

      {/* partículas pequeñas decorativas */}
      <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
        <div className="absolute top-1/4 left-1/6 w-[3px] h-[3px] bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/7 left-1/4 w-[3px] h-[3px] bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[4px] h-[4px] bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-2/4 w-[4px] h-[4px] bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/3 left-1/3 w-[6px] h-[6px] bg-white rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/4 right-1/6 w-[6px] h-[6px] bg-white rounded-full animate-pulse delay-1500" />
      </div>
    </section>
  );
}
