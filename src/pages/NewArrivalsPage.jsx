// src/pages/NewArrivalsPage.jsx
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MarqueeText from "../components/MarqueeText";

// Importar la nueva estructura de datos unificada
import { 
  productCategories, 
  getProductsByCategory, 
  getAvailableCategories,
  convertPriceToNumber 
} from "../data/productData";

export default function NewArrivalsPage() {
  const { category } = useParams(); 
  const location = useLocation();
  const isNewPage = location.pathname === "/products/new";

  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Obtener las categorías disponibles y eliminar 'visionLex' para esta vista
  const filterOptions = getAvailableCategories().filter(cat => cat !== 'visionLex');

  // PASO 1: Aplicar ordenamiento a los productos filtrados
  // Este paso es crítico para la paginación - debemos ordenar ANTES de paginar
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") {
      return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
    }
    if (sortOrder === "price-high") {
      return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
    }
    return 0; // orden default - mantener orden original
  });

  // PASO 2: Calcular valores para la paginación
  // Estos cálculos deben hacerse después del ordenamiento pero antes del renderizado
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = sortedProducts.slice(startIndex, endIndex);

  // EFECTO PRINCIPAL: Manejo del filtrado inicial basado en la ruta
  // Este efecto se ejecuta cuando cambia la URL o cuando se monta el componente
  useEffect(() => {
    console.log("Effect ejecutándose:", { category, isNewPage, location: location.pathname });
    
    let productsToShow = [];
    let filterToSet = "todos";
    
    if (isNewPage) {
      // Si estamos en /products/new, mostrar los productos de recién llegados
      productsToShow = productCategories.newArrivals || [];
      filterToSet = "todos";
      console.log("Mostrando productos de recién llegados:", productsToShow.length);
    } else if (category && filterOptions.includes(category)) {
      // Si hay una categoría específica válida, obtener productos de esa categoría
      productsToShow = getProductsByCategory(category) || [];
      filterToSet = category;
      console.log(`Mostrando productos de categoría ${category}:`, productsToShow.length);
    } else {
      // Si no hay categoría válida, mostrar array vacío
      productsToShow = [];
      filterToSet = "todos";
      console.log("No hay categoría válida, mostrando array vacío");
    }
    
    // Actualizar estados - es importante hacer esto en el orden correcto
    setFiltered(productsToShow);
    setActiveFilter(filterToSet);
    setCurrentPage(1); // CRÍTICO: resetear página cuando cambia el filtro
    
    console.log("Estados actualizados:", { 
      productsCount: productsToShow.length, 
      filter: filterToSet 
    });
    
  }, [category, isNewPage, location.pathname]); // Dependencias importantes para el efecto

  // FUNCIÓN: Manejar cambio de filtro manual (solo funciona en la página "new")
  // Esta función permite filtrar productos dentro de la página de recién llegados
  const handleFilterChange = (newFilter) => {
    if (!isNewPage) {
      console.log("Intento de filtrar fuera de la página new - bloqueado");
      return; // Los filtros solo funcionan en la página "new"
    }
    
    console.log("Cambiando filtro a:", newFilter);
    
    let productsToShow = [];
    
    if (newFilter === "todos") {
      // Mostrar todos los productos de recién llegados
      productsToShow = productCategories.newArrivals || [];
    } else {
      // Filtrar los productos de recién llegados por categoría específica
      productsToShow = (productCategories.newArrivals || []).filter(
        product => product.category === newFilter
      );
    }
    
    console.log(`Productos después del filtro ${newFilter}:`, productsToShow.length);
    
    // Actualizar estados
    setFiltered(productsToShow);
    setActiveFilter(newFilter);
    setCurrentPage(1); // IMPORTANTE: resetear página cuando cambia el filtro
  };

  // FUNCIÓN: Manejar cambio de página
  // Esta función es llamada cuando el usuario hace clic en un botón de paginación
  const handlePageChange = (pageNumber) => {
    console.log("Cambiando a página:", pageNumber);
    setCurrentPage(pageNumber);
    
    // Opcional: scroll hacia arriba cuando cambia la página para mejor UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DEBUGGING: Log de valores importantes para diagnosticar problemas
  console.log("Render - Valores actuales:", {
    filteredCount: filtered.length,
    sortedCount: sortedProducts.length,
    paginatedCount: paginated.length,
    currentPage,
    totalPages,
    activeFilter,
    isNewPage
  });

  return (
    <section className="px-4 pt-3 text-white">
      {/* Título y contenido especial para la página "new" */}
      {isNewPage && (
        <>
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-2">
            Recién llegados
          </h1>
          
          {/* Marquesina */}
          <MarqueeText 
            text="✨ Prendas Nuevas cada Mes"
            speed="12s"
            fontClass="font-dancing"
          />
          
          {/* Filtros - Solo mostrar en la página de recién llegados */}
          <div className="flex gap-3 overflow-x-auto pb-4 mt-2">
            <button
              onClick={() => handleFilterChange("todos")}
              className={`px-4 py-1 rounded-full border ${
                activeFilter === "todos"
                  ? "bg-white text-black border-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              } text-sm whitespace-nowrap transition-colors`}
            >
              todos
            </button>
            {filterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-4 py-1 rounded-full border ${
                  activeFilter === cat
                    ? "bg-white text-black border-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                } text-sm whitespace-nowrap transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Selector de ordenamiento */}
          <div className="mb-4">
            <select
              onChange={(e) => {
                console.log("Cambiando orden a:", e.target.value);
                setSortOrder(e.target.value);
                // No es necesario resetear la página aquí ya que el ordenamiento 
                // no afecta el número total de productos
              }}
              value={sortOrder}
              className="bg-white text-black text-sm px-3 py-1 rounded w-full max-w-xs"
            >
              <option value="default">Ordenar por</option>
              <option value="price-low">Precio: menor a mayor</option>
              <option value="price-high">Precio: mayor a menor</option>
            </select>
          </div>
        </>
      )}

      {/* Título para páginas de categoría específica */}
      {!isNewPage && category && (
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6 capitalize">
          {category}
        </h1>
      )}

      {/* Grid de productos paginados */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {paginated.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white p-1 rounded shadow text-black hover:scale-105 transition-transform"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full rounded h-62 object-cover" 
              />
              <h3 className="text-sm mt-1 font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-600">
                ${item.price}
                {item.discount && (
                  <span className="ml-2 line-through text-red-500">
                    ${item.discount}
                  </span>
                )}
              </p>
              {/* Mostrar rating si está disponible */}
              {item.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(item.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {item.rating}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-8">
          <p>No hay productos disponibles en esta categoría.</p>
          {/* Información adicional para ayudar al usuario */}
          {!isNewPage && (
            <p className="text-sm mt-2">
              Intenta visitar la sección de{" "}
              <Link to="/products/new" className="text-white underline hover:text-gray-300">
                Recién llegados
              </Link>
            </p>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {/* Números de página */}
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === pageNum
                    ? "bg-white text-black font-bold"
                    : "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
        </div>
      )}

      {/* Información de paginación para el usuario */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-400">
          Página {currentPage} de {totalPages} • Mostrando {paginated.length} de {sortedProducts.length} productos
        </div>
      )}

      {/* Información adicional para debugging (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-800 rounded text-xs">
          <h4 className="font-bold mb-2">Debug info:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p><strong>URL Info:</strong></p>
              <p>Category from URL: {category || 'ninguna'}</p>
              <p>Is New Page: {isNewPage.toString()}</p>
              <p>Full pathname: {location.pathname}</p>
            </div>
            <div>
              <p><strong>Filter Info:</strong></p>
              <p>Active Filter: {activeFilter}</p>
              <p>Available Filters: {filterOptions.join(', ')}</p>
            </div>
            <div>
              <p><strong>Product Counts:</strong></p>
              <p>Total Available: {productCategories.newArrivals?.length || 0}</p>
              <p>After Filter: {filtered.length}</p>
              <p>After Sort: {sortedProducts.length}</p>
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