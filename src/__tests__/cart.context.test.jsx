// src/context/CartContext.jsx
import React, { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const ADD = 'ADD';
const UPDATE_QTY = 'UPDATE_QTY';
const REMOVE = 'REMOVE';
const CLEAR = 'CLEAR';

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      const { product, qty = 1 } = action.payload;
      const i = state.findIndex((it) => it.codigo === product.codigo);
      if (i === -1) return [...state, { ...product, qty }];
      const clone = state.slice();
      clone[i] = { ...clone[i], qty: clone[i].qty + qty };
      return clone;
    }
    case UPDATE_QTY: {
      const { codigo, qty } = action.payload;
      if (qty <= 0) return state.filter((it) => it.codigo !== codigo);
      return state.map((it) => (it.codigo === codigo ? { ...it, qty } : it));
    }
    case REMOVE: {
      const { codigo } = action.payload;
      return state.filter((it) => it.codigo !== codigo);
    }
    case CLEAR:
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  const addToCart = (product, qty = 1) =>
    dispatch({ type: ADD, payload: { product, qty } });

  const updateQty = (codigo, qty) =>
    dispatch({ type: UPDATE_QTY, payload: { codigo, qty } });

  const removeFromCart = (codigo) =>
    dispatch({ type: REMOVE, payload: { codigo } });

  const clearCart = () => dispatch({ type: CLEAR });

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.qty * it.precio, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    updateQty,       // 👈 ahora existe
    removeFromCart,
    clearCart,
    subtotal,        // 👈 ahora es un número
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
};
