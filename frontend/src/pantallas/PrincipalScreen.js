import data from '../data';
import Navbar from 'react-bootstrap/Navbar';

export default function PrincipalScreen(){
    return(
    <div>
      <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <a href="/">CampusBite</a>
      </Navbar>
      </header>
      <main>
        <h1>Carta de cafetería</h1>
        <div className='products'>
          {data.products.map((product) =>(
          <div className='product' key={product.slug}>
            <a href={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </a>
            <div className='product-info'>
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>
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