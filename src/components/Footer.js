export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">📧 pasteleriamilsabores@gmail.com</p>
          <p className="footer-text">📞 +569 9999 9999</p>
          <p className="footer-text">📍 Santiago, Chile</p>
        </div>
        <div>
          <h3 className="footer-title">Enlaces</h3>
          <div className="footer-links">
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Acerca de</a>
            <a href="#">Contacto</a>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Síguenos</h3>
          <div className="social">
            <a href="#" className="twitter">
              <svg viewBox="0 0 24 24">
                <path d="M24 4.557c-..." />
              </svg>
            </a>
            <a href="#" className="facebook">
              <svg viewBox="0 0 24 24">
                <path d="M22.46 6c-..." />
              </svg>
            </a>
            <a href="#" className="instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12.017 0c-..." />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Mi Página Web. Todos los derechos reservados.
      </div>
    </footer>
  );
}
