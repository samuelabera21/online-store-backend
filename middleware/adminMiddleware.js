// middleware/adminMiddleware.js
const verifyAdmin = (req, res, next) => {
  // verifyToken must run first, so req.user is already set
  if (req.user && req.user.role === "admin") {
    return next(); // allow the request
  } else {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
};

module.exports = verifyAdmin;
