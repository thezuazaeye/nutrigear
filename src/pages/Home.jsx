import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { listarProductos, CATEGORIAS } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

const beneficios = [
  { icono: "🚚", titulo: "Despacho a todo Chile", texto: "Recibe tus suplementos donde estés." },
  { icono: "✅", titulo: "Productos de calidad", texto: "Seleccionamos marcas confiables." },
  { icono: "💳", titulo: "Pago seguro", texto: "Compra con tranquilidad." },
  { icono: "💬", titulo: "Asesoría deportiva", texto: "Contenido educativo en nuestro blog." },
];

function Home() {
  const { agregar } = useCarrito();
  const destacados = listarProductos().filter((p) => p.stock > 0).slice(0, 4);

  return (
    <main>
      <section className="hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-5 fw-bold">Rinde más. Recupérate mejor.</h1>
              <p className="lead">
                Suplementos y accesorios deportivos pensados para quienes se toman en serio su entrenamiento.
              </p>
              <Link to="/productos" className="btn btn-nutri btn-lg me-2">Ver productos</Link>
              <Link to="/blog" className="btn btn-outline-light btn-lg">Leer el blog</Link>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="mt-4">
        <Row className="g-3 text-center">
          {beneficios.map((b) => (
            <Col key={b.titulo} xs={6} lg={3}>
              <div className="beneficio h-100">
                <div className="beneficio-icono" aria-hidden="true">{b.icono}</div>
                <h2 className="h6 mb-1">{b.titulo}</h2>
                <p className="small text-muted mb-0">{b.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-5">
        <h2 className="titulo-seccion">Categorías</h2>
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <Link key={c} to={`/productos?categoria=${encodeURIComponent(c)}`} className="chip-categoria">
              {c}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="mt-5">
        <h2 className="titulo-seccion">Productos destacados</h2>
        <Row className="g-4">
          {destacados.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={3}>
              <ProductCard producto={p} onAgregar={agregar} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Home;
