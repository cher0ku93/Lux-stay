import "./room.styles.scss";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const Room = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRoom(data);
        } else {
          console.error("Erreur de chargement de la salle");
        }
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };
    getRoom();
  }, [id]);

  return (
    <div id="room">
      <div className="container">
        {room ? (
          <div className="content">
            {/* Section du Carousel */}
            <div className="wrap">
              {room.img && room.img.length > 0 ? (
                <Carousel data={room.img} />
              ) : (
                <p>Aucune image disponible</p>
              )}
            </div>

            {/* Section des détails de la salle */}
            <div className="text-wrapper">
              <h1>{room.name}</h1>
              <p>{room.desc}</p>
              <h2>${room.price.toFixed(2)}</h2>

              {/* Spécificités dynamiques */}
              {room.features && (
                <div className="features">
                  {room.features.wifi && (
                    <div className="feature">
                      <i className="fas fa-wifi"></i>
                      <span>Wi-Fi</span>
                    </div>
                  )}
                  {room.features.airConditioning && (
                    <div className="feature">
                      <i className="fas fa-snowflake"></i>
                      <span>Air Conditioning</span>
                    </div>
                  )}
                  {room.features.tv && (
                    <div className="feature">
                      <i className="fas fa-tv"></i>
                      <span>TV</span>
                    </div>
                  )}
                  {room.features.hairDryer && (
                    <div className="feature">
                      <i className="fas fa-blow-dryer"></i>
                      <span>Hair Dryer</span>
                    </div>
                  )}
                  {room.features.maxCapacity && (
                    <div className="feature">
                      <i className="fas fa-users"></i>
                      <span>Max Capacity: {room.features.maxCapacity} people</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bouton Book Now */}
              <div className="cta-wrapper">
                <Link to={`/bookings/${room._id}`} className="book-link">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Room;
