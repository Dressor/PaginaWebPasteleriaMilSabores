import React, { useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/productosService';
import { useAuth } from '../context/AuthContext';

export default function AdminProductos() {
  const { currentUser, isAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del formulario
  const [editing, setEditing] = useState(false);
  // Agregamos 'imagenBase64' al estado inicial del formulario
  const [form, setForm] = useState({ 
    id: null, 
    codigo: '', 
    nombre: '', 
    descripcion: '', 
    categoria: '', 
    precio: '', 
    imagenBase64: '' 
  });

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    cargarDatos();
  }, [isAdmin]);

  async function cargarDatos() {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch(err) {
      setError('Error cargando productos');
    } finally {
      setLoading(false);
    }
  }

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
    setForm({ id: null, codigo: '', nombre: '', descripcion: '', categoria: '', precio: '', imagenBase64: '' });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // --- FUNCIÓN CLAVE: Convierte el archivo seleccionado a Base64 ---
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Cuando termine de leer el archivo...
      reader.onloadend = () => {
        // El resultado es un string largo: "data:image/jpeg;base64,/9j/4AAQSk..."
        // Lo guardamos en el estado del formulario
        setForm(prev => ({ ...prev, imagenBase64: reader.result }));
      };
      
      // Leemos el archivo como URL de datos
      reader.readAsDataURL(file);
    }
  }

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    try {
      // Preparamos el objeto a enviar al backend
      const payload = { 
        codigo: form.codigo, 
        nombre: form.nombre, 
        descripcion: form.descripcion, 
        categoria: form.categoria, 
        precio: Number(form.precio),
        imagenBase64: form.imagenBase64 // Enviamos la imagen codificada
      };

      if (editing) {
        // Usamos el ID numérico para actualizar
        await actualizarProducto(form.id, payload);
      } else {
        await crearProducto(payload);
      }
      
      await cargarDatos();
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto');
    }
  }

  function startEdit(p) {
    setEditing(true);
    // Cargamos los datos del producto en el formulario, incluyendo la imagen si tiene
    setForm({ 
        id: p.id, 
        codigo: p.codigo, 
        nombre: p.nombre || '', 
        descripcion: p.descripcion || '', 
        categoria: p.categoria || '', 
        precio: p.precio != null ? String(p.precio) : '',
        imagenBase64: p.imagenBase64 || '' 
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await eliminarProducto(id);
      setProductos(prev => prev.filter(x => x.id !== id));
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
                <input className="form-control" type="number" name="precio" value={form.precio} onChange={handleChange} required />
              </div>
            </div>

            {/* SECCIÓN DE CARGA DE IMAGEN */}
            <div className="mt-3">
               <label className="form-label fw-bold">Imagen del Producto</label>
               <input className="form-control" type="file" accept="image/*" onChange={handleImageChange} />
               
               {/* Previsualización si ya hay una imagen cargada o seleccionada */}
               {form.imagenBase64 && (
                 <div className="mt-2">
                    <p className="text-muted small">Vista previa:</p>
                    <img src={form.imagenBase64} alt="Previa" className="img-thumbnail" style={{height: '100px', objectFit: 'contain'}} />
                 </div>
               )}
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
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}>Cargando...</td></tr>
            ) : productos.length === 0 ? (
              <tr><td colSpan={6}>No hay productos.</td></tr>
            ) : (
              productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    {/* Mostrar miniatura en la tabla */}
                    {p.imagenBase64 ? (
                      <img src={p.imagenBase64} alt="mini" style={{width: '50px', height:'50px', objectFit:'cover', borderRadius:'4px'}} />
                    ) : (
                      <span className="text-muted small">Sin img</span>
                    )}
                  </td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
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