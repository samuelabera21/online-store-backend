// // controllers/authController.js
// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   // Validate input
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//     db.query(query, [name, email, hashedPassword], (err) => {
//       if (err) {
//         console.error("❌ Error registering user:", err);
//         return res.status(500).json({ error: "User already exists or DB error" });
//       }
//       res.status(201).json({ message: "✅ User registered successfully!" });
//     });
//   } catch (error) {
//     console.error("❌ Error hashing password:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   const query = "SELECT * FROM users WHERE email = ?";

//   db.query(query, [email], async (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const user = results[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });
//     res.json({ message: "✅ Login successful", token });
//   });
// };

// module.exports = { registerUser, loginUser };











// controllers/authController.js
// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   // Validate input
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // We don't pass role here so DB default (e.g. 'user') will be used.
//     const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//     db.query(query, [name, email, hashedPassword], (err) => {
//       if (err) {
//         console.error("❌ Error registering user:", err);
//         return res.status(500).json({ error: "User already exists or DB error" });
//       }
//       res.status(201).json({ message: "✅ User registered successfully!" });
//     });
//   } catch (error) {
//     console.error("❌ Error hashing password:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   const query = "SELECT * FROM users WHERE email = ?";

//   db.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error("❌ DB error during login:", err);
//       return res.status(500).json({ error: "Server error" });
//     }
//     if (!results || results.length === 0) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const user = results[0];

//     try {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//       // sign token with id AND role
//       const payload = { id: user.id, role: user.role };
//       const secret = process.env.JWT_SECRET || "secretkey";
//       const token = jwt.sign(payload, secret, { expiresIn: "1h" });

//       // return token and role in response
//       res.json({ message: "✅ Login successful", token, role: user.role });
//     } catch (e) {
//       console.error("❌ Login error:", e);
//       res.status(500).json({ error: "Server error" });
//     }
//   });
// };

// module.exports = { registerUser, loginUser };














// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ error: "All fields are required" });

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
//     db.query(query, [name, email, hashedPassword, "user"], (err) => {
//       if (err) return res.status(500).json({ error: "User already exists or DB error" });
//       res.status(201).json({ message: "✅ User registered successfully!" });
//     });
//   } catch (error) {
//     console.error("❌ Error hashing password:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const loginUser = (req, res) => {
//   const { email, password } = req.body;
//   const query = "SELECT * FROM users WHERE email = ?";

//   db.query(query, [email], async (err, results) => {
//     if (err || results.length === 0)
//       return res.status(401).json({ error: "Invalid email or password" });

//     const user = results[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//     // include role in JWT
//     const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", { expiresIn: "1h" });
//     res.json({
//       message: "✅ Login successful",
//       token,
//       role: user.role, // send role to frontend
//     });
//   });
// };

// module.exports = { registerUser, loginUser };
























const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, "user"], (err) => {
      if (err) return res.status(500).json({ error: "User already exists or DB error" });
      res.status(201).json({ message: "✅ User registered successfully!" });
    });
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ LOGIN
const loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // include role in JWT
    const token = jwt.sign({ id: user.id, role: user.role }, "secretkey", { expiresIn: "1h" });
      res.json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
    });



//     res.json({
//   id: user.id,
//   name: user.name,
//   email: user.email,
//   created_at: user.created_at,
//   avatar: user.avatar,
// });

  });
};

module.exports = { registerUser, loginUser };
