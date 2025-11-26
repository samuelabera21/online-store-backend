



// // =============================
// // server.js
// // =============================
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const db = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const path = require("path");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Static files
// app.use("/", express.static(path.join(__dirname, "frontend")));
// app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/uploads", express.static("uploads"));

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/products", productRoutes);

// // =============================
// // CREATE TABLES
// // =============================

// const createProductsTable = `
// CREATE TABLE IF NOT EXISTS products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10,2) NOT NULL,
//     image_url VARCHAR(255),
//     stock INT DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// ) ENGINE=InnoDB;
// `;

// const createUsersTable = `
// CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     role VARCHAR(50) DEFAULT 'user',
//     avatar VARCHAR(255) DEFAULT NULL
// ) ENGINE=InnoDB;
// `;

// const createCartTable = `
// CREATE TABLE IF NOT EXISTS cart (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT NOT NULL,
//   product_id INT NOT NULL,
//   quantity INT DEFAULT 1,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// ) ENGINE=InnoDB;
// `;

// const createOrdersTable = `
// CREATE TABLE IF NOT EXISTS orders (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT NOT NULL,
//   total_price DECIMAL(10,2) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   payment_method VARCHAR(50),
//   shipping_name VARCHAR(255),
//   shipping_email VARCHAR(255),
//   shipping_phone VARCHAR(50),
//   shipping_country VARCHAR(100),
//   shipping_city VARCHAR(100),
//   shipping_postal VARCHAR(50),
//   shipping_address TEXT,
//   status VARCHAR(50) DEFAULT 'pending',
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// ) ENGINE=InnoDB;
// `;

// const createOrderItemsTable = `
// CREATE TABLE IF NOT EXISTS order_items (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   order_id INT NOT NULL,
//   product_id INT NOT NULL,
//   quantity INT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// ) ENGINE=InnoDB;
// `;

// // Create tables
// db.query(createProductsTable, err => console.log(err || "✅ Products table ready"));
// db.query(createUsersTable, err => console.log(err || "✅ Users table ready"));
// db.query(createCartTable, err => console.log(err || "✅ Cart table ready"));
// db.query(createOrdersTable, err => console.log(err || "✅ Orders table ready"));
// db.query(createOrderItemsTable, err => console.log(err || "✅ Order Items table ready"));

// // =============================
// // AUTO MIGRATION (OPTION A)
// // =============================

// async function ensureDatabaseSchema() {
//     console.log("\n🔧 Checking Database Schema...\n");

//     const dbPromise = db.promise(); // <-- enables async queries

//     const tables = {
//         users: [
//             { name: "role", type: "VARCHAR(50) DEFAULT 'user'" },
//             { name: "avatar", type: "VARCHAR(255) DEFAULT NULL" }
//         ],
//         products: [
//             { name: "description", type: "TEXT" },
//             { name: "image_url", type: "VARCHAR(255)" },
//             { name: "stock", type: "INT DEFAULT 0" }
//         ],
//         orders: [
//             { name: "payment_method", type: "VARCHAR(50)" },
//             { name: "shipping_name", type: "VARCHAR(255)" },
//             { name: "shipping_email", type: "VARCHAR(255)" },
//             { name: "shipping_phone", type: "VARCHAR(50)" },
//             { name: "shipping_country", type: "VARCHAR(100)" },
//             { name: "shipping_city", type: "VARCHAR(100)" },
//             { name: "shipping_postal", type: "VARCHAR(50)" },
//             { name: "shipping_address", type: "TEXT" },
//             { name: "status", type: "VARCHAR(50) DEFAULT 'pending'" }
//         ]
//     };

//     for (const [table, columns] of Object.entries(tables)) {
//         console.log(`📌 Checking: ${table}`);

//         const [rows] = await dbPromise.query(`SHOW COLUMNS FROM ${table}`);
//         const existing = rows.map(r => r.Field);

//         for (const col of columns) {
//             if (!existing.includes(col.name)) {
//                 await dbPromise.query(`ALTER TABLE ${table} ADD COLUMN ${col.name} ${col.type}`);
//                 console.log(`   ➕ Added: ${col.name}`);
//             } else {
//                 console.log(`   ✔ Already exists: ${col.name}`);
//             }
//         }
//     }

//     console.log("\n✅ Auto-Migration Complete!\n");
// }

// // Run migration automatically
// ensureDatabaseSchema();

// // =============================
// app.get("/", (req, res) => res.send("E-commerce Backend Running"));




// // addmin here
// // ============================================
// // CREATE DEFAULT ADMIN IF NOT EXISTS
// // ============================================
// // const bcrypt = require("bcryptjs");

// // async function createDefaultAdmin() {
// //   try {
// //     const adminEmail = "sami21.good.bad@gmail.com";
// //     const adminName = "Samuel Abera";
// //     const adminPassword = "199721";

// //     // Check if admin already exists
// //     const [existingAdmin] = await db.query("SELECT * FROM users WHERE email = ?", [adminEmail]);

// //     if (existingAdmin.length > 0) {
// //       console.log("✔ Admin account already exists.");
// //       return;
// //     }

// //     const hashedPassword = await bcrypt.hash(adminPassword, 10);

// //     await db.query(
// //       `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')`,
// //       [adminName, adminEmail, hashedPassword]
// //     );

// //     console.log("\n🔥 Admin account created successfully!");
// //     console.log("👉 Email:", adminEmail);
// //     console.log("👉 Password:", adminPassword);
// //     console.log("-----------------------------------------");
// //   } catch (error) {
// //     console.error("❌ Failed to create default admin:", error.message);
// //   }
// // }


// // // Run admin creation AFTER schema sync
// // (async () => {
// //   await ensureDatabaseSchema();
// //   await createDefaultAdmin();
// // })();


// // async function createDefaultAdmin() {
// //   try {
// //     const adminEmail = "sami21.good.bad@gmail.com";
// //     const adminName = "Samuel Abera";
// //     const adminPassword = "199721";

// //     const [existingAdmin] = await db.query(
// //       "SELECT id FROM users WHERE email = ? LIMIT 1",
// //       [adminEmail]
// //     );

// //     if (existingAdmin.length > 0) {
// //       console.log("✔ Admin already exists in DB.");
// //       return;
// //     }

// //     const hashedPassword = await bcrypt.hash(adminPassword, 10);

// //     await db.query(
// //       `INSERT INTO users (name, email, password, role, created_at)
// //        VALUES (?, ?, ?, 'admin', NOW())`,
// //       [adminName, adminEmail, hashedPassword]
// //     );

// //     console.log("\n🔥 Admin Created!");
// //     console.log("👤 Name:", adminName);
// //     console.log("📧 Email:", adminEmail);
// //     console.log("🔑 Password:", adminPassword);
// //     console.log("---------------------------------------");

// //   } catch (error) {
// //     console.error("❌ Admin creation failed:", error.message);
// //   }
// // }








// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));









































































// // server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const db = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const path = require("path");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Static files
// app.use("/", express.static(path.join(__dirname, "frontend")));
// app.use("/admin", express.static(path.join(__dirname, "admin")));
// app.use("/uploads", express.static("uploads"));

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);


// // ============================================
// // TABLE DEFINITIONS
// // ============================================

// const createTables = [
//   `CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255),
//       email VARCHAR(255) UNIQUE,
//       password VARCHAR(255),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       role VARCHAR(50) DEFAULT 'user',
//       avatar VARCHAR(255) DEFAULT NULL
//   ) ENGINE=InnoDB;`,

//   `CREATE TABLE IF NOT EXISTS products (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       description TEXT,
//       price DECIMAL(10,2) NOT NULL,
//       image_url VARCHAR(255),
//       stock INT DEFAULT 0,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   ) ENGINE=InnoDB;`,

//   `CREATE TABLE IF NOT EXISTS cart (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NOT NULL,
//       product_id INT NOT NULL,
//       quantity INT DEFAULT 1,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//       FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
//   ) ENGINE=InnoDB;`,

//   `CREATE TABLE IF NOT EXISTS orders (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       user_id INT NOT NULL,
//       total_price DECIMAL(10,2) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       payment_method VARCHAR(50),
//       shipping_name VARCHAR(255),
//       shipping_email VARCHAR(255),
//       shipping_phone VARCHAR(50),
//       shipping_country VARCHAR(100),
//       shipping_city VARCHAR(100),
//       shipping_postal VARCHAR(50),
//       shipping_address TEXT,
//       status VARCHAR(50) DEFAULT 'pending',
//       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//   ) ENGINE=InnoDB;`,

//   `CREATE TABLE IF NOT EXISTS order_items (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       order_id INT NOT NULL,
//       product_id INT NOT NULL,
//       quantity INT NOT NULL,
//       price DECIMAL(10,2) NOT NULL,
//       FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//       FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
//   ) ENGINE=InnoDB;`
// ];


// // ============================================
// // AUTO FIX MISSING COLUMNS
// // ============================================

// async function ensureDatabaseSchema() {
//     console.log("\n🔧 Syncing Database Schema...\n");

//     const tables = {
//         users: [
//             { name: "role", type: "VARCHAR(50) DEFAULT 'user'" },
//             { name: "avatar", type: "VARCHAR(255) DEFAULT NULL" }
//         ],
//         orders: [
//             { name: "payment_method", type: "VARCHAR(50)" },
//             { name: "shipping_name", type: "VARCHAR(255)" },
//             { name: "shipping_email", type: "VARCHAR(255)" },
//             { name: "shipping_phone", type: "VARCHAR(50)" },
//             { name: "shipping_country", type: "VARCHAR(100)" },
//             { name: "shipping_city", type: "VARCHAR(100)" },
//             { name: "shipping_postal", type: "VARCHAR(50)" },
//             { name: "shipping_address", type: "TEXT" },
//             { name: "status", type: "VARCHAR(50) DEFAULT 'pending'" }
//         ]
//     };

//     for (const [table, columns] of Object.entries(tables)) {
//         console.log(`📌 Checking: ${table}`);

//         const [rows] = await db.query(`SHOW COLUMNS FROM ${table}`);
//         const existing = rows.map(r => r.Field);

//         for (const col of columns) {
//             if (!existing.includes(col.name)) {
//                 await db.query(`ALTER TABLE ${table} ADD COLUMN ${col.name} ${col.type}`);
//                 console.log(`   ➕ Added column: ${col.name}`);
//             } else {
//                 console.log(`   ✔ Exists: ${col.name}`);
//             }
//         }
//     }

//     console.log("\n✅ Database schema synced!\n");
// }


// // ==== CREATE TABLES THEN FIX SCHEMA ====

// (async () => {
//     for (const query of createTables) {
//         await db.query(query);
//     }

//     await ensureDatabaseSchema();
// })();


// app.get("/", (req, res) => res.send("E-commerce Backend Running"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
































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
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;










// current

// CREATE TABLE IF NOT EXISTS products (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100),
//   description TEXT,
//   price DECIMAL(10,2),
//   image_url VARCHAR(255),
//   stock INT DEFAULT 0,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )`;








// CREATE TABLE IF NOT EXISTS products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10,2) NOT NULL,
//     image_url VARCHAR(255),
//     stock INT DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );





    // id INT AUTO_INCREMENT PRIMARY KEY,
    // name VARCHAR(255) NOT NULL,
    // description TEXT,
    // price DECIMAL(10,2) NOT NULL,
    // image_url VARCHAR(255),
    // stock INT DEFAULT 0,
    // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP



// CREATE TABLE IF NOT EXISTS products (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10,2) NOT NULL,
//     image_url VARCHAR(255),
//     stock INT DEFAULT 0,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );



const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) DEFAULT 'user',
    avatar VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB;`;







// CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     role VARCHAR(50) DEFAULT 'user',
//     avatar VARCHAR(255) DEFAULT NULL
// );

// original
// CREATE TABLE IF NOT EXISTS users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100),
//   email VARCHAR(100) UNIQUE,
//   password VARCHAR(255),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )







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
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;




// original
// const createCartTable = `
// CREATE TABLE IF NOT EXISTS cart (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT,
//   product_id INT,
//   quantity INT DEFAULT 1,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users(id),
//   FOREIGN KEY (product_id) REFERENCES products(id)
// )`;

// new cart
// CREATE TABLE IF NOT EXISTS cart (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT NOT NULL,
//   product_id INT NOT NULL,
//   quantity INT DEFAULT 1,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// );


// ✅ Create orders table
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(50),
  shipping_name VARCHAR(255),
  shipping_email VARCHAR(255),
  shipping_phone VARCHAR(50),
  shipping_country VARCHAR(100),
  shipping_city VARCHAR(100),
  shipping_postal VARCHAR(50),
  shipping_address TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;




// my original code
// ✅ Create orders table
// const createOrdersTable = `
// CREATE TABLE IF NOT EXISTS orders (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT,
//   total_price DECIMAL(10,2),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users(id)
// )`;




// CREATE TABLE IF NOT EXISTS orders (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   user_id INT NOT NULL,
//   total_price DECIMAL(10,2) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   payment_method VARCHAR(50),
//   shipping_name VARCHAR(255),
//   shipping_email VARCHAR(255),
//   shipping_phone VARCHAR(50),
//   shipping_country VARCHAR(100),
//   shipping_city VARCHAR(100),
//   shipping_postal VARCHAR(50),
//   shipping_address TEXT,
//   status VARCHAR(50) DEFAULT 'pending',
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// ) ENGINE=InnoDB;


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
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

db.query(createOrderItemsTable, (err) => {
  if (err) console.error("❌ Error creating order_items table:", err);
  else console.log("✅ order_items table is ready!");
});









// original code
// const createOrderItemsTable = `
// CREATE TABLE IF NOT EXISTS order_items (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   order_id INT NOT NULL,
//   product_id INT NOT NULL,
//   quantity INT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//   FOREIGN KEY (product_id) REFERENCES products(id)
// ) ENGINE=InnoDB;
// `;

// db.query(createOrderItemsTable, (err) => {
//   if (err) console.error("❌ Error creating order_items table:", err);
//   else console.log("✅ order_items table is ready!");
// });




// CREATE TABLE IF NOT EXISTS order_items (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   order_id INT NOT NULL,
//   product_id INT NOT NULL,
//   quantity INT NOT NULL,
//   price DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
//   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
// ) ENGINE=InnoDB;




// Try to add columns to orders table if they don't exist (ignore errors if already present)
// const alterOrders1 = `ALTER TABLE orders 
//   ADD COLUMN payment_method VARCHAR(50) NULL,
//   ADD COLUMN shipping_fullname VARCHAR(255) NULL,
//   ADD COLUMN shipping_email VARCHAR(255) NULL,
//   ADD COLUMN phone VARCHAR(50) NULL,
//   ADD COLUMN country VARCHAR(100) NULL,
//   ADD COLUMN city VARCHAR(100) NULL,
//   ADD COLUMN postal VARCHAR(50) NULL,
//   ADD COLUMN status VARCHAR(50) DEFAULT 'pending'`;











//   const alterOrdersTable = `
// ALTER TABLE orders
//   ADD COLUMN payment_method VARCHAR(50) NULL,
//   ADD COLUMN shipping_name VARCHAR(255) NULL,
//   ADD COLUMN shipping_email VARCHAR(255) NULL,
//   ADD COLUMN shipping_phone VARCHAR(50) NULL,
//   ADD COLUMN shipping_country VARCHAR(100) NULL,
//   ADD COLUMN shipping_city VARCHAR(100) NULL,
//   ADD COLUMN shipping_postal VARCHAR(50) NULL,
//   ADD COLUMN shipping_address TEXT NULL,
//   ADD COLUMN status VARCHAR(50) DEFAULT 'pending'
// `;

// db.query(alterOrdersTable, (err) => {
//   if (err) {
//     console.log("⚠️ Orders table already updated or columns exist.");
//   } else {
//     console.log("✅ Orders table successfully updated to match local DB.");
//   }
// });






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
































