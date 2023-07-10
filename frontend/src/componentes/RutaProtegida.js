import React, { useContext } from 'react';
import { Store } from '../Store';
import { Navigate } from "react-router-dom";

export default function RutaProtegida({children}){
    const { state } = useContext(Store);
    const { userInfo} = state; 
    return userInfo ? children : <Navigate to="/signin" />
}