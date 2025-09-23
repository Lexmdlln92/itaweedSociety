// src/data/productData.js
// ARCHIVO CENTRAL DE DATOS DE PRODUCTOS
// Este archivo contiene toda la información de productos organizada por categorías
// y es la única fuente de verdad para toda la aplicación

// Importar todas las imágenes necesarias
import t1 from "../assets/productDetails/tshirt1.webp";
import t1_1 from "../assets/productDetails/tshirt1-1.webp";
import t1_2 from "../assets/productDetails/tshirt1-2.webp";
import t1_3 from "../assets/productDetails/tshirt1-3.webp";
import t2 from "../assets/D2D/tshirt2.webp";
import t3 from "../assets/D2D/tshirt3.webp";
import t4 from "../assets/lex/tshirt4.webp";
import t5 from "../assets/lex/tshirt5.webp";
import t6 from "../assets/lex/tshirt6.jpg";
import t8 from "../assets/lex/tshirt8.webp";
import t9 from "../assets/lex/tshirt9.webp";
import t10 from "../assets/lex/tshirt10.webp";
import t11 from "../assets/lex/tshirt11.webp";
import t12 from "../assets/lex/tshirt13.webp";
import buzo5 from "../assets/lex/buzo5.webp";
import buzo from "../assets/lex/buzo.webp";
import cap from "../assets/lex/cap.webp";
import cap1 from "../assets/lex/cap1.webp";
import sweatpants1 from "../assets/lex/sweatpants1.webp";
import sweatpants2 from "../assets/lex/sweatpants2.webp";
import sweatpantsD2D from "../assets/D2D/sweatpants1D2D.webp";
import sweatpants1D2D from "../assets/D2D/sweatpants2D2D.webp";
import tshirt1D2D from "../assets/D2D/tshirt1D2D.webp";
import tshirt2D2D from "../assets/D2D/tshirt2D2D.webp";
import tshirt3D2D from "../assets/D2D/tshirt3D2D.webp";
import tshirt4D2D from "../assets/D2D/tshirt4D2D.webp";
import tshirt5D2D from "../assets/D2D/tshirt5D2D.webp";
import hoodie1D2D from "../assets/D2D/hoodie1D2D.webp";
import hoodie2D2D from "../assets/D2D/hoodie2D2D.webp";
import cap1D2D from "../assets/D2D/cap1D2D.webp";
import cap2D2D from "../assets/D2D/cap2D2D.webp";

// ESTRUCTURA ORGANIZADA POR CATEGORÍAS
// Cada categoría tiene sus productos con IDs únicos y consistentes

export const productCategories = {
  // PRODUCTOS RECIÉN LLEGADOS
  // Estos son los productos más nuevos que aparecen en la página principal
  newArrivals: [
    {
      id: "1",
      name: "Monkey fly",
      category: "camisetas",
      price: "80.000 cop",
      image: t1,
      rating: 4.5,
      description: "Camiseta urbana con silueta oversize, estampado original estilo manga street.",
      size: "Disponible en tallas de la S a la XXL",
      // Imágenes adicionales para el carrusel (solo este producto tiene múltiples vistas)
      gallery: [t1, t1_1, t1_3, t1_2],
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    },
    {
      id: "3",
      name: "D2D japanese",
      category: "camisetas",
      price: "80.000 cop",
      discount: "95.000 cop",
      image: t3,
      rating: 4.3,
      description: "Tipografía japonesa con diseño contemporáneo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    },
    {
      id: "5",
      name: "Dirty Bart black",
      category: "camisetas",
      price: "80.000 cop",
      discount: "90.000 cop",
      image: t5,
      rating: 4.3,
      description: "Versión dark del clásico Dirty Bart.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    },
    
    {
      id: "16",
      name: "Drugsrats white",
      category: "buzos",
      price: "150.000 cop",
      image: buzo5,
      rating: 4.4,
      description: "Buzo cómodo con diseño urbano exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    },
    {
      id: "13",
      name: "Lex Esmeralda",
      category: "gorras",
      price: "150.000 cop",
      image: cap1,
      rating: 4.4,
      description: "Gorra premium con diseño esmeralda exclusivo.",
      size: "Talla única ajustable",
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    },
    {
      id: "14",
      name: "Sudadera Artico",
      category: "sudaderas",
      price: "80.000 cop",
      image: sweatpants1,
      rating: 4.5,
      description: "Sudadera cómoda con diseño ártico.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Recién llegados",
      breadcrumbRoute: "/products/new"
    }
  ],

  // CAMISETAS
  // Todas las camisetas disponibles incluyendo las de recién llegados
  camisetas: [
    // Reutilizamos los productos de recién llegados que son camisetas
    {
      id: "1",
      name: "Monkey fly",
      category: "camisetas",
      price: "80.000 cop",
      image: t1,
      rating: 4.5,
      description: "Camiseta urbana con silueta oversize, estampado original estilo manga street.",
      size: "Disponible en tallas de la S a la XXL",
      gallery: [t1, t1_1, t1_3, t1_2],
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "2",
      name: "Psico beach",
      category: "camisetas",
      price: "80.000 cop",
      discount: "95.000 cop",
      image: t2,
      rating: 4.3,
      description: "Edición limitada con gráfico psicodélico playero.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "3",
      name: "D2D japanese",
      category: "camisetas",
      price: "80.000 cop",
      discount: "95.000 cop",
      image: t3,
      rating: 4.3,
      description: "Tipografía japonesa con diseño contemporáneo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
        {
      id: "4",
      name: "Dirty Bart",
      category: "camisetas",
      price: "80.000 cop",
      image: t4,
      rating: 4.5,
      description: "Bart Simpson con actitud grunge.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "5",
      name: "Dirty Bart black",
      category: "camisetas",
      price: "80.000 cop",
      discount: "90.000 cop",
      image: t5,
      rating: 4.3,
      description: "Versión dark del clásico Dirty Bart.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "8",
      name: "LEX homero",
      category: "camisetas",
      price: "80.000 cop",
      image: t8,
      rating: 4.7,
      description: "Edición especial LEX con Homero Simpson.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "9",
      name: "Niño Rata",
      category: "camisetas",
      price: "240.000 cop",
      image: t9,
      rating: 4.2,
      description: "Diseño irreverente y urbano.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "10",
      name: "Krusty skull",
      category: "camisetas",
      price: "75.000 cop",
      image: t10,
      rating: 4.4,
      description: "Krusty con diseño de calavera.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "11",
      name: "Good luck black",
      category: "camisetas",
      price: "80.000 cop",
      image: t11,
      rating: 4.6,
      description: "Diseño minimalista de buena suerte.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    },
    {
      id: "18",
      name: "Drugrats t-shirt",
      category: "camisetas",
      price: "80.000 cop",
      image: t6,
      rating: 4.0,
      description: "Camiseta con diseño retro de los Rugrats.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Camisetas",
      breadcrumbRoute: "/products/camisetas"
    }
  ],

  // BUZOS
  buzos: [

    {
      id: "16",
      name: "Drugsrats white",
      category: "buzos",
      price: "150.000 cop",
      image: buzo5,
      rating: 4.4,
      description: "Buzo cómodo con diseño urbano exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Buzos",
      breadcrumbRoute: "/products/buzos"
    },
    {
      id: "19",
      name: "Siempre Alegre black",
      category: "buzos",
      price: "150.000 cop",
      image: buzo,
      rating: 4.4,
      description: "Buzo con mensaje positivo en diseño oscuro.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Buzos",
      breadcrumbRoute: "/products/buzos"
    }
  ],

  // GORRAS
  gorras: [
    {
      id: "6",
      name: "Gorra Black Lex",
      category: "gorras",
      price: "60.000 cop",
      discount: "260.000 cop",
      image: cap,
      rating: 4.3,
      description: "Gorra premium con diseño clásico negro.",
      size: "Talla única ajustable",
      breadcrumbCategory: "Gorras",
      breadcrumbRoute: "/products/gorras"
    },
    {
      id: "17",
      name: "Lex Esmeralda",
      category: "gorras",
      price: "150.000 cop",
      image: cap1,
      rating: 4.4,
      description: "Gorra premium con diseño esmeralda exclusivo.",
      size: "Talla única ajustable",
      breadcrumbCategory: "Gorras",
      breadcrumbRoute: "/products/gorras"
    }
  ],

  // SUDADERAS
  sudaderas: [
    {
      id: "14",
      name: "Sudadera Artico",
      category: "sudaderas",
      price: "80.000 cop",
      image: sweatpants1,
      rating: 4.0,
      description: "Sudadera cómoda con diseño ártico.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Sudaderas",
      breadcrumbRoute: "/products/sudaderas"
    },
    {
      id: "15",
      name: "Sudadera raton",
      category: "sudaderas",
      price: "100.000 cop",
      image: sweatpants2,
      rating: 4.4,
      description: "Sudadera con diseño de ratón vintage.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Sudaderas",
      breadcrumbRoute: "/products/sudaderas"
    }
  ],

  // VISION LEX - Colección especial con tecnología y estilo vanguardista
  visionLex: [
    {
      id: "21",
      name: "LEX Homero",
      category: "camisetas",
      price: "80.000 cop",
      image: t8,
      rating: 4.7,
      description: "Edición premium LEX con Homero Simpson - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
        {
      id: "27",
      name: "LEX Esmeralda",
      category: "gorras",
      price: "60.000 cop",
      image: cap1,
      rating: 4.3,
      description: "Gorra premium esmeralda con tecnología de materiales avanzados.",
      size: "Talla única ajustable",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
        {
      id: "28",
      name: "Sudadera Artico",
      category: "sudaderas",
      price: "80.000 cop",
      image: sweatpants1,
      rating: 4.5,
      description: "Sudadera premium con diseño ártico y tecnología térmica.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "22",
      name: "Niño Rata",
      category: "camisetas",
      price: "240.000 cop",
      image: t9,
      gallery: [t9, t1_1, t1_3, t1_2],//este galeri asi de facil agrega las 4 vistas miniatura del producto
      rating: 4.2,
      description: "Diseño irreverente premium con acabados de alta calidad.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "23",
      name: "Krusty Skull",
      category: "camisetas",
      price: "75.000 cop",
      image: t10,
      rating: 4.4,
      description: "Krusty con diseño de calavera - edición Vision LEX.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "24",
      name: "Good Luck Black",
      category: "camisetas",
      price: "80.000 cop",
      image: t11,
      rating: 4.6,
      description: "Diseño minimalista de buena suerte con tecnología textil avanzada.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "26",
      name: "Gorra Black Lex",
      category: "gorras",
      price: "60.000 cop",
      image: cap,
      rating: 4.3,
      description: "Gorra premium con diseño clásico negro - colección Vision LEX.",
      size: "Talla única ajustable",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },

    {
      id: "29",
      name: "Sudadera raton",
      category: "sudaderas",
      price: "90.000 cop",
      image: sweatpants2,
      rating: 4.4,
      description: "Sudadera premium con diseño de ratón vintage y materiales de alta gama.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "30",
      name: "Drugsrats White",
      category: "buzos",
      price: "150.000 cop",
      image: buzo5,
      rating: 4.4,
      description: "Buzo premium con diseño urbano exclusivo y tecnología textil avanzada.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "31",
      name: "Siempre Alegre Black",
      category: "buzos",
      price: "150.000 cop",
      image: buzo,
      rating: 4.4,
      description: "Buzo premium con mensaje positivo y materiales de lujo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    },
    {
      id: "32",
      name: "De Rose Black",
      category: "camisetas",
      price: "80.000 cop",
      image: t12,
      rating: 4.4,
      description: "Camiseta premium con el juego de palabras ROSE dar una vuelta en Colombia y ROSE en inglés rosa, 100% algodón peruano.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Visión LEX",
      breadcrumbRoute: "/products/vision-lex"
    }
  ],
  universoD2D: [
    {
      id: "39",
      name: "phychedelic",
      category: "buzos",
      price: "170.000 cop",
      image: hoodie1D2D,
      rating: 4.7,
      description: "Edición premium Buzo - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
        {
      id: "36",
      name: " Amanecer D2D",
      category: "camisetas",
      price: "80.000 cop",
      image: tshirt3D2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
    {
      id: "37",
      name: "Monkey D2D ",
      category: "camisetas",
      price: "80.000 cop",
      image: tshirt4D2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
        {
      id: "41",
      name: "roja ferrari D2D",
      category: "gorras",
      price: "70.000 cop",
      image: cap1D2D,
      rating: 4.7,
      description: "Edición premium gorra new era - Ajustable",
      size: "Disponible en tallas unica",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },


        
    {
      id: "38",
      name: "Alien D2D",
      category: "camisetas",
      price: "80.000 cop",
      image: tshirt5D2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },

        {
      id: "44",
      name: "nave de Los Grises D2D",
      category: "sudaderas",
      price: "100.000 cop",
      image: sweatpantsD2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
    {
      id: "34",
      name: " Lunastro D2D",
      category: "camisetas",
      price: "80.000 cop",
      image: tshirt1D2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
    {
      id: "40",
      name: "Familia Dog",
      category: "buzos",
      price: "160.000 cop",
      image: hoodie2D2D,
      rating: 4.7,
      description: "Edición premium Buzo - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },


        
    {
      id: "42",
      name: "Cielo D2D",
      category: "gorras",
      price: "80.000 cop",
      image: cap2D2D,
      rating: 4.7,
      description: "Edición premium gorra new era - Ajustable",
      size: "Disponible en tallas unica",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
    {
      id: "35",
      name: "Dragon D2D",
      category: "camisetas",
      price: "80.000 cop",
      image: tshirt2D2D,
      rating: 4.7,
      description: "Edición premium camiseta  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },
    {
      id: "33",
      name: " Naranja D2D",
      category: "sudaderas",
      price: "120.000 cop",
      image: sweatpants1D2D,
      rating: 4.7,
      description: "Edición premium sudadera  - diseño exclusivo.",
      size: "Disponible en tallas de la S a la XXL",
      breadcrumbCategory: "Universo D2D",
      breadcrumbRoute: "/products/universo-d2d"
    },

  ]
};

// FUNCIONES AUXILIARES PARA ACCEDER A LOS DATOS

// Obtener todos los productos en un array plano (útil para búsquedas)
export const getAllProducts = () => {
  const allProducts = [];
  Object.values(productCategories).forEach(categoryProducts => {
    categoryProducts.forEach(product => {
      // Evitar duplicados (productos que aparecen en múltiples categorías)
      if (!allProducts.find(p => p.id === product.id)) {
        allProducts.push(product);
      }
    });
  });
  return allProducts;
};

// Obtener un producto específico por ID
export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
};

// Obtener productos por categoría específica
export const getProductsByCategory = (category) => {
  return productCategories[category] || [];
};

// Obtener las categorías disponibles para filtros
export const getAvailableCategories = () => {
  return Object.keys(productCategories).filter(cat => cat !== 'newArrivals');
};

// Obtener productos de Vision LEX específicamente
export const getVisionLexProducts = () => {
  return productCategories.visionLex || [];
};
// Obtener productos de Universo D2D específicamente
export const getUniversoD2DProducts = () => {
  return productCategories.universoD2D || [];
};

// Función para convertir precio string a número (para ordenamiento)
export const convertPriceToNumber = (priceString) => {
  return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
};

