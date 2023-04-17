import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrincipalScreen from './pantallas/PrincipalScreen';



function App() {
    return(
        <BrowserRouter>
        <div>
            <header>
                <a href="/">CampusBite</a>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<PrincipalScreen />}/>
                </Routes>
            </main>
        </div>
    </BrowserRouter>
    )
}

export default App;
