// src/pages/customize/HoodieStep3Color.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import mangasDerecha from "/src/assets/hoodieParts/mangas-derecha.webp";
import mangasIzquierda from "/src/assets/hoodieParts/mangas-izquierda.webp";
import frente from "/src/assets/hoodieParts/frente.webp";
//import espalda from "/src/assets/hoodieParts/espalda.webp";
import ribsDerecho from "/src/assets/hoodieParts/rib-derecho.webp";
import ribsIzquierdo from "/src/assets/hoodieParts/rib-izquierdo.webp";
import fajon from "/src/assets/hoodieParts/fajon.webp";
import capuchaExterna from "/src/assets/hoodieParts/capucha-externa.webp";
import capuchaInterna from "/src/assets/hoodieParts/capucha-interna.webp";
import cordon from "/src/assets/hoodieParts/cordon.webp";

const hoodieParts = [
  { name: "Manga derecha", image: mangasDerecha },
  { name: "Manga izquierda", image: mangasIzquierda },
  { name: "Frente", image: frente },
  // { name: "Espalda", image: espalda },
  { name: "Rib derecho", image: ribsDerecho },
  { name: "Rib izquierdo", image: ribsIzquierdo },
  { name: "Fajon (cintura)", image: fajon },
  { name: "Capucha externa", image: capuchaExterna },
  { name: "Capucha interna", image: capuchaInterna },
  { name: "Cordon", image: cordon },
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

  // Estilos de vibración y mensaje de error
  const [shakePreview, setShakePreview] = useState(false);
  const [shakeNext, setShakeNext] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleColorSelect = (hex) => {
    if (!selectedPart) return;
    setColors((prev) => ({ ...prev, [selectedPart]: hex }));
  };

  const getHex = (name) => colors[name] || "transparent";

  // Preview: pedir color en todas las piezas
  const handlePreview = () => {
    if (Object.keys(colors).length < hoodieParts.length) {
      setErrorMessage("Debes seleccionar el color de todas las piezas para ver el preview.");
      setShakePreview(true);
      setTimeout(() => setShakePreview(false), 400);
      return;
    }
    setErrorMessage("");
    setShowPreview(true);
  };

  // Next: pedir que al menos una pieza esté coloreada
  const handleNextClick = () => {
    if (Object.keys(colors).length < hoodieParts.length) {
      setErrorMessage("Debes seleccionar el color de cada pieza antes de continuar.");
      setShakeNext(true);
      setTimeout(() => setShakeNext(false), 400);
      return;
    }
    setErrorMessage("");
    onNext();
  };

  return (
    <div className="min-h-screen bg-[#3b0057] p-4 text-white space-y-2">
      <h2 className="text-center text-2xl font-bold">Seleccionar Colores</h2>
      <p className="text-center">Elige una pieza y selecciona un color</p>

      {/* Vista del hoodie */}
      <div className="relative w-[440px] h-[380px] sm:h-[500px] mb-2 mr-20">
        {hoodieParts.map(({ name, image }) => (
          <div key={name} className="absolute inset-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
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
          { title: "MANGAS", filters: ["Manga"] },
          { title: "RIBS", filters: ["Rib", "Fajon"] },
          { title: "CAPUCHA", filters: ["Capucha"] },
          { title: "FRENTE Y ESPALDA", filters: ["Frente", "Espalda"] },
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
        onClick={() => setSelectedPart("Cordon")}
        className={`w-full text-center border-2 p-2 rounded-xl transition-colors mb-5 ${
          selectedPart === "Cordon"
            ? "bg-white text-black border-white"
            : "bg-purple-800 text-white border-white/30"
        }`}
      >
        Cordon
      </button>

      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-red-400 text-center mb-2">{errorMessage}</p>
      )}

      {/* Vista previa activada */}
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
          onClick={handlePreview}
          className={`bg-yellow-300 text-purple-900 px-4 py-2 rounded-lg ${
            shakePreview ? "shake" : ""
          }`}
        >
          Preview
        </button>
        <button
          onClick={handleNextClick}
          className={`bg-green-400 text-purple-900 px-4 py-2 rounded-lg ${
            shakeNext ? "shake" : ""
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
