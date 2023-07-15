import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { ServiceProducto } from "../services/ServiceProducto";

function Producto(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log("item:", item._id);
    const { data } = await ServiceProducto.obtenerPorId(item);
    if (data.countInStock < quantity) {
      window.alert("Lo sentimos!, este producto esta fuera de stock");
      return;
    }

    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>s/{product.price}</Card.Text>
        <Button onClick={() => addToCartHandler(product)}>
          Añadir al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Producto;
