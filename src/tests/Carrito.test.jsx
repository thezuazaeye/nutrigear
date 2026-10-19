import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carrito from "../pages/Carrito";
import Productos from "../pages/Productos";
import { renderConProveedores } from "./utilsTest";

describe("Carrito", () => {
  // 8. ESTADO + EVENTOS
  it("calcula el total y queda vacío al eliminar el producto", async () => {
    renderConProveedores(<><Productos /><Carrito /></>);
    const botonWhey = screen.getAllByRole("button", { name: "Agregar al carrito" })[0];
    await userEvent.click(botonWhey);
    await userEvent.click(botonWhey);
    expect(screen.getByTestId("total-carrito")).toHaveTextContent("$59.980"); // 2 x $29.990

    await userEvent.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });
});
