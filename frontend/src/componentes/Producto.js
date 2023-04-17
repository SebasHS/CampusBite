import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Producto(props){
    const {product} = props;
    return(
        <Card key={product.slug}>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} className='card-img-top' alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text>s/{product.price}</Card.Text>
                <Button>Añadir al carrito</Button>
            </Card.Body>
        </Card>
    )

}
export default Producto;