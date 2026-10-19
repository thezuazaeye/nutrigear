import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { articulos } from "../data/articulos";

function Blog() {
  return (
    <Container as="main" className="py-4">
      <h1 className="mb-4">Blog</h1>
      <Row className="g-4">
        {articulos.map((a) => (
          <Col key={a.id} md={6} lg={4}>
            <article className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <p className="small text-muted mb-1">{a.fecha} · {a.autor}</p>
                <h2 className="h5">{a.titulo}</h2>
                <p>{a.resumen}</p>
                <Link to={`/blog/${a.id}`} className="btn btn-outline-success mt-auto align-self-start">Leer más</Link>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blog;
