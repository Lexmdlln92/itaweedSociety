import { Link } from "react-router-dom";
import storie1 from "../assets/stories/storie1.webp";
import storie2 from "../assets/stories/storie2.webp";

const stories = [
  {
    id: 1,
    decorativeText: "NI",
    tag: "TRIP-SONS COLLECTION",
    title: "Inspirada en los Simpson",
    description:
      "Cada prenda busca contar una versión diferente de la historia que ya todos hemos visto por más de 20 años.",
    image: storie1,
  },
  {
    id: 2,
    decorativeText: "CE",
    tag: "LEX FACTORY",
    title: "El Niño Rata",
    description:
      "Colecciones exclusivas que no volverán a producirse. Solo salen 10 prendas por color ( 20 piezas ).",
    image: storie2,
  },
];

const StorieSection = () => {
  return (
    <section className="bg-black text-white  overflow-hidden">
      {/* ── HEADER ── */}
      <div className="px-6 pt-14 pb-8 md:px-16 lg:px-24 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10">
        <div>
          {/* Etiqueta superior estilo editorial */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase hidden lg:block">
              DROP CODE: ITW_DS_05 // MEDELLIN, COL
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
            <p className="text-violet-700 text-xs tracking-[0.3em] font-montserrat uppercase font-bold block">
              — Narrativa de Marca
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none font-montserrat">
            Historias
            <br />
            <span className="text-violet-700">detrás de</span>
            <br />
            cada prenda
          </h2>
        </div>
        <p className="text-white/40 text-sm max-w-xs font-montserrat tracking-wide hidden md:block">
          by <span className="text-violet-700 font-bold">LEX Factory</span> —
          diseño con historia, producción limitada. mas como un homenaje a la
          cultura pop que como una simple prenda de vestir.
        </p>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {stories.map((story, i) => (
          <div
            key={story.id}
            className={`group relative flex flex-col lg:flex-row overflow-hidden
              ${i === 0 ? "lg:border-r border-white/10" : ""}
              border-b border-white/10`}
          >
            {/* Imagen — ocupa la mitad en desktop */}
            <div
              className="relative w-full lg:w-1/2 overflow-hidden"
              style={{ minHeight: "320px" }}
            >
              <img
                src={story.image}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradiente lateral en desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black opacity-60 hidden lg:block" />
              {/* Overlay gradiente inferior en mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:hidden" />
            </div>

            {/* Contenido — ocupa la otra mitad en desktop */}
            <div className="relative flex flex-col justify-center px-8 py-10 lg:px-10 lg:py-12 lg:w-1/2 gap-5">
              {/* Tag */}
              <span className="text-violet-700 text-xs tracking-[0.25em] font-montserrat uppercase">
                {story.tag}
              </span>

              {/* Título */}
              <h3 className="text-2xl lg:text-3xl font-black uppercase leading-tight font-montserrat">
                {story.title}
              </h3>

              {/* Línea decorativa */}
              <div className="w-10 h-0.5 bg-violet-700" />

              {/* Descripción */}
              <p className="text-white/60 text-sm leading-relaxed font-montserrat">
                {story.description}
              </p>

              {/* Número en desktop (decorativo, abajo) */}
              <span
                className="text-white/5 font-black font-montserrat select-none absolute bottom-4 right-6 hidden lg:block"
                style={{ fontSize: "5rem", lineHeight: 1 }}
              >
                {story.decorativeText}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-10 md:px-16 lg:px-24 border-t border-white/10">
        <p className="text-white/30 text-sm font-montserrat tracking-widest uppercase">
          vendemos relatos que puedes vestir.
        </p>
        <Link
          to="/StorieByLex"
          className="group flex items-center gap-3 px-8 py-3 border border-white/30 text-white rounded-full text-sm font-semibold font-montserrat tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          Ver más
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-violet-700">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default StorieSection;
