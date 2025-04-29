import React, { useEffect, useState } from "react";
import "./home.styles.scss";

const Home = () => {
  const slides = [
    {
      text: "Welcome to Our Luxury Hotel",
      description: "Enjoy a luxurious stay with world-class amenities.",
      image:
        "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?cs=srgb&dl=pexels-pixabay-221457.jpg&fm=jpg",
    },
    {
      text: "Relax in Our King-Size Beds",
      description: "Experience unmatched comfort and restful nights.",
      image:
        "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2015/11/shangri-la-london-at-the-shard.jpg?ssl=1",
    },
    {
      text: "Savor Fine Dining at Our Restaurant",
      description: "Indulge in gourmet dishes prepared by top chefs.",
      image:
        "https://vipcation.eu/frontend/images/hotels/hotels_explore.jpg",
    },
    {
      text: "Unwind in Our Luxurious Spa",
      description: "Relax and rejuvenate with our premium spa services.",
      image:
        "https://www.district-immo.com/wp-content/uploads/2022/01/raffles-hotels-and-resort.png",
    },
  ];

  const services = [
    {
      title: "King-Size Beds",
      description: "Sleep soundly in our spacious and ultra-comfortable king-size beds.",
      details: "Our rooms are equipped with premium king-size beds, high-quality linens, and plush pillows to ensure you have the most restful sleep.",
      additionalImages: [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg",
      ],
    },
    {
      title: "Gourmet Dining",
      description: "Enjoy fine dining prepared by world-class chefs in an elegant setting.",
      details: "Our restaurant offers a carefully curated menu with locally sourced ingredients, providing you with an unforgettable dining experience.",
      additionalImages: [
        "https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg",
        "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
      ],
    },
    {
      title: "Luxurious Spa",
      description: "Rejuvenate your mind and body with our professional spa treatments.",
      details: "Indulge in therapeutic massages, facials, and wellness treatments in our state-of-the-art spa facility.",
      additionalImages: [
        "https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg",
        "https://images.pexels.com/photos/1531677/pexels-photo-1531677.jpeg",
      ],
    },
    {
      title: "Infinity Pool",
      description: "Relax by the infinity pool with stunning views of the surrounding landscape.",
      details: "Take a dip in our crystal-clear infinity pool, offering breathtaking panoramic views of the city skyline or ocean.",
      additionalImages: [
        "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
        "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [fadeKey, setFadeKey] = useState(0); // Key pour réinitialiser l'animation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        setFadeKey((prevKey) => prevKey + 1); // Réinitialise l'animation
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div id="home">
      {/* Hero Section */}
      <div className="img-wrapper">
        <img src={slides[currentIndex].image} alt="slide" className="main-img" />
        <div key={fadeKey} className="text-overlay">
          <h1>{slides[currentIndex].text}</h1>
          <p>{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>Our Premium Services</h2>
        <div className="services-cards">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              onClick={() => openModal(service)}
            >
              <img src={service.additionalImages[0]} alt={service.title} className="service-img" />
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.details}</p>
            <div className="modal-images">
              {selectedService.additionalImages.map((img, idx) => (
                <img key={idx} src={img} alt={`detail-${idx}`} />
              ))}
            </div>
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
