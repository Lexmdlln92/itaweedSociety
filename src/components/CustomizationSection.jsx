// src/components/CustomizationSection.jsx
import camisetas from "../assets/customization/tshirtD2D.webp";
import buzos from "../assets/customization/hoodieD2D.webp";
import sudaderas from "../assets/customization/sweatpantsD2D.webp";
import pantalonetas from "../assets/customization/shortD2D.webp";
import { useNavigate } from "react-router-dom";

const styles = [
  {
    label: "Camisetas",
    decorativeText: "C",
    image: camisetas,
    path: "/customize/camisetas",
    tag: "T-SHIRT",
  },
  {
    label: "Buzos",
    decorativeText: "R",
    image: buzos,
    path: "/customize/buzos",
    tag: "HOODIE",
  },
  {
    label: "Sudaderas",
    decorativeText: "E",
    image: sudaderas,
    path: "/customize/sudaderas",
    tag: "SWEATPANTS",
  },
  {
    label: "Pantalonetas",
    decorativeText: "A",
    image: pantalonetas,
    path: "/customize/pantalonetas",
    tag: "SHORTS",
  },
];

export default function CustomizationSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-white  overflow-hidden">
      {/* ── HEADER ── */}
      <div className="px-6 pt-14 pb-8 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
              DROP CODE: ITW_DS_05 // MEDELLIN, COL
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <p className="text-violet-700 text-xs tracking-[0.3em] font-montserrat uppercase font-bold block">
              — preda unica
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none font-montserrat">
            Personaliza
            <br />
            <span className="text-violet-700">tus prendas</span>
            <br />
            by D2D
          </h2>
        </div>
        <p className="text-white/40 text-sm max-w-xs font-montserrat tracking-wide hidden md:block lg:mb-15 ">
          Saca ese diseñador que llevas dentro — selecciona prenda, talla,
          colores e imagen.
          <span className="block mt-1 text-violet-700 font-bold">
            Preview instantáneo incluido.
          </span>
        </p>
      </div>

      {/* ── GRID DE PRENDAS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-white/10">
        {styles.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className={`group relative overflow-hidden text-left focus:outline-none
              ${i < 3 ? "border-r border-white/10" : ""}
              border-b border-white/10 lg:border-b-0`}
            style={{ minHeight: "500px" }}
          >
            {/* Imagen de fondo */}
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay gradiente — de abajo hacia arriba */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Overlay hover en violeta */}
            <div className="absolute inset-0 bg-violet-700/0 group-hover:bg-violet-700/10 transition-colors duration-500" />

            {/* Número decorativo */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-violet-700/20 select-none font-montserrat uppercase tracking-[0.2em] text-center pointer-events-none mix-blend-screen animate-pulse"
              style={{ fontSize: "3rem", lineHeight: 1 }}
            >
              {item.decorativeText}
            </span>

            {/* Contenido inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
              {/* Tag */}
              <span className="text-violet-700 text-xs tracking-[0.25em] font-montserrat uppercase">
                {item.tag}
              </span>

              {/* Nombre */}
              <h3 className="text-xl font-black uppercase font-montserrat leading-tight">
                {item.label}
              </h3>

              {/* Línea + CTA que aparece en hover */}
              <div className="flex items-center gap-2 mt-1 overflow-hidden">
                <div className="w-0 group-hover:w-6 h-0.5 bg-violet-700 transition-all duration-300" />
                <span className="text-xs text-white/0 group-hover:text-white/70 font-montserrat tracking-widest uppercase transition-all duration-300">
                  Personalizar →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-10 md:px-16 lg:px-24 border-t border-white/10">
        <p className="text-white/30 text-sm font-montserrat tracking-widest uppercase">
          Cada prenda, única como tú
        </p>
        <button
          onClick={() => navigate("/customize")}
          className="group flex items-center gap-3 px-8 py-3 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          Empezar a diseñar
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-violet-700">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
