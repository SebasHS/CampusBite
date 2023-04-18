import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { redirect, useNavigate, useLocation, Link } from 'react-router-dom';


export default function RegisterScreen(){

    const navigate = useNavigate();
    const { search } = useLocation();
    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Email o contraseña invalida ');
        }
        try {
            const { data } = await Axios.post('/api/users/register', {
                name,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_LOGIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            alert('Email o contraseña invalida ')
            console.log(err)
        }
    };
    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        } 
    }, [navigate, redirect, userInfo]);

return(
    <Container fluid="sm">
        <Helmet>
            <title>Registro</title>
        </Helmet>
        <h1 className='mb-3'>Registro</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label> Nombre</Form.Label>
                <Form.Control required onChange={(e) => setName(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Correo electrónico</Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/> 
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
                <Button type="submit">Registrarse</Button>
            </div>
            <div className= "mb-3">
                ¿Ya tiene una cuenta?{' '}
                <Link to={`/login?redirect=${redirect}`}> Inicie su sesión</Link>
            </div>
        </Form>
    </Container>
)
}