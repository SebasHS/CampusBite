import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';
import DetallesPlatosScreen from './pantallas/DetallesPlatosScreen';
import LoginScreen from './pantallas/LoginScreen';
import { useContext } from 'react';
import { Store } from './Store';
import RegisterScreen from './pantallas/RegisterScreen';
import EditarDatosScreen from './pantallas/EditarDatosScreen';
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'


function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const { cart } = state;

    const logoutHandler = () => {
        ctxDispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    }

    return(
        <BrowserRouter>
        <div>
            <header className='MenuNav'>
                <Link to="/">CampusBite</Link>
                <Nav>
                    <Link to="/cart" className='nav-link'>
                        Carrito
                        {cart.cartItems.length > 0 && (
                            <Badge pill bg="danger">
                                {cart.cartItems.length} 
                            </Badge>
                        )}


                    </Link>
                </Nav>
                {userInfo ? (
                    <>
                    <span>Hola, {userInfo.name} </span>
                    <div className='MenuPostLogueo'>
                        <Link to="/editardatos">Editar Datos</Link>
                        <Link to="#logout" onClick={logoutHandler}>Desloguearse</Link>
                    </div>
                    
                    </> 
                ) : (
                        <Link to="/login">Inicio de sesión</Link>
                )}
                
            </header>
            <main>
                <Container className='mt-2'>
                    <Routes>
                        <Route path="/product/:slug" element={<DetallesPlatosScreen />}/>
                        <Route path="/" element={<PrincipalScreen />}/>
                        <Route path="/login" element={<LoginScreen />}/>
                        <Route path="/register" element={<RegisterScreen />}/>
                        <Route path="/editardatos" element={<EditarDatosScreen />}/>
                    </Routes>
                </Container>
            </main>
        </div>
    </BrowserRouter>
    )
}

export default App;