// src/components/HeroSection.jsx

import { motion, useScroll, useTransform } from "framer-motion";
import hero from '../assets/hero/movil.mp4';
import heroDesktop from '../assets/hero/video-desktop.mp4';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();

  // Textos — mismos desplazamientos originales
  const prendasX       = useTransform(scrollYProgress, [0, 1], [0, -6000]);
  const coincideX      = useTransform(scrollYProgress, [0, 1], [0, 6000]);
  const styleX         = useTransform(scrollYProgress, [0, 1], [0, -6000]);
  const brillarY       = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const brillarScale   = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const colombianoX    = useTransform(scrollYProgress, [0, 1], [0, 6000]);
  const colombianoRotate = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const parrafoY       = useTransform(scrollYProgress, [0, 1], [0, 4000]);
  const parrafoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
  const imagenScale    = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const imagenY        = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="text-center py-2 bg-transparent relative overflow-hidden">

      {/* ── PATRÓN DE FONDO GEOMÉTRICO — igual que NewArrivals ── */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── ETIQUETA TÉCNICA SUPERIOR — estilo Corteiz/NewArrivals ── */}
      <div className="relative z-10 flex items-center justify-center gap-4 pt-4 pb-1">
        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
          DROP CODE: ITW_DS_01 // MEDELLIN, COL
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
        <p className="text-white text-xs tracking-[0.3em] font-montserrat uppercase font-bold">
          — EN TEMPORADA
        </p>
        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
          COORD: 6.2442° N, 75.5812° W
        </span>
      </div>

      {/* ── TÍTULOS — fuentes y desplazamientos originales intactos ── */}
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white mt-12 lg:mt-5 relative z-10 mb-10">

        <motion.span
          style={{ x: prendasX }}
          className="font-montserrat font-black text-3xl md:text-5xl lg:text-7xl block mb-3"
        >
          PRENDAS
        </motion.span>

        <motion.span
          style={{ x: coincideX }}
          className="font-rock text-4xl md:text-6xl lg:text-7xl block mb-1"
        >
          QUE COINCIDE
        </motion.span>

        <motion.span
          style={{ x: styleX }}
          className="font-rock text-4xl md:text-6xl lg:text-7xl block mb-2 mt-2"
        >
          Con Tu Style
        </motion.span>

        <motion.div
          style={{ y: brillarY, scale: brillarScale }}
          className="font-londrina text-6xl md:text-8xl lg:text-9xl text-purple-300 inline-block"
        >
          SIN MIEDO A BRILLAR
        </motion.div>

        <br />

        <motion.div
          style={{ y: colombianoX, rotate: colombianoRotate }}
          className="font-dancing text-3xl md:text-5xl lg:text-7xl text-purple-300 inline-block"
        >
          %100 Colombianos
        </motion.div>

        <br />
      </h1>

      {/* ── PÁRRAFO — misma lógica original + código técnico ── */}
      <motion.div
        style={{ y: parrafoY, opacity: parrafoOpacity }}
        className="mt-1 relative z-10 flex flex-col items-center gap-1"
      >
        <p className="text-gray-500 font-montserrat text-sm tracking-widest">
          marcas para gente chimbita.
        </p>
        <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase hidden lg:block">
          RTW // STREETWEAR // 1 OF 7 PCS
        </span>
      </motion.div>

      {/* ── IMAGEN MÓVIL — igual que antes ── */}
      <motion.div className="relative z-10 mt-4 lg:hidden">
        {/* Tag técnico sobre imagen */}
        <div className="absolute top-3 left-3 z-20 flex gap-2 pointer-events-none">
          <span className="text-[8px] font-mono text-white/40 tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-white/10">
            ITW_DS_01
          </span>
          <span className="text-[8px] font-mono text-green-400 tracking-widest uppercase bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20 font-bold">
            1 / 7 PCS
          </span>
        </div>
        <motion.video
          src={hero}
          autoPlay
          loop
          muted
          playsInline
          style={{ scale: imagenScale, y: imagenY }}
          className="w-full rounded-md"
        />
        {/* Borde inferior decorativo */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </motion.div>

      {/* ── IMAGEN DESKTOP — igual que antes ── */}
      <motion.div className="relative z-10 mt-4 hidden lg:block">
        {/* Tags técnicos sobre imagen desktop */}
        <div className="absolute top-4 left-4 z-20 flex gap-2 pointer-events-none">
          <span className="text-[8px] font-mono text-white/40 tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-white/10">
            ITW_DS_01
          </span>
          <span className="text-[8px] font-mono text-green-400 tracking-widest uppercase bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20 font-bold">
            1 / 7 PCS
          </span>
        </div>

        {/* Mira holográfica centrada — igual que NewArrivals */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-32 h-32 rounded-full border border-green-400/0 group-hover:border-green-400/20 transition-all duration-500 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-green-400/10" />
            <div className="absolute h-full w-[1px] bg-green-400/10" />
            <div className="w-2 h-2 rounded-full bg-green-400/20 shadow-md shadow-green-400/30" />
          </div>
        </div>

        <motion.video
          src={heroDesktop}
          autoPlay
          loop
          muted
          playsInline
          style={{ scale: imagenScale, y: imagenY }}
          className="w-full rounded-md"
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </motion.div>

      {/* ── FOOTER INFO — coordenadas + CTA sutil, estilo NewArrivals ── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 md:px-16 lg:px-24 border-t border-white/10 bg-transparent mt-">
        <p className="text-white/20 text-xs font-montserrat tracking-widest uppercase">
          Hecho con obsesión en Medellín
        </p>
        <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase hidden sm:block">
          COORD: 6.2442° N, 75.5812° W // SEASON 01
        </span>
      </div>

    </section>
  );
}

