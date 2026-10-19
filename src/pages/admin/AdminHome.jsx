import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { listarProductos, listarUsuarios } from "../../data/productos";

function AdminHome() {
  const { usuario } = useAuth();
  const productos = listarProductos();
  const sinStock = productos.filter((p) => p.stock <= 0).length;

  return (
    <main>
      <h1>Panel de administración</h1>
      <p className="text-muted">Bienvenido/a, {usuario.nombre}.</p>
      <div className="row g-3">
        <div className="col-sm-6 col-xl-4">
          <div className="tarjeta-admin">
            <p className="display-6 mb-0">{productos.length}</p>
            <p className="mb-2">Productos ({sinStock} sin stock)</p>
            <Link to="/admin/productos">Gestionar productos</Link>
          </div>
        </div>
        {usuario.rol === "admin" && (
          <div className="col-sm-6 col-xl-4">
            <div className="tarjeta-admin">
              <p className="display-6 mb-0">{listarUsuarios().length}</p>
              <p className="mb-2">Usuarios</p>
              <Link to="/admin/usuarios">Gestionar usuarios</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminHome;
