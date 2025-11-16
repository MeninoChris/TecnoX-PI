import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';
import { getCart, updateQty, removeItem, setCheckoutItems, formatBRL } from '../../utils/cart.js';
import { toast } from 'react-hot-toast';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const CartPage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const subtotal = useMemo(
        () => items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0),
        [items]
    );

    const handleQtyChange = (id, type, value) => {
        const updated = updateQty(id, type, value);
        setItems([...updated]);
    };

    const handleRemove = (id, type) => {
        const updated = removeItem(id, type);
        setItems([...updated]);
    };

    const handleCheckoutClick = (e) => {
        if (items.length === 0) {
            e.preventDefault();
            toast.error('Seu carrinho está vazio. Adicione itens para continuar.');
            return;
        }
        try {
            setCheckoutItems(items);
        } catch (err) {
            e.preventDefault();
            toast.error('Não foi possível preparar o checkout. Tente novamente.');
        }
    };

    return (
        <div className="cart-page">
            <Header />
            <main className="cart-container">
                <div className="cart-layout">
                    <div className="cart-items-section">
                        <div className="cart-header">
                            <span className="header-product">Produto</span>
                            <span className="header-price">Preço</span>
                            <span className="header-quantity">Quantidade</span>
                            <span className="header-subtotal">Subtotal</span>
                        </div>
                        {items.length === 0 ? (
                            <div className="cart-item" style={{ gridTemplateColumns: '1fr' }}>
                                <div className="product-details">
                                    <span>Seu carrinho está vazio.</span>
                                </div>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={`${item.type}-${item.id}`} className="cart-item">
                                    <div className="product-details" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img src={item.image || '/fallback.svg'} alt={item.title} />
                                        <span>{item.title}</span>
                                    </div>
                                    <span className="item-price" data-label="Preço">{formatBRL(item.price)}</span>
                                    <div className="quantity-selector" data-label="Quantidade">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity || 1}
                                            onChange={(e) => handleQtyChange(item.id, item.type, e.target.value)}
                                        />
                                    </div>
                                    <span className="item-subtotal" data-label="Subtotal">{formatBRL((item.price || 0) * (item.quantity || 1))}</span>
                                    <button className="remove-item-btn" onClick={() => handleRemove(item.id, item.type)}>
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="cart-summary-section">
                        <h2>Carrinho total</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatBRL(subtotal)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>{formatBRL(subtotal)}</span>
                        </div>
                        <Link to="/checkout" className="checkout-btn" onClick={handleCheckoutClick}>
                            Checkout
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;
