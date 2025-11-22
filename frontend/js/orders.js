// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // Redirect if not logged in
// if (!token) {
//   alert("Please login to see your orders.");
//   window.location.href = "login.html";
// }

// // ✅ Fetch and display user's past orders
// async function loadOrders() {
//   const container = document.getElementById("orders-container");
//   container.innerHTML = "<p>Loading orders...</p>";

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load orders");

//     const orders = await res.json();
//     container.innerHTML = "";

//     if (!orders.length) {
//       container.innerHTML = "<p>No previous orders found.</p>";
//       return;
//     }

//     orders.forEach(order => {
//       const div = document.createElement("div");
//       div.className = "order-card";
//       div.innerHTML = `
//         <p><strong>Order ID:</strong> ${order.id}</p>
//         <p><strong>Total Price:</strong> $${order.total_price}</p>
//         <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
//       `;
//       container.appendChild(div);
//     });
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading orders.</p>";
//   }
// }

// // ✅ Place a new order
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

//     alert(`Order placed successfully! Total: $${data.total}`);
//     loadOrders(); // reload the orders list
//   } catch (err) {
//     console.error(err);
//     alert("Error placing order");
//   }
// }

// // ✅ Attach event listener
// document.addEventListener("DOMContentLoaded", () => {
//   loadOrders();
//   document.getElementById("place-order-btn").addEventListener("click", placeOrder);
// });



// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // 🔒 Redirect if not logged in
// if (!token) {
//   alert("Please login to see your orders.");
//   window.location.href = "login.html";
// }

// // ✅ Fetch and display user's past orders
// async function loadOrders() {
//   const container = document.getElementById("orders-container");
//   container.innerHTML = "<p>Loading orders...</p>";

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load orders");

//     const orders = await res.json();
//     container.innerHTML = "";

//     if (!orders.length) {
//       container.innerHTML = "<p>No previous orders found.</p>";
//       return;
//     }

//     orders.forEach(order => {
//       const div = document.createElement("div");
//       div.className = "order-card";
//       div.innerHTML = `
//         <h3>Order #${order.id}</h3>
//         <p><strong>Total Price:</strong> $${order.total_price.toFixed(2)}</p>
//         <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
//         <hr />
//       `;
//       container.appendChild(div);
//     });
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading orders.</p>";
//   }
// }

// // ✅ Logout functionality
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.removeItem("token");
//   alert("Logged out successfully!");
//   window.location.href = "login.html";
// });

// document.addEventListener("DOMContentLoaded", loadOrders);







// // frontend/js/orders.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to see your orders.");
//   window.location.href = "/login.html";
// }

// async function loadOrders() {
//   const container = document.getElementById("orders-container");
//   container.innerHTML = "<p>Loading orders...</p>";

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Failed to load orders");

//     const orders = await res.json();
//     container.innerHTML = "";

//     if (!orders.length) {
//       container.innerHTML = "<p>No previous orders found.</p>";
//       return;
//     }

//     orders.forEach(order => {
//       const div = document.createElement("div");
//       div.className = "order-card";
//       div.innerHTML = `
//         <h3>Order #${order.id}</h3>
//         <p><strong>Total Price:</strong> $${Number(order.total_price).toFixed(2)}</p>
//         <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
//         <hr />
//       `;
//       container.appendChild(div);
//     });
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading orders.</p>";
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadOrders();
//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn) logoutBtn.addEventListener("click", () => {
//     localStorage.clear();
//     window.location.href = "/login.html";
//   });
// });



// frontend/js/orders.js
const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "/login.html";

async function loadOrders() {
  const box = document.getElementById("orders-container");
  box.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const orders = await res.json();

    if (!orders.length) {
      box.innerHTML = "<p>No orders yet.</p>";
      return;
    }

    box.innerHTML = "";

    orders.forEach(o => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <h3>Order #${o.id}</h3>
        <p><strong>Total:</strong> $${Number(o.total_price).toFixed(2)}</p>
        <p><strong>Payment:</strong> ${o.payment_method || "N/A"}</p>
        <p><strong>Status:</strong> ${o.status || "pending"}</p>
        <p><strong>Date:</strong> ${new Date(o.created_at).toLocaleString()}</p>
        <hr/>
      `;
      box.appendChild(card);
    });

  } catch (err) {
    box.innerHTML = "<p>Error loading orders.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadOrders);
