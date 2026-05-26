// src/components/BrandSection.jsx
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MarqueeText from "../components/MarqueeText";

// ── LEX Assets ──
import lexLogo from "../assets/brandSectionLex/logoLEX.webp";
import lexCover1 from "../assets/brandSectionLex/lexcover1.webp";
import lexCover2 from "../assets/brandSectionLex/lexcover2.webp";
import lexCover3 from "../assets/brandSectionLex/lexcover3.webp";

// ── D2D Assets ──
import coverD2D1 from "../assets/brandSectionD2D/coverD2D1.webp";
import coverD2Dlogo from "../assets/brandSectionD2D/coverD2Dlogo.webp";
import coverD2D2 from "../assets/brandSectionD2D/coverD2D2.webp";
import coverD2D3 from "../assets/brandSectionD2D/coverD2D3.webp";
import coverD2D4 from "../assets/brandSectionD2D/coverD2D4.webp";
import spaceBg from "../assets/brandSectionD2D/space.webp";

const cover = [
  {
    id: "lex",
    logo: lexLogo,
    type: "lex",
    images: {
      left: lexCover1,
      right: lexCover2,
      bottom: lexCover3,
    },
  },
  {
    id: "d2d",
    type: "d2d",
    background: spaceBg,
    images: {
      topLeft: coverD2D1,
      topRight: coverD2Dlogo,
      left: coverD2D2,
      center: coverD2D3,
      right: coverD2D4,
    },
  },
];

export default function BrandSection() {
  const lexSectionRef = useRef(null);

  const { scrollYProgress: lexScrollProgress } = useScroll({
    target: lexSectionRef,
    offset: ["start end", "center center"],
  });

  const lexLeftX = useTransform(lexScrollProgress, [0, 1], [-220, 0]);
  const lexRightX = useTransform(lexScrollProgress, [0, 1], [220, 0]);
  const lexCenterY = useTransform(lexScrollProgress, [0, 1], [180, -20]);

  const lexGlitchOpacity = useTransform(
    lexScrollProgress,
    [0, 0.18, 0.45, 0.75, 1],
    [0, 0.8, 0.25, 0.65, 0]
  );

  const lexGlitchShift = useTransform(
    lexScrollProgress,
    [0, 0.35, 0.7, 1],
    ["3px", "15px", "9px", "0px"]
  );

  return (
    <section className="mt-1 overflow-hidden">

      {/* ===================== LEX SECTION ===================== */}
      <div ref={lexSectionRef} className="relative">

        <div className="overflow-hidden relative bg-[#2a0a59] lg:h-[100vh] lg:min-h-[750px] border-t border-b border-white/10">

          {/* ── GRID PATTERN ── */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── DARK OVERLAY ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center lg:px-8 relative z-10">

            {/* ===================== IMAGES ===================== */}
            <div className="relative h-[420px] lg:h-[95vh] w-full order-2 lg:order-1 flex items-end justify-center overflow-visible lg:mt-10">

              <div className="relative w-full h-full flex items-end justify-center">

                {/* LEFT */}
                <motion.div
                  className="absolute -left-28 top-10 w-90 object-cover z-10 lg:relative lg:left-auto lg:top-auto lg:w-[100%] lg:!transform-none"
                  style={{
                    x: lexLeftX,
                    y: -170,
                    "--glitch-opacity": lexGlitchOpacity,
                    "--glitch-shift": lexGlitchShift,
                  }}
                >
                  <div className="scroll-glitch-image lex-glitch-mask">
                    <img
                      src={cover[0].images.left}
                      alt="LEX LEFT"
                      className="w-full object-cover lg:scale-165 lg:origin-bottom lex-fade-mask"
                    />

                    <img
                      src={cover[0].images.left}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-cyan lg:scale-165 lg:origin-bottom lex-fade-mask"
                    />

                    <img
                      src={cover[0].images.left}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-red lg:scale-165 lg:origin-bottom lex-fade-mask"
                    />
                  </div>
                </motion.div>

                {/* CENTER */}
                <motion.div
                  className="absolute left-1/2 -bottom-8 w-76 object-cover z-30 lg:relative lg:left-auto lg:bottom-auto lg:w-[130%] lg:-ml-16 lg:-mr-16 lg:!transform-none"
                  style={{
                    x: "-45%",
                    y: lexCenterY,
                    "--glitch-opacity": lexGlitchOpacity,
                    "--glitch-shift": lexGlitchShift,
                  }}
                >
                  <div className="scroll-glitch-image scroll-glitch-image-slow lex-glitch-mask-soft">
                    <img
                    src={cover[0].images.bottom}
                    alt="LEX CENTER"
                    className="w-full object-cover lg:scale-115 lg:origin-bottom lex-fade-mask-soft"
                  />

                    <img
                      src={cover[0].images.bottom}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-cyan lg:scale-115 lg:origin-bottom lex-fade-mask-soft"
                    />

                    <img
                      src={cover[0].images.bottom}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-red lg:scale-115 lg:origin-bottom lex-fade-mask-soft"
                    />
                  </div>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                  className="absolute -right-28 top-10 w-75 object-cover z-20 lg:relative lg:right-auto lg:top-auto lg:w-[82%] lg:!transform-none"
                  style={{
                    x: lexRightX,
                    y: -170,
                    "--glitch-opacity": lexGlitchOpacity,
                    "--glitch-shift": lexGlitchShift,
                  }}
                >
                  <div className="scroll-glitch-image scroll-glitch-image-delay lex-glitch-mask">
                    <img
                      src={cover[0].images.right}
                      alt="LEX RIGHT"
                      className="w-full object-cover lg:scale-170 lg:origin-bottom lex-fade-mask"
                    />

                    <img
                      src={cover[0].images.right}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-cyan lg:scale-170 lg:origin-bottom lex-fade-mask"
                    />

                    <img
                      src={cover[0].images.right}
                      alt=""
                      className="scroll-glitch-layer scroll-glitch-layer-red lg:scale-170 lg:origin-bottom lex-fade-mask"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ===================== CONTENT ===================== */}
            <div className="px-6 py-10 relative z-20 order-1 lg:order-2 flex flex-col items-center justify-center text-center lg:h-full lg:w-full lg:max-w-xl lg:mx-auto">

              {/* LABELS */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase hidden lg:block">
                  DROP CODE: LEX_FACTORY_01 // MEDELLIN, COL
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />

                <p className="text-orange-400 text-xs tracking-[0.3em] font-montserrat uppercase font-bold">
                  — LIMITED DROP
                </p>
              </div>

              {/* LOGO */}
              <motion.img
                src={cover[0].logo}
                alt="LEX"
                className="h-24 lg:h-44 w-auto object-contain  lg:relative lg:left-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />

              {/* TITLE */}
              <div className="text-center mb-8">

                <h2 className="text-3xl lg:text-6xl font-bold leading-none tracking-tight font-rock text-amber-400 lg:-mt-6 relative lg:left-8">
                  Factory
                </h2>

                

                <p className="text-orange-400 mt-5 text-lg lg:text-2xl font-bold tracking-widest uppercase">
                  
                </p>

                <p className="text-white/50 mt-4 text-sm lg:text-base leading-relaxed max-w-md mx-auto font-montserrat lg:left-8 relative">
                  Prendas creadas para romper el algoritmo visual de la calle.
                  Cada pieza existe en cantidades mínimas para preservar la
                  rareza real.
                </p>

              
              </div>

              {/* BUTTON */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: "#fb923c",
                  boxShadow: "0 0 20px rgba(251, 146, 60, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products/vision-lex"
                  className="group flex items-center -gap-3 px-6 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent relative overflow-hidden lg:left-8 "
                >
                  ver todos

                  <motion.span
                    className="inline-block text-orange-400 group-hover:text-white"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MARQUEE ===================== */}
      <MarqueeText
        text="🔹ITAWEED SOCIETY🔹ITAWEED SOCIETY"
        speed="10s"
        fontClass="font-londrina"
      />

      {/* ===================== D2D SECTION ===================== */}
      <div className="relative">

        <div className="relative overflow-hidden border-t border-b border-white/10">

          {/* BG */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${cover[1].background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* GRID */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

          {/* MOBILE */}
          <div className="lg:hidden relative z-10">

            <div className="px-4 pt-6 pb-2 relative">

              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  DROP CODE: D2D_UNI_05
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              </div>

              <div className="flex items-center justify-center mb-4 relative -left-6">
                <div className="ml-16 mt-1">
                  <img
                    src={cover[1].images.topRight}
                    alt="D2D Logo"
                    className="h-30 w-auto"
                  />
                </div>
              </div>

              <div className="text-center mb-4 font-londrina px-2">
                <p
                  className="text-white font-bold italic leading-tight"
                  style={{ fontSize: "2.2rem" }}
                >
                  Sonríe mira que existes
                </p>

                <p
                  className="text-white/80 font-dancing"
                  style={{ fontSize: "1.6rem" }}
                >
                  Prendas de otra galaxia
                </p>
              </div>

              <div className="flex justify-center mb-2 px-2">
                <Link
                  to="/products/universo-d2d"
                  className="px-6 py-2 border-2 border-white bg-green-400 text-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
                >
                  Ver todos
                </Link>
              </div>
            </div>

            {/* ALIENS */}
            <div className="relative w-full z-10 h-[520px] overflow-hidden bg-gradient-to-b from-transparent to-black/40">

              <motion.div
                className="absolute -left-3 top-0 w-64 z-10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
              >
                <img
                  src={cover[1].images.left}
                  alt="Alien Izquierda"
                  className="w-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div
                className="absolute -right-6 top-4 w-56 z-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
              >
                <img
                  src={cover[1].images.right}
                  alt="Alien Derecha"
                  className="w-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div
                className="absolute left-1/2 -bottom-44 w-72 z-20 -translate-x-1/2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                }}
              >
                <img
                  src={cover[1].images.center}
                  alt="Alien Centro"
                  className="w-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>

          {/* DESKTOP */}
          <div
            className="hidden lg:grid lg:grid-cols-2 relative z-10"
            style={{ height: "760px" }}
          >

            {/* LEFT */}
            <div className="relative flex flex-col justify-center px-16 py-16 gap-8">

              <div className="flex items-center gap-4 mb-2">
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                  DROP CODE: D2D_UNI_05 // MEDELLIN, COL
                </span>

                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              </div>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <img
                  src={cover[1].images.topLeft}
                  alt="Universo UFO"
                  className="h-34 w-auto object-contain"
                />
                <img
                  src={cover[1].images.topRight}
                  alt="D2D Logo"
                  className="h-50 w-auto object-contain"
                />

                <img
                  src={cover[1].images.topLeft}
                  alt="Universo UFO"
                  className="h-34 w-auto object-contain"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p
                  className="text-white font-bold italic leading-tight font-londrina text-center"
                  style={{ fontSize: "3.5rem" }}
                >
                  Sonríe mira que existes
                </p>

                <p
                  className="text-white/70 font-dancing mt-1 text-center"
                  style={{ fontSize: "2rem" }}
                >
                  Prendas de otra galaxia
                </p>
              </motion.div>

              <motion.div
                className="group flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent relative overflow-hidden w-fit cursor-pointer mx-auto"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#8b5cf6",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products/universo-d2d"
                  className="flex items-center gap-3 w-full justify-center "
                >
                  ver todos

                  <motion.span
                    className="inline-block text-violet-700 group-hover:text-white"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="relative overflow-hidden" style={{ height: "760px" }}>

              <motion.div
                className="absolute object-contain object-bottom cursor-pointer"
                style={{
                  left: 60,
                  bottom: -100,
                  height: "760px",
                  width: "auto",
                  zIndex: 10,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
              >
                <img
                  src={cover[1].images.left}
                  alt="Alien Izquierda"
                  className="h-full w-auto object-contain object-bottom"
                />
              </motion.div>

              <motion.div
                className="absolute object-contain object-bottom cursor-pointer"
                style={{
                  right: 40,
                  bottom: -100,
                  height: "760px",
                  width: "auto",
                  zIndex: 10,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
              >
                <img
                  src={cover[1].images.right}
                  alt="Alien Derecha"
                  className="h-full w-auto object-contain object-bottom"
                />
              </motion.div>

              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  bottom: -270,
                  height: "780px",
                  width: "auto",
                  zIndex: 20,
                }}
              >
                <motion.div
                  className="h-full w-auto cursor-pointer"
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                  }}
                >
                  <img
                    src={cover[1].images.center}
                    alt="Alien Centro"
                    className="h-full w-auto object-contain object-bottom"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

