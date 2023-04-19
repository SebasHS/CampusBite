import React, { useContext, useState } from 'react'
import { Store } from '../Store'
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

export default function EditarDatosScreen(){
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const submitHandler = async (e) =>{
        e.preventDefaul();
        
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
                <Form.Control value={ name } required onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Correo electrónico</Form.Label>
                <Form.Control type="email" value= { email } required onChange={(e) => setEmail(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label> Contraseña</Form.Label>
                <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label> Confirmar Contraseña</Form.Label>
                <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)}/> 
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Confirmar cambios</Button>
            </div>
            </Form>
        </Container>
    )
}