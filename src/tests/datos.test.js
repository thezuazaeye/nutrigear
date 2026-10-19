import { describe, it, expect } from "vitest";
import { listarProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProducto } from "../data/productos";

describe("CRUD de productos (archivo de datos)", () => {
  // 14. LÓGICA: crear, leer, actualizar y eliminar
  it("crea, actualiza y elimina un producto", () => {
    expect(listarProductos()).toHaveLength(6);

    const nuevo = crearProducto({ nombre: "Barra proteica", precio: "1990", categoria: "Proteínas", stock: "10" });
    expect(nuevo.id).toBe(7);
    expect(nuevo.precio).toBe(1990); // se convierte a número
    expect(listarProductos()).toHaveLength(7);

    actualizarProducto(7, { precio: 2500 });
    expect(obtenerProducto(7).precio).toBe(2500);

    eliminarProducto(7);
    expect(obtenerProducto(7)).toBeNull();
    expect(listarProductos()).toHaveLength(6);
  });
});
