import { createContext, useContext, useState } from "react";
import { autenticar } from "../data/productos";

const AuthContext = createContext(null);
const CLAVE_SESION = "nutrigear_sesion";

function leerSesion() {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION);
    return guardada ? JSON.parse(guardada) : null;
  } catch {
    return null;
  }
}

// Guarda la sesión SIN la contraseña.
function abrirSesion(usuario) {
  const sesion = { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
  try {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  } catch {
    // sin almacenamiento: la sesión dura mientras no se recargue
  }
  return sesion;
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion);

  // Devuelve la sesión si las credenciales son correctas, o null.
  const iniciarSesion = (correo, clave) => {
    const encontrado = autenticar(correo, clave);
    if (!encontrado) return null;
    const sesion = abrirSesion(encontrado);
    setUsuario(sesion);
    return sesion;
  };

  // Inicia sesión directamente con un usuario ya validado (por ejemplo, tras registrarse).
  const iniciarConUsuario = (u) => {
    const sesion = abrirSesion(u);
    setUsuario(sesion);
    return sesion;
  };

  const cerrarSesion = () => {
    try {
      localStorage.removeItem(CLAVE_SESION);
    } catch {
      // nada que hacer
    }
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, iniciarConUsuario, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
