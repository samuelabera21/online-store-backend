
// // // frontend/js/orders.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "/login.html";

// async function loadOrders() {
//   const box = document.getElementById("orders-container");
//   box.innerHTML = "<p>Loading...</p>";

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const orders = await res.json();

//     if (!orders.length) {
//       box.innerHTML = "<p>No orders yet.</p>";
//       return;
//     }

//     box.innerHTML = "";

//     orders.forEach(o => {
//       const card = document.createElement("div");
//       card.className = "order-card";
//       card.innerHTML = `
//         <h3>Order #${o.id}</h3>
//         <p><strong>Total:</strong> $${Number(o.total_price).toFixed(2)}</p>
//         <p><strong>Payment:</strong> ${o.payment_method || "N/A"}</p>
//         <p><strong>Status:</strong> ${o.status || "pending"}</p>
//         <p><strong>Date:</strong> ${new Date(o.created_at).toLocaleString()}</p>
//         <hr/>
//       `;
//       box.appendChild(card);
//     });

//   } catch (err) {
//     box.innerHTML = "<p>Error loading orders.</p>";
//   }
// }
// document.addEventListener("DOMContentLoaded", loadOrders);












// frontend/js/orders.js
const API_URL = "http://online-store-backend-oxl9.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) window.location.href = "/login.html";

// Helper for status badge colors
function getStatusColor(status) {
    const s = (status || 'pending').toLowerCase();
    if (s === 'delivered' || s === 'completed') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'shipped') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s === 'cancelled') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200'; // pending/processing
}

async function loadOrders() {
  const box = document.getElementById("orders-container");
  
  // Render Loading State
  box.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 animate-pulse">
        <i data-lucide="loader-2" class="w-12 h-12 text-primary animate-spin mb-4"></i>
        <p class="font-medium text-lg">Loading your orders...</p>
    </div>
  `;
  lucide.createIcons();

  try {
    const res = await fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error("Failed to fetch");
    
    const orders = await res.json();

    if (!orders.length) {
      box.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 text-center reveal active">
             <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <i data-lucide="package" class="w-10 h-10 text-gray-400"></i>
             </div>
             <h3 class="text-2xl font-bold text-gray-900 mb-2 font-display">No orders yet</h3>
             <p class="text-gray-500 max-w-md mb-8">
               Looks like you haven't placed any orders yet. Check out our latest collection!
             </p>
             <a href="index.html" class="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 w-fit mx-auto">
               Start Shopping
             </a>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    box.innerHTML = "";

    orders.forEach((o, index) => {
      // Calculate delay for staggering animation
      const delay = index * 100; 
      
      const card = document.createElement("div");
      // Tailwind Card Styling
      card.className = "group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden reveal active";
      card.style.transitionDelay = `${delay}ms`; // CSS transition delay
      
      card.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div>
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</span>
                <h3 class="text-xl font-bold font-display text-gray-900">#${o.id}</h3>
            </div>
            <div class="px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${getStatusColor(o.status)}">
                ${o.status || "Pending"}
            </div>
        </div>

        <div class="space-y-4 mb-6">
            <div class="flex items-center gap-3 text-gray-600 text-sm">
                <i data-lucide="calendar" class="w-4 h-4 text-primary"></i>
                <span>${new Date(o.created_at).toLocaleString()}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-600 text-sm">
                 <i data-lucide="credit-card" class="w-4 h-4 text-primary"></i>
                 <span class="capitalize">${o.payment_method || "N/A"}</span>
            </div>
        </div>

        <hr class="border-gray-100 my-4" />

        <div class="flex items-center justify-between mt-auto">
            <div>
                <p class="text-xs text-gray-400 mb-1">Total Amount</p>
                <p class="text-2xl font-bold text-primary">$${Number(o.total_price).toFixed(2)}</p>
            </div>
            <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-primary group-hover:text-white transition-colors">
                <i data-lucide="chevron-right" class="w-5 h-5"></i>
            </button>
        </div>
      `;
      box.appendChild(card);
    });
    
    // Refresh Icons after insertion
    lucide.createIcons();

  } catch (err) {
    console.error(err);
    box.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-red-100 text-center p-8">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
           <i data-lucide="alert-circle" class="w-8 h-8 text-red-500"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p class="text-gray-500">Error loading orders. Please try again later.</p>
        <button onclick="window.location.reload()" class="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors">
          Try Again
        </button>
      </div>
    `;
    lucide.createIcons();
  }
}

// UI Initialization (Navbar, etc)
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Icons initially
    lucide.createIcons();
    
    // 2. Load Orders
    loadOrders();

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('py-6');
        }
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');
            if (isOpen) {
                mobileMenu.classList.remove('open');
            } else {
                mobileMenu.classList.add('open');
            }
        });
    }

    // 5. Logout Handling
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/login.html";
    };

    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);
});







// frontend/js/orders.js

// frontend/js/orders.js

// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "/login.html";

// // Convert backend values to readable text
// function formatPaymentMethod(method) {
//   switch (method?.toLowerCase()) {
//     case "cod": return "Cash On Delivery (COD)";
//     case "card": return "Credit/Debit Card (Demo)";
//     case "mobile": return "Mobile Money (Demo)";
//     default: return "N/A";
//   }
// }

// async function loadOrders() {
//   const box = document.getElementById("orders-container");
//   box.innerHTML = "<p class='text-center text-gray-500'>Loading...</p>";

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const orders = await res.json();

//     if (!orders.length) {
//       box.innerHTML = `<p class="text-center text-gray-400 text-sm">No orders yet.</p>`;
//       return;
//     }

//     box.innerHTML = "";

//     orders.forEach(o => {
//       const card = document.createElement("div");
//       card.className =
//         "order-card bg-white shadow-md rounded-xl p-6 mb-6 transition-all hover:shadow-lg border border-gray-100";

//       card.innerHTML = `
//         <div class="flex items-center justify-between mb-4">
//           <h3 class="text-xl font-semibold text-gray-800">Order #${o.id}</h3>
//           <span class="px-3 py-1 text-xs font-bold rounded-full capitalize 
//             ${o.status === "completed" ? "bg-green-100 text-green-700" :
//               o.status === "pending" ? "bg-yellow-100 text-yellow-700" :
//               "bg-blue-100 text-blue-700"}">
//             ${o.status || "pending"}
//           </span>
//         </div>

//         <div class="space-y-4 mb-6">
//           <div class="flex items-center gap-3 text-gray-600 text-sm">
//             <i data-lucide="calendar" class="w-4 h-4 text-primary"></i>
//             <span>${new Date(o.created_at).toLocaleString()}</span>
//           </div>

//           <div class="flex items-center gap-3 text-gray-600 text-sm">
//             <i data-lucide="credit-card" class="w-4 h-4 text-primary"></i>
//             <span class="font-semibold">${formatPaymentMethod(o.payment_method)}</span>
//           </div>

//           <div class="bg-gray-50 rounded-xl p-4 border border-gray-200 mt-2">
//             <p class="uppercase text-xs font-semibold text-gray-500 flex items-center gap-2 mb-3">
//               <i data-lucide="shopping-cart" class="w-4 h-4 text-primary"></i>
//               Order Items
//             </p>

//             <ul class="space-y-3">
//               ${
//                 o.items && o.items.length
//                   ? o.items.map(item => `
//                     <li class="flex items-center justify-between">
//                       <div class="flex items-center gap-4">
//                         ${item.image
//                           ? `<img src="${item.image}" class="w-12 h-12 rounded-lg object-cover border" />`
//                           : `<div class="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
//                                <i data-lucide="image" class="w-5 h-5"></i>
//                              </div>`
//                         }
//                         <div>
//                           <p class="text-sm font-semibold text-gray-800">${item.product_name}</p>
//                           <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
//                         </div>
//                       </div>
//                       <p class="text-sm font-semibold text-primary">$${(item.price * item.quantity).toFixed(2)}</p>
//                     </li>
//                   `).join("")
//                   : `<li class="text-gray-400 italic text-sm">No items available</li>`
//               }
//             </ul>
//           </div>
//         </div>

//         <div class="flex justify-between items-center pt-4 border-t">
//           <p class="text-lg font-bold text-gray-800">Total:</p>
//           <p class="text-xl font-extrabold text-primary">$${Number(o.total_price).toFixed(2)}</p>
//         </div>
//       `;

//       box.appendChild(card);
//     });

//     if (window.lucide) lucide.createIcons();

//   } catch (err) {
//     box.innerHTML = "<p class='text-red-500 text-center'>Error loading orders.</p>";
//   }
// }

// document.addEventListener("DOMContentLoaded", loadOrders);

