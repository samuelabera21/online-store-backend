// // frontend/js/shipping.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login to continue checkout.");
//   window.location.href = "/login.html";
// }

// // Prefill name & email from profile
// async function prefillProfile() {
//   try {
//     const res = await fetch(`${API_URL}/auth/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Failed to fetch profile");
//     const user = await res.json();
//     document.getElementById("fullName").value = user.name || "";
//     document.getElementById("email").value = user.email || "";
//   } catch (err) {
//     console.error("Prefill error:", err);
//   }
// }

// function validatePhone(phone) {
//   // simple check - allow digits, +, spaces, hyphens
//   return phone && /^[\d+\-\s()]{6,}$/.test(phone);
// }

// document.getElementById("shippingForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const shipping = {
//     fullName: document.getElementById("fullName").value.trim(),
//     email: document.getElementById("email").value.trim(),
//     phone: document.getElementById("phone").value.trim(),
//     address: document.getElementById("address").value.trim(),
//     country: document.getElementById("country").value.trim(),
//     city: document.getElementById("city").value.trim(),
//     postal: document.getElementById("postal").value.trim(),
//   };

//   // Basic validation
//   if (!shipping.fullName || !shipping.email || !shipping.address || !shipping.country || !shipping.city || !shipping.postal) {
//     return alert("Please fill all required fields.");
//   }
//   if (!validatePhone(shipping.phone)) return alert("Please enter a valid phone number.");

//   // Save to localStorage for next step (payment) — safe for temporary storage
//   localStorage.setItem("shipping", JSON.stringify(shipping));

//   // go to payment step (we'll show payment options there)
//   window.location.href = "/payment.html";
// });

// // Logout button handler (if present)
// document.addEventListener("click", (ev) => {
//   if (ev.target && ev.target.id === "logout-btn") {
//     localStorage.clear();
//     window.location.href = "/login.html";
//   }
// });

// document.addEventListener("DOMContentLoaded", prefillProfile);










// frontend/js/shipping.js
const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// --- 1. Authentication Check ---
if (!token) {
  // Use a small delay so the user sees the page flash briefly or handle redirection cleaner
  // But strictly following requirement to redirect:
  window.location.href = "/login.html";
}

// --- 2. Validation & Formatting Helpers ---
const validatePhone = (phone) => {
  // Allow digits, +, spaces, hyphens, parentheses, at least 6 chars
  return phone && /^[\d+\-\s()]{6,}$/.test(phone);
};

const validateNotEmpty = (value) => value && value.trim().length > 0;

// Shows error style on input parent
const showError = (input, show) => {
  const group = input.closest('.group');
  const errorMsg = group.querySelector('.error-msg');
  
  if (show) {
    input.classList.add('error');
    input.classList.remove('border-gray-200');
    if (errorMsg) errorMsg.classList.remove('hidden');
  } else {
    input.classList.remove('error');
    input.classList.add('border-gray-200');
    if (errorMsg) errorMsg.classList.add('hidden');
  }
};

// --- 3. UI Helpers ---
const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  // Colors based on type
  const bgClass = type === 'success' ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500';
  const icon = type === 'success' ? 'check-circle' : 'alert-circle';
  const textClass = type === 'success' ? 'text-green-600' : 'text-red-600';

  toast.className = `toast pointer-events-auto w-80 shadow-lg rounded-lg p-4 flex items-start gap-3 transform transition-all duration-300 ${bgClass}`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 ${textClass} mt-0.5"></i>
    <div class="flex-1">
      <h4 class="text-sm font-semibold text-gray-800">${type === 'success' ? 'Success' : 'Error'}</h4>
      <p class="text-xs text-gray-500 mt-1">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
};

const setLoading = (loading) => {
  const btn = document.getElementById('submitBtn');
  const icon = btn.querySelector('.btn-icon');
  const spinner = btn.querySelector('.spinner');
  const text = btn.querySelector('span');

  if (loading) {
    btn.disabled = true;
    icon.classList.add('hidden');
    spinner.classList.remove('hidden');
    text.textContent = "Processing...";
  } else {
    btn.disabled = false;
    icon.classList.remove('hidden');
    spinner.classList.add('hidden');
    text.textContent = "Continue to Payment";
  }
};

// --- 4. Logic Implementation ---

// Load data (API + LocalStorage)
async function loadData() {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");
  const postalInput = document.getElementById("postal");

  // 1. Fetch Profile Data (Name/Email)
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (res.ok) {
      const user = await res.json();
      // Only fill if empty (allow overrides from local storage later)
      if(!fullNameInput.value) fullNameInput.value = user.name || "";
      emailInput.value = user.email || ""; // Readonly, always overwrite
    }
  } catch (err) {
    console.error("Profile fetch error:", err);
    // Don't block the UI, just fail silently or show small toast
  }

  // 2. Load Draft from LocalStorage (if any)
  const savedShipping = localStorage.getItem("shipping");
  if (savedShipping) {
    try {
      const parsed = JSON.parse(savedShipping);
      if (parsed.fullName) fullNameInput.value = parsed.fullName;
      if (parsed.phone) phoneInput.value = parsed.phone;
      if (parsed.address) addressInput.value = parsed.address;
      if (parsed.country) countryInput.value = parsed.country;
      if (parsed.city) cityInput.value = parsed.city;
      if (parsed.postal) postalInput.value = parsed.postal;
    } catch (e) {
      console.warn("Invalid saved shipping data");
    }
  }
}

// Auto-Save Draft
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    // Clear error on type
    showError(input, false);
    
    // Save draft
    const draft = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value, // usually readonly but safe to store
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      country: document.getElementById("country").value,
      city: document.getElementById("city").value,
      postal: document.getElementById("postal").value,
    };
    localStorage.setItem("shipping", JSON.stringify(draft));
  });

  // Blur validation
  input.addEventListener('blur', () => {
    if (input.hasAttribute('required') && !validateNotEmpty(input.value)) {
      showError(input, true);
    }
    if (input.id === 'phone' && input.value && !validatePhone(input.value)) {
        showError(input, true);
    }
  });
});

// Handle Submit
document.getElementById("shippingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const country = document.getElementById("country");
  const city = document.getElementById("city");
  const postal = document.getElementById("postal");

  let isValid = true;

  // Validate Fields
  [fullName, address, country, city, postal].forEach(el => {
    if (!validateNotEmpty(el.value)) {
      showError(el, true);
      isValid = false;
    }
  });

  if (!validatePhone(phone.value)) {
    showError(phone, true);
    isValid = false;
  }

  if (!isValid) {
    showToast("Please fix the errors in the form.", "error");
    return;
  }

  // Start Processing
  setLoading(true);

  // Construct Object
  const shippingData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    address: address.value.trim(),
    country: country.value.trim(),
    city: city.value.trim(),
    postal: postal.value.trim(),
  };

  // Simulate Network Delay (for better UX feeling)
  await new Promise(r => setTimeout(r, 800));

  // Save to LocalStorage
  localStorage.setItem("shipping", JSON.stringify(shippingData));

  // Success & Redirect
  showToast("Shipping details saved!", "success");
  
  setTimeout(() => {
    window.location.href = "/payment.html";
  }, 500);
});

// Logout Handler
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("shipping"); // Clear draft on logout
        window.location.href = "/login.html";
    });
}

// Init
document.addEventListener("DOMContentLoaded", loadData);