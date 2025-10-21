import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('tiene campos de email y password y permite submit', () => {
  render(<Login />);
  const email = screen.getByLabelText(/correo/i);
  const pass  = screen.getByLabelText(/contraseña/i);

  fireEvent.change(email, { target: { value: 'test@ejemplo.com' } });
  fireEvent.change(pass,  { target: { value: '123456' } });

  expect(email).toHaveValue('test@ejemplo.com');
  expect(pass).toHaveValue('123456');

  const btn = screen.getByRole('button', { name: /entrar/i });
  expect(btn).toBeEnabled();
});
