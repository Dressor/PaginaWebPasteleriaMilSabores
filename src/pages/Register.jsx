// src/pages/Register.jsx
/**
 * Página de registro de nuevos usuarios.
 * Permite crear una cuenta que se almacena en localStorage.
 * 
 * @component
 * @returns {JSX.Element} Formulario de registro
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { motion } from 'framer-motion';
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMatch
} from '../utils/validators';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Registro | Pastelería 1000 Sabores';
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  /**
   * Valida el formulario completo de registro
   * @returns {Object} Objeto con los errores encontrados
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre de usuario
    const usernameError = validateRequired(formData.username) || 
                         validateMinLength(formData.username, 3);
    if (usernameError) newErrors.username = usernameError;
    
    // Validar email
    const emailError = validateRequired(formData.email) || 
                       validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    // Validar contraseña
    const passwordError = validateRequired(formData.password) || 
                         validateMinLength(formData.password, 6);
    if (passwordError) newErrors.password = passwordError;
    
    // Validar confirmación de contraseña
    const confirmError = validateRequired(formData.confirmPassword) ||
                        validateMatch(formData.password, formData.confirmPassword, 'Las contraseñas');
    if (confirmError) newErrors.confirmPassword = confirmError;
    
    return newErrors;
  };

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Maneja el envío del formulario de registro
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    // Validar formulario
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Obtener usuarios existentes
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar si el usuario ya existe
      const userExists = existingUsers.some(
        u => u.email === formData.email || u.username === formData.username
      );
      
      if (userExists) {
        setErrors({ 
          email: 'Este correo o nombre de usuario ya está registrado' 
        });
        return;
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // En producción, esto debería estar hasheado
        createdAt: new Date().toISOString()
      };
      
      // Guardar en localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Mostrar mensaje de éxito
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo al login...');
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setErrors({ form: 'Error al crear la cuenta. Intenta nuevamente.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro | Pastelería 1000 Sabores</title>
        <meta name="description" content="Crea tu cuenta en Pastelería 1000 Sabores" />
      </Helmet>

      <motion.div 
        className="login-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="login-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="brand-font text-choco text-center mb-3">Crear cuenta</h2>
          <p className="text-center text-muted mb-4">Únete a nuestra comunidad</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-3 text-start">
              <label htmlFor="username" className="form-label fw-semibold">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Tu nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
                aria-required="true"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <div id="username-error" className="invalid-feedback">
                  {errors.username}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
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

            {/* Password */}
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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

            {/* Confirm Password */}
            <div className="mb-3 text-start">
              <label htmlFor="confirmPassword" className="form-label fw-semibold">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                aria-required="true"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
              />
              {errors.confirmPassword && (
                <div id="confirm-error" className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Error general */}
            {errors.form && (
              <div className="alert alert-danger py-2 small text-center" role="alert">
                {errors.form}
              </div>
            )}

            {/* Mensaje de éxito */}
            {success && (
              <motion.div 
                className="alert alert-success py-2 small text-center" 
                role="alert"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {success}
              </motion.div>
            )}

            <motion.button 
              type="submit" 
              className="btn btn-choco w-100 py-2 mb-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Crear cuenta
            </motion.button>
          </form>

          <p className="text-center text-muted mt-3 mb-0 small">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-choco fw-semibold">
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
