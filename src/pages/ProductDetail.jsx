// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
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
import buzo1 from "../assets/buzo1.png";
import buzo2 from "../assets/buzo2.png";
import buzo3 from "../assets/buzo3.png";
import buzo4 from "../assets/buzo4.png";

const mockProducts = {
  // Productos Universo D2D
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
 // Productos Vision LEX
  "t7": {
    name: "Homero Smoking",
    price: 75,
    image: t7,
    rating: 4.5,
    description: "Buzo premium con estampado de Homero en smoking elegante.",
    brand: "vision-lex"
  },
  "t8": {
    name: "LEX Homero",
    price: 80,
    image: t8,
    rating: 4.7,
    description: "Edición especial LEX con diseño futurista de Homero.",
    brand: "vision-lex"
  },
  "t9": {
    name: "Niño Rata",
    price: 240,
    image: t9,
    rating: 4.2,
    description: "Gorra con diseño irreverente y detalles únicos.",
    brand: "vision-lex"
  },
  "t10": {
    name: "Krusty Skull",
    price: 75,
    image: t10,
    rating: 4.4,
    description: "Buzo con cráneo estilo Krusty el Payaso.",
    brand: "vision-lex"
  },
  "t11": {
    name: "Good Luck Black",
    price: 80,
    image: t11,
    rating: 4.6,
    description: "Diseño minimalista con mensaje oculto.",
    brand: "vision-lex"
  },
  "t12": {
    name: "Dirty Bart Oversize",
    price: 240,
    image: t12,
    rating: 4.1,
    description: "Versión oversize del clásico Bart rebelde.",
    brand: "vision-lex"
  },
   "10": {
    name: "Vertical Striped Shirt",
    price: 212,
    discount: 235,
    image: buzo1,
    rating: 4.4,
    description: "Buzo con líneas verticales, perfecto para outfits modernos.",
  },
  "11": {
    name: "Courage Graphic Tee",
    price: 145,
    image: buzo2,
    rating: 4.6,
    description: "Remera con estampado urbano y tipografía valiente.",
  },
  "12": {
    name: "Vertical Striped Shirt",
    price: 212,
    discount: 235,
    image: buzo3,
    rating: 4.2,
    description: "Otra variante de nuestro buzo más vendido.",
  },
  "13": {
    name: "Courage Graphic Tee",
    price: 145,
    image: buzo4,
    rating: 4.7,
    description: "Edición limitada con detalles gráficos únicos.",
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
