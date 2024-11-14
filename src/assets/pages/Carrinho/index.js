import React, { useState } from 'react';
import { getItem, setItem } from '../../services/local';
import { BsCartDash } from "react-icons/bs";
import Voltar from '../../components/voltar';
import './style.css';

const Carrinho = () => {
    const [cartItems, setCartItems] = useState(getItem('carrinhoYT') || []);

    const handleRemoveItem = (item) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(updatedCart);
        setItem('carrinhoYT', updatedCart);
    };

    const renderCartItem = (item) => (
        <div className="produto" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="produto-info">
                <h4>{item.title}</h4>
                <h4>R$ {item.price}</h4>
            </div>
            <button onClick={() => handleRemoveItem(item)} className="remove-button">
                <BsCartDash />
            </button>
            <a
                href={`https://www.mercadolivre.com.br/cerveja-heineken-premium-garrafa-6-long-neck-330ml/p/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-button"
            >
                Comprar
            </a>
        </div>
    );

    return (
        <div className="cart-container">
            <Voltar />
            <h1>Carrinho</h1>
            <div className="produto-container">
                {cartItems.length ? cartItems.map(renderCartItem) : <p>Seu carrinho está vazio.</p>}
            </div>
        </div>
    );
};

export default Carrinho;
