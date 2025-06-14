// src/components/Undertake.jsx
import { Link } from "react-router-dom";

const Undertake = () => {
  return (
    <section className="py-14 px-4 md:px-10 bg-violet-700 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Emprendé con <span className="text-amber-400">Itaweed Society</span>
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Sumate como creador o distribuidor. Te acompañamos a crear tu propia marca de ropa o 
        a vender nuestras colecciones exclusivas.
      </p>
      <div className="flex justify-center">
        <Link
          to="/undertake"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
        >
          Conocé más
        </Link>
      </div>
    </section>
  );
};

export default Undertake;
