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
import t7 from "../assets/tshirt7.png";
import t8 from "../assets/tshirt8.png";
import t9 from "../assets/tshirt9.png";
import t10 from "../assets/tshirt10.png";
import t11 from "../assets/tshirt11.png";
import t12 from "../assets/tshirt12.png";

const allProducts = [
  { id: "1", name: "Camiseta monkey fly", category: "camisetas", price: 75, image: t1 },
  { id: "2", name: "Camiseta psico beach", category: "camisetas", price: 80, image: t2 },
  { id: "3", name: "Sudadera japonesa", category: "sudaderas", price: 80, image: t3 },
  { id: "4", name: "Buzo dirty bart", category: "buzos", price: 75, image: t4 },
  { id: "5", name: "Buzo black bart", category: "buzos", price: 80, image: t5 },
  { id: "6", name: "Gorra premium", category: "gorras", price: 240, image: t6 },
  { id: "7", name: "homero smoking", category: "buzos", price: 75, image: t7 },
  { id: "8", name: "LEX homero", category: "buzos", price: 80, image: t8 },
  { id: "9", name: "Niño Rata", category: "gorras", price: 240, image: t9 },
  { id: "10", name: "krusty skull", category: "buzos", price: 75, image: t10 },
  { id: "11", name: "good luck black", category: "buzos", price: 80, image: t11 },
  { id: "12", name: "dirty bart oversize", category: "gorras", price: 240, image: t12 },
];

const filterOptions = ["buzos", "camisetas", "sudaderas", "gorras"];

export default function ProductsPage() {
  const { category } = useParams();
  const location = useLocation();
  const isNewPage = location.pathname === "/products/new";

  const [activeFilter, setActiveFilter] = useState("todos");
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  // 🆕 Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🧠 Calcular productos ordenados
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOrder === "price-low") return a.price - b.price;
    if (sortOrder === "price-high") return b.price - a.price;
    return 0;
  });

  // 🧠 Calcular productos paginados
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginated = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (isNewPage) {
      setFiltered(allProducts);
      setActiveFilter("todos");
    } else if (category && filterOptions.includes(category)) {
      setFiltered(allProducts.filter((p) => p.category === category));
      setActiveFilter(category);
    } else {
      setFiltered([]);
    }
    setCurrentPage(1); // reset page on filter change
  }, [category, isNewPage]);

  return (
    <section className="px-4 pt-10 text-white">
      {/* Título */}
      {isNewPage && (
        <>
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
            New Arrivals
          </h1>

          {/* Filtros */}
          <div className="flex gap-3 overflow-x-auto pb-4">
            <button
              onClick={() => {
                setFiltered(allProducts);
                setActiveFilter("todos");
              }}
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

          {/* Ordenamiento */}
          <div className="mb-4">
            <select
              onChange={(e) => setSortOrder(e.target.value)}
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

      {/* Productos paginados */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {paginated.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white p-2 rounded shadow text-black hover:scale-105 transition-transform"
            >
              <img src={item.image} alt={item.name} className="w-full rounded" />
              <h3 className="text-sm mt-1 font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-600">${item.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">
          No hay productos disponibles.
        </p>
      )}

      {/* 🔢 Botones de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-white text-black font-bold"
                  : "bg-transparent border border-white text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
