import { Link } from "react-router-dom";
import storie1 from "../assets/storie1.png";
import storie2 from "../assets/storie2.png"; // asegúrate de que el nombre y ruta coincidan

const stories = [
  {
    id: 1,
    title: "the trip-sons collection inspirada en los simpson La historia detrás del diseño",
    description: "Cada prenda busca contar una version diferente de la historia que ya todos hemos visto por mas de 20 años.",
    image: storie1,
  },
  {
    id: 2,
    title: "el niño rata",
    description: "Creamos colecciones exclusivas que no volverán a producirse solo salen 7 prendas por diseño.",
    image: storie2,
  },
];

const StorieSection = () => {
  return (
    <section className="py-10 px-4 md:px-10 bg-black text-white mt-15">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Historias detras de cada prenda by LEX
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center text-center">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
            <h3 className="text-xl font-semibold mt-4">{story.title}</h3>
            <p className="text-amber-300 gray-600 mt-2">{story.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/StorieByLex"
          className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
        >
          Ver más
        </Link>
      </div>

    </section>
  );
};

export default StorieSection;
