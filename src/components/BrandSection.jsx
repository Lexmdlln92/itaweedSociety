// src/components/BrandSection.jsx
import { Link } from "react-router-dom";

// LEX Brand Assets
import lexLogo from "../assets/brandSectionLex/logo lex.png";
import lexCover1 from "../assets/brandSectionLex/lexcover1.png";
import lexCover2 from "../assets/brandSectionLex/lexcover2.png";
import lexCover3 from "../assets/brandSectionLex/lexcover3.png";

// D2D Brand Assets
import coverD2D1 from "../assets/brandSectionD2D/coverD2D1.png";
import coverD2Dlogo from "../assets/brandSectionD2D/coverD2Dlogo.png";
import coverD2D2 from "../assets/brandSectionD2D/coverD2D2.png";
import coverD2D3 from "../assets/brandSectionD2D/coverD2D3.png";
import coverD2D4 from "../assets/brandSectionD2D/coverD2D4.png";
import spaceBg from "../assets/brandSectionD2D/space.png";

const cover = [
  {
    id: "lex",
    logo: lexLogo,
    type: "lex",
    images: {
      left: lexCover1,
      right: lexCover2,
      bottom: lexCover3,
    },
  },
  {
    id: "d2d",
    type: "d2d",
    background: spaceBg,
    images: {
      topLeft: coverD2D1,
      topRight: coverD2Dlogo,
      left: coverD2D2,
      center: coverD2D3,
      right: coverD2D4,
    },
  },
];

export default function BrandSection() {
  return (
    <section className="mt-1">
      {cover.map((brand, idx) => (
        <div key={idx} className="relative">
          
          {/* Sección LEX */}
          {brand.type === "lex" && (
            <div className="overflow-hidden relative">
              {/* Contenedor principal */}
              <div className="px-4 py-6 relative z-10">
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src={brand.logo}
                    alt="LEX"
                    className="mx-auto h-25 w-auto"
                  />
                  <p className="text-orange-400 text-xl font-bold tracking-wider -mt-5">
                    Factory 
                  </p>
                </div>

                {/* Texto central */}
                <div className="text-center mb-6">
                  <p
                    className="text-white text-xl font-bold leading-tight tracking-wide"
                    style={{
                      fontFamily: "serif",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                      transform: "scaleY(1.1)",
                    }}
                  >
                    Solo Salen 7 prendas<br />
                    no ronque mucho<br />
                    que se la pierde
                  </p>
                </div>

                {/* Botón */}
                <div className="flex justify-center mb-6">
                  <Link
                    to="/products/vision-lex"
                    className="px-6 py-2 border-2 border-white text-white rounded-full text-base font-medium hover:bg-white hover:text-purple-900 transition-all duration-300"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>

              {/* Imágenes LEX - diseño mobile first */}
              <div className="relative h-[380px] w-full">
                {/* Izquierda */}
                <img
                  src={brand.images.left}
                  alt="Modelo LEX Izquierda"
                  className="absolute -left-29 top-0 w-90 object-cover"
                  style={{ transform: "translateY(-170px)" }}
                />
                {/* Derecha */}
                <img
                  src={brand.images.right}
                  alt="Modelo LEX Derecha"
                  className="absolute -right-29 top-0 w-75 object-cover"
                  style={{ transform: "translateY(-170px)" }}
                />
                {/* Centro */}
                <img
                  src={brand.images.bottom}
                  alt="Modelo LEX Centro"
                  className="absolute left-1/2 -bottom-36 w-76 object-cover"
                  style={{ transform: "translate(-45%, -20px)" }}
                />
              </div>
            </div>
          )}

          {/* Sección D2D */}
          {brand.type === "d2d" && (
            <div 
              className="relative overflow-hidden"
              style={{
                backgroundImage: `url(${brand.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            > 
              {/* Contenedor principal */}
              <div className="px-4 py-6 relative z-10">
                {/* Título superior con imágenes */}
                <div className="flex items-center justify-center mb-5 relative">
                  {/* coverD2D1 - Izquierda superior */}
                  <div className="absolute -left-1 top-0">
                    <img
                      src={brand.images.topLeft}
                      alt="Universo"
                      className="h-32 w-auto"
                    />
                  </div>
                  
                  {/* coverD2Dlogo - Centro derecha superior */}
                  <div className="ml-22 mt-2">
                    <img
                      src={brand.images.topRight}
                      alt="D2D Logo"
                      className="h-35 w-auto"
                    />
                  </div>
                </div>

                {/* Texto descriptivo */}
                <div className="text-left mb-6 font-londrina">
                  <p
                    className="text-white font-bold italic leading-tight"
                    style={{ fontSize: "2.4rem" }} // Cambia el tamaño aquí
                  >
                    Sonríe mira que existes
                  </p>
                  <p
                    className="text-white font-dancing"
                    style={{ fontSize: "1.7rem" }} // Cambia el tamaño aquí
                  >
                    Prendas de otra galaxia
                  </p>
                </div>

                {/* Botón */}
                <div className="flex justify-end -mt-12 mb-4">
                  <Link
                    to="/products/universo-d2d"
                    className="px-6 py-2 border-2 border-white bg-green-400 text-white rounded-full text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>

              {/* Imágenes D2D - diseño mobile first con misma altura que LEX */}
              <div className="relative h-[380px] w-full z-10">
                {/* coverD2D2 - Izquierda */}
                <img
                  src={brand.images.left}
                  alt="Alien Izquierda"
                  className="absolute -left-3 top-0 w-60 object-cover"
                  style={{ transform: "translateY(-50px)" }}
                />
                {/* coverD2D4 - Derecha */}
                <img
                  src={brand.images.right}
                  alt="Alien Derecha"
                  className="absolute -right-7 top-0 w-55 object-cover"
                  style={{ transform: "translateY(-5px)" }}
                />
                {/* coverD2D3 - Centro */}
                <img
                  src={brand.images.center}
                  alt="Alien Centro"
                  className="absolute left-1/2 -bottom-36 w-76 object-cover"
                  style={{ transform: "translate(-45%, 170px)" }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}