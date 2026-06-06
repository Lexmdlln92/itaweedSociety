// src/pages/shop/NewArrivalsPage.jsx — reorganización: movido de pages/ a pages/shop/
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarqueeText from "../../components/MarqueeText"; // reorganización: path actualizado

import {
  productCategories,
  getProductsByCategory,
  getAvailableCategories,
  convertPriceToNumber,
} from "../../data/productData"; // reorganización: path actualizado

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS
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
   ICONOS SVG
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

/* -----------------------------------------------------
   CATEGORY LABELS
----------------------------------------------------- */
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

export default function NewArrivalsPage() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isNewPage = location.pathname === "/products/new";

  /* -----------------------------------------------------
     STATES
  ----------------------------------------------------- */
  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridCols, setGridCols] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  
  // Estado para controlar si revelamos todos los items en desktop en la sección 'todos'
  const [showAll, setShowAll] = useState(false);

  const [openGroups, setOpenGroups] = useState({
    categoria: true,
    orden: true,
  });

  const itemsPerPage = isMobile ? 4 : gridCols === 2 ? 6 : 9;

  /* -----------------------------------------------------
     FILTER OPTIONS
  ----------------------------------------------------- */
  const filterOptions = getAvailableCategories().filter(
    (cat) => cat !== "visionLex",
  );

  /* -----------------------------------------------------
     SORTED PRODUCTS
  ----------------------------------------------------- */
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") {
      return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
    }
    if (sortOrder === "price-high") {
      return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
    }
    return 0;
  });

  /* -----------------------------------------------------
     PAGINATION & REVEAL LOGIC
  ----------------------------------------------------- */
  // Si estamos en Desktop, en /products/new, filtro "todos" y showAll es false => limitamos a 3 cards
  const shouldLimitInitialDesktop = isNewPage && activeFilter === "todos" && !isMobile && !showAll;

  const totalPages = shouldLimitInitialDesktop 
    ? 1 
    : Math.ceil(sortedProducts.length / itemsPerPage);

  const paginated = shouldLimitInitialDesktop
    ? sortedProducts.slice(0, 3)
    : sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* -----------------------------------------------------
     EFFECTS
  ----------------------------------------------------- */
  useEffect(() => {
    let productsToShow = [];
    let filterToSet = "todos";

    if (isNewPage) {
      productsToShow = productCategories.newArrivals || [];
    } else if (category && filterOptions.includes(category)) {
      productsToShow = getProductsByCategory(category) || [];
      filterToSet = category;
    }

    setFiltered(productsToShow);
    setActiveFilter(filterToSet);
    setCurrentPage(1);
    setShowAll(false); // Reiniciar al cambiar de ruta/categoría
  }, [category, isNewPage, location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
      setCurrentPage(1);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  /* -----------------------------------------------------
     HANDLERS
  ----------------------------------------------------- */
  const handleFilterChange = (newFilter) => {
    if (!isNewPage) return;

    const products =
      newFilter === "todos"
        ? productCategories.newArrivals || []
        : (productCategories.newArrivals || []).filter(
            (p) => p.category === newFilter,
          );

    setFiltered(products);
    setActiveFilter(newFilter);
    setCurrentPage(1);
    setShowAll(false); // Reiniciar el botón al cambiar el filtro
  };

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

  /* -----------------------------------------------------
     PAGE TITLE
  ----------------------------------------------------- */
  const pageTitle = isNewPage ? (
    <>
      Nuevos
      <br />
      <span>Productos</span>
    </>
  ) : (
    <>
      {(category || "Colección").charAt(0).toUpperCase() +
        (category || "colección").slice(1)}
      <br />
      <span>colección</span>
    </>
  );

  return (
    <section className="nap-root">
      {/* -- GEOMETRIC BACKGROUND -- */}
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
      <div className="nap-hero">
        <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
          <span className="nap-hero-code hidden md:block">
            DROP CODE: ITW_DS_05 // MEDELLIN, COL
          </span>
          <div className="nap-hero-ping" />
          <span className="nap-hero-tag whitespace-nowrap">— NUEVO INGRESO</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
          <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
            {pageTitle}
          </h1>

          <div className="max-w-sm text-center md:text-right lg:mb-20">
            <p className="nap-hero-sub">
              {isNewPage
                ? "Descubre los nuevos productos que acaban de llegar: diseños frescos, ediciones recientes y lo último de la temporada."
                : `Explora la colección completa de ${category || "productos"} de Itaweed Society.`}
            </p>
            <span className="nap-hero-coord block mt-2">
              COORD: 6.2442° N, 75.5812° W
            </span>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------
         MARQUEE
      ----------------------------------------------------- */}
      <div className="nap-marquee">
        <MarqueeText
          speed="80s"
          fontClass="font-rock"
          text={
            <>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina">Prendas Nuevas cada Mes</span>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina">STREETWEAR QUALITY</span>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina text-white">Ediciones Limitadas</span>
            </>
          }
        />
      </div>

      {/* -----------------------------------------------------
         BODY
      ----------------------------------------------------- */}
      <div className="nap-body">
        {/* -- SIDEBAR -- */}
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

          {isNewPage && (
            <div className="nap-filter-group">
              <button
                className="nap-filter-heading"
                onClick={() => toggleGroup("categoria")}
              >
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
                    {[
                      { value: "todos", label: "Todos" },
                      ...filterOptions.map((c) => ({
                        value: c,
                        label: CATEGORY_LABELS[c] || c,
                      })),
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className={`nap-filter-option${activeFilter === opt.value ? " active" : ""}`}
                        onClick={() => handleFilterChange(opt.value)}
                      >
                        <span className="nap-check-box">
                          {activeFilter === opt.value && (
                            <svg width="8" height="8" viewBox="0 0 8 8">
                              <polyline
                                points="1,4 3,6 7,2"
                                stroke="#a78bfa"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
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
          )}

          <div className="nap-filter-group">
            <button
              className="nap-filter-heading"
              onClick={() => toggleGroup("orden")}
            >
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
                            <polyline
                              points="1,4 3,6 7,2"
                              stroke="#a78bfa"
                              strokeWidth="1.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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

        {/* -- MAIN -- */}
        <main className="nap-main">
          {isNewPage && (
            <div className="nap-pills">
              {[
                { value: "todos", label: "Todos" },
                ...filterOptions.map((c) => ({
                  value: c,
                  label: CATEGORY_LABELS[c] || c,
                })),
              ].map((opt) => (
                <button
                  key={opt.value}
                  className={`nap-pill${activeFilter === opt.value ? " active" : ""}`}
                  onClick={() => handleFilterChange(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Topbar */}
          <div className="nap-topbar">
            <span className="nap-count">
              {shouldLimitInitialDesktop ? 3 : sortedProducts.length} de {sortedProducts.length} Producto
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
             PRODUCTS GRID
          ----------------------------------------------------- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={`${activeFilter}-${sortOrder}-${currentPage}-${gridCols}-${showAll}`}
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
                        <span className="nap-badge-tech">ITW_DS_05</span>
                        {isNewPage && !discountPct && (
                          <span className="nap-badge-new is-new">1 / 7 PCS</span>
                        )}
                        {discountPct && discountPct > 0 && (
                          <span className="nap-badge-new is-discount">-{discountPct}%</span>
                        )}
                      </div>

                      <div className="nap-card-body">
                        <span className="nap-card-sub">RTW // STREETWEAR</span>
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
              <div className="nap-empty">
                <div className="nap-empty-glyph">Vacío</div>
                <p className="nap-empty-text">No hay productos en esta categoría</p>
                {!isNewPage && (
                  <Link to="/products/new" className="nap-empty-link">
                    Ver recién llegados →
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* -----------------------------------------------------
             PAGINATION
          ----------------------------------------------------- */}
          {totalPages > 1 && !shouldLimitInitialDesktop && (
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
                Página {currentPage} de {totalPages} · {paginated.length} de {sortedProducts.length} productos
              </p>
            </>
          )}
        </main>
      </div>

      {/* -----------------------------------------------------
         FOOTER CTA (Siempre conserva su acción de Ver Todos)
      ----------------------------------------------------- */}
      <div className="nap-footer-cta">
        <p className="nap-footer-text text-center">
          {shouldLimitInitialDesktop 
            ? "Explora el drop completo exclusivo de la calle" 
            : "Consigue las prendas del drop exclusivo de la calle"}
        </p>

        <motion.button
          onClick={() => {
            if (shouldLimitInitialDesktop) {
              setShowAll(true); // Revela el grid completo
            } else {
              navigate("/products/new");
            }
          }}
          className="nap-footer-btn"
          whileHover={{
            scale: 1.04,
            borderColor: "#8b5cf6",
            boxShadow: "0 0 20px rgba(139,92,246,.2)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
        >
          Ver todos
          <motion.span
            className="nap-arrow-accent"
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}