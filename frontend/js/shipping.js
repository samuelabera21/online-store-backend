// frontend/js/shipping.js
const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to continue checkout.");
  window.location.href = "/login.html";
}

// Prefill name & email from profile
async function prefillProfile() {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const user = await res.json();
    document.getElementById("fullName").value = user.name || "";
    document.getElementById("email").value = user.email || "";
  } catch (err) {
    console.error("Prefill error:", err);
  }
}

function validatePhone(phone) {
  // simple check - allow digits, +, spaces, hyphens
  return phone && /^[\d+\-\s()]{6,}$/.test(phone);
}

document.getElementById("shippingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const shipping = {
    fullName: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    country: document.getElementById("country").value.trim(),
    city: document.getElementById("city").value.trim(),
    postal: document.getElementById("postal").value.trim(),
  };

  // Basic validation
  if (!shipping.fullName || !shipping.email || !shipping.address || !shipping.country || !shipping.city || !shipping.postal) {
    return alert("Please fill all required fields.");
  }
  if (!validatePhone(shipping.phone)) return alert("Please enter a valid phone number.");

  // Save to localStorage for next step (payment) — safe for temporary storage
  localStorage.setItem("shipping", JSON.stringify(shipping));

  // go to payment step (we'll show payment options there)
  window.location.href = "/payment.html";
});

// Logout button handler (if present)
document.addEventListener("click", (ev) => {
  if (ev.target && ev.target.id === "logout-btn") {
    localStorage.clear();
    window.location.href = "/login.html";
  }
});

document.addEventListener("DOMContentLoaded", prefillProfile);
