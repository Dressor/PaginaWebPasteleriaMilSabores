// src/pages/PropyState.js
import React from 'react';
import Nosotros from './Nosotros';

// Usamos createElement para evitar el runtime JSX en este archivo
export default function PropyState() {
  return React.createElement(Nosotros, null);
}
