// src/pages/shop/SearchPage.jsx — reorganización: movido de pages/ a pages/shop/
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MarqueeText from "../../components/MarqueeText"; // reorganización: path actualizado

import { 
  getAllProducts, 
  getAvailableCategories,
  convertPriceToNumber,
  getVisionLexProducts,
  getUniversoD2DProducts
} from '../../data/productData'; // reorganización: path actualizado

/* -----------------------------------------------------
   FRAMER MOTION VARIANTS
----------------------------------------------------- */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
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
   SVG ICONS
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

const IconX = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  visionLex: "Visión LEX",
  universoD2D: "Universo D2D"
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Logic states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });
  const [sortBy, setSortBy] = useState('name');
  const [gridCols, setGridCols] = useState(3);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = gridCols === 2 ? 6 : 9;

  // Acordeones del Sidebar
  const [openGroups, setOpenGroups] = useState({
    busqueda: true,
    categoria: true,
    precio: true,
  });

  const allProducts = getAllProducts();
  const categories = getAvailableCategories();
  
  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'rating', label: 'Mejor Valorados' }
  ];

  const getProductsForCategory = (category) => {
    let products = [];
    switch (category) {
      case 'visionLex': products = getVisionLexProducts(); break;
      case 'universoD2D': products = getUniversoD2DProducts(); break;
      case '': products = allProducts; break;
      default: products = allProducts.filter(p => p.category === category); break;
    }
    
    const uniqueProductsMap = new Map();
    products.forEach(product => {
      const imageFileName = 
        typeof product.image === 'string' && product.image.includes('/')
          ? (product.image.split('/').pop() || '').split('.')[0]
          : '';
      const uniqueKey = `${product.name.toLowerCase().trim()}_${imageFileName}`;
      
      if (!uniqueProductsMap.has(uniqueKey) || 
          (uniqueProductsMap.get(uniqueKey).rating || 0) < (product.rating || 0)) {
        uniqueProductsMap.set(uniqueKey, product);
      }
    });
    return Array.from(uniqueProductsMap.values());
  };

  useEffect(() => {
    let results = getProductsForCategory(selectedCategory);

    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    results = results.filter(product => {
      const price = convertPriceToNumber(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    results.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
        case 'price-desc': return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

    setFilteredProducts(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
  const totalPages = Math.ceil(filteredProducts.length / safeItemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * safeItemsPerPage,
    currentPage * safeItemsPerPage
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 300000 });
    setSortBy('name');
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
         HERO (Ajustado para Buscador Dinámico Desktop/Móvil)
      ----------------------------------------------------- */}
      <div className="nap-hero">
        <div className="nap-hero-eyebrow flex items-center justify-center md:justify-start gap-3">
          <span className="nap-hero-code hidden md:block">
            SEARCH ENGINE // CORE_SYS_v2
          </span>
          <div className="nap-hero-ping" />
          <span className="nap-hero-tag whitespace-nowrap">— FILTRO GLOBAL</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
          <h1 className="nap-hero-title text-center md:text-left !text-5xl md:!text-8xl leading-none">
            Buscar<br /><span>Productos</span>
          </h1>

          {/* Contenedor derecho del Hero */}
          <div className="w-full md:max-w-sm flex flex-col items-center md:items-end">
            
            {/* VISTA DESKTOP: Muestra texto + buscador abajo */}
            <div className="hidden md:block w-full text-right lg:mb-12">
              <p className="nap-hero-sub">
                Encuentra el producto perfecto para tu estilo a lo largo de todos nuestros drops e índices de colecciones.
              </p>
              
              {/* Buscador Desktop */}
              <div className="relative mt-4 w-full max-w-xs ml-auto">
                <input
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-black/60 border border-neutral-700 text-xs rounded text-white placeholder-neutral-400 focus:outline-none focus:border-purple-500 transition-all font-mono"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <IconX />
                  </button>
                )}
              </div>
            </div>

            {/* VISTA MÓVIL: Reemplaza el texto por la barra de búsqueda directamente */}
            <div className="block md:hidden w-full px-4 mb-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-neutral-900/90 border border-neutral-700 text-sm rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-all font-mono"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <IconX />
                  </button>
                )}
              </div>
            </div>

            <span className="nap-hero-coord block mt-2 text-center md:text-right">
              SYS_REF: IND_BR_01 // MEDELLIN
            </span>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------
         MARQUEE
      ----------------------------------------------------- */}
      <div className="nap-marquee">
        <MarqueeText
          speed="90s"
          fontClass="font-rock"
          text={
            <>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina">BUSCADOR AVANZADO</span>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina">STREETWEAR CATALOGUE</span>
              <span className="text-purple-700 mx-3">✦</span>
              <span className="font-londrina text-white">OVERSIZE EDITIONS</span>
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

          {/* Grupo: Término de búsqueda (Duplicado táctico por consistencia) */}
          <div className="nap-filter-group">
            <button className="nap-filter-heading" onClick={() => toggleGroup("busqueda")}>
              Palabra Clave
              <IconChevron open={openGroups.busqueda} />
            </button>
            <AnimatePresence>
              {openGroups.busqueda && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                  className="pt-2 px-1 pb-3"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Camisetas, gorras..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 bg-black/40 border border-neutral-800 text-xs rounded text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-all font-mono"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        <IconX />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grupo: Categorías */}
          <div className="nap-filter-group">
            <button className="nap-filter-heading" onClick={() => toggleGroup("categoria")}>
              Colección / Tipo
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
                    { value: "", label: "Todos" },
                    ...categories.map((c) => ({
                      value: c,
                      label: CATEGORY_LABELS[c] || c,
                    })),
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      className={`nap-filter-option${selectedCategory === opt.value ? " active" : ""}`}
                      onClick={() => handleCategorySelect(opt.value)}
                    >
                      <span className="nap-check-box">
                        {selectedCategory === opt.value && (
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

          {/* Grupo: Rango de Precios */}
          <div className="nap-filter-group">
            <button className="nap-filter-heading" onClick={() => toggleGroup("precio")}>
              Rango de Precio
              <IconChevron open={openGroups.precio} />
            </button>
            <AnimatePresence>
              {openGroups.precio && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                  className="pt-2 pb-4 px-1 space-y-3 font-mono text-[11px]"
                >
                  <div>
                    <span className="block text-neutral-400 mb-1">MÍNIMO</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({...prev, min: Number(e.target.value)}))}
                      className="w-full bg-black/40 border border-neutral-800 text-white rounded p-1.5 focus:outline-none focus:border-purple-500"
                      min="0"
                      max="300000"
                      step="5000"
                    />
                  </div>
                  <div>
                    <span className="block text-neutral-400 mb-1">MÁXIMO</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({...prev, max: Number(e.target.value)}))}
                      className="w-full bg-black/40 border border-neutral-800 text-white rounded p-1.5 focus:outline-none focus:border-purple-500"
                      min="0"
                      max="300000"
                      step="5000"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={clearAllFilters}
            className="w-full mt-2 py-2 border border-dashed border-neutral-800 text-[10px] uppercase font-mono tracking-wider text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
          >
            Resetear Parámetros
          </button>
        </motion.aside>

        {/* -- MAIN -- */}
        <main className="nap-main">
          
          {/* Pills de Categorías Superiores */}
          <div className="nap-pills">
            <button
              onClick={() => setSelectedCategory('')}
              className={`nap-pill${selectedCategory === '' ? " active" : ""}`}
            >
              Todos
            </button>
            {categories.map((cat) => {
              const isSpecial = cat === 'visionLex' || cat === 'universoD2D';
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`nap-pill${selectedCategory === cat ? " active" : ""}`}
                  style={selectedCategory === cat && isSpecial ? {
                    borderColor: cat === 'visionLex' ? '#22d3ee' : '#f97316',
                    background: cat === 'visionLex' ? 'rgba(34,211,238,0.1)' : 'rgba(249,115,22,0.1)',
                    color: '#ffffff'
                  } : {}}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              );
            })}
          </div>

          {/* Topbar del grid */}
          <div className="nap-topbar">
            <span className="nap-count font-mono text-[11px] uppercase tracking-wider">
              Encontrados: {filteredProducts.length} Item{filteredProducts.length !== 1 ? "s" : ""}
            </span>

            <div className="nap-topbar-right">
              <select
                className="nap-select font-mono"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
            key={`${selectedCategory}-${searchTerm}-${sortBy}-${gridCols}-${priceRange.min}-${priceRange.max}`}
            className={gridCols === 2 ? "nap-grid-2" : "nap-grid-3"}
          >
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => {
                const discountPct = item.discount
                  ? Math.round((1 - convertPriceToNumber(item.price) / convertPriceToNumber(item.discount)) * 100)
                  : null;

                const itemBadgeLabel = item.category === 'visionLex' ? 'VISION_LX' 
                                      : item.category === 'universoD2D' ? 'UNIV_D2D' 
                                      : 'ITW_DS_05';

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
                        <span className="nap-badge-tech">{itemBadgeLabel}</span>
                        {!discountPct && (
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
                <div className="nap-empty-glyph">0 RSLTS</div>
                <p className="nap-empty-text">No se encontraron productos indexados</p>
                <button onClick={clearAllFilters} className="nap-empty-link bg-transparent border-none cursor-pointer">
                  Limpiar filtros e intentar de nuevo →
                </button>
              </div>
            )}
          </motion.div>

          {/* -----------------------------------------------------
             PAGINATION
          ----------------------------------------------------- */}
          {totalPages > 1 && (
            <>
              <div className="nap-pagination">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="nap-page-btn font-mono"
                  >
                    ‹
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => Math.abs(n - currentPage) <= 1 || n === 1 || n === totalPages)
                  .map((n, index, array) => {
                    const showEllipsis = index > 0 && n - array[index - 1] > 1;
                    return (
                      <div key={n} className="flex items-center gap-2">
                        {showEllipsis && <span className="text-neutral-600 px-1 font-mono">...</span>}
                        <button
                          className={`nap-page-btn${currentPage === n ? " active" : ""}`}
                          onClick={() => handlePageChange(n)}
                        >
                          {n}
                        </button>
                      </div>
                    );
                  })}

                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="nap-page-btn font-mono"
                  >
                    ›
                  </button>
                )}
              </div>

              <p className="nap-page-info">
                Página {currentPage} de {totalPages} · {paginatedProducts.length} de {filteredProducts.length} productos indexados
              </p>
            </>
          )}
        </main>
      </div>
    </section>
  );
}