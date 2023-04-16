import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';


export default function LoginScreen(){
return(
    <Container fluid="sm">
        <Helmet>
            <title>Iniciar Sesión</title>
        </Helmet>
        <h1 className='my-3'>Iniciar Sesión</h1>
        <Form>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Correo electrónico</Form.Label>
                <Form.Control type="email" required/> 
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label> Constraseña</Form.Label>
                <Form.Control type="password" required/> 
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit">Iniciar Sesión</Button>
            </div>
        </Form>
    </Container>
)
}