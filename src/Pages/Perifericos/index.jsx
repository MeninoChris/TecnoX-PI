import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';
import { addItem } from '../../utils/cart.js';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../utils/config.js';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = API_BASE_URL;
        if (!base) throw new Error('API_BASE_URL não configurada');
        const res = await fetch(`${base}/produtos`);
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        const data = await res.json();
        const perif = (Array.isArray(data) ? data : []).filter(
          (p) => !p.segment || p.segment === 'perifericos'
        );
        setAllProducts(perif);
      } catch (e) {
        setError(e.message || 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'todos', label: 'Todos os Produtos' },
    { id: 'teclados', label: 'Teclados' },
    { id: 'mouses', label: 'Mouses' },
    { id: 'headsets', label: 'Headsets' },
    { id: 'mousepads', label: 'MousePads' },
    { id: 'fones', label: 'Fones de Ouvido' },
  ];

  // Filtrar produtos
  let filteredProducts = selectedCategory === 'todos'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  // Ordenar produtos
  if (sortBy === 'nome') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'preco-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'preco-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Header />
      <main className="page-wrapper">
        {/* Seção Hero */}
        <section className="products-hero">
          <div className="section-container">
            <h1>Nossos Perifericos</h1>
            <p>Encontre os melhores periféricos para sua configuração</p>
          </div>
        </section>

        {/* Seção de Filtros e Produtos */}
        <section className="products-content">
          <div className="section-container">
            {/* Sidebar de Filtros */}
            <aside className="filters-sidebar">
              <div className="filter-group">
                <h3>Categorias</h3>
                <div className="category-list">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Ordenar por</h3>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="nome">Nome (A-Z)</option>
                  <option value="preco-asc">Preço (Menor)</option>
                  <option value="preco-desc">Preço (Maior)</option>
                </select>
              </div>
            </aside>

            {/* Grid de Produtos */}
            <div className="products-main">
              <div className="products-info">
                <p className="product-count">
                  Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <Link
                        to={`/produto/${product.id}`}
                        state={{ product }}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className="product-image">
                          <img src={product.imgSrc} alt={product.name} />
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p className="product-price">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </Link>
                      <div className="product-info">
                        <button
                          className="add-to-cart-btn"
                          onClick={() => {
                            addItem({
                              id: product.id,
                              title: product.name,
                              price: product.price,
                              image: product.imgSrc,
                              type: product.category || 'product',
                            }, 1);
                            toast.success('Adicionado ao carrinho');
                          }}
                        >
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-products">
                    <p>Nenhum produto encontrado nesta categoria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
