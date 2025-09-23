// src/components/CustomizationSection.jsx
import camisetas from "../assets/customization/tshirtD2D.webp";
import buzos from "../assets/customization/hoodieD2D.webp";
import sudaderas from "../assets/customization/sweatpantsD2D.webp";
import pantalonetas from "../assets/customization/shortD2D.webp";
import { useNavigate } from "react-router-dom";




const styles = [
  {
    label: "Camisetas",
    image: camisetas,
    path: "/customize/camisetas",
  },
  {
    label: "Buzos",
    image: buzos,
    path: "/customize/buzos",
  },
  {
    label: "Sudaderas",
    image: sudaderas,
    path: "/customize/sudaderas",

  },
  {
    label: "Pantalonetas",
    image: pantalonetas,
    path: "/customize/pantalonetas",

  },
];

export default function CustomizationSection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 mt-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold uppercase mb-6 text-white">
        Personaliza tus prendas by D2D
      </h2>
      <p className="text-lg text-white mb-6 text-center">Saca ese diseñador que llevas dentro,<br/> selecciona el tipo de prenda, talla, colores y agrega la imagen que prefieras y obtén un preview de tu prenda.</p>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {styles.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-auto object-cover"
            />
            <p className="text-center py-2 font-semibold text-sm text-black">
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
