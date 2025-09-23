import state1 from "../assets/states/state1.webp";
import state2 from "../assets/states/state2.webp";
import state3 from "../assets/states/state3.webp";
import state4 from "../assets/states/state4.webp";
import state5 from "../assets/states/state5.webp";
import state6 from "../assets/states/state6.webp";
import { Link } from "react-router-dom";

const images = [state5, state6, state3, state4,state1, state2, ];

const States = () => {
  return (
    <section className="py-12 px-4 md:px-10 bg-violet-700 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-400">
        Estaditos melos
      </h2>

      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max px-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`state ${idx + 1}`}
              className="w-60 h-60 object-cover rounded-xl shadow-md flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/states"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
        >
          Ver todos
        </Link>
      </div>
    </section>
  );
};

export default States;
