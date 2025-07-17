// src/pages/customize/HoodieStep3Color.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mangasDerecha from "/src/assets/hoodieParts/mangas-derecha.png";
import mangasIzquierda from "/src/assets/hoodieParts/mangas-izquierda.png";
import frente from "/src/assets/hoodieParts/frente.png";
//import espalda from "/src/assets/hoodieParts/espalda.png";
import ribsDerecho from "/src/assets/hoodieParts/rib-derecho.png";
import ribsIzquierdo from "/src/assets/hoodieParts/rib-izquierdo.png";
import fajon from "/src/assets/hoodieParts/fajon.png";
import capuchaExterna from "/src/assets/hoodieParts/capucha-externa.png";
import capuchaInterna from "/src/assets/hoodieParts/capucha-interna.png";
import cordon from "/src/assets/hoodieParts/cordon.png";

const hoodieParts = [
  { name: "mangas derecha", image: mangasDerecha },
  { name: "mangas izquierda", image: mangasIzquierda },
  { name: "frente", image: frente },
 // { name: "espalda", image: espalda },
  { name: "ribs derecho", image: ribsDerecho },
  { name: "ribs izquierda", image: ribsIzquierdo },
  { name: "fajon (cintura)", image: fajon },
  { name: "capucha externa", image: capuchaExterna },
  { name: "capucha interna", image: capuchaInterna },
  { name: "cordon", image: cordon },
];

const colorOptions = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "blue", hex: "#0000ff" },
  { name: "red", hex: "#ff0000" },
  { name: "green", hex: "#00ff00" },
];

export default function HoodieStep3Color({ onNext }) {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState(null);
  const [colors, setColors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleColorSelect = (hex) => {
    if (!selectedPart) return;
    setColors((prev) => ({ ...prev, [selectedPart]: hex }));
  };

  const getHex = (name) => colors[name] || "transparent";

  return (
    <div className="min-h-screen bg-[#3b0057] p-4 text-white space-y-2">
      <h2 className="text-center text-2xl font-bold">Seleccionar Colores</h2>
      <p className="text-center">Elige una pieza y selecciona un color</p>

      {/* Vista del hoodie */}
      <div className="relative w-[440px] h-[380px] sm:h-[500px] mb-2 mr-20">
        {hoodieParts.map(({ name, image }) => (
          <div key={name} className="absolute inset-0">
            {/* Base de la silueta */}
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
            {/* Capa coloreada usando mask */}
            {colors[name] && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: getHex(name),
                  WebkitMask: `url(${image}) center / contain no-repeat`,
                  mask: `url(${image}) center / contain no-repeat`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Selección de color */}
      <div className="flex justify-center gap-4 mb-8">
        {colorOptions.map(({ hex }) => (
          <button
            key={hex}
            className={`w-10 h-10 rounded-full border-2 transition-transform ${
              Object.values(colors).includes(hex)
                ? "scale-110 border-white"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: hex }}
            onClick={() => handleColorSelect(hex)}
          />
        ))}
      </div>

      {/* Acordeones */}
      <div className="space-y-2">
        {[
          { title: "MANGAS", filters: ["mangas"] },
          { title: "RIBS", filters: ["ribs", "fajon"] },
          { title: "CAPUCHA", filters: ["capucha"] },
          { title: "FRENTE Y ESPALDA", filters: ["frente", "espalda"] },
        ].map(({ title, filters }, i) => (
          <div key={i} className="bg-white/10 rounded-xl">
            <button
              className="w-full text-center px-4 py-2 uppercase font-semibold"
              onClick={() => setOpenSection(openSection === i ? null : i)}
            >
              {title}
            </button>
            {openSection === i && (
              <div className="p-2 grid grid-cols-2 gap-2 text-sm">
                {hoodieParts
                  .filter(({ name }) =>
                    filters.some((f) => name.includes(f))
                  )
                  .map(({ name }) => (
                    <button
                      key={name}
                      onClick={() => setSelectedPart(name)}
                      className={`border-2 p-2 rounded-xl transition-colors ${
                        selectedPart === name
                          ? "bg-white text-black border-white"
                          : "bg-purple-800 text-white border-white/30"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cordon fuera del acordeón */}
      <button
        onClick={() => setSelectedPart("cordon")}
        className={`w-full text-center border-2 p-2 rounded-xl transition-colors mb-5 ${
          selectedPart === "cordon"
            ? "bg-white text-black border-white"
            : "bg-purple-800 text-white border-white/30"
        }`}
      >
        Cordon
      </button>

      {/* Vista previa */}
      {showPreview && (
        <p className="text-center text-green-300">Vista previa activada</p>
      )}

      {/* Navegación */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-purple-900 px-4 py-2 rounded-lg"
        >
          Regresar
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="bg-yellow-300 text-purple-900 px-4 py-2 rounded-lg"
        >
          Preview
        </button>
        <button
          onClick={onNext}
          className="bg-green-400 text-purple-900 px-4 py-2 rounded-lg"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
