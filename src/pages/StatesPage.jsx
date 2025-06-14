import { FiDownload } from "react-icons/fi";
import state1 from "../assets/state1.png";
import state2 from "../assets/state2.png";
import state3 from "../assets/state3.png";
import state4 from "../assets/state4.png";
import state5 from "../assets/state5.png";
import state6 from "../assets/state6.png";

const states = [
  { img: state1, name: "state1" },
  { img: state2, name: "state2" },
  { img: state3, name: "state3" },
  { img: state4, name: "state4" },
  { img: state5, name: "state5" },
  { img: state6, name: "state6" },
];

const StatesPage = () => {
  return (
    <section className="min-h-screen py-16 px-6 md:px-20 bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-12 text-amber-400">
        Estados del Mes
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
        {states.map((state, idx) => (
          <div key={idx} className="relative">
            <img
              src={state.img}
              alt={`Estado ${idx + 1}`}
              className="w-full aspect-square object-cover rounded-xl shadow-md"
            />
            <a
              href={state.img}
              download={`${state.name}.png`}
              className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg hover:bg-amber-400 hover:scale-110 transition-all"
              title="Descargar imagen"
            >
              <FiDownload className="text-l" />
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <a
          href="#"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
        >
          Ver todos
        </a>
      </div>
    </section>
  );
};

export default StatesPage;
