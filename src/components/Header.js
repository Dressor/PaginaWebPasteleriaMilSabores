<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import logopasteleria from "../assets/img/logopasteleria.png";
=======
// src/components/Header.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
>>>>>>> main

export default function Header() {
  return (
    <header>
<<<<<<< HEAD
      <nav className="navbar navbar-expand-lg pastel-navbar">
        <div className="container-fluid">
          <img
            className="logo"
            src={logopasteleria}
            alt="Logo Pastelería"
          />
          <a className="navbar-brand ms-3" href="#">
            Pastelería Mil Sabores
          </a>
=======
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

>>>>>>> main
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
<<<<<<< HEAD
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
=======
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Abrir menú"
>>>>>>> main
          >
            <span className="navbar-toggler-icon"></span>
          </button>

<<<<<<< HEAD
          <div className="collapse navbar-collapse" id="header">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-decoration-none">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <a 
                  id="txtregistro"
                  className="nav-link" 
                  href="registro.html">
                  Registrarse
                </a>
              </li>
              <li className="nav-item">
                <a
                  id="txtnoticias"
                  className="nav-link"
                  href="https://www.duoc.cl/noticias/"
                >
                  Blogs y Noticias
                </a>
              </li>
              <li className="nav-item">
                <a
                  id="txtrecetas"
                  className="nav-link"
                  href="perfil-usuario.html"
                >
                  Perfil
                </a>
              </li>
              <li className="nav-item">
                <a id="txtconsejos" className="nav-link" href="#">
                  Consejos
                </a>
              </li>
              <li className="av-item">
                <a className="nav-link" href="" id="txtsalir">
                  Salir
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  id="txtmenu"
                  className="nav-link dropdown-toggle"
                  href="menu.html"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Menú
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="menu.html">
                      Pasteles
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="menu.html">
                      Galletas
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="menu.html">
                      Dulces
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="administrador.html">
                      Administrador
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <button className="btn btn-buscar" type="submit">
                Buscar
              </button>
            </form>
=======
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink end className={navClass} to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/productos">Productos</NavLink>
              </li>
              {/* 👉 nuevo enlace a Blogs */}
              <li className="nav-item">
                <NavLink className={navClass} to="/blogs">Blogs</NavLink>
              </li>
              {/* el menú apunta a /nosotros; /propyState queda como alias por compatibilidad */}
              <li className="nav-item">
                <NavLink className={navClass} to="/nosotros">Nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navClass} to="/login">Login</NavLink>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <form className="d-none d-md-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <input className="form-control me-2" type="search" placeholder="Buscar..." aria-label="Buscar" />
                <button className="btn btn-buscar" type="submit">Buscar</button>
              </form>

              <ThemeToggle />
              <CartBadge />
            </div>
>>>>>>> main
          </div>
        </div>
      </nav>
    </header>
  );
}
