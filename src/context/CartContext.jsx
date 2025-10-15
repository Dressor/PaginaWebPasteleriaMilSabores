import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);
const storageKey = 'milsabores.cart.v1';

// ── storage helpers
const load = () => {
  try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
  catch { return []; }
};
const save = (items) => localStorage.setItem(storageKey, JSON.stringify(items));

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return Array.isArray(action.payload) ? action.payload : [];
    case 'ADD': {
      const { producto, qty = 1 } = action.payload;
      const i = state.findIndex(it => it.codigo === producto.codigo);
      const next = [...state];
      if (i === -1) {
        next.push({ ...producto, qty: Math.max(1, qty) });
      } else {
        const stock = Number.isFinite(producto.stock) ? producto.stock : Infinity;
        next[i] = { ...next[i], qty: Math.min(stock, next[i].qty + qty) };
      }
      return next;
    }
    case 'SET_QTY': {
      const { codigo, qty } = action.payload;
      if (qty <= 0) return state.filter(it => it.codigo !== codigo);
      return state.map(it => it.codigo === codigo ? { ...it, qty } : it);
    }
    case 'REMOVE':
      return state.filter(it => it.codigo !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  // ── toasts seguros (nunca undefined)
  const [toasts, setToasts] = useState([]); // [{id, msg, variant}]

  useEffect(() => { dispatch({ type: 'INIT', payload: load() }); }, []);
  useEffect(() => { save(items); }, [items]);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  const addToast = (msg, variant = 'success', ttl = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts(prev => [...prev, { id, msg, variant }]);
    if (ttl > 0) setTimeout(() => removeToast(id), ttl);
  };

  const addToCart = (producto, qty = 1) => {
    dispatch({ type: 'ADD', payload: { producto, qty } });
    addToast(`Añadido: ${producto.nombre}`, 'success');
  };

  const setQty = (codigo, qty) => {
    dispatch({ type: 'SET_QTY', payload: { codigo, qty: Number(qty) || 0 } });
  };

  const removeFromCart = (codigo) => {
    dispatch({ type: 'REMOVE', payload: codigo });
    addToast('Producto eliminado del carrito', 'warning');
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
    addToast('Carrito vaciado', 'warning');
  };

  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, b) => a + b.qty * b.precio, 0), [items]);
  const envio = useMemo(() => (subtotal > 30000 || subtotal === 0 ? 0 : 3990), [subtotal]);
  const total = useMemo(() => subtotal + envio, [subtotal, envio]);

  return (
    <CartContext.Provider value={{
      items, addToCart, setQty, removeFromCart, clearCart,
      count, subtotal, envio, total,
      // toasts API
      toasts, addToast, removeToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
