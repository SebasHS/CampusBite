import React, { useState } from 'react';
import qrImage from '../ejemploQRYape.png';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const PagoQR_ExtraSprint2 = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        window.alert('Gracias por su pago');
        navigate('/') 
    };

    return (
    <div>
        <div className='center-btn-flex'>
            <img className='qrYape' src={qrImage} />
        </div>
        <div className='center-btn-flex'>
            <Button onClick={handleButtonClick}>Ya pague</Button>
        </div>
    </div>
  );
};

export default PagoQR_ExtraSprint2;
