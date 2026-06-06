// src/pages/customize/TshirtStep3Color.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText";

// --- MODELO 1: polo (tshirt1) ---
import frentePolo from "/src/assets/hoodieParts/polocustom.webp";
// --- MODELO 2: regular (tshirt2) ---
import frenteRegular from "/src/assets/hoodieParts/regularcustom.webp";
// --- MODELO 3: oversize (tshirt3) ---
import frenteOversize from "/src/assets/hoodieParts/oversizecustom.webp";
// --- MODELO 4: siza (tshirt4) ---
import frentesiza from "/src/assets/hoodieParts/sizacustom.webp";

const tshirtModelsData = {
  tshirt1: {
    label: "polo",
    parts: [{ name: "frente polo", image: frentePolo }]
  },
  tshirt2: {
    label: "regular",
    parts: [{ name: "frente regular", image: frenteRegular }]
  },
  tshirt3: {
    label: "oversize",
    parts: [{ name: "frente oversize", image: frenteOversize }]
  },
  tshirt4: {
    label: "siza",
    parts: [{ name: "frente siza", image: frentesiza }]
  }
};

const colorOptions = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "blue", hex: "#0000ff" },
  { name: "red", hex: "#ff0000" },
  { name: "green", hex: "#00ff00" },
];

export default function TshirtStep3Color({ onNext }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedTshirt = state?.selectedTshirt || "tshirt2";
  const currentModel = tshirtModelsData[selectedTshirt] || tshirtModelsData["tshirt2"];
  const singlePart = currentModel.parts[0];

  const [colors, setColors] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const [shakePreview, setShakePreview] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleColorSelect = (hex) => {
    setColors({ [singlePart.name]: hex });
    setErrorMessage("");
  };

  const getHex = (name) => colors[name] || "transparent";

  const handlePreview = () => {
    if (!colors[singlePart.name]) {
      setErrorMessage("Debes seleccionar el color para ver el preview.");
      setShakePreview(true);
      setTimeout(() => setShakePreview(false), 400);
      return;
    }
    setErrorMessage("");
    setShowPreview(true);
  };

  const handleNextClick = () => {
    if (!colors[singlePart.name]) {
      setErrorMessage("Debes seleccionar el color de la prenda antes de continuar.");
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }
    setErrorMessage("");
    if (onNext) onNext();
  };

  const activeColor = getHex(singlePart.name);
  const isBlackSelected = activeColor === "#000000";
  const isWhiteSelected = activeColor === "#ffffff";

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

        {/* HERO SECTION */}
        <div className="nap-hero relative z-10">
          <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
            <span className="nap-hero-code hidden md:block">CUSTOM_SYS_v2 // CHROMATIC_LAB</span>
            <div className="nap-hero-ping" />
            <span className="nap-hero-tag whitespace-nowrap">— COLOR PASO 3 ({currentModel.label.toUpperCase()})</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              hora del <br /><span>Color</span>
            </h1>
            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">Elige el color base para el lienzo de tu silueta {currentModel.label}.</p>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
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

        {/* MAIN CONTENT */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full mt-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
            
            {/* VISUALIZADOR RECTIFICADO (MÁXIMO CONTRASTE TEXTIL) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center md:sticky md:top-6">
              <div className="nap-card w-full max-w-sm relative flex items-center justify-center p-6 bg-neutral-950/40 border border-neutral-900 rounded-xl overflow-hidden group">
                <div className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center rounded-lg overflow-hidden bg-neutral-950/20">
                  
                  <div 
                    className="relative w-full h-full"
                    style={{
                      filter: isBlackSelected 
                        ? "drop-shadow(1px 0px 0px #ffffff) drop-shadow(-1px 0px 0px #ffffff) drop-shadow(0px 1px 0px #ffffff) drop-shadow(0px -1px 0px #ffffff)" 
                        : "none"
                    }}
                  >
                    {/* CAPA 1: COLOR SÓLIDO TOTAL (Abajo - z-10) */}
                    {colors[singlePart.name] && (
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          backgroundColor: activeColor,
                          WebkitMask: `url(${singlePart.image}) center / contain no-repeat`,
                          mask: `url(${singlePart.image}) center / contain no-repeat`,
                        }}
                      />
                    )}

                    {/* CAPA 2: MOTOR DE TEXTURA DE ALTO IMPACTO (Arriba - z-20) */}
                    <img
                      src={singlePart.image}
                      alt={singlePart.name}
                      className="w-full h-full object-contain absolute inset-0 z-20 pointer-events-none"
                      style={{
                        // Inversión matemática para replicar la subexposición lineal de Photoshop sobre gris claro
                        mixBlendMode: colors[singlePart.name] 
                          ? (isWhiteSelected ? "normal" : "multiply") 
                          : "normal",
                        // Incrementamos agresivamente el contraste de los pliegues para simular el 'Burn' puro
                        }}
                    />
                  </div>

                </div>
                
                <div className="nap-card-crosshair">
                  <div className="nap-crosshair-ring">
                    <div className="nap-crosshair-h" /><div className="nap-crosshair-v" /><div className="nap-crosshair-dot" />
                  </div>
                </div>
                <span className="nap-badge-tech">
                  {colors[singlePart.name] ? `ACTIVE // ${colors[singlePart.name]}` : "AWAITING_COLOR_SELECTION"}
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

            {/* PALETA DERECHA */}
            <div className="md:col-span-7 w-full flex flex-col gap-4">
              <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-6">
                <p className="font-mono text-xs uppercase text-neutral-500 tracking-wider mb-4 text-center md:text-left">
                  SELECCIONAR COLOR (Canvas Unificado)
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {colorOptions.map(({ name, hex }) => (
                    <button
                      key={hex}
                      className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-105 ${
                        colors[singlePart.name] === hex ? "scale-110 border-purple-500" : "border-neutral-800 hover:border-neutral-600"
                      }`}
                      style={{ backgroundColor: hex }}
                      title={name}
                      onClick={() => handleColorSelect(hex)}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full text-left border border-neutral-900 bg-neutral-950/20 font-mono text-xs uppercase tracking-widest p-4 rounded-xl text-purple-400">
                Lienzo actual: <span className="text-white">{singlePart.name}</span>
              </div>

              <AnimatePresence>
                {errorMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
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

      {/* FOOTER CTA */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center pt-8 relative z-10">
        <p className="nap-footer-text text-center">
          {colors[singlePart.name] ? `Color [ ${colors[singlePart.name]} ] listo para producción` : "Mapea un tono en el panel superior"}
        </p>

        <div className="flex w-full max-w-xl gap-4 px-4 justify-center items-center mt-2">
          <button onClick={() => navigate(-1)} className="w-1/4 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent">
            Regresar
          </button>
          <motion.button onClick={handlePreview} className={`w-1/3 py-3 text-xs font-mono uppercase tracking-widest text-center border rounded transition-all ${shakePreview ? "animate-shake" : ""} bg-neutral-900 border-neutral-800 text-yellow-400 hover:border-yellow-500/40 hover:bg-yellow-500/5`} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            Preview
          </motion.button>
          <motion.button onClick={handleNextClick} className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center rounded flex items-center justify-center gap-2 border transition-all ${shakeNext ? "animate-shake" : ""} bg-purple-600 border-purple-500 text-white hover:bg-purple-700`} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            Siguiente Paso →
          </motion.button>
        </div>
      </div>
    </section>
  );
}