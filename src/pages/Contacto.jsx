import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { validarNombre, validarCorreo } from "../utils/validaciones";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", correo: "", comentario: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = {
      nombre: validarNombre(form.nombre),
      correo: validarCorreo(form.correo),
      comentario: form.comentario.trim().length < 10 ? "El comentario debe tener al menos 10 caracteres." : "",
    };
    setErrores(nuevos);
    if (Object.values(nuevos).some(Boolean)) {
      setEnviado(false);
      return;
    }
    setEnviado(true);
    setForm({ nombre: "", correo: "", comentario: "" });
  };

  return (
    <Container as="main" className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="mb-3">Contacto</h1>
          {enviado && <div className="alert alert-success" role="status">¡Gracias! Recibimos tu mensaje.</div>}
          <form onSubmit={enviar} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input id="nombre" name="nombre" className={`form-control ${errores.nombre ? "is-invalid" : ""}`} value={form.nombre} onChange={cambiar} />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input id="correo" name="correo" type="email" className={`form-control ${errores.correo ? "is-invalid" : ""}`} value={form.correo} onChange={cambiar} />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">Comentario</label>
              <textarea id="comentario" name="comentario" rows="4" className={`form-control ${errores.comentario ? "is-invalid" : ""}`} value={form.comentario} onChange={cambiar} />
              {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
            </div>
            <button type="submit" className="btn btn-nutri">Enviar</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
