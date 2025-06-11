// src/pages/ProductsPage.jsx
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import t1 from "../assets/tshirt1.png";
import t2 from "../assets/tshirt2.png";
import t3 from "../assets/tshirt3.png";
import t4 from "../assets/tshirt4.png";
import t5 from "../assets/tshirt5.png";
import t6 from "../assets/tshirt6.jpg";

const allProducts = [
  { id: "1", name: "Camiseta monkey fly", category: "camisetas", price: 75, image: t1 },
  { id: "2", name: "Camiseta psico beach", category: "camisetas", price: 80, image: t2 },
  { id: "3", name: "Sudadera japonesa", category: "sudaderas", price: 80, image: t3 },
  { id: "4", name: "Buzo dirty bart", category: "buzos", price: 75, image: t4 },
  { id: "5", name: "Buzo black bart", category: "buzos", price: 80, image: t5 },
  { id: "6", name: "Gorra premium", category: "gorras", price: 240, image: t6 },
];

const filterOptions = ["buzos", "camisetas", "sudaderas", "gorras"];

export default function ProductsPage() {
  const { category } = useParams(); // puede ser undefined (si estás en /products/new)
  const location = useLocation();

  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);

  // Detectar si estamos en /products/new
  const isNewPage = location.pathname === "/products/new";

  useEffect(() => {
    if (isNewPage) {
      // Mostrar todo en /products/new
      setFiltered(allProducts);
      setActiveFilter("todos");
    } else if (category && filterOptions.includes(category)) {
      // Si estamos en /products/:category y es válida
      setFiltered(allProducts.filter((p) => p.category === category));
      setActiveFilter(category);
    } else {
      // Si la categoría no existe
      setFiltered([]);
    }
  }, [category, isNewPage]);

  return (
    <section className="px-4 pt-2 text-white">
            {isNewPage && (
        <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
          New Arrivals
        </h1>
      )}
      {/* Filtros sólo si estamos en /products/new */}
      {isNewPage && (
        <div className="flex gap-3 overflow-x-auto pb-4">
          <button
            onClick={() => setFiltered(allProducts)}
            className={`px-4 py-1 rounded-full border ${
              activeFilter === "todos"
                ? "bg-white text-black border-white"
                : "border-white text-white"
            } text-sm whitespace-nowrap transition`}
          >
            todos
          </button>

          {filterOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFiltered(allProducts.filter((p) => p.category === cat));
                setActiveFilter(cat);
              }}
              className={`px-4 py-1 rounded-full border ${
                activeFilter === cat
                  ? "bg-white text-black border-white"
                  : "border-white text-white"
              } text-sm whitespace-nowrap transition`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
          <p className="mt-3 text-white mb-5">
              Browse our unique selection crafted to reflect your individuality.
              Browse our unique selection crafted to reflect your individuality.
              Browse our unique selection crafted to reflect your individuality.
          </p>
      {/* Grid de productos */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {filtered.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white p-2 rounded shadow text-black hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto rounded"
              />
              <h3 className="text-sm mt-1 font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-600">${item.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">No hay productos disponibles.</p>
      )}
    </section>
  );
}
