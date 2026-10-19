import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";
import { renderConProveedores, productoDemo } from "./utilsTest";

describe("ProductCard", () => {
  // 1. RENDERIZADO
  it("muestra nombre, precio e imagen del producto", () => {
    renderConProveedores(<ProductCard producto={productoDemo} onAgregar={() => {}} />);
    expect(screen.getByText("Proteína de Prueba", { selector: "a" })).toBeInTheDocument();
    expect(screen.getByText("$10.000")).toBeInTheDocument();
    expect(screen.getByAltText("Proteína de Prueba")).toBeInTheDocument();
  });

  // 2. PROPS
  it("muestra la categoría recibida por props", () => {
    renderConProveedores(<ProductCard producto={{ ...productoDemo, categoria: "Creatina" }} onAgregar={() => {}} />);
    expect(screen.getByText("Creatina")).toBeInTheDocument();
  });

  // 3. PROPS (caso límite)
  it("deshabilita el botón cuando el stock es 0", () => {
    renderConProveedores(<ProductCard producto={{ ...productoDemo, stock: 0 }} onAgregar={() => {}} />);
    expect(screen.getByRole("button", { name: "Agotado" })).toBeDisabled();
  });

  // 4. EVENTOS
  it("llama a onAgregar con el producto al hacer clic", async () => {
    const onAgregar = vi.fn(); // función simulada (mock)
    renderConProveedores(<ProductCard producto={productoDemo} onAgregar={onAgregar} />);
    await userEvent.click(screen.getByRole("button", { name: "Agregar al carrito" }));
    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(productoDemo);
  });
});
