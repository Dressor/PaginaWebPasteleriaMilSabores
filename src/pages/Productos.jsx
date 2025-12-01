import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../services/productosService';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("Hubo un problema cargando el catálogo.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container py-5 text-center text-danger">
      <h3>⚠️ {error}</h3>
    </div>
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 display-5 fw-bold" style={{ color: '#d63384' }}>
        Nuestros Sabores
      </h2>
      
      {productos.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay productos disponibles en este momento. ¡Vuelve pronto!
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productos.map((p) => (
            <div className="col" key={p.id}>
              <div className="card h-100 shadow-sm border-0">
                {/* Contenedor de Imagen */}
                <div style={{ height: '250px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                    <img 
                      // LÓGICA DE IMAGEN: Usamos directamente el string Base64.
                      // Si viene vacío o null, usamos un placeholder.
                      src={p.imagenBase64 || "https://via.placeholder.com/300x200?text=Sin+Imagen"} 
                      className="card-img-top w-100 h-100" 
                      style={{ objectFit: 'cover' }}
                      alt={p.nombre} 
                    />
                </div>
                
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{p.nombre}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {p.descripcion ? p.descripcion.substring(0, 80) + '...' : 'Sin descripción'}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fs-5 fw-bold text-primary">
                      ${p.precio?.toLocaleString('es-CL') || '0'}
                    </span>
                    {/* Enlace al detalle usando el código del producto */}
                    <Link to={`/producto/${p.codigo}`} className="btn btn-outline-dark btn-sm rounded-pill px-3">
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}