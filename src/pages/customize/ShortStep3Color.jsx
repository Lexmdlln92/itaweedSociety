// src/pages/customize/ShortStep3Color.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText";

import frenteEspalda3 from "/src/assets/hoodieParts/frentel-shortpant3.webp";
import franjaIzq3 from "/src/assets/hoodieParts/lateral-der-shortpant3.webp";
import franjaDer3 from "/src/assets/hoodieParts/lateral-izq-shortpant3.webp";

import mesh1 from "/src/assets/hoodieParts/shortsize1.webp";
import fleece1 from "/src/assets/hoodieParts/shortsize3.webp";

const shortModelsData = {
  short1: {
    label: "MESH HEAVYWEIGHT",
    parts: [{ name: "color total", image: mesh1 }],
  },
  short2: {
    label: "CARGO STREET",
    parts: [
      { name: "Franja derecha", image: franjaDer3 },
      { name: "Franja izquierda", image: franjaIzq3 },
      { name: "Frente", image: frenteEspalda3 },
    ],
  },
  short3: {
    label: "FLEECE VINTAGE",
    parts: [{ name: "color total", image: fleece1 }],
  },
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

export default function ShortStep3Color({ onNext }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedShort = state?.selectedShort || "short1";
  const currentModel =
    shortModelsData[selectedShort] || shortModelsData["short1"];
  const shortParts = currentModel.parts;

  const [selectedPart, setSelectedPart] = useState(null);
  const [colors, setColors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [openSection, setOpenSection] = useState(0); // Abre el primer acordeón por defecto

  const [shakePreview, setShakePreview] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Inicializar selección limpia en la primera pieza disponible
  useEffect(() => {
    setColors({});
    setShowPreview(false);
    setOpenSection(0);
    setErrorMessage("");

    if (shortParts && shortParts.length > 0) {
      setSelectedPart(shortParts[0].name);
    } else {
      setSelectedPart(null);
    }
  }, [selectedShort]);

  const handleColorSelect = (hex) => {
    if (!selectedPart) {
      setErrorMessage("Por favor selecciona una parte de la prenda primero.");
      return;
    }
    setColors((prev) => ({ ...prev, [selectedPart]: hex }));
    setErrorMessage("");
  };

  const getHex = (name) => colors[name] || "transparent";

  const getRequiredCount = () => {
    return shortParts.length;
  };

  const handlePreview = () => {
    const totalSelected = Object.keys(colors).length;
    const requirements = getRequiredCount();

    if (totalSelected < requirements) {
      setErrorMessage(
        "Debes seleccionar el color de todas las piezas para ver el preview.",
      );
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
      setErrorMessage(
        "Debes seleccionar el color de cada pieza antes de continuar.",
      );
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }
    setErrorMessage("");
    if (onNext) {
      onNext();
    }
  };

  return (
    <section className="nap-root min-h-screen w-full flex-col justify-between relative bg-black text-white block z-10">
      <div>
        {/* Rejilla de fondo técnica */}
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
            <span className="nap-hero-tag whitespace-nowrap">
              — SHORTS LAB PASO 3 ({currentModel.label.toUpperCase()})
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              hora del <br />
              <span>Color</span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">
                Mapea la paleta cromática sobre los nodos del lienzo textil de
                tu prenda.
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
                <span className="font-londrina">SHORT OPTIMIZATION</span>
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
            {/* COLUMNA IZQUIERDA: MOTOR DE CAPAS */}
            <div className="md:col-span-5 flex flex-col items-center justify-center md:sticky md:top-6">
              <div
                className="nap-card w-full max-w-sm relative flex items-center justify-center p-6 bg-neutral-950/40 border border-neutral-900 rounded-xl overflow-hidden group"
                style={{ height: "auto" }}
              >
                <div className="relative w-full h-[380px] sm:h-[450px]">
                  {shortParts.map(({ name, image }) => (
                    <div key={name} className="absolute inset-0 z-10">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain relative z-10"
                      />
                      {colors[name] && (
                        <div
                          className="absolute inset-0 z-20 transition-all duration-300"
                          style={{
                            backgroundColor: getHex(name),
                            WebkitMask: `url(${image}) center / contain no-repeat`,
                            mask: `url(${image}) center / contain no-repeat`,
                            mixBlendMode: "multiply", // Conserva arrugas y sombras naturales de la tela
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="nap-card-crosshair">
                  <div className="nap-crosshair-ring">
                    <div className="nap-crosshair-h" />
                    <div className="nap-crosshair-v" />
                    <div className="nap-crosshair-dot" />
                  </div>
                </div>

                <span className="nap-badge-tech">
                  {selectedPart
                    ? `ACTIVE // ${selectedPart.toUpperCase()}`
                    : "AWAITING_NODE_SELECTION"}
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
                  SELECCIONAR COLOR PIEZA :{" "}
                  {selectedPart ? selectedPart : "ninguna pieza seleccionada"}
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

              {/* Acordeones Dinámicos */}
              <motion.div
                className="space-y-2 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {[
                  { title: "CORTE PRINCIPAL", filters: ["Frente"] },
                  { title: "FRANJAS", filters: ["Franja"] },
                  { title: "COLOR", filters: ["color total"] },
                ].map(({ title, filters }, i) => {
                  const isOpen = openSection === i;
                  const filteredParts = shortParts.filter(({ name }) =>
                    filters.some((f) =>
                      name.toLowerCase().includes(f.toLowerCase()),
                    ),
                  );

                  if (filteredParts.length === 0) return null;

                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="bg-neutral-950/20 border border-neutral-900 rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        className={`w-full text-left px-4 py-3 uppercase font-mono text-xs tracking-wider flex justify-between items-center ${
                          isOpen
                            ? "text-purple-400 bg-neutral-950/40"
                            : "text-white"
                        }`}
                        onClick={() => setOpenSection(isOpen ? null : i)}
                      >
                        <span>{title}</span>
                        <span className="text-neutral-500 text-[10px]">
                          {isOpen ? "[-]" : "[+]"}
                        </span>
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
                                type="button"
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
         CONTENEDOR DE ACCIONES (FOOTER MATCHED)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center pt-8 relative z-10">
        <p className="nap-footer-text text-center text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
          {selectedPart
            ? `Nodo [ ${selectedPart.toUpperCase()} ] seleccionado`
            : "Selecciona un segmento para mapear"}
        </p>

        <div className="flex w-full max-w-xl gap-4 px-4 justify-center items-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/4 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Regresar
          </button>

          <motion.button
            type="button"
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
            type="button"
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
