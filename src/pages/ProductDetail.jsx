// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import t1 from "../assets/tshirt1.png";
import t2 from "../assets/tshirt2.png";
import t3 from "../assets/tshirt3.png";
import t4 from "../assets/tshirt4.png";
import t5 from "../assets/tshirt5.png";
import t6 from "../assets/tshirt6.jpg";

const mockProducts = {
  "1": {
    name: "T-shirt monkey fly",
    price: 75,
    image: t1,
    rating: 4.5,
    description: "Camisa urbana con estampado original estilo manga street.",
  },
  "2": {
    name: "T-shirt psico beach",
    price: 80,
    discount: 260,
    image: t2,
    rating: 4.3,
    description: "Edición limitada con gráfico psicodélico playero.",
  },
  "3": {
    name: "T-shirt japanese",
    price: 80,
    discount: 260,
    image: t3,
    rating: 4.3,
    description: "Tipografía japonesa y tela oversize cómoda.",
  },
  "4": {
    name: "T-shirt dirty bart",
    price: 75,
    image: t4,
    rating: 4.5,
    description: "Bart Simpson con actitud grunge noventera.",
  },
  "5": {
    name: "T-shirt dirty bart black",
    price: 80,
    discount: 260,
    image: t5,
    rating: 4.3,
    description: "Versión dark, ideal para outfits full black.",
  },
  "6": {
    name: "T-shirt básica premium",
    price: 240,
    discount: 260,
    image: t6,
    rating: 4.3,
    description: "T-shirt simple pero con tejido premium y cortes limpios.",
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts[id];

  if (!product) {
    return (
      <div className="px-4 pt-20 text-white">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <section className="px-4 pt-20 text-white max-w-md mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded-lg shadow-lg mb-4"
      />

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div className="text-lg mt-2">
        <span className="text-white font-semibold">${product.price}</span>
        {product.discount && (
          <span className="line-through text-red-400 ml-2">
            ${product.discount}
          </span>
        )}
      </div>

      <p className="text-sm mt-2 text-gray-300">⭐ {product.rating} / 5</p>

      <p className="mt-4 text-sm text-gray-300">{product.description}</p>

      <button className="mt-6 w-full bg-white text-black py-2 rounded-lg font-bold hover:bg-gray-200 transition">
        Agregar al carrito
      </button>
    </section>
  );
}
