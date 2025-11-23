// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const orderRoutes = require("./routes/orderRoutes");

const path = require("path");

// const path = require("path");
// app.use(express.static(path.join(__dirname, "frontend")));
// app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/css", express.static(path.join(__dirname, "css"))); // if using css folder



const app = express();
dotenv.config();


app.use(cors());
app.use(bodyParser.json());

// add this after app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "frontend")));
app.use("/", express.static(path.join(__dirname, "frontend")));

app.use("/uploads", express.static("uploads"));


app.use("/admin", express.static(path.join(__dirname, "admin")));

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Order routes
app.use("/api/orders", orderRoutes);

app.use("/uploads", express.static("uploads"));
 
app.use("/api/cart", cartRoutes);

// ✅ Create tables
const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(255),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// Run both table creations
db.query(createProductsTable, (err) => {
  if (err) console.error("❌ Error creating products table:", err);
  else console.log("✅ Products table is ready!");
});

db.query(createUsersTable, (err) => {
  if (err) console.error("❌ Error creating users table:", err);
  else console.log("✅ Users table is ready!");
});





// ✅ Create cart table
const createCartTable = `
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)`;

// ✅ Create orders table
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(createCartTable, (err) => {
  if (err) console.error("❌ Error creating cart table:", err);
  else console.log("✅ Cart table is ready!");
});

db.query(createOrdersTable, (err) => {
  if (err) console.error("❌ Error creating orders table:", err);
  else console.log("✅ Orders table is ready!");
});


// Default route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running...");
});

// Product routes
app.use("/api/products", productRoutes);


// --- add after orders table creation in server.js ---

const createOrderItemsTable = `
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;
`;

db.query(createOrderItemsTable, (err) => {
  if (err) console.error("❌ Error creating order_items table:", err);
  else console.log("✅ order_items table is ready!");
});

// Try to add columns to orders table if they don't exist (ignore errors if already present)
const alterOrders1 = `ALTER TABLE orders 
  ADD COLUMN payment_method VARCHAR(50) NULL,
  ADD COLUMN shipping_fullname VARCHAR(255) NULL,
  ADD COLUMN shipping_email VARCHAR(255) NULL,
  ADD COLUMN phone VARCHAR(50) NULL,
  ADD COLUMN country VARCHAR(100) NULL,
  ADD COLUMN city VARCHAR(100) NULL,
  ADD COLUMN postal VARCHAR(50) NULL,
  ADD COLUMN status VARCHAR(50) DEFAULT 'pending'`;

db.query(alterOrders1, (err) => {
  if (err) {
    // If columns already exist, MySQL returns an error: show info and continue
    console.log("⚠️ Could not alter orders table (maybe columns already exist):", err.code || err.message);
  } else {
    console.log("✅ orders table altered with shipping/payment columns (if they didn't exist).");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
