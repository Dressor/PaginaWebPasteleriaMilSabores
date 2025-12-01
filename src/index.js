import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // CORRECCIÓN: Agregadas banderas para silenciar advertencias de React Router v7
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);

reportWebVitals();