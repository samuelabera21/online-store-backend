// // config/db.js
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "samuel",       // or 'root' if using default XAMPP
//   password: "1997",     // your password
//   database: "23", // your database name
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.message);
//   } else {
//     console.log("✅ Connected to MySQL Database");
//   }
// });

// module.exports = db;



























// config/db.js
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to Remote MySQL Database");
  }
});

module.exports = db;

















// // config/db.js
// const mysql = require("mysql2");

// // ------------------------------------------------------
// // 🔧 Choose Database Mode (Local OR Cloud)
// // Change MODE to "cloud" when deploying
// // ------------------------------------------------------
// const MODE = "local"; // "local" or "cloud"

// let dbConfig;

// if (MODE === "cloud") {
//   dbConfig = {
//     host: "sql7.freesqldatabase.com",
//     user: "sql7809486",
//     password: "V3QWPw48eQ",
//     database: "sql7809486",
//     port: 3306
//   };
//   console.log("🌍 Using REMOTE CLOUD Database...");
// } else {
//   dbConfig = {
//     host: "localhost",
//     user: "samuel",    // your local DB user
//     password: "1997",  // your local DB password
//     database: "eco",
//   };
//   console.log("💻 Using LOCAL Database...");
// }

// // ------------------------------------------------------
// // Create MySQL Connection (Promise Mode Enabled)
// // ------------------------------------------------------
// const db = mysql.createConnection(dbConfig);

// // Test connection
// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.message);
//   } else {
//     console.log("✅ Connected to MySQL Database");
//   }
// });

// // Export database with .promise() support
// module.exports = db;













