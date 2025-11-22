// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const { placeOrder, getUserOrders } = require("../controllers/orderController");

// // Place new order
// router.post("/", verifyToken, placeOrder);

// // Get user's orders
// router.get("/", verifyToken, getUserOrders);

// const verifyAdmin = require("../middleware/adminMiddleware");

// // ✅ Get all orders (Admin only)
// router.get("/all", verifyToken, verifyAdmin, (req, res) => {
//   const query = "SELECT * FROM orders";
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     res.json(results);
//   });
// });


// module.exports = router;



// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const {
  placeOrder,
  getUserOrders,
  getAllOrders
} = require("../controllers/orderController");

// Place new order (user)
router.post("/", verifyToken, placeOrder);

// Get user's orders (user)
router.get("/", verifyToken, getUserOrders);

// Get all orders (admin only)
router.get("/all", verifyToken, verifyAdmin, getAllOrders);

module.exports = router;
