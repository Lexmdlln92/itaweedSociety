// src/pages/customize/Short1Silhouettes.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import short1 from "../../assets/customization/short1custom.png";
import short2 from "../../assets/customization/short2custom.png";
import short3 from "../../assets/customization/short3custom.png";
import short1modal from "../../assets/customization/short1modal.png";
import short2modal from "../../assets/customization/short2modal.png";
import short3modal from "../../assets/customization/short3modal.png";

// CAMBIO IMPORTANTE: Cambié los IDs para que coincidan con el mapeo del paso 2
const silhouettes = [
  { id: "short1", label: "pantaloneta 4 tapes", image: short1, modalImage: short1modal },
  { id: "short2", label: "pantaloneta franjas", image: short2, modalImage: short2modal },
  { id: "short3", label: "pantaloneta deportiva poliester", image: short3, modalImage: short3modal },
  // Puedes agregar más siluetas aquí si es necesario
];

export default function Short1Silhouettes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(null);

  // Estados para validación y animación de shake
  const [shakeButton, setShakeButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isFullScreen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 100; // offset inicial para scroll horizontal
    }
  }, [isFullScreen]);

  // CAMBIO IMPORTANTE: Cambié selectedCamiseta por selectedTshirt para consistencia
  const handleNext = () => {
    if (!selected) {
      setErrorMessage("Por favor selecciona una silueta antes de continuar.");
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 400);
      return;
    }
    setErrorMessage("");
    // Navegar al paso 2 enviando selectedTshirt (consistente con lo que espera el paso 2)
    navigate("/customize/pantalonetas/step2", { 
      state: { selectedTshirt: selected } 
    });
  };

  return (
    <div className="px-4 pt-6 pb-20 min-h-screen flex flex-col bg-[#2a004f]">
      <h2 className="text-center text-2xl font-bold text-white mb-2">Elige una silueta</h2>
      <p className="text-center text-white mb-6">
        Elige una de las tres siluetas de la más alta costura
      </p>

      {/* Grid de tarjetas de siluetas */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-6">
        {silhouettes.map(({ id, label, image, modalImage }) => (
          <button
            key={id}
            onClick={() => {
              if (selected === id) {
                // Si ya está seleccionada, abrir modal de detalle
                setSelectedModalImage(modalImage);
                setIsModalOpen(true);
              } else {
                // Si no está seleccionada, seleccionarla y limpiar error
                setSelected(id);
                setErrorMessage("");
              }
            }}
            className={`relative flex flex-col items-center bg-black rounded-xl shadow-lg overflow-hidden transition-transform pt-3 ${
              selected === id ? "scale-105 ring-4 ring-blue-500" : ""
            }`}
          >
            <img
              src={image}
              alt={label}
              className="max-w-[150px] sm:max-w-[320px] md:max-w-[400px] h-auto object-contain"
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

      {/* Mensaje de error de validación */}
      {errorMessage && (
        <p className="text-red-400 mt-2 text-center">{errorMessage}</p>
      )}

      {/* Botones de navegación */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg w-1/2 mr-2"
        >
          Volver
        </button>
        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded-lg text-white w-1/2 ml-2 transition-colors ${
            selected
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } ${shakeButton ? "shake" : ""}`}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de vista previa */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white p-4 rounded-md max-w-xl w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>
            <img
              src={selectedModalImage}
              alt="Vista ampliada"
              className="w-full h-auto rounded-md mb-4"
            />
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsFullScreen(true);
              }}
              className="px-4 py-2 bg-violet-800 text-white rounded-md flex items-center justify-center mx-auto"
            >
              🔍<span className="ml-2">Zoom</span>
            </button>
          </div>
        </div>
      )}

      {/* Vista de zoom completo */}
      {isFullScreen && (
        <div
          ref={scrollContainerRef}
          className="fixed inset-0 bg-black z-50 overflow-x-auto overflow-y-hidden"
          onClick={() => setIsFullScreen(false)}
          style={{ cursor: "grab" }}
        >
          <div
            className="relative h-full flex items-start"
            style={{ width: "max-content" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedModalImage}
              alt="Zoom completo"
              className="h-full object-contain"
              draggable={false}
            />
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-8 text-black text-5xl z-50"
            >
              ✕
            </button>
          </div>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-xl animate-pulse z-50">
            Desliza →
          </div>
        </div>
      )}
    </div>
  );
}