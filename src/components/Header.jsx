import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

function Header() {
  const { usuario, cerrarSesion } = useAuth();
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const esStaff = usuario && (usuario.rol === "admin" || usuario.rol === "vendedor");

  const salir = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="header-nutrigear">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nutri<span className="marca-acento">Gear</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            {esStaff && (
              <Nav.Link as={NavLink} to="/admin" className="enlace-admin">Panel admin</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-lg-center">
            {usuario ? (
              <>
                <span className="navbar-text me-lg-2" data-testid="nombre-usuario">
                  Hola, {usuario.nombre.split(" ")[0]}
                </span>
                <button type="button" className="btn btn-sm btn-outline-light me-lg-3 my-2 my-lg-0" onClick={salir}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Ingresar</Nav.Link>
                <Nav.Link as={NavLink} to="/registro">Registro</Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/carrito">
              Carrito{" "}
              <Badge bg="warning" text="dark" pill data-testid="contador-carrito">{cantidadTotal}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
