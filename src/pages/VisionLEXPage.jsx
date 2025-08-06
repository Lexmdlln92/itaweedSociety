// src/pages/VisionLEXPage.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Importar la estructura de datos unificada
import { 
  getVisionLexProducts, 
  convertPriceToNumber 
} from "../data/productData";

export default function VisionLEXPage() {
  const { category } = useParams();
  const location = useLocation();

  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener productos de Vision LEX desde la fuente unificada
  const visionLexProducts = getVisionLexProducts();

  // Obtener categorías únicas de Vision LEX para filtros
  const filterOptions = ["todos", ...new Set(visionLexProducts.map(p => p.category))];

  // Cálculos para ordenamiento y paginación
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") {
      return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
    }
    if (sortOrder === "price-high") {
      return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
    }
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Efecto para manejar filtrado inicial y cambios de categoría
  useEffect(() => {
    
    if (category && filterOptions.includes(category)) {
      const categoryProducts = visionLexProducts.filter(p => p.category === category);
      setFiltered(categoryProducts);
      setActiveFilter(category);
    } else {
      setFiltered(visionLexProducts);
      setActiveFilter("todos");
      
    }
    setCurrentPage(1);
  }, [category, visionLexProducts]);

  // Función para manejar cambios de filtro manual
  const handleFilter = (filterValue) => {
    
    const productsToShow = filterValue === "todos" 
      ? visionLexProducts 
      : visionLexProducts.filter(p => p.category === filterValue);
    
    setFiltered(productsToShow);
    setActiveFilter(filterValue);
    setCurrentPage(1);
    
  };

  // Función para manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll al inicio al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <section className="px-4 pt-5 text-white bg-gradient-to-br from-[#3f0f4f] to-[#7d1c82] min-h-screen">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-2 uppercase">
        VISIÓN LEX
      </h1>
      <p className="text-center text-sm text-gray-300 mb-4">
        Prendas que aparte de chimbitas cuentan una historia.
      </p>

      {/* Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-4">
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
      <div className="mb-4">
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
          }}
          className="bg-white text-[#3f0f4f] text-sm px-3 py-1 rounded"
        >
          <option value="default">Ordenar por</option>
          <option value="price-low">Precio: menor a mayor</option>
          <option value="price-high">Precio: mayor a menor</option>
        </select>
      </div>

      {/* Grid de productos */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {paginated.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white p-2 rounded shadow text-black hover:scale-105 transition-transform"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded object-cover" 
              />
              <h3 className="text-sm mt-1 font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-600">
                ${product.price}
                {product.discount && (
                  <span className="ml-2 line-through text-red-500">
                    ${product.discount}
                  </span>
                )}
              </p>
              {/* Rating */}
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
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 mt-8">
          <p>No hay productos disponibles en esta categoría.</p>
          <p className="text-sm mt-2">
            Intenta seleccionar otro filtro para ver más productos.
          </p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {/* Números de página */}
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

      {/* Información de paginación */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-300">
          Página {currentPage} de {totalPages} • Mostrando {paginated.length} de {sorted.length} productos
        </div>
      )}

      {/* Debug info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-purple-900 bg-opacity-50 rounded text-xs">
          <h4 className="font-bold mb-2">Debug info Vision LEX:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p><strong>URL Info:</strong></p>
              <p>Category: {category || 'ninguna'}</p>
              <p>Pathname: {location.pathname}</p>
            </div>
            <div>
              <p><strong>Filter Info:</strong></p>
              <p>Active Filter: {activeFilter}</p>
              <p>Available Filters: {filterOptions.join(', ')}</p>
            </div>
            <div>
              <p><strong>Product Counts:</strong></p>
              <p>Total Vision LEX: {visionLexProducts.length}</p>
              <p>After Filter: {filtered.length}</p>
              <p>After Sort: {sorted.length}</p>
              <p>On Current Page: {paginated.length}</p>
            </div>
            <div>
              <p><strong>Pagination:</strong></p>
              <p>Current Page: {currentPage}</p>
              <p>Total Pages: {totalPages}</p>
              <p>Items Per Page: {itemsPerPage}</p>
              <p>Sort Order: {sortOrder}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}