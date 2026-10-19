import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="header-nutrigear">
      <Container>
        <Navbar.Brand as={Link} to="/">NutriGear</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login">Ingresar</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">🛒 Carrito</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
