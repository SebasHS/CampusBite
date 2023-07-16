import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../componentes/LoadingBox";
import MessageBox from "../componentes/MessageBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import { ServiceRestaurante } from "../services/ServiceRestaurante";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    default:
      return state;
  }
};

export default function ListaProductsScreen() {
  const [{ loading, loadingCreate, error, products, pages }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const page = searchParam.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const id = userInfo._id;

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/admin?page=${page}&&id=${id} `,
          {
            headers: { Authorization: `Software2 ${userInfo.token}` },
          }
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    getData();
  }, [page, userInfo]);

  const CrearProductoHandler = async () => {
    if (window.confirm("¿Seguro de crear un producto?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await ServiceRestaurante.crearProducto(id, userInfo);
        console.log("Producto creado");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/productos/${data.product._id}`);
      } catch (err) {
        console.log(err);
        dispatch({ type: "CREATE_FAIL" });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h1>Platos</h1>
        </Col>
        <Col className="col text-end">
          <Button type="button" onClick={CrearProductoHandler}>
            Crear plato
          </Button>
        </Col>
      </Row>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Editar plato
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                key={x + 1}
                to={`/admin/productos?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
