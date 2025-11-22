// config/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "samuel",       // or 'root' if using default XAMPP
  password: "1997",     // your password
  database: "ecommerce_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db;
