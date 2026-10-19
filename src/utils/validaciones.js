// Validaciones reutilizables de formularios (versión React de las validaciones de EA1).
export const DOMINIOS_PERMITIDOS = ["gmail.com", "duoc.cl", "profesor.duoc.cl", "nutrigear.cl"];

export function validarCorreo(correo) {
  const valor = correo.trim().toLowerCase();
  if (!valor) return "El correo es obligatorio.";
  const partes = valor.split("@");
  if (partes.length !== 2 || !partes[0] || !partes[1].includes(".")) return "Ingresa un correo válido.";
  if (!DOMINIOS_PERMITIDOS.includes(partes[1])) {
    return "Dominio no permitido. Usa: " + DOMINIOS_PERMITIDOS.join(", ") + ".";
  }
  return "";
}

export function validarClave(clave) {
  if (!clave) return "La contraseña es obligatoria.";
  if (clave.length < 4 || clave.length > 10) return "La contraseña debe tener entre 4 y 10 caracteres.";
  return "";
}

export function validarNombre(nombre) {
  if (!nombre.trim()) return "El nombre es obligatorio.";
  if (nombre.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
  return "";
}
