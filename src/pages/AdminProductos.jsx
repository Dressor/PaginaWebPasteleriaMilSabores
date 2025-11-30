import React, { useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/productosService';
import { useAuth } from '../context/AuthContext';

export default function AdminProductos() {
  const { currentUser, isAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ codigo: '', nombre: '', descripcion: '', categoria: '', precio: '' });

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    obtenerProductos().then(data => {
      setProductos(data);
      setLoading(false);
    }).catch(err => {
      setError('No se pudieron cargar los productos');
      setLoading(false);
    });
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="container py-5">
        <h3>Acceso denegado</h3>
        <p>No tienes permisos para ver esta página.</p>
      </div>
    );
  }

  function resetForm() {
    setEditing(false);
    setForm({ codigo: '', nombre: '', descripcion: '', categoria: '', precio: '' });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await actualizarProducto(form.codigo, { nombre: form.nombre, descripcion: form.descripcion, categoria: form.categoria, precio: Number(form.precio) });
      } else {
        await crearProducto({ codigo: form.codigo, nombre: form.nombre, descripcion: form.descripcion, categoria: form.categoria, precio: Number(form.precio) });
      }
      const updated = await obtenerProductos();
      setProductos(updated);
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto');
    }
  }

  function startEdit(p) {
    setEditing(true);
    setForm({ codigo: p.codigo, nombre: p.nombre || '', descripcion: p.descripcion || '', categoria: p.categoria || '', precio: p.precio != null ? String(p.precio) : '' });
  }

  async function handleDelete(codigo) {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await eliminarProducto(codigo);
      setProductos(prev => prev.filter(x => x.codigo !== codigo));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar el producto');
    }
  }

  return (
    <div className="container py-4">
      <h2>Administrar Productos</h2>
      <p className="text-muted">Usuario: {currentUser?.nombre || currentUser?.email}</p>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editing ? 'Editar producto' : 'Crear producto'}</h5>
          <form onSubmit={handleCreateOrUpdate}>
            <div className="row g-2">
              <div className="col-md-2">
                <label className="form-label">Código</label>
                <input className="form-control" name="codigo" value={form.codigo} onChange={handleChange} disabled={editing} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Nombre</label>
                <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Categoría</label>
                <input className="form-control" name="categoria" value={form.categoria} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio</label>
                <input className="form-control" name="precio" value={form.precio} onChange={handleChange} required />
              </div>
            </div>

            <div className="mt-2">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} rows={2} />
            </div>

            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}>Cargando...</td></tr>
            ) : productos.length === 0 ? (
              <tr><td colSpan={5}>No hay productos.</td></tr>
            ) : (
              productos.map(p => (
                <tr key={p.codigo}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{p.precio}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.codigo)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
