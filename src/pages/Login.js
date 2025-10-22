// src/pages/Login.jsx
/**
 * Página de inicio de sesión.
 * Permite a los usuarios autenticarse en la aplicación.
 * Incluye validación de formulario y redirección después del login.
 * 
 * @component
 * @returns {JSX.Element} Formulario de inicio de sesión
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Login | Pastelería 1000 Sabores';
    if (isAuthenticated) navigate('/'); // si ya está logueado, redirige
  }, [isAuthenticated, navigate]);

  /**
   * Valida los campos del formulario de login
   * @returns {Object} Objeto con los errores encontrados
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Validación de email/usuario
    if (!email.trim()) {
      newErrors.email = 'El usuario o correo es requerido';
    } else if (email.trim().length < 3) {
      newErrors.email = 'El usuario debe tener al menos 3 caracteres';
    }
    
    // Validación de contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return newErrors;
  };

  /**
   * Maneja el envío del formulario de login
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    // Validar formulario
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <div id="email-error" className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input
                id="password"
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <div id="password-error" className="invalid-feedback">
                  {errors.password}
                </div>
              )}
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
            <Link to="/registro" className="text-choco fw-semibold">Regístrate</Link>
          </p>
        </div>
      </div>
    </>
  );
}
