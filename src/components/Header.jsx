// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import logoPasteleria from '../assets/img/logo.png';
import CartBadge from './CartBadge';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import productos from '../data/productos';
import { Link as RouterLink } from 'react-router-dom';

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

export default function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Sincronizar el input del header con ?q= en la URL cuando la ruta cambie.
  // Esto permite que al navegar desde Header -> Productos (o al abrir /productos?q=...)
  // el input muestre el término buscado.
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const q = params.get('q') || '';
      // Actualizamos sólo cuando la query cambió desde la URL (no mientras se escribe)
      if (q !== searchTerm) setSearchTerm(q);
    } catch (err) {
      // no hagas nada si URLSearchParams falla
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  const { currentUser, logout } = useAuth();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [fadeLogout, setFadeLogout] = useState(false);

  const handleLogout = () => {
    try {
      logout();
    } catch (err) {
      // ignore
    }
    // Mostrar mensaje centrado, con entrada suave y luego desvanecer
    setFadeLogout(false);
    setShowLogoutMsg(true);
    // Después de 1.5s comenzamos fade-out
    setTimeout(() => setFadeLogout(true), 1500);
    // Tras el fade completado navegamos y (opcional) recargamos
    setTimeout(() => {
      setShowLogoutMsg(false);
      setFadeLogout(false);
      try { navigate('/'); } catch (e) {}
      try { window.location.reload(); } catch (e) {}
    }, 1850);
  };
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
              <form
                className="d-none d-md-flex"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = (searchTerm || '').trim();
                  if (!q) return;
                  // Heurística simple: si el término sugiere recetas/blogs, vamos a /blogs
                  const blogKeywords = /(receta|recetas|blog|noticia|noticias)/i;
                  if (blogKeywords.test(q)) {
                    navigate(`/blogs?q=${encodeURIComponent(q)}`);
                  } else {
                    navigate(`/productos?q=${encodeURIComponent(q)}`);
                  }
                }}
              >
                <div style={{ position: 'relative' }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar"
                  value={searchTerm}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchTerm(v);
                    const q = (v || '').trim().toLowerCase();
                    if (!q) return setSuggestions([]);
                    // Buscar en productos por nombre, categoria o descripcion
                    const matches = productos.filter(p => (
                      p.nombre?.toLowerCase().includes(q) ||
                      p.categoria?.toLowerCase().includes(q) ||
                      p.descripcion?.toLowerCase().includes(q)
                    )).slice(0, 6);
                    setSuggestions(matches);
                  }}
                  onFocus={() => {
                    if (searchTerm) {
                      const q = searchTerm.trim().toLowerCase();
                      const matches = productos.filter(p => (
                        p.nombre?.toLowerCase().includes(q) ||
                        p.categoria?.toLowerCase().includes(q) ||
                        p.descripcion?.toLowerCase().includes(q)
                      )).slice(0, 6);
                      setSuggestions(matches);
                    }
                  }}
                  onBlur={() => {
                    // cerramos el dropdown con un pequeño delay para permitir clicks
                    setTimeout(() => setSuggestions([]), 150);
                  }}
                />
                {suggestions && suggestions.length > 0 && (
                  <ul className="list-group position-absolute" style={{ zIndex: 1050, width: '100%', top: '40px' }}>
                    {suggestions.map(s => (
                      <li key={s.codigo} className="list-group-item list-group-item-action p-2">
                        <RouterLink
                          to={`/producto/${s.codigo}`}
                          onMouseDown={(e) => e.preventDefault()} // evitar blur antes del click
                          className="text-decoration-none text-dark d-block"
                        >
                          <small className="text-muted">{s.categoria}</small>
                          <div><strong>{s.nombre}</strong></div>
                        </RouterLink>
                      </li>
                    ))}
                    <li className="list-group-item p-2">
                      <RouterLink to={`/productos?q=${encodeURIComponent(searchTerm)}`} onMouseDown={(e) => e.preventDefault()} className="text-decoration-none">
                        Ver todos los resultados para "{searchTerm}"
                      </RouterLink>
                    </li>
                  </ul>
                )}
                </div>
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
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}

              {showLogoutMsg && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    position: 'fixed',
                    top: '35%',
                    left: '50%',
                    transform: fadeLogout ? 'translate(-50%, -48%) scale(0.98)' : 'translate(-50%, -50%) scale(1)',
                    opacity: fadeLogout ? 0 : 1,
                    transition: 'opacity 300ms ease, transform 300ms ease',
                    zIndex: 2000,
                    background: 'linear-gradient(180deg,#fff,#fffefc)',
                    padding: '18px 28px',
                    borderRadius: 14,
                    border: '1px solid rgba(90,59,46,0.08)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                    textAlign: 'center',
                    minWidth: 300,
                    color: '#3b2b23'
                  }}
                >
                  <div style={{ fontSize: 18, color: '#5a3b2e', marginBottom: 6, fontWeight: 700 }}>
                    Sesión finalizada con éxito
                  </div>
                  <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 8 }}>Vuelva pronto</div>
                  <div style={{ fontSize: 12, color: '#8a8a8a' }}>Se cerró su sesión correctamente.</div>
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
