import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./carrosel.css";

const ProductsCarousel = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth; // anda um grupo de produtos

    // Verifica se está no fim ou no início
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
    const atStart = scrollLeft <= 5;

    if (direction === "right" && atEnd) {
      // Reseta para o início instantaneamente
      scrollRef.current.scrollTo({ left: 0, behavior: "auto" });

      // E só desliza para a direita na próxima vez que o botão for clicado
      return;
    }

    if (direction === "left" && atStart) {
      // Vai pro final instantaneamente
      scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: "auto" });

      // E só desliza pra esquerda na próxima vez que clicar
      return;
    }

    // Desliza normalmente
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-arrow left" onClick={() => scroll("left")}>
        <ChevronLeft size={32} />
      </button>

      <div className="carousel-track" ref={scrollRef}>
        {products.map((product) => (
          <div key={product.id} className="carousel-item">
            <a href="/smartwatch" className="product-card-link">
              <div className="product-image-container">
                <img src={product.imgSrc} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
            </a>
          </div>
        ))}
      </div>

      <button className="carousel-arrow right" onClick={() => scroll("right")}>
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ProductsCarousel;
