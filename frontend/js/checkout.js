// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first");
//   window.location.href = "login.html";
// }

// async function loadCheckout() {
//   const container = document.getElementById("checkout-items");

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const items = await res.json();
//     if (!res.ok) throw new Error("Failed loading cart");

//     container.innerHTML = "";
//     let subtotal = 0;

//     items.forEach(item => {
//       subtotal += item.price * item.quantity;

//       container.innerHTML += `
//         <div class="checkout-item">
//           <p><strong>${item.name}</strong> (x${item.quantity})</p>
//           <p>$${(item.price * item.quantity).toFixed(2)}</p>
//         </div>
//       `;
//     });

//     document.getElementById("subtotal").textContent = subtotal.toFixed(2);
//     const shipping = 10;
//     document.getElementById("shipping").textContent = shipping;
//     document.getElementById("total").textContent = (subtotal + shipping).toFixed(2);

//   } catch (err) {
//     console.error(err);
//     container.innerHTML = "<p>Error loading checkout.</p>";
//   }
// }

// document.getElementById("proceed-shipping").addEventListener("click", () => {
//   window.location.href = "shipping.html";
// });

// document.addEventListener("DOMContentLoaded", loadCheckout);




















// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // Redirect if not logged in
// if (!token) {
//   window.location.href = "login.html";
// }

// // ---------------------- TOAST SYSTEM -----------------
// function showToast(message, type = "success") {
//   // Remove existing toasts to prevent stacking overflow
//   const existingToast = document.querySelector('.toast');
//   if(existingToast) existingToast.remove();

//   const toast = document.createElement("div");
//   toast.className = `toast toast-${type}`;
//   // Add icon based on type
//   const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
  
//   toast.innerHTML = `
//     <i data-lucide="${icon}" class="w-5 h-5"></i>
//     <span>${message}</span>
//   `;

//   document.body.appendChild(toast);
//   lucide.createIcons(); // Render the icon inside the toast

//   setTimeout(() => {
//     toast.style.opacity = "0";
//     toast.style.transform = "translateX(20px)";
//     setTimeout(() => toast.remove(), 500);
//   }, 3000);
// }

// // ---------------------- LOGOUT ------------------------
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("checkout_summary");
//   window.location.href = "login.html";
// });

// // ---------------------- LOAD CHECKOUT -----------------
// async function loadCheckout() {
//   const container = document.getElementById("checkout-items");
//   const subtotalEl = document.getElementById("subtotal");
//   const shippingEl = document.getElementById("shipping");
//   const totalEl = document.getElementById("total");
//   const btnProceed = document.getElementById("proceed-shipping");

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     if (!res.ok) throw new Error("Failed loading cart");

//     const items = await res.json();
    
//     container.innerHTML = "";
//     let subtotal = 0;

//     if (items.length === 0) {
//       container.innerHTML = `
//         <div class="text-center py-10">
//           <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <i data-lucide="shopping-cart" class="w-10 h-10 text-primary opacity-50"></i>
//           </div>
//           <p class="text-gray-500 font-medium">Your cart is empty.</p>
//           <a href="index.html" class="text-primary text-sm font-semibold hover:underline mt-2 inline-block">Browse Products</a>
//         </div>
//       `;
//       btnProceed.disabled = true;
//       btnProceed.classList.add("opacity-50", "cursor-not-allowed");
//       subtotalEl.textContent = "0.00";
//       totalEl.textContent = "0.00";
//       return;
//     }

//     items.forEach(item => {
//       const itemTotal = item.price * item.quantity;
//       subtotal += itemTotal;

//       // Tailwind styled item card
//       container.innerHTML += `
//         <div class="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
//           <!-- Image Placeholder / Icon -->
//           <div class="w-full sm:w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
//              ${item.image_url 
//                 ? `<img src="${item.image_url}" class="w-full h-full object-cover rounded-xl" alt="${item.name}">` 
//                 : `<i data-lucide="package" class="w-8 h-8"></i>`
//              }
//           </div>
          
//           <!-- Details -->
//           <div class="flex-1 w-full text-center sm:text-left">
//             <h4 class="font-display font-semibold text-gray-800 text-lg">${item.name}</h4>
//             <div class="flex items-center justify-center sm:justify-start gap-3 mt-1 text-sm text-gray-500">
//               <span class="bg-gray-100 px-2 py-0.5 rounded-md">Qty: ${item.quantity}</span>
//               <span>x $${parseFloat(item.price).toFixed(2)}</span>
//             </div>
//           </div>

//           <!-- Price -->
//           <div class="font-bold text-lg text-primary">
//             $${itemTotal.toFixed(2)}
//           </div>
//         </div>
//       `;
//     });

//     // Refresh icons for new elements
//     lucide.createIcons();

//     // Update Summary
//     const shipping = 10;
//     const total = subtotal + shipping;

//     subtotalEl.textContent = subtotal.toFixed(2);
//     shippingEl.textContent = shipping.toFixed(2);
//     totalEl.textContent = total.toFixed(2);

//     // Store summary for next steps
//     localStorage.setItem("checkout_summary", JSON.stringify({
//       subtotal: subtotal.toFixed(2),
//       shipping: shipping.toFixed(2),
//       total: total.toFixed(2)
//     }));

//   } catch (err) {
//     console.error(err);
//     showToast("Error loading checkout details", "error");
//     container.innerHTML = `
//       <div class="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
//         <p>Unable to load items. Please try refreshing.</p>
//       </div>
//     `;
//   }
// }

// // ---------------------- PROCEED TO SHIPPING -----------
// document.getElementById("proceed-shipping").addEventListener("click", async function() {
//   const btn = this;
//   const originalText = btn.innerHTML;
  
//   // Basic validation check based on DOM state
//   const total = document.getElementById("total").textContent;
//   if(total === "0.00" || total === "0") {
//     showToast("Your cart is empty", "error");
//     return;
//   }

//   // Loading State
//   btn.disabled = true;
//   btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...`;
//   lucide.createIcons();

//   // Simulate a brief validation delay for UX
//   setTimeout(() => {
//     // Save state one last time to be safe
//     const subtotal = document.getElementById("subtotal").textContent;
//     const shipping = document.getElementById("shipping").textContent;
    
//     localStorage.setItem("checkout_summary", JSON.stringify({
//       subtotal: subtotal,
//       shipping: shipping,
//       total: total
//     }));

//     showToast("Proceeding to shipping...");
    
//     setTimeout(() => {
//        window.location.href = "shipping.html";
//     }, 800);
//   }, 600);
// });

// // Initialize
// document.addEventListener("DOMContentLoaded", () => {
//   loadCheckout();
//   lucide.createIcons();
// });












const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// Redirect if not logged in
if (!token) {
  window.location.href = "login.html";
}

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  // Remove existing toasts to prevent stacking overflow
  const existingToast = document.querySelector('.toast');
  if(existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  // Add icon based on type
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
  
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  lucide.createIcons(); 

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ---------------------- LOGOUT ------------------------
document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("checkout_summary");
  window.location.href = "login.html";
});

// ---------------------- LOAD CHECKOUT -----------------
async function loadCheckout() {
  const container = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");
  const btnProceed = document.getElementById("proceed-shipping");

  try {
    // 1. Fetch Cart Data from Backend
    const res = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Handle authentication errors
    if (res.status === 401 || res.status === 403) {
      showToast("Session expired. Please login again.", "error");
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }, 1500);
      return;
    }

    if (!res.ok) throw new Error("Failed loading cart");

    const items = await res.json();
    
    container.innerHTML = "";
    let subtotal = 0;

    // 2. Handle Empty Cart
    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-lucide="shopping-cart" class="w-10 h-10 text-primary opacity-50"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-700">Your cart is empty</h3>
          <p class="text-gray-500 mt-2 text-sm">Looks like you haven't added anything yet.</p>
          <a href="index.html" class="mt-5 inline-block bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm shadow-sm">
            Browse Products
          </a>
        </div>
      `;
      // Disable the proceed button
      btnProceed.disabled = true;
      subtotalEl.textContent = "0.00";
      totalEl.textContent = "0.00";
      lucide.createIcons();
      return;
    }

    // 3. Render Items
    items.forEach(item => {
      // Calculate item total
      // Note: Ensure price and quantity are treated as numbers
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const itemTotal = price * quantity;
      
      subtotal += itemTotal;

      // Handle image URL (Backend might return relative path like /uploads/...)
      // server.js serves /uploads statically
      let imageUrl = "img/default-product.png"; // Fallback
      if (item.image_url) {
        if (item.image_url.startsWith("http")) {
            imageUrl = item.image_url;
        } else {
            // Assume relative to server root
            imageUrl = `http://localhost:5000${item.image_url.startsWith('/') ? '' : '/'}${item.image_url}`;
        }
      }

      container.innerHTML += `
        <div class="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
          <!-- Product Image -->
          <div class="w-full sm:w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0 overflow-hidden border border-gray-100">
             <img src="${imageUrl}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${item.name}" onerror="this.src='https://placehold.co/100?text=Product'">
          </div>
          
          <!-- Details -->
          <div class="flex-1 w-full text-center sm:text-left">
            <h4 class="font-display font-semibold text-gray-800 text-lg">${item.name}</h4>
            <div class="flex items-center justify-center sm:justify-start gap-3 mt-1 text-sm text-gray-500">
              <span class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-medium text-xs">Qty: ${quantity}</span>
              <span>x $${price.toFixed(2)}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="font-bold text-lg text-primary">
            $${itemTotal.toFixed(2)}
          </div>
        </div>
      `;
    });

    // 4. Update Summary
    const shipping = 10;
    const total = subtotal + shipping;

    subtotalEl.textContent = subtotal.toFixed(2);
    shippingEl.textContent = shipping.toFixed(2);
    totalEl.textContent = total.toFixed(2);

    // Re-enable button
    btnProceed.disabled = false;

    // Refresh icons for injected HTML
    lucide.createIcons();

  } catch (err) {
    console.error("Error loading cart:", err);
    showToast("Failed to load cart items", "error");
    container.innerHTML = `
      <div class="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
        <i data-lucide="alert-triangle" class="w-10 h-10 mx-auto mb-2 opacity-80"></i>
        <p class="font-medium">Unable to load your cart.</p>
        <button onclick="loadCheckout()" class="mt-3 text-sm underline hover:text-red-800">Try Again</button>
      </div>
    `;
    lucide.createIcons();
    btnProceed.disabled = true;
  }
}

// ---------------------- PROCEED TO SHIPPING -----------
document.getElementById("proceed-shipping").addEventListener("click", async function() {
  const btn = this;
  
  // Validation check
  const total = document.getElementById("total").textContent;
  if(total === "0.00" || btn.disabled) {
    showToast("Your cart is empty", "error");
    return;
  }

  // Loading State
  const originalContent = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing...`;
  lucide.createIcons();

  // Simulate a brief validation delay for better UX
  setTimeout(() => {
    // 1. Get current values
    const subtotal = document.getElementById("subtotal").textContent;
    const shipping = document.getElementById("shipping").textContent;
    
    // 2. Save to LocalStorage for the Shipping Page to read
    localStorage.setItem("checkout_summary", JSON.stringify({
      subtotal: subtotal,
      shipping: shipping,
      total: total
    }));

    showToast("Proceeding to shipping...");
    
    // 3. Redirect
    setTimeout(() => {
       window.location.href = "shipping.html";
    }, 800);
  }, 600);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadCheckout();
  lucide.createIcons();
});