import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { addDays, isBefore, isAfter, isEqual } from "date-fns";

const Booking = () => {
  const { id: roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess } = useSelector((state) => state.booking);

  const [room, setRoom] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const { name, email, checkInDate, checkOutDate } = formData;

  // Fetch room and reserved dates
  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`);
        const data = await res.json();
        if (!res.ok) {
          return console.log("There was a problem getting room");
        }
        setRoom(data);

        // Transform reservedDates into proper Date objects
        const formattedDates = data.reservedDates.map((date) => new Date(date));
        setReservedDates(formattedDates);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoom();
  }, [roomId]);

  // Redirect on booking success
  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Check if a date is reserved
  const isDateReserved = (date) => {
    return reservedDates.some(
      (reservedDate) => reservedDate.toDateString() === new Date(date).toDateString()
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validations
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (isBefore(checkOut, checkIn) || isEqual(checkOut, checkIn)) {
      alert("Check-out date must be after the check-in date.");
      return;
    }

    if (isDateReserved(checkIn) || isDateReserved(checkOut)) {
      alert("Selected dates include unavailable (reserved) dates. Please choose other dates.");
      return;
    }

    const dataToSubmit = {
      roomId,
      name,
      email,
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
    };

    dispatch(createBooking(dataToSubmit));
  };

  return (
    <div>
      <h1 className="heading center">Book Now</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Check In Date</label>
            <input
              type="date"
              name="checkInDate"
              value={checkInDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Block past dates
              required
            />
          </div>

          <div className="input-group">
            <label>Check Out Date</label>
            <input
              type="date"
              name="checkOutDate"
              value={checkOutDate}
              onChange={handleChange}
              min={
                checkInDate
                  ? addDays(new Date(checkInDate), 1).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
              } // Check-out must be after check-in
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
