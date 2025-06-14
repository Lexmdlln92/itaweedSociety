// src/pages/UniversoD2DPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import buzo1 from "../assets/buzo1.png";
import buzo2 from "../assets/buzo2.png";
import buzo3 from "../assets/buzo3.png";
import buzo4 from "../assets/buzo4.png";

const allProducts = [
  { id: "10", name: "Vertical Striped Shirt", category: "buzos", price: 212, image: buzo1 },
  { id: "11", name: "Courage Graphic Tee", category: "camisetas", price: 145, image: buzo2 },
  { id: "12", name: "Vertical Striped Shirt", category: "sudaderas", price: 212, image: buzo3 },
  { id: "13", name: "Courage Graphic Tee", category: "gorras", price: 145, image: buzo4 },
];

const categories = ["todos", "buzos", "camisetas", "sudaderas", "gorras"];

export default function UniversoD2DPage() {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filtered =
    activeCategory === "todos"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="px-4 pt-5 text-white">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-2 uppercase">
        UNIVERSO D2D
      </h1>
      <p className="text-center text-sm text-gray-300 mb-4">
        Descubre la colección urbana que define tu estilo auténtico.
      </p>

      {/* Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full border ${
              activeCategory === cat
                ? "bg-white text-black border-white"
                : "border-white text-white"
            } text-sm whitespace-nowrap transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {filtered.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="bg-white p-2 rounded shadow text-black hover:scale-105 transition-transform"
          >
            <img src={item.image} alt={item.name} className="w-full h-auto rounded" />
            <h3 className="text-sm mt-1 font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-600">${item.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
