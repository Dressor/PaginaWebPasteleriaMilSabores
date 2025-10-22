import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard'; // ajusta la ruta si difiere

describe('ProductCard', () => {
  it('muestra título y precio, y dispara onAdd al click', () => {
    const onAdd = jasmine.createSpy('onAdd');
    render(<ProductCard title="Torta Chocolate" price={12990} onAdd={onAdd} />);
    expect(screen.getByText(/torta chocolate/i)).toBeTruthy();
    expect(screen.getByText(/\$?\s?12\.990|12.990/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button'));
    expect(onAdd).toHaveBeenCalled();
  });
});
