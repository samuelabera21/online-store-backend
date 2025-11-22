// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please log in to view your cart!");
//   window.location.href = "/login.html";
// }

// async function loadCart() {
//   const cartContainer = document.getElementById("cart-items");
//   const totalContainer = document.getElementById("cart-total");
//   cartContainer.innerHTML = "<p>Loading your cart...</p>";

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load cart");

//     const items = await res.json();
//     cartContainer.innerHTML = "";

//     if (items.length === 0) {
//       cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//       totalContainer.innerHTML = "";
//       return;
//     }

//     let total = 0;

//     items.forEach((item) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       const div = document.createElement("div");
//       div.className = "cart-item";
//       div.innerHTML = `
//         <h3>${item.name}</h3>
//         <p>Price: $${item.price}</p>
//         <p>Quantity: ${item.quantity}</p>
//         <p>Subtotal: $${subtotal.toFixed(2)}</p>
//         <button onclick="removeFromCart(${item.id})">Remove</button>
//       `;
//       cartContainer.appendChild(div);
//     });

//     totalContainer.innerHTML = `
//       <h3>Total: $${total.toFixed(2)}</h3>
//       <button onclick="checkout()">Checkout</button>
//     `;
//   } catch (err) {
//     cartContainer.innerHTML = "<p>Error loading your cart.</p>";
//   }
// }

// // Remove item from cart
// async function removeFromCart(cartId) {
//   try {
//     const res = await fetch(`${API_URL}/cart/${cartId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     alert(data.message || "Removed from cart");
//     loadCart(); // reload after delete
//   } catch {
//     alert("Error removing item");
//   }
// }

// // Checkout (next step)
// function checkout() {
//   alert("Checkout coming next...");
// }

// document.addEventListener("DOMContentLoaded", loadCart);


// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first!");
//   window.location.href = "login.html";
// }

// // ✅ Load user cart
// async function loadCart() {
//   const container = document.getElementById("cart-container");
//   const totalEl = document.getElementById("total");

//   container.innerHTML = "<p>Loading cart...</p>";

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     if (!res.ok) throw new Error("Failed to load cart");
//     const items = await res.json();
//     container.innerHTML = "";
//     let total = 0;

//     if (!items.length) {
//       container.innerHTML = "<p>Your cart is empty.</p>";
//       totalEl.textContent = "";
//       return;
//     }

//     items.forEach(item => {
//       const div = document.createElement("div");
//       div.className = "cart-item";
//       const itemTotal = item.price * item.quantity;
//       total += itemTotal;

//       div.innerHTML = `
//         <p><strong>${item.name}</strong> - $${item.price} × ${item.quantity}</p>
//         <p>Subtotal: $${itemTotal.toFixed(2)}</p>
//       `;
//       container.appendChild(div);
//     });

//     totalEl.textContent = `Total: $${total.toFixed(2)}`;

//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading cart.</p>";
//   }
// }

// // ✅ Place order and clear cart
// async function placeOrder() {
//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.error || "Failed to place order");
//       return;
//     }

//     alert(`✅ Order placed successfully! Total: $${data.total}`);
//     window.location.href = "order.html"; // Redirect to orders page

//   } catch (err) {
//     console.error(err);
//     alert("Network error while placing order");
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();
//   document.getElementById("checkout-btn").addEventListener("click", placeOrder);
// });









// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // 🔒 Ensure user is logged in
// if (!token) {
//   alert("Please login first!");
//   window.location.href = "login.html";
// }

// // ✅ Load cart items
// async function loadCart() {
//   const container = document.getElementById("cart-container");
//   const totalEl = document.getElementById("total");

//   container.innerHTML = "<p>Loading your cart...</p>";

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load cart");
//     const items = await res.json();

//     if (!items.length) {
//       container.innerHTML = "<p>Your cart is empty.</p>";
//       totalEl.textContent = "";
//       return;
//     }

//     container.innerHTML = "";
//     let total = 0;

//     items.forEach((item) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       const div = document.createElement("div");
//       div.className = "cart-item";
//       div.innerHTML = `
//         <h3>${item.name}</h3>
//         <p>Price: $${item.price}</p>
//         <p>Quantity: ${item.quantity}</p>
//         <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
//       `;
//       container.appendChild(div);
//     });

//     totalEl.textContent = `Total: $${total.toFixed(2)}`;
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading cart.</p>";
//   }
// }

// // ✅ Place order and clear cart
// async function placeOrder() {
//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.error || "Failed to place order");
//       return;
//     }

//     alert(`✅ Order placed successfully! Total: $${data.total}`);
//     window.location.href = "orders.html"; // redirect to orders page
//   } catch (err) {
//     console.error(err);
//     alert("Network error while placing order");
//   }
// }

// // ✅ Logout function
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.removeItem("token");
//   alert("Logged out successfully!");
//   window.location.href = "login.html";
// });

// // Auto-load on page open
// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();
//   document.getElementById("checkout-btn").addEventListener("click", placeOrder);
// });






// // frontend/js/cart.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first!");
//   window.location.href = "/login.html";
// }

// // Load Cart
// async function loadCart() {
//   const container = document.getElementById("cart-container");
//   const totalEl = document.getElementById("total");
//   container.innerHTML = "<p>Loading your cart...</p>";

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load cart");
//     const items = await res.json();

//     if (!items.length) {
//       container.innerHTML = "<p>Your cart is empty.</p>";
//       totalEl.textContent = "";
//       return;
//     }

//     container.innerHTML = "";
//     let total = 0;

//     items.forEach((item) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       const div = document.createElement("div");
//       div.className = "cart-item";
//       div.innerHTML = `
//         <h3>${item.name}</h3>
//         <p>Price: $${item.price}</p>
//         <p>Quantity: ${item.quantity}</p>
//         <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
//       `;
//       container.appendChild(div);
//     });

//     totalEl.textContent = `Total: $${total.toFixed(2)}`;
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading cart.</p>";
//   }
// }

// // Place Order
// async function placeOrder() {
//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.error || "Failed to place order");
//       return;
//     }

//     alert(`✅ Order placed successfully! Total: $${data.total}`);
//     window.location.href = "/orders.html";
//   } catch (err) {
//     console.error(err);
//     alert("Network error while placing order");
//   }
// }

// // Logout & Load
// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();
//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn) logoutBtn.addEventListener("click", () => {
//     localStorage.clear();
//     window.location.href = "/login.html";
//   });
//   const checkoutBtn = document.getElementById("checkout-btn");
//   if (checkoutBtn) checkoutBtn.addEventListener("click", placeOrder);
// });




// // frontend/js/cart.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first!");
//   window.location.href = "/login.html";
// }

// // Load Cart
// async function loadCart() {
//   const container = document.getElementById("cart-container");
//   const totalEl = document.getElementById("total");
//   container.innerHTML = "<p>Loading your cart...</p>";

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load cart");
//     const items = await res.json();

//     if (!items.length) {
//       container.innerHTML = "<p>Your cart is empty.</p>";
//       totalEl.textContent = "";
//       return;
//     }

//     container.innerHTML = "";
//     let total = 0;

//     items.forEach((item) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       const div = document.createElement("div");
//       div.className = "cart-item";

//       div.innerHTML = `
//         <h3>${item.name}</h3>
//         <p>Price: $${item.price}</p>

//         <div class="qty-controls">
//           <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
//           <span>${item.quantity}</span>
//           <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
//         </div>

//         <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>

//         <button class="remove-btn" onclick="removeItem(${item.id})">
//           Remove
//         </button>
//         <hr>
//       `;

//       container.appendChild(div);
//     });

//     totalEl.textContent = `Total: $${total.toFixed(2)}`;
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading cart.</p>";
//   }
// }

// // Increase / Decrease Quantity
// async function updateQty(cartId, newQty) {
//   if (newQty < 1) return; // No zero quantity

//   try {
//     const res = await fetch(`${API_URL}/cart/${cartId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ quantity: newQty }),
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data.error || "Failed to update quantity");
//       return;
//     }

//     loadCart(); // reload cart
//   } catch (err) {
//     console.error(err);
//   }
// }

// // Remove Item
// async function removeItem(cartId) {
//   if (!confirm("Remove this item?")) return;

//   try {
//     const res = await fetch(`${API_URL}/cart/${cartId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = await res.json();
//     if (!res.ok) return alert(data.error);

//     loadCart();
//   } catch (err) {
//     console.error(err);
//   }
// }

// // Logout & Load Page
// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();

//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn)
//     logoutBtn.addEventListener("click", () => {
//       localStorage.clear();
//       window.location.href = "/login.html";
//     });


    
// });




const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first!");
  window.location.href = "/login.html";
}

// Load Cart
async function loadCart() {
  const container = document.getElementById("cart-container");
  const totalEl = document.getElementById("total");
  container.innerHTML = "<p>Loading your cart...</p>";

  try {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to load cart");
    const items = await res.json();

    if (!items.length) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalEl.textContent = "";
      document.getElementById("checkout-btn").style.display = "none";
      return;
    }

    container.innerHTML = "";
    let total = 0;

    items.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>

        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
        </div>

        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>

        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        <hr>
      `;

      container.appendChild(div);
    });

    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading cart.</p>";
  }
}

// Increase / Decrease Quantity
async function updateQty(cartId, newQty) {
  if (newQty < 1) return;

  try {
    const res = await fetch(`${API_URL}/cart/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to update quantity");
      return;
    }

    loadCart();
  } catch (err) {
    console.error(err);
  }
}

// Remove Item
async function removeItem(cartId) {
  if (!confirm("Remove this item?")) return;

  try {
    const res = await fetch(`${API_URL}/cart/${cartId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    loadCart();
  } catch (err) {
    console.error(err);
  }
}

// Checkout → Go to shipping page
document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn)
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/login.html";
    });

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn)
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "/shipping.html";
    });
});
