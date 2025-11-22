// // controllers/productController.js
// const db = require("../config/db");

// // ✅ Fetch all products
// const getAllProducts = (req, res) => {
//   const query = "SELECT * FROM products";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// };

// // ✅ Add new product
// const addProduct = (req, res) => {
//   const { name, description, price, image_url, stock } = req.body;

//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }

//   const query = `
//     INSERT INTO products (name, description, price, image_url, stock)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [name, description, price, image_url, stock], (err, result) => {
//     if (err) {
//       console.error("Error inserting product:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(201).json({ message: "✅ Product added successfully!", id: result.insertId });
//   });
// };

// const getProductById = (req, res) => {
//   const id = req.params.id;
//   const query = "SELECT * FROM products WHERE id = ?";
//   db.query(query, [id], (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     if (results.length === 0) return res.status(404).json({ error: "Product not found" });
//     res.json(results[0]);
//   });
// };

// module.exports = { getAllProducts, addProduct, getProductById };



// // ✅ Make sure both functions are exported
// // module.exports = { getAllProducts, addProduct };



// controllers/productController.js
const db = require("../config/db");

// ✅ Fetch all products
const getAllProducts = (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

// // ✅ Add new product
// const addProduct = (req, res) => {
//   const { name, description, price, image_url, stock } = req.body;

//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }

//   const query = `
//     INSERT INTO products (name, description, price, image_url, stock)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(query, [name, description, price, image_url, stock], (err, result) => {
//     if (err) {
//       console.error("Error inserting product:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.status(201).json({ message: "✅ Product added successfully!", id: result.insertId });
//   });
// };





const addProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const image_url = req.file ? `/uploads/products/${req.file.filename}` : null;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  const query = `
    INSERT INTO products (name, description, price, image_url, stock)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description, price, image_url, stock], (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Product added!", id: result.insertId });
  });
};






// ✅ Get product by ID
const getProductById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
};

// ✅ Update product
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, stock } = req.body;

  const query = `
    UPDATE products
    SET name = ?, description = ?, price = ?, image_url = ?, stock = ?
    WHERE id = ?
  `;

  db.query(query, [name, description, price, image_url, stock, id], (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "✅ Product updated successfully!" });
  });
};









// ✅ Delete product
const deleteProduct = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "🗑️ Product deleted successfully!" });
  });
};

module.exports = { 
  getAllProducts, 
  addProduct, 
  getProductById,
  updateProduct,
  deleteProduct
};




