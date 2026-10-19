import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-nutrigear mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>NutriGear</h5>
            <p>Suplementos y accesorios deportivos para llevar tu entrenamiento al siguiente nivel.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Navegación</h5>
            <ul className="list-unstyled">
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contacto</h5>
            <p>contacto@nutrigear.cl</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} NutriGear. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
