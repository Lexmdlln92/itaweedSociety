import anaBravoImg from "../assets/anabravo.png";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";

const CollaborationPage = () => {
  return (
    <section className="py-12 px-4 md:px-20 bg-black text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-amber-400">
        Colaboración del mes: Ana Bravo Ink
      </h1>

      <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
        Esta alianza celebra la fusión entre arte corporal y moda urbana. Nos unimos con
        <strong> Ana Bravo Ink</strong>, un estudio de tatuajes reconocido por su estilo fino y enfoque personalizado.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-5">
        <img
          src={anaBravoImg}
          alt="Ana Bravo Ink"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-center">Sobre Ana Bravo Ink</h2>
          <p className="text-amber-300 mb-4">
            Ana Bravo ha estado dejando su huella en la piel de cientos de personas desde 2017.
            Su estudio combina técnica, arte e intimidad en cada diseño.
          </p>
          <p>
            Esta colaboración trae productos inspirados en su arte, fusionando ilustraciones originales con textiles de alta calidad.
          </p>
        </div>
      </div>

      {/* Redes sociales centradas */}
      <div className="flex justify-center gap-6 text-3xl text-white mb-6">
        <a
          href="https://instagram.com/anabravoink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="hover:text-amber-300" />
        </a>
        <a
          href="https://facebook.com/anabravoink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className="hover:text-amber-300" />
        </a>
        <a
          href="https://anabravoink.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sitio Web"
        >
          <FaGlobe className="hover:text-amber-300" />
        </a>
      </div>

      {/* Beneficio + aclaración mejorado */}
      <div className="bg-amber-50 text-black rounded-xl px-6 py-6 md:py-8 text-center max-w-3xl mx-auto shadow-lg">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">
          Participa por un tatuaje exclusivo de Ana Bravo Ink
        </h3>
        <p className="text-base md:text-lg font-medium">
          Al comprar cualquier prenda de las marcas <span className="text-amber-600 font-bold">D2D</span> o <span className="text-amber-600 font-bold">LEX</span> durante este mes.
        </p>
        <p className="text-sm text-gray-600 mt-3 italic">*Aplica condiciones y restricciones.</p>
      </div>
    </section>
  );
};

export default CollaborationPage;
