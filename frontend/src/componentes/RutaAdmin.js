import React, { useContext } from 'react';
import { Store } from '../Store';
import { Navigate } from "react-router-dom";

export default function RutaAdmin({children}){
    const { state } = useContext(Store);
    const { userInfo} = state; 
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />
}