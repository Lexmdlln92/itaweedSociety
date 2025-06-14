// src/components/Collaborations.jsx
import { Link } from "react-router-dom";

const Collaborations = () => {
  return (
    <section className="py-12 px-4 md:px-10 bg-black text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Colaboraciones
      </h2>
      <p className="text-lg text-amber-300 mb-6">
        Nos aliamos con marcas y talentos únicos para crear experiencias exclusivas.
        aprte de verte lindo con esta ropa tanc chimba resive beneficios diferentes cada mes.
      </p>
      <div className="flex justify-center mt-6">
        <Link
          to="/collaborationPage"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
        >
          Conoce nuestra alianza del mes
        </Link>
      </div>
    </section>
  );
};

export default Collaborations;
