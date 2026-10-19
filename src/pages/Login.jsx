import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { validarCorreo, validarClave } from "../utils/validaciones";

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    const nuevos = { correo: validarCorreo(correo), clave: validarClave(clave) };
    setErrores(nuevos);
    setErrorGeneral("");
    if (nuevos.correo || nuevos.clave) return;

    const sesion = iniciarSesion(correo, clave);
    if (!sesion) {
      setErrorGeneral("Correo o contraseña incorrectos.");
      return;
    }
    // Redirección según rol: el personal va al panel, el cliente a la tienda.
    navigate(sesion.rol === "cliente" ? "/" : "/admin");
  };

  const usarCuenta = (c, k) => {
    setCorreo(c);
    setClave(k);
  };

  return (
    <Container as="main" className="py-5">
      <Row className="justify-content-center g-4">
        <Col md={6} lg={5}>
          <h1 className="mb-3">Iniciar sesión</h1>
          <form onSubmit={enviar} noValidate>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo</label>
              <input id="correo" type="email" className={`form-control ${errores.correo ? "is-invalid" : ""}`} value={correo} onChange={(e) => setCorreo(e.target.value)} />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">Contraseña</label>
              <input id="clave" type="password" className={`form-control ${errores.clave ? "is-invalid" : ""}`} value={clave} onChange={(e) => setClave(e.target.value)} />
              {errores.clave && <div className="invalid-feedback">{errores.clave}</div>}
            </div>
            {errorGeneral && <div className="alert alert-danger" role="alert">{errorGeneral}</div>}
            <button type="submit" className="btn btn-nutri w-100">Ingresar</button>
          </form>
          <p className="mt-3 mb-0">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </Col>
        <Col md={6} lg={5}>
          <div className="caja-demo">
            <h2 className="h6">Cuentas de prueba (solo demo)</h2>
            <p className="small text-muted">Haz clic para rellenar el formulario.</p>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary text-start" onClick={() => usarCuenta("admin@nutrigear.cl", "admin123")}>
                <strong>Admin:</strong> admin@nutrigear.cl / admin123
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary text-start" onClick={() => usarCuenta("vendedor@nutrigear.cl", "vende123")}>
                <strong>Vendedor:</strong> vendedor@nutrigear.cl / vende123
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary text-start" onClick={() => usarCuenta("cliente@nutrigear.cl", "cliente123")}>
                <strong>Cliente:</strong> cliente@nutrigear.cl / cliente123
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
