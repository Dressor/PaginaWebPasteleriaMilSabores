// src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-container mt-4 text-center text-muted py-3 border-top">
      <div className="footer-content d-flex justify-content-around flex-wrap">

        <div>
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">📧 pasteleriamilsabores@gmail.com</p>
          <p className="footer-text">📞 +56 9 9999 9999</p>
          <p className="footer-text">📍 Santiago, Chile</p>
        </div>

        <div>
          <h3 className="footer-title">Enlaces</h3>
          <div className="footer-links d-flex flex-column">
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Acerca de</a>
            <a href="#">Contacto</a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Síguenos</h3>
          <div className="social d-flex justify-content-center gap-3">
            <a href="#" className="twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.384 4.482A13.945 13.945 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.573A4.9 4.9 0 0 1 .964 9.1v.062a4.917 4.917 0 0 0 3.946 4.817 4.996 4.996 0 0 1-2.212.084 4.93 4.93 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54 13.94 13.94 0 0 0 7.548 21.5c9.058 0 14.01-7.514 14.01-14.02 0-.213-.004-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
              </svg>
            </a>

            <a href="#" className="facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.92.001c-1.506 0-1.797.716-1.797 1.765v2.315h3.591l-.467 3.622h-3.124V24h6.126C23.406 24 24 23.406 24 22.676V1.325C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>

            <a href="#" className="instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608C4.516 2.496 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.093 12 2.093m0-2.093C8.741 0 8.332.013 7.052.072 5.771.132 4.615.36 3.677 1.297c-.938.938-1.165 2.094-1.225 3.375C2.013 5.953 2 6.362 2 9.621v4.758c0 3.259.013 3.668.072 4.948.06 1.281.287 2.437 1.225 3.375.938.938 2.094 1.165 3.375 1.225 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.281-.06 2.437-.287 3.375-1.225.938-.938 1.165-2.094 1.225-3.375.059-1.28.072-1.689.072-4.948V9.621c0-3.259-.013-3.668-.072-4.948-.06-1.281-.287-2.437-1.225-3.375C19.385.36 18.229.132 16.948.072 15.668.013 15.259 0 12 0z" />
                <path d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.169 6.169 0 0 0 12 5.838zm0 10.141A3.979 3.979 0 1 1 15.979 12 3.987 3.987 0 0 1 12 15.979zM18.406 4.594a1.44 1.44 0 1 0 1.44 1.44 1.441 1.441 0 0 0-1.44-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom mt-3">
        © 2025 Pastelería 1000 Sabores — Todos los derechos reservados.
      </div>
    </footer>
  );
}
