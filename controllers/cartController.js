// const db = require("../config/db");

// // Add to cart
// const addToCart = (req, res) => {
//   const userId = req.user.id; // from token
//   const { product_id, quantity } = req.body;

//   if (!product_id || !quantity) {
//     return res.status(400).json({ error: "Product ID and quantity are required" });
//   }

//   const query = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
//   db.query(query, [userId, product_id, quantity], (err) => {
//     if (err) {
//       console.error("❌ Error adding to cart:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(201).json({ message: "✅ Item added to cart!" });
//   });
// };

// // Get user cart
// const getUserCart = (req, res) => {
//   const userId = req.user.id;

//   const query = `
//     SELECT cart.id, products.name, products.price, cart.quantity
//     FROM cart
//     JOIN products ON cart.product_id = products.id
//     WHERE cart.user_id = ?`;

//   db.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     res.json(results);
//   });
// };

// module.exports = { addToCart, getUserCart };




// controllers/cartController.js
// const db = require("../config/db");

// // ✅ Add to cart
// const addToCart = (req, res) => {
//   const userId = req.user.id; // from token
//   const { product_id, quantity } = req.body;

//   if (!product_id || !quantity) {
//     return res.status(400).json({ error: "Product ID and quantity are required" });
//   }

//   const query = `
//     INSERT INTO cart (user_id, product_id, quantity)
//     VALUES (?, ?, ?)
//   `;

//   db.query(query, [userId, product_id, quantity], (err) => {
//     if (err) {
//       console.error("❌ Error adding to cart:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(201).json({ message: "✅ Item added to cart!" });
//   });
// };

// // ✅ Get all items in user's cart
// const getUserCart = (req, res) => {
//   const userId = req.user.id;

//   const query = `
//     SELECT cart.id, products.name, products.price, cart.quantity
//     FROM cart
//     JOIN products ON cart.product_id = products.id
//     WHERE cart.user_id = ?
//   `;

//   db.query(query, [userId], (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching cart:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// };

// // ✅ Remove item from cart
// const removeFromCart = (req, res) => {
//   const userId = req.user.id;
//   const cartId = req.params.id; // from URL /api/cart/:id

//   const query = "DELETE FROM cart WHERE id = ? AND user_id = ?";
//   db.query(query, [cartId, userId], (err, result) => {
//     if (err) {
//       console.error("❌ Error removing from cart:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Item not found or not yours" });
//     }

//     res.json({ message: "✅ Item removed from cart!" });
//   });
// };

// module.exports = { addToCart, getUserCart, removeFromCart };




// controllers/cartController.js
const db = require("../config/db");

// Add to cart
const addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity)
    return res.status(400).json({ error: "Product ID and quantity required" });

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, product_id, quantity], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "Added to cart" });
  });
};

// Get user cart
const getUserCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT cart.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
};

// Update quantity
const updateCartQuantity = (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1)
    return res.status(400).json({ error: "Quantity must be >= 1" });

  const sql = `
    UPDATE cart SET quantity = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [quantity, cartId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Quantity updated" });
  });
};

// Remove from cart
const removeFromCart = (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;

  const sql = "DELETE FROM cart WHERE id = ? AND user_id = ?";

  db.query(sql, [cartId, userId], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Not found" });

    res.json({ message: "Item removed" });
  });
};

module.exports = {
  addToCart,
  getUserCart,
  updateCartQuantity,
  removeFromCart,
};
