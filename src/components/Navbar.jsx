// src/components/Navbar.jsx
import { useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiSearch, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import logo from "../assets/logo itaweed society.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Estado para controlar si el sidebar está abierto o cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Estado para controlar si el acordeón de SALE está expandido
  const [isSaleExpanded, setIsSaleExpanded] = useState(false);

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para alternar el acordeón de SALE
  const toggleSaleAccordion = () => {
    setIsSaleExpanded(!isSaleExpanded);
  };

  // Función para cerrar el sidebar cuando se hace clic en un enlace
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsSaleExpanded(false); // También cerramos el acordeón cuando se cierra el sidebar
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-fuchsia-950/80 backdrop-blur-md shadow-md px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Izquierda: menú + perfil */}
          <div className="flex items-center gap-3 text-2xl text-white">
            <button onClick={toggleSidebar}>
              <FiMenu />
            </button>
            <Link to="/profile">
              <FiUser />
            </Link>
          </div>

          {/* Centro: Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="itaweed society" className="h-8 object-contain" />
          </Link>

          {/* Derecha: búsqueda + carrito */}
          <div className="flex items-center gap-4 text-2xl text-white">
            <Link to="/search">
              <FiSearch />
            </Link>
            <Link to="/cart">
              <FiShoppingCart />
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay oscuro que aparece cuando el sidebar está abierto */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - ahora cubre toda la pantalla */}
      <div className={`
        fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header del sidebar con logo centrado y botón de cerrar a la derecha */}
        <div className="bg-fuchsia-950 px-4 py-4 flex items-center justify-center relative">
          <img src={logo} alt="itaweed society" className="h-8 object-contain" />
          <button 
            onClick={closeSidebar} 
            className="absolute right-4 text-white text-2xl hover:text-gray-200 transition-colors"
          >
            <FiX />
          </button>
        </div>

        {/* Contenido del sidebar */}
        <div className="flex flex-col">
          {/* Secciones principales de productos */}
          <div className="border-gray-200">
            <Link 
              to="/products/hombre" 
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              HOMBRE
            </Link>
            <Link 
              to="/products/mujer" 
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              MUJER
            </Link>
            <Link 
              to="/products/cosas" 
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              COSAS
            </Link>
            
            {/* Sección SALE con acordeón */}
            <div className=" border-gray-200">
              <button 
                onClick={toggleSaleAccordion}
                className="w-full flex items-center justify-between px-6 py-4 text-green-600 font-bold hover:bg-green-50 transition-colors"
              >
                <span>SALE</span>
                <div className={`text-green-600 transition-transform duration-200 ${isSaleExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  <FiChevronDown />
                </div>
              </button>
              
              {/* Contenido expandible del acordeón */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSaleExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
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
          </div>

          {/* Información de tiendas */}
          <div className=" border-gray-200">
            <Link 
              to="/tiendas" 
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              TIENDAS
            </Link>
          </div>

          {/* Información sobre la marca */}
          <div className="border-b border-gray-200">
            <Link 
              to="/about" 
              onClick={closeSidebar}
              className="block px-6 py-4 text-gray-800 font-bold hover:bg-gray-50 transition-colors"
            >
              LA MAGIA DETRÁS DE CADA PRENDA
            </Link>
          </div>

          {/* Enlaces de información corporativa */}
          <div className=" border-gray-200">
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

          {/* Enlaces de soporte */}
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