import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Productos from "../pages/Productos";
import { useCarrito } from "../context/CarritoContext";
import { renderConProveedores } from "./utilsTest";

// Componente mínimo que lee el contador del contexto del carrito.
function Contador() {
  return <span data-testid="contador">{useCarrito().cantidadTotal}</span>;
}

describe("Página Productos", () => {
  // 5. ESTADO + EVENTOS
  it("filtra la lista al escribir en el buscador", async () => {
    renderConProveedores(<Productos />);
    await userEvent.type(screen.getByLabelText("Buscar producto"), "creatina");
    expect(screen.getByText("Creatina Monohidrato 300 g", { selector: "a" })).toBeInTheDocument();
    expect(screen.queryByText("Proteína Whey 1 kg", { selector: "a" })).not.toBeInTheDocument();
  });

  // 6. RENDERIZADO + parámetros de URL
  it("filtra por categoría usando la URL (?categoria=)", () => {
    renderConProveedores(<Productos />, { ruta: "/productos?categoria=Accesorios" });
    expect(screen.getByText("Shaker NutriGear 700 ml", { selector: "a" })).toBeInTheDocument();
    expect(screen.queryByText("Proteína Whey 1 kg", { selector: "a" })).not.toBeInTheDocument();
  });

  // 7. ESTADO compartido (contexto)
  it("al agregar un producto sube el contador del carrito", async () => {
    renderConProveedores(<><Contador /><Productos /></>);
    expect(screen.getByTestId("contador")).toHaveTextContent("0");
    await userEvent.click(screen.getAllByRole("button", { name: "Agregar al carrito" })[0]);
    expect(screen.getByTestId("contador")).toHaveTextContent("1");
  });
});
