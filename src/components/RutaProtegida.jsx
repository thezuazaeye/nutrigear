import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege rutas: sin sesión -> /login; con rol no permitido -> inicio.
function RutaProtegida({ roles, children }) {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(usuario.rol)) return <Navigate to="/" replace />;
  return children;
}

export default RutaProtegida;
