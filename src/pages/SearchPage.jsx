// src/pages/SearchPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import { 
  getAllProducts, 
  //getProductsByCategory, 
  getAvailableCategories,
  convertPriceToNumber 
} from '../data/productData';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Estados para la funcionalidad
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300000 });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  // Efecto para filtrar productos
  useEffect(() => {
    let results = [...allProducts];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categorías seleccionadas
    if (selectedCategories.length > 0) {
      results = results.filter(product =>
        selectedCategories.includes(product.category)
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
  }, [searchTerm, selectedCategories, priceRange, sortBy]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Manejar selección de categorías
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  // Seleccionar todas las categorías
  const selectAllCategories = () => {
    setSelectedCategories([]);
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 300000 });
    setSortBy('name');
    setSearchParams({});
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

      {/* Menú deslizante de categorías - NUEVO COMPONENTE */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 mb-2">
          {/* Botón "todos" */}
          <button
            onClick={selectAllCategories}
            className={`
              flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap
              ${selectedCategories.length === 0
                ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/25'
                : 'bg-transparent border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300'
              }
            `}
          >
            todos
          </button>
          
          {/* Botones de categorías */}
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`
                flex-shrink-0 px-6 py-2 rounded-full border-2 text-sm font-medium transition-all duration-300 whitespace-nowrap capitalize
                ${selectedCategories.includes(category)
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-transparent border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-300'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Indicador de categorías seleccionadas */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-purple-300">
            <span>Filtrando por:</span>
            <div className="flex gap-1 flex-wrap">
              {selectedCategories.map(cat => (
                <span key={cat} className="bg-purple-600/20 px-2 py-1 rounded text-xs capitalize">
                  {cat}
                </span>
              ))}
            </div>
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
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
              }
            `}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => goToProduct(product.id)}
                  className={`
                    group cursor-pointer bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105
                    ${viewMode === 'list' ? 'flex gap-4 p-4' : 'p-4'}
                  `}
                >
                  <div className={`${viewMode === 'list' ? 'w-24 h-24' : 'w-full h-48'} bg-gray-700 rounded-lg mb-3 overflow-hidden`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2 capitalize">
                      {product.category}
                    </p>
                    
                    {viewMode === 'list' && (
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
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
                      
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-400">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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