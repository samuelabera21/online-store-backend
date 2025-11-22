// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // Ensure admin is logged in
// if (!token) {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "../frontend/login.html";
// }

// // ✅ Helper function to fetch protected admin data
// async function fetchData(endpoint) {
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
//   return res.json();
// }

// async function loadDashboard() {
//   try {
//     const [users, products, orders] = await Promise.all([
//       fetchData("/auth/users"),
//       fetchData("/products"),
//       fetchData("/orders/all"),
//     ]);

//     // Show counts
//     document.getElementById("user-count").textContent = users.length;
//     document.getElementById("product-count").textContent = products.length;
//     document.getElementById("order-count").textContent = orders.length;

//     // Calculate revenue
//     const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
//     document.getElementById("revenue").textContent = `$${revenue.toFixed(2)}`;
//   } catch (err) {
//     console.error(err);
//     alert("Error loading dashboard data");
//   }
// }

// document.addEventListener("DOMContentLoaded", loadDashboard);





// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// // Ensure admin is logged in
// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "../frontend/login.html";
// }

// async function fetchData(endpoint) {
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
//   return res.json();
// }

// async function loadDashboard() {
//   try {
//     const [users, products, orders] = await Promise.all([
//       fetchData("/auth/users"),
//       fetchData("/products"),
//       fetchData("/orders/all"),
//     ]);

//     document.getElementById("user-count").textContent = users.length;
//     document.getElementById("product-count").textContent = products.length;
//     document.getElementById("order-count").textContent = orders.length;

//     const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
//     document.getElementById("revenue").textContent = `$${revenue.toFixed(2)}`;
//   } catch (err) {
//     console.error("Dashboard error:", err);
//     alert("Error loading dashboard data");
//   }
// }

// document.addEventListener("DOMContentLoaded", loadDashboard);





// // admin/js/admin-dashboard.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// // 🔒 Check admin access
// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "/login.html";
// }

// // Helper fetch
// async function fetchData(endpoint) {
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     const text = await res.text();
//     console.error(`Error ${res.status} on ${endpoint}:`, text);
//     throw new Error(`Failed to fetch ${endpoint}`);
//   }
//   return res.json();
// }

// // Load dashboard data
// async function loadDashboard() {
//   const userCountEl = document.getElementById("user-count");
//   const productCountEl = document.getElementById("product-count");
//   const orderCountEl = document.getElementById("order-count");
//   const revenueEl = document.getElementById("revenue");

//   userCountEl.textContent = productCountEl.textContent = orderCountEl.textContent = "Loading...";

//   try {
//     const [users, products, orders] = await Promise.all([
//       fetchData("/auth/users"),
//       fetchData("/products"),
//       fetchData("/orders/all"),
//     ]);

//     // ✅ Show counts
//     userCountEl.textContent = users.length;
//     productCountEl.textContent = products.length;
//     orderCountEl.textContent = orders.length;

//     // ✅ Calculate total revenue
//     const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
//     revenueEl.textContent = `$${revenue.toFixed(2)}`;

//   } catch (err) {
//     console.error("Dashboard load error:", err);
//     userCountEl.textContent = "Error";
//     productCountEl.textContent = "Error";
//     orderCountEl.textContent = "Error";
//     revenueEl.textContent = "$0.00";
//     alert("⚠️ Error loading dashboard data. Check console for details.");
//   }
// }

// // Logout button
// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("logout-btn").addEventListener("click", () => {
//     localStorage.clear();
//     window.location.href = "/login.html";
//   });
//   loadDashboard();
// });




// console.log("✅ Admin Dashboard JS loaded");

// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// console.log("Token:", token);
// console.log("Role:", role);

// // Ensure admin is logged in
// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "../frontend/login.html";
// }

// async function fetchData(endpoint) {
//   console.log("Fetching:", endpoint);
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     const text = await res.text();
//     console.error(`❌ Error fetching ${endpoint}:`, text);
//     throw new Error(`Failed to fetch ${endpoint}`);
//   }
//   return res.json();
// }

// async function loadDashboard() {
//   console.log("🔄 Loading dashboard...");
//   try {
//     const [users, products, orders] = await Promise.all([
//       fetchData("/auth/users"),
//       fetchData("/products"),
//       fetchData("/orders/all"),
//     ]);

//     console.log("✅ Users:", users);
//     console.log("✅ Products:", products);
//     console.log("✅ Orders:", orders);

//     document.getElementById("user-count").textContent = users.length;
//     document.getElementById("product-count").textContent = products.length;
//     document.getElementById("order-count").textContent = orders.length;

//     const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
//     document.getElementById("revenue").textContent = `$${revenue.toFixed(2)}`;
//   } catch (err) {
//     console.error("Dashboard error:", err);
//     alert("Error loading dashboard data. Check console for details.");
//   }
// }

// document.addEventListener("DOMContentLoaded", loadDashboard);



console.log("✅ Admin Dashboard JS loaded");

// const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// 🔐 Check access
if (!token || role !== "admin") {
  alert("Access denied! Please login as admin.");
  window.location.href = "/login.html";
}

// Generic fetch helper
async function fetchData(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error(`❌ Failed to fetch ${endpoint}`, await res.text());
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

// Load dashboard
async function loadDashboard() {
  console.log("🔄 Loading dashboard...");

  const userCountEl = document.getElementById("user-count");
  const productCountEl = document.getElementById("product-count");
  const orderCountEl = document.getElementById("order-count");
  const revenueEl = document.getElementById("revenue");

  try {
    const [users, products, orders] = await Promise.all([
      fetchData("/auth/users"),
      fetchData("/products"),
      fetchData("/orders/all"),
    ]);

    userCountEl.textContent = users.length;
    productCountEl.textContent = products.length;
    orderCountEl.textContent = orders.length;

    const revenue = orders.reduce(
      (sum, o) => sum + parseFloat(o.total_price || 0),
      0
    );
    revenueEl.textContent = `$${revenue.toFixed(2)}`;

  } catch (err) {
    console.error("Dashboard error:", err);
    alert("Error loading dashboard data. Check console.");
  }
}

document.addEventListener("DOMContentLoaded", loadDashboard);
