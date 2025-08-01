// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import t1_1 from "../assets/tshirt1-1.png";
import t1_2 from "../assets/tshirt1-2.png";
import t1_3 from "../assets/tshirt1-3.png";

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
  "1": {
    name: "Monkey fly",
    price: "80.000 Cop",
    // solo carga imagen genérica; usaremos el carrusel para las tres vistas
    image: t1,
    rating: 4.5,
    description: "Camiseta urbana con silueta oversize, estampado original estilo manga street.",
    size: "Disponible en tallas de la S a la XXL",
  },
  "2": {
    name: "T-shirt psico beach",
    price: "80.000 Cop",
    discount: 95,
    image: t2,
    rating: 4.8,
    description: "Edición limitada con gráfico psicodélico playero.",
    size: "Disponible en tallas de la S a la XXL",
  },
  // ... (mantengo el resto igual)
  "3": { name: "T-shirt japanese", price: 80, discount: 260, image: t3, rating: 4.3, description: "Tipografía japonesa...", size: "Disponible en tallas de la S a la XXL" },
  "4": { name: "T-shirt dirty bart", price: 75, image: t4, rating: 4.5, description: "Bart Simpson con actitud grunge.", size: "Disponible en tallas de la S a la XXL" },
  "5": { name: "T-shirt dirty bart black", price: 80, discount: 260, image: t5, rating: 4.3, description: "Versión dark...", size: "Disponible en tallas de la S a la XXL" },
  "6": { name: "T-shirt básica premium", price: 240, discount: 260, image: t6, rating: 4.3, description: "Tejido premium...", size: "Disponible en tallas de la S a la XXL" },
  "t7": { name: "Homero Smoking", price: 75, image: t7, rating: 4.5, description: "Buzo premium...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "t8": { name: "LEX Homero", price: 80, image: t8, rating: 4.7, description: "Edición especial...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "t9": { name: "Niño Rata", price: 240, image: t9, rating: 4.2, description: "Gorra irreverente...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "t10": { name: "Krusty Skull", price: 75, image: t10, rating: 4.4, description: "Buzo con cráneo...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "t11": { name: "Good Luck Black", price: 80, image: t11, rating: 4.6, description: "Diseño minimalista...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "t12": { name: "Dirty Bart Oversize", price: 240, image: t12, rating: 4.1, description: "Versión oversize...", size: "Disponible en tallas de la S a la XXL", brand: "vision-lex" },
  "10": { name: "Vertical Striped Shirt", price: 212, discount: 235, image: buzo1, rating: 4.4, description: "Buzo con líneas...", size: "Disponible en tallas de la S a la XXL" },
  "11": { name: "Courage Graphic Tee", price: 145, image: buzo2, rating: 4.6, description: "Remera urbana...", size: "Disponible en tallas de la S a la XXL" },
  "12": { name: "Vertical Striped Shirt", price: 212, discount: 235, image: buzo3, rating: 4.2, description: "Otra variante...", size: "Disponible en tallas de la S a la XXL" },
  "13": { name: "Courage Graphic Tee", price: 145, image: buzo4, rating: 4.7, description: "Edición limitada...", size: "Disponible en tallas de la S a la XXL" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts[id];

  // Si no existe el producto:
  if (!product) {
    return (
      <div className="px-4 pt-20 text-white">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  // Defino el array de imágenes para el carrusel
  const imagesToShow =
    id === "1" ? [t1,t1_1,t1_3,t1_2, ] : [product.image];

  return (
    <section className="px-4 pt-10 text-white bg-[#2a0a59] min-h-screen">
      {/* 1. Flecha de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white mb-4 space-x-2 text-center"
      >
        <FiArrowLeft className="text-6xl text-center" />
        <span className="underline">Volver</span>
      </button>

      {/* Carrusel de imágenes */}
      <div className="overflow-x-auto scrollbar-hide mb-6">
        <div className="flex space-x-4">
          {imagesToShow.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${product.name} vista ${idx + 1}`}
              className="flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[400px] h-auto rounded-lg object-contain"
            />
          ))}
        </div>
      </div>

      {/* Detalles del producto */}
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <div className="text-xl mt-1 mb-4">
        <span className="font-semibold">${product.price}</span>
        {product.discount && (
          <span className="line-through text-red-400 ml-2">
            ${product.discount}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-300 mb-2">⭐ {product.rating} / 5</p>
      <p className="mt-4 text-sm text-gray-300">{product.description}</p>
      <p className="mt-2 text-sm text-gray-300">{product.size}</p>

      {/* Botón agregar al carrito */}
      <button className="mt-6 w-full bg-white text-black py-2 rounded-lg font-bold hover:bg-gray-200 transition">
        Agregar al carrito
      </button>
    </section>
  );
}
