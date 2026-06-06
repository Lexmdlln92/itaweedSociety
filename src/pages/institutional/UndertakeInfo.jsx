// src/pages/UndertakeInfo.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MarqueeText from "../../components/MarqueeText"; // Ajusta la ruta según tu estructura

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

const UndertakeInfo = () => {
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
              UPGRADE_SYS_v1 // PARTNERSHIP
            </span>
            <div className="nap-hero-ping bg-amber-400" />
            <span className="nap-hero-tag whitespace-nowrap text-gray-400">
              — BUSINESS
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-7xl leading-none font-bold uppercase tracking-tight">
              Emprendé con
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                Itaweed Society
              </span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-4">
              <p className="nap-hero-sub text-gray-400 text-sm font-mono">
                Desbloquea el potencial de tu marca utilizando nuestra
                infraestructura de producción premium y canales de distribución.
              </p>
              <span className="nap-hero-coord block mt-2 text-neutral-600">
                COORD: 6.1736° N, 75.6083° W
              </span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           MARQUEE (Heredando el comportamiento visual)
        ----------------------------------------------------- */}
        <div className="nap-marquee my-8 border-y border-neutral-900 bg-neutral-950/50 py-1">
          <MarqueeText
            speed="90s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-white tracking-widest">
                  ITAWEED SOCIETY CO
                </span>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-neutral-500">
                  PREMIUM PRODUCTION LAB
                </span>
                <span className="text-violet-700 mx-3">✦</span>
                <span className="font-londrina text-white">
                  OFFICIAL DISTRIBUTOR
                </span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA (BENEFICIOS MODULARES)
        ----------------------------------------------------- */}
        <div className="max-w-5xl mx-auto px-6 w-full mb-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Opción 1: Creá tu propia marca */}
            <motion.div variants={blockVariants}>
              <div className="nap-card w-full text-left relative flex flex-col p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm group min-h-[280px] justify-between">
                {/* Detalles Cyberpunk estáticos */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono tracking-widest text-violet-700 bg-violet-700/10 px-2 py-0.5 rounded border border-violet-700/20">
                    LN_01 // CREATIVE
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-violet-700 uppercase tracking-tight flex items-center gap-2 mb-4">
                    <span></span> Creá tu propia marca
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                    Si tenés una idea o querés lanzar tu propia línea, nosotros
                    te ayudamos con diseño, producción y canales de venta. Todo
                    en un solo lugar y con calidad premium.
                  </p>
                </div>

                {/* Footer interno de la card con CTA limpio */}
                <div className="w-full mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">
                    READY_FOR_DEPLOY
                  </span>
                  <a
                    href="https://wa.me/XXXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white group-hover:text-violet-700 transition-colors flex items-center gap-1"
                  >
                    Consultar más{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Opción 2: Sé un distribuidor oficial */}
            <motion.div variants={blockVariants}>
              <div className="nap-card w-full text-left relative flex flex-col p-6 rounded-xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm group min-h-[280px] justify-between">
                {/* Detalles Cyberpunk estáticos */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono tracking-widest text-violet-700 bg-violet-700/10 px-2 py-0.5 rounded border border-violet-700/20">
                    DIST_02 // STOCK
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-violet-700 uppercase tracking-tight flex items-center gap-2 mb-4">
                    Sé un distribuidor oficial
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                    Únete como revendedor de nuestras colecciones. Accedé a
                    productos exclusivos con stock limitado, tarifas
                    competitivas y beneficios especiales para vendedores
                    autorizados.
                  </p>
                </div>

                {/* Footer interno de la card con CTA limpio */}
                <div className="w-full mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">
                    GLOBAL_ACCESS
                  </span>
                  <a
                    href="https://wa.me/XXXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white group-hover:text-violet-700 transition-colors flex items-center gap-1"
                  >
                    Unirse a la red{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* -----------------------------------------------------
         CONTENEDOR DE ACCIONES (FOOTER ACCIONES GLOBAL)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center bg-gradient-to-t from-neutral-950 to-transparent pt-10 pb-8 border-t border-neutral-900/40">
        <p className="nap-footer-text text-center text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 animate-pulse">
          ¿Listo para empezar tu operación?
        </p>

        <div className="flex w-full max-w-md gap-4 px-6 justify-center items-center">
          {/* Botón Volver */}
          <button
            onClick={() => navigate(-1)}
            className="w-1/3 py-3 border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:border-neutral-600 rounded transition-colors bg-transparent"
          >
            Volver
          </button>

          {/* Botón WhatsApp Principal */}
          <motion.a
            href="https://wa.me/XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-xs font-mono uppercase tracking-widest text-center rounded flex items-center justify-center gap-2 border bg-purple-700 border-purple-700 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Escribinos por WhatsApp
            <span className="text-xs">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default UndertakeInfo;
