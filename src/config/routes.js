// src/config/routes.js
import { lazy } from "react";

// LAZY LOADING - Carga bajo demanda de componentes
// Páginas principales
const Home = lazy(() => import("../pages/Home"));
const CustomizePage = lazy(() => import("../pages/shop/CustomizePage")); // reorganización: movido a pages/shop/
const NewArrivalsPage = lazy(() => import("../pages/shop/NewArrivalsPage")); // reorganización: movido a pages/shop/
const ProductDetail = lazy(() => import("../pages/shop/ProductDetail")); // reorganización: movido a pages/shop/
const CartPage = lazy(() => import("../pages/shop/CartPage")); // reorganización: movido a pages/shop/
const CheckoutPage = lazy(() => import("../pages/shop/CheckoutPage")); // reorganización: movido a pages/shop/
const SearchPage = lazy(() => import("../pages/shop/SearchPage")); // reorganización: movido a pages/shop/

// Páginas especiales
const UniversoD2DPage = lazy(() => import("../pages/brands/UniversoD2DPage"));
const VisionLEXPage = lazy(() => import("../pages/brands/VisionLEXPage"));
const UndertakeInfo = lazy(() => import("../pages/institutional/UndertakeInfo")); // reorganización: movido a pages/institutional/
const CollaborationPage = lazy(() => import("../pages/institutional/CollaborationPage")); // reorganización: movido a pages/institutional/
const StatesPage = lazy(() => import("../pages/institutional/StatesPage")); // reorganización: movido a pages/institutional/

// Páginas de customización
const Hoodie1Silhouettes = lazy(() => import("../pages/customize/Hoodie1Silhouettes"));
const HoodieStep2Size = lazy(() => import("../pages/customize/HoodieStep2Size"));
const HoodieStep3Color = lazy(() => import("../pages/customize/HoodieStep3Color"));
const TshirtStep1Silhouettes = lazy(() => import("../pages/customize/TshirtStep1Silhouettes"));
const TshirtStep2Size = lazy(() => import("../pages/customize/TshirtStep2Size"));
const TshirtStep3Color = lazy(() => import("../pages/customize/TshirtStep3Color"));
const Sweatpants1Silhouettes = lazy(() => import("../pages/customize/Sweatpants1Silhouettes"));
const SweatpantsStep2Size = lazy(() => import("../pages/customize/SweatpantsStep2Size"));
const SweatpantsStep3Color = lazy(() => import("../pages/customize/SweatpantsStep3Color"));
const Short1Silhouettes = lazy(() => import("../pages/customize/Short1Silhouettes"));
const ShortStep2Size = lazy(() => import("../pages/customize/ShortStep2Size"));
const ShortStep3Color = lazy(() => import("../pages/customize/ShortStep3Color"));

// 🔐 PÁGINAS DE AUTENTICACIÓN (NUEVAS)
const LoginPage = lazy(() => import("../pages/profile/LoginPage"));

// Páginas de sidebar
const Men = lazy(() => import("../pages/sidebar/MenPage"));
const Woman = lazy(() => import("../pages/sidebar/WomanPage"));
const Things = lazy(() => import("../pages/sidebar/ThingsPage"));

// CONFIGURACIÓN DE RUTAS ORGANIZADAS
export const routes = [
  // 🏠 RUTA PRINCIPAL
  {
    path: "/",
    component: Home,
    name: "home",
    category: "main"
  },

  // 🛍️ PÁGINAS DE PRODUCTOS
  {
    path: "/products/vision-lex",
    component: VisionLEXPage,
    name: "vision-lex",
    category: "products"
  },
  {
    path: "/products/universo-d2d",
    component: UniversoD2DPage,
    name: "universo-d2d",
    category: "products"
  },
  {
    path: "/products/new",
    component: NewArrivalsPage,
    name: "new-arrivals",
    category: "products"
  },
  {
    path: "/products/:category",
    component: NewArrivalsPage,
    name: "products-by-category",
    category: "products"
  },
  {
    path: "/product/:id",
    component: ProductDetail,
    name: "product-detail",
    category: "products"
  },

// ✂️ PÁGINAS DE CUSTOMIZACIÓN
  // 1. Ruta base para el catálogo general (Acción desde "Empezar a diseñar")
  {
    path: "/customize",
    component: CustomizePage,
    name: "customize-catalog",
    category: "customize"
  },
  // 2. Mantienes esta por si necesitas capturar alguna otra categoría dinámica en el futuro
  {
    path: "/customize/info/:category", 
    component: CustomizePage,
    name: "customize-main-info",
    category: "customize"
  },

  // Flujos directos de personalización que ya tienes definidos:
  {
    path: "/customize/buzos",
    component: Hoodie1Silhouettes,
    name: "hoodie-silhouettes",
    category: "customize"
  },
  {
    path: "/customize/buzos/step2",
    component: HoodieStep2Size,
    name: "hoodie-size",
    category: "customize"
  },
  {
    path: "/customize/buzos/step3",
    component: HoodieStep3Color,
    name: "hoodie-color",
    category: "customize"
  },
  {
    path: "/customize/camisetas",
    component: TshirtStep1Silhouettes,
    name: "Tshirt-Silhouettes",
    category: "customize"
  },
  {
    path: "/customize/camisetas/step2",
    component: TshirtStep2Size,
    name: "Tshirt-size",
    category: "customize"
  },
  {
    path: "/customize/camisetas/step3",
    component: TshirtStep3Color,
    name: "Tshirt-color",
    category: "customize"
  },
  {
    path: "/customize/sudaderas",
    component: Sweatpants1Silhouettes,
    name: "Sweatpants-silhouette",
    category: "customize"
  },
  {
    path: "/customize/sudaderas/step2",
    component: SweatpantsStep2Size,
    name: "Sweatpants-size",
    category: "customize"
  },
  {
    path: "/customize/sudaderas/step3",
    component: SweatpantsStep3Color,
    name: "Sweatpants-color",
    category: "customize"
  },
  {
    path: "/customize/pantalonetas",
    component: Short1Silhouettes,
    name: "Short-silhouette",
    category: "customize"
  },
  {
    path: "/customize/pantalonetas/step2",
    component: ShortStep2Size,
    name: "Short-size",
    category: "customize"
  },
  {
    path: "/customize/pantalonetas/step3",
    component: ShortStep3Color,
    name: "Short-color",
    category: "customize"
  },

// 👤 PÁGINAS DE USUARIO
{
  path: "/login",
  component: LoginPage,
  name: "login",
  category: "user"
},
{
  path: "/cart",
  component: CartPage,
  name: "cart",
  category: "user",
  protected: true   // 🔒 Solo usuarios logueados
},
{
  path: "/checkout",
  component: CheckoutPage,
  name: "checkout",
  category: "user",
  protected: true   // 🔒 Solo usuarios logueados
},

  {
    path: "/search",
    component: SearchPage,
    name: "search",
    category: "user"
  },

  // 📂 PÁGINAS DE SIDEBAR/CATEGORÍAS
  {
    path: "/sidebar/menPage",
    component: Men,
    name: "men",
    category: "sidebar"
  },
  {
    path: "/sidebar/womanPage",
    component: Woman,
    name: "woman",
    category: "sidebar"
  },
  {
    path: "/sidebar/thingsPage",
    component: Things,
    name: "things",
    category: "sidebar"
  },
    // 🔐 PÁGINAS DE AUTENTICACIÓN y registro (NUEVAS)



  // 🔧 PÁGINAS ADMINISTRATIVAS E INSTITUCIONALES


  {
    path: "/undertake",
    component: UndertakeInfo,
    name: "undertake",
    category: "institutional"
  },
  {
    path: "/collaborationPage",
    component: CollaborationPage,
    name: "collaboration",
    category: "institutional"
  },
  {
    path: "/states",
    component: StatesPage,
    name: "states",
    category: "institutional"
  }
];

// 🔍 HELPER FUNCTIONS - Funciones de ayuda
export const getRoutesByCategory = (category) => {
  return routes.filter(route => route.category === category);
};

export const getRouteByName = (name) => {
  return routes.find(route => route.name === name);
};

export const getAllCategories = () => {
  return [...new Set(routes.map(route => route.category))];
};
