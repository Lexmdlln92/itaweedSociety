// src/components/Navbar.jsx
import { FiMenu, FiShoppingCart, FiUser,FiSearch } from "react-icons/fi";
import logo from "../assets/logo itaweed society.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-fuchsia-950/80 backdrop-blur-md shadow-md px-4 py-4">
        <div className="flex items-center justify-between">
            {/* Izquierda: menú + perfil */}
        <div className="flex items-center gap-3 text-2xl text-white">
          <button>
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
  );
}
