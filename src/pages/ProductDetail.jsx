import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiChevronRight as FiBreadcrumbArrow } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/productData";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  // Estados
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  
  const product = getProductById(id);

  // Manejador para agregar al carrito
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.gallery[0],
        size: selectedSize,
        quantity: 1
      }
    });

    // Mostrar notificación
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (!product) {
    return (
      <div className="px-4 pt-20 text-white">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <p className="mt-4">El producto con ID "{id}" no existe en nuestro catálogo.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Home", route: "/" },
    { name: product.breadcrumbCategory, route: product.breadcrumbRoute },
    { name: product.name, route: null }
  ];

  const handleBreadcrumbClick = (route) => {
    if (route) navigate(route);
  };

  const imagesToShow = product.gallery || [product.image];
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Tallas disponibles (puedes personalizarlo según tus necesidades)
  const availableSizes = ['S', 'M', 'L', 'XL'];

  return (
    <section className="px-4 pt-10 text-white bg-[#2a0a59] min-h-screen max-w-4xl mx-auto">
      {/* Notificación de producto agregado */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ¡Producto agregado al carrito!
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.route ? (
                <button
                  onClick={() => handleBreadcrumbClick(item.route)}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <span className="text-white font-medium cursor-default">
                  {item.name}
                </span>
              )}
              
              {index < breadcrumbItems.length - 1 && (
                <FiBreadcrumbArrow className="mx-1.5 text-gray-400 text-xs" />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sección de imágenes */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={imagesToShow[currentImageIndex]}
              alt={`${product.name} vista ${currentImageIndex + 1}`}
              className="w-full rounded object-contain"
            />
          </div>

          {imagesToShow.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-1">
              {imagesToShow.map((src, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? 'border-purple-400 opacity-100' 
                      : 'border-gray-600 opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl font-bold text-white">
                ${product.price}
              </span>
              {product.discount && (
                <span className="text-lg line-through text-red-400">
                  ${product.discount}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  {product.rating} / 5
                </span>
              </div>
            )}
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Categoría</h3>
            <p className="text-gray-300 capitalize">{product.category}</p>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Selector de tallas */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tallas disponibles</h3>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedSize === size 
                      ? 'bg-white text-black border-white' 
                      : 'border-gray-400 text-white hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botón de agregar al carrito */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-3 px-6 rounded-lg font-bold hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg"
          >
            {selectedSize ? `Agregar al carrito - Talla ${selectedSize}` : 'Selecciona una talla'}
          </button>

          {/* Información adicional */}
          <div className="mt-3 p-4 bg-purple-900 bg-opacity-30 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-purple-200">
              Información adicional
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Envío gratis en compras superiores a $200.000</li>
              <li>• Cambios y devoluciones hasta 30 días después de la compra</li>
              <li>• Producto original con garantía de calidad</li>
              <li>• Diseño exclusivo de la marca</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-800 rounded text-xs">
          <p>Debug info:</p>
          <p>Product ID: {id}</p>
          <p>Selected Size: {selectedSize}</p>
          <p>Images in Gallery: {imagesToShow.length}</p>
        </div>
      )}
    </section>
  );
}