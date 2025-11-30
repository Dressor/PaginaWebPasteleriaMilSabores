import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ soloAdmin = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();

  // 1. Mientras verificamos la sesión, no mostramos nada (o podrías poner un Spinner)
  if (loading) return null;

  // 2. Si no hay usuario logueado, mandar al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si la ruta es solo para admins y el usuario NO es admin
  if (soloAdmin && !isAdmin) {
    // Lo redirigimos al home (o a una página de "Acceso Denegado")
    return <Navigate to="/" replace />;
  }

  // 4. Si pasa todas las validaciones, renderizamos el contenido (la ruta hija)
  return <Outlet />;
};

export default RutaProtegida;