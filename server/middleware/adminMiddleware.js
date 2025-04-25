const adminMiddleware = (req, res, next) => {
  try {
    // Check if user exists and if role is admin
    if (req.user && req.user.role === "admin") {
      return next(); // Proceed to the next middleware or route handler
    }

    return res.status(403).json({ message: "Access restricted to administrators" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = adminMiddleware;
