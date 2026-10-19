import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { articulos } from "../data/articulos";

// Una sola página sirve para todos los artículos gracias a useParams.
function BlogDetalle() {
  const { id } = useParams();
  const articulo = articulos.find((a) => a.id === Number(id));

  if (!articulo) {
    return (
      <Container as="main" className="py-5">
        <h1>Artículo no encontrado</h1>
        <Link to="/blog">Volver al blog</Link>
      </Container>
    );
  }

  return (
    <Container as="main" className="py-4 articulo">
      <Link to="/blog">← Volver al blog</Link>
      <h1 className="mt-3">{articulo.titulo}</h1>
      <p className="text-muted">{articulo.fecha} · {articulo.autor}</p>
      {articulo.contenido.map((parrafo, i) => (
        <p key={i}>{parrafo}</p>
      ))}
    </Container>
  );
}

export default BlogDetalle;
