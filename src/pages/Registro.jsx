// src/pages/Registro.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes de error cuando el usuario empieza a escribir
    setError('');
  };

  const validarFormulario = () => {
    if (!formData.nombre.trim()) return 'El nombre es requerido';
    if (!formData.email.trim()) return 'El correo electrónico es requerido';
    if (!formData.email.includes('@')) return 'Ingresa un correo electrónico válido';
    if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmarPassword) return 'Las contraseñas no coinciden';
    return '';
  };

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      // Intentar registrar el usuario
      await register({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password
      });

      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Error al registrar el usuario');
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro | Pastelería 1000 Sabores</title>
      </Helmet>

      <div className="login-page">
        <div className="login-card">
          <h2 className="brand-font text-choco text-center mb-4">Crear cuenta</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3 text-start">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 text-start">
              <label htmlFor="confirmarPassword" className="form-label fw-semibold">Confirmar contraseña</label>
              <input
                id="confirmarPassword"
                name="confirmarPassword"
                type="password"
                className="form-control"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <button type="submit" className="btn btn-choco w-100 py-2">
              Registrarse
            </button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-choco fw-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}