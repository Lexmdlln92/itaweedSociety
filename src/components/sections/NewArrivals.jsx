// src/components/NewArrivals.jsx
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Importar las imágenes necesarias
import t1 from "../../assets/tshirt1.webp";
import t3 from "../../assets/D2D/tshirt3.webp";
import t5 from "../../assets/lex/tshirt5.webp";
import sp1 from "../../assets/lex/sweatpants1.webp";
import cap1 from "../../assets/lex/cap1.webp";
import buzo5 from "../../assets/lex/buzo5.webp";

// UNIFIED PRODUCT DATA - Esta debe coincidir exactamente con ProductDetail.jsx y ProductsPage.jsx
const products = [
  {
    id: "1",
    name: "Monkey fly",
    price: "80.000 cop",
    image: t1,
    rating: 4.5,
  },
  {
    id: "13",
    name: "Lex Esmeralda",
    category: "gorras",
    price: "60.000 cop",
    image: cap1,
    rating: 4.3,
  },
  {
    id: "3",
    name: "D2D japanese",
    price: "80.000 cop",
    discount: "95.000 cop",
    image: t3,
    rating: 4.3,
  },
  {
    id: "5",
    name: "Dirty Bart black",
    price: "80.000 cop",
    discount: "90.000 cop",
    image: t5,
    rating: 4.3,
  },
  {
    id: "14",
    name: "Sudadera artico",
    price: "90.000 cop",
    discount: "105.000 cop",
    image: sp1,
    rating: 4.3,
  },
  {
    id: "16",
    name: "Drugsrats white",
    category: "buzos",
    price: "150.000 cop",
    image: buzo5,
    rating: 4.4,
  },
];

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

export default function NewArrivals() {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white overflow-hidden border-t border-b border-white/10 relative">
      {/* ── PATRÓN DE FONDO GEOMÉTRICO (CSS Puro) ── */}
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

      {/* ── HEADER CON COORDENADAS Y DETALLES DE DROP (Corteiz Style) ── */}
      <div className="px-6 pt-16 pb-10 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 relative z-10">
        <div className="text-center lg:text-left">
          {/* Etiquetas superiores de lanzamiento */}
          <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-4 mb-3">
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
              DROP CODE: ITW_DS_05 // MEDELLIN, COL
            </span>

            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />

              <p className="text-violet-700 text-xs tracking-[0.3em] font-montserrat uppercase font-bold">
                — NUEVO INGRESO
              </p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none font-montserrat tracking-tight">
            Nuevos
            <br />
            <span className="text-violet-700">Productos</span>
            <br />
          </h2>
        </div>
        <div className="flex-col gap-2 max-w-xs font-montserrat text-sm hidden md:block mb-5">
          <p className="text-white/40 tracking-wide leading-relaxed">
            Sintoniza las piezas exclusivas de la temporada. Solo 7 unidades
            producidas por prenda para mantener la escasez real.
          </p>
          <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase self-start block">
            COORD: 6.2442° N, 75.5812° W
          </span>
        </div>
      </div>

      {/* ── MATRIZ DE PRODUCTOS CON MIRA TELESCÓPICA Y ZOOM SHUTTER ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-b border-white/10 relative z-10"
      >
        {products.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className={`bg-black relative overflow-hidden group border-r border-b border-white/10 flex flex-col justify-between ${idx >= 4 ? "hidden md:flex" : "flex"}`}
          >
            {/* Contenedor de Imagen de Producto con mira telescópica */}
            <Link
              to={`/product/${item.id}`}
              className="block relative overflow-hidden aspect-[3/4] w-full bg-neutral-950"
            >
              {/* Imagen del producto */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 pointer-events-none"
              />

              {/* Overlay oscuro para la base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Mira Holográfica de Radar (Corteiz Style) en hover */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
                {/* Círculo principal de mira */}
                <div className="w-20 h-20 rounded-full border border-green-400/0 scale-75 group-hover:scale-100 group-hover:border-green-400/35 transition-all duration-500 flex items-center justify-center">
                  {/* Ejes horizontales y verticales */}
                  <div className="absolute w-full h-[1px] bg-green-400/0 group-hover:bg-green-400/20 transition-all duration-500 scale-x-75 group-hover:scale-x-100" />
                  <div className="absolute h-full w-[1px] bg-green-400/0 group-hover:bg-green-400/20 transition-all duration-500 scale-y-75 group-hover:scale-y-100" />
                  {/* Punto central esmeralda brillante */}
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400/0 group-hover:bg-green-400/80 transition-all duration-500 shadow-md shadow-green-400/50" />
                </div>
              </div>

              {/* Tag técnico superior izquierdo */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
                <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-white/5 font-semibold">
                  ITW_DS_05
                </span>
              </div>

              {/* Sello de limitación de stock (1 de 7 prendas) */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <span className="text-[8px] font-mono text-violet-700 tracking-widest uppercase bg-violet-700/10 px-2 py-0.5 rounded border border-violet-700/20 font-bold">
                  1 / 7 PCS
                </span>
              </div>
            </Link>

            {/* Detalles de Producto */}
            <div className="p-5 flex flex-col justify-between flex-grow gap-2 relative z-20 bg-black">
              <div>
                {/* Nombre */}
                <h3 className="text-sm md:text-base font-black uppercase font-montserrat truncate text-white group-hover:text-violet-700 transition-colors duration-300 leading-tight">
                  {item.name}
                </h3>

                {/* Subtítulo técnico */}
                <span className="text-[9px] font-mono text-white/20 tracking-wider block mt-0.5">
                  RTW // STREETWEAR
                </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                {/* Precio */}
                <div className="text-sm font-montserrat">
                  <span className="font-bold text-white text-sm md:text-base">
                    ${item.price}
                  </span>
                  {item.discount && (
                    <span className="line-through ml-2 text-red-500/50 text-xs font-medium">
                      ${item.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Micro-animación de Ver Prenda */}
              <div className="flex items-center gap-2 mt-2 overflow-hidden h-4 pointer-events-none">
                <div className="w-0 group-hover:w-6 h-[2px] bg-violet-700 transition-all duration-300" />
                <span className="text-[9px] text-white/0 group-hover:text-white/60 font-montserrat tracking-widest uppercase transition-all duration-300">
                  Ver detalle →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── FOOTER CTA ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-12 md:px-16 lg:px-24 border-t border-white/10 relative z-10 bg-black">
        <p className="text-white/30 text-sm font-montserrat tracking-widest uppercase">
          Consigue las prendas del drop exclusivo de la calle
        </p>
        <motion.button
          onClick={() => navigate("/products/new")}
          className="group flex items-center gap-3 px-8 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase bg-transparent relative overflow-hidden"
          whileHover={{
            scale: 1.05,
            borderColor: "#8b5cf6",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          ver todos
          <motion.span
            className="inline-block text-violet-700 group-hover:text-white"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
