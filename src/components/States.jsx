import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import state1 from "../assets/states/state1.webp";
import state2 from "../assets/states/state2.webp";
import state3 from "../assets/states/state3.webp";
import state4 from "../assets/states/state4.webp";
import state5 from "../assets/states/state5.webp";
import state6 from "../assets/states/state6.webp";

const images = [
  { img: state5, tag: "NUEVO INGRESO", time: "2h" },
  { img: state6, tag: "D2D EXCLUSIVE", time: "4h" },
  { img: state3, tag: "STREET LIFE", time: "6h" },
  { img: state4, tag: "LEX FACTORY", time: "12h" },
  { img: state1, tag: "STORY FLOW", time: "18h" },
  { img: state2, tag: "ITAWEED FAM", time: "23h" },
];
0
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 14,
    },
  },
};

export default function States() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current && carouselRef.current) {
        setWidth(trackRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    const timer = setTimeout(handleResize, 150);

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="bg-black text-white overflow-hidden border-t border-b border-white/10 relative">
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

      <div className="px-6 pt-16 pb-10 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
              DROP CODE: ITW_STATE_01 // MEDELLIN, COL
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <p className="text-violet-700 text-xs tracking-[0.3em] font-montserrat uppercase font-bold block">
              - Estados activos
            </p>
          </div>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-black uppercase leading-none font-montserrat tracking-tight">
            Estaditos
            <br />
            <span className="text-violet-700">del dia a dia</span>
            <br />
          </h2>
        </div>
        <div className="flex-col gap-2 max-w-xs font-montserrat text-sm hidden md:block mb-5">
          <p className="text-white/40 tracking-wide leading-relaxed">
            Sigue el flow real capturado en la calle. Outfits diarios, stories activas y el estilo de vida de la Itaweed Society.
          </p>
          <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase self-start block mt-2">
            COORD: 6.2442 N, 75.5812 W
          </span>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing px-6 pt-1 md:px-16 lg:px-24 relative z-10"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width - 48 }}
          dragElastic={0.15}
          className="flex gap-8 w-max select-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {images.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                scale: 1.04,
                y: -12,
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(139, 92, 246, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-64 h-[420px] rounded-[2.25rem] border border-white/10 p-2 bg-zinc-950 relative overflow-hidden transition-all duration-300 group flex-shrink-0"
            >
              <div className="w-full h-full rounded-[1.75rem] overflow-hidden relative bg-neutral-900">
                <img
                  src={item.img}
                  alt={`state ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />

                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

                <div className="absolute top-3 left-3 right-3 flex gap-1.5 z-20">
                  {Array.from({ length: 4 }).map((_, lineIdx) => (
                    <div
                      key={lineIdx}
                      className={`h-[2px] flex-1 rounded-full ${
                        lineIdx === 0 ? "bg-violet-500 animate-pulse" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-6 left-3 right-3 flex items-center gap-2 z-20">
                  <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-[10px] font-black text-white">
                    ITW
                  </div>
                  <span
                    className="text-[11px] font-black text-white tracking-wider font-montserrat"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    itaweed_society
                  </span>
                  <span className="text-[9px] text-white/50 font-medium font-montserrat">{item.time}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <span
                    className="text-[10px] text-violet-700 font-black tracking-wider uppercase font-montserrat bg-violet-700/10 backdrop-blur-md px-3 py-1 rounded-full border border-violet-700/20"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {item.tag}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-15 group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 pt-6 pb-12 md:px-16 lg:px-24 border-t border-white/10 relative z-10 bg-black text-center">
        <p className="text-white/30 text-sm font-montserrat tracking-widest uppercase">
          Sigue el ritmo en nuestras redes oficiales
        </p>
        <motion.button
          onClick={() => navigate("/states")}
          className="group flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent relative overflow-hidden"
          whileHover={{
            scale: 1.05,
            borderColor: "#8b5cf6",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          Ver todos
          <motion.span
            className="inline-block text-violet-700 group-hover:text-white"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}

