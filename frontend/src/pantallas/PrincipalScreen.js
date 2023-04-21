import { Link } from 'react-router-dom';
import data from '../data';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Producto from '../componentes/Producto';
import { Helmet } from 'react-helmet-async';

function PrincipalScreen(){
    return(
        <div>
            <Helmet>
            <title>Carta</title>
            </Helmet>
        <main>
            <h1>Carta de cafetería</h1>
            <Row>
                <div className='products'>
                    {data.products.map((product) =>(
                        <Producto key={product.slug} product={product}></Producto>
                    ))}
                </div>
            </Row>
            
        </main>
        </div>
    )
}

export default PrincipalScreen;