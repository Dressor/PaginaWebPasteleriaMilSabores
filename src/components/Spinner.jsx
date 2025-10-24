// src/components/Spinner.jsx
import React from 'react';

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5" role="status" aria-label="Cargando">
      <div className="spinner-border" />
    </div>
  );
}
