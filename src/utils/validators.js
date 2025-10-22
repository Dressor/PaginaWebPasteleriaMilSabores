/**
 * Utilidades de validación para formularios.
 * Funciones reutilizables para validar diferentes tipos de datos.
 * 
 * @module validators
 */

import { REGEX, VALIDATION_MESSAGES } from '../constants';

/**
 * Valida si un campo está vacío.
 * 
 * @param {string} value - Valor a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateRequired = (value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return VALIDATION_MESSAGES.required;
  }
  return null;
};

/**
 * Valida longitud mínima de un string.
 * 
 * @param {string} value - Valor a validar
 * @param {number} minLength - Longitud mínima requerida
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateMinLength = (value, minLength) => {
  if (value && value.length < minLength) {
    return VALIDATION_MESSAGES.minLength(minLength);
  }
  return null;
};

/**
 * Valida longitud máxima de un string.
 * 
 * @param {string} value - Valor a validar
 * @param {number} maxLength - Longitud máxima permitida
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateMaxLength = (value, maxLength) => {
  if (value && value.length > maxLength) {
    return VALIDATION_MESSAGES.maxLength(maxLength);
  }
  return null;
};

/**
 * Valida formato de correo electrónico.
 * 
 * @param {string} email - Email a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateEmail = (email) => {
  if (email && !REGEX.email.test(email)) {
    return VALIDATION_MESSAGES.invalidEmail;
  }
  return null;
};

/**
 * Valida formato de teléfono chileno.
 * 
 * @param {string} phone - Teléfono a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validatePhone = (phone) => {
  if (phone && !REGEX.phone.test(phone)) {
    return VALIDATION_MESSAGES.invalidPhone;
  }
  return null;
};

/**
 * Valida que un valor sea un número.
 * 
 * @param {any} value - Valor a validar
 * @returns {boolean} True si es un número válido
 */
export const validateNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

/**
 * Valida rango numérico.
 * 
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 'Debe ser un número válido';
  }
  if (min !== undefined && num < min) {
    return VALIDATION_MESSAGES.minAmount(min);
  }
  if (max !== undefined && num > max) {
    return VALIDATION_MESSAGES.maxAmount(max);
  }
  return null;
};

/**
 * Valida formato de fecha.
 * 
 * @param {string} dateString - Fecha en formato string
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateDate = (dateString) => {
  if (!dateString) return VALIDATION_MESSAGES.required;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return VALIDATION_MESSAGES.invalidDate;
  }
  return null;
};

/**
 * Valida que una fecha sea futura.
 * 
 * @param {string} dateString - Fecha a validar
 * @param {number} minDaysAhead - Días mínimos en el futuro
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateFutureDate = (dateString, minDaysAhead = 1) => {
  const dateError = validateDate(dateString);
  if (dateError) return dateError;
  
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDaysAhead);
  
  if (selectedDate < minDate) {
    return `La fecha debe ser al menos ${minDaysAhead} día(s) en el futuro`;
  }
  
  return null;
};

/**
 * Valida que una fecha no sea domingo.
 * 
 * @param {string} dateString - Fecha a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateNotSunday = (dateString) => {
  const dateError = validateDate(dateString);
  if (dateError) return dateError;
  
  const date = new Date(dateString);
  if (date.getDay() === 0) {
    return 'No realizamos entregas los domingos';
  }
  
  return null;
};

/**
 * Valida contraseña fuerte.
 * Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
 * 
 * @param {string} password - Contraseña a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateStrongPassword = (password) => {
  if (!password) return VALIDATION_MESSAGES.required;
  
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una mayúscula';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe contener al menos una minúscula';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'La contraseña debe contener al menos un número';
  }
  
  return null;
};

/**
 * Valida que dos campos coincidan (útil para confirmar contraseña).
 * 
 * @param {string} value1 - Primer valor
 * @param {string} value2 - Segundo valor
 * @param {string} fieldName - Nombre del campo para el mensaje
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateMatch = (value1, value2, fieldName = 'Los campos') => {
  if (value1 !== value2) {
    return `${fieldName} no coinciden`;
  }
  return null;
};

/**
 * Ejecuta múltiples validaciones sobre un valor.
 * 
 * @param {any} value - Valor a validar
 * @param {Array<Function>} validators - Array de funciones validadoras
 * @returns {string|null} Primer mensaje de error encontrado o null si todo es válido
 */
export const runValidators = (value, validators) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

/**
 * Sanitiza una entrada de texto eliminando caracteres peligrosos.
 * Previene inyección de código.
 * 
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Elimina < y >
    .trim();
};

/**
 * Valida objeto completo con múltiples campos.
 * 
 * @param {Object} data - Objeto con los datos a validar
 * @param {Object} rules - Objeto con las reglas de validación
 * @returns {Object} Objeto con errores por campo
 * 
 * @example
 * const errors = validateObject(
 *   { email: 'test@test.com', password: '123' },
 *   { 
 *     email: [validateRequired, validateEmail],
 *     password: [(val) => validateMinLength(val, 6)]
 *   }
 * );
 */
export const validateObject = (data, rules) => {
  const errors = {};
  
  for (const field in rules) {
    const validators = rules[field];
    const value = data[field];
    
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        break; // Solo mostrar el primer error por campo
      }
    }
  }
  
  return errors;
};

