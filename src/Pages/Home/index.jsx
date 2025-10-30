import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem('logado');
    if (logado !== 'true') {
      alert('Você precisa estar logado para acessar a Home.');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('logado');
    navigate('/login');
  };

  return (
    <div>
      <header className="header">
        <h1 className="header-logo">TecnoX</h1>
        
        <nav className="header-nav">
          <button>Início</button>
          <button>Produtos</button>
          <button>Sobre</button>
          <button>Contatos</button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </header>
      <main>
        <h1>Bem-vindo à TecnoX</h1>
      </main>
    </div>
  );
}

export default Home;
