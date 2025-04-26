import "./room.styles.scss";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../../features/room/roomSlice";
import Carousel from "../../component/Carousel/Carousel";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Room = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  // Récupérer l'utilisateur depuis le state Redux
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log("Room Data: ", data);
          setRoom(data);
        } else {
          console.log("Erreur de chargement de la salle");
        }
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };
    getRoom();
  }, [id]);

  const handleDelete = () => {
    dispatch(deleteRoom(id));
    navigate("/rooms");
  };

  return (
    <div id="room">
      <div className="container">
        {room ? (
          <div className="content">
            {/* Carousel à gauche */}
            <div className="wrap">
              {room.img && room.img.length > 0 ? (
                <Carousel data={room.img} />
              ) : (
                <p>Aucune image disponible</p>
              )}
            </div>

            {/* Texte à droite */}
            <div className="text-wrapper">
              <h1>{room.name}</h1>
              <p>{room.desc}</p>
              <h2>${room.price.toFixed(2)}</h2>

              {/* Spécificités Dynamiques */}
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
                  {room.features.breakfastIncluded && (
                    <div className="feature">
                      <i className="fas fa-utensils"></i>
                      <span>Breakfast Included</span>
                    </div>
                  )}
                  {room.features.parking && (
                    <div className="feature">
                      <i className="fas fa-car"></i>
                      <span>Parking</span>
                    </div>
                  )}
                  {room.features.massageSpa && (
                    <div className="feature">
                      <i className="fas fa-spa"></i>
                      <span>Massage Spa</span>
                    </div>
                  )}
                  {room.features.swimmingPool && (
                    <div className="feature">
                      <i className="fas fa-swimmer"></i>
                      <span>Swimming Pool</span>
                    </div>
                  )}
                  {room.features.kingSizeBed && (
                    <div className="feature">
                      <i className="fas fa-bed"></i>
                      <span>King Size Bed</span>
                    </div>
                  )}
                  {room.features.italianShower && (
                    <div className="feature">
                      <i className="fas fa-shower"></i>
                      <span>Italian Shower</span>
                    </div>
                  )}
                  {room.features.roomService && (
                    <div className="feature">
                      <i className="fas fa-concierge-bell"></i>
                      <span>Room Service</span>
                    </div>
                  )}
                  {room.features.minibar && (
                    <div className="feature">
                      <i className="fas fa-wine-glass"></i>
                      <span>Minibar</span>
                    </div>
                  )}
                </div>
              )}

              {/* Boutons Edit & Delete - visibles uniquement si l'utilisateur est connecté */}
              {user && (
                <div className="cta-wrapper">
                  <Link to={`/edit/rooms/${room._id}`}>Edit Room</Link>
                  <button onClick={handleDelete} className="delete-button">
                    Delete Room
                  </button>
                </div>
              )}
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
