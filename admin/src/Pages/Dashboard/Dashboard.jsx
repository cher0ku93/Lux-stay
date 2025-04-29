import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookings, reset } from "../../features/booking/bookingSlice";
import BookingList from "../../component/BookingList/BookingList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./dashboard.styles.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { bookings, isSuccess } = useSelector((state) => state.booking);

  // États pour les couverts fictifs
  const [covers, setCovers] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const monthlyGoal = 10000; // Objectif mensuel fictif

  // Avis fictifs
  const reviews = {
    google: [
      { name: "Alice", comment: "Amazing stay! The rooms were clean and cozy.", rating: 5 },
      { name: "Bob", comment: "Good location but service was slow.", rating: 3 },
    ],
    tripadvisor: [
      { name: "Clara", comment: "Exceptional experience, highly recommend!", rating: 5 },
      { name: "Dave", comment: "Decent place but could improve cleanliness.", rating: 4 },
    ],
    booking: [
      { name: "Eve", comment: "Best value for money. Great amenities.", rating: 4 },
      { name: "Frank", comment: "Average experience, nothing special.", rating: 3 },
    ],
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBookings());

    // Génération de données fictives pour les couverts et chiffre d'affaires
    const generateCoversAndRevenue = () => {
      setCovers({
        breakfast: Math.floor(Math.random() * 50) + 10, // Entre 10 et 60
        lunch: Math.floor(Math.random() * 100) + 20, // Entre 20 et 120
        dinner: Math.floor(Math.random() * 80) + 15, // Entre 15 et 95
      });
      setMonthlyRevenue(Math.floor(Math.random() * 8000) + 2000); // Entre 2000 et 10000
    };

    generateCoversAndRevenue();
  }, [user]);

  // Calcul pourcentage d'objectif
  const progressPercentage = Math.min((monthlyRevenue / monthlyGoal) * 100, 100);

  return (
    <div className="dashboard-container">
      <h1 className="heading center">Dashboard</h1>

      {/* Liste des réservations */}
      {bookings.length > 0 ? <BookingList data={bookings} /> : <p>No bookings found.</p>}

      {/* Section pour les couverts fictifs */}
      <div className="covers-summary">
        <h2 className="covers-title">Planned Covers</h2>
        <div className="covers-list">
          <div className="cover-item">
            <i className="fas fa-coffee"></i>
            <span>Breakfast</span>
            <strong>{covers.breakfast}</strong>
          </div>
          <div className="cover-item">
            <i className="fas fa-utensils"></i>
            <span>Lunch</span>
            <strong>{covers.lunch}</strong>
          </div>
          <div className="cover-item">
            <i className="fas fa-moon"></i>
            <span>Dinner</span>
            <strong>{covers.dinner}</strong>
          </div>
        </div>
      </div>

      {/* Barre de progression pour l'objectif mensuel */}
      <div className="revenue-progress">
        <h2>Monthly Revenue Progress</h2>
        <div className="progress-container" title={`Goal: $${monthlyGoal.toLocaleString()}`}>
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          >
            <span className="progress-text">${monthlyRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Section des avis */}
      <div className="reviews-section">
        <h2>Latest Reviews</h2>
        <div className="reviews-container">
          {/* Google Reviews */}
          <div className="review-box google">
            <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google Logo" />
            <h3>Google Reviews</h3>
            {reviews.google.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.name}:</strong> {review.comment}
                </p>
                <span>Rating: {review.rating} ⭐</span>
              </div>
            ))}
          </div>

          {/* TripAdvisor Reviews */}
          <div className="review-box tripadvisor">
            <img src="https://cdn-icons-png.flaticon.com/512/2504/2504944.png" alt="TripAdvisor Logo" />
            <h3>TripAdvisor Reviews</h3>
            {reviews.tripadvisor.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.name}:</strong> {review.comment}
                </p>
                <span>Rating: {review.rating} ⭐</span>
              </div>
            ))}
          </div>

          {/* Booking Reviews */}
          <div className="review-box booking">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVqpq-6zK3cs6d6dFWCxF4QXs1AjqVuKwsmQ&s" alt="Booking Logo" />
            <h3>Booking.com Reviews</h3>
            {reviews.booking.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.name}:</strong> {review.comment}
                </p>
                <span>Rating: {review.rating} ⭐</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
