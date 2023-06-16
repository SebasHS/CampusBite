import { Link } from "react-router-dom";
// import data from '../data';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Producto from "../componentes/Producto";
import { Helmet } from "react-helmet-async";
import { useEffect, useReducer } from "react";
import LoadingBox from "../componentes/LoadingBox";
import MessageBox from "../componentes/MessageBox";
import axios from "axios";
import { ServiceProducto } from "../services/ServiceProducto";

function PrincipalScreen() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, products: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await ServiceProducto.obtenerProductos();
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Carta</title>
      </Helmet>
      <main>
        <h1>Carta de cafetería</h1>
        <Row>
          <div className="products">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Row>
                <div className="products">
                  {products.map((product) => (
                    <Producto key={product.slug} product={product}></Producto>
                  ))}
                </div>
              </Row>
            )}
          </div>
        </Row>
      </main>
    </div>
  );
}

export default PrincipalScreen;
