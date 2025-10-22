// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// === Estilos base ===
// 1) Bootstrap primero para poder sobrescribir con tu index.css
import 'bootstrap/dist/css/bootstrap.min.css';
// 2) Iconos (usa la misma tipografía que Bootstrap, OK)
import 'bootstrap-icons/font/bootstrap-icons.css';
// 3) Tus estilos (sobrescriben lo anterior)
import './index.css';

// === JS Bootstrap ===
// Carga el bundle (incluye Popper) para dropdowns, modals, offcanvas, tooltips, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
