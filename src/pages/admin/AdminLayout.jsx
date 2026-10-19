import { NavLink, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

// Plantilla del panel: menú lateral + <Outlet/> donde se dibuja la ruta hija.
function AdminLayout() {
  const { usuario } = useAuth();
  return (
    <Container fluid className="py-3">
      <Row>
        <Col lg={2} md={3} className="mb-3">
          <nav className="admin-menu" aria-label="Menú de administración">
            <p className="small text-muted mb-2">Rol: {usuario.rol}</p>
            <NavLink to="/admin" end className="admin-link">Inicio</NavLink>
            <NavLink to="/admin/productos" className="admin-link">Productos</NavLink>
            {usuario.rol === "admin" && <NavLink to="/admin/usuarios" className="admin-link">Usuarios</NavLink>}
          </nav>
        </Col>
        <Col lg={10} md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;
