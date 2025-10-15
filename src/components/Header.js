// src/components/Header.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg pastel-navbar border-bottom shadow-sm">
        <div className="container-fluid">
          {/* Logo + Nombre */}
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              className="logo"
              src={logoPasteleria}
              alt="Logo Pastelería 1000 Sabores"
              height={40}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="navbar-brand ms-2 mb-0 brand-font text-choco fs-4 fw-bold">
              Pastelería 1000 Sabores
            </span>
          </Link>

          {/* Botón hamburguesa */}
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

          {/* Menú principal */}
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink end className={navClass} to="/">Inicio</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navClass} to="/productos">Productos</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navClass} to="/blogs">Blogs</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navClass} to="/nosotros">Nosotros</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={navClass} to="/login">Login</NavLink>
              </li>
            </ul>

            {/* Búsqueda + íconos */}
            <div className="d-flex align-items-center gap-3">
              <form className="d-none d-md-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar"
                />
                <button className="btn btn-buscar" type="submit">Buscar</button>
              </form>

              <ThemeToggle />
              <CartBadge />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
