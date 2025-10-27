// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Login | Pastelería 1000 Sabores'; }, []);

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor ingresa todos los campos');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Email o contraseña incorrectos');
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

            {error && (
              <div className="alert alert-danger mb-3" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-choco w-100 py-2">Entrar</button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-choco fw-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
