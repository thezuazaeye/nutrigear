import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { crearUsuario, listarUsuarios } from "../data/productos";
import { validarNombre, validarCorreo, validarClave } from "../utils/validaciones";

function Registro() {
  const { iniciarConUsuario } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", clave: "", repetir: "" });
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {
      nombre: validarNombre(form.nombre),
      correo: validarCorreo(form.correo),
      clave: validarClave(form.clave),
      repetir: form.clave !== form.repetir ? "Las contraseñas no coinciden." : "",
    };
    if (!nuevos.correo && listarUsuarios().some((u) => u.correo.toLowerCase() === form.correo.trim().toLowerCase())) {
      nuevos.correo = "Ese correo ya está registrado.";
    }
    setErrores(nuevos);
    if (Object.values(nuevos).some(Boolean)) return;

    const usuario = crearUsuario({ nombre: form.nombre.trim(), correo: form.correo.trim(), clave: form.clave, rol: "cliente" });
    iniciarConUsuario(usuario);
    navigate("/");
  };

  const campo = (name, label, type = "text") => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input id={name} name={name} type={type} className={`form-control ${errores[name] ? "is-invalid" : ""}`} value={form[name]} onChange={cambiar} />
      {errores[name] && <div className="invalid-feedback">{errores[name]}</div>}
    </div>
  );

  return (
    <Container as="main" className="py-5">
      <Row className="justify-content-center">
        <Col md={7} lg={5}>
          <h1 className="mb-3">Crear cuenta</h1>
          <form onSubmit={enviar} noValidate>
            {campo("nombre", "Nombre completo")}
            {campo("correo", "Correo", "email")}
            {campo("clave", "Contraseña (4 a 10 caracteres)", "password")}
            {campo("repetir", "Repetir contraseña", "password")}
            <button type="submit" className="btn btn-nutri w-100">Registrarme</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;
