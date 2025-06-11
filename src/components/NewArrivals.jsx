// src/components/NewArrivals.jsx
import { Link } from "react-router-dom";
import t1 from "../assets/tshirt1.png";
import t2 from "../assets/tshirt2.png";
import t3 from "../assets/tshirt3.png";
import t4 from "../assets/tshirt4.png";
import t5 from "../assets/tshirt5.png";
import t6 from "../assets/tshirt6.jpg";

const products = [
  {
    id: "1",
    name: "T-shirt monkey fly",
    price: 75,
    image: t1,
    rating: 4.5,
  },
  {
    id: "2",
    name: "T-shirt psico beach",
    price: 80,
    discount: 260,
    image: t2,
    rating: 4.3,
  },
  {
    id: "3",
    name: "T-shirt japanese",
    price: 80,
    discount: 260,
    image: t3,
    rating: 4.3,
  },
  {
    id: "4",
    name: "T-shirt dirty bart",
    price: 75,
    image: t4,
    rating: 4.5,
  },
  {
    id: "5",
    name: "T-shirt dirty bart black",
    price: 80,
    discount: 260,
    image: t5,
    rating: 4.3,
  },
  {
    id: "6",
    name: "T-shirt ",
    price: 240,
    discount: 260,
    image: t6,
    rating: 4.3,
  },
];

export default function NewArrivals() {
  return (
    <section className="px-4 mt-2">
      <h2 className="text-xl font-semibold mb-6 text-white">NEW ARRIVALS</h2>

      {/* Listado normal */}
      <div className="flex gap-4 overflow-x-auto pb-2 mb-2">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="min-w-[150px] bg-white shadow p-2 rounded block"
          >
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
          </Link>
        ))}
      </div>

      {/* Segunda fila (scroll inverso) */}
      <div className="flex flex-row-reverse gap-4 overflow-x-auto">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="min-w-[150px] bg-white shadow p-2 rounded block"
          >
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
          </Link>
        ))}
      </div>

      {/* Botón "Ver todos" */}
      <div className="flex justify-center my-8">
        <Link
          to="/products/new"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg"
        >
          ver todos
        </Link>
      </div>
    </section>
  );
}
