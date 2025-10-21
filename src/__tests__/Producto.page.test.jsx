// src/__tests__/Producto.page.test.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Producto from '../pages/Producto';
import { renderWithProviders } from '../test-utils';

function renderWithRoute(path) {
  return renderWithProviders(
    <Routes>
      <Route path="/producto/:code" element={<Producto />} />
    </Routes>,
    { route: path }
  );
}

test('muestra alerta cuando el producto no existe', () => {
  const { getByText } = renderWithRoute('/producto/NO-EXISTE');
  expect(getByText(/producto no encontrado/i)).toBeInTheDocument();
});
