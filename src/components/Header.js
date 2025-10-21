import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/auth';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia estado y localStorage
    navigate('/', { replace: true }); // redirige al home y evita volver con “atrás”
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg pastel-navbar border-bottom">
        <div className="container-fluid">
          {/* LOGO + NOMBRE */}
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

          {/* MENU RESPONSIVE */}
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
            {/* LINKS IZQUIERDA */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink end className={navClass} to="/">Inicio</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/productos">Productos</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/blogs">Blogs</NavLink></li>
              <li className="nav-item"><NavLink className={navClass} to="/nosotros">Nosotros</NavLink></li>

              {/* LOGIN / USUARIO */}
              {!isAuthenticated ? (
                <li className="nav-item">
                  <NavLink className={navClass} to="/login">Login</NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle bg-transparent border-0"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    👋 {user.username}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            {/* DERECHA: BUSCADOR, TEMA, CARRITO */}
            <div className="d-flex align-items-center gap-2">
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
