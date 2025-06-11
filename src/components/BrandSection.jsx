// src/components/BrandSection.jsx
import buzo1 from "../assets/buzo1.png";
import buzo2 from "../assets/buzo2.png";
import buzo3 from "../assets/buzo3.png";
import buzo4 from "../assets/buzo4.png";

const brands = [
  {
    title: "Universo D2D",
    bg: "bg-gradient-to-br from-[#1a1a1a] to-[#333333]", // 🔥 fondo oscuro elegante
    products: [
      {
        name: "Vertical Striped Shirt",
        price: 212,
        discount: 235,
        image: buzo1,
      },
      {
        name: "Courage Graphic Tee",
        price: 145,
        image: buzo2,
      },
    ],
  },
  {
    title: "Vision LEX",
    bg: "bg-gradient-to-br from-[#3f0f4f] to-[#7d1c82]", // 💜 fondo morado fuerte
    products: [
      {
        name: "Vertical Striped Shirt",
        price: 212,
        discount: 235,
        image: buzo3,
      },
      {
        name: "Courage Graphic Tee",
        price: 145,
        image: buzo4,
      },
    ],
  },
];

export default function BrandSection() {
  return (
    <section className="space-y-8 mt-10">
      {brands.map((brand, idx) => (
        <div key={idx} className={`${brand.bg} px-4 py-6 rounded-lg`}>
          {/* Título centrado y poderoso */}
          <h2 className="text-center text-white text-4xl sm:text-5xl font-extrabold uppercase tracking-wide mb-6">
            {brand.title}
          </h2>
          <p className="mt-3 text-white mb-5">
              Browse our unique selection crafted to reflect your individuality.
              Browse our unique selection crafted to reflect your individuality.
              Browse our unique selection crafted to reflect your individuality.
          </p>

          {/* Productos scrollables */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {brand.products.map((item, i) => (
              <div key={i} className="min-w-[150px] bg-white shadow p-2 rounded">
                <img src={item.image} alt={item.name} className="w-full rounded" />
                <h3 className="text-sm mt-1">{item.name}</h3>
                <p className="text-xs text-gray-500">
                  ${item.price}
                  {item.discount && (
                    <span className="line-through ml-1 text-red-400">
                      ${item.discount}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <button className="px-6 py-2 border-2 border-white text-white rounded-full text-lg">
              ver todos
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
