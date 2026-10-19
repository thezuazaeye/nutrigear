import { useState } from "react";
import {
  listarProductos, crearProducto, actualizarProducto, eliminarProducto,
  CATEGORIAS, IMAGENES, formatearPrecio,
} from "../../data/productos";

const vacio = { nombre: "", precio: "", categoria: CATEGORIAS[0], stock: "", imagen: "whey", descripcion: "" };

function AdminProductos() {
  const [lista, setLista] = useState(listarProductos);
  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  const refrescar = () => setLista(listarProductos());
  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
    if (form.precio === "" || Number(form.precio) <= 0) return setError("El precio debe ser mayor a 0.");
    if (form.stock === "" || Number(form.stock) < 0) return setError("El stock no puede ser negativo.");
    setError("");
    if (editandoId) actualizarProducto(editandoId, form);
    else crearProducto(form);
    setForm(vacio);
    setEditandoId(null);
    refrescar();
  };

  const editar = (p) => {
    setEditandoId(p.id);
    setForm({ nombre: p.nombre, precio: p.precio, categoria: p.categoria, stock: p.stock, imagen: p.imagen, descripcion: p.descripcion });
  };

  const borrar = (p) => {
    if (window.confirm(`¿Eliminar "${p.nombre}"?`)) {
      eliminarProducto(p.id);
      refrescar();
    }
  };

  return (
    <main>
      <h1>Productos</h1>
      <form onSubmit={guardar} className="caja-demo mb-4" noValidate>
        <h2 className="h5">{editandoId ? "Editar producto" : "Nuevo producto"}</h2>
        <div className="row g-2">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={cambiar} />
          </div>
          <div className="col-md-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input id="precio" name="precio" type="number" className="form-control" value={form.precio} onChange={cambiar} />
          </div>
          <div className="col-md-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input id="stock" name="stock" type="number" className="form-control" value={form.stock} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select id="categoria" name="categoria" className="form-select" value={form.categoria} onChange={cambiar}>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="imagen" className="form-label">Imagen</label>
            <select id="imagen" name="imagen" className="form-select" value={form.imagen} onChange={cambiar}>
              {Object.keys(IMAGENES).map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows="2" className="form-control" value={form.descripcion} onChange={cambiar} />
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-nutri">{editandoId ? "Guardar cambios" : "Crear producto"}</button>
          {editandoId && (
            <button type="button" className="btn btn-outline-secondary" onClick={() => { setEditandoId(null); setForm(vacio); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearPrecio(p.precio)}</td>
                <td>{p.stock}</td>
                <td className="text-nowrap">
                  <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => editar(p)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => borrar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminProductos;
