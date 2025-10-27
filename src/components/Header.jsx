// src/components/Header.jsx
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  return (
    <header>
      <nav className="navbar navbar-expand-lg pastel-navbar border-bottom">
        <div className="container-fluid">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              className="logo"
              src={logoPasteleria}
              alt="Logo Pastelería 1000 Sabores"
              height={40}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="navbar-brand ms-2 mb-0 brand-font text-choco">
              Pastelería 1000 Sabores
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink end className={navClass} to="/">Inicio</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/productos">Productos</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/blogs">Blogs</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/nosotros">Nosotros</NavLink></li>
              {currentUser && (
                <li className="nav-item"><NavLink className={navClass} to="/mis-pedidos">Mis Pedidos</NavLink></li>
              )}
              {!currentUser && (
                <>
                  <li className="nav-item"><NavLink className={navClass} to="/login">Login</NavLink></li>
                  <li className="nav-item"><NavLink className={navClass} to="/registro">Registrarse</NavLink></li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2">
              <form className="d-none d-md-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar" />
                <button className="btn btn-buscar" type="submit">Buscar</button>
              </form>

              {currentUser && (
                <div className="d-flex align-items-center gap-2 me-2">
                  <span className="small text-muted">
                    Hola, <strong className="text-choco">{currentUser.nombre?.split(' ')[0] || currentUser.nombre || 'Usuario'}</strong>
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-choco"
                    onClick={() => {
                      logout();
                      try { alert('Sesión cerrada con éxito'); } catch {}
                      window.location.reload();
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}

              <ThemeToggle />
              <CartBadge />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
