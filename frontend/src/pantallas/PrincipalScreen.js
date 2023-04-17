import data from '../data';

function PrincipalScreen(){
    return(
        <div>
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

export default PrincipalScreen;