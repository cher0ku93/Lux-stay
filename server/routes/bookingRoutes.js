const { Router } = require("express");

const { auth } = require("../middleware/authMiddleware");

const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
  getTotalRevenue,
} = require("../controllers/bookingController");

const router = Router();

router.get("/", auth, getBookings);
router.get("/:id",auth, getBooking);
router.get('/',auth, getTotalRevenue);
router.post("/", createBooking);
router.put("/:id",auth, updateBooking);
router.delete("/:id",auth, deleteBooking);

module.exports = router;
