// src/components/BrandSection.jsx
import { Link } from "react-router-dom";
//import bgD2D from "../assets/d2d-universo.png";
import buzo1 from "../assets/buzo1.png";
import buzo2 from "../assets/buzo2.png";
import buzo3 from "../assets/buzo3.png";
import buzo4 from "../assets/buzo4.png";


const brands = [
  {
    id: "universo-d2d",
    title: "Universo D2D",
    bgType: "color",
    bg: "bg-black",
    products: [
      {
        id: "10",
        name: "Vertical Striped Shirt",
        price: 212,
        discount: 235,
        image: buzo1,
      },
      {
        id: "11",
        name: "Courage Graphic Tee",
        price: 145,
        image: buzo2,
      },
    ],
  },
  {
    id: "vision-lex",
    title: "Vision LEX",
    bgType: "color",
    bg: "bg-gradient-to-br from-[#3f0f4f] to-[#7d1c82]",
    products: [
      {
        id: "12",
        name: "Vertical Striped Shirt",
        price: 212,
        discount: 235,
        image: buzo3,
      },
      {
        id: "13",
        name: "Courage Graphic Tee",
        price: 145,
        image: buzo4,
      },
    ],
  },
];

export default function BrandSection() {
  return (
    <section className="mt-7">
      {brands.map((brand, idx) => (
        <div
          key={idx}
          className={`rounded-lg mb-2`}
          style={
            brand.bgType === "image"
              ? { backgroundImage: `url(${brand.bgImage})` }
              : {}
          }
        >
          <div
            className={
              brand.bgType === "color" ? `${brand.bg} rounded-lg p-8` : ""
            }
          >
            <h2 className="text-center text-white text-4xl sm:text-5xl font-extrabold uppercase tracking-wide mb-8 drop-shadow-md">
              {brand.title}
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {brand.products.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="min-w-[150px] bg-white p-2 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out block"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto rounded-md object-cover"
                  />
                  <h3 className="text-sm mt-2 font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    ${item.price}
                    {item.discount && (
                      <span className="line-through ml-1 text-red-500">
                        ${item.discount}
                      </span>
                    )}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to={`/${brand.id === "universo-d2d" ? "products/universo-d2d" : "products/vision-lex"}`}
                className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
              >
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}