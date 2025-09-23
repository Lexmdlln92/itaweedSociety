// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { convertPriceToNumber } from '../data/productData';

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

  if (state.items.length === 0) {
    return (
      <div className="text-white min-h-screen flex flex-col items-center justify-center animate-fade-in px-4">
        <h1 className="text-3xl font-bold mb-4 animate-bounce">Tu carrito 🛒</h1>
        <p className="text-gray-300 mb-2 animate-fade-in">Tu carrito está vacío</p>
        <Link
          to="/search"
          className="inline-block mt-4 px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors animate-fade-in"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-5 pb-10 text-white min-h-screen flex-col-2">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Tu carrito 🛒<br/>échale sin miedo 🤣</h1>

      <div className="space-y-6 max-w-4xl mx-auto gap-4">
        {state.items.map((item) => (
          <article
            key={`${item.id}-${item.size}`}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >

            {/* Contenedor principal: mobile = column, desktop = row */}
            <div className="flex flex-col-2 sm:flex-row items-stretch">
              {/* 40% imagen (en desktop). En mobile se muestra debajo */}
              <div className="w-full flex items-center justify-center bg-gray-900/20 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded-md"
                />
              </div>
              {/* 60% detalles (en desktop) */}
              <div className="w-full px-5 py-6 flex flex-col items-center text-center sm:items-center sm:text-left">
                {/* Nombre (arriba) */}
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>

                {/* Fila: talla | precio */}
                <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-lg">Talla:</span>
                    <span className="font-medium">{item.size}</span>
                  </div>

                  <div className="flex items-center gap-2 -mt-2">
                    {/* <span className="text-gray-400 text-sm">Precio:</span> */}
                    <span className="text-purple-400 font-bold text-lg">
                      {typeof item.price === 'number'
                        ? `$${item.price.toLocaleString()}`
                        : item.price}
                    </span>
                  </div>
                </div>

                {/* Controles centrados */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 bg-gray-700 px-3 py-2 rounded-full">
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      className="px-3 py-1 bg-transparent rounded text-white hover:bg-gray-600 transition"
                      aria-label={`Disminuir cantidad ${item.name}`}
                    >
                      −
                    </button>
                    <span className="min-w-[28px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      className="px-3 py-1 bg-transparent rounded text-white hover:bg-gray-600 transition"
                      aria-label={`Aumentar cantidad ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500 hover:text-red-400 text-xl"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    Eliminar
                  </button>
                </div>
              </div>


            </div>
          </article>
        ))}
      </div>

      {/* Resumen y checkout */}
      <div className="mt-3 max-w-4xl mx-auto">
        <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-lg">Total:</span>
            </div>
            <div>
              <span className="text-xl font-bold">${calculateTotal().toLocaleString()} COP</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to="/checkout"
              className="block w-full py-3 bg-purple-600 text-center rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Proceder al pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
