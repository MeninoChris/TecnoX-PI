import React, { useState } from 'react';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('nome');

  const allProducts = [
    { id: 1, name: 'Akko Tac75 HE Magnetico', price: 503.99, category: 'teclados', imgSrc: '/images-home/TacHE75.png' },
    { id: 2, name: 'Akko MonsGeek FUN60', price: 367.47, category: 'teclados', imgSrc: '/images-home/Moonsgeek6.png' },
    { id: 3, name: 'AJAZZ AK820 Mecanico', price: 381.08, category: 'teclados', imgSrc: '/images-home/AjazzK.png' },
    { id: 4, name: 'AULA HERO 68HE Magnetico', price: 587.18, category: 'teclados', imgSrc: '/images-home/Hero.png' },
    { id: 5, name: 'Logitech G435 LIGHTSPEED', price: 499.98, category: 'headsets', imgSrc: '/images-home/Logi.png' },
    { id: 6, name: 'Binnune BW06 HEADSET 2,4Ghz', price: 288.07, category: 'headsets', imgSrc: '/images-home/Binune.png' },
    { id: 7, name: 'NUBWO G06 HEADSET GAMER', price: 358.09, category: 'headsets', imgSrc: '/images-home/Nub.png' },
    { id: 8, name: 'Baseus GH02 Gaming', price: 718.67, category: 'headsets', imgSrc: '/images-home/Baseus.png' },
    { id: 9, name: 'Attack Shark X11 Base', price: 207.86, category: 'mouses', imgSrc: '/images-home/Shark.png' },
    { id: 10, name: 'MousePad Dragão', price: 56.08, category: 'mousepads', imgSrc: '/images-home/Dragão.png' },
    { id: 11, name: 'MousePad Exco Sports', price: 246.97, category: 'mousepads', imgSrc: '/images-home/Pad.png' },
    { id: 12, name: 'Fone de Ouvido BUDS 6 Xiaomi', price: 206.99, category: 'fones', imgSrc: '/images-home/Buds.png' },
  ];

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
            <h1>Nossos Produtos</h1>
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
                      <div className="product-image">
                        <img src={product.imgSrc} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="product-price">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                        <button className="add-to-cart-btn">Adicionar ao Carrinho</button>
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
