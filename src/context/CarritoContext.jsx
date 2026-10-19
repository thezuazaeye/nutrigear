import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);
const CLAVE_CARRITO = "nutrigear_carrito";

function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarrito);

  // Cada vez que cambia el carrito, lo guardamos.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
    } catch {
      // sin almacenamiento disponible
    }
  }, [items]);

  const agregar = (producto) => {
    setItems((actual) => {
      const existente = actual.find((i) => i.id === producto.id);
      if (existente) {
        return actual.map((i) =>
          i.id === producto.id ? { ...i, cantidad: Math.min(i.cantidad + 1, producto.stock) } : i
        );
      }
      return [
        ...actual,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen, stock: producto.stock, cantidad: 1 },
      ];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    setItems((actual) =>
      actual
        .map((i) => (i.id === id ? { ...i, cantidad: Math.min(Math.max(cantidad, 0), i.stock) } : i))
        .filter((i) => i.cantidad > 0)
    );
  };

  const quitar = (id) => setItems((actual) => actual.filter((i) => i.id !== id));
  const vaciar = () => setItems([]);

  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0);
  const total = items.reduce((suma, i) => suma + i.cantidad * i.precio, 0);

  return (
    <CarritoContext.Provider value={{ items, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, total }}>
      {children}
    </CarritoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  return useContext(CarritoContext);
}
