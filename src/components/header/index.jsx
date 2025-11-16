import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAdminEmail } from '../../utils/config';
import './index.css';

// Ícones
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const BagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const HamburgerIcon = ({ open }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {open ? (
            <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
        ) : (
            <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
        )}
    </svg>
);

const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showAdmin, setShowAdmin] = useState(false);

    // Admin visibility e dados do usuário logado
    useEffect(() => {
        try {
            const usuarioLogadoRaw = localStorage.getItem('usuarioLogado');
            const usuarioLogado = usuarioLogadoRaw ? JSON.parse(usuarioLogadoRaw) : null;
            setCurrentUser(usuarioLogado);
            setShowAdmin(!!usuarioLogado && isAdminEmail(usuarioLogado.email));
        } catch (e) {
            setCurrentUser(null);
            setShowAdmin(false);
        }
    }, []);

    const toggleSearch = () => setSearchOpen(!searchOpen);
    const handleSearchChange = (e) => setSearchValue(e.target.value);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert(`Você buscou: "${searchValue}"`); // aqui você pode redirecionar ou filtrar produtos
        setSearchValue('');
        setSearchOpen(false);
    };

    // Fecha o menu mobile ao navegar (escuta mudanças de hash/URL simplistas)
    useEffect(() => {
        const closeOnResize = () => {
            if (window.innerWidth > 992 && mobileOpen) setMobileOpen(false);
        };
        window.addEventListener('resize', closeOnResize);
        return () => window.removeEventListener('resize', closeOnResize);
    }, [mobileOpen]);

    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img
                        className="logo"
                        src="/logo2.png"
                        alt="LOSSANTOS"
                    />
                </Link>


                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/perifericos">Periféricos</Link>
                    <Link to="/sobre">Sobre nós</Link>
                    {showAdmin && <Link to="/admin/produtos">Admin</Link>}
                </nav>

                <div className="header-icons">
                    <button
                        className="hamburger-button"
                        aria-label="Abrir menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobileMenu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <HamburgerIcon open={mobileOpen} />
                    </button>
                    <button onClick={toggleSearch} className="search-button">
                        <SearchIcon />
                    </button>

                    <Link to="/carrinho">
                        <BagIcon />
                    </Link>
                    {currentUser ? (
                        <button
                            type="button"
                            className="user-button"
                            onClick={() => setUserMenuOpen((v) => !v)}
                        >
                            <UserIcon />
                        </button>
                    ) : (
                        <Link to="/login">
                            <UserIcon />
                        </Link>
                    )}
                </div>
            </div>

            {/* Campo de pesquisa */}
            {searchOpen && (
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Digite para buscar..."
                        autoFocus
                    />
                    <button type="submit">Buscar</button>
                </form>
            )}

            {/* Menu Mobile */}
            <div
                id="mobileMenu"
                className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="mobile-menu-header">
                    <img className="logo" src="/logo2.png" alt="LOSSANTOS" />
                    <button className="close-mobile" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}>
                        <HamburgerIcon open={true} />
                    </button>
                </div>
                <nav className="mobile-navigation" onClick={() => setMobileOpen(false)}>
                    <Link to="/">Home</Link>
                    <Link to="/produtos">Produtos</Link>
                    <Link to="/perifericos">Periféricos</Link>
                    <Link to="/sobrenos">Sobre nós</Link>
                    {showAdmin && <Link to="/admin/produtos">Admin</Link>}
                    <Link to="/carrinho">Carrinho</Link>
                    <Link to="/login">Minha conta</Link>
                </nav>
            </div>
            {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}

            {currentUser && userMenuOpen && (
                <div className="user-menu">
                    <div className="user-menu-header">
                        <span className="user-email">{currentUser.email}</span>
                    </div>
                    <button
                        type="button"
                        className="user-menu-item"
                        onClick={() => {
                            localStorage.removeItem('logado');
                            localStorage.removeItem('usuarioLogado');
                            window.location.href = '/login';
                        }}
                    >
                        Sair
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
