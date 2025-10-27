import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';

test('muestra el spinner de carga inicial (Suspense fallback)', () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );

  // Al montar App las rutas están lazy; el fallback es un spinner con role="status"
  const spinner = screen.getByRole('status');
  expect(spinner).toBeInTheDocument();
});
