import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import Axios from 'axios';
import { useState } from 'react';


export default function LoginScreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/login', {
                email,
                password,
            });
            console.log(data);
        } catch (err) {
            
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