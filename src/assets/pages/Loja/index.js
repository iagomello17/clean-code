import React, { useState, useEffect } from 'react';
import { BsCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../../services/local';
import { Link } from 'react-router-dom';
import './style.css';

const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYT') || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = '/api/sites/MLB/search?q=cerveja';
                const response = await fetch(url);
                if (!response.ok) throw new Error('API request failed');
                const objJson = await response.json();
                setData(objJson.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    const toggleCartItem = (item) => {
        const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

        let updatedCart;
        if (itemInCart) {
            updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
        } else {
            updatedCart = [...cart, item];
        }

        setCart(updatedCart);
        setItem('carrinhoYT', updatedCart);
    };

    return (
        <div>
            <div className="store-header">
                <h1>Loja</h1>
                <Link to='/Carrinho' className="button-cart">
                    Carrinho ({cart.length})
                </Link>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="store-items">
                    {data.map((item) => (
                        <div key={item.id} className="store-item">
                            <h4>{item.title}</h4>
                            <img src={item.thumbnail} alt={item.title} />
                            <h4>R$ {item.price}</h4>
                            <button onClick={() => toggleCartItem(item)}>
                                {cart.some((cartItem) => cartItem.id === item.id) ? (
                                    <BsCartCheckFill />
                                ) : (
                                    <BsCartPlusFill />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Store;
