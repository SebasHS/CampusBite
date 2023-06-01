import { useContext } from "react";
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';



export default function CarritoCompraScreen(){
    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;
    
    
    return(

        <div>
            <Helmet>
                <title>Carrito de compra - CampusBite</title>
            </Helmet>
            <h1>Carrito de compra - CampusBite</h1>
            <Row>
                <Col md={8}>
                {cartItems.length === 0 ? (

                    <MessageBox>
                    El carrito esta vacio. <Link to="/">Añade un plato</Link>
                    </MessageBox>
                ):
                (
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded img-thumbnail"
                                        
                                        
                                        ></img>{' '}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
                    

                </Col>
                <Col md={4}></Col>
            </Row>
        </div>
    );
}