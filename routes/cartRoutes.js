// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const { addToCart, getUserCart } = require("../controllers/cartController");

// // Add item to cart
// router.post("/", verifyToken, addToCart);

// // Get user's cart
// router.get("/", verifyToken, getUserCart);

// module.exports = router;


// routes/cartRoutes.js
// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/authMiddleware");
// const {
//   addToCart,
//   getUserCart,
//   removeFromCart,
// } = require("../controllers/cartController");

// // ✅ Add item to cart
// router.post("/", verifyToken, addToCart);

// // ✅ Get all items in user's cart
// router.get("/", verifyToken, getUserCart);

// // ✅ Remove specific item from cart
// router.delete("/:id", verifyToken, removeFromCart);

// module.exports = router;




// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addToCart,
  getUserCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartController");

// Add item
router.post("/", verifyToken, addToCart);

// Get user's cart
router.get("/", verifyToken, getUserCart);

// Update quantity
router.patch("/:id", verifyToken, updateCartQuantity);

// Remove item
router.delete("/:id", verifyToken, removeFromCart);

module.exports = router;

