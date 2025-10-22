import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm'; // ajusta ruta/nombre

describe('LoginForm', () => {
  it('valida campos requeridos', () => {
    render(<LoginForm onSubmit={() => {}} />);
    const submit = screen.getByRole('button', { name: /ingresar|login|entrar/i });
    fireEvent.click(submit);
    // Busca mensajes típicos
    const errorUser = screen.queryByText(/usuario requerido|email requerido/i);
    const errorPass = screen.queryByText(/contraseña requerida|password requerido/i);
    expect(errorUser || errorPass).not.toBeNull();
  });
});
