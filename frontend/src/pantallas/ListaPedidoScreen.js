import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from "axios";
import LoadingBox from "../componentes/LoadingBox";
import MessageBox from "../componentes/MessageBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        pedidos: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAID_REQUEST":
      return { ...state, loadingPaid: true };
    case "PAID_SUCCESS":
      return { ...state, loadingPaid: false };
    case "PAID_FAIL":
      return { ...state, loadingPaid: false };
    case "ENTREGA_REQUEST":
      return { ...state, loadingEntrega: true };
    case "ENTREGA_SUCCESS":
      return { ...state, loadingEntrega: false };
    case "ENTREGA_FAIL":
      return { ...state, loadingEntrega: false };
    default:
      return state;
  }
};

export default function ListaPedidoScreen() {
  const [cambio, setCambio] = useState(false);
  const [{ loading, loadingPaid, loadingEntrega, error, pedidos }, dispatch] =
    useReducer(reducer, {
      loading: true,
      loadingPaid: false,
      loadingEntrega: false,
      error: "",
    });

  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/pedidos/`, {
          headers: { Authorization: `Software2 ${userInfo.token}` },
        });
        setCambio(false);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    getData();
  }, [cambio, userInfo]);

  return (
    <div>
      <Row>
        <Col>
          <h1>PEDIDOS</h1>
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
                <th>CLIENTE</th>
                <th>FECHA</th>
                <th>COSTO TOTAL</th>
                <th>¿PAGADO?</th>
                <th>¿ENTREGADO?</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                return (
                  <tr key={pedido._id}>
                    <td>{pedido._id}</td>
                    <td>{pedido.user ? pedido.user.name : "DELETED USER"}</td>
                    <td>{pedido.createdAt.substring(0, 10)}</td>
                    <td>{pedido.precioTotal}</td>
                    <td>
                      {loadingPaid ? (
                        <LoadingBox></LoadingBox>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <>{pedido.isPaid ? "Pagado" : "No pagado"}</>
                      )}
                    </td>
                    <td>
                      {loadingEntrega ? (
                        <LoadingBox></LoadingBox>
                      ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                      ) : (
                        <>{pedido.isEntregado ? "Entregado" : "No entregado"}</>
                      )}
                    </td>
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        disabled={pedido.isPaid ? true : false}
                        onClickCapture={async () => {
                          try {
                            dispatch({ type: "PAID_REQUEST" });
                            const { data } = await axios.put(
                              `/api/pedidos/${pedido._id}/pagado`,
                              {},
                              {
                                headers: {
                                  authorization: `Software2 ${userInfo.token}`,
                                },
                              }
                            );

                            dispatch({ type: "PAID_SUCCESS", payload: data });
                            setCambio(true);
                          } catch (err) {
                            console.log(getError(err));
                            dispatch({ type: "PAID_FAIL" });
                          }
                        }}
                      >
                        Ya pagó
                      </Button>
                      <Button
                        className="ms-2"
                        type="button"
                        variant="light"
                        disabled={pedido.isEntregado ? true : false}
                        onClickCapture={async () => {
                          try {
                            dispatch({ type: "ENTREGA_REQUEST" });
                            const { data } = await axios.put(
                              `/api/pedidos/${pedido._id}/entregado`,
                              {},
                              {
                                headers: {
                                  authorization: `Software2 ${userInfo.token}`,
                                },
                              }
                            );
                            setCambio(true);
                            dispatch({
                              type: "ENTREGA_SUCCESS",
                              payload: data,
                            });
                          } catch (err) {
                            console.log(getError(err));
                            dispatch({ type: "ENTREGA_FAIL" });
                          }
                        }}
                      >
                        Se entregó
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
