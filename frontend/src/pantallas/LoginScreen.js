import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import Axios from 'axios';
import { useContext, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';


export default function LoginScreen(){

    const { state, dispatch: ctxDispatch} = useContext(Store);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    

    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/login', {
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
    }

return(
    <Container fluid="sm">
        <Helmet>
            <title>Iniciar Sesión</title>
        </Helmet>
        <h1 className='my-3'>Iniciar Sesión</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Correo electrónico</Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label> Constraseña</Form.Label>
                <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/> 
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Iniciar Sesión</Button>
            </div>
        </Form>
    </Container>
)
}