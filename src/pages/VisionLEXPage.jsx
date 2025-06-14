
// src/pages/VisionLEXPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import t7 from "../assets/tshirt7.png";
import t8 from "../assets/tshirt8.png";
import t9 from "../assets/tshirt9.png";
import t10 from "../assets/tshirt10.png";
import t11 from "../assets/tshirt11.png";
import t12 from "../assets/tshirt12.png";

const allProducts = [
  { id: "t7", name: "Homero Smoking", category: "buzos", price: 75, image: t7 },
  { id: "t8", name: "LEX Homero", category: "buzos", price: 80, image: t8 },
  { id: "t9", name: "Niño Rata", category: "gorras", price: 240, image: t9 },
  { id: "t10", name: "Krusty Skull", category: "camisetas", price: 75, image: t10 },
  { id: "t11", name: "Good Luck Black", category: "camisetas", price: 80, image: t11 },
  { id: "t12", name: "Dirty Bart Oversize", category: "gorras", price: 240, image: t12 },
];

const categories = ["todos", "buzos", "camisetas", "sudaderas", "gorras"];

export default function VisionLEXPage() {
  const [activeCategory, setActiveCategory] = useState("todos");

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeCategory === "todos"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="px-4 pt-5 text-white bg-gradient-to-br from-[#3f0f4f] to-[#7d1c82] min-h-screen">
      <div className="pt-4">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-2 uppercase">
        VISIÓN LEX
      </h1>
      <p className="text-center text-sm text-gray-300 mb-4">
        Tecnología y estilo fusionados en prendas de vanguardia.
      </p>

      {/* Filtros */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1 rounded-full border ${
              activeCategory === cat
                ? "bg-white text-[#3f0f4f] border-white"
                : "border-white text-white"
            } text-sm whitespace-nowrap transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pb-8">
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
      </div>
    </section>
  );
}