// src/pages/VisionLEXPage.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Importar la estructura de datos unificada
import { 
  getVisionLexProducts, 
  convertPriceToNumber 
} from "../data/productData";

// Importar el hero parallax
import HeroParallax from "../components/HeroParallax";

export default function VisionLEXPage() {
  const { category } = useParams();
  
  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener productos de Vision LEX desde la fuente unificada
  const visionLexProducts = getVisionLexProducts();

  // Obtener categorías únicas de Vision LEX para filtros
  const filterOptions = ["todos", ...new Set(visionLexProducts.map(p => p.category))];

  // Ordenamiento
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") {
      return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
    }
    if (sortOrder === "price-high") {
      return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
    }
    return 0;
  });

  // Paginación
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Filtrado inicial y responder a cambios de categoría
  useEffect(() => {
    if (category && filterOptions.includes(category)) {
      setFiltered(visionLexProducts.filter(p => p.category === category));
      setActiveFilter(category);
    } else {
      setFiltered(visionLexProducts);
      setActiveFilter("todos");
    }
    setCurrentPage(1);
  }, [category, visionLexProducts]);

  // Cambiar filtro manual
  const handleFilter = (filterValue) => {
    const productsToShow = filterValue === "todos"
      ? visionLexProducts
      : visionLexProducts.filter(p => p.category === filterValue);
    setFiltered(productsToShow);
    setActiveFilter(filterValue);
    setCurrentPage(1);
  };

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll handled by centralized ScrollToTop component
  };

  // ESTRUCTURA JSX CORRECTA: Todo debe estar dentro de un elemento contenedor único
  return (
    <section className="text-white bg-gradient-to-br from-[#3f0f4f] to-[#7d1c82] min-h-screen pb-6">
      {/* HERO PARALLAX - Solo se muestra cuando activeFilter es "todos" */}
      {activeFilter === "todos" && <HeroParallax />}

      <div className={activeFilter === "todos" ? "" : "pt-8"}>
        <h1 className="text-center text-3xl font-bold mb-2 mt-6 uppercase">
          VISIÓN LEX
        </h1>
        <p className="text-center text-sm text-gray-300 mb-4">
          Prendas que aparte de chimbitas cuentan una historia.
        </p>

        {/* Filtros */}
        <div className="flex gap-3 overflow-x-auto pb-4 m-3 scrollbar-hide">
          {filterOptions.map((filterValue) => (
            <button
              key={filterValue}
              onClick={() => handleFilter(filterValue)}
              className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap transition-colors ${
                activeFilter === filterValue
                  ? "bg-white text-[#3f0f4f] border-white"
                  : "text-white border-white hover:bg-white hover:text-[#3f0f4f]"
              }`}
            >
              {filterValue}
            </button>
          ))}
        </div>

        {/* Selector de ordenamiento */}
        <div className="mb-4 m-3">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white text-[#3f0f4f] text-sm px-3 py-1 rounded"
          >
            <option value="default">Ordenar por</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Masonry container */}
        <div className="masonry m-3">
          {paginated.map((product) => (
            <div key={product.id} className="masonry-item">
              <Link
                to={`/product/${product.id}`}
                className="bg-white p-2 rounded shadow text-black hover:scale-105 transition-transform flex flex-col"
              >
                <div className="w-full h-auto flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
                <h3 className="text-sm mt-1 font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-600">
                  ${product.price}
                  {product.discount && (
                    <span className="ml-2 line-through text-red-500">
                      ${product.discount}
                    </span>
                  )}
                </p>
                {product.rating && (
                  <div className="flex items-center text-yellow-400 text-xs mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="text-gray-500 ml-1">{product.rating}</span>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded transition-colors ${
                    currentPage === pageNum
                      ? "bg-white text-[#3f0f4f] font-bold"
                      : "bg-transparent border border-white text-white hover:bg-white hover:text-[#3f0f4f]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}

        {/* Info de paginación */}
        {totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-300">
            Página {currentPage} de {totalPages} • Mostrando {paginated.length} de {sorted.length} productos
          </div>
        )}
      </div>
    </section>
  );
}