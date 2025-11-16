import React, { useEffect, useState } from 'react';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';
import { API_BASE_URL } from '../../utils/config.js';
import { toast } from 'react-hot-toast';

const AdminProdutos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    segment: 'produtos',
    name: '',
    price: '',
    category: '',
    imgSrc: '',
    description: '',
    specsText: '',
  });

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = API_BASE_URL;
        if (!base) throw new Error('API_BASE_URL não configurada');
        const res = await fetch(`${base}/produtos`);
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.imgSrc) {
      toast.error('Preencha nome, preço e URL da imagem.');
      return;
    }
    try {
      setSaving(true);
      const base = API_BASE_URL;
      if (!base) throw new Error('API_BASE_URL não configurada');
      const specs = form.specsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const body = {
        segment: form.segment,
        name: form.name,
        price: Number(form.price),
        category: form.category,
        imgSrc: form.imgSrc,
        description: form.description,
        specs,
      };

      const res = await fetch(`${base}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Falha ao salvar produto');
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setForm({
        segment: 'produtos',
        name: '',
        price: '',
        category: '',
        imgSrc: '',
        description: '',
        specsText: '',
      });
      toast.success('Produto cadastrado com sucesso');
    } catch (e) {
      toast.error(e.message || 'Erro ao salvar produto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmDelete) return;
    try {
      setDeletingId(id);
      const base = API_BASE_URL;
      if (!base) throw new Error('API_BASE_URL não configurada');
      const res = await fetch(`${base}/produtos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir produto');
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success('Produto removido');
    } catch (e) {
      toast.error(e.message || 'Erro ao excluir produto');
    } finally {
      setDeletingId(null);
    }
  };

  const formatBRL = (n) => {
    const num = Number(n || 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  };

  return (
    <>
      <Header />
      <main className="admin-page">
        <div className="admin-content">
          <h1>Administração de Produtos</h1>

          {error && <p className="admin-error">Erro: {error}</p>}

          <section className="admin-section">
            <h2>Novo produto</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Onde exibir:
                  <select name="segment" value={form.segment} onChange={handleChange}>
                    <option value="produtos">Produtos</option>
                    <option value="perifericos">Periféricos</option>
                  </select>
                </label>
                <label>
                  Categoria:
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="teclados">Teclados</option>
                    <option value="mouses">Mouses</option>
                    <option value="headsets">Headsets</option>
                    <option value="mousepads">Mousepads</option>
                    <option value="fones">Fones</option>
                    <option value="monitores">Monitores</option>
                    <option value="computadores">Computadores</option>
                    <option value="placas-de-video">Placas de Vídeo</option>
                    <option value="fontes">Fontes</option>
                    <option value="gabinetes">Gabinetes</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Nome:
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Preço (R$):
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                URL da imagem:
                <input
                  type="text"
                  name="imgSrc"
                  value={form.imgSrc}
                  onChange={handleChange}
                  placeholder="Ex: https://... ou /images-products/PC1.png"
                  required
                />
              </label>

              <label>
                Descrição:
                <textarea
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
              </label>

              <label>
                Especificações (uma por linha):
                <textarea
                  name="specsText"
                  rows="4"
                  value={form.specsText}
                  onChange={handleChange}
                  placeholder="Ex: \nLayout 75%\nSwitches magnéticos HE\nIluminação RGB"
                />
              </label>

              <button type="submit" className="admin-btn" disabled={saving}>
                {saving ? 'Salvando...' : 'Adicionar produto'}
              </button>
            </form>
          </section>

          <section className="admin-section">
            <h2>Produtos cadastrados</h2>
            {loading && <p>Carregando...</p>}
            {!loading && items.length === 0 && <p className="empty-state">Nenhum produto cadastrado.</p>}
            {!loading && items.length > 0 && (
              <ul className="admin-list">
                {items.map((p) => (
                  <li key={p.id} className="admin-list-item">
                    <div className="admin-item-main">
                      <img className="admin-thumb" src={p.imgSrc || '/fallback.svg'} alt={p.name} />
                      <div>
                        <div className="admin-title">{p.name}</div>
                        <div className="admin-meta">
                          {p.segment === 'perifericos' ? 'Periféricos' : 'Produtos'}
                          {p.category ? ` • ${p.category}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      <span className="admin-price">{formatBRL(p.price)}</span>
                      <button
                        className="admin-btn admin-btn-danger"
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                      >
                        {deletingId === p.id ? 'Excluindo...' : 'Excluir'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminProdutos;
