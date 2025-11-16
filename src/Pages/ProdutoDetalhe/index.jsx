import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/index.jsx';
import Footer from '../../components/footer/index.jsx';
import './index.css';
import { addItem } from '../../utils/cart.js';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../utils/config.js';

// Fallback local (mesmos produtos usados nas páginas de lista)
const localProducts = [
  { id: 1, name: 'Akko Tac75 HE Magnetico', price: 503.99, category: 'teclados', imgSrc: '/images-home/TacHE75.png', description: 'Teclado magnético de alta performance com switches HE.' },
  { id: 2, name: 'Akko MonsGeek FUN60', price: 367.47, category: 'teclados', imgSrc: '/images-home/Moonsgeek6.png', description: 'Teclado compacto 60% com iluminação RGB personalizável.' },
  { id: 3, name: 'AJAZZ AK820 Mecanico', price: 381.08, category: 'teclados', imgSrc: '/images-home/AjazzK.png', description: 'Teclado mecânico com construção sólida e keycaps de alta durabilidade.' },
  { id: 4, name: 'AULA HERO 68HE Magnetico', price: 587.18, category: 'teclados', imgSrc: '/images-home/Hero.png', description: 'Teclado 68 teclas com tecnologia magnética HE para resposta extrema.' },
  { id: 5, name: 'Logitech G435 LIGHTSPEED', price: 499.98, category: 'headsets', imgSrc: '/images-home/Logi.png', description: 'Headset gamer leve com conexão LIGHTSPEED e Bluetooth.' },
  { id: 6, name: 'Binnune BW06 HEADSET 2,4Ghz', price: 288.07, category: 'headsets', imgSrc: '/images-home/Binune.png', description: 'Headset sem fio 2,4 GHz com áudio imersivo para jogos.' },
  { id: 7, name: 'NUBWO G06 HEADSET GAMER', price: 358.09, category: 'headsets', imgSrc: '/images-home/Nub.png', description: 'Headset gamer confortável com som surround virtual.' },
  { id: 8, name: 'Baseus GH02 Gaming', price: 718.67, category: 'headsets', imgSrc: '/images-home/Baseus.png', description: 'Headset premium com drivers de alta fidelidade para gamers exigentes.' },
  { id: 9, name: 'Attack Shark X11 Base', price: 207.86, category: 'mouses', imgSrc: '/images-home/Shark.png', description: 'Mouse gamer com sensor de alta precisão e design ergonômico.' },
  { id: 10, name: 'MousePad Dragão', price: 56.08, category: 'mousepads', imgSrc: '/images-home/Dragão.png', description: 'Mousepad com estampa de dragão e superfície otimizada para controle.' },
  { id: 11, name: 'MousePad Exco Sports', price: 246.97, category: 'mousepads', imgSrc: '/images-home/Pad.png', description: 'Mousepad grande para setups gamers com movimentos amplos.' },
  { id: 12, name: 'Fone de Ouvido BUDS 6 Xiaomi', price: 206.99, category: 'fones', imgSrc: '/images-home/Buds.png', description: 'Fones true wireless com cancelamento de ruído e ótima bateria.' },
];

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se o produto já veio da navegação anterior (via state), não precisa buscar na API
    if (product) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const base = API_BASE_URL || import.meta.env.VITE_API_URL;
        if (base) {
          // Busca todos os produtos e filtra pelo id no front-end
          const res = await fetch(`${base}/produtos`, {
            signal: controller.signal,
          });

          if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : [];
            const found = list.find((p) => String(p.id) === String(id));
            if (found && found.id) {
              setProduct({
                id: found.id,
                name: found.name,
                price: found.price,
                category: found.category,
                imgSrc: found.imgSrc,
                description: found.description,
                specs: found.specs,
              });
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao buscar produto na API:', err);
        }
      }

      // Fallback para lista local
      const local = localProducts.find((p) => String(p.id) === String(id));
      if (local) {
        setProduct(local);
      } else {
        setError('Produto não encontrado.');
      }
      setLoading(false);
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.imgSrc,
      type: product.category || 'product',
    }, 1);
    toast.success('Produto adicionado ao carrinho');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="product-detail-container">
          {loading && <p className="status-text">Carregando produto...</p>}
          {!loading && error && <p className="status-text error">{error}</p>}
          {!loading && !error && product && (
            <div className="product-detail-card">
              <div className="product-detail-image">
                <img src={product.imgSrc} alt={product.name} />
              </div>
              <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p className="product-detail-price">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </p>
                {product.category && (
                  <p className="product-detail-category">Categoria: {product.category}</p>
                )}
                {product.description && (
                  <p className="product-detail-description">{product.description}</p>
                )}

                {product.specs && Array.isArray(product.specs) && product.specs.length > 0 && (
                  <div className="product-detail-specs">
                    <h2>Especificações</h2>
                    <ul>
                      {product.specs.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="product-detail-actions">
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Adicionar ao Carrinho
                  </button>
                  <button className="back-btn" onClick={handleBack}>
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProdutoDetalhe;
