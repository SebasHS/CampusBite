import { Link } from 'react-router-dom';
import data from '../data';

function PrincipalScreen(){
    return(
        <div>
        <main>
            <h1>Carta de cafetería</h1>
            <div className='products'>
            {data.products.map((product) =>(
            <div className='product' key={product.slug}>
                <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
                </Link>
                <div className='product-info'>
                <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
                <p>
                    <strong>s/{product.price}</strong>
                </p>
                <button>Añadir al carrito</button>
                </div>
            </div>
            ))}
            </div>
        </main>
        </div>
    )
}

export default PrincipalScreen;