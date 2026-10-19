import { Link } from "react-router-dom";
import { getImagen, formatearPrecio } from "../data/productos";

// Tarjeta de producto. Recibe por PROPS el producto y la función onAgregar.
function ProductCard({ producto, onAgregar }) {
  const sinStock = producto.stock <= 0;

  return (
    <div className="card h-100 producto-card shadow-sm">
      <Link to={`/productos/${producto.id}`} className="producto-img-wrap">
        <img src={getImagen(producto.imagen)} alt={producto.nombre} className="producto-img" />
        <span className="badge producto-badge">{producto.categoria}</span>
      </Link>
      <div className="card-body d-flex flex-column">
        <h2 className="h6 card-title">
          <Link to={`/productos/${producto.id}`} className="text-decoration-none text-reset">
            {producto.nombre}
          </Link>
        </h2>
        <p className="producto-precio mb-1">{formatearPrecio(producto.precio)}</p>
        <p className={`small mb-3 ${sinStock ? "text-danger" : "text-muted"}`}>
          {sinStock ? "Sin stock" : `${producto.stock} disponibles`}
        </p>
        <button
          type="button"
          className="btn btn-nutri mt-auto"
          disabled={sinStock}
          onClick={() => onAgregar(producto)}
        >
          {sinStock ? "Agotado" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
