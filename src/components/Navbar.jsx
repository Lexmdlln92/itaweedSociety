// src/components/Navbar.jsx
import { useState } from "react";
import {
  FiMenu,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import logo from "../assets/footer/d2d-universo-logo.webp";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  // Sidebar + acordeón
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaleExpanded, setIsSaleExpanded] = useState(false);

  // Carrito desde contexto
  const { state } = useCart();
  const totalItemsCount = state.items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsSaleExpanded(false);
  };
  const toggleSaleAccordion = () => setIsSaleExpanded((s) => !s);

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-fuchsia-950/80 backdrop-blur-md shadow-md px-4 py-4">
        <div className="flex items-center justify-between">
          {/* left: menu + profile */}
          <div className="flex items-center gap-3 text-2xl text-white">
            <button onClick={toggleSidebar} aria-label="Abrir menú">
              <FiMenu />
            </button>

            <Link to="/profile" aria-label="Mi perfil">
              <FiUser />
            </Link>
          </div>

          {/* center: logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2" aria-label="Inicio">
            <img src={logo} alt="itaweed society" className="h-8 object-contain" />
          </Link>

          {/* right: search + cart */}
          <div className="flex items-center gap-4 text-2xl text-white relative">
            <Link to="/search" aria-label="Buscar">
              <FiSearch />
            </Link>

            <Link to="/cart" className="relative" aria-label="Ir al carrito">
              <FiShoppingCart />

              {/* Indicador del carrito:
                  - si 0: nada
                  - si 1: punto verde (sin número)
                  - si >=2: badge con número
              */}
              {totalItemsCount === 1 && (
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 shadow-lg ring-2 ring-white animate-ping-slow"
                  title="1 producto en el carrito"
                  aria-hidden="true"
                  style={{ animationDuration: '1.2s' }}
                />
              )}

              {totalItemsCount > 1 && (
                <span
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg"
                  aria-label={`${totalItemsCount} artículos en el carrito`}
                >
                  {totalItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay (cuando sidebar abierto) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR (pantalla completa) */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header del sidebar */}
        <div className="bg-fuchsia-950 px-4 py-4 flex items-center justify-center relative">
          <img src={logo} alt="itaweed society" className="h-8 object-contain" />
          <button
            onClick={closeSidebar}
            className="absolute right-4 text-white text-2xl hover:text-gray-200 transition-colors"
            aria-label="Cerrar menú"
          >
            <FiX />
          </button>
        </div>

        {/* Contenido del sidebar */}
        <div className="flex flex-col">
          <div className="border-b border-gray-200">
            <Link
              to="/sidebar/menPage"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              HOMBRE
            </Link>

            <Link
              to="/sidebar/womanPage"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              MUJER
            </Link>

            <Link
              to="/sidebar/thingsPage"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              COSAS
            </Link>
          </div>

          {/* Acordeón SALE */}
          <div className="border-b border-gray-200">
            <button
              onClick={toggleSaleAccordion}
              className="w-full flex items-center justify-between px-6 py-4 text-green-600 font-bold hover:bg-green-50 transition-colors"
              aria-expanded={isSaleExpanded}
              aria-controls="sale-accordion"
            >
              <span>SALE</span>
              <div className={`text-green-600 transition-transform duration-200 ${isSaleExpanded ? "rotate-180" : "rotate-0"}`}>
                <FiChevronDown />
              </div>
            </button>

            <div
              id="sale-accordion"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSaleExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-green-50/50">
                <Link
                  to="/products/sale/hombre"
                  onClick={closeSidebar}
                  className="block px-8 py-3 text-green-700 hover:bg-green-100 transition-colors"
                >
                  Ofertas Hombre
                </Link>
                <Link
                  to="/products/sale/mujer"
                  onClick={closeSidebar}
                  className="block px-8 py-3 text-green-700 hover:bg-green-100 transition-colors"
                >
                  Ofertas Mujer
                </Link>
                <Link
                  to="/products/sale/cosas"
                  onClick={closeSidebar}
                  className="block px-8 py-3 text-green-700 hover:bg-green-100 transition-colors"
                >
                  Ofertas Cosas
                </Link>
                <Link
                  to="/products/sale/clearance"
                  onClick={closeSidebar}
                  className="block px-8 py-3 text-green-700 hover:bg-green-100 transition-colors border-t border-green-200"
                >
                  Liquidación Final
                </Link>
              </div>
            </div>
          </div>

          {/* Tiendas */}
          <div className="border-b border-gray-200">
            <Link
              to="/tiendas"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              TIENDAS
            </Link>
          </div>

          {/* La magia detrás */}
          <div className="border-b border-gray-200">
            <Link
              to="/about"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              LA MAGIA DETRÁS DE CADA PRENDA
            </Link>
          </div>

          {/* Información corporativa */}
          <div className="border-b border-gray-200">
            <Link
              to="/careers"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Trabaja Aquí
            </Link>
            <Link
              to="/about-us"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sobre Nosotros
            </Link>
          </div>

          {/* Soporte */}
          <div>
            <Link
              to="/help"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Ayuda
            </Link>
            <Link
              to="/orders"
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Seguimiento de Pedidos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
