// src/pages/customize/HoodieStep2Size.jsx
import { useLocation, useNavigate } from "react-router-dom";
import hoodie1 from "../../assets/hoodie1.webp";
import hoodie2 from "../../assets/hoodie2.webp";
import hoodie3 from "../../assets/hoodie3.webp";
import hoodie4 from "../../assets/hoodie4.webp";
import { useState } from "react";

// Mapeo de siluetas a imágenes
const hoodieMap = {
  buzo1: hoodie1,
  buzo2: hoodie2,
  buzo3: hoodie3,
  buzo4: hoodie4,
};

// Lista de tallas con descripciones
const sizes = [
  { id: "S", label: "S", description: '34–36"' },
  { id: "M", label: "M", description: '38–40"' },
  { id: "L", label: "L", description: '42–44"' },
  { id: "XL", label: "XL", description: '46–48"' },
  { id: "XXL", label: "XXL", description: '50–52"' },
];

export default function BuzoStep2Size() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const selectedBuzo = state?.selectedBuzo;
  const image = hoodieMap[selectedBuzo];
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSize, setDetailSize] = useState(null);
  const [modalAnimation, setModalAnimation] = useState("fade-in");

  if (!selectedBuzo) {
    return <p className="text-white p-4">No se seleccionó ninguna silueta.</p>;
  }

  // Cerrar modal con animación
  const closeModal = () => {
    setModalAnimation("fade-out");
    setTimeout(() => {
      setShowDetails(false);
      setModalAnimation("fade-in");
      setDetailSize(null);
    }, 250); // Tiempo igual al de la animación
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white">
      {/* Encabezado */}
      <div className="flex justify-center items-center  relative">
        <h2 className="text-center text-2xl font-bold text-white mb-2">Talla</h2>
      </div>
      <p className="text-center text-white mb-6">
        selecciona la talla de tu prenda y presiona continuar
      </p>
      {/* Imagen de silueta */}
<div className="rounded-xl p-4 mb-5 flex justify-center items-center">
  <img
    src={image}
    alt="Selected hoodie"
    className="max-w-[400px] sm:max-w-[320px] md:max-w-[400px] h-auto object-contain"
  />
</div>

      {/* Selector de tallas */}
      <div className="space-y-3">
        {sizes.map((size) => (
          <div
            key={size.id}
            className={`flex justify-between items-center border px-4 py-2 rounded-xl ${
              selectedSize === size.id ? "bg-white text-black" : "border-white"
            }`}
          >
            <div>
              <p className="font-medium">{size.label}</p>
              <p className="text-sm text-gray-400">{size.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                onClick={() => {
                  setDetailSize(size.id);
                  setShowDetails(true);
                }}
              >
                Detalles
              </button>
              <button
                className="bg-blue-500 text-white rounded-md px-2 py-1 text-sm"
                onClick={() => setSelectedSize(size.id)}
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white py-2 rounded-lg w-45"
        >
          Volver
        </button>
        <button
          disabled={!selectedSize}
          onClick={() =>
            navigate("/customize/buzos/step3", {
              state: { selectedBuzo, selectedSize },
            })
          }
          className={`px-4 py-2 rounded-lg w-45 ${
            selectedSize ? "bg-blue-500 text-white" : "bg-gray-500 text-gray-300"
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de detalles */}
        {showDetails && (
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className={`bg-white text-black rounded-lg p-6 w-11/12 max-w-md relative animate-${modalAnimation}`}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Botón de cerrar */}
            <button
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-2">Detalles de talla {detailSize}</h3>
            <p className="text-sm mb-4">
              <strong>Material:</strong> 80% algodón, 20% poliéster. Interior afelpado, costuras reforzadas, capucha ajustable y bolsillos laterales.
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
