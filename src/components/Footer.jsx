// src/components/Footer.jsx
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaSpotify } from "react-icons/fa";
import logo from "../assets/d2d-universo-logo.png"; // Asegúrate que este sea el logo correcto

const menus = [
  {
    title: "Sobre la marca",
    items: ["Sobre nosotros", "Cómo se hace la magia", "Cultura", "Trabaja en Itaweed Society"],
  },
  {
    title: "Contacto",
    items: ["+57 311 222 3344", "+57 320 444 5566", "+57 302 123 4567"],
  },
  {
    title: "Ayuda",
    items: ["Envíos", "Seguimiento de pedidos", "Preguntas frecuentes"],
  },
];

export default function Footer() {
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (index) => {
    setOpenMenus((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <footer className="bg-black text-white px-6 py-8 text-center">
      {/* Logo centrado */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Itaweed Society" className="w-40 md:w-44" />
      </div>

      {/* Redes sociales */}
      <div className="flex justify-center space-x-4 mb-8 text-xl">
        <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" aria-label="TikTok"><FaTiktok /></a>
        <a href="#" aria-label="Spotify"><FaSpotify /></a>
      </div>

      {/* Menús desplegables */}
      <div className="flex flex-col items-start space-y-4 max-w-md mx-auto text-left">
        {menus.map((menu, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => toggleMenu(index)}
              className="w-full flex justify-between items-center font-semibold text-lg"
            >
              {menu.title}
              <span className="text-2xl font-bold">{openMenus.includes(index) ? "-" : "+"}</span>
            </button>
            {openMenus.includes(index) && (
              <ul className="pl-4 mt-2 space-y-1 text-sm">
                {menu.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
