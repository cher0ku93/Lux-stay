const Booking = require("../models/bookingModel");

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("roomId");
    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// create booking
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    if (!booking) {
      res.status(400);
      throw new Error("cannot create booking");
    }

    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // Mise à jour des champs
      },
      {
        new: true, // Retourner la version mise à jour
      }
    );

    if (!updatedBooking) {
      res.status(400);
      throw new Error("Cannot update booking");
    }

    console.log("Booking updated:", updatedBooking);
    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};


const deleteBooking = async (req, res, next) => {
  try {
    const room = await Booking.findByIdAndDelete(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("cannot delete room");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// get single booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking) {
      res.status(400);
      throw new Error("booking not found");
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const getTotalRevenue = async (req, res, next) => {
  try {
    // Retrieve all confirmed bookings and populate room details
    const confirmedBookings = await Booking.find({ confirmed: true }).populate("roomId", "price");

    // Calculate total revenue based on room prices
    const totalRevenue = confirmedBookings.reduce((sum, booking) => {
      return sum + (booking.roomId.price || 0); // Ensure roomId.price exists
    }, 0);

    return res.status(200).json({
      message: "Total revenue calculated successfully",
      totalRevenue,
      totalBookings: confirmedBookings.length,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};


module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getTotalRevenue,
};
