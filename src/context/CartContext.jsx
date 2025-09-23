// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const KEY = 'itaweed_cart_v1';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item =>
        item.id === action.payload.id &&
        item.size === action.payload.size
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item =>
          !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'SET_CART':
      // reemplazar todo el carrito (útil para inicializar desde storage)
      return {
        ...state,
        items: action.payload.items || [],
      };

    default:
      return state;
  }
};

function getInitialState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return { items: parsed.items };
  } catch (e) {
    console.warn('Error leyendo cart desde localStorage', e);
    return { items: [] };
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => getInitialState());

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ items: state.items }));
    } catch (e) {
      console.warn('Error guardando cart en localStorage', e);
    }
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
