// src/pages/Registro.jsx  (reemplaza el contenido actual por este)
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { registrarUsuario } from '../services/authService';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    rut: '',
    fechaNacimiento: '',
    celular: '',
    direccion: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validarFormulario = () => {
    if (!formData.nombre.trim()) return 'El nombre es requerido';
    if (!formData.email.trim()) return 'El correo electrónico es requerido';
    if (!formData.email.includes('@')) return 'Ingresa un correo electrónico válido';
    if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmarPassword) return 'Las contraseñas no coinciden';
    // opcional: validar formato RUT / celular
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorValidacion = validarFormulario();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      const payload = {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        rut: formData.rut,
        fechaNacimiento: formData.fechaNacimiento,
        celular: formData.celular,
        direccion: formData.direccion
      };

      console.log("Enviando payload:", payload);

      const res = await registrarUsuario(payload);

      // si backend devuelve token: guardarlo (opcional)
      if (res?.accessToken) {
        sessionStorage.setItem('accessToken', res.accessToken);
      }

      setSuccess("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => navigate("/login"), 1400);

    } catch (err) {
      console.error(err);
      if (err.response) {
        const backendMsg = err.response.data?.message || JSON.stringify(err.response.data);
        setError(`Error: ${backendMsg}`);
      } else if (err.request) {
        setError('No se recibió respuesta del servidor. Revisa que el backend esté levantado y CORS permitido.');
      } else {
        setError('Error al registrar usuario');
      }
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
            {/* Nombre */}
            <div className="mb-3 text-start">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre completo</label>
              <input id="nombre" name="nombre" type="text" className="form-control"
                value={formData.nombre} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
              <input id="email" name="email" type="email" className="form-control"
                value={formData.email} onChange={handleChange} required />
            </div>

            {/* Password */}
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
              <input id="password" name="password" type="password" className="form-control"
                value={formData.password} onChange={handleChange} required />
            </div>

            {/* Confirmar Password */}
            <div className="mb-3 text-start">
              <label htmlFor="confirmarPassword" className="form-label fw-semibold">Confirmar contraseña</label>
              <input id="confirmarPassword" name="confirmarPassword" type="password" className="form-control"
                value={formData.confirmarPassword} onChange={handleChange} required />
            </div>

            {/* RUT */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">RUT</label>
              <input type="text" name="rut" className="form-control"
                value={formData.rut} onChange={handleChange} required />
            </div>

            {/* Fecha de nacimiento */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Fecha de nacimiento</label>
              <input type="date" name="fechaNacimiento" className="form-control"
                value={formData.fechaNacimiento} onChange={handleChange} required />
            </div>

            {/* Celular */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Celular</label>
              <input type="text" name="celular" className="form-control"
                value={formData.celular} onChange={handleChange} required />
            </div>

            {/* Dirección */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Dirección</label>
              <input type="text" name="direccion" className="form-control"
                value={formData.direccion} onChange={handleChange} required />
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {success && <div className="alert alert-success" role="alert">{success}</div>}

            <button type="submit" className="btn btn-choco w-100 py-2">Registrarse</button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿Ya tienes cuenta? <Link to="/login" className="text-choco fw-semibold">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </>
  );
}
