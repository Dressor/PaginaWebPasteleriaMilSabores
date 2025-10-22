import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart'; // ajusta ruta

const sample = [
  { id: 1, title: 'Torta A', price: 5000, qty: 1 },
  { id: 2, title: 'Torta B', price: 3000, qty: 2 },
];

describe('Cart', () => {
  it('calcula total y permite eliminar', () => {
    const onRemove = jasmine.createSpy('onRemove');
    render(<Cart items={sample} onRemove={onRemove} />);
    expect(screen.getByText(/torta a/i)).toBeTruthy();
    expect(screen.getByText(/torta b/i)).toBeTruthy();
    // Total esperado: 5000 + (3000*2) = 11000
    const total = screen.getByText(/11\.000|11,000|11000/);
    expect(total).toBeTruthy();

    const removeButtons = screen.getAllByRole('button', { name: /eliminar|remove/i });
    fireEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalled();
  });
});
