// // routes/authRoutes.js
// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");

// // Register route
// router.post("/register", registerUser);

// // Login route
// router.post("/login", loginUser);

// module.exports = router;

// routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   getAllProducts,
//   addProduct,
//   getProductById,
// } = require("../controllers/productController");

// const verifyToken = require("../middleware/authMiddleware");
// const verifyAdmin = require("../middleware/adminMiddleware");

// // ✅ Public routes (everyone can access)
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);

// // ✅ Protected route (only admin can add)
// router.post("/", verifyToken, verifyAdmin, addProduct);

// module.exports = router;






// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   getAllProducts,
//   addProduct,
//   getProductById,
//   updateProduct,
//   deleteProduct
// } = require("../controllers/productController");

// const verifyToken = require("../middleware/authMiddleware");
// const verifyAdmin = require("../middleware/adminMiddleware");

// // ✅ Public routes (everyone can access)
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);

// // ✅ Protected routes (only admin can manage)
// router.post("/", verifyToken, verifyAdmin, addProduct);
// router.put("/:id", verifyToken, verifyAdmin, updateProduct);
// router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

// module.exports = router;











const express = require("express");
const router = express.Router();
const db = require("../config/db");

const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// ================================
// PUBLIC ROUTES
// ================================
router.get("/", getAllProducts);
router.get("/:id", getProductById);





// upload images
router.post("/", verifyToken, verifyAdmin, upload.single("image"), addProduct);
router.put("/:id", verifyToken, verifyAdmin, upload.single("image"), updateProduct);


// ================================
// ADMIN ROUTES
// // ================================
// router.post("/", verifyToken, verifyAdmin, addProduct);
// router.put("/:id", verifyToken, verifyAdmin, updateProduct);

// ================================
// FIXED DELETE PRODUCT ROUTE
// ================================
router.delete("/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;

  const deleteFromCart = "DELETE FROM cart WHERE product_id = ?";
  const deleteProduct = "DELETE FROM products WHERE id = ?";

  // STEP 1: Remove from cart to avoid foreign key errors
  db.query(deleteFromCart, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting cart items:", err);
      return res.status(500).json({ error: "Failed to remove product from carts" });
    }

    // STEP 2: Delete product
    db.query(deleteProduct, [id], (err2, result) => {
      if (err2) {
        console.error("❌ Error deleting product:", err2);
        return res.status(500).json({ error: "Failed to delete product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json({ message: "🗑️ Product deleted successfully!" });
    });
  });
});







module.exports = router;
