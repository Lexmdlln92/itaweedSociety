// src/pages/brands/VisionLEXPage.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTACIONES DE DATOS
import { 
  getVisionLexProducts, 
  convertPriceToNumber 
} from "../../data/productData";

import HeroParallax from "../../components/HeroParallax";

// IMPORTACIÓN DEL LOGO DESDE ASSETS
import logoLex from "../../assets/logo LEX.png";

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS (Fiel a NewArrivalsPage)
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

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

/* -----------------------------------------------------
   ICONOS SVG EXACTOS DE LA LÍNEA GRÁFICA
----------------------------------------------------- */
const IconChevron = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform .25s",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconGrid2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

const IconGrid3 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <rect x="16" y="2" width="6" height="6" rx="1" />
    <rect x="2" y="9" width="6" height="6" rx="1" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <rect x="16" y="9" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
  </svg>
);

const IconFilter = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const IconStar = ({ filled }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill={filled ? "#8b5cf6" : "none"}
    stroke="#8b5cf6"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CATEGORY_LABELS = {
  todos: "Todos",
  camisas: "Camisas",
  pantalones: "Pantalones",
  vestidos: "Vestidos",
  accesorios: "Accesorios",
  zapatos: "Zapatos",
  gorras: "Gorras",
  buzos: "Buzos",
};

export default function VisionLEXPage() {
  const { category } = useParams();

  /* -----------------------------------------------------
     ESTADOS DE CONTROL GLOBAL (Mapeo Limpio)
  ----------------------------------------------------- */
  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridCols, setGridCols] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllInTodos, setShowAllInTodos] = useState(false);

  const [openGroups, setOpenGroups] = useState({
    categoria: true,
    orden: true,
  });

  const visionLexProducts = getVisionLexProducts() || [];
  const filterOptions = ["todos", ...new Set(visionLexProducts.map((p) => p.category))];

  // Configuración de ítems por página
  const itemsPerPage = isMobile 
    ? 4 
    : (activeFilter === "todos" && !showAllInTodos)
      ? 6 
      : gridCols === 2 
        ? 6 
        : 9;

  /* -----------------------------------------------------
     EFECTOS Y EVENTOS RESPONSIVOS (Fluidez de Rendimiento)
  ----------------------------------------------------- */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
      setCurrentPage(1);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (category && filterOptions.includes(category)) {
      setFiltered(visionLexProducts.filter((p) => p.category === category));
      setActiveFilter(category);
    } else {
      setFiltered(visionLexProducts);
      setActiveFilter("todos");
    }
    setCurrentPage(1);
    setShowAllInTodos(false);
  }, [category]);

  /* -----------------------------------------------------
     MANEJADORES DE FILTRADO Y ORDENAMIENTO
  ----------------------------------------------------- */
  const handleFilterChange = (filterValue) => {
    const productsToShow = filterValue === "todos"
      ? visionLexProducts
      : visionLexProducts.filter((p) => p.category === filterValue);
    setFiltered(productsToShow);
    setActiveFilter(filterValue);
    setCurrentPage(1);
    setShowAllInTodos(false);
  };

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") {
      return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
    }
    if (sortOrder === "price-high") {
      return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginated = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (n) => {
    setCurrentPage(n);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Condición lógica para ocultar la paginación tradicional en "todos" si no se ha desplegado.
  const shouldHidePagination = !isMobile && activeFilter === "todos" && !showAllInTodos;

  return (
    <section className="nap-root">
      {/* -- GEOMETRIC BACKGROUND (Fiel a NewArrivalsPage) -- */}
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

      {/* PARALLAX DEL HERO (Solo activo en la vista general) */}
      {activeFilter === "todos" && <HeroParallax />}

      {/* -----------------------------------------------------
         HERO (Misma estructura de Clases con el Logo Integrado)
      ----------------------------------------------------- */}
      <div className="nap-hero">
        <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
          <span className="nap-hero-code hidden md:block">
            DROP CODE: VLX_DS_26 // ITAGÜÍ - MEDELLÍN, COL
          </span>
          <div className="nap-hero-ping" />
          <span className="nap-hero-tag whitespace-nowrap">— CÁPSULA LEX</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
          <h1 className="nap-hero-title text-center md:text-left !text-7xl md:!text-8xl leading-none font-sans font-black tracking-tighter uppercase">
            Visión
            <br />
            <span className="inline-block align-middle -mt-8 md:mt-4 max-w-[200px] md:max-w-[320px]">
              <img 
                src={logoLex} 
                alt="LEX Logo" 
                className="w-full h-auto object-contain select-none pointer-events-none"
                style={{
                  filter: "invert(42%) sepia(93%) saturate(1352%) hue-rotate(231deg) brightness(97%) contrast(95%)"
                }}
              />
            </span>
          </h1>

          <div className="max-w-sm text-center md:text-right lg:mb-20">
            <p className="nap-hero-sub normal-case">
              Indumentaria urbana de alta gama confeccionada bajo narrativas conceptuales. Siluetas de cortes limpios, texturas premium pesadas y lanzamientos exclusivos de edición limitada.
            </p>
            <span className="nap-hero-coord block mt-2">
              COORD: 6.1732° N, 75.6041° W
            </span>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------
         BODY (Layout e Identidad Unificada de Estilos)
      ----------------------------------------------------- */}
      <div className="nap-body">
        
        {/* -- SIDEBAR ESTÁNDAR COMPLETO -- */}
        <motion.aside
          className="nap-sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate="show"
        >
          <div className="nap-sidebar-label">
            <IconFilter />
            Filtros
          </div>

          <div className="nap-filter-group">
            <button className="nap-filter-heading" onClick={() => toggleGroup("categoria")}>
              Categoría
              <IconChevron open={openGroups.categoria} />
            </button>

            <AnimatePresence>
              {openGroups.categoria && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                >
                  {filterOptions.map((opt) => (
                    <button
                      key={opt}
                      className={`nap-filter-option uppercase${activeFilter === opt ? " active" : ""}`}
                      onClick={() => handleFilterChange(opt)}
                    >
                      <span className="nap-check-box">
                        {activeFilter === opt && (
                          <svg width="8" height="8" viewBox="0 0 8 8">
                            <polyline points="1,4 3,6 7,2" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {opt === "todos" ? "Todos" : CATEGORY_LABELS[opt] || opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="nap-filter-group">
            <button className="nap-filter-heading" onClick={() => toggleGroup("orden")}>
              Ordenar
              <IconChevron open={openGroups.orden} />
            </button>

            <AnimatePresence>
              {openGroups.orden && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                >
                  {[
                    { value: "default", label: "Por defecto" },
                    { value: "price-low", label: "Menor precio" },
                    { value: "price-high", label: "Mayor precio" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      className={`nap-filter-option${sortOrder === opt.value ? " active" : ""}`}
                      onClick={() => {
                        setSortOrder(opt.value);
                        setCurrentPage(1);
                      }}
                    >
                      <span className="nap-check-box">
                        {sortOrder === opt.value && (
                          <svg width="8" height="8" viewBox="0 0 8 8">
                            <polyline points="1,4 3,6 7,2" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* -- MAIN CONTENT GRID AREA -- */}
        <main className="nap-main">
          
          {/* Pills de categorías activas */}
          <div className="nap-pills">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className={`nap-pill uppercase${activeFilter === opt ? " active" : ""}`}
                onClick={() => handleFilterChange(opt)}
              >
                {opt === "todos" ? "Todos" : CATEGORY_LABELS[opt] || opt}
              </button>
            ))}
          </div>

          {/* Topbar Técnica Industrial */}
          <div className="nap-topbar">
            <span className="nap-count">
              {sortedProducts.length} de {visionLexProducts.length} Producto
              {sortedProducts.length !== 1 ? "s" : ""}
            </span>

            <div className="nap-topbar-right">
              <select
                className="nap-select"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="default">Ordenar por</option>
                <option value="price-low">Menor precio</option>
                <option value="price-high">Mayor precio</option>
              </select>

              <div className="nap-grid-toggle">
                <button
                  className={`nap-grid-btn${gridCols === 2 ? " active" : ""}`}
                  onClick={() => setGridCols(2)}
                  title="2 columnas"
                >
                  <IconGrid2 />
                </button>
                <button
                  className={`nap-grid-btn${gridCols === 3 ? " active" : ""}`}
                  onClick={() => setGridCols(3)}
                  title="3 columnas"
                >
                  <IconGrid3 />
                </button>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------
             PRODUCTS GRID (Estructura Estética Exacta)
          ----------------------------------------------------- */}
          <AnimatePresence mode="wait">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              key={`${activeFilter}-${sortOrder}-${currentPage}-${gridCols}-${showAllInTodos}`}
              className={gridCols === 2 ? "nap-grid-2" : "nap-grid-3"}
            >
              {paginated.length > 0 ? (
                paginated.map((item) => {
                  const discountPct = item.discount
                    ? Math.round((1 - convertPriceToNumber(item.price) / convertPriceToNumber(item.discount)) * 100)
                    : null;

                  return (
                    <motion.div key={item.id} variants={cardVariants}>
                      <Link to={`/product/${item.id}`} className="nap-card">
                        
                        <div className="nap-card-img">
                          <img src={item.image} alt={item.name} loading="lazy" />
                          <div className="nap-card-overlay" />
                          
                          <div className="nap-card-crosshair">
                            <div className="nap-crosshair-ring">
                              <div className="nap-crosshair-h" />
                              <div className="nap-crosshair-v" />
                              <div className="nap-crosshair-dot" />
                            </div>
                          </div>
                          
                          <span className="nap-badge-tech hidden md:inline-block">ITW_DS_05</span>
                          
                          {discountPct && discountPct > 0 ? (
                            <span className="nap-badge-new is-discount">-{discountPct}% OFF</span>
                          ) : (
                            <span className="nap-badge-new is-new">1 / 7</span>
                          )}
                        </div>

                        <div className="nap-card-body">
                          <span className="nap-card-sub">RTW // VISION LEX</span>
                          <p className="nap-card-name">{item.name}</p>
                          
                          <div className="nap-card-price-row">
                            <span className="nap-card-price">${item.price}</span>
                            {item.discount && (
                              <span className="nap-card-price-old">${item.discount}</span>
                            )}
                          </div>

                          {item.rating && (
                            <div className="nap-card-stars">
                              {[...Array(5)].map((_, i) => (
                                <IconStar key={i} filled={i < Math.floor(item.rating)} />
                              ))}
                              <span className="nap-card-rating">{item.rating}</span>
                            </div>
                          )}

                          <div className="nap-card-cta">
                            <div className="nap-cta-line" />
                            <span className="nap-cta-text">Ver detalle →</span>
                          </div>
                        </div>

                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="nap-empty col-span-full">
                  <div className="nap-empty-glyph">CÁPSULA_VACÍA</div>
                  <p className="nap-empty-text">No hay productos indexados en esta sección</p>
                  <button onClick={() => handleFilterChange("todos")} className="nap-empty-link bg-transparent border-none cursor-pointer mt-2">
                    Resetear Filtros del Drop →
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* BOTÓN "VER TODOS" - Único control disponible en el estado inicial de 'todos' */}
          {!isMobile && activeFilter === "todos" && !showAllInTodos && sortedProducts.length > 3 && (
            <div className="flex justify-center mt-12 mb-6">
              <button
                onClick={() => setShowAllInTodos(true)}
                className="px-6 py-3 border border-purple-500/30 bg-purple-950/10 hover:bg-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-widest transition-all duration-300 select-none cursor-pointer"
                style={{ backdropFilter: "blur(4px)" }}
              >
                Desplegar Catálogo Completo // [{sortedProducts.length}] Ítems
              </button>
            </div>
          )}

          {/* -----------------------------------------------------
             PAGINACIÓN INDUSTRIAL UNIFICADA (Oculta condicionalmente)
          ----------------------------------------------------- */}
          {totalPages > 1 && !shouldHidePagination && (
            <>
              <div className="nap-pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={`nap-page-btn${currentPage === n ? " active" : ""}`}
                    onClick={() => handlePageChange(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <p className="nap-page-info">
                Página {currentPage} de {totalPages} · {paginated.length} de {sortedProducts.length} productos archivados
              </p>
            </>
          )}
        </main>
      </div>

      <div className="nap-footer-cta mt-3 text-center">
        <p className="nap-footer-text text-center">
          Consigue las prendas del drop exclusivo de la calle en tiempo real
        </p>
      </div>
    </section>
  );
}