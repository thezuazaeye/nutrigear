import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import { getImagen, formatearPrecio } from "../data/productos";

function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total } = useCarrito();

  if (items.length === 0) {
    return (
      <Container as="main" className="py-5 text-center">
        <h1>Tu carrito está vacío</h1>
        <p className="text-muted">Agrega productos desde el catálogo.</p>
        <Link to="/productos" className="btn btn-nutri">Ir a productos</Link>
      </Container>
    );
  }

  return (
    <Container as="main" className="py-4">
      <h1 className="mb-3">Carrito</h1>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th style={{ width: 160 }}>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>
                  <img src={getImagen(i.imagen)} alt="" className="carrito-img me-2" />
                  {i.nombre}
                </td>
                <td>{formatearPrecio(i.precio)}</td>
                <td>
                  <div className="input-group input-group-sm">
                    <button type="button" className="btn btn-outline-secondary" aria-label={`Quitar una unidad de ${i.nombre}`} onClick={() => cambiarCantidad(i.id, i.cantidad - 1)}>−</button>
                    <span className="form-control text-center">{i.cantidad}</span>
                    <button type="button" className="btn btn-outline-secondary" aria-label={`Agregar una unidad de ${i.nombre}`} onClick={() => cambiarCantidad(i.id, i.cantidad + 1)}>+</button>
                  </div>
                </td>
                <td>{formatearPrecio(i.precio * i.cantidad)}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => quitar(i.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={vaciar}>Vaciar carrito</button>
        <p className="fs-4 mb-0">Total: <strong data-testid="total-carrito">{formatearPrecio(total)}</strong></p>
      </div>
    </Container>
  );
}

export default Carrito;
