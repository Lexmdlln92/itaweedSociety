// src/pages/customize/SweatpantsStep2Size.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText";

// Assets de Sudaderas
import sweatpants1 from "../../assets/hoodieParts/sweatpant1custom.webp";
import sweatpants2 from "../../assets/hoodieParts/sweatpant2custom.webp";
import sweatpants3 from "../../assets/hoodieParts/frente-espalda-franjas.webp";

const sweatpantsMap = {
  sweatpants1: sweatpants1,
  sweatpants2: sweatpants2,
  sweatpants3: sweatpants3,
};

const sizes = [
  { id: "S", label: "S", description: '34–36"' },
  { id: "M", label: "M", description: '38–40"' },
  { id: "L", label: "L", description: '42–44"' },
  { id: "XL", label: "XL", description: '46–48"' },
  { id: "XXL", label: "XXL", description: '50–52"' },
];

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS
----------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function SweatpantsStep2Size() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Recupera la silueta base del estado de navegación (adaptado para sudaderas)
  const selectedSweatpants =
    state?.selectedSweatpants ||
    state?.selectedTshirt ||
    state?.selectedBuzo;
  const image = sweatpantsMap[selectedSweatpants];

  // Estados
  const [selectedSize, setSelectedSize] = useState(null);
  const [shakeButton, setShakeButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Validación si no se seleccionó ninguna silueta en el paso anterior
  if (!selectedSweatpants) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 relative bg-black">
        <div className="text-center max-w-md border border-red-500/30 p-8 rounded-xl bg-neutral-950/80 backdrop-blur-md">
          <span className="text-red-400 font-mono text-xs tracking-widest block mb-2">[CRITICAL_ERROR]</span>
          <h2 className="text-xl font-mono uppercase tracking-wider font-bold mb-4 text-white">No se detectó silueta base</h2>
          <p className="text-neutral-400 font-mono text-xs mb-6 lowercase">
            debes inicializar el patrón de corte en el laboratorio de configuración antes de asignar un tallaje.
          </p>
          <button
            onClick={() => navigate('/customize/sudaderas')}
            className="w-full py-3 bg-purple-600 border border-purple-500 text-white font-mono text-xs uppercase tracking-widest rounded hover:bg-purple-700 transition-colors"
          >
            ← Volver al Paso 1
          </button>
        </div>
      </div>
    );
  }

const handleNext = () => {
    if (!selectedSize) {
      setErrorMessage("Por favor selecciona una talla antes de continuar.");
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 400);
      return;
    }

    setErrorMessage("");
    // Se envía selectedSweatpants de forma consistente para que el Step 3 lo atrape sin problemas
    navigate("/customize/sudaderas/step3", {
      state: { selectedSweatpants: selectedSweatpants, selectedSize },
    });
  };

  return (
    <section className="nap-root min-h-screen flex flex-col justify-between relative bg-black text-white">
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
              CUSTOM_SYS_v2 // FIT_RECON
            </span>
            <div className="nap-hero-ping" />
            <span className="nap-hero-tag whitespace-nowrap">— TALLA PASO 2</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              Elige la <br /><span>Talla</span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">
                Determina las proporciones exactas de tu drop. Escalado de alta precisión optimizado para siluetas urbanas.
              </p>
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
                <span className="font-londrina">SIZE SELECTION</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">FITMENT INSPECTION</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina text-white">READY TO WEAR</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA (2 COLUMNS)
        ----------------------------------------------------- */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full mt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
            
            {/* COLUMNA IZQUIERDA: IMAGEN (Sin recortes rígidos) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div 
                className="nap-card w-full max-w-sm relative flex items-center justify-center p-4 bg-neutral-950/40 border border-neutral-900 rounded-xl group"
                style={{ height: 'auto', minHeight: 'auto', maxHeight: 'none', aspectRatio: 'auto', overflow: 'visible' }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Sudadera seleccionada"
                    className="w-full h-auto object-contain block mx-auto transition-transform duration-500 scale-95 group-hover:scale-100"
                    style={{ height: 'auto', maxHeight: '55vh', minHeight: 'auto', display: 'block' }}
                  />
                ) : (
                  <p className="text-xs font-mono text-neutral-500">[ERROR: ASSET_NOT_FOUND]</p>
                )}
                
                {/* Crosshair Cyberpunk */}
                <div className="nap-card-crosshair">
                  <div className="nap-crosshair-ring">
                    <div className="nap-crosshair-h" />
                    <div className="nap-crosshair-v" />
                    <div className="nap-crosshair-dot" />
                  </div>
                </div>
                
                <span className="nap-badge-tech">SILHOUETTE // {selectedSweatpants.toUpperCase()}</span>
              </div>
            </div>

            {/* COLUMNA DERECHA: SECCIÓN DE TALLAS */}
            <div className="md:col-span-7 w-full">
              <div className="mb-4">
                <p className="font-mono text-xs uppercase text-neutral-500 tracking-wider">// select_size_parameter</p>
              </div>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {sizes.map((size) => {
                  const isSelected = selectedSize === size.id;
                  
                  return (
                    <motion.div 
                      key={size.id} 
                      variants={itemVariants}
                      onClick={() => {
                        setSelectedSize(size.id);
                        setErrorMessage("");
                      }}
                      className={`group relative flex flex-col items-center justify-center py-5 px-4 rounded-lg border cursor-pointer select-none transition-all duration-200 ${
                        isSelected 
                          ? "border-purple-500 bg-purple-500/10" 
                          : "border-neutral-900 bg-neutral-950/40 hover:border-neutral-800"
                      }`}
                    >
                      {/* Letra de Talla */}
                      <span className={`text-2xl font-mono font-bold transition-colors duration-200 ${
                        isSelected ? "text-purple-400" : "text-white group-hover:text-purple-400"
                      }`}>
                        {size.label}
                      </span>
                      
                      {/* Medidas Pequeñas */}
                      <span className="font-mono text-[10px] text-neutral-500 mt-1 tracking-tight">
                        {size.description}
                      </span>

                      {/* Dot Indicador sutil de selección */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Composición textil fija para sudaderas */}
              <div className="mt-6 p-4 border border-neutral-900 bg-neutral-950/20 rounded-lg max-w-xl">
                <p className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest mb-1">// ESPECIFICACIONES</p>
                <p className="font-mono text-neutral-400 text-[11px] leading-relaxed lowercase">
                  80% algodón, 20% poliéster. Interior afelpado de alta densidad, costuras reforzadas, pretina elástica adaptable y escalado premium optimizado para drops urbanos.
                </p>
              </div>

              {/* Mensaje de Error de Validación */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 font-mono text-xs mt-4 mb-3 uppercase tracking-wider"
                  >
                    [ERROR] : {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* -----------------------------------------------------
         CONTENEDOR DE ACCIONES (FOOTER CTA)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center pt-8">
        <p className="nap-footer-text text-center">
          {selectedSize ? `Talla [ ${selectedSize} ] seleccionada` : "Configura el tallaje para proceder"}
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
              selectedSize
                ? "bg-purple-600 border-purple-500 text-white hover:bg-purple-700"
                : "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed"
            } ${shakeButton ? "animate-shake" : ""}`}
            whileHover={selectedSize ? { scale: 1.01 } : {}}
            whileTap={selectedSize ? { scale: 0.99 } : {}}
          >
            Siguiente Paso →
          </motion.button>
        </div>
      </div>
    </section>
  );
}