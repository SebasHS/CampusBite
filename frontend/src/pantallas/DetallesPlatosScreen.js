import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Rating from "../componentes/Rating";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { getError } from "../utils";
import { ServiceProducto } from "../services/ServiceProducto";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function DetallesPlatosScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = ServiceProducto.obtenerPorSlug(slug);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await ServiceProducto.obtenerPorId(product);

    if (data.countInStock < quantity) {
      window.alert("Lo sentimos!, este producto esta fuera de stock");
      return;
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    navigate("/cart");
  };

  return loading ? (
    <div>Cargando</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Row>
      <Col md={6}>
        <img className="img-large" src={product.image} alt={product.name}></img>
      </Col>
      <Col md={3}>
        <ListGroup varian="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
          </ListGroup.Item>
          <ListGroup.Item>Precio: s/{product.price}</ListGroup.Item>
          <ListGroup.Item>
            Descripción: <p>{product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Precio:</Col>
                  <Col>s/{product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estado:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">Disponible</Badge>
                    ) : (
                      <Badge bg="danger">Fuera de stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button onClick={addToCartHandler} variant="primary">
                      Añadir al carrito
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
export default DetallesPlatosScreen;
