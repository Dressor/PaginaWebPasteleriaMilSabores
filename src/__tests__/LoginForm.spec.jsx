import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthProvider } from '../context/auth';

describe('Login Page', () => {
  it('debe renderizar el formulario de login', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/usuario o correo/i)).toBeTruthy();
    expect(screen.getByLabelText(/contraseña/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeTruthy();
  });

  it('debe validar campos vacíos', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const errors = screen.queryAllByText(/requerido|debe tener al menos/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
