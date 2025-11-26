// // config/db.js
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "samuel",       // or 'root' if using default XAMPP
//   password: "1997",     // your password
//   database: "ecommerce_db"
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
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7809486",
  password: "V3QWPw48eQ",
  database: "sql7809486",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to Remote MySQL Database");
  }
});

module.exports = db;
