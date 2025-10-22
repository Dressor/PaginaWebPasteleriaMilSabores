// src/context/CartContext.js
/**
 * Contexto del carrito de compras.
 * Maneja el estado del carrito, cupones, descuentos y validación de órdenes.
 * 
 * @module CartContext
 */
import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

/** ==== Utils ==== */
/**
 * Formatea un número como moneda chilena (CLP).
 * 
 * @param {number} n - Cantidad a formatear
 * @returns {string} Cantidad formateada como moneda chilena
 */
export function fmtCLP(n) {
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n || 0);
  } catch {
    return `$${(n || 0).toLocaleString('es-CL')}`;
  }
}

/**
 * Calcula la fecha mínima de entrega (próximo día hábil).
 * No se entrega los domingos.
 * 
 * @returns {string} Fecha en formato ISO (YYYY-MM-DD)
 */
function calcularFechaMinimaEntrega() {
  const hoy = new Date();
  let proximaEntrega = new Date(hoy);
  proximaEntrega.setDate(hoy.getDate() + 1); // Mañana como mínimo
  
  // Si mañana es domingo (0), avanzar al lunes (1)
  if (proximaEntrega.getDay() === 0) {
    proximaEntrega.setDate(proximaEntrega.getDate() + 1);
  }
  
  // Retornar en formato YYYY-MM-DD local (sin cambio de zona horaria)
  const year = proximaEntrega.getFullYear();
  const month = String(proximaEntrega.getMonth() + 1).padStart(2, '0');
  const day = String(proximaEntrega.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Base de datos de cupones disponibles.
 * Cada cupón tiene un descuento y fecha de expiración.
 */
const CUPONES = {
  'SABOR10': { descuento: 0.10, expira: '2025-12-31' },
  'PASTEL15': { descuento: 0.15, expira: '2025-11-30' },
  'DUOC20' : { descuento: 0.20, expira: '2025-10-31' },
};

/**
 * Valida si un cupón existe y está vigente.
 * 
 * @param {string} codigo - Código del cupón a validar
 * @returns {Object|null} Datos del cupón si es válido, null si no
 */
function validarCupon(codigo) {
  if (!codigo) return null;
  const cup = CUPONES[codigo.toUpperCase()];
  if (!cup) return null;
  const hoy = new Date();
  if (new Date(cup.expira) < hoy) return null;
  return cup;
}

/**
 * Calcula todos los descuentos aplicables a una orden.
 * Incluye descuentos por monto, anticipación, aniversario y cupones.
 * 
 * @param {number} subtotal - Subtotal de la orden
 * @param {string} fechaEntrega - Fecha de entrega solicitada
 * @param {string} cuponCodigo - Código de cupón a aplicar
 * @returns {Array<Object>} Array de descuentos con key, label y amount
 */
function computeDiscounts(subtotal, fechaEntrega, cuponCodigo) {
  const descs = [];
  const entrega = fechaEntrega ? new Date(fechaEntrega) : null;

  if (subtotal >= 30000) {
    const amt = subtotal * 0.10;
    descs.push({ key: 'monto', label: 'Descuento por monto (10%)', amount: amt });
  }

  if (entrega) {
    const hoy = new Date(); hoy.setHours(0,0,0,0);
    const ent = new Date(entrega); ent.setHours(0,0,0,0);
    const diffDays = (ent - hoy) / (1000 * 60 * 60 * 24);
    if (diffDays >= 3) {
      const amt = subtotal * 0.05;
      descs.push({ key: 'anticipacion', label: 'Reserva anticipada (5%)', amount: amt });
    }
  }

  if (entrega && entrega.getMonth() === 10 && entrega.getDate() === 15) {
    const amt = subtotal * 0.20;
    descs.push({ key: 'aniversario', label: 'Aniversario tienda (20%)', amount: amt });
  }

  const cupon = validarCupon(cuponCodigo);
  if (cupon) {
    const amt = subtotal * cupon.descuento;
    descs.push({
      key: 'cupon',
      label: `Cupón ${cuponCodigo.toUpperCase()} (${Math.round(cupon.descuento * 100)}%)`,
      amount: amt
    });
  }

  return descs;
}

function priceSummary(items, { fechaEntrega, cupon } = {}) {
  const subtotal = items.reduce((acc, it) => acc + (it.precio || 0) * (it.qty || 0), 0);
  const descuentos = computeDiscounts(subtotal, fechaEntrega, cupon);
  const totalDescuentos = descuentos.reduce((a, d) => a + d.amount, 0);
  const subtotalConDescuento = Math.max(subtotal - totalDescuentos, 0);
  
  // Calcular IVA (19%)
  const iva = subtotalConDescuento * 0.19;
  const total = subtotalConDescuento + iva;
  
  return { 
    subtotal, 
    descuentos, 
    subtotalConDescuento,
    iva,
    total 
  };
}

/** ==== Contexto de Carrito ==== */
const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider/>');
  return ctx;
}

function CartProviderInner({ children }) {
  const [items, setItems] = useState([]);           // [{codigo, nombre, precio, stock, imagen, qty}]
  const [fechaEntrega, setFechaEntrega] = useState(() => calcularFechaMinimaEntrega());
  const [cupon, setCupon] = useState('');
  const [toasts, setToasts] = useState([]);        // [{id, message, variant}]

  /** Toasts */
  const pushToast = useCallback((message, variant = 'success') => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
    setToasts(prev => [...prev, { id, message, variant }]);
    // auto-cerrar
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  /** Carrito */
  const addToCart = useCallback((producto, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.codigo === producto.codigo);
      if (idx >= 0) {
        const next = [...prev];
        const nuevo = { ...next[idx], qty: (next[idx].qty || 0) + qty };
        if (Number.isFinite(nuevo.stock)) nuevo.qty = Math.min(nuevo.qty, nuevo.stock);
        next[idx] = nuevo;
        return next;
      }
      const nuevo = { ...producto, qty };
      if (Number.isFinite(nuevo.stock)) nuevo.qty = Math.min(qty, nuevo.stock);
      return [...prev, nuevo];
    });
    // notificación
    pushToast(`Se agregó “${producto.nombre}” al carrito.`, 'success');
  }, [pushToast]);

  const removeFromCart = useCallback((codigo, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.codigo === codigo);
      if (idx < 0) return prev;
      const next = [...prev];
      const nuevoQty = (next[idx].qty || 0) - qty;
      if (nuevoQty <= 0) {
        const prod = next[idx];
        next.splice(idx, 1);
        pushToast(`Se quitó “${prod?.nombre || 'Producto'}” del carrito.`, 'warning');
      } else {
        next[idx] = { ...next[idx], qty: nuevoQty };
        pushToast(`Se actualizó la cantidad del producto.`, 'info');
      }
      return next;
    });
  }, [pushToast]);

  const setQty = useCallback((codigo, qty) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.codigo === codigo);
      if (idx < 0) return prev;
      const next = [...prev];
      const base = next[idx];
      let newQty = Number(qty) || 0;
      if (Number.isFinite(base.stock)) newQty = Math.min(newQty, base.stock);
      if (newQty <= 0) {
        next.splice(idx, 1);
        pushToast(`Se quitó “${base?.nombre || 'Producto'}” del carrito.`, 'warning');
      } else {
        next[idx] = { ...base, qty: newQty };
        pushToast(`Cantidad actualizada: ${newQty}.`, 'info');
      }
      return next;
    });
  }, [pushToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    pushToast('Carrito vacío.', 'warning');
  }, [pushToast]);

  const getPricing = useCallback((opts = {}) => {
    const merged = {
      fechaEntrega: opts.fechaEntrega ?? fechaEntrega,
      cupon: opts.cupon ?? cupon,
    };
    return priceSummary(items, merged);
  }, [items, fechaEntrega, cupon]);

  const validarOrden = useCallback(() => {
    const errores = [];
    
    if (!fechaEntrega) {
      errores.push('Debes seleccionar una fecha de entrega.');
    } else {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
      
      const manana = new Date(hoy);
      manana.setDate(manana.getDate() + 1);
      
      const entrega = new Date(fechaEntrega);
      entrega.setHours(0, 0, 0, 0);
      
      // Validar que sea domingo
      if (entrega.getDay() === 0) {
        errores.push('No entregamos los domingos.');
      }
      
      // Validar que sea al menos mañana
      if (entrega < manana) {
        errores.push('La fecha de entrega debe ser mínimo mañana.');
      }
    }
    
    if (!items.length) {
      errores.push('Tu carrito está vacío.');
    }
    
    if (cupon && !CUPONES[cupon]) {
      errores.push('El cupón ingresado es inválido o está vencido. Puedes quitarlo o ingresar otro.');
    }
    
    return errores;
  }, [items, fechaEntrega, cupon]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    fmtCLP,
    fechaEntrega,
    setFechaEntrega,
    cupon,
    setCupon,
    getPricing,
    validarOrden,
    // toasts
    toasts,
    removeToast,
    pushToast,
  }), [items, addToCart, removeFromCart, setQty, clearCart, fechaEntrega, cupon, getPricing, validarOrden, toasts, removeToast, pushToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Export default + nombrado */
const CartProvider = CartProviderInner;
export default CartProvider;
export { CartProvider };
