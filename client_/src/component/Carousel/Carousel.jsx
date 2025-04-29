import { useEffect, useState } from "react";
import "./carousel.styles.scss";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000); // Transition automatique toutes les 5 secondes

    return () => clearInterval(interval);
  }, [data]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  if (!data || data.length === 0) return <p className="carousel-empty">No images to display</p>;

  return (
    <div className="carousel-container">
      {/* Bouton Précédent */}
      <button className="carousel-button prev" onClick={goToPrevious}>
        &#10094;
      </button>

      {/* Image Actuelle et son ombre */}
      <div className="carousel-image">
        <img className="image" src={data[currentIndex]} alt={`Carousel ${currentIndex}`} />
        <img className="shadow" src={data[currentIndex]} alt="" />
      </div>

      {/* Bouton Suivant */}
      <button className="carousel-button next" onClick={goToNext}>
        &#10095;
      </button>

      {/* Indicateurs */}
      <div className="carousel-indicators">
        {data.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
