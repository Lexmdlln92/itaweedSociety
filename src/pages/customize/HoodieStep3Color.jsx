// src/pages/customize/HoodieStep3Color.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText";

// --- MODELO 2: HOODIE CROP ZIP (hoodie2) ---
import mangasDerecha from "/src/assets/hoodieParts/mangas-derecha.webp";
import mangasIzquierda from "/src/assets/hoodieParts/mangas-izquierda.webp";
import frente from "/src/assets/hoodieParts/frente.webp";
import ribsDerecho from "/src/assets/hoodieParts/rib-derecho.webp";
import ribsIzquierdo from "/src/assets/hoodieParts/rib-izquierdo.webp";
import fajon from "/src/assets/hoodieParts/fajon.webp";
import capuchaExterna from "/src/assets/hoodieParts/capucha-externa.webp";
import capuchaInterna from "/src/assets/hoodieParts/capucha-interna.webp";
import cordon from "/src/assets/hoodieParts/cordon.webp";

// --- MODELO 1: HOODIE CLASSIC OVER (hoodie1) ---
import mangaDereBaja from "/src/assets/hoodieParts/manga-dere-baja.webp";
import mangaDereMedio from "/src/assets/hoodieParts/manga-dere-medio.webp";
import mangaDereAlta from "/src/assets/hoodieParts/manga-dere-arriba.webp"; // Corregido el nombre del import según tu listado
import mangaIzq from "/src/assets/hoodieParts/manga-izq.webp";
import puñoDerecho from "/src/assets/hoodieParts/puño-der.webp";
import puñoIzquierdo from "/src/assets/hoodieParts/puño-izq.webp";
import fajonRanglaCorte from "/src/assets/hoodieParts/fajon-rangla-corte.webp";
import cuello from "/src/assets/hoodieParts/cuello.webp";
import espaldaAlta from "/src/assets/hoodieParts/espalda-alta.webp";
import frenteRanglaCorte from "/src/assets/hoodieParts/frente-rangla-corte.webp";

// --- MODELO 3: HOODIE HEAVYWEIGHT (hoodie3) ---
import mangaDereHeavyweight from "/src/assets/hoodieParts/manga-dere-heavyweight.webp";
import mangaIzqHeavyweight from "/src/assets/hoodieParts/manga-izq-heavyweight.webp";
import puñoDerechoHeavyweight from "/src/assets/hoodieParts/puño-dere-heavyweight.webp";
import puñoIzquierdoHeavyweight from "/src/assets/hoodieParts/puño-izq-heavyweight.webp";
import fajonHeavyweight from "/src/assets/hoodieParts/fajon-heavyweight.webp";
import cuelloHeavyweight from "/src/assets/hoodieParts/cuello-heavyweight.webp";
import espaldaHeavyweight from "/src/assets/hoodieParts/espalda-heavyweight.webp";
import frenteHeavyweight from "/src/assets/hoodieParts/frente-dere-heavyweight.webp";

// --- MODELO 4: HOODIE STREET (hoodie4) ---
import mangaDerechaStreet from "/src/assets/hoodieParts/manga-dere-street.webp";
import mangasIzquierdaStreet from "/src/assets/hoodieParts/manga-izq-street.webp";
import frenteAltoStreet from "/src/assets/hoodieParts/frente-alto-street.webp";
import frenteBajoStreet from "/src/assets/hoodieParts/frente-bajo-street.webp";
import puñoDerechoStreet from "/src/assets/hoodieParts/puño-dere-street.webp";
import puñoIzquierdoStreet from "/src/assets/hoodieParts/puño-izq-street.webp";
import fajonStreet from "/src/assets/hoodieParts/fajon-street.webp";
import capuchaExternaStreet from "/src/assets/hoodieParts/capucha-externa-street.webp";
import capuchaInternaStreet from "/src/assets/hoodieParts/capucha-int-street.webp";
import cordonStreet from "/src/assets/hoodieParts/cordon-street.webp";

// Mapeo maestro de datos de piezas por silueta

const hoodieModelsData = {
  hoodie1: {
    label: "CLASSIC OVER",
    hasCordon: false,
    cordonAsset: null,
    parts: [
      { name: "Manga derecha baja", image: mangaDereBaja },
      { name: "Manga derecha media", image: mangaDereMedio },
      { name: "Manga derecha alta", image: mangaDereAlta },
      { name: "Manga izquierda", image: mangaIzq },
      { name: "Frente rangla corte", image: frenteRanglaCorte },
      { name: "Puño derecho", image: puñoDerecho },
      { name: "Puño izquierdo", image: puñoIzquierdo },
      { name: "Fajon (rangla corte)", image: fajonRanglaCorte },
      { name: "Cuello", image: cuello },
      { name: "Espalda alta", image: espaldaAlta },
    ]
  },
  hoodie2: {
    label: "CROP ZIP",
    hasCordon: true,
    cordonAsset: cordon,
    parts: [
      { name: "Manga derecha", image: mangasDerecha },
      { name: "Manga izquierda", image: mangasIzquierda },
      { name: "Frente", image: frente },
      { name: "Rib derecho", image: ribsDerecho },
      { name: "Rib izquierdo", image: ribsIzquierdo },
      { name: "Fajon (cintura)", image: fajon },
      { name: "Capucha externa", image: capuchaExterna },
      { name: "Capucha interna", image: capuchaInterna },
    ]
  },
  hoodie3: {
    label: "HOODIE HEAVYWEIGHT",
    hasCordon: false,
    cordonAsset: cordon,
        parts: [
      { name: "Manga derecha Heavyweight", image: mangaDereHeavyweight },
      { name: "Manga izquierda Heavyweight", image: mangaIzqHeavyweight },
      { name: "Frente Heavyweight ", image: frenteHeavyweight },
      { name: "Puño derecho", image: puñoDerechoHeavyweight },
      { name: "Puño izquierdo", image: puñoIzquierdoHeavyweight },
      { name: "Fajon Heavyweight", image: fajonHeavyweight },
      { name: "Cuello", image: cuelloHeavyweight },
      { name: "Espalda", image: espaldaHeavyweight },
    ]
  },
  hoodie4: {
    label: "HOODIE STREET",
    hasCordon: true,
        parts: [
      { name: "Manga derecha Street", image: mangaDerechaStreet },
      { name: "Manga izquierda Street", image: mangasIzquierdaStreet },
      { name: "Frente alto Street", image: frenteAltoStreet },
      { name: "Frente bajo Street", image: frenteBajoStreet },
      { name: "Puño derecho", image: puñoDerechoStreet },
      { name: "Puño izquierdo", image: puñoIzquierdoStreet },
      { name: "Fajon Street", image: fajonStreet },
      { name: "Capucha externa", image: capuchaExternaStreet },
      { name: "Capucha interna", image: capuchaInternaStreet },
      { name: "Cordon", image: cordonStreet },
    ]
  }
};

const colorOptions = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "blue", hex: "#0000ff" },
  { name: "red", hex: "#ff0000" },
  { name: "green", hex: "#00ff00" },
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

export default function HoodieStep3Color({ onNext }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Detecta el hoodie elegido desde el paso anterior (por defecto hoodie1 si se entra directo)
  const selectedBuzo = state?.selectedBuzo || "hoodie1";
  const currentModel = hoodieModelsData[selectedBuzo] || hoodieModelsData["hoodie1"];
  
  const hoodieParts = currentModel.parts;

  // Estados locales
  const [selectedPart, setSelectedPart] = useState(null);
  const [colors, setColors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const [shakePreview, setShakePreview] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleColorSelect = (hex) => {
    if (!selectedPart) return;
    setColors((prev) => ({ ...prev, [selectedPart]: hex }));
  };

  const getHex = (name) => colors[name] || "transparent";

  // Lógica dinámica para contar cuántos elementos obligatorios necesitan color
  const getRequiredCount = () => {
    return currentModel.hasCordon ? hoodieParts.length + 1 : hoodieParts.length;
  };

  const handlePreview = () => {
    const totalSelected = Object.keys(colors).length;
    const requirements = getRequiredCount();

    if (totalSelected < requirements) {
      setErrorMessage("Debes seleccionar el color de todas las piezas para ver el preview.");
      setShakePreview(true);
      setTimeout(() => setShakePreview(false), 400);
      return;
    }
    setErrorMessage("");
    setShowPreview(true);
  };

  const handleNextClick = () => {
    const totalSelected = Object.keys(colors).length;
    const requirements = getRequiredCount();

    if (totalSelected < requirements) {
      setErrorMessage("Debes seleccionar el color de cada pieza antes de continuar.");
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }
    setErrorMessage("");
    if (onNext) onNext();
  };

  return (
    <section className="nap-root min-h-screen w-full flex-col justify-between relative bg-black text-white block z-10">
      <div>
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

        {/* -----------------------------------------------------
           HERO SECTION
        ----------------------------------------------------- */}
        <div className="nap-hero relative z-10">
          <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
            <span className="nap-hero-code hidden md:block">
              CUSTOM_SYS_v2 // CHROMATIC_LAB
            </span>
            <div className="nap-hero-ping" />
            <span className="nap-hero-tag whitespace-nowrap">— COLOR PASO 3 ({currentModel.label})</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              hora del <br /><span>Color</span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">
                Elige un color para cada pieza del canvas seleccionado.
              </p>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           MARQUEE INTERMEDIO
        ----------------------------------------------------- */}
        <div className="nap-marquee relative z-10">
          <MarqueeText
            speed="80s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">COLOR OPTIMIZATION</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">LAB PREVIEW MODE</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina text-white">FULL ASSEMBLY</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA
        ----------------------------------------------------- */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full mt-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
            
            {/* COLUMNA IZQUIERDA: VISUALIZADOR DE CAPAS DINÁMICO */}
            <div className="md:col-span-5 flex flex-col items-center justify-center md:sticky md:top-6">
              <div 
                className="nap-card w-full max-w-sm relative flex items-center justify-center p-6 bg-neutral-950/40 border border-neutral-900 rounded-xl overflow-hidden group"
                style={{ height: 'auto' }}
              >
                <div className="relative w-full h-[380px] sm:h-[450px]">
                  
                  {/* Renderizado de Capas según el modelo seleccionado */}
                  {hoodieParts.map(({ name, image }) => (
                    <div key={name} className="absolute inset-0 z-10">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain"
                      />
                      {colors[name] && (
                        <div
                          className="absolute inset-0 z-11 transition-all duration-300"
                          style={{
                            backgroundColor: getHex(name),
                            WebkitMask: `url(${image}) center / contain no-repeat`,
                            mask: `url(${image}) center / contain no-repeat`,
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Renderizado Condicional del Cordón (Solo si el modelo lo tiene) */}
                  {currentModel.hasCordon && currentModel.cordonAsset && (
                    <div className="absolute inset-0 z-20">
                      <img
                        src={currentModel.cordonAsset}
                        alt="Cordon"
                        className="w-full h-full object-contain"
                      />
                      {colors["Cordon"] && (
                        <div
                          className="absolute inset-0 z-21 transition-all duration-300"
                          style={{
                            backgroundColor: getHex("Cordon"),
                            WebkitMask: `url(${currentModel.cordonAsset}) center / contain no-repeat`,
                            mask: `url(${currentModel.cordonAsset}) center / contain no-repeat`,
                          }}
                        />
                      )}
                    </div>
                  )}

                </div>
                
                <div className="nap-card-crosshair">
                  <div className="nap-crosshair-ring">
                    <div className="nap-crosshair-h" />
                    <div className="nap-crosshair-v" />
                    <div className="nap-crosshair-dot" />
                  </div>
                </div>
                
                <span className="nap-badge-tech">
                  {selectedPart ? `ACTIVE // ${selectedPart.toUpperCase()}` : "AWAITING_NODE_SELECTION"}
                </span>
              </div>

              <AnimatePresence>
                {showPreview && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-mono text-xs mt-4 tracking-widest uppercase bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full animate-pulse"
                  >
                    ✦ Vista previa activada ✦
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* COLUMNA DERECHA: SELECCIÓN DE COLOR Y ACORDEONES */}
            <div className="md:col-span-7 w-full flex flex-col gap-4">
              
              <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-4">
                <p className="font-mono text-xs uppercase text-neutral-500 tracking-wider mb-3">
                  SELECCIONAR COLOR pieza : {selectedPart ? selectedPart : "ninguna pieza seleccionada"}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {colorOptions.map(({ name, hex }) => (
                    <button
                      key={hex}
                      className={`w-10 h-10 rounded-full border-2 transition-transform ${
                        colors[selectedPart] === hex
                          ? "scale-110 border-purple-500"
                          : "border-neutral-800 hover:border-neutral-600"
                      }`}
                      style={{ backgroundColor: hex }}
                      title={name}
                      onClick={() => handleColorSelect(hex)}
                    />
                  ))}
                </div>
              </div>

              {/* Acordeones con filtros ampliados adaptados a ambos modelos */}
              <motion.div 
                className="space-y-2 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {[
                  { title: "MANGAS Y PUÑOS", filters: ["Manga", "Puño"] },
                  { title: "RIBS Y CINTURA", filters: ["Rib", "Fajon"] },
                  { title: "CAPUCHA Y CUELLO", filters: ["Capucha", "Cuello"] },
                  { title: "FRENTE Y ESPALDA", filters: ["Frente", "Espalda"] },
                ].map(({ title, filters }, i) => {
                  const isOpen = openSection === i;
                  
                  // Filtramos las partes correspondientes a esta sección del acordeón
                  const filteredParts = hoodieParts.filter(({ name }) =>
                    filters.some((f) => name.toLowerCase().includes(f.toLowerCase()))
                  );

                  // Si el modelo actual no tiene piezas en este acordeón, no renderizamos el contenedor vacío
                  if (filteredParts.length === 0) return null;

                  return (
                    <motion.div key={i} variants={itemVariants} className="bg-neutral-950/20 border border-neutral-900 rounded-xl overflow-hidden">
                      <button
                        className={`w-full text-left px-4 py-3 uppercase font-mono text-xs tracking-wider flex justify-between items-center ${
                          isOpen ? "text-purple-400 bg-neutral-950/40" : "text-white"
                        }`}
                        onClick={() => setOpenSection(isOpen ? null : i)}
                      >
                        <span>{title}</span>
                        <span className="text-neutral-500 text-[10px]">{isOpen ? "[-]" : "[+]"}</span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 grid grid-cols-2 gap-2 text-sm border-t border-neutral-900/40 bg-black/40"
                          >
                            {filteredParts.map(({ name }) => (
                              <button
                                key={name}
                                onClick={() => {
                                  setSelectedPart(name);
                                  setErrorMessage("");
                                }}
                                className={`border font-mono text-xs uppercase tracking-tight p-2.5 rounded-lg transition-colors ${
                                  selectedPart === name
                                    ? "bg-purple-600 border-purple-500 text-white"
                                    : "bg-neutral-950/50 text-neutral-400 border-neutral-900 hover:border-neutral-800 hover:text-white"
                                }`}
                              >
                                {name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Botón de cordón exclusivo para el Hoodie Crop Zip */}
              {currentModel.hasCordon && (
                <button
                  onClick={() => {
                    setSelectedPart("Cordon");
                    setErrorMessage("");
                  }}
                  className={`w-full text-left border font-mono text-xs uppercase tracking-widest p-4 rounded-xl transition-all ${
                    selectedPart === "Cordon"
                      ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                      : "bg-neutral-950/20 text-neutral-400 border-neutral-900 hover:border-neutral-800 hover:text-white"
                  }`}
                >
                  Cordon
                </button>
              )}

              <AnimatePresence>
                {errorMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-400 font-mono text-xs text-center uppercase tracking-wider mt-2"
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
         CONTENEDOR DE ACCIONES
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center pt-8 relative z-10">
        <p className="nap-footer-text text-center">
          {selectedPart ? `Nodo [ ${selectedPart.toUpperCase()} ] seleccionado` : "Selecciona un segmento para mapear"}
        </p>

        <div className="flex w-full max-w-xl gap-4 px-4 justify-center items-center mt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-1/4 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Regresar
          </button>
          
          <motion.button
            onClick={handlePreview}
            className={`w-1/3 py-3 text-xs font-mono uppercase tracking-widest text-center border rounded transition-all ${
              shakePreview ? "animate-shake" : ""
            } bg-neutral-900 border-neutral-800 text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/5`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Preview
          </motion.button>

          <motion.button
            onClick={handleNextClick}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center rounded flex items-center justify-center gap-2 border transition-all ${
              shakeNext ? "animate-shake" : ""
            } bg-purple-600 border-purple-500 text-white hover:bg-purple-700`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Siguiente Paso →
          </motion.button>
        </div>
      </div>
    </section>
  );
}