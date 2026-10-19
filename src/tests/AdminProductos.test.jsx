import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminProductos from "../pages/admin/AdminProductos";
import { renderConProveedores } from "./utilsTest";

describe("Mantenedor de productos (admin)", () => {
  // 15. EVENTOS + ESTADO: el CRUD conectado al componente React
  it("crea un producto nuevo y aparece en la tabla", async () => {
    renderConProveedores(<AdminProductos />);
    await userEvent.type(screen.getByLabelText("Nombre"), "Barra proteica");
    await userEvent.type(screen.getByLabelText("Precio"), "1990");
    await userEvent.type(screen.getByLabelText("Stock"), "20");
    await userEvent.click(screen.getByRole("button", { name: "Crear producto" }));
    expect(screen.getByText("Barra proteica")).toBeInTheDocument();
  });
});
