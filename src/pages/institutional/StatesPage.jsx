// src/pages/StatesPage.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import MarqueeText from "../../components/MarqueeText"; // Ajusta la ruta según tu estructura

import state1 from "../../assets/states/state1.webp";
import state2 from "../../assets/states/state2.webp";
import state3 from "../../assets/states/state3.webp";
import state4 from "../../assets/states/state4.webp";
import state5 from "../../assets/states/state5.webp";
import state6 from "../../assets/states/state6.webp";

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS (Estilo Custom Lab)
----------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const states = [
  { img: state3, name: "state3" },
  { img: state4, name: "state4" },
  { img: state5, name: "state5" },
  { img: state6, name: "state6" },
  { img: state1, name: "state1" },
  { img: state2, name: "state2" },
];

export default function StatesPage() {
  const navigate = useNavigate();

  return (
    <section className="nap-root min-h-screen flex flex-col justify-between relative overflow-hidden bg-black text-white">
      <div>
        {/* -- GEOMETRIC BACKGROUND -- */}
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

        {/* -----------------------------------------------------
           HERO
        ----------------------------------------------------- */}
        <div className="nap-hero">
          <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
            <span className="nap-hero-code hidden md:block text-violet-500/80">
              MEDIA_SYS_v2 // FEED_ARCHIVE
            </span>
            <div className="nap-hero-ping bg-violet-700" />
            <span className="nap-hero-tag whitespace-nowrap text-gray-400">— GALERÍA</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-7xl leading-none font-bold uppercase tracking-tight">
              Estaditos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-200 to-white">
                del Mes
              </span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-4">
              <p className="nap-hero-sub text-gray-400 text-sm font-mono">
                Explora y descarga el material visual exclusivo seleccionado para la comunidad de Itaweed Society.
              </p>
              <span className="nap-hero-coord block mt-2 text-neutral-600">
                COORD: 6.2442° N, 75.5812° W
              </span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           MARQUEE
        ----------------------------------------------------- */}
        <div className="nap-marquee my-6">
          <MarqueeText
            speed="75s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-white">EXCLUSIVE CONTENT</span>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-neutral-500">MONTHLY VISUAL ARCHIVE</span>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-white">DOWNLOAD STATION</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA (IMÁGENES COMPLETAS SIN HOVER)
        ----------------------------------------------------- */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full mb-12">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {states.map((state, idx) => {
              return (
                <motion.div key={idx} variants={cardVariants}>
                  <div
                    className="nap-card w-full text-left relative flex flex-col pt-0 border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950/20"
                    style={{ background: 'transparent' }}
                  >
                    {/* Contenedor de Imagen - Ajustado para ver la imagen completa */}
                    <div className="w-full aspect-square flex items-center justify-center relative bg-neutral-950/40 rounded-xl p-2">
                      <img 
                        src={state.img} 
                        alt={`Estado ${idx + 1}`} 
                        className="w-full h-full object-contain block mx-auto" 
                      />
                      
                      {/* Crosshair Cyberpunk Estático */}
                      <div className="nap-card-crosshair">
                        <div className="nap-crosshair-ring">
                          <div className="nap-crosshair-h" />
                          <div className="nap-crosshair-v" />
                          <div className="nap-crosshair-dot" />
                        </div>
                      </div>

                      {/* Badge Tecnológico */}
                      <span className="nap-badge-tech !border-amber-500/30 !text-amber-400 bg-black/80">
                        ST_ID_{idx + 1}
                      </span>
                      
                      {/* Botón Flotante de Descarga Estático */}
                      <a
                        href={state.img}
                        download={`${state.name}.png`}
                        className="absolute bottom-4 right-4 z-20 bg-amber-400 text-black p-3 rounded-full shadow-2xl flex items-center justify-center border border-amber-300"
                        title="Descargar imagen"
                      >
                        <FiDownload className="text-lg" />
                      </a>
                    </div>

                    {/* Cuerpo de la Card */}
                    <div className="w-full p-4 flex flex-col justify-between bg-neutral-950/40 border-t border-neutral-900/50">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-amber-500/80 block mb-1">
                          ASSET ARCHIVE // FORMAT: WEBP
                        </span>
                        <p className="text-xs md:text-sm font-bold text-white uppercase tracking-tight font-mono">
                          {state.name || `ESTADO_ITEM_0${idx + 1}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* -----------------------------------------------------
         CONTENEDOR DE ACCIONES (FOOTER CTA)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center bg-gradient-to-t from-neutral-950 to-transparent pt-8 pb-10">
        <p className="nap-footer-text text-center text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
          Repositorio Histórico de Publicaciones
        </p>

        <div className="flex w-full max-w-md gap-4 px-4 justify-center items-center">
          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            className="w-1/3 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Volver
          </button>
          
          {/* Botón Ver Todos */}
          <motion.a
            href="#"
            className="flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center rounded flex items-center justify-center border border-white bg-transparent text-white hover:bg-white hover:text-black font-bold transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver todos los estados
            <span className="text-xs ml-1">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}