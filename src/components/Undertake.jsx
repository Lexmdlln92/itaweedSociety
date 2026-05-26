// src/components/Undertake.jsx
import { useRef } from "react";


void motion;
import { useNavigate } from "react-router-dom";

export default function Undertake() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Capturar el scroll sobre la sección para los efectos de movimiento Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Desplazamiento horizontal opuesto para las tipografías gigantes decorativas del fondo
  const xLeft = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const xRight = useTransform(scrollYProgress, [0, 1], [120, -120]);

  // Movimiento vertical suave del contenedor de texto principal
  const yContent = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={containerRef}
      className="bg-black text-white py-24 px-6 md:px-16 lg:px-24 overflow-hidden relative border-t border-b border-white/10 "
    >
      {/* ── TEXTOS DE FONDO GIGANTES EN PARALLAX ── */}
      <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between py-12 z-0">
        {/* Fila superior deslizándose a la derecha */}
        <motion.div 
          className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black uppercase leading-none text-white/[0.015] font-montserrat tracking-widest whitespace-nowrap"
          style={{ x: xLeft }}
        >
          CREADOR DISTRIBUIDOR
        </motion.div>
        
        {/* Fila inferior deslizándose a la izquierda */}
        <motion.div 
          className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black uppercase leading-none text-white/[0.015] font-montserrat tracking-widest whitespace-nowrap self-end"
          style={{ x: xRight }}
        >
          ITAWEED SOCIETY
        </motion.div>
      </div>

      {/* Resplandor radial esmeralda de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/[0.06] rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }} />

      {/* ── CONTENIDO PRINCIPAL CENTRADO Y ANIMADO ── */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        style={{ y: yContent }}
      >
        {/* Etiqueta superior estilo CustomizationSection */}
        <p className="text-violet-500 text-xs tracking-[0.4em] font-montserrat uppercase font-bold bg-violet-500/5 px-4 py-1.5 rounded-full border border-violet-500/20">
          — Emprendimiento
        </p>

        {/* Título Principal Minimalista */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight font-montserrat tracking-tight max-w-3xl mt-2">
          Emprende con <br />
          <span className="text-violet-700 transition-colors duration-500">Itaweed Society</span>
        </h2>

        {/* Línea divisoria minimalista violeta */}
        <div className="w-16 h-[2px] bg-violet-500 my-2" />

        {/* Párrafo Conciso Original */}
        <p className="text-white/60 text-base md:text-lg max-w-xl font-montserrat tracking-wide leading-relaxed">
          Sumate como creador o distribuidor. Te acompañamos a crear tu propia marca de ropa o a vender nuestras colecciones exclusivas.
        </p>

        {/* Botón CTA Premium y Animado */}
        <motion.button
          onClick={() => navigate("/undertake")}
          className="group flex items-center gap-3 px-8 py-3.5 border border-white/20 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent relative overflow-hidden mt-4"
          whileHover={{ 
            scale: 1.05, 
            borderColor: "#a855f7",
            boxShadow: "0 0 25px rgba(168, 85, 247, 0.2)" 
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          Conocé más
          <motion.span 
            className="inline-block text-violet-500 group-hover:text-white"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

    </section>
  );
}

