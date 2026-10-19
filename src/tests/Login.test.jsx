import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import { renderConProveedores } from "./utilsTest";

function AppDePrueba() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<h1>Zona admin</h1>} />
      <Route path="/" element={<h1>Inicio tienda</h1>} />
    </Routes>
  );
}

async function ingresar(correo, clave) {
  await userEvent.type(screen.getByLabelText("Correo"), correo);
  await userEvent.type(screen.getByLabelText("Contraseña"), clave);
  await userEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

describe("Login", () => {
  // 9. EVENTOS: validación
  it("muestra errores de validación con campos vacíos", async () => {
    renderConProveedores(<AppDePrueba />, { ruta: "/login" });
    await userEvent.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(screen.getByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria.")).toBeInTheDocument();
  });

  // 10. ESTADO: credenciales incorrectas
  it("muestra error si las credenciales son incorrectas", async () => {
    renderConProveedores(<AppDePrueba />, { ruta: "/login" });
    await ingresar("admin@nutrigear.cl", "mala1");
    expect(screen.getByRole("alert")).toHaveTextContent("Correo o contraseña incorrectos.");
  });

  // 11. NAVEGACIÓN por rol (corrección de la crítica del profesor)
  it("redirige al panel admin cuando el usuario es admin", async () => {
    renderConProveedores(<AppDePrueba />, { ruta: "/login" });
    await ingresar("admin@nutrigear.cl", "admin123");
    expect(await screen.findByText("Zona admin")).toBeInTheDocument();
  });
});
