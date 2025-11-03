import React from 'react';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const SobreNosPage = () => {
    return (
        <div className="sobre-nos-page">
            <Header />
            <main className="sobre-nos-container">
                <section className="intro-section">
                    <h1>Sobre Nós</h1>
                    <p>Na TecnoX, somos movidos por uma paixão: tecnologia que faz a diferença no dia a dia. Seja um celular de última geração, aquele setup gamer dos sonhos ou acessórios que facilitam a vida, nossa missão é conectar você ao que há de mais moderno, com praticidade e confiança.
Aqui, acreditamos que tecnologia não é só produto, é experiência. Por isso, buscamos sempre novidades, lançamentos e tudo que possa deixar sua rotina mais inteligente, divertida e conectada.</p>
                </section>

                <section className="details-section">
                    <div className="contact-info">
                        <div className="info-block">
                            <MapPinIcon />
                            <div className="info-text">
                                <h2>Endereço</h2>
                                <p>Rua Alvaro Gonzales, 734</p>
                            </div>
                        </div>
                        <div className="info-block">
                            <PhoneIcon />
                            <div className="info-text">
                                <h2>Telefone</h2>
                                <p>Celular: (11) 9002-8922</p>
                                <p>Central de Atendimento: +55 (11) 9001-5002</p>
                            </div>
                        </div>
                        <div className="info-block">
                            <ClockIcon />
                            <div className="info-text">
                                <h2>Horários</h2>
                                <p>Segunda a sexta: 8h00 às 17h00</p>
                                <p>Sábado e domingo: 9h00 às 17h30</p>
                            </div>
                        </div>
                    </div>
                    <div className="company-description">
                        <p>O “X” da nossa logo não é só uma letra: ele simboliza o encontro entre você e a tecnologia. Os detalhes em forma de circuito mostram que estamos ligados direto ao futuro, enquanto o design clean mostra que dá pra ser moderno sem complicar.</p>
                        <p>A TecnoX é mais que uma loja online. É o espaço de quem ama tecnologia, inovação e não abre mão de estar sempre um passo à frente. </p>
                    
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SobreNosPage;