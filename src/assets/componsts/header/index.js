import React from 'react';
import { Link } from "react-router-dom";
import './stylle.css';  
import logo from '../../imagens/Beer Mapper.svg';

function Header() {
    return (
        <header>
            <div>
                <Link to="/" className="">
                    <img className = "beer" src={logo} width="150" alt="Beer Mapper" />
                </Link>
            </div>

            <div className='meio'>
                <Link className="Loja" to="/Loja">Comprar</Link>  
                <Link className="login" to="/Login">Entrar</Link>  
                <Link className="ajuda" to="/">Ajuda</Link>
            </div>
        </header>
    );
}

export default Header;
