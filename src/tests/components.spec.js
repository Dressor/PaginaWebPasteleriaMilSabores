import React from 'react';
import { render } from '@testing-library/react';
import CheckoutLoading from '../components/CheckoutLoading';

describe('Componentes simples', () => {
  it('CheckoutLoading se renderiza cuando visible=true y no cuando false', () => {
    const { container: c1 } = render(<CheckoutLoading visible={true} message={'Procesando...'} />);
    // Debe contener el texto del mensaje
    expect(c1.textContent).toContain('Procesando');

    const { container: c2 } = render(<CheckoutLoading visible={false} />);
    // No debe renderizarse (overlay no presente)
    expect(c2.querySelector('.checkout-loading-overlay')).toBeNull();
  });
});
