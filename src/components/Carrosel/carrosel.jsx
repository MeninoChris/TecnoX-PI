import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./carrosel.css";

const ProductsCarousel = ({ products }) => {
  const scrollRef = useRef(null);

  /**
   * Lógica de rolagem suave com loop
   */
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Esta linha é a chave: ela rola a largura visível (clientWidth).
    // Para rolar 4 itens, seu CSS DEVE garantir que apenas 4 itens
    // estejam visíveis (como discutimos na outra mensagem).
    const scrollAmount = clientWidth;

    if (direction === "left") {
      // Se já está no começo (com margem de 5px)
      if (scrollLeft <= 5) {
        // Vai para o fim suavemente
        scrollRef.current.scrollTo({
          left: scrollWidth - clientWidth,
          behavior: "smooth",
        });
      } else {
        // Apenas rola para a esquerda
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      // direction === "right"
      // Se já está no fim (com margem de 5px)
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      
      if (atEnd) {
        // Vai para o começo suavemente
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Apenas rola para a direita
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="carousel-wrapper">
      <button
        className="carousel-arrow left"
        onClick={() => scroll("left")}
        aria-label="Rolar para a esquerda" // <-- MUDANÇA (Acessibilidade)
      >
        <ChevronLeft size={32} />
      </button>

      <div className="carousel-track" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
            <Link 
              to={`/produto/${product.id}`}
              className="product-card-link"
            >
              <div className="product-image-container">
                <img src={product.imgSrc} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
            </Link>
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow right"
        onClick={() => scroll("right")}
        aria-label="Rolar para a direita" // <-- MUDANÇA (Acessibilidade)
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ProductsCarousel;