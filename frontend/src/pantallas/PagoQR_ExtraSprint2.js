import React, { useState } from "react";
import qrImage from "../ejemploQRYape.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../Store";

const PagoQR_ExtraSprint2 = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const handleButtonClick = () => {
    ctxDispatch({ type: "CART_CLEAR" });
    localStorage.removeItem("cartItems");
    window.alert("Gracias por su pago");
    navigate("/");
  };

  return (
    <Container>
      <Helmet>
        <title>Pago</title>
      </Helmet>
      <div>
        <div className="center-btn-flex">
          <img className="qrYape" src={qrImage} />
        </div>
        <div className="center-btn-flex">
          <Button onClick={handleButtonClick}>Ya pague</Button>
        </div>
      </div>
    </Container>
  );
};

export default PagoQR_ExtraSprint2;
