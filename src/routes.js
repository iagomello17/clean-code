import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './assets/pages/Home';
import Login from './assets/pages/Login';
import Loja from './assets/pages/Loja';
import Erro from './assets/pages/Erro';
import Carrinho from './assets/pages/Carrinho';
import Cadastro from './assets/pages/Cadastro';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;

