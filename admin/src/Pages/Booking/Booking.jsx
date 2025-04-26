import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../component/Carousel/Carousel";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [booking, setBooking] = useState(null);
  const [services, setServices] = useState([]);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    dispatch(reset());
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBooking();

    const allServices = [
      { name: "Breakfast Included", icon: "fas fa-coffee" },
      { name: "Lunch Included", icon: "fas fa-utensils" },
      { name: "Dinner Included", icon: "fas fa-wine-glass" },
      { name: "Room Service", icon: "fas fa-bell-concierge" },
      { name: "Parking", icon: "fas fa-parking" },
      { name: "Spa Access", icon: "fas fa-spa" },
      { name: "Gym Access", icon: "fas fa-dumbbell" },
      { name: "Golf Access", icon: "fas fa-golf-ball" },
      { name: "Swimming Pool Access", icon: "fas fa-swimmer" },
      { name: "Guided Tour", icon: "fas fa-map-marked-alt" },
    ];

    const randomServices = allServices.sort(() => 0.5 - Math.random()).slice(0, 5);
    setServices(randomServices);

    const randomGuests = Math.floor(Math.random() * 4) + 1;
    setGuests(randomGuests);
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deleteBooking(id));
  };

  const handleConfirm = async () => {
    try {
      // Envoie une requête PUT pour inverser la valeur de "confirmed"
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed: !booking.confirmed }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update booking confirmation");
      }
  
      const updatedBooking = await res.json();
      setBooking(updatedBooking); // Met à jour localement les données
  
      // Pop-up système avec le message de confirmation
      alert(
        `The booking for ${updatedBooking.name} (${updatedBooking.email}) has been ${
          updatedBooking.confirmed ? "confirmed" : "cancelled"
        }.`
      );
  
      // Redirection vers le dashboard après confirmation
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating confirmation:", error.message);
      alert("An error occurred. Please try again later."); // Message d'erreur via pop-up
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR").format(date);
  };

  return (
    <div id="booking">
      <h1 className="heading center">Booking Details</h1>

      {booking && (
        <div className="content-wrapper">
          <div className="text-wrapper">
            <h1 className="heading">{booking.name}</h1>
            <p className="email">{booking.email}</p>

            <div className="date-section">
              <h2>Check-in & Checkout</h2>
              <p>
                {formatDate(booking.checkInDate)} <span className="arrow">→</span>{" "}
                {formatDate(booking.checkOutDate)}
              </p>
            </div>

            <div className="guests-section">
              <h2>Number of Guests</h2>
              <p>{guests} {guests > 1 ? "guests" : "guest"}</p>
            </div>
          </div>

          {booking.roomId && (
            <div className="room-details">
              <h2>Room Details</h2>
              {booking.roomId.img && booking.roomId.img.length > 0 ? (
                <Carousel data={booking.roomId.img} />
              ) : (
                <p>No images available</p>
              )}
              <h3 className="room-name">{booking.roomId.name}</h3>
              <h3 className="room-price">
                {booking.roomId.price
                  ? `$${booking.roomId.price.toFixed(2)}`
                  : "Price not available"}
              </h3>
            </div>
          )}

          <div className="services-wrapper">
            <h2>Reserved Services</h2>
            <ul>
              {services.map((service, index) => (
                <li key={index}>
                  <i className={service.icon}></i>
                  <span>{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-wrapper">
            <button onClick={handleConfirm} className={booking.confirmed ? "cancel" : ""}>
              {booking.confirmed ? "Cancel Confirmation" : "Confirm"}
            </button>
            <button className="danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
