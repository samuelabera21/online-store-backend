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



// frontend/js/payment.js (FINAL CLEAN VERSION)
const API_URL = "http://localhost:5000/api";
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
// function validateCard() {
//   const number = document.getElementById("cardNumber").value.trim();
//   const expiry = document.getElementById("expiry").value.trim();
//   const cvv = document.getElementById("cvv").value.trim();

//   if (!number || !expiry || !cvv)
//     return "Please fill all card fields (demo).";

//   if (number !== "4242424242424242")
//     return "Invalid card number (demo).";

//   return null;
// }

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




// // Submit payment
// document.getElementById("paymentForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const method = document.querySelector('input[name="method"]:checked').value;
//   const shipping = JSON.parse(localStorage.getItem("shipping"));
//   const summary = JSON.parse(localStorage.getItem("checkout_summary"));

//   // Validate only if card chosen
//   if (method === "card") {
//     const err = validateCardFields()
// ;
//     if (err) return alert(err);
//   }

//   localStorage.setItem("payment_method", method);

//   const payload = {
//     shipping,
//     payment_method: method,
//     client_total: summary.total
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
//     total: data.total,
//     payment_method: method,
//     shipping
//   }));

//   window.location.href = "/order-confirmation.html";
// });





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
