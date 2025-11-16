import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';
import { getCheckoutItems, clearCheckoutItems, getCart, clearCart, formatBRL } from '../../utils/cart.js';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
    const [items, setItems] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'brasil',
        address: '',
        city: '',
        district: 'osasco',
        cep: '',
        contact: '',
        email: '',
        additionalInfo: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const list = getCheckoutItems();
        if (list && list.length > 0) {
            setItems(list);
            return;
        }
        const cart = getCart();
        if (!cart || cart.length === 0) {
            toast.error('Seu carrinho está vazio. Adicione itens para continuar.');
            navigate('/carrinho', { replace: true });
            return;
        }
        setItems(cart);
    }, [navigate]);

    const subtotal = useMemo(() => items.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0), [items]);

    const validate = () => {
        const err = {};
        const req = ['firstName','lastName','address','city','cep','contact','email'];
        req.forEach((k) => {
            if (!form[k] || String(form[k]).trim() === '') err[k] = 'Campo obrigatório';
        });
        if (!form.country) err.country = 'Selecione o país';
        if (!form.district) err.district = 'Selecione o bairro';
        if (form.email && !/.+@.+\..+/.test(form.email)) err.email = 'E-mail inválido';
        const cepDigits = (form.cep || '').replace(/\D/g, '');
        if (cepDigits.length !== 8) err.cep = 'CEP deve ter 8 dígitos';
        const contactDigits = (form.contact || '').replace(/\D/g, '');
        if (contactDigits.length < 10) err.contact = 'Contato inválido';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const placeOrder = () => {
        if (!validate()) {
            toast.error('Preencha todos os campos obrigatórios corretamente.');
            return;
        }
        clearCart();
        clearCheckoutItems();
        setOrderPlaced(true);
        toast.success('Compra finalizada! Obrigado pela compra.');
    };

    const closeModal = () => setOrderPlaced(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors((prev) => ({ ...prev, [id]: undefined }));
    };

    return (
        <div className="checkout-page">
            <Header />
            <main className="checkout-container">
                <h1>Finalizar Pagamento</h1>
                <div className="checkout-layout">
                    <form className="billing-details-form" onSubmit={(e)=>{ e.preventDefault(); placeOrder(); }}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">Primeiro nome</label>
                                <input type="text" id="firstName" value={form.firstName} onChange={handleChange} required className={errors.firstName ? 'input-error' : ''} aria-invalid={!!errors.firstName} />
                                {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Último nome</label>
                                <input type="text" id="lastName" value={form.lastName} onChange={handleChange} required className={errors.lastName ? 'input-error' : ''} aria-invalid={!!errors.lastName} />
                                {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyName">Nome da Empresa (opcional)</label>
                            <input type="text" id="companyName" value={form.companyName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">País / Região</label>
                            <select id="country" value={form.country} onChange={handleChange} required className={errors.country ? 'input-error' : ''} aria-invalid={!!errors.country}>
                                <option value="brasil">Brasil</option>
                            </select>
                            {errors.country && <div className="error-msg">{errors.country}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Endereço</label>
                            <input type="text" id="address" value={form.address} onChange={handleChange} required className={errors.address ? 'input-error' : ''} aria-invalid={!!errors.address} />
                            {errors.address && <div className="error-msg">{errors.address}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Cidade</label>
                            <input type="text" id="city" value={form.city} onChange={handleChange} required className={errors.city ? 'input-error' : ''} aria-invalid={!!errors.city} />
                            {errors.city && <div className="error-msg">{errors.city}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">Bairro / Região (Grande São Paulo)</label>
                            <select id="district" value={form.district} onChange={handleChange} required className={errors.district ? 'input-error' : ''} aria-invalid={!!errors.district}>
                                <option value="osasco">Osasco</option>
                                <option value="sao-paulo-zona-norte">São Paulo - Zona Norte</option>
                                <option value="sao-paulo-zona-sul">São Paulo - Zona Sul</option>
                                <option value="sao-paulo-zona-leste">São Paulo - Zona Leste</option>
                                <option value="sao-paulo-zona-oeste">São Paulo - Zona Oeste</option>
                                <option value="santo-andre">Santo André</option>
                                <option value="sao-bernardo-do-campo">São Bernardo do Campo</option>
                                <option value="sao-caetano-do-sul">São Caetano do Sul</option>
                                <option value="diadema">Diadema</option>
                                <option value="guarulhos">Guarulhos</option>
                                <option value="barueri">Barueri</option>
                                <option value="carapicuiba">Carapicuíba</option>
                                <option value="taboao-da-serra">Taboão da Serra</option>
                                <option value="embu-das-artes">Embu das Artes</option>
                                <option value="itapecerica-da-serra">Itapecerica da Serra</option>
                            </select>
                            {errors.district && <div className="error-msg">{errors.district}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cep">CEP</label>
                            <input type="text" id="cep" value={form.cep} onChange={handleChange} required placeholder="00000-000" className={errors.cep ? 'input-error' : ''} aria-invalid={!!errors.cep} />
                            {errors.cep && <div className="error-msg">{errors.cep}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contato</label>
                            <input type="text" id="contact" value={form.contact} onChange={handleChange} required placeholder="(11) 90000-0000" className={errors.contact ? 'input-error' : ''} aria-invalid={!!errors.contact} />
                            {errors.contact && <div className="error-msg">{errors.contact}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Endereço e-mail</label>
                            <input type="email" id="email" value={form.email} onChange={handleChange} required className={errors.email ? 'input-error' : ''} aria-invalid={!!errors.email} />
                            {errors.email && <div className="error-msg">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="additionalInfo">Informações adicionais</label>
                            <textarea id="additionalInfo" rows="4" value={form.additionalInfo} onChange={handleChange}></textarea>
                        </div>
                    </form>

                    <div className="order-summary">
                        <div className="summary-box">
                            <div className="summary-header">
                                <span>Produto</span>
                                <span>Subtotal</span>
                            </div>
                            {items && items.length > 0 ? (
                                items.map((it) => (
                                    <div key={`${it.type}-${it.id}`} className="summary-item">
                                        <span>{it.title} × {it.quantity || 1}</span>
                                        <span>{formatBRL((it.price || 0) * (it.quantity || 1))}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="summary-item">
                                    <span>Nenhum item no checkout</span>
                                    <span>{formatBRL(0)}</span>
                                </div>
                            )}
                            <div className="summary-subtotal">
                                <span>Subtotal</span>
                                <span>{formatBRL(subtotal)}</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{formatBRL(subtotal)}</span>
                            </div>
                        </div>
                        <div className="payment-methods">
                            <div className="payment-option">
                                <input type="radio" id="bankTransfer" name="paymentMethod" defaultChecked />
                                <label htmlFor="bankTransfer">Pagamento via Transferência Bancária</label>
                                <div className="payment-description">
                                    Faça seu pagamento diretamente em nossa conta bancária. Por favor, utilize o ID do seu pedido como referência no pagamento. Seu pedido não será enviado até o pagamento ser compensado.
                                </div>
                            </div>
                            <div className="payment-option">
                                <input type="radio" id="creditCard" name="paymentMethod" />
                                <label htmlFor="creditCard">Cartão de Crédito/Débito</label>
                            </div>
                            <div className="payment-option">
                                <input type="radio" id="onDelivery" name="paymentMethod" />
                                <label htmlFor="onDelivery">Pagamento na entrega</label>
                            </div>
                        </div>
                        <p className="privacy-note">
                            Seus dados pessoais serão utilizados para melhorar sua experiência em nosso site, gerenciar o acesso à sua conta e manter a sua privacidade como descrito em nossa <a href="#">Política de Privacidade</a>.
                        </p>
                        <button type="button" onClick={placeOrder} className="place-order-btn">Efetuar Compra</button>
                    </div>
                </div>
            </main>
            {orderPlaced && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                        <h3>Compra finalizada!</h3>
                        <p>Obrigado pela compra. Você receberá atualizações por e-mail.</p>
                        <button className="modal-btn" onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default CheckoutPage;
