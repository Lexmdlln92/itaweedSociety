// src/pages/shop/ProductDetail.jsx — reorganización: movido de pages/ a pages/shop/
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiChevronRight as FiBreadcrumbArrow } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext"; // reorganización: path actualizado
import { getProductById } from "../../data/productData"; // reorganización: path actualizado

/* -----------------------------------------------------
   ICONOS DE LA LÍNEA GRÁFICA (Consistencia Visual)
----------------------------------------------------- */
const IconStar = ({ filled }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill={filled ? "#8b5cf6" : "none"}
    stroke="#8b5cf6"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  // Estados funcionales originales
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const product = getProductById(id);

  // Manejador para agregar al carrito
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.gallery[0],
        size: selectedSize,
        quantity: 1,
      },
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (!product) {
    return (
      <div className="nap-root flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="nap-empty">
          <div className="nap-empty-glyph font-rock">404</div>
          <p className="nap-empty-text !text-xl font-bold uppercase tracking-widest text-white">
            Producto no encontrado
          </p>
          <button
            onClick={() => navigate("/products/new")}
            className="nap-footer-btn mt-8"
          >
            Volver al Drop →
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Home", route: "/" },
    { name: product.breadcrumbCategory, route: product.breadcrumbRoute },
    { name: product.name, route: null },
  ];

  const imagesToShow = product.gallery || [product.image];

  const isVideoFile = (url) => {
    if (!url) return false;
    return (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".mov")
    );
  };

  const handleMobileScroll = (e) => {
    const slideWidth = e.target.clientWidth;
    const currentScroll = e.target.scrollLeft;
    const index = Math.round(currentScroll / slideWidth);
    setActiveMobileIndex(index);
    setCurrentImageIndex(index);
  };

  const availableSizes = ["S", "M", "L", "XL"];

  const discountPct = product.discount
    ? Math.round((1 - product.price / product.discount) * 100)
    : null;

  return (
    <section className="nap-root !pt-24 min-h-screen pb-16 relative">
      {/* MALLA GEOMÉTRICA DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Alerta del Sistema */}
      {showNotification && (
        <div className="fixed top-24 right-4 bg-purple-900 border border-purple-500 text-white font-mono text-xs px-6 py-3 rounded-none shadow-[0_0_15px_rgba(139,92,246,0.3)] z-50 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
          [SISTEMA]: ITEM AGREGADO AL CARGO
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* BREADCRUMB */}
        <nav
          className="mb-6 font-mono text-xs uppercase tracking-wider border-b border-white/5 pb-4"
          aria-label="Breadcrumb"
        >
          <div className="flex flex-wrap items-center gap-2 text-gray-400">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.route ? (
                  <button
                    onClick={() => navigate(item.route)}
                    className="hover:text-purple-400 transition-colors uppercase"
                  >
                    {item.name}
                  </button>
                ) : (
                  <span className="text-white font-semibold cursor-default">
                    // {item.name}
                  </span>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <FiBreadcrumbArrow className="text-purple-500 text-[10px]" />
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* CONTENEDOR EN LAYOUT COMPLETO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =======================================================================
              BLOQUE MULTIMEDIA IZQUIERDO
             ======================================================================= */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* MINIATURAS */}
            <div className="hidden md:flex md:col-span-2 flex-col space-y-2 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
              <style>{`
                .scrollbar-thin::-webkit-scrollbar { width: 3px; }
                .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background-color: rgba(139, 92, 246, 0.3); }
              `}</style>

              {imagesToShow.map((src, index) => {
                const isVideo = isVideoFile(src);

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                    className={`w-full aspect-square bg-black/30 border transition-all relative overflow-hidden shrink-0 ${
                      currentImageIndex === index
                        ? "border-purple-500 opacity-100 scale-[0.96]"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {isVideo ? (
                      <div className="w-full h-full relative bg-black flex items-center justify-center">
                        <video
                          src={src}
                          className="w-full h-full object-cover opacity-50"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <svg
                            className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* VISOR PRINCIPAL */}
            <div className="col-span-1 md:col-span-8">
              {/* =========================
                  VISTA MÓVIL CORREGIDA
                 ========================= */}
              <div className="md:hidden relative">
                <div
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
                  onScroll={handleMobileScroll}
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {imagesToShow.map((src, index) => (
                    <div
                      key={index}
                      className="snap-center shrink-0 w-full bg-black/40 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[420px]"
                    >
                      {isVideoFile(src) ? (
                        <video
                          src={src}
                          controls
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                  {imagesToShow.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 transition-all duration-300 ${
                        activeMobileIndex === index
                          ? "w-4 bg-purple-500"
                          : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* VISTA DESKTOP */}
              <div className="hidden md:block nap-card-img w-full max-w-[460px] bg-black/40 border border-white/10 rounded-none overflow-hidden relative aspect-square mx-auto md:mx-0">
                {isVideoFile(imagesToShow[currentImageIndex]) ? (
                  <video
                    src={imagesToShow[currentImageIndex]}
                    key={currentImageIndex}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-contain bg-black/50"
                  />
                ) : (
                  <img
                    src={imagesToShow[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Estética Cyberpunk */}
                <div className="nap-card-overlay opacity-15" />

                <div className="nap-card-crosshair">
                  <div className="nap-crosshair-ring">
                    <div className="nap-crosshair-h" />
                    <div className="nap-crosshair-v" />
                    <div className="nap-crosshair-dot" />
                  </div>
                </div>

                {/* Badges */}
                <span className="nap-badge-tech">
                  DROP: ITW_DS_05
                </span>

                {discountPct && discountPct > 0 ? (
                  <span className="nap-badge-new is-discount">
                    -{discountPct}% OFF
                  </span>
                ) : (
                  <span className="nap-badge-new is-new">
                    SOLO SALEN 7
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =======================================================================
              PANEL DERECHO
             ======================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            {/* Encabezado */}
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-widest text-purple-400 block uppercase">
                RTW // KICKS & STREETWEAR
              </span>

              <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight text-white">
                {product.name}
              </h1>

              <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                Ref: {product.category} // Spec_0{product.id}
              </p>
            </div>

            {/* Precios */}
            <div className="flex items-baseline gap-4 py-1 border-b border-white/5">
              <span className="text-3xl font-extrabold text-white font-mono">
                ${product.price}
              </span>

              {product.discount && (
                <span className="text-md line-through text-white/40 font-mono">
                  ${product.discount}
                </span>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={i}
                      filled={i < Math.floor(product.rating)}
                    />
                  ))}
                </div>

                <span className="font-mono text-xs text-white/40">
                  ({product.rating} reviews)
                </span>
              </div>
            )}

            {/* Tallas */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <h3 className="uppercase tracking-widest text-white/40">
                  // SELECCIONAR TALLA
                </h3>

                <span className="text-purple-400 hover:underline cursor-pointer text-[11px]">
                  Guía de tallas
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 font-mono text-xs border flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] font-bold"
                        : "border-white/10 text-white hover:border-white/40 bg-black/20"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón carrito */}
            <div className="pt-2">
              <motion.button
                onClick={handleAddToCart}
                className="nap-footer-btn w-full !justify-center !py-4 font-mono uppercase tracking-widest text-xs font-bold"
                whileHover={{
                  scale: 1.01,
                  borderColor: "#8b5cf6",
                  boxShadow: "0 0 20px rgba(139,92,246,.25)",
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
              >
                {selectedSize
                  ? `AÑADIR AL CARGO [${selectedSize}]`
                  : "SELECCIONA TALLA"}

                <span className="ml-2">→</span>
              </motion.button>
            </div>

            {/* Descripción */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-white/50">
                // DETALLES DEL PRODUCTO
              </h3>

              <p className="text-gray-300 text-xs leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Políticas */}
            <div className="p-4 bg-black/30 border border-white/5 font-mono text-[10px] text-gray-400 space-y-2">
              <p className="text-purple-500 font-bold uppercase tracking-wider">
                // PROTOCOLO DE LOGÍSTICA
              </p>

              <p>
                • ENVÍO ASEGURADO GRATIS EN COMPRAS MAYORES A $200.000 COP.
              </p>

              <p>
                • DEVOLUCIONES HASTA 30 DÍAS TRAS LA VERIFICACIÓN DEL
                DESPACHO.
              </p>

              <p>
                • EDICIÓN LIMITADA: PRENDAS EXCLUSIVAS DE PRODUCCIÓN LIMITADA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}