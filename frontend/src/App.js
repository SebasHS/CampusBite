import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import PrincipalScreen from "./pantallas/PrincipalScreen";
import DetallesPlatosScreen from "./pantallas/DetallesPlatosScreen";
import LoginScreen from "./pantallas/LoginScreen";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import { getError } from "./utils";
import { LinkContainer } from "react-router-bootstrap";
// import { LinkContainer } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import RegisterScreen from "./pantallas/RegisterScreen";
import EditarDatosScreen from "./pantallas/EditarDatosScreen";
import Container from "react-bootstrap/esm/Container";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import CarritoCompraScreen from "./pantallas/CarritoCompraScreen";
import PagoQR_ExtraSprint2 from "./pantallas/PagoQR_ExtraSprint2";
import BarraBusqueda from "./componentes/BarraBusqueda";
import Footer from "./componentes/Footer";
import Button from "react-bootstrap/Button";
import RutaProtegida from "./componentes/RutaProtegida";
import BusquedaProdScreen from "./pantallas/BusquedaProdScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { cart } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    window.location.href = "/login";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <header className="MenuNav">
          <Button
            variant="dark"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          >
            <i className="fas fa-bars"></i>
          </Button>
          <Link to="/">CampusBite</Link>
          <BarraBusqueda />
          {userInfo && !userInfo.isAdmin && (
            <Link to="/cart" className="nav-link">
              Carrito
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <Link to="/" className="nav-link">
              admin
            </Link>
          )}
          {userInfo ? (
            <>
              <span>Hola, {userInfo.name} </span>
              <div className="MenuPostLogueo">
                <Link to="/editardatos">Editar Datos</Link>
                <Link to="#logout" onClick={logoutHandler}>
                  Desloguearse
                </Link>
              </div>
            </>
          ) : (
            <Link to="/login">Inicio de sesión</Link>
          )}
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column w-100 p-2">
            <Nav.Item>
              <strong>Categorias de platos</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-2">
            <Routes>
              <Route path="/product/:slug" element={<DetallesPlatosScreen />} />
              <Route path="/cart" element={<CarritoCompraScreen />} />
              <Route path="/" element={<PrincipalScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/search" element={<BusquedaProdScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route
                path="/editardatos"
                element={
                  <RutaProtegida>
                    <EditarDatosScreen />
                  </RutaProtegida>
                }
              />
              <Route path="/shipping" element={<PagoQR_ExtraSprint2 />} />
            </Routes>
          </Container>
        </main>
        <header className="MenuNav">
          <Footer />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
