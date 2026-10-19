import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RutaProtegida from "./components/RutaProtegida";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Nosotros from "./pages/Nosotros";
import Blog from "./pages/Blog";
import BlogDetalle from "./pages/BlogDetalle";
import Contacto from "./pages/Contacto";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas anidadas del panel: solo admin y vendedor */}
          <Route
            path="/admin"
            element={
              <RutaProtegida roles={["admin", "vendedor"]}>
                <AdminLayout />
              </RutaProtegida>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route
              path="usuarios"
              element={
                <RutaProtegida roles={["admin"]}>
                  <AdminUsuarios />
                </RutaProtegida>
              }
            />
          </Route>

          <Route path="*" element={<main className="container py-5"><h1>Página no encontrada</h1></main>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
