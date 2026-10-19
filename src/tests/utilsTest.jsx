// Ayuda para las pruebas: renderiza un componente con Router + contextos.
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CarritoProvider } from "../context/CarritoContext";

export function renderConProveedores(ui, { ruta = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider>
        <CarritoProvider>{ui}</CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

export const productoDemo = {
  id: 99, nombre: "Proteína de Prueba", precio: 10000, categoria: "Proteínas",
  stock: 5, imagen: "whey", descripcion: "Producto para tests",
};
