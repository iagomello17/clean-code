import React, { useState, useEffect } from 'react';
import { BsCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../../services/local';
import { Link } from 'react-router-dom';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYT') || []);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/sites/MLB/search?q=cerveja');
            if (!response.ok) throw new Error('API request failed');

            const { results } = await response.json();
            setProducts(results);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleCartItem = (product) => {
        const isInCart = cart.some((item) => item.id === product.id);

        const updatedCart = isInCart
            ? cart.filter((item) => item.id !== product.id)
            : [...cart, product];

        setCart(updatedCart);
        setItem('carrinhoYT', updatedCart);
    };

    const renderProduct = (product) => (
        <div key={product.id} className="store-item">
            <h4>{product.title}</h4>
            <img src={product.thumbnail} alt={product.title} />
            <h4>R$ {product.price}</h4>
            <button onClick={() => toggleCartItem(product)}>
                {cart.some((item) => item.id === product.id) ? (
                    <BsCartCheckFill />
                ) : (
                    <BsCartPlusFill />
                )}
            </button>
        </div>
    );

    return (
        <div>
            <header className="store-header">
                <h1>Loja</h1>
                <Link to="/carrinho" className="button-cart">
                    Carrinho ({cart.length})
                </Link>
            </header>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="store-items">
                    {products.map(renderProduct)}
                </div>
            )}
        </div>
    );
};

export default Store;
