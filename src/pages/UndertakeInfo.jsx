// src/pages/UndertakeInfo.jsx
const UndertakeInfo = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-14 md:px-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Emprendé con Itaweed Society
      </h1>

      <div className="space-y-12 max-w-4xl mx-auto text-lg text-gray-300">
        <div>
          <h2 className="text-2xl font-semibold text-amber-400 mb-2">
            🚀 Creá tu propia marca
          </h2>
          <p>
            Si tenés una idea o querés lanzar tu propia línea, nosotros te
            ayudamos con diseño, producción, y canales de venta. Todo en un
            solo lugar y con calidad premium.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-amber-400 mb-2">
            🤝 Sé un distribuidor oficial
          </h2>
          <p>
            Unite como revendedor de nuestras colecciones. Accedé a productos
            exclusivos, con stock limitado y beneficios especiales para
            vendedores.
          </p>
        </div>

        <div className="mt-10 text-center">
          <p className="text-white mb-4 font-semibold">
            ¿Listo para empezar?
          </p>
          <a
            href="https://wa.me/XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border-2 border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default UndertakeInfo;
