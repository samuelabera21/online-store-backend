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
//   const checkoutBtn = document.getElementById("checkout-btn");
  
//   // Keep the spinner visible via HTML initially or set it here
//   container.innerHTML = `
//     <div class="loading-state">
//       <div class="spinner"></div>
//       <p>Loading your cart...</p>
//     </div>
//   `;

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to load cart");
//     const items = await res.json();

//     // Check for empty cart
//     if (!items.length) {
//       container.innerHTML = `
//         <div class="empty-cart">
//           <div class="empty-icon">🛒</div>
//           <p class="empty-text">Your cart is currently empty.</p>
//           <a href="/index.html" style="color: var(--primary-color); text-decoration: none; font-weight: 600; margin-top: 10px; display: inline-block;">Start Shopping</a>
//         </div>
//       `;
//       totalEl.textContent = "$0.00";
//       // We hide the button by setting visibility or styling, or just disabled
//       if(checkoutBtn) checkoutBtn.style.display = "none";
//       return;
//     }

//     // Reset container and ensure checkout button is visible
//     container.innerHTML = "";
//     if(checkoutBtn) checkoutBtn.style.display = "flex";
    
//     let total = 0;

//     items.forEach((item) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       // Create modern card structure
//       const div = document.createElement("div");
//       div.className = "cart-item";

//       // Fallback image if item.image is missing
//       const imageUrl = item.image || "https://picsum.photos/100/80";

//       div.innerHTML = `
//         <div class="item-image">
//            <img src="${imageUrl}" alt="${item.name}">
//         </div>

//         <div class="item-info">
//           <h3>${item.name}</h3>
//           <p class="unit-price">Unit Price: $${item.price.toFixed(2)}</p>
//         </div>

//         <div class="item-controls">
//           <p class="item-subtotal">$${subtotal.toFixed(2)}</p>
          
//           <div class="qty-controls">
//             <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">−</button>
//             <span>${item.quantity}</span>
//             <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
//           </div>

//           <button class="remove-btn" onclick="removeItem(${item.id})">
//             Remove
//           </button>
//         </div>
//       `;

//       container.appendChild(div);
//     });

//     totalEl.textContent = `$${total.toFixed(2)}`;
//   } catch (err) {
//     console.error(err);
//     container.innerHTML = `
//       <div class="empty-cart">
//         <p style="color: var(--danger-color)">Error loading cart. Please try again.</p>
//         <button onclick="loadCart()" class="btn-primary" style="margin-top: 1rem; width: auto; font-size: 0.9rem;">Retry</button>
//       </div>
//     `;
//   }
// }

// // Increase / Decrease Quantity
// async function updateQty(cartId, newQty) {
//   if (newQty < 1) return;

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

//     loadCart();
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

// // Checkout → Go to shipping page
// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();

//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn)
//     logoutBtn.addEventListener("click", (e) => {
//       e.preventDefault(); // Prevent default anchor jump
//       localStorage.clear();
//       window.location.href = "/login.html";
//     });

//   const checkoutBtn = document.getElementById("checkout-btn");
//   if (checkoutBtn)
//     checkoutBtn.addEventListener("click", () => {
//       window.location.href = "/shipping.html";
//     });
// });











// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // If no token → force login
// if (!token) {
//   alert("Please login first!");
//   window.location.href = "/login.html";
// }

// // Load Cart
// async function loadCart() {
//   const container = document.getElementById("cart-container");
//   const totalEl = document.getElementById("total");
//   const checkoutBtn = document.getElementById("checkout-btn");

//   container.innerHTML = `
//     <div class="loading-state">
//       <div class="spinner"></div>
//       <p>Loading your cart...</p>
//     </div>
//   `;

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     if (!res.ok) throw new Error("Failed to load cart");

//     const items = await res.json();

//     // Empty cart UI
//     if (!items.length) {
//       container.innerHTML = `
//         <div class="empty-cart">
//           <p>Your cart is empty.</p>
//           <a href="/index.html">Start shopping</a>
//         </div>
//       `;
//       totalEl.textContent = "$0.00";
//       checkoutBtn.style.display = "none";
//       return;
//     }

//     checkoutBtn.style.display = "inline-block";
//     container.innerHTML = "";

//     let total = 0;

//     items.forEach(item => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;

//       const div = document.createElement("div");
//       div.className = "cart-item";

//       div.innerHTML = `
//         ${item.image ? 
//           `<img src="${item.image}" class="item-image">` : 
//           `<div class="item-image-placeholder">📦</div>` }

//         <div class="item-info">
//           <h3>${item.name}</h3>
//           <p class="price">Unit Price: $${item.price.toFixed(2)}</p>
//         </div>

//         <div class="qty-controls">
//           <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
//           <span>${item.quantity}</span>
//           <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
//         </div>

//         <div class="item-subtotal">$${subtotal.toFixed(2)}</div>

//         <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
//       `;

//       container.appendChild(div);
//     });

//     totalEl.textContent = `$${total.toFixed(2)}`;

//   } catch (err) {
//     console.error(err);
//     container.innerHTML = `
//       <div class="empty-cart">
//         <p style="color:red;">Error loading cart. Try again.</p>
//         <button onclick="loadCart()" class="btn btn-primary">Retry</button>
//       </div>
//     `;
//   }
// }

// // Update Quantity
// async function updateQty(id, newQty) {
//   if (newQty < 1) return;

//   await fetch(`${API_URL}/cart/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ quantity: newQty })
//   });

//   loadCart();
// }

// // Remove Item
// async function removeItem(id) {
//   if (!confirm("Remove this item?")) return;

//   await fetch(`${API_URL}/cart/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` }
//   });

//   loadCart();
// }

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();

//   document.getElementById("logout-btn")?.addEventListener("click", () => {
//     localStorage.clear();
//     window.location.href = "/login.html";
//   });

//   document.getElementById("checkout-btn")?.addEventListener("click", () => {
//     window.location.href = "/shipping.html";
//   });
// });

// // Allow HTML click functions
// window.updateQty = updateQty;
// window.removeItem = removeItem;

















// cart.js - modern styled cart but fully compatible with original backend
const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// keep original behaviour: require token
if (!token) {
  alert("Please login first!");
  window.location.href = "/login.html";
}
async function loadCart() {
  const container = document.getElementById("cart-container");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // loading state
  container.innerHTML = `\n    <div class="loading-state">\n      <div class="spinner"></div>\n      <p>Loading your cart...</p>\n    </div>\n  `;

  try {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to load cart");
    const items = await res.json();

    // if empty
    if (!items.length) {
      container.innerHTML = `\n        <div class="empty-cart">\n          <p>Your cart is empty.</p>\n          <a href="/index.html" class="btn">Start shopping</a>\n        </div>\n      `;
      totalEl.textContent = "Total: $0.00";
      if (checkoutBtn) checkoutBtn.style.display = "none";
      return;
    }

    if (checkoutBtn) checkoutBtn.style.display = "inline-block";
    container.innerHTML = "";

    let total = 0;

    items.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "cart-item";

      const imgHtml = item.image || item.image_url
        ? `<img src="${item.image || item.image_url}" class="item-image" alt="${item.name}">`
        : `<div class="item-image-placeholder">📦</div>`;

      div.innerHTML = `
        ${imgHtml}

        <div class="item-info">
          <h3>${item.name}</h3>
          <p class="price">Unit Price: $${Number(item.price).toFixed(2)}</p>
        </div>

        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
          <div class="qty-value">${item.quantity}</div>
          <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
        </div>

        <div class="item-subtotal">$${subtotal.toFixed(2)}</div>

        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      `;

      container.appendChild(div);
    });

    totalEl.textContent = `Total: $${total.toFixed(2)}`;

  } catch (err) {
    console.error(err);
    container.innerHTML = `\n      <div class="empty-cart">\n        <p style="color: var(--danger-color)">Error loading cart. Try again.</p>\n        <button onclick="loadCart()" class="btn btn-primary">Retry</button>\n      </div>\n    `;
  }
}

// Update Quantity
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

    // refresh
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
    if (!res.ok) return alert(data.error || "Failed to remove item");

    loadCart();
  } catch (err) {
    console.error(err);
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/login.html";
  });

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", () => {
    window.location.href = "/shipping.html";
  });
});

// expose for inline handlers
window.updateQty = updateQty;
window.removeItem = removeItem;
