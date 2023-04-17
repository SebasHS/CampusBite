import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';
import DetallesPlatosScreen from './pantallas/DetallesPlatosScreen';
import LoginScreen from './pantallas/LoginScreen';


function App() {
    return(
        <BrowserRouter>
        <div>
            <header>
                <Link to="/">CampusBite</Link>
                <Link to="/login">LoginScreen</Link>
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
