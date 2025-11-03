import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import ProductsCarousel from '../../components/Carrosel/carrosel.jsx';
import './index.css';

const products = [
    { id: 1, name: 'Akko Tac75 HE Magnetico', price: 'R$503,99', imgSrc: '/images-home/TacHE75.png' },
    { id: 2, name: 'Akko MonsGeek FUN60', price: 'R$367,47', imgSrc: '/images-home/Moonsgeek6.png' },
    { id: 3, name: 'AJAZZ AK820 Mecanico', price: 'R$381,08', imgSrc: '/images-home/AjazzK.png' },
    { id: 4, name: 'AULA HERO 68HE Magnetico', price: 'R$587,18', imgSrc: '/images-home/Hero.png' },
    { id: 5, name: 'Logitech G435 LIGHTSPEED', price: 'R$499,98', imgSrc: '/images-home/Logi.png' },
    { id: 6, name: 'Binnune BW06 HEADSET 2,4Ghz', price: 'R$288,07', imgSrc: '/images-home/Binune.png' },
    { id: 7, name: 'NUBWO G06 HEADSET GAMER', price: 'R$358,09', imgSrc: '/images-home/Nub.png' },
    { id: 8, name: 'Baseus GH02 Gaming', price: 'R$718,67', imgSrc: '/images-home/Baseus.png' },
    { id: 9, name: 'Attack Shark X11 Base', price: 'R$207,86', imgSrc: '/images-home/Shark.png' },
    { id: 10, name: 'MousePad Dragão ', price: 'R$56,08', imgSrc: '/images-home/Dragão.png' },
    { id: 11, name: 'MousePad Exco Sports', price: 'R$246,97', imgSrc: '/images-home/Pad.png' },
    { id: 12, name: 'Fone de Ouvido BUDS 6 Xiaomi', price: 'R$206,99', imgSrc: '/images-home/Buds.png' },
];

const Home = () => {

  
    return (
        <>
            <Header />
            {/* Usamos 'page-wrapper' para definir o fundo branco padrão */}
            <main className="page-wrapper">
                {/* Seção Hero Principal (Fundo preto full-width) */}
                <section className="hero-section hero-main">
                    <div className="section-container"> {/* Container centralizado */}
                        <div className="hero-content">
                            <h1>PLaca de video <br /> RTX 5090</h1>
                            {/* CTA leva para a listagem de Smartwatches */}
                            <Link to="/" className="cta-button" style={{ textDecoration: 'none' }}>Compre agora</Link>
                        </div>
                        <div className="hero-image1">
                            <img src="/images-home/Placa5090.png" alt="Placa de Video 5090" />
                        </div>
                    </div>
                </section>

                {/* Seção de Produtos (Fundo branco full-width) */}
                <section className="products-section">
                    <div className="section-container"> {/* Container centralizado */}
                        <h2>Principais escolhas dos clientes</h2>
                        <p>Encontre o periferico ideal para seu computador com nossa seleção dos modelos mais vendidos.</p>
                        <ProductsCarousel products={products} />

                    </div>
                </section>

                {/* Seção de Novidade (Fundo preto full-width) */}
                <section className="hero-section hero-secondary">
                    <div className="section-container"> {/* Container centralizado */}
                        <div className="hero-image">
                            <img src="/images-home/asus.png" alt="Novidade Watch 10 Ultra" />
                        </div>
                        <div className="hero-content">
                            <p className="subtitle">Novidade</p>
                            <h2>ROG Swift OLED</h2>
                            <h6>Monitor gamer ROG Swift OLED de 26,5 polegadas permite escolher entre resolução 2K com taxa de atualização de 540 Hz ou 720p a 720 Hz.</h6>
                            <Link to="/" className="cta-button" style={{ textDecoration: 'none', display: 'inline-block' }}>Em Breve</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
