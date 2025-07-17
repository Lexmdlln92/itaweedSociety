import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import hoodie1 from "../../assets/hoodie1.webp";
import hoodie2 from "../../assets/hoodie2.webp";
import hoodie3 from "../../assets/hoodie3.webp";
import hoodie4 from "../../assets/hoodie4.webp";
import siluetaModalImage from "../../assets/silueta1Modal.png";

const silhouettes = [
  { id: "buzo1", label: "Manga Ranglan, Corte en manga", image: hoodie1 },
  { id: "buzo2", label: "Manga Ranglan con Capucha", image: hoodie2 },
  { id: "buzo3", label: "Manga Ranglan clásico", image: hoodie3 },
  { id: "buzo4", label: "Hoodie clásico, corte en pecho", image: hoodie4 },
];

export default function HoodieSilhouettes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleNext = () => {
    if (selected) {
      navigate("/customize/buzos/step2", { state: { selectedBuzo: selected } });
    }
  };

  // Desplazar el scroll horizontal al abrir el fullscreen
  useEffect(() => {
    if (isFullScreen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 100; // puedes ajustar el valor
    }
  }, [isFullScreen]);

  return (
    <div className="px-4 pt-6 pb-20 min-h-screen flex flex-col bg-[#2a004f]">
      <h2 className="text-center text-2xl font-bold text-white mb-2">Elige una silueta</h2>
      <p className="text-center text-white mb-6">
        Elige una de las cuatro siluetas únicas y de la más alta costura
      </p>

      {/* Silueta cards */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {silhouettes.map(({ id, label, image }) => (
          <button
            key={id}
            onClick={() => {
              if (selected === id) {
                setIsModalOpen(true);
              } else {
                setSelected(id);
              }
            }}
            className={`relative flex flex-col items-center bg-black rounded-xl shadow-lg overflow-hidden transition-transform pt-3 ${
              selected === id ? "scale-105 ring-4 ring-blue-500" : ""
            }`}
          >
            <img
              src={image}
              alt={label}
              className="max-w-[350px] sm:max-w-[320px] md:max-w-[400px] h-auto object-contain"
            />
            <span className="py-2 text-sm font-medium text-white text-center">{label}</span>
            {selected === id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <span className="text-white font-bold text-lg">VER DETALLE</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Botones inferiores */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg w-1/2 mr-2"
        >
          Volver
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`px-4 py-2 rounded-lg text-white w-1/2 ml-2 ${
            selected
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white p-4 rounded-md max-w-xl w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <img src={siluetaModalImage} alt="Vista ampliada" className="w-full h-auto rounded-md" />

            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsFullScreen(true);
              }}
              className="mt-3 px-4 py-2 bg-violet-800 text-white rounded-md flex items-center justify-center mx-auto"
            >
              🔍 <span className="ml-2">Zoom</span>
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom View */}
      {isFullScreen && (
        <div
          ref={scrollContainerRef}
          className="fixed inset-0 bg-black z-50 overflow-x-auto overflow-y-hidden"
          onClick={() => setIsFullScreen(false)}
          style={{ cursor: "grab" }}
        >
          {/* Contenedor de imagen y botón cerrar */}
          <div
            className="relative h-full flex items-start"
            style={{ width: "max-content" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen grande alineada a la izquierda */}
            <img
              src={siluetaModalImage}
              alt="Zoom completo"
              className="h-full object-contain"
              draggable={false}
            />

            {/* Botón cerrar al final del scroll */}
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-8 text-white text-4xl z-50"
            >
              ✕
            </button>
          </div>

          {/* Texto centrado en la primera vista */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-xl animate-pulse z-50">
            Desliza →
          </div>
        </div>
      )}
    </div>
  );
}
