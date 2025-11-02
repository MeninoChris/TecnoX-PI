import React from 'react';
import './index.css';


const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-info">
                    <p>Atendimento: Segunda a Sexta, das 8h às 17h</p>
                    <p>E-mail: TecnoXEmpress@gmail.com</p>
                    <p>Telefone: +55 (11) 9001-5002</p>
                    <p>WhatsApp: (11) 9002-8922</p>
                    <p className="address">Rua Alvaro Gonzales, 734</p>
                </div>
                <div className="payment-methods">
                    <img src="/footer/imagevisa.png" alt="Visa" className="payment-icon" />
                    <img src="/footer/imagemaster.png" alt="MasterCard" className="payment-icon" />
                    <img src="/footer/imageelo.png" alt="Elo" className="payment-icon" />
                    <img src="/footer/imageamerican.png" alt="American Express" className="payment-icon" />
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Archer Studios. | Projeto acadêmico.</p>
            </div>
        </footer>
    );
};

export default Footer;