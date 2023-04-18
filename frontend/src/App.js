import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';
import DetallesPlatosScreen from './pantallas/DetallesPlatosScreen';
import LoginScreen from './pantallas/LoginScreen';
import { useContext } from 'react';
import { Store } from './Store';
import RegisterScreen from './pantallas/RegisterScreen';


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
            <header>
                <Link to="/">CampusBite</Link>

                {userInfo ? (
                    <>
                    <span>{userInfo.name} </span>
                    <Link to="#logout" onClick={logoutHandler}>Desloguearse</Link>
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
                </Routes>
            </main>
        </div>
    </BrowserRouter>
    )
}

export default App;
