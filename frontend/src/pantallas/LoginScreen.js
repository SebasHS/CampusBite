import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ServiceUsuario } from "../services/ServiceUsuario";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await ServiceUsuario.validarUsuario(email, password);
      ctxDispatch({ type: "USER_LOGIN", payload: res });
      localStorage.setItem("userInfo", JSON.stringify(res));
      navigate("/");
    } catch (err) {
      alert("Email o contraseña invalida ");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container fluid="sm">
      <Helmet>
        <title>Inicio SesiÃ³n</title>
      </Helmet>
      <h1 className="mb-3">Inicio de SesiÃ³n</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Correo electrÃ³nico</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label> ContraseÃ±a</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Iniciar SesiÃ³n</Button>
        </div>
        <div className="mb-3">
          Â¿No tienes una cuenta?{" "}
          <Link to={`/register?redirect=${redirect}`}> Registrate</Link>
        </div>
      </Form>
    </Container>
  );
}
