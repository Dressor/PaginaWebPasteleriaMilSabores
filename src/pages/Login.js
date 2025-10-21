// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Login | Pastelería 1000 Sabores';
    if (isAuthenticated) navigate('/'); // si ya está logueado, redirige
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // login simulado (admin / 123456)
    const res = await login(email, password);
    if (res.ok) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.message || 'Usuario o contraseña incorrectos');
    }
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
              <label htmlFor="email" className="form-label fw-semibold">
                Usuario o correo electrónico
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2 small text-center" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-choco w-100 py-2">Entrar</button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-choco fw-semibold">Regístrate</a>
          </p>
        </div>
      </div>
    </>
  );
}
