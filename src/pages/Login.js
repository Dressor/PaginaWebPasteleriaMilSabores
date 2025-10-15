// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { document.title = 'Login | Pastelería 1000 Sabores'; }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: reemplazar por tu lógica real de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <Helmet>
        <title>Login | Pastelería 1000 Sabores</title>
      </Helmet>

      <div className="login-page">
        <div className="login-card">
          <h2 className="brand-font text-choco text-center mb-3">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-choco w-100 py-2">Entrar</button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-choco fw-semibold">Regístrate</a>
            {/* Cambia "#" por tu ruta real cuando exista, ej: to="/registro" si usas React Router */}
          </p>
        </div>
      </div>
    </>
  );
}
