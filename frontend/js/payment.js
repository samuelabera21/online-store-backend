// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // Block if no token
// if (!token) window.location.href = "login.html";

// // Load subtotal from localStorage (coming from shipping.js)
// const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

// if (!checkoutData) {
//   alert("No shipping or checkout information found!");
//   window.location.href = "checkout.html";
// }

// document.getElementById("subtotal").textContent = checkoutData.subtotal.toFixed(2);
// document.getElementById("total").textContent = checkoutData.total.toFixed(2);

// // Handle placing order
// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const paymentMethod = document.querySelector("input[name='payment']:checked").value;

//   try {
//     const res = await fetch(`${API_URL}/orders/place`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         shipping: checkoutData.shipping,
//         payment: paymentMethod
//       })
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     // Clear stored checkouts
//     localStorage.removeItem("checkoutData");

//     // Redirect to confirmation page
//     window.location.href = `confirmation.html?order_id=${data.order_id}`;

//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// });

// // Logout
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });




// // frontend/js/payment.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to continue checkout.");
//   window.location.href = "/login.html";
// }

// function formatCurrency(n) {
//   return `$${Number(n).toFixed(2)}`;
// }

// // load shipping & cart summary
// async function loadSummary() {
//   const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
//   if (!shipping || !shipping.email) {
//     alert("Shipping info missing. Returning to shipping page.");
//     return window.location.href = "/shipping.html";
//   }

//   // fetch cart from API
//   const res = await fetch(`${API_URL}/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     document.getElementById("shippingSummary").innerText = "Unable to load cart summary.";
//     return;
//   }
//   const items = await res.json();

//   let subtotal = 0;
//   const itemHtml = items.map(it => {
//     const rowTotal = it.price * it.quantity;
//     subtotal += rowTotal;
//     return `<div>${it.name} — ${it.quantity} × ${formatCurrency(it.price)} = ${formatCurrency(rowTotal)}</div>`;
//   }).join("");

//   // crude shipping flat fee (you can compute or fetch)
//   const shippingFee = 10;
//   const total = subtotal + shippingFee;

//   document.getElementById("shippingSummary").innerHTML = `
//     <h3>Shipping</h3>
//     <div>${shipping.fullName} — ${shipping.email}</div>
//     <div>${shipping.address}, ${shipping.city}, ${shipping.country} (${shipping.postal})</div>
//     <div>Phone: ${shipping.phone}</div>

//     <hr />
//     <h3>Order Summary</h3>
//     ${itemHtml || "<div>Your cart is empty.</div>"}
//     <p>Subtotal: ${formatCurrency(subtotal)}</p>
//     <p>Shipping: ${formatCurrency(shippingFee)}</p>
//     <p><strong>Total: ${formatCurrency(total)}</strong></p>
//   `;

//   // store summary in localStorage for the place-order call
//   localStorage.setItem("checkout_summary", JSON.stringify({ subtotal, shippingFee, total }));
// }

// document.getElementById("backBtn").addEventListener("click", () => {
//   window.location.href = "/shipping.html";
// });

// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const method = document.querySelector('input[name="method"]:checked').value;
//   const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
//   const summary = JSON.parse(localStorage.getItem("checkout_summary") || "{}");

//   // Compose payload for order placement.
//   // NOTE: your backend placeOrder currently calculates total from cart.
//   // We include shipping here as extra metadata for future backend changes.
//   const payload = {
//     shipping,
//     payment_method: method,
//     // optionally include client-side computed totals:
//     client_total: summary.total
//   };

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error || "Failed to place order");
//     }

//     // clear local storage checkout data
//     localStorage.removeItem("shipping");
//     localStorage.removeItem("checkout_summary");

//     // Redirect to a basic confirmation page (we'll create next)
//     // Keep order id and total to show on confirmation.
//     localStorage.setItem("last_order", JSON.stringify({ orderId: data.orderId, total: data.total }));
//     window.location.href = "/order-confirmation.html";
//   } catch (err) {
//     console.error("Place order error:", err);
//     document.getElementById("checkoutMsg").textContent = "Error: " + err.message;
//     alert("Error placing order: " + err.message);
//   }
// });

// document.addEventListener("DOMContentLoaded", loadSummary);













// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to continue checkout.");
//   window.location.href = "/login.html";
// }

// function formatCurrency(n) {
//   return `$${Number(n).toFixed(2)}`;
// }

// async function loadSummary() {
//   const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
//   if (!shipping.email) return window.location.href = "/shipping.html";

//   const res = await fetch(`${API_URL}/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const cart = await res.json();

//   let subtotal = 0;

//   const listHtml = cart.map(item => {
//     const row = item.price * item.quantity;
//     subtotal += row;
//     return `<div>${item.name} — ${item.quantity} × $${item.price}</div>`;
//   }).join("");

//   const shippingFee = 10;
//   const total = subtotal + shippingFee;

//   document.getElementById("shippingSummary").innerHTML = `
//     <h3>Shipping</h3>
//     <p>${shipping.fullName}</p>
//     <p>${shipping.address}, ${shipping.city}, ${shipping.country}</p>
//     <p>Phone: ${shipping.phone}</p>

//     <hr>
//     <h3>Items</h3>
//     ${listHtml}

//     <p>Subtotal: ${formatCurrency(subtotal)}</p>
//     <p>Shipping: ${formatCurrency(shippingFee)}</p>
//     <p><strong>Total: ${formatCurrency(total)}</strong></p>
//   `;

//   localStorage.setItem("checkout_summary", JSON.stringify({ subtotal, shippingFee, total }));
// }

// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const method = document.querySelector('input[name="method"]:checked').value;
//   const shipping = JSON.parse(localStorage.getItem("shipping"));
//   const summary = JSON.parse(localStorage.getItem("checkout_summary"));

//   const payload = {
//     shipping,
//     payment_method: method,
//   };

//   const res = await fetch(`${API_URL}/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok) return alert(data.error);

//   localStorage.removeItem("shipping");
//   localStorage.removeItem("checkout_summary");

//   localStorage.setItem("last_order", JSON.stringify({
//     orderId: data.orderId,
//     total: data.total
//   }));

//   window.location.href = "/order-confirmation.html";
// });

// document.getElementById("backBtn").addEventListener("click", () => {
//   window.location.href = "/shipping.html";
// });

// document.addEventListener("DOMContentLoaded", loadSummary);











// // frontend/js/payment.js (FINAL)
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to continue checkout.");
//   window.location.href = "/login.html";
// }

// function formatCurrency(n) {
//   return `$${Number(n).toFixed(2)}`;
// }

// async function loadSummary() {
//   const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
//   if (!shipping || !shipping.email) {
//     alert("Shipping info missing. Returning to shipping page.");
//     return window.location.href = "/shipping.html";
//   }

//   const res = await fetch(`${API_URL}/cart`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     document.getElementById("shippingSummary").innerText = "Unable to load cart summary.";
//     return;
//   }
//   const items = await res.json();

//   let subtotal = 0;
//   const itemHtml = items.map(it => {
//     const rowTotal = it.price * it.quantity;
//     subtotal += rowTotal;
//     return `<div>${it.name} — ${it.quantity} × ${formatCurrency(it.price)} = ${formatCurrency(rowTotal)}</div>`;
//   }).join("");

//   const shippingFee = 10;
//   const total = subtotal + shippingFee;

//   document.getElementById("shippingSummary").innerHTML = `
//     <h3>Shipping</h3>
//     <div>${shipping.fullName || shipping.fullname} — ${shipping.email}</div>
//     <div>${(shipping.address || "")}, ${shipping.city || ""}, ${shipping.country || ""} (${shipping.postal || ""})</div>
//     <div>Phone: ${shipping.phone || ""}</div>

//     <hr />
//     <h3>Order Summary</h3>
//     ${itemHtml || "<div>Your cart is empty.</div>"}
//     <p>Subtotal: ${formatCurrency(subtotal)}</p>
//     <p>Shipping: ${formatCurrency(shippingFee)}</p>
//     <p><strong>Total: ${formatCurrency(total)}</strong></p>
//   `;

//   localStorage.setItem("checkout_summary", JSON.stringify({ subtotal, shippingFee, total }));
// }

// function validateCardFields() {
//   // minimal client-side validation for demo
//   const cardNumber = document.getElementById("card-number")?.value?.replace(/\s+/g, "") || "";
//   const exp = document.getElementById("card-exp")?.value || "";
//   const cvv = document.getElementById("card-cvv")?.value || "";

//   if (!cardNumber || cardNumber.length < 12) return "Invalid card number (demo)";
//   if (!exp || !/^\d{2}\/\d{2}$/.test(exp)) return "Invalid expiry (use MM/YY)";
//   if (!cvv || cvv.length < 3) return "Invalid CVV";
//   return null;
// }

// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const method = document.querySelector('input[name="method"]:checked').value;
//   const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
//   const summary = JSON.parse(localStorage.getItem("checkout_summary") || "{}");

//   // if credit card selected, validate demo fields (these are optional UI inputs)
//   if (method === "card") {
//     const err = validateCardFields();
//     if (err) return alert(err);
//   }

//   // Save selected method locally (so confirmation page can show)
//   localStorage.setItem("payment_method", method);

//   const payload = {
//     shipping,
//     payment_method: method,
//     client_total: summary.total
//   };

//   try {
//     const res = await fetch(`${API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.error || "Failed to place order");
//     }

//     // store last_order info (include payment method + shipping for confirmation)
//     localStorage.removeItem("shipping");
//     localStorage.removeItem("checkout_summary");

//     localStorage.setItem("last_order", JSON.stringify({
//       orderId: data.orderId,
//       total: data.total,
//       payment_method: method,
//       shipping: payload.shipping
//     }));

//     window.location.href = "/order-confirmation.html";
//   } catch (err) {
//     console.error("Place order error:", err);
//     alert("Error placing order: " + err.message);
//   }
// });

// document.getElementById("backBtn").addEventListener("click", () => {
//   window.location.href = "/shipping.html";
// });

// document.addEventListener("DOMContentLoaded", () => {
//   loadSummary();

//   // If card option needs demo inputs, create them dynamically (so markup doesn't break)
//   const cardContainer = document.getElementById("cardFieldsContainer");
//   if (cardContainer) {
//     cardContainer.innerHTML = `
//       <div id="demo-card-fields" style="margin-top:8px;display:none;">
//         <input id="card-number" placeholder="Card number (4111 1111 1111 1111)" />
//         <input id="card-exp" placeholder="MM/YY" style="width:80px" />
//         <input id="card-cvv" placeholder="CVV" style="width:80px" />
//       </div>
//     `;

// //     document.querySelectorAll('input[name="method"]').forEach(radio => {
// //   radio.addEventListener("change", () => {
// //     const cardFields = document.getElementById("cardFields");
// //     cardFields.style.display = radio.value === "card" ? "block" : "none";
// //   });
// // });

//     // show/hide when radio changes
//     document.querySelectorAll('input[name="method"]').forEach(r => {
//       r.addEventListener("change", () => {
//         const demo = document.getElementById("demo-card-fields");
//         if (!demo) return;
//         demo.style.display = (r.value === "card") ? "block" : "none";
//       });
//     });

//     if (method === "card") {
//   const number = document.getElementById("cardNumber").value.trim();
//   const expiry = document.getElementById("expiry").value.trim();
//   const cvv = document.getElementById("cvv").value.trim();

//   if (!number || !expiry || !cvv)
//     return alert("Please fill all card fields (demo).");

//   if (number !== "4242424242424242")
//     return alert("Invalid card number (demo)");

//   // no other checks needed because it's demo
// }

//   }
// });








// // frontend/js/payment.js (FINAL CLEAN VERSION)
const API_URL = "https://online-store-backend-oxl9.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to continue checkout.");
  window.location.href = "/login.html";
}

function formatCurrency(n) {
  return `$${Number(n).toFixed(2)}`;
}

// Load summary (shipping + cart)
async function loadSummary() {
  const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
  if (!shipping.email) return window.location.href = "/shipping.html";

  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const cart = await res.json();
  let subtotal = 0;

  const listHtml = cart.map(item => {
    const row = item.price * item.quantity;
    subtotal += row;
    return `<div>${item.name} — ${item.quantity} × $${item.price}</div>`;
  }).join("");

  const shippingFee = 10;
  const total = subtotal + shippingFee;

  document.getElementById("shippingSummary").innerHTML = `
    <h3>Shipping</h3>
    <p>${shipping.fullName}</p>
    <p>${shipping.address}, ${shipping.city}, ${shipping.country}</p>
    <p>Phone: ${shipping.phone}</p>
    <hr>
    <h3>Items</h3>
    ${listHtml}
    <p>Subtotal: ${formatCurrency(subtotal)}</p>
    <p>Shipping: ${formatCurrency(shippingFee)}</p>
    <p><strong>Total: ${formatCurrency(total)}</strong></p>
  `;

  localStorage.setItem("checkout_summary", JSON.stringify({ subtotal, shippingFee, total }));
}

// SHOW/HIDE CARD FIELDS
document.querySelectorAll('input[name="method"]').forEach(radio => {
  radio.addEventListener("change", () => {
    document.getElementById("cardFields").style.display =
      radio.value === "card" ? "block" : "none";
  });
});

// Validate demo card
function validateCard() {
  const number = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!number || !expiry || !cvv)
    return "Please fill all card fields (demo).";

  if (number !== "4242424242424242")
    return "Invalid card number (demo).";

  return null;
}

function validateCardFields() {
  const cardNumber = document.getElementById("cardNumber")?.value?.replace(/\s+/g, "") || "";
  const exp = document.getElementById("expiry")?.value || "";
  const cvv = document.getElementById("cvv")?.value || "";

  if (!cardNumber || cardNumber.length < 16)
    return "Invalid card number (demo)";

  if (cardNumber !== "4242424242424242")
    return "Invalid card number (demo)";

  if (!exp || !/^\d{2}\/\d{2}$/.test(exp))
    return "Invalid expiry (use MM/YY)";

  if (!cvv || cvv.length < 3)
    return "Invalid CVV";

  return null;
}




// Submit payment
document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const method = document.querySelector('input[name="method"]:checked').value;
  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const summary = JSON.parse(localStorage.getItem("checkout_summary"));

  // Validate only if card chosen
  if (method === "card") {
    const err = validateCardFields()
;
    if (err) return alert(err);
  }

  localStorage.setItem("payment_method", method);

  const payload = {
    shipping,
    payment_method: method,
    client_total: summary.total
  };

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  localStorage.removeItem("shipping");
  localStorage.removeItem("checkout_summary");

  localStorage.setItem("last_order", JSON.stringify({
    orderId: data.orderId,
    total: data.total,
    payment_method: method,
    shipping
  }));

  window.location.href = "/order-confirmation.html";
});





// Submit payment
document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const method = document.querySelector('input[name="method"]:checked').value;
  const shipping = JSON.parse(localStorage.getItem("shipping"));
  const summary = JSON.parse(localStorage.getItem("checkout_summary"));

  // Validate only if card chosen
  if (method === "card") {
    const err = validateCardFields();   // ✅ FIXED
    if (err) return alert(err);
  }

  localStorage.setItem("payment_method", method);

  const payload = {
    shipping,
    payment_method: method,
    client_total: summary.total
  };

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  localStorage.removeItem("shipping");
  localStorage.removeItem("checkout_summary");

  localStorage.setItem("last_order", JSON.stringify({
    orderId: data.orderId,
    total: data.total,
    payment_method: method,
    shipping
  }));

  window.location.href = "/order-confirmation.html";
});





// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "/shipping.html";
});

document.addEventListener("DOMContentLoaded", loadSummary);













// // frontend/js/payment.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// // --- 1. Auth Check ---
// if (!token) {
//     window.location.href = "/login.html";
// }

// // --- 2. UI Helpers (Toast, Loading, Error) ---

// // Toast Notification
// const showToast = (message, type = 'success') => {
//     const container = document.getElementById('toast-container');
//     const toast = document.createElement('div');

//     const isSuccess = type === 'success';
//     const bgClass = isSuccess ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500';
//     const iconName = isSuccess ? 'check-circle' : 'alert-circle';
//     const textClass = isSuccess ? 'text-green-600' : 'text-red-600';

//     toast.className = `toast pointer-events-auto w-80 shadow-lg rounded-lg p-4 flex items-start gap-3 transform transition-all duration-300 ${bgClass}`;
//     toast.innerHTML = `
//         <i data-lucide="${iconName}" class="w-5 h-5 ${textClass} mt-0.5"></i>
//         <div class="flex-1">
//             <h4 class="text-sm font-semibold text-gray-800">${isSuccess ? 'Success' : 'Error'}</h4>
//             <p class="text-xs text-gray-500 mt-1">${message}</p>
//         </div>
//     `;

//     container.appendChild(toast);
    
//     // Refresh icons for the new toast
//     if (window.lucide) window.lucide.createIcons();

//     // Remove after 3 seconds
//     setTimeout(() => {
//         toast.classList.add('hiding');
//         toast.addEventListener('animationend', () => toast.remove());
//     }, 3000);
// };

// // Toggle Loading Button
// const setLoading = (loading) => {
//     const btn = document.getElementById('submitBtn');
//     const icon = btn.querySelector('.btn-icon');
//     const spinner = btn.querySelector('.spinner');
//     const text = btn.querySelector('span');

//     if (loading) {
//         btn.disabled = true;
//         if (icon) icon.classList.add('hidden');
//         if (spinner) spinner.classList.remove('hidden');
//         text.textContent = "Processing...";
//     } else {
//         btn.disabled = false;
//         if (icon) icon.classList.remove('hidden');
//         if (spinner) spinner.classList.add('hidden');
//         text.textContent = "Place Order";
//     }
// };

// // Toggle Input Error Styles
// const showError = (input, show) => {
//     if (show) {
//         input.classList.add('error');
//         input.classList.remove('border-gray-200');
//     } else {
//         input.classList.remove('error');
//         input.classList.add('border-gray-200');
//     }
// };

// // --- 3. Data Loading & Logic ---

// // Load Shipping Summary
// const loadSummary = () => {
//     const summaryDiv = document.getElementById("shippingSummary");
//     const shipping = JSON.parse(localStorage.getItem("shipping"));
//     const checkout = JSON.parse(localStorage.getItem("checkout_summary"));

//     // Redirect if data is missing
//     if (!shipping || !checkout) {
//         window.location.href = "/shipping.html";
//         return;
//     }

//     // Populate HTML
//     summaryDiv.innerHTML = `
//         <div class="flex flex-col">
//             <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Ship To</span>
//             <span class="font-medium text-gray-800 mt-1">${shipping.fullName}</span>
//             <span class="text-xs text-gray-500 leading-tight">${shipping.address}, ${shipping.city}</span>
//             <span class="text-xs text-gray-500">${shipping.country}</span>
//         </div>
//         <div class="mt-4 md:mt-0 md:text-right md:pl-6 md:border-l border-gray-200 flex flex-col justify-center">
//             <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Amount</span>
//             <span class="text-2xl font-bold text-primary mt-1">$${parseFloat(checkout.total).toFixed(2)}</span>
//             <span class="text-xs text-gray-400">${checkout.itemCount} Items</span>
//         </div>
//     `;
// };

// // Validate Card Fields
// const validateCardFields = () => {
//     const num = document.getElementById("cardNumber");
//     const exp = document.getElementById("expiry");
//     const cvv = document.getElementById("cvv");
//     let isValid = true;
//     let errorMessage = null;

//     // Validate Number (16 digits)
//     const rawNum = num.value.replace(/\s/g, '');
//     if (!rawNum || rawNum.length !== 16 || isNaN(rawNum)) {
//         showError(num, true);
//         isValid = false;
//         if(!errorMessage) errorMessage = "Card number must be 16 digits.";
//     } else {
//         showError(num, false);
//     }

//     // Validate Expiry (MM/YY)
//     const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//     if (!exp.value || !expRegex.test(exp.value)) {
//         showError(exp, true);
//         isValid = false;
//         if(!errorMessage) errorMessage = "Invalid expiry date (MM/YY).";
//     } else {
//         showError(exp, false);
//     }

//     // Validate CVV (3 digits)
//     if (!cvv.value || cvv.value.length !== 3 || isNaN(cvv.value)) {
//         showError(cvv, true);
//         isValid = false;
//         if(!errorMessage) errorMessage = "CVV must be 3 digits.";
//     } else {
//         showError(cvv, false);
//     }

//     return { isValid, errorMessage };
// };

// // --- 4. Event Listeners ---

// document.addEventListener("DOMContentLoaded", () => {
//     loadSummary();

//     // --- Card Display Logic ---
//     const radios = document.querySelectorAll('input[name="method"]');
//     const cardSection = document.getElementById("cardFields");
//     const cardInput = document.getElementById("cardNumber");

//     // Check initial state (e.g. browser autofill or refresh)
//     const checked = document.querySelector('input[name="method"]:checked');
//     if (checked && checked.value === 'card') {
//         cardSection.classList.remove('hidden');
//     }

//     radios.forEach(radio => {
//         radio.addEventListener('change', (e) => {
//             if (e.target.value === 'card') {
//                 cardSection.classList.remove('hidden');
//                 setTimeout(() => cardInput.focus(), 150); // Focus for UX
//             } else {
//                 cardSection.classList.add('hidden');
//             }
//         });
//     });

//     // --- Input Formatting ---
    
//     // Format Card: 0000 0000 0000 0000
//     if (cardInput) {
//         cardInput.addEventListener('input', (e) => {
//             let v = e.target.value.replace(/\D/g, '').substring(0, 16);
//             v = v.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
//             e.target.value = v;
//             showError(e.target, false);
//         });
//     }

//     // Format Expiry: MM/YY
//     const expInput = document.getElementById('expiry');
//     if (expInput) {
//         expInput.addEventListener('input', (e) => {
//             let v = e.target.value.replace(/\D/g, '').substring(0, 4);
//             if (v.length >= 2) {
//                 v = v.substring(0, 2) + '/' + v.substring(2);
//             }
//             e.target.value = v;
//             showError(e.target, false);
//         });
//     }

//     // Format CVV: 000
//     const cvvInput = document.getElementById('cvv');
//     if (cvvInput) {
//         cvvInput.addEventListener('input', (e) => {
//             e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
//             showError(e.target, false);
//         });
//     }

//     // --- Back Button ---
//     document.getElementById("backBtn").addEventListener("click", () => {
//         window.location.href = "/shipping.html";
//     });

//     // --- Form Submission ---
//     document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const methodRadio = document.querySelector('input[name="method"]:checked');
//         const method = methodRadio ? methodRadio.value : 'cod';
        
//         // Validation check for Card
//         if (method === "card") {
//             const { isValid, errorMessage } = validateCardFields();
//             if (!isValid) {
//                 showToast(errorMessage || "Please check your card details.", "error");
//                 return;
//             }
//         }

//         const shipping = JSON.parse(localStorage.getItem("shipping"));
//         const summary = JSON.parse(localStorage.getItem("checkout_summary"));

//         if (!shipping || !summary) {
//             showToast("Session expired. Redirecting...", "error");
//             setTimeout(() => window.location.href = "/cart.html", 2000);
//             return;
//         }

//         setLoading(true);

//         const payload = {
//             shipping,
//             payment_method: method,
//             client_total: summary.total
//         };

//         try {
//             const res = await fetch(`${API_URL}/orders`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.error || "Order failed processing.");
//             }

//             // --- Success ---
            
//             // 1. Store result for confirmation page
//             localStorage.setItem("last_order", JSON.stringify({
//                 orderId: data.orderId,
//                 total: data.total,
//                 payment_method: method,
//                 shipping
//             }));

//             // 2. Clear checkout data
//             localStorage.removeItem("shipping");
//             localStorage.removeItem("checkout_summary");
//             localStorage.setItem("payment_method", method);

//             showToast("Order placed successfully!", "success");

//             // 3. Redirect
//             setTimeout(() => {
//                 window.location.href = "/order-confirmation.html";
//             }, 1500);

//         } catch (err) {
//             console.error(err);
//             showToast(err.message, "error");
//             setLoading(false);
//         }
//     });
// });




































// // ==========================
// // PAYMENT PAGE CONTROLLER
// // ==========================
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to continue checkout.");
//   window.location.href = "/login.html";
// }

// // Load shipping from previous step
// const shipping = JSON.parse(localStorage.getItem("shipping") || null);

// if (!shipping) {
//   alert("⚠ No shipping details found. Please complete shipping step first.");
//   window.location.href = "/shipping.html";
// }

// const summary = JSON.parse(localStorage.getItem("checkout_summary") || "{}");

// // -------------------------
// // CARD FIELD LOGIC
// // -------------------------
// function validateCardFields() {
//   const card = document.getElementById("cardNumber").value.trim();
//   const expiry = document.getElementById("expiry").value.trim();
//   const cvv = document.getElementById("cvv").value.trim();

//   if (!card || card.length < 12) return "⚠ Invalid card number.";
//   if (!expiry) return "⚠ Expiry date required.";
//   if (!cvv || cvv.length < 3) return "⚠ CVV required.";

//   return null;
// }

// // Toggle card UI
// document.querySelectorAll("input[name='method']").forEach((el) => {
//   el.addEventListener("change", () => {
//     document.getElementById("cardFields").style.display =
//       el.value === "card" ? "block" : "none";
//   });
// });

// // -------------------------
// // SUBMIT PAYMENT
// // -------------------------
// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const method = document.querySelector('input[name="method"]:checked').value;

//   if (!summary.total) {
//     return alert("Order total missing — go back to cart.");
//   }

//   if (method === "card") {
//     const err = validateCardFields();
//     if (err) return alert(err);
//   }

//   localStorage.setItem("payment_method", method);

//   const payload = {
//     shipping,
//     payment_method: method,
//     client_total: summary.total,
//   };

//   const res = await fetch(`${API_URL}/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   if (!res.ok) return alert(data.error);

//   localStorage.removeItem("shipping");
//   localStorage.removeItem("checkout_summary");

//   localStorage.setItem(
//     "last_order",
//     JSON.stringify({
//       orderId: data.orderId,
//       total: data.total,
//       payment_method: method,
//       shipping,
//     })
//   );

//   window.location.href = "/order-confirmation.html";
// });

// // -------------------------
// // BACK BUTTON
// // -------------------------
// document.getElementById("backBtn").addEventListener("click", () => {
//   window.location.href = "/shipping.html";
// });
