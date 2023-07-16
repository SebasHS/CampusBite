import { useContext, useReducer, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import MessageBox from "../componentes/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { ServiceProducto } from "../services/ServiceProducto";
import { toast } from "react-toastify";

const ENVIO = 2;

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function CarritoCompraScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [show, setShow] = useState(false);

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const cantItems = cart.cartItems.reduce((a, c) => a + c.quantity, 0);

  const precioItems = cart.cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );

  const updateCartHandler = async (item, quantity) => {
    const { data } = await ServiceProducto.obtenerPorId(item);
    if (data.countInStock < quantity) {
      window.alert("Lo sentimos!, este producto esta fuera de stock");
      return;
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    setShow(true);
  };
  const closeHandler = () => {
    setShow(false);
  };

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/pedidos",
        {
          orderItems: cart.cartItems,
          itemsPrice: precioItems,
          costEnvio: ENVIO,
          precioTotal: precioItems + ENVIO,
        },
        {
          headers: {
            authorization: `Software2 ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      setShow(false);
      window.alert("Pedido realizado!!");
      navigate("/");
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      setShow(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Carrito de compra - CampusBite</title>
      </Helmet>
      <h1>Carrito de compra - CampusBite</h1>
      <Row>
        <Col md={8}>
          {cart.cartItems.length === 0 ? (
            <MessageBox>
              El carrito esta vacio. <Link to="/">Añade un plato</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>s/{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cantItems}
                    {""} platos) : s/
                    {precioItems}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>
                    Envio : s/
                    {ENVIO}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Pagar
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Realize el pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Por favor, paga el monto indicado anteriormente si compra los
                productos de un mismo restaurante
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={placeOrderHandler}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}
