// src/config/routes.js
import { lazy } from "react";

// LAZY LOADING - Carga bajo demanda de componentes
// Páginas principales
const Home = lazy(() => import("../pages/Home"));
const CustomizePage = lazy(() => import("../pages/CustomizePage"));
const NewArrivalsPage = lazy(() => import("../pages/NewArrivalsPage"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// Páginas especiales
const UniversoD2DPage = lazy(() => import("../pages/UniversoD2DPage"));
const VisionLEXPage = lazy(() => import("../pages/VisionLEXPage"));
const UndertakeInfo = lazy(() => import("../pages/UndertakeInfo"));
const CollaborationPage = lazy(() => import("../pages/CollaborationPage"));
const StatesPage = lazy(() => import("../pages/StatesPage"));

// Páginas de customización
const Hoodie1Silhouettes = lazy(() => import("../pages/customize/Hoodie1Silhouettes"));
const HoodieStep2Size = lazy(() => import("../pages/customize/HoodieStep2Size"));
const HoodieStep3Color = lazy(() => import("../pages/customize/HoodieStep3Color"));
const TshirtStep1Silhouettes = lazy(() => import("../pages/customize/TshirtStep1Silhouettes"));
const TshirtStep2Size = lazy(() => import("../pages/customize/TshirtStep2Size"));
const TshirtStep3Color = lazy(() => import("../pages/customize/TshirtStep3Color"));
const Sweatpants1Silhouettes = lazy(() => import("../pages/customize/Sweatpants1Silhouettes"));

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
  {
    path: "/customize/:category",
    component: CustomizePage,
    name: "customize-main",
    category: "customize"
  },
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

  // 👤 PÁGINAS DE USUARIO
  {
    path: "/cart",
    component: CartPage,
    name: "cart",
    category: "user"
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    name: "checkout",
    category: "user"
  },
  {
    path: "/profile",
    component: ProfilePage,
    name: "profile",
    category: "user"
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

  // 🔧 PÁGINAS ADMINISTRATIVAS E INSTITUCIONALES
  {
    path: "/admin",
    component: AdminDashboard,
    name: "admin",
    category: "admin"
  },
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