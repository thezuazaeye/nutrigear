import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import App from "../App";
import { renderConProveedores } from "./utilsTest";

function sesion(rol) {
  localStorage.setItem("nutrigear_sesion", JSON.stringify({ id: 1, nombre: "Test User", correo: "t@nutrigear.cl", rol }));
}

describe("Rutas protegidas", () => {
  // 12. RENDERIZADO condicional según sesión
  it("sin sesión, /admin redirige al login", () => {
    renderConProveedores(<App />, { ruta: "/admin" });
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeInTheDocument();
  });

  // 13. RENDERIZADO condicional según rol
  it("el admin ve el enlace 'Panel admin' y entra al panel", () => {
    sesion("admin");
    renderConProveedores(<App />, { ruta: "/admin" });
    expect(screen.getAllByText("Panel admin").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Panel de administración" })).toBeInTheDocument();
  });
});
