// src/components/NewArrivals.jsx
import { Link } from "react-router-dom";

// Importar las imágenes necesarias
import t1 from "../assets/tshirt1.png";
import t3 from "../assets/tshirt3.png";
import t5 from "../assets/tshirt5.png";
import sp1 from "../assets/sweatpants1.png";
import cap1 from "../assets/cap1.png";
import buzo5 from "../assets/buzo5.png";

// UNIFIED PRODUCT DATA - Esta debe coincidir exactamente con ProductDetail.jsx y ProductsPage.jsx
const products = [
  {
    id: "1", // ID consistente con ProductDetail.jsx
    name: "Monkey fly", // Nombre consistente
    price: "80.000 cop", // Formato consistente
    image: t1,
    rating: 4.5,
  },
  { 
    id: "13", 
    name: "Lex Esmeralda", 
    category: "gorras", 
    price: "60.000 cop", 
    image: cap1,
    rating: 4.3
  },
  {
    id: "3", // ID consistente
    name: "D2D japanese", // Nombre consistente con ProductsPage
    price: "80.000 cop",
    discount: "95.000 cop",
    image: t3,
    rating: 4.3,
  },
  

  {
    id: "5", // ID consistente
    name: "Dirty Bart black", // Nombre consistente
    price: "80.000 cop",
    discount: "90.000 cop", // Formato consistente
    image: t5,
    rating: 4.3,
  },

  {
    id: "14", // ID consistente
    name: "Sudadera artico", // Nombre consistente con ProductsPage
    price: "90.000 cop", // Precio consistente
    discount: "105.000 cop", // Formato consistente
    image: sp1,
    rating: 4.3,
  },
    { 
      id: "16", 
      name: "Drugsrats white", 
      category: "buzos", 
      price: "150.000 cop", 
      image: buzo5,
      rating: 4.4
    }
];

export default function NewArrivals() {
  // 🧠 CÁLCULO DEL PUNTO MEDIO
  // Math.ceil() redondea hacia arriba para manejar arrays con cantidad impar de elementos
  // Si tenemos 6 productos: Math.ceil(6/2) = 3
  // Si tuviéramos 7 productos: Math.ceil(7/2) = 4
  const midpoint = Math.ceil(products.length / 2);
  
  // 🔪 DIVISIÓN DEL ARRAY EN DOS SUBLISTAS
  // firstList toma desde el índice 0 hasta midpoint-1 (no incluye midpoint)
  // Con 6 productos: slice(0, 3) = productos en índices [0, 1, 2]
  const firstList = products.slice(0, midpoint);
  
  // secondList toma desde midpoint hasta el final del array
  // Con 6 productos: slice(3) = productos en índices [3, 4, 5]
  const secondList = products.slice(midpoint);

  return (
    <section className="px-4 mt-2">
      <h2 className="font-montserrat font-black text-2xl block mb-6 text-white">
        Nuevos Productos
      </h2>

      {/* 📋 PRIMERA LISTA - Muestra solo la primera mitad de productos */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-1">
        {firstList.map((item) => (
          <Link
            key={`list1-${item.id}`} // Key único para evitar conflictos
            to={`/product/${item.id}`} // Usar el ID consistente para navegación
            className="min-w-[170px] bg-white shadow p-2 rounded block hover:shadow-lg transition-shadow"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full rounded h-44 object-cover" // Altura consistente
            />
            <h3 className="text-sm mt-1 font-semibold text-black truncate">
              {item.name}
            </h3>
            <div className="text-xs text-gray-500">
              <span className="font-bold text-black">${item.price}</span>
              {item.discount && (
                <span className="line-through ml-1 text-red-400">
                  ${item.discount}
                </span>
              )}
            </div>
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

      {/* 📋 SEGUNDA LISTA - Muestra solo la segunda mitad de productos */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-1">
        {secondList.map((item) => (
          <Link
            key={`list2-${item.id}`} // Key único para la segunda lista
            to={`/product/${item.id}`} // Usar el ID consistente para navegación
            className="min-w-[170px] bg-white shadow p-2 rounded block hover:shadow-lg transition-shadow"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full rounded h-44 object-cover" // Altura consistente
            />
            <h3 className="text-sm mt-1 font-semibold text-black truncate">
              {item.name}
            </h3>
            <div className="text-xs text-gray-500">
              <span className="font-bold text-black">${item.price}</span>
              {item.discount && (
                <span className="line-through ml-1 text-red-400">
                  ${item.discount}
                </span>
              )}
            </div>
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

      {/* Botón "Ver todos" que navega a la página de productos nuevos */}
      <div className="flex justify-center my-8">
        <Link
          to="/products/new" // Ruta consistente con ProductsPage
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition-colors"
        >
          ver todos
        </Link>
      </div>

      {/* Información de debugging (solo en desarrollo) 
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-800 rounded text-xs text-white">
          <p>NewArrivals Debug:</p>
          <p>Products count: {products.length}</p>
          <p>Product IDs: {products.map(p => p.id).join(', ')}</p>
        </div>
      )}
      */}
    </section>
  );
}