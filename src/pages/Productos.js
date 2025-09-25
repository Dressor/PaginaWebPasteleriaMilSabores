import React, { useState } from 'react';
import productos from '../data/productos';
import './Home.css'; 

function getCategorias() {

  return [...new Set(productos.map(p => p.categoria))];
}

function Productos() {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

 
  const listaFiltrada = productos.filter(p => {
    const matchCategoria = categoria ? p.categoria === categoria : true;
    const matchBusqueda = busqueda ? p.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true;
    return matchCategoria && matchBusqueda;
  });

  return (
    <>
      <header className="bg-rose-subtle border-bottom">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Inicio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Productos</li>
            </ol>
          </nav>
          <h1 className="brand-font text-choco">Todos los productos</h1>
          <p className="text-muted">Filtra por categoría o busca por nombre.</p>
        </div>
      </header>

      <main className="container py-4">
        <div className="row g-3 align-items-end mb-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {getCategorias().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label className="form-label">Buscar</label>
            <input
              type="search"
              className="form-control"
              placeholder="Ej: torta chocolate"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-grid d-md-flex gap-2">
            <button
              className="btn btn-outline-choco mt-3 mt-md-0"
              onClick={() => { setCategoria(''); setBusqueda(''); }}
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {listaFiltrada.length === 0 && (
            <div className="col">
              <div className="alert alert-warning">No se encontraron productos.</div>
            </div>
          )}
          {listaFiltrada.map(producto => (
            <div className="col" key={producto.codigo}>
              <div className="card h-100 shadow-sm">
                <a
                  className="ratio ratio-1x1 d-block bg-light d-flex align-items-center justify-content-center"
                  href={`/producto/${producto.codigo}`}
                >
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-fluid rounded"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-muted">Sin imagen</span>
                  )}
                </a>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text flex-grow-1">
                    <small className="text-muted">{producto.categoria}</small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>${producto.precio.toLocaleString('es-CL')}</strong>
                    <div className="btn-group">
                      <a href={`/producto/${producto.codigo}`} className="btn btn-outline-choco">Ver</a>
                      <button className="btn btn-rose">Añadir</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Productos;