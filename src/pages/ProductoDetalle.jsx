import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { obtenerProducto, getImagen, formatearPrecio } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

function ProductoDetalle() {
  const { id } = useParams(); // viene de la ruta /productos/:id
  const { agregar } = useCarrito();
  const producto = obtenerProducto(id);

  if (!producto) {
    return (
      <Container as="main" className="py-5">
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver al catálogo</Link>
      </Container>
    );
  }

  const sinStock = producto.stock <= 0;

  return (
    <Container as="main" className="py-4">
      <Link to="/productos">← Volver al catálogo</Link>
      <Row className="mt-3 g-4">
        <Col md={5}>
          <img src={getImagen(producto.imagen)} alt={producto.nombre} className="img-fluid rounded detalle-img" />
        </Col>
        <Col md={7}>
          <span className="badge producto-badge-inline">{producto.categoria}</span>
          <h1 className="mt-2">{producto.nombre}</h1>
          <p className="producto-precio fs-3">{formatearPrecio(producto.precio)}</p>
          <p>{producto.descripcion}</p>
          <p className={sinStock ? "text-danger" : "text-muted"}>
            {sinStock ? "Sin stock" : `Stock: ${producto.stock} unidades`}
          </p>
          <button type="button" className="btn btn-nutri btn-lg" disabled={sinStock} onClick={() => agregar(producto)}>
            {sinStock ? "Agotado" : "Agregar al carrito"}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductoDetalle;
