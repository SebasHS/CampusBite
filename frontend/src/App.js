import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';
import DetallesPlatosScreen from './pantallas/DetallesPlatosScreen';
import LoginScreen from './pantallas/LoginScreen';
import { useContext } from 'react';
import { Store } from './Store';
import RegisterScreen from './pantallas/RegisterScreen';
import EditarDatosScreen from './pantallas/EditarDatosScreen';


function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const logoutHandler = () => {
        ctxDispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
    }

    return(
        <BrowserRouter>
        <div>
            <header className='MenuNav'>
                <Link to="/">CampusBite</Link>

                {userInfo ? (
                    <>
                    <span>{userInfo.name} </span>
                    <div className='MenuPostLogueo'>
                        <Link to="/editardatos">Editar Datos</Link>
                        <Link to="#logout" onClick={logoutHandler}>Desloguearse</Link>
                    </div>
                    
                    </> 
                ) : (
                        <Link to="/login">LoginScreen</Link>
                )}
                
            </header>
            <main>
                <Routes>
                    <Route path="/product/:slug" element={<DetallesPlatosScreen />}/>
                    <Route path="/" element={<PrincipalScreen />}/>
                    <Route path="/login" element={<LoginScreen />}/>
                    <Route path="/register" element={<RegisterScreen />}/>
                    <Route path="/editardatos" element={<EditarDatosScreen />}/>
                </Routes>
            </main>
        </div>
    </BrowserRouter>
    )
}

export default App;