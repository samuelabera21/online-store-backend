// const db = require("../config/db");

// // ✅ Place an order
// const placeOrder = (req, res) => {
//   const userId = req.user.id;

//   // 1️⃣ Get all cart items for this user
//   const getCartQuery = `
//     SELECT c.product_id, c.quantity, p.price
//     FROM cart c
//     JOIN products p ON c.product_id = p.id
//     WHERE c.user_id = ?`;

//   db.query(getCartQuery, [userId], (err, cartItems) => {
//     if (err) return res.status(500).json({ error: "Error fetching cart" });
//     if (cartItems.length === 0) return res.status(400).json({ error: "Cart is empty" });

//     // 2️⃣ Calculate total price
//     const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     // 3️⃣ Insert into orders table
//     const insertOrderQuery = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
//     db.query(insertOrderQuery, [userId, total], (err, result) => {
//       if (err) return res.status(500).json({ error: "Error placing order" });

//       const orderId = result.insertId;

//       // 4️⃣ Clear cart after order
//       const clearCartQuery = "DELETE FROM cart WHERE user_id = ?";
//       db.query(clearCartQuery, [userId], (err2) => {
//         if (err2) return res.status(500).json({ error: "Error clearing cart" });

//         res.json({ message: "✅ Order placed successfully!", orderId, total });
//       });
//     });
//   });
// };

// // ✅ Get user's orders
// const getUserOrders = (req, res) => {
//   const userId = req.user.id;

//   const query = "SELECT * FROM orders WHERE user_id = ?";
//   db.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: "Error fetching orders" });
//     res.json(results);
//   });
// };

// module.exports = { placeOrder, getUserOrders };


















// // controllers/orderController.js
// const db = require("../config/db");

// // Place an order (user)
// const placeOrder = (req, res) => {
//   const userId = req.user.id;

//   const getCartQuery = `
//     SELECT c.product_id, c.quantity, p.price
//     FROM cart c
//     JOIN products p ON c.product_id = p.id
//     WHERE c.user_id = ?`;

//   db.query(getCartQuery, [userId], (err, cartItems) => {
//     if (err) return res.status(500).json({ error: "Error fetching cart" });
//     if (!cartItems || cartItems.length === 0)
//       return res.status(400).json({ error: "Cart is empty" });

//     const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     const insertOrderQuery = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
//     db.query(insertOrderQuery, [userId, total], (err, result) => {
//       if (err) return res.status(500).json({ error: "Error placing order" });

//       const orderId = result.insertId;

//       const clearCartQuery = "DELETE FROM cart WHERE user_id = ?";
//       db.query(clearCartQuery, [userId], (err2) => {
//         if (err2) {
//           // order created but cart clearing failed — return partial success
//           return res.status(500).json({ error: "Order created but failed to clear cart" });
//         }

//         res.json({ message: "✅ Order placed successfully!", orderId, total });
//       });
//     });
//   });
// };

// // Get orders for the logged-in user
// const getUserOrders = (req, res) => {
//   const userId = req.user.id;
//   const query = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
//   db.query(query, [userId], (err, results) => {
//     if (err) return res.status(500).json({ error: "Error fetching orders" });
//     res.json(results);
//   });
// };

// // Get all orders (admin only)
// const getAllOrders = (req, res) => {
//   const query = "SELECT * FROM orders ORDER BY created_at DESC";
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: "Error fetching all orders" });
//     res.json(results);
//   });
// };

// module.exports = { placeOrder, getUserOrders, getAllOrders };











// // controllers/orderController.js
// const db = require("../config/db");

// // Place an order (user) - transactional
// const placeOrder = (req, res) => {
//   const userId = req.user.id;
//   const { shipping = {}, payment_method = "demo", client_total = null } = req.body;

//   // 1) Get cart items
//   const getCartQuery = `
//     SELECT c.id as cart_id, c.product_id, c.quantity, p.price, p.stock
//     FROM cart c
//     JOIN products p ON c.product_id = p.id
//     WHERE c.user_id = ?`;

//   db.query(getCartQuery, [userId], (err, cartItems) => {
//     if (err) return res.status(500).json({ error: "Error fetching cart" });
//     if (!cartItems || cartItems.length === 0)
//       return res.status(400).json({ error: "Cart is empty" });

//     // 2) Calculate total server-side (single source of truth)
//     const subtotal = cartItems.reduce((sum, it) => sum + (parseFloat(it.price) * it.quantity), 0);
//     const shippingFee = 10; // keep consistent with frontend or compute dynamically
//     const total = parseFloat((subtotal + shippingFee).toFixed(2));

//     // 3) Start transaction
//     db.beginTransaction((txErr) => {
//       if (txErr) {
//         console.error("TX start error:", txErr);
//         return res.status(500).json({ error: "Transaction error" });
//       }

//       // 4) Insert into orders (with shipping / payment data)
//       // 4) Insert into orders (with shipping / payment data)
// const insertOrderSql = `
//   INSERT INTO orders
//     (user_id, total_price, payment_method,
//      shipping_name, shipping_email, shipping_phone,
//      shipping_country, shipping_city, shipping_postal,
//      shipping_address, status)
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;

// const orderParams = [
//   userId,
//   total,
//   payment_method,
//   shipping.fullName || shipping.fullname || null, // fits shipping_name
//   shipping.email || null,
//   shipping.phone || null,
//   shipping.country || null,
//   shipping.city || null,
//   shipping.postal || null,
//   shipping.address || null,
//   payment_method === "card" ? "paid" : "pending"
// ];


//       db.query(insertOrderSql, orderParams, (insErr, insRes) => {
//         if (insErr) {
//           console.error("Insert order error:", insErr);
//           return db.rollback(() => res.status(500).json({ error: "Error creating order" }));
//         }

//         const orderId = insRes.insertId;

//         // 5) Insert order items (batch)
//         const orderItemsSql = `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`;
//         const orderItemsValues = cartItems.map(it => [orderId, it.product_id, it.quantity, it.price]);

//         db.query(orderItemsSql, [orderItemsValues], (itemsErr) => {
//           if (itemsErr) {
//             console.error("Insert order_items error:", itemsErr);
//             return db.rollback(() => res.status(500).json({ error: "Error saving order items" }));
//           }

//           // 6) Reduce stock for each product (optional but recommended)
//           // We'll create a helper that updates stock sequentially
//           const updateStock = (index) => {
//             if (index >= cartItems.length) {
//               // 7) Clear cart
//               const clearCartSql = "DELETE FROM cart WHERE user_id = ?";
//               db.query(clearCartSql, [userId], (clearErr) => {
//                 if (clearErr) {
//                   console.error("Clear cart error:", clearErr);
//                   return db.rollback(() => res.status(500).json({ error: "Order created but failed to clear cart" }));
//                 }

//                 // commit transaction
//                 db.commit((commitErr) => {
//                   if (commitErr) {
//                     console.error("Commit error:", commitErr);
//                     return db.rollback(() => res.status(500).json({ error: "Transaction commit failed" }));
//                   }

//                   // success
//                   return res.json({ message: "✅ Order placed successfully!", orderId, total });
//                 });
//               });
//               return;
//             }

//             const it = cartItems[index];
//             // calculate new stock
//             const newStock = (typeof it.stock === "number") ? (it.stock - it.quantity) : null;

//             if (newStock === null) {
//               // if stock unknown just continue
//               updateStock(index + 1);
//               return;
//             }

//             const updateStockSql = "UPDATE products SET stock = ? WHERE id = ?";
//             db.query(updateStockSql, [newStock, it.product_id], (uErr) => {
//               if (uErr) {
//                 console.error("Stock update error for product", it.product_id, uErr);
//                 return db.rollback(() => res.status(500).json({ error: "Failed updating product stock" }));
//               }
//               updateStock(index + 1);
//             });
//           };

//           updateStock(0);
//         });
//       });
//     }); // end transaction
//   });
// };

// // Get orders for the logged-in user (include items)
// const getUserOrders = (req, res) => {
//   const userId = req.user.id;
//   const query = `
//     SELECT o.id, o.total_price, o.payment_method, o.status, o.created_at
//     FROM orders o
//     WHERE o.user_id = ?
//     ORDER BY o.created_at DESC
//   `;
//   db.query(query, [userId], (err, orders) => {
//     if (err) return res.status(500).json({ error: "Error fetching orders" });

//     if (!orders.length) return res.json([]);

//     // fetch items for all order ids
//     const orderIds = orders.map(o => o.id);
//     const itemsQuery = `SELECT oi.order_id, oi.product_id, oi.quantity, oi.price, p.name, p.image_url
//                         FROM order_items oi
//                         LEFT JOIN products p ON oi.product_id = p.id
//                         WHERE oi.order_id IN (?)`;

//     db.query(itemsQuery, [orderIds], (iErr, items) => {
//       if (iErr) return res.status(500).json({ error: "Error fetching order items" });

//       // map items into orders
//       const itemsByOrder = {};
//       items.forEach(it => {
//         itemsByOrder[it.order_id] = itemsByOrder[it.order_id] || [];
//         itemsByOrder[it.order_id].push(it);
//       });

//       const results = orders.map(o => ({
//         ...o,
//         items: itemsByOrder[o.id] || []
//       }));

//       res.json(results);
//     });
//   });
// };

// // Get all orders (admin)
// const getAllOrders = (req, res) => {
//   const query = `
//     SELECT id, user_id, total_price, payment_method, status, created_at
//     FROM orders
//     ORDER BY created_at DESC
//   `;
//   db.query(query, (err, results) => {
//     if (err) return res.status(500).json({ error: "Error fetching all orders" });
//     res.json(results);
//   });
// };

// module.exports = { placeOrder, getUserOrders, getAllOrders };





// controllers/orderController.js
const db = require("../config/db");

// PLACE ORDER (USER)
const placeOrder = (req, res) => {
  const userId = req.user.id;
  const { shipping = {}, payment_method = "demo", client_total = null } = req.body;

  // 1) Fetch cart items
  const getCartQuery = `
    SELECT c.id AS cart_id, c.product_id, c.quantity, p.price, p.stock
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  db.query(getCartQuery, [userId], (err, cartItems) => {
    if (err) return res.status(500).json({ error: "Error fetching cart" });
    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    // 2) Total server-side
    const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const shippingFee = 10;
    const total = parseFloat((subtotal + shippingFee).toFixed(2));

    // 3) Begin Transaction
    db.beginTransaction((txErr) => {
      if (txErr) return res.status(500).json({ error: "Transaction start error" });

      // 4) Insert Order (MATCHES YOUR DATABASE EXACTLY)
      const insertOrderSql = `
        INSERT INTO orders
        (user_id, total_price, payment_method,
         shipping_name, shipping_email, shipping_phone,
         shipping_country, shipping_city, shipping_postal, shipping_address,
         status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const orderParams = [
        userId,
        total,
        payment_method,

        // SHIPPING FIELDS (matching DB)
        shipping.fullName || shipping.fullname || null,
        shipping.email || null,
        shipping.phone || null,
        shipping.country || null,
        shipping.city || null,
        shipping.postal || null,
        shipping.address || null,

        // STATUS
        payment_method === "card" ? "paid" : "pending"
      ];

      db.query(insertOrderSql, orderParams, (insErr, insRes) => {
        if (insErr) {
          console.error("Insert Order ERROR:", insErr);
          return db.rollback(() =>
            res.status(500).json({ error: "Error creating order" })
          );
        }

        const orderId = insRes.insertId;

        // 5) Insert Order Items
        const orderItemsSql = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ?
        `;
        const orderItemsValues = cartItems.map(it => [
          orderId,
          it.product_id,
          it.quantity,
          it.price
        ]);

        db.query(orderItemsSql, [orderItemsValues], (itemsErr) => {
          if (itemsErr) {
            console.error("Order Items ERROR:", itemsErr);
            return db.rollback(() =>
              res.status(500).json({ error: "Error saving order items" })
            );
          }

          // 6) Reduce Stock
          const updateStock = (i) => {
            if (i >= cartItems.length) {

              // 7) Clear Cart
              db.query("DELETE FROM cart WHERE user_id = ?", [userId], (cErr) => {
                if (cErr) {
                  return db.rollback(() =>
                    res.status(500).json({ error: "Order OK, cart clear failed" })
                  );
                }

                // 8) Commit
                db.commit((commitErr) => {
                  if (commitErr) {
                    return db.rollback(() =>
                      res.status(500).json({ error: "Commit failed" })
                    );
                  }

                  return res.json({
                    message: "Order placed successfully!",
                    orderId,
                    total
                  });
                });
              });

              return;
            }

            const item = cartItems[i];
            const newStock = item.stock - item.quantity;

            db.query(
              "UPDATE products SET stock = ? WHERE id = ?",
              [newStock, item.product_id],
              (stErr) => {
                if (stErr) {
                  return db.rollback(() =>
                    res.status(500).json({ error: "Stock update failed" })
                  );
                }
                updateStock(i + 1);
              }
            );
          };

          updateStock(0);
        });
      });
    });
  });
};


// GET USER ORDERS
const getUserOrders = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT id, total_price, payment_method, status, created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], (err, orders) => {
    if (err) return res.status(500).json({ error: "Error fetching orders" });
    res.json(orders);
  });
};


// GET ALL ORDERS (ADMIN)
const getAllOrders = (req, res) => {
  const query = `
    SELECT id, user_id, total_price, payment_method, status, created_at
    FROM orders
    ORDER BY created_at DESC
  `;

  db.query(query, (err, orders) => {
    if (err) return res.status(500).json({ error: "Error fetching all orders" });
    res.json(orders);
  });
};

module.exports = { placeOrder, getUserOrders, getAllOrders };
