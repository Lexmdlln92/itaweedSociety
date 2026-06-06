// src/pages/customize/TshirtSilhouettes.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText";

import tshirt1custom from "../../assets/customization/tshirt1custom.webp";
import tshirt2custom from "../../assets/customization/tshirt2custom.webp";
import tshirt3custom from "../../assets/customization/tshirt3custom.webp";
import tshirt4custom from "../../assets/customization/tshirt4custom.webp";
import tshirt1modal from "../../assets/customization/tshirt1modal.webp";
import tshirt2modal from "../../assets/customization/tshirt2modal.webp";
import tshirt3modal from "../../assets/customization/tshirt3modal.webp";
import tshirt4modal from "../../assets/customization/tshirt4modal.webp";

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS (Estilo NewArrivalsPage)
----------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const silhouettes = [
  { id: "tshirt1", label: "T-Shirt Classic Heavy", image: tshirt1custom, modalImage: tshirt1modal },
  { id: "tshirt2", label: "T-Shirt Boxy Fit", image: tshirt2custom, modalImage: tshirt2modal },
  { id: "tshirt3", label: "T-Shirt Vintage Wash", image: tshirt3custom, modalImage: tshirt3modal },
  { id: "tshirt4", label: "T-Shirt Street Oversized", image: tshirt4custom, modalImage: tshirt4modal },
];

export default function TshirtSilhouettes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(null);

  // Estados para validación y animación de shake
  const [shakeButton, setShakeButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isFullScreen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 32; // Offset inicial para centrar imagen en móvil
    }
  }, [isFullScreen]);

  const handleNext = () => {
    if (!selected) {
      setErrorMessage("Por favor selecciona una silueta antes de continuar.");
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 400);
      return;
    }
    setErrorMessage("");
    
    navigate("/customize/camisetas/step2", { 
      state: { selectedTshirt: selected } 
    });
  };

  return (
    <section className="nap-root min-h-screen flex flex-col justify-between">
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
            <span className="nap-hero-code hidden md:block">
              CUSTOM_SYS_v2 // LAB_MODE
            </span>
            <div className="nap-hero-ping" />
            <span className="nap-hero-tag whitespace-nowrap">— PASO 1</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              Elige una<br /><span>Camiseta</span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">
                Selecciona uno de nuestros cortes premium de camisetas urbanas para iniciar la configuración de tu pieza exclusiva.
              </p>
              <span className="nap-hero-coord block mt-2">
                COORD: 6.2442° N, 75.5812° W
              </span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           MARQUEE
        ----------------------------------------------------- */}
        <div className="nap-marquee">
          <MarqueeText
            speed="80s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">CAMISETAS EXPERIMENT</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">STREETWEAR SILHOUETTES</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina text-white">CUSTOM LAB</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA (CARDS)
        ----------------------------------------------------- */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full">
          
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {silhouettes.map(({ id, label, image, modalImage }) => {
              const isSelected = selected === id;

              return (
                <motion.div key={id} variants={cardVariants}>
                  <button
                    onClick={() => {
                      if (selected === id) {
                        setSelectedModalImage(modalImage);
                        setIsModalOpen(true);
                      } else {
                        setSelected(id);
                        setErrorMessage("");
                      }
                    }}
                    className={`nap-card w-full text-left relative flex flex-col pt-0 transition-all group ${
                      isSelected ? "ring-2 ring-purple-500 border-purple-500" : ""
                    }`}
                    style={{ background: 'transparent' }}
                  >
                    {/* Contenedor de Imagen */}
                    <div className="nap-card-img w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden p-4 bg-neutral-950/40 rounded-xl">
                      <img 
                        src={image} 
                        alt={label} 
                        className="w-full h-full object-contain block mx-auto transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="nap-card-overlay" />
                      
                      {/* Crosshair Cyberpunk */}
                      <div className="nap-card-crosshair">
                        <div className="nap-crosshair-ring">
                          <div className="nap-crosshair-h" />
                          <div className="nap-crosshair-v" />
                          <div className="nap-crosshair-dot" />
                        </div>
                      </div>

                      <span className="nap-badge-tech">TS_DS_02</span>
                      
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-purple-400 bg-black/95 border border-purple-500/40 px-3 py-2 rounded uppercase font-bold shadow-2xl">
                            Ver Detalle 🔍
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cuerpo de la Card */}
                    <div className="nap-card-body w-full flex-1 flex flex-col justify-between">
                      <div>
                        <span className="nap-card-sub text-[10px] font-mono tracking-widest text-purple-400 block mb-1">
                          PATTERN // SELECTION
                        </span>
                        <p className="nap-card-name text-sm md:text-base font-bold text-white uppercase tracking-tight">
                          {label}
                        </p>
                      </div>

                      <div className="nap-card-cta mt-4">
                        <div className="nap-cta-line" />
                        <span className="nap-cta-text text-[11px] font-mono text-neutral-400 transition-colors">
                          {isSelected ? "✦ Seleccionado" : "Seleccionar"} →
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* DETALLE IDÉNTICO A SWEATPANTS: Contenedor independiente, centrado y simétrico */}
        <div className="w-full flex justify-center px-4 mt-2 mb-8">
          <AnimatePresence>
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 font-mono text-xs text-center uppercase tracking-wider"
              >
                [ERROR] : {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* -----------------------------------------------------
         CONTENEDOR DE ACCIONES (FOOTER CTA STYLE)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center">
        <p className="nap-footer-text text-center">
          {selected ? "Procede al siguiente paso de personalización" : "Selecciona un patrón base para continuar"}
        </p>

        <div className="flex w-full max-w-md gap-4 px-4 justify-center items-center mt-2">
          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            className="w-1/3 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Volver
          </button>
          
          {/* Botón Siguiente */}
          <motion.button
            onClick={handleNext}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center rounded flex items-center justify-center gap-2 border transition-all ${
              selected
                ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700"
                : "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed"
            } ${shakeButton ? "animate-shake" : ""}`}
            whileHover={selected ? { scale: 1.02 } : {}}
            whileTap={selected ? { scale: 0.98 } : {}}
          >
            Siguiente Paso
            <span className="text-xs">→</span>
          </motion.button>
        </div>
      </div>

      {/* -----------------------------------------------------
         MODAL DE VISTA PREVIA
      ----------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-neutral-950 border border-neutral-800 p-5 rounded-xl max-w-lg w-full shadow-2xl shadow-purple-950/20 my-auto mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800/60">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Preview // Lab_Asset_Inspection
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="font-mono text-red-400 hover:text-red-500 text-xs font-bold tracking-wider transition-colors p-1"
                >
                  ✕ CERRAR
                </button>
              </div>
              
              <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-lg p-4 mb-5 flex items-center justify-center w-full aspect-square max-h-[55vh] sm:max-h-[65vh] overflow-hidden relative">
                <img
                  src={selectedModalImage}
                  alt="Vista ampliada"
                  className="max-w-full max-h-full object-contain rounded-md block mx-auto"
                />
                <span className="absolute bottom-2 left-2 text-[8px] font-mono text-neutral-500 bg-black/50 px-1.5 py-0.5 rounded">
                  SCALE: AUTO_CONTAIN
                </span>
              </div>

              <motion.button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsFullScreen(true);
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs uppercase tracking-widest rounded-lg border border-purple-500 shadow-md shadow-purple-600/10 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                🔍 Expandir Full Zoom
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -----------------------------------------------------
         VISTA ZOOM COMPLETO
      ----------------------------------------------------- */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black"
          >
            <div ref={scrollContainerRef} className="relative w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth flex items-center justify-start md:justify-center">
              <img
                src={selectedModalImage}
                alt="Zoom completo"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
                className="select-none object-contain h-screen min-w-[1200px] md:min-w-0 md:h-auto md:max-h-[92vh] w-auto rounded-md"
              />

              <button
                onClick={() => setIsFullScreen(false)}
                className="fixed top-4 right-4 md:top-6 md:right-6 bg-violet-600 hover:bg-violet-700 text-white font-mono text-[10px] md:text-xs uppercase tracking-widest px-4 py-3 rounded-md border border-violet-400 shadow-2xl z-[1000] transition-all"
              >
                ✕ salir
              </button>

              <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black/80 border border-violet-500/30 px-4 py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-violet-400 backdrop-blur-md pointer-events-none animate-pulse z-[1000]">
                DESLIZA →
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}