// src/components/CustomizationSection.jsx
import camisetas from "../assets/tshirt1.png";
import buzos from "../assets/tshirt2.png";
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
];

export default function CustomizationSection() {
  const navigate = useNavigate();

  return (
    <section className="px-4 mt-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold uppercase mb-6 text-white">
        Personaliza tus prendas by D2D
      </h2>

      <div className="grid grid-cols-2 gap-4">
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
