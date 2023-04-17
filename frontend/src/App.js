import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';
import DetallesPlatosScreen from './pantallas/DetallesPlatosScreen';
import LoginScreen from './pantallas/LoginScreen';
import { useContext } from 'react';
import { Store } from './Store';


function App() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    return(
        <BrowserRouter>
        <div>
            <header>
                <Link to="/">CampusBite</Link>

                {userInfo ? (
                    <span>{userInfo.name} </span>
                ) : (
                        <Link to="/login">LoginScreen</Link>
                )}
                
            </header>
            <main>
                <Routes>
                    <Route path="/product/:slug" element={<DetallesPlatosScreen />}/>
                    <Route path="/" element={<PrincipalScreen />}/>
                    <Route path="/login" element={<LoginScreen />}/>
                </Routes>
            </main>
        </div>
    </BrowserRouter>
    )
}

export default App;
