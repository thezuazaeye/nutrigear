import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer-nutrigear mt-5 py-4">
      <Container>
        <Row className="gy-3">
          <Col md={4}>
            <h2 className="h5">NutriGear</h2>
            <p className="mb-0 small">Suplementos y accesorios para tu rendimiento deportivo.</p>
          </Col>
          <Col md={4}>
            <h2 className="h5">Enlaces</h2>
            <ul className="list-unstyled mb-0 small">
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h2 className="h5">Contacto</h2>
            <p className="mb-0 small">contacto@nutrigear.cl</p>
            <p className="mb-0 small">© {new Date().getFullYear()} NutriGear</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
