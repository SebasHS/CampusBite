import React, { useContext, useState, useReducer } from 'react'
import { Store } from '../Store'
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
  
      default:
        return state;
    }
  };

export default function EditarDatosScreen(){
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{loadingUpdate}, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });
    
    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/users/profile',
            {
                name,
                email,
                password
            },
            {
                headers: { Authorization: `Software2 ${userInfo.token}`}
            })
            dispatch({
                type: 'UPDATE_SUCCESS',

            })
            ctxDispatch({ type: 'USER_LOGIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Datos cambiados')
        } catch (error) {
            dispatch({
                type: 'FETCH_FAIL'
            })
            console.log(error);
        }
    }

    return(
        <Container fluid="sm">
            <Helmet>
                 <title> Editar datos</title>
            </Helmet>
            <h1 className='mb-3'>Inicio de Sesión</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={ name }  onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Correo electrónico</Form.Label>
                <Form.Control type="email" value= { email }  onChange={(e) => setEmail(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label> Contraseña</Form.Label>
                <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="confpassword">
                <Form.Label> Confirmar Contraseña</Form.Label>
                <Form.Control type="password"  onChange={(e) => setConfirmPassword(e.target.value)}/> 
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Confirmar cambios</Button>
            </div>
            </Form>
        </Container>
    )
}