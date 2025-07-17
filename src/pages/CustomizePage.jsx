// src/pages/CustomizePage.jsx
import { useParams } from "react-router-dom";
import Hoodie1Silhouettes from "./customize/Hoodie1Silhouettes"; // asegúrate de que la ruta esté bien

export default function CustomizePage() {
  const { category } = useParams();

  return (
    <section className="px-4 pt-20 text-white">
      <h1 className="text-3xl font-bold capitalize">Personaliza: {category}</h1>

      {category === "buzos" ? (
        <Hoodie1Silhouettes />
      ) : (
        <p className="mt-2 text-gray-300">Aquí iría el contenido de {category}...</p>
      )}
    </section>
  );
}
