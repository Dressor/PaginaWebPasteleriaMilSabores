// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const pushToast = (title, msg) => {
    const id = crypto.randomUUID?.() || String(Date.now() + Math.random());
    setToasts((t) => [...t, { id, title, msg }]);
  };
  const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const addToCart = (product, qty = 1) => {
    if (!product?.codigo) return;
    const max = Number(product.stock) || Infinity;

    setItems((prev) => {
      const idx = prev.findIndex((p) => p.codigo === product.codigo);
      if (idx >= 0) {
        const current = prev[idx].qty || 0;
        const nextQty = Math.min(current + qty, max);
        const next = [...prev];
        next[idx] = { ...next[idx], qty: nextQty };
        if (nextQty === current) {
          pushToast('Sin stock', 'Has alcanzado la cantidad máxima disponible.');
        } else {
          pushToast('Producto agregado', `${product.nombre} fue añadido al carrito`);
        }
        return next;
      }
      const startQty = Math.min(qty, max);
      if (startQty <= 0) {
        pushToast('Sin stock', 'Este producto no tiene stock disponible.');
        return prev;
      }
      pushToast('Producto agregado', `${product.nombre} fue añadido al carrito`);
      return [...prev, {
        codigo: product.codigo,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        qty: startQty,
        stock: max,
      }];
    });
  };

  const removeFromCart = (codigo) => {
    setItems((prev) => prev.filter((p) => p.codigo !== codigo));
    pushToast('Producto eliminado', 'Se quitó el producto del carrito');
  };

  const clearCart = () => {
    setItems([]);
    pushToast('Carrito vacío', 'Se vaciaron los productos del carrito');
  };

  const setQty = (codigo, qty) => {
    const n = Math.max(1, Number(qty) || 1);
    setItems((prev) => prev.map((p) => {
      if (p.codigo !== codigo) return p;
      const max = Number(p.stock) || Infinity;
      const toSet = Math.min(n, max);
      if (toSet !== n) pushToast('Límite de stock', 'No puedes superar el stock disponible.');
      return { ...p, qty: toSet };
    }));
  };

  const inc = (codigo) => {
    setItems((prev) => prev.map((p) => {
      if (p.codigo !== codigo) return p;
      const max = Number(p.stock) || Infinity;
      const toSet = Math.min((p.qty || 1) + 1, max);
      if (toSet === p.qty) pushToast('Límite de stock', 'No puedes superar el stock disponible.');
      return { ...p, qty: toSet };
    }));
  };

  const dec = (codigo) => {
    setItems((prev) =>
      prev.map((p) => (p.codigo === codigo ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
    );
  };

  const count = useMemo(() => items.reduce((acc, it) => acc + (it.qty || 0), 0), [items]);
  const total = useMemo(() => items.reduce((acc, it) => acc + it.precio * (it.qty || 0), 0), [items]);
  const fmtCLP = (n) => n.toLocaleString('es-CL');

  const value = {
    items, addToCart, removeFromCart, clearCart,
    setQty, inc, dec,
    count, total, fmtCLP,
    toasts, removeToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
};
