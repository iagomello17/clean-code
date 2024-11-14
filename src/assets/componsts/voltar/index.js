import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';  
import logo from '../../imagens/Beer Mapper.svg';

function Voltar() {
    return (
        <Link to="/">
            <button className="voltar-button">
                Voltar
            </button>
        </Link>
    );
}

export default Voltar;