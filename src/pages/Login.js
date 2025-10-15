<<<<<<< HEAD
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // opcional, por si deseas estilos adicionales

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Aquí puedes agregar la lógica de autenticación
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: "url('/images/bg-login.jpg')", // ajusta la ruta si tienes una imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: 420,
    padding: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="text-center mb-4 text-dark fw-bold">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Entrar
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: 14 }}>
          ¿No tienes cuenta? <a href="/register" className="text-decoration-none">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
=======
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
>>>>>>> main
