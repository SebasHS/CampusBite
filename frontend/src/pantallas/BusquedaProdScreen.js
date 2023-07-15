import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import LoadingBox from "../componentes/LoadingBox";
import MessageBox from "../componentes/MessageBox";
import Button from "react-bootstrap/Button";
import Producto from "../componentes/Producto";
import { LinkContainer } from "react-router-bootstrap";
import Col from "react-bootstrap/Col";

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
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function BusquedaProdScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  console.log(search);
  const SearchParam = new URLSearchParams(search);
  console.log(SearchParam);
  const query = SearchParam.get("query") || "all";
  const category = SearchParam.get("category") || "all";
  const order = SearchParam.get("order") || "newest";
  const page = SearchParam.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}`
        );
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    getData();
  }, [category, error, order, page, query]);

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
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;

    return `/search?category=${filterCategory}&query=${filterQuery}&page=${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Busqueda</title>
      </Helmet>
      <Row>
        <Col>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <>
              <Row>
                <Col>
                  {countProducts === 0 ? "No" : countProducts} Results
                  {query !== "all" && " : " + query}
                  {category !== "all" && " : " + category}
                  {query !== "all" || category !== "all" ? (
                    <Button variant="light" onClick={() => navigate("/search")}>
                      <i className="fas fa-times-circle"></i>
                    </Button>
                  ) : null}
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>Ningun producto encontrado</MessageBox>
              )}

              <Row>
                <div className="products">
                  {products.map((product) => (
                    <Producto key={product._id} product={product}></Producto>
                  ))}
                </div>
              </Row>

              {/*<div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                    <Button
                      className={Number(page) === x + 1 ? "text-bold" : ""}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
                </div>*/}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
