// ========================
// ARCHIVO 2: TshirtStep2Size.jsx (CORREGIDO)
// ========================

// src/pages/customize/TshirtStep2Size.jsx
import { useLocation, useNavigate } from "react-router-dom";
import tshirt1 from "../../assets/customization/tshirtsize1.webp";
import tshirt2 from "../../assets/customization/tshirtsize2.webp";
import tshirt3 from "../../assets/customization/tshirtsize3.webp";
import tshirt4 from "../../assets/customization/tshirtsize4.webp";
import { useState } from "react";

// Mapeo de IDs de camisetas a sus respectivas imágenes
const tshirtMap = {
  tshirt1: tshirt4,
  tshirt2: tshirt3,
  tshirt3: tshirt1,
  tshirt4: tshirt2,
};

// Tallas disponibles con sus descripciones
const sizes = [
  { id: "S", label: "S", description: '34–36"' },
  { id: "M", label: "M", description: '38–40"' },
  { id: "L", label: "L", description: '42–44"' },
  { id: "XL", label: "XL", description: '46–48"' },
  { id: "XXL", label: "XXL", description: '50–52"' },
];

export default function TshirtStep2Size() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Obtener la silueta seleccionada del estado de navegación
  const selectedTshirt = state?.selectedTshirt;
  const image = tshirtMap[selectedTshirt];

  // Estados para la funcionalidad del componente
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSize, setDetailSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState("fade-in");
  const [shakeButton, setShakeButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // MEJORADO: Validación con mejor mensaje de error y opción de navegación
  if (!selectedTshirt) {
    console.log("Estado recibido:", state);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No se seleccionó ninguna silueta</h2>
          <p className="text-gray-300 mb-6">
            Debes seleccionar una silueta antes de elegir la talla.
          </p>
          <button
            onClick={() => navigate('/customize/camisetas')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ir a Seleccionar Silueta
          </button>
          {/* Información de debug (solo visible en desarrollo) */}
          <details className="mt-4 text-left text-xs text-gray-400">
            <summary className="cursor-pointer">Debug info</summary>
            <pre className="mt-2 bg-gray-800 p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  // Función para cerrar el modal con animación
  const closeModal = () => {
    setModalAnimation("fade-out");
    setTimeout(() => {
      setShowDetails(false);
      setModalAnimation("fade-in");
      setDetailSize(null);
    }, 250);
  };

  // Función para manejar la navegación al siguiente paso
  const handleNext = () => {
    if (!selectedSize) {
      setShakeButton(true);
      setErrorMessage("Por favor selecciona una talla antes de continuar.");
      setTimeout(() => setShakeButton(false), 500);
      return;
    }

    setErrorMessage("");
    // Navegar al paso 3 (si existe) enviando ambas selecciones
    navigate("/customize/camisetas/step3", {
      state: { selectedTshirt, selectedSize },
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      {/* Encabezado */}
      <div className="flex justify-center items-center relative">
        <h2 className="text-center text-2xl font-bold text-white mb-2">Talla</h2>
      </div>

      <p className="text-center text-white mb-6">
        Selecciona la talla de tu prenda y presiona continuar
      </p>

      {/* Imagen de la silueta seleccionada */}
      <div className="rounded-xl p-4 mb-5 flex justify-center items-center">
        <img
          src={image}
          alt="Camiseta seleccionada"
          className="max-w-[300px] sm:max-w-[320px] md:max-w-[400px] h-auto object-contain"
        />
      </div>

      {/* Lista de tallas disponibles */}
      <div className="space-y-3">
        {sizes.map((size) => (
          <div
            key={size.id}
            className={`flex justify-between items-center border px-4 py-2 rounded-xl transition-colors ${
              selectedSize === size.id
                ? "bg-white text-black"
                : "border-white text-white"
            }`}
          >
            <div>
              <p className="font-medium">{size.label}</p>
              <p className={`text-sm ${selectedSize === size.id ? "text-gray-600" : "text-gray-400"}`}>
                {size.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className={`border rounded-md px-2 py-1 text-sm transition-colors ${
                  selectedSize === size.id 
                    ? "border-gray-600 text-gray-600 hover:bg-gray-100" 
                    : "border-gray-300 text-gray-300 hover:bg-white hover:text-black"
                }`}
                onClick={() => {
                  setDetailSize(size.id);
                  setShowDetails(true);
                }}
              >
                Detalles
              </button>
              <button
                className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setSelectedSize(size.id);
                  setErrorMessage(""); // Limpiar mensaje de error al seleccionar
                }}
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <p className="text-red-400 mt-4 text-center">{errorMessage}</p>
      )}

      {/* Botones de navegación */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white py-2 px-4 rounded-lg w-45 hover:bg-gray-600 transition-colors"
        >
          Volver
        </button>

        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded-lg w-45 transition-colors ${
            selectedSize 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-gray-500 text-white cursor-not-allowed"
          } ${shakeButton ? "shake" : ""}`}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de detalles de talla */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className={`bg-white text-black rounded-lg p-6 w-11/12 max-w-md relative animate-${modalAnimation}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black transition-colors"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-2">
              Detalles de talla {detailSize}
            </h3>
            <p className="text-sm mb-4">
              <strong>Material:</strong> 80% algodón, 20% poliéster. Interior
              afelpado, costuras reforzadas, capucha ajustable y bolsillos
              laterales.
            </p>
            <p className="text-sm font-semibold">Medidas:</p>
            <ul className="list-disc list-inside text-sm mt-1">
              {sizes
                .filter((size) => size.id === detailSize)
                .map((s) => (
                  <li key={s.id}>
                    {s.label}: {s.description}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}