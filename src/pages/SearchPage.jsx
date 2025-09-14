// src/pages/SearchPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import { 
  getAllProducts, 
  getAvailableCategories,
  convertPriceToNumber,
  getVisionLexProducts,
  getUniversoD2DProducts
} from '../data/productData';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados para la funcionalidad - Ahora solo una categoría puede estar seleccionada
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(''); // Cambiado a string único
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 productos por página

  // Datos estáticos
  const allProducts = getAllProducts();
  const categories = getAvailableCategories();
  
  // Opciones de ordenamiento
  const sortOptions = [
    { value: 'name', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'rating', label: 'Mejor Valorados' }
  ];

  // Función simplificada y efectiva para obtener productos sin duplicados
  const getProductsForCategory = (category) => {
    let products = [];
    
    switch (category) {
      case 'visionLex':
        products = getVisionLexProducts();
        break;
      case 'universoD2D':
        products = getUniversoD2DProducts();
        break;
      case '':
        // Si no hay categoría seleccionada, mostrar todos los productos únicos
        products = allProducts;
        break;
      default:
        // Para categorías normales, filtrar del conjunto completo
        products = allProducts.filter(product => product.category === category);
        break;
    }
    
    // Solución simple pero efectiva: usar Map para eliminar duplicados
    // basándose en una clave compuesta de nombre + imagen
    const uniqueProductsMap = new Map();
    
    products.forEach(product => {
      // Crear una clave única combinando nombre y archivo de imagen
      const imageFileName = 
        typeof product.image === 'string' && product.image.includes('/')
          ? (product.image.split('/').pop() || '').split('.')[0]
          : '';
      const uniqueKey = `${product.name.toLowerCase().trim()}_${imageFileName}`;
      
      // Si no hemos visto este producto antes, o si el actual tiene mejor rating, mantenerlo
      if (!uniqueProductsMap.has(uniqueKey) || 
          (uniqueProductsMap.get(uniqueKey).rating || 0) < (product.rating || 0)) {
        uniqueProductsMap.set(uniqueKey, product);
      }
    });
    
    // Convertir el Map de vuelta a array
    return Array.from(uniqueProductsMap.values());
  };

  // Efecto para filtrar productos
  useEffect(() => {
    let results = getProductsForCategory(selectedCategory);

    // Filtrar por término de búsqueda
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    results = results.filter(product => {
      const price = convertPriceToNumber(product.price);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Ordenar resultados
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);
        case 'price-desc':
          return convertPriceToNumber(b.price) - convertPriceToNumber(a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(results);
    setCurrentPage(1); // Resetear a la primera página cuando cambian los filtros
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // Calcular paginación
  const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
  const totalPages = Math.ceil(filteredProducts.length / safeItemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * safeItemsPerPage,
    currentPage * safeItemsPerPage
  );

  // Manejar cambios en la búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Manejar selección de categoría única
  const handleCategorySelect = (category) => {
    // Si se selecciona la misma categoría, la deseleccionamos
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  // Seleccionar todas las categorías (limpiar selección)
  const selectAllCategories = () => {
    setSelectedCategory('');
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 300000 });
    setSortBy('name');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Cambiar página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navegar a detalle del producto
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="px-4 pt-20 pb-10 min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Buscar Productos
        </h1>
        <p className="text-gray-300">
          Encuentra el producto perfecto para tu estilo
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Menú deslizante de categorías */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-6">
        {/* Botón "todos" */}
        <button
          onClick={selectAllCategories}
          className={`
            flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap
            ${selectedCategory === ''
              ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/25'
              : 'bg-transparent border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300'
            }
          `}
        >
          todos
        </button>
        
        {/* Botones de categorías regulares */}
        {categories.filter(cat => cat !== 'visionLex' && cat !== 'universoD2D').map(category => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`
              flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap capitalize
              ${selectedCategory === category
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/25'
                : 'bg-transparent border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300'
              }
            `}
          >
            {category}
          </button>
        ))}

        {/* Botón especial Vision LEX */}
        <button
          onClick={() => handleCategorySelect('visionLex')}
          className={`
            flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap
            ${selectedCategory === 'visionLex'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/25'
              : 'bg-transparent border-cyan-600 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200'
            }
          `}
        >
          visión lex
        </button>

        {/* Botón especial Universo D2D */}
        <button
          onClick={() => handleCategorySelect('universoD2D')}
          className={`
            flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap
            ${selectedCategory === 'universoD2D'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-400 text-white shadow-lg shadow-orange-600/25'
              : 'bg-transparent border-orange-600 text-orange-300 hover:border-orange-400 hover:text-orange-200'
            }
          `}
        >
          universo d2d
        </button>
      </div>

      {/* Indicador de categoría seleccionada */}
      {selectedCategory && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-purple-300">Filtrando por:</span>
          <span className={`px-3 py-1 rounded-full text-xs capitalize ${
            selectedCategory === 'visionLex' ? 'bg-cyan-600/20 text-cyan-300' :
            selectedCategory === 'universoD2D' ? 'bg-orange-600/20 text-orange-300' :
            'bg-purple-600/20 text-purple-300'
          }`}>
            {selectedCategory === 'visionLex' ? 'Visión LEX' :
             selectedCategory === 'universoD2D' ? 'Universo D2D' :
             selectedCategory}
          </span>
        </div>
      )}
      
      {/* Controles superiores */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          {/* Botón filtros móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
          >
            <FiFilter className="w-4 h-4" />
            Filtros
          </button>
          
          {/* Contador de resultados */}
          <span className="text-gray-400">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Selector de ordenamiento */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Modo de vista */}
          <div className="flex border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar de filtros */}
        <aside className={`
          ${showFilters ? 'block' : 'hidden'} lg:block
          w-full lg:w-64 bg-gray-800/50 rounded-xl p-6 h-fit
          ${showFilters ? 'fixed lg:relative top-0 left-0 right-0 z-50 m-4 lg:m-0' : ''}
        `}>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-xl font-semibold">Filtros</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Filtro por precio */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-200">Precio</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Mínimo</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({...prev, min: Number(e.target.value)}))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  min="0"
                  max="300000"
                  step="1000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Máximo</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({...prev, max: Number(e.target.value)}))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  min="0"
                  max="300000"
                  step="1000"
                />
              </div>
            </div>
          </div>

          {/* Botón limpiar filtros */}
          <button
            onClick={clearAllFilters}
            className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Limpiar Filtros
          </button>
        </aside>

        {/* Grid de productos */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-gray-400 mb-4">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <>
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2' 
                  : 'space-y-4'
                }
              `}>
                {paginatedProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => goToProduct(product.id)}
                    className={`
                      group cursor-pointer bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105
                      ${viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'}
                    `}
                  >
                    <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-full h-60'} bg-gray-700 rounded-lg mb-3 overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-extrabold font-montserrat text-white mb-1 group-hover:text-purple-400 transition-colors text-center">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2 capitalize text-center">
                        {product.category}
                      </p>
                      
                      {viewMode === 'list' && (
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-center">
                        <div>
                          <span className="text-lg font-bold text-purple-400">
                            {product.price}
                          </span>
                          {product.discount && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {product.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                  {/* Botón anterior */}
                  {currentPage > 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-colors"
                    >
                      ‹
                    </button>
                  )}

                  {/* Botones de páginas (máximo 3) */}
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    
                    if (totalPages <= 3) {
                      // Si hay 3 o menos páginas, mostrar todas
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      // Si estamos en las primeras páginas, mostrar 1, 2, 3
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      // Si estamos en las últimas páginas, mostrar las últimas 3
                      pageNum = totalPages - 2 + i;
                    } else {
                      // En el medio, mostrar página actual y vecinas
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white font-bold shadow-lg"
                            : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Indicador de más páginas */}
                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <span className="text-gray-500 px-2">...</span>
                  )}

                  {/* Botón siguiente */}
                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-colors"
                    >
                      ›
                    </button>
                  )}
                </div>
              )}

              {/* Info de paginación */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-gray-400">
                  Página {currentPage} de {totalPages} • Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
                </div>
              )}
              
            </>
          )}
        </main>
      </div>

      {/* Overlay para filtros móvil */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </section>
  );
}