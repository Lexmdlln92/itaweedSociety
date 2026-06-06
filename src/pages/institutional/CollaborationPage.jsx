// src/pages/CollaborationPage.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import MarqueeText from "../../components/MarqueeText"; // Ajusta la ruta según tu estructura
import anaBravoImg from "../../assets/collaborations/anabravo.webp";

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS (Estilo Custom Lab)
----------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 30 },
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

const CollaborationPage = () => {
  const navigate = useNavigate();

  return (
    <section className="nap-root min-h-screen flex flex-col justify-between relative overflow-hidden bg-black text-white">
      <div>
        {/* -- GEOMETRIC BACKGROUND (Estilo TshirtSilhouettes) -- */}
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
        <div className="nap-hero px-6 pt-14 md:px-20">
          <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
            <span className="nap-hero-code hidden md:block text-amber-500/80">
              COLLAB_SYS_v4 // MONTHLY_FEATURE
            </span>
            <div className="nap-hero-ping bg-amber-400" />
            <span className="nap-hero-tag whitespace-nowrap text-gray-400">— ALIANZA</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-4xl md:!text-6xl leading-none font-bold uppercase tracking-tight">
              Colaboración del mes:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                Ana Bravo Ink
              </span>
            </h1>

            <div className="max-w-md text-center md:text-right lg:mb-4">
              <p className="nap-hero-sub text-gray-400 text-sm font-mono leading-relaxed">
                Esta alianza celebra la fusión entre arte corporal y moda urbana. Nos unimos con <strong>Ana Bravo Ink</strong>, un estudio de tatuajes reconocido por su estilo fino y enfoque personalizado.
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
        <div className="nap-marquee my-8 border-y border-neutral-900 bg-neutral-950/50 py-3">
          <MarqueeText
            speed="80s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-amber-400 mx-3">✦</span>
                <span className="font-londrina text-white tracking-widest">ANA BRAVO INK</span>
                <span className="text-amber-400 mx-3">✦</span>
                <span className="font-londrina text-neutral-500">LIMITED TEXTILE EDITION</span>
                <span className="text-amber-400 mx-3">✦</span>
                <span className="font-londrina text-white">FINE LINE ART</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA
        ----------------------------------------------------- */}
        <div className="max-w-6xl mx-auto px-6 w-full mb-16">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* COLUMNA IZQUIERDA: IMAGEN + REDES (4 Columnas) */}
            <motion.div variants={blockVariants} className="lg:col-span-5 flex flex-col gap-6">
              <div className="nap-card w-full relative overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950/20 p-2">
                <div className="w-full relative overflow-hidden bg-neutral-950/40 rounded-lg">
                  <img
                    src={anaBravoImg}
                    alt="Ana Bravo Ink"
                    className="w-full h-auto object-cover block mx-auto transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Crosshair Cyberpunk */}
                  <div className="nap-card-crosshair">
                    <div className="nap-crosshair-ring">
                      <div className="nap-crosshair-h" />
                      <div className="nap-crosshair-v" />
                      <div className="nap-crosshair-dot" />
                    </div>
                  </div>

                  {/* Badge Tecnológico */}
                  <span className="nap-badge-tech !border-amber-500/30 !text-amber-400 bg-black/80">
                    ARTIST_ID_2017
                  </span>
                </div>
              </div>

              {/* Redes sociales estilizadas */}
              <div className="flex justify-center gap-6 text-2xl border border-neutral-900 bg-neutral-950/40 py-4 rounded-xl backdrop-blur-sm">
                <a
                  href="https://instagram.com/anabravoink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://facebook.com/anabravoink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://anabravoink.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-400 transition-colors"
                  aria-label="Sitio Web"
                >
                  <FaGlobe />
                </a>
              </div>
            </motion.div>

            {/* COLUMNA DERECHA: SOBRE EL ARTISTA + SECCIONES DE ACCIÓN (7 Columnas) */}
            <motion.div variants={blockVariants} className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Bloque: Sobre Ana Bravo Ink */}
              <div className="nap-card p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm">
                <span className="text-[9px] font-mono tracking-widest text-amber-500/80 block mb-2">
                  PROFILE ARCHIVE // BACKGROUND
                </span>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4 font-mono">
                  Sobre Ana Bravo Ink
                </h2>
                <div className="space-y-4 text-gray-400 text-sm md:text-base font-sans leading-relaxed">
                  <p>
                    Ana Bravo ha estado dejando su huella en la piel de cientos de personas desde 2017. Su estudio combina técnica, arte e intimidad en cada diseño.
                  </p>
                  <p className="border-l-2 border-amber-500/40 pl-4 text-amber-300/90 font-mono text-sm italic">
                    Esta colaboración trae productos inspirados en su arte, fusionando ilustraciones originales con textiles de alta calidad.
                  </p>
                </div>
              </div>

              {/* Bloque: Participa por un tatuaje */}
              <div className="nap-card p-6 rounded-xl border border-amber-500/20 bg-neutral-950/60 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-mono tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    GIVEAWAY // LIVE
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-amber-400 uppercase tracking-tight mb-2">
                  Participa por un tatuaje exclusivo de Ana Bravo Ink
                </h3>
                <p className="text-gray-300 text-sm md:text-base font-mono">
                  Al comprar cualquier prenda de las marcas <span className="text-amber-500 font-bold">D2D</span> o <span className="text-amber-500 font-bold">LEX</span> durante este mes.
                </p>
                <p className="text-[11px] text-neutral-500 mt-4 font-mono italic">*Aplica condiciones y restricciones.</p>
              </div>

              {/* Bloque: Formulario de Registro */}
              <div className="nap-card p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 block mb-1">
                  SECURE_FORM // ACTION_REQUIRED
                </span>
                <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-tight mb-2">
                  Formulario para registrar tu compra y psrticipar por el premio de la colaboracion del mes
                </h3>
                <p className="text-[11px] text-neutral-500 font-mono italic">*Aplica condiciones y restricciones.</p>
              </div>

              {/* Bloque: Video del Invitado */}
              <div className="nap-card p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm">
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 block mb-1">
                  STREAM_FEED // MP4_SOURCE
                </span>
                <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-tight mb-2">
                  video del invitado
                </h3>
                <p className="text-[11px] text-neutral-500 font-mono italic">*Aplica condiciones y restricciones.</p>
              </div>

              {/* Bloque: ¿Quieres colaborar? */}
              <div className="nap-card p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-amber-500/80 block mb-1">
                    B2B // SLOTS_OPEN
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-tight">
                    tienes un producto o servicio y que colaboremos?
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-mono italic mt-1">*consulta mas detalles.</p>
                </div>
                <a
                  href="https://wa.me/XXXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-white hover:border-neutral-600 rounded text-center whitespace-nowrap bg-neutral-900/50 transition-colors"
                >
                  Contactar
                </a>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* -----------------------------------------------------
         CONTENEDOR DE ACCIONES (FOOTER CTA STYLE)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center bg-gradient-to-t from-neutral-950 to-transparent pt-8 pb-10 border-t border-neutral-900/40">
        <p className="nap-footer-text text-center text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
          OPERACIONES DE COMUNIDAD // ITAWEED SOCIETY
        </p>

        <div className="flex w-full max-w-sm gap-4 px-6 justify-center items-center">
          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Volver
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollaborationPage;