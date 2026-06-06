// src/pages/shop/CustomizePage.jsx — reorganización: movido de pages/ a pages/shop/
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MarqueeText from "../../components/MarqueeText"; // reorganización: path actualizado

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS (Idénticos a TshirtSilhouettes)
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

const catalogProducts = [
  {
    id: "camisetas",
    name: "Camisetas Premium",
    image: "/src/assets/customization/tshirtD2D.webp", // Mantenemos tus referencias visuales
    material: "100% Algodón Peruano",
    desc: "Suaves, pesadas y con la caída perfecta para el estilo Streetwear.",
    route: "/customize/camisetas",
    
  },
  {
    id: "buzos",
    name: "Hoodies / Buzos",
    image: "/src/assets/customization/hoodieD2D.webp",
    material: "Burda Heavyweight",
    desc: "Máximo abrigo y comodidad sin perder la estructura rígida urbana.",
    route: "/customize/buzos",
    
  },
  {
    id: "sudaderas",
    name: "Sudaderas / Joggers",
    image: "/src/assets/customization/sweatpantsD2D.webp",
    material: "100% Algodón Pechado",
    desc: "Ajuste perfecto, bolsillos funcionales y textura ultra suave.",
    route: "/customize/sudaderas",
    
  },
  {
    id: "pantalonetas",
    name: "Pantaloneta / Shorts",
    image: "/src/assets/customization/shortD2D.webp",
    material: "100% Algodón Perchado",
    desc: "Frescura, confort y libertad de movimiento con toda la onda D2D.",
    route: "/customize/pantalonetas",
    
  },
  {
    id: "gorras",
    name: "Gorras",
    image: "/src/assets/customization/hatD2D.webp",
    material: "material premium",
    desc: "ajuste clásico, visera curva y la mejor base para tus diseños personalizados.",
    route: "/customize/gorras",
    
  },
];

export default function CustomizePage() {
  const navigate = useNavigate();

  return (
    <section className="nap-root min-h-screen flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* -- GEOMETRIC BACKGROUND (Fondo Reticulado Cyberpunk) -- */}
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
           HERO SECTION
        ----------------------------------------------------- */}
        <div className="nap-hero">
          <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
            <span className="nap-hero-code hidden md:block">
              CUSTOM_SYS_v2 // STUDIO_ROOT
            </span>
            <div className="nap-hero-ping" />
            <span className="nap-hero-tag whitespace-nowrap">— ELIGE TU LIENZO</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
            <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
              Elige tu<br /><span>Lienzo</span>
            </h1>

            <div className="max-w-sm text-center md:text-right lg:mb-20">
              <p className="nap-hero-sub">
                Todas nuestras prendas base están confeccionadas con materiales de la más alta calidad, priorizando el tacto premium y la durabilidad de tus estampados.
              </p>
              <span className="nap-hero-coord block mt-2">
                COORD: 6.2442° N, 75.5812° W
              </span>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           MARQUEE ADAPTADO
        ----------------------------------------------------- */}
        <div className="nap-marquee">
          <MarqueeText
            speed="80s"
            fontClass="font-rock"
            text={
              <>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">100% COTTON LAB</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina">PREMIUM TEXTILES SELECTION</span>
                <span className="text-purple-700 mx-3">✦</span>
                <span className="font-londrina text-white">CHOOSE YOUR SILHOUETTE</span>
              </>
            }
          />
        </div>

        {/* -----------------------------------------------------
           MAIN CONTENT AREA (CARDS RE-ESTILIZADAS)
        ----------------------------------------------------- */}
        <div className="nap-body max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {catalogProducts.map((product) => (
              <motion.div key={product.id} variants={cardVariants}>
                <button
                  onClick={() => navigate(product.route)}
                  className="nap-card w-full text-left relative flex flex-col pt-0 transition-all group hover:ring-2 hover:ring-purple-500 hover:border-purple-500 rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(10, 10, 10, 0.4)', backdropFilter: 'blur(10px)' }}
                >
                  {/* Layout interno simplificado para catálogo */}
                  <div className="flex flex-col h-auto w-full">

                    

                    <div className="w-full p-6 flex flex-col justify-between">
                      <div>
                        <span className="inline-block bg-purple-950/40 border border-purple-500/30 text-purple-400 text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-md mb-3">
                          {product.material}
                        </span>

                        <p className="text-lg font-black text-white uppercase tracking-tight font-montserrat mb-2">
                          {product.name}
                        </p>

                        <p className="text-neutral-400 text-xs font-montserrat leading-relaxed">
                          {product.desc}
                        </p>
                      </div>

                      <div className="nap-card-cta mt-4">
                        <div className="nap-cta-line" />
                        <span className="nap-cta-text text-[11px] font-mono text-neutral-400 transition-colors group-hover:text-white">
                          Empezar a Diseñar Prenda →
                        </span>
                      </div>
                    </div>

                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* -----------------------------------------------------
           BANNER EXPLICATIVO (Estilizado con bordes e iluminación)
        ----------------------------------------------------- */}
        <div className="max-w-7xl mx-auto px-4 w-full mt-12 mb-16">
          <div className="bg-neutral-950/40 border border-neutral-800/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
            {/* Efecto de fulgor violeta en fondo del banner */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-xl relative z-10">
              <h4 className="text-sm font-mono tracking-widest text-purple-400 uppercase mb-2">
                LAB_SPECIFICATION // RENDIMIENTO TEXTIL
              </h4>
              <p className="text-white font-black text-lg uppercase font-montserrat mb-2">
                ¿Por qué trabajamos con <span className="text-purple-500">100% Algodón</span>?
              </p>
              <p className="text-neutral-400 text-xs font-montserrat leading-relaxed">
                Garantiza una transpirabilidad superior, es suave con tu piel y proporciona la superficie perfecta para técnicas de estampado avanzadas (DTG, serigrafía). Tus ideas personalizadas no se cuartearán ni perderán definición con el uso continuo.
              </p>
            </div>
            
            <div className="flex gap-4 shrink-0 font-mono text-[11px] text-neutral-400 relative z-10">
              <div className="px-5 py-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-center min-w-[110px]">
                <span className="block text-xl font-black text-purple-500 font-montserrat">100%</span>
                Algodón Premium
              </div>
              <div className="px-5 py-3 bg-neutral-900/60 border border-neutral-800 rounded-xl text-center min-w-[110px]">
                <span className="block text-xl font-black text-purple-500 font-montserrat">HEAVY</span>
                Textura Pesada
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* -----------------------------------------------------
         FOOTER DE NAVEGACIÓN GENERAL (Mantiene simetría)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta mt-auto w-full flex flex-col items-center border-t border-white/5 bg-black/40 backdrop-blur-md py-6">
        <p className="nap-footer-text text-center text-neutral-500 text-xs uppercase tracking-widest font-mono">
          [ SISTEMA DE SELECCIÓN BASE // D2D STUDIO ]
        </p>
      </div>
    </section>
  );
}