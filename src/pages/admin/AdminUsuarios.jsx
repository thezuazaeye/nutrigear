import { useState } from "react";
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, ROLES } from "../../data/productos";
import { useAuth } from "../../context/AuthContext";
import { validarNombre, validarCorreo, validarClave } from "../../utils/validaciones";

const vacio = { nombre: "", correo: "", clave: "", rol: "cliente" };

function AdminUsuarios() {
  const { usuario: sesion } = useAuth();
  const [lista, setLista] = useState(listarUsuarios);
  const [form, setForm] = useState(vacio);
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  const refrescar = () => setLista(listarUsuarios());
  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    const msg = validarNombre(form.nombre) || validarCorreo(form.correo) || validarClave(form.clave);
    if (msg) return setError(msg);
    setError("");
    if (editandoId) actualizarUsuario(editandoId, form);
    else crearUsuario(form);
    setForm(vacio);
    setEditandoId(null);
    refrescar();
  };

  const editar = (u) => {
    setEditandoId(u.id);
    setForm({ nombre: u.nombre, correo: u.correo, clave: u.clave, rol: u.rol });
  };

  const borrar = (u) => {
    if (u.id === sesion.id) return setError("No puedes eliminar tu propio usuario.");
    if (window.confirm(`¿Eliminar a "${u.nombre}"?`)) {
      eliminarUsuario(u.id);
      refrescar();
    }
  };

  return (
    <main>
      <h1>Usuarios</h1>
      <form onSubmit={guardar} className="caja-demo mb-4" noValidate>
        <h2 className="h5">{editandoId ? "Editar usuario" : "Nuevo usuario"}</h2>
        <div className="row g-2">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input id="correo" name="correo" type="email" className="form-control" value={form.correo} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label htmlFor="clave" className="form-label">Contraseña</label>
            <input id="clave" name="clave" type="text" className="form-control" value={form.clave} onChange={cambiar} />
          </div>
          <div className="col-md-6">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select id="rol" name="rol" className="form-select" value={form.rol} onChange={cambiar}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3 mb-0" role="alert">{error}</div>}
        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-nutri">{editandoId ? "Guardar cambios" : "Crear usuario"}</button>
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
            <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th></th></tr>
          </thead>
          <tbody>
            {lista.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td><span className="badge text-bg-secondary">{u.rol}</span></td>
                <td className="text-nowrap">
                  <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => editar(u)}>Editar</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => borrar(u)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminUsuarios;
