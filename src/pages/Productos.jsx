import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { listarProductos, CATEGORIAS } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

function Productos() {
  const { agregar } = useCarrito();
  // Los filtros viven en la URL (?q=...&categoria=...) gracias a useSearchParams.
  const [params, setParams] = useSearchParams();
  const busqueda = params.get("q") || "";
  const categoria = params.get("categoria") || "";

  const actualizar = (clave, valor) => {
    const nuevos = new URLSearchParams(params);
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave);
    setParams(nuevos);
  };

  const filtrados = listarProductos().filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (!categoria || p.categoria === categoria)
  );

  return (
    <Container as="main" className="py-4">
      <h1 className="mb-3">Productos</h1>
      <Row className="g-2 mb-4">
        <Col md={8}>
          <input
            type="search"
            className="form-control"
            placeholder="Buscar producto..."
            aria-label="Buscar producto"
            value={busqueda}
            onChange={(e) => actualizar("q", e.target.value)}
          />
        </Col>
        <Col md={4}>
          <select
            className="form-select"
            aria-label="Filtrar por categoría"
            value={categoria}
            onChange={(e) => actualizar("categoria", e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Col>
      </Row>

      {filtrados.length === 0 ? (
        <p className="text-muted">No encontramos productos con esos filtros.</p>
      ) : (
        <Row className="g-4">
          {filtrados.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4}>
              <ProductCard producto={p} onAgregar={agregar} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Productos;
