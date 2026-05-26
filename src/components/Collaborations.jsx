import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const VHS_LINES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: `${10 + i * 11}%`,
  opacity: 0.03 + (i % 3) * 0.02,
  height: i % 2 === 0 ? "1px" : "2px",
}));

export default function Collaborations() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const noiseY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scanlineY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.2, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white border-t border-b border-white/10"
      style={{ minHeight: "420px" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.06) 35%, #000000 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #000 0%, transparent 18%, transparent 82%, #000 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ y: scanlineY, opacity: 0.08 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
            backgroundSize: "100% 4px",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ y: noiseY }}
      >
        {VHS_LINES.map((line) => (
          <div
            key={line.id}
            className="absolute left-0 right-0 bg-white"
            style={{
              top: line.top,
              height: line.height,
              opacity: line.opacity,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: overlayO }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(139,92,246,0.1) 0%, transparent 28%, transparent 72%, rgba(139,92,246,0.08) 100%)",
          }}
        />
      </motion.div>

      <div
        className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, #7c3aed 20%, #a855f7 50%, #7c3aed 80%, transparent 100%)",
          opacity: 0.75,
          boxShadow: "0 0 10px rgba(168,85,247,0.45)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, #7c3aed 20%, #a855f7 50%, #7c3aed 80%, transparent 100%)",
          opacity: 0.75,
          boxShadow: "0 0 10px rgba(168,85,247,0.45)",
        }}
      />

      <motion.div
        className="relative z-30 flex flex-col items-center justify-center px-6 py-20 md:px-16 lg:px-24 text-center"
        style={{ y: textY }}
      >
        <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block mb-4">
          DROP CODE: ITW_COLLAB_01 // MEDELLIN, COL
        </span>

        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
          </span>
          <p className="text-violet-700 text-xs tracking-[0.3em] font-montserrat uppercase font-bold">
            - Alianzas exclusivas
          </p>
        </div>
        <h2 className="text-[7rem] md:text-[11rem] lg:text-[15rem] font-black uppercase leading-none font-montserrat tracking-tight">
          Collab <br />
        </h2>

        <div
          className="w-16 h-0.5 mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #a855f7, transparent)",
          }}
        />

        <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed font-montserrat mb-2">
          Nos aliamos con marcas y talentos unicos para crear experiencias
          exclusivas.
        </p>
        <p className="text-white/40 text-sm max-w-md font-montserrat mb-10">
          Aparte de verte increible con esta ropa, recibe beneficios diferentes
          cada mes.
        </p>

        <Link
          to="/collaborationPage"
          className="group flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent hover:border-violet-500/70 transition-all duration-300"
          style={{ boxShadow: "0 0 20px rgba(168,85,247,0.25)" }}
        >
          alianza del mes
          <span className="inline-block text-violet-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
            →
          </span>
        </Link>

        <p className="mt-10 text-[9px] font-mono text-white/20 tracking-widest uppercase select-none">
          COORD: 6.2442 N, 75.5812 W // ITAWEED/COLLAB/2026
        </p>
      </motion.div>
    </section>
  );
}

