// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);


// const verifyToken = require("../middleware/authMiddleware");
// const verifyAdmin = require("../middleware/adminMiddleware");
// const db = require("../config/db");

// // ✅ Get all users (Admin only)
// router.get("/users", verifyToken, verifyAdmin, (req, res) => {
//   db.query("SELECT id, name, email, role, created_at FROM users", (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     res.json(results);
//   });
// });



// // ✅ Update user role (admin only)
// router.put("/users/:id/role", verifyToken, verifyAdmin, (req, res) => {
//   const { id } = req.params;
//   const { role } = req.body;
//   if (!role) return res.status(400).json({ error: "Role required" });

//   db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "✅ Role updated successfully!" });
//   });
// });

// // ✅ Delete user (admin only)
// router.delete("/users/:id", verifyToken, verifyAdmin, (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "🗑️ User deleted successfully!" });
//   });
// });


// module.exports = router;






const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const db = require("../config/db");
const upload = require("../middleware/uploadAvatar");

// ===============================
// ✅ GET ALL USERS (ADMIN ONLY)
// ===============================
router.get("/users", verifyToken, verifyAdmin, (req, res) => {
  db.query(
    "SELECT id, name, email, role, created_at FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
});

// ===============================
// ✅ UPDATE USER ROLE (ADMIN ONLY)
// ===============================
router.put("/users/:id/role", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).json({ error: "Role required" });

  db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "✅ Role updated successfully!" });
  });
});

// ===============================
// ❌ OLD DELETE CAUSED FOREIGN KEY ERROR
// Here is the FIXED VERSION
// ===============================

// ==============================================
// ✅ DELETE USER SAFELY (ADMIN ONLY)
// - Delete user cart items
// - Delete user orders
// - Finally delete user
// NO MORE foreign key errors 🎉
// ==============================================
router.delete("/users/:id", verifyToken, verifyAdmin, (req, res) => {
  const { id } = req.params;

  const deleteCart = "DELETE FROM cart WHERE user_id = ?";
  const deleteOrders = "DELETE FROM orders WHERE user_id = ?";
  const deleteUser = "DELETE FROM users WHERE id = ?";

  // STEP 1: delete cart items
  db.query(deleteCart, [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete user's cart" });

    // STEP 2: delete orders
    db.query(deleteOrders, [id], (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to delete user's orders" });

      // STEP 3: delete user
      db.query(deleteUser, [id], (err3, result) => {
        if (err3) return res.status(500).json({ error: "Failed to delete user" });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "User not found" });

        res.json({ message: "🗑️ User deleted successfully!" });
      });
    });
  });
});



// GET logged-in user's info
router.get("/me", verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, name, email, role, created_at, avatar FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (!results.length) return res.status(404).json({ error: "User not found" });

      res.json(results[0]); // send profile data
    }
  );
});




// ======================================
// ⭐ UPDATE PROFILE (USER)
// ======================================
router.put("/me", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { name, email, currentPassword, newPassword } = req.body;

  // Fetch user
  db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length) return res.status(404).json({ error: "User not found" });

    const user = results[0];

    // If updating password, verify old password first
    if (newPassword) {
      const bcrypt = require("bcryptjs");

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match)
        return res.status(401).json({ error: "Incorrect current password" });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update fields
    const updatedName = name || user.name;
    const updatedEmail = email || user.email;
    const updatedPassword = newPassword ? user.password : user.password;

    db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [updatedName, updatedEmail, updatedPassword, userId],
      (err2) => {
        if (err2) {
          if (err2.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists" });
          }
          return res.status(500).json({ error: "Update failed" });
        }

        return res.json({ message: "Profile updated successfully!" });
      }
    );
  });
});




// Upload profile picture
router.post(
  "/upload-avatar",
  verifyToken,
  upload.single("avatar"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = "/uploads/" + req.file.filename;

    db.query(
      "UPDATE users SET avatar = ? WHERE id = ?",
      [filePath, req.user.id],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({
          message: "Avatar updated!",
          avatar: filePath
        });
      }
    );
  }
);



router.put("/change-password", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Both passwords are required" });
  }

  db.query("SELECT password FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length) return res.status(404).json({ error: "User not found" });

    const bcrypt = require("bcryptjs");
    const match = await bcrypt.compare(currentPassword, results[0].password);

    if (!match) return res.status(401).json({ error: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, userId], (err2) => {
      if (err2) return res.status(500).json({ error: "Update failed" });
      res.json({ message: "Password updated!" });
    });
  });
});



router.put("/me", verifyToken, (req, res) => {
  const userId = req.user.id;
  const { name, email, currentPassword, newPassword } = req.body;

  db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!results.length) return res.status(404).json({ error: "User not found" });

    const user = results[0];

    let updatedPassword = user.password;

    // If password change requested
    if (newPassword) {
      const bcrypt = require("bcryptjs");

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(401).json({ error: "Incorrect current password" });

      updatedPassword = await bcrypt.hash(newPassword, 10);
    }

    const updatedName = name || user.name;
    const updatedEmail = email || user.email;

    db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [updatedName, updatedEmail, updatedPassword, userId],
      (err2) => {
        if (err2) {
          if (err2.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email already exists" });
          }
          return res.status(500).json({ error: "Update failed" });
        }

        return res.json({ message: "Profile updated successfully!" });
      }
    );
  });
});


module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");

// const verifyToken = require("../middleware/authMiddleware");
// const verifyAdmin = require("../middleware/adminMiddleware");
// const db = require("../config/db");
// const upload = require("../middleware/uploadAvatar");

// // ----------------------------------------------------
// // ⭐ AUTH
// // ----------------------------------------------------
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // ----------------------------------------------------
// // ⭐ ADMIN — GET ALL USERS
// // ----------------------------------------------------
// router.get("/users", verifyToken, verifyAdmin, (req, res) => {
//   db.query(
//     "SELECT id, name, email, role, created_at, avatar FROM users",
//     (err, results) => {
//       if (err) return res.status(500).json({ error: "Database error" });
//       res.json(results);
//     }
//   );
// });

// // ----------------------------------------------------
// // ⭐ ADMIN — UPDATE USER ROLE
// // ----------------------------------------------------
// router.put("/users/:id/role", verifyToken, verifyAdmin, (req, res) => {
//   const { id } = req.params;
//   const { role } = req.body;

//   if (!role) return res.status(400).json({ error: "Role required" });

//   db.query("UPDATE users SET role = ? WHERE id = ?", [role, id], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     if (result.affectedRows === 0)
//       return res.status(404).json({ error: "User not found" });

//     res.json({ message: "✅ Role updated successfully!" });
//   });
// });

// // ----------------------------------------------------
// // ⭐ ADMIN — SAFE DELETE USER (Fix FK issues)
// // ----------------------------------------------------
// router.delete("/users/:id", verifyToken, verifyAdmin, (req, res) => {
//   const { id } = req.params;

//   const deleteCart = "DELETE FROM cart WHERE user_id = ?";
//   const deleteOrders = "DELETE FROM orders WHERE user_id = ?";
//   const deleteUser = "DELETE FROM users WHERE id = ?";

//   db.query(deleteCart, [id], (err) => {
//     if (err) return res.status(500).json({ error: "Failed to delete user's cart" });

//     db.query(deleteOrders, [id], (err2) => {
//       if (err2) return res.status(500).json({ error: "Failed to delete user's orders" });

//       db.query(deleteUser, [id], (err3, result) => {
//         if (err3) return res.status(500).json({ error: "Failed to delete user" });
//         if (result.affectedRows === 0)
//           return res.status(404).json({ error: "User not found" });

//         res.json({ message: "🗑️ User deleted successfully!" });
//       });
//     });
//   });
// });

// // ----------------------------------------------------
// // ⭐ USER — GET MY PROFILE (/me)
// // ----------------------------------------------------
// router.get("/me", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   db.query(
//     "SELECT id, name, email, role, created_at, avatar FROM users WHERE id = ?",
//     [userId],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: "Database error" });
//       if (!results.length) return res.status(404).json({ error: "User not found" });

//       res.json(results[0]);
//     }
//   );
// });

// // ----------------------------------------------------
// // ⭐ USER — UPDATE PROFILE (name, email, password)
// // ----------------------------------------------------
// router.put("/me", verifyToken, (req, res) => {
//   const userId = req.user.id;
//   const { name, email, currentPassword, newPassword } = req.body;

//   db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });
//     if (!results.length) return res.status(404).json({ error: "User not found" });

//     const user = results[0];

//     // Handle password change
//     let updatedPassword = user.password;

//     if (newPassword) {
//       const bcrypt = require("bcryptjs");

//       // verify old password
//       const match = await bcrypt.compare(currentPassword, user.password);
//       if (!match)
//         return res.status(401).json({ error: "Incorrect current password" });

//       updatedPassword = await bcrypt.hash(newPassword, 10);
//     }

//     const updatedName = name || user.name;
//     const updatedEmail = email || user.email;

//     db.query(
//       "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
//       [updatedName, updatedEmail, updatedPassword, userId],
//       (err2) => {
//         if (err2) {
//           if (err2.code === "ER_DUP_ENTRY") {
//             return res.status(400).json({ error: "Email already exists" });
//           }
//           return res.status(500).json({ error: "Update failed" });
//         }

//         return res.json({ message: "Profile updated successfully!" });
//       }
//     );
//   });
// });

// // ----------------------------------------------------
// // ⭐ USER — UPLOAD AVATAR
// // ----------------------------------------------------
// router.post("/upload-avatar", verifyToken, upload.single("avatar"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const filePath = "/uploads/" + req.file.filename;

//   db.query(
//     "UPDATE users SET avatar = ? WHERE id = ?",
//     [filePath, req.user.id],
//     (err) => {
//       if (err) return res.status(500).json({ error: "Database error" });

//       res.json({
//         message: "Avatar updated!",
//         avatar: filePath,
//       });
//     }
//   );
// });

// module.exports = router;
