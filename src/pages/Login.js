import React from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Pastelería 1000 Sabores</title>
      </Helmet>

      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-cream">
        <div className="card p-4 shadow-sm" style={{ maxWidth: 400, width: '100%' }}>
          <h2 className="brand-font text-choco text-center mb-3">Iniciar sesión</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" />
            </div>
            <button type="submit" className="btn btn-choco w-100">Entrar</button>
          </form>
          <p className="text-center text-muted mt-3 mb-0 small">
            ¿No tienes cuenta? <a href="#" className="text-choco fw-semibold">Regístrate</a>
          </p>
        </div>
      </div>
    </>
  );
}
