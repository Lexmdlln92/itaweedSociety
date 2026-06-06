// src/pages/shop/CartPage.jsx — reorganización: movido de pages/ a pages/shop/
import { useCart } from '../../context/CartContext'; // reorganización: path actualizado
import { Link } from 'react-router-dom';
import { convertPriceToNumber } from '../../data/productData'; // reorganización: path actualizado
import { motion, AnimatePresence } from 'framer-motion';

/* ========================================
   FRAMER MOTION VARIANTS (Fiel a VisionLEXPage)
   ======================================== */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
};

export default function CartPage() {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { ...item, quantity: newQuantity },
    });
  };

  const handleRemoveItem = (item) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: item,
    });
  };

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (convertPriceToNumber(item.price) * item.quantity);
    }, 0);
  };

  /* ========================================
     VISTA: CARRITO VACÍO
     ======================================== */
  if (state.items.length === 0) {
    return (
      <section className="nap-root min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden text-white">
        {/* Rejilla de Fondo Técnica */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/40 border border-white/5 p-8 backdrop-blur-md text-center relative z-10"
        >
          <span className="nap-badge-tech absolute top-3 right-3 text-[9px] font-mono text-purple-400/40 select-none">
            SYS_STATUS // EMPTY_BAG
          </span>

          <div className="text-4xl mb-4 select-none animate-pulse">🛒</div>
          
          <h1 className="text-3xl font-sans font-black tracking-tighter uppercase mb-2 text-white">
            Tu <span className="text-purple-500">carrito</span>
          </h1>
          
          <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6">
            Tu carrito está vacío
          </p>

          <Link
            to="/search"
            className="inline-block w-full py-3 bg-purple-950/20 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest transition-all duration-300"
          >
            Explorar Productos // →
          </Link>
        </motion.div>
      </section>
    );
  }

  /* ========================================
     VISTA: PANEL PRINCIPAL DEL CARRITO
     ======================================== */
  return (
    <section className="nap-root min-h-screen py-12 px-4 md:px-8 relative overflow-hidden text-white">
      {/* Rejilla de Fondo Técnica */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabecera Industrial */}
        <header className="mb-10 border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase leading-none">
              Resumen de <span className="text-purple-500">Compra</span>🛒<br/>échale sin miedo 🤣
            </h1>
            <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase mt-2">
              Bolsa de orden técnica // Archivo actual [{state.items.length} ítems]
            </p>
          </div>
          <Link 
            to="/search" 
            className="text-[11px] font-mono uppercase tracking-wider text-purple-400 hover:text-white transition-colors"
          >
            [← Seguir comprando]
          </Link>
        </header>

        {/* Layout de Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Listado de Productos (Izquierda) */}
          <motion.div 
            className="lg:col-span-2 flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="popLayout">
              {state.items.map((item) => (
                <motion.article
                  key={`${item.id}-${item.selectedSize}`}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                  className="bg-zinc-950/40 border border-zinc-900 hover:border-purple-500/20 p-4 backdrop-blur-sm transition-all duration-300 relative group"
                >
                  {/* Metadata de esquina superior derecha */}
                  <span className="absolute top-2 right-3 font-mono text-[9px] text-zinc-600 group-hover:text-purple-400/50 transition-colors">
                    SIZE: {item.selectedSize || "N/A"}
                  </span>

                  <div className="flex gap-4 sm:gap-6 items-center">
                    {/* Contenedor de Imagen */}
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-zinc-900 border border-zinc-800 overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Datos del Ítem */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm font-mono tracking-wide text-zinc-300 uppercase truncate group-hover:text-white transition-colors">
                        {item.name}
                      </h2>
                      
                      {item.selectedSize && (
                        <p className="text-[10px] font-mono uppercase text-zinc-500 mt-0.5">
                          Talla elegida: <span className="text-zinc-400">{item.selectedSize}</span>
                        </p>
                      )}

                      <p className="text-sm font-mono font-bold text-purple-400 mt-2">
                        ${convertPriceToNumber(item.price).toLocaleString()} COP
                      </p>

                      {/* Controles de Acción Inferiores */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-zinc-900/60">
                        
                        {/* Selector de Cantidad */}
                        <div className="flex items-center bg-black/60 border border-zinc-800 h-8 font-mono">
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            className="w-8 h-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors text-xs cursor-pointer"
                            aria-label={`Disminuir cantidad ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs text-zinc-300 font-bold select-none">
                            {String(item.quantity).padStart(2, '0')}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            className="w-8 h-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors text-xs cursor-pointer"
                            aria-label={`Aumentar cantidad ${item.name}`}
                          >
                            +
                          </button>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-[11px] font-mono text-zinc-500 hover:text-red-400 uppercase tracking-wider bg-transparent border-none cursor-pointer transition-colors"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          [ Remover ítem ]
                        </button>

                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Resumen del Checkout (Derecha) */}
          <aside className="lg:sticky lg:top-6 bg-black/40 border border-white/5 p-6 backdrop-blur-md relative">
            <span className="nap-badge-tech absolute top-3 right-3 text-[9px] font-mono text-purple-400/40 select-none">
              BILL_GATE // GATE_01
            </span>

            <h3 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4 pb-2 border-b border-zinc-900">
              Totales de la Orden
            </h3>

            <div className="flex items-baseline justify-between mb-6">
              <span className="text-xs font-mono uppercase text-zinc-500">Monto Global:</span>
              <span className="text-2xl font-sans font-black tracking-tight text-white">
                ${calculateTotal().toLocaleString()} <span className="text-xs text-purple-500 font-mono font-normal">COP</span>
              </span>
            </div>

            <div className="mt-4">
              <Link
                to="/checkout"
                className="block w-full py-3.5 bg-purple-950/20 hover:bg-purple-500/20 border border-purple-500/40 text-center font-mono text-xs uppercase tracking-widest text-purple-400 hover:text-white transition-all duration-300"
              >
                Proceder al pago // →
              </Link>
            </div>

            {/* Aviso Técnico Legal */}
            <p className="text-[10px] font-mono text-zinc-600 leading-normal mt-4 text-center">
              Transacción protegida por el protocolo de cifrado de la plataforma.
            </p>
          </aside>

        </div>
      </div>

      {/* Detalles Estéticos Esquina Industrial */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 pointer-events-none" />
    </section>
  );
}