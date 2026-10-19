import { Container, Row, Col } from "react-bootstrap";

function Nosotros() {
  return (
    <Container as="main" className="py-5">
      <h1 className="mb-4">Sobre NutriGear</h1>
      <Row className="g-4">
        <Col md={6}>
          <h2 className="h4">Quiénes somos</h2>
          <p>
            NutriGear nace desde las ciencias del deporte: queremos que cada persona que entrena tenga acceso a
            suplementos y accesorios confiables, junto con información clara para usarlos bien.
          </p>
        </Col>
        <Col md={6}>
          <h2 className="h4">Nuestra misión</h2>
          <p>
            Acompañar tu rendimiento con productos de calidad y contenido educativo, sin promesas milagrosas.
          </p>
        </Col>
        <Col md={6}>
          <h2 className="h4">Nuestros valores</h2>
          <ul>
            <li>Transparencia en la información de cada producto.</li>
            <li>Respeto por la evidencia científica.</li>
            <li>Atención cercana a cada cliente.</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;
