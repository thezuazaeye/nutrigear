// Archivo de datos simulados de NutriGear: productos y usuarios con funciones CRUD.
// Los datos se guardan en localStorage para que los cambios persistan al recargar.
import bcaa from "../assets/bcaa-211.png";
import creatina from "../assets/creatina-mono.png";
import multivit from "../assets/multivit-deportivo.png";
import preentreno from "../assets/preentreno-explosive.png";
import whey from "../assets/proteina-whey.png";
import shaker from "../assets/shaker-nutrigear.png";

// Se guarda la CLAVE de la imagen (no la ruta), porque la ruta cambia en cada build.
export const IMAGENES = {
  bcaa,
  creatina,
  multivit,
  preentreno,
  whey,
  shaker,
};

export const CATEGORIAS = [
  "Proteínas",
  "Creatina",
  "Aminoácidos",
  "Pre-entreno",
  "Vitaminas",
  "Accesorios",
];

export function getImagen(clave) {
  return IMAGENES[clave] || IMAGENES.whey;
}

const CLAVE_PRODUCTOS = "nutrigear_productos";
const CLAVE_USUARIOS = "nutrigear_usuarios";

const productosIniciales = [
  { id: 1, nombre: "Proteína Whey 1 kg", precio: 29990, categoria: "Proteínas", stock: 25, imagen: "whey",
    descripcion: "Proteína de suero de leche de alta pureza. Ideal para recuperación muscular después de entrenar." },
  { id: 2, nombre: "Creatina Monohidrato 300 g", precio: 17990, categoria: "Creatina", stock: 40, imagen: "creatina",
    descripcion: "Creatina monohidrato micronizada. Apoya la fuerza y el rendimiento en esfuerzos de alta intensidad." },
  { id: 3, nombre: "BCAA 2:1:1 300 g", precio: 14990, categoria: "Aminoácidos", stock: 30, imagen: "bcaa",
    descripcion: "Aminoácidos ramificados en proporción 2:1:1 para acompañar entrenamientos prolongados." },
  { id: 4, nombre: "Pre-entreno Explosive", precio: 19990, categoria: "Pre-entreno", stock: 18, imagen: "preentreno",
    descripcion: "Fórmula con cafeína y beta-alanina para llegar con energía a tu sesión." },
  { id: 5, nombre: "Multivitamínico Deportivo", precio: 12990, categoria: "Vitaminas", stock: 50, imagen: "multivit",
    descripcion: "Vitaminas y minerales pensados para personas con alta carga de entrenamiento." },
  { id: 6, nombre: "Shaker NutriGear 700 ml", precio: 6990, categoria: "Accesorios", stock: 0, imagen: "shaker",
    descripcion: "Shaker con mezclador y tapa hermética. Apto para lavavajillas." },
];

const usuariosIniciales = [
  { id: 1, nombre: "Administrador NutriGear", correo: "admin@nutrigear.cl", clave: "admin123", rol: "admin" },
  { id: 2, nombre: "Vendedor NutriGear", correo: "vendedor@nutrigear.cl", clave: "vende123", rol: "vendedor" },
  { id: 3, nombre: "Cliente de Prueba", correo: "cliente@nutrigear.cl", clave: "cliente123", rol: "cliente" },
];

export const ROLES = ["admin", "vendedor", "cliente"];

// ---------- utilidades internas de persistencia ----------
function leer(clave, iniciales) {
  try {
    const guardado = localStorage.getItem(clave);
    if (guardado) return JSON.parse(guardado);
  } catch {
    // si el JSON está dañado usamos los datos iniciales
  }
  return iniciales;
}

function guardar(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
  } catch {
    // sin almacenamiento disponible: los cambios no persisten
  }
}

function siguienteId(lista) {
  return lista.length ? Math.max(...lista.map((x) => x.id)) + 1 : 1;
}

// ---------- CRUD de productos ----------
export function listarProductos() {
  return leer(CLAVE_PRODUCTOS, productosIniciales);
}

export function obtenerProducto(id) {
  return listarProductos().find((p) => p.id === Number(id)) || null;
}

export function crearProducto(datos) {
  const lista = listarProductos();
  const nuevo = {
    imagen: "whey",
    descripcion: "",
    ...datos,
    id: siguienteId(lista),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
  };
  guardar(CLAVE_PRODUCTOS, [...lista, nuevo]);
  return nuevo;
}

export function actualizarProducto(id, cambios) {
  const lista = listarProductos().map((p) =>
    p.id === Number(id)
      ? { ...p, ...cambios, precio: Number(cambios.precio ?? p.precio), stock: Number(cambios.stock ?? p.stock) }
      : p
  );
  guardar(CLAVE_PRODUCTOS, lista);
  return lista.find((p) => p.id === Number(id)) || null;
}

export function eliminarProducto(id) {
  guardar(CLAVE_PRODUCTOS, listarProductos().filter((p) => p.id !== Number(id)));
}

// ---------- CRUD de usuarios ----------
export function listarUsuarios() {
  return leer(CLAVE_USUARIOS, usuariosIniciales);
}

export function crearUsuario(datos) {
  const lista = listarUsuarios();
  const nuevo = { rol: "cliente", ...datos, id: siguienteId(lista) };
  guardar(CLAVE_USUARIOS, [...lista, nuevo]);
  return nuevo;
}

export function actualizarUsuario(id, cambios) {
  const lista = listarUsuarios().map((u) => (u.id === Number(id) ? { ...u, ...cambios } : u));
  guardar(CLAVE_USUARIOS, lista);
  return lista.find((u) => u.id === Number(id)) || null;
}

export function eliminarUsuario(id) {
  guardar(CLAVE_USUARIOS, listarUsuarios().filter((u) => u.id !== Number(id)));
}

// Devuelve el usuario si correo y clave coinciden; si no, null.
// (Simulación para EA2: en EA3 esto lo hará el backend.)
export function autenticar(correo, clave) {
  const c = correo.trim().toLowerCase();
  return listarUsuarios().find((u) => u.correo.toLowerCase() === c && u.clave === clave) || null;
}

export function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}
