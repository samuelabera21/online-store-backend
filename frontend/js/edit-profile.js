// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// async function loadExisting() {
//   const res = await fetch(`${API_URL}/me`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const data = await res.json();

//   document.getElementById("name").value = data.name;
//   document.getElementById("email").value = data.email;
// }

// document.getElementById("editForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   const res = await fetch(`${API_URL}/update`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ name, email })
//   });

//   const data = await res.json();
//   if (!res.ok) return alert(data.error);

//   alert("Profile updated!");
//   window.location.href = "profile.html";
// });

// document.addEventListener("DOMContentLoaded", loadExisting);

// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });















// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// async function loadExisting() {
//   const res = await fetch(`${API_URL}/me`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const data = await res.json();

//   document.getElementById("name").value = data.name;
//   document.getElementById("email").value = data.email;
// }

// document.getElementById("editForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   const res = await fetch(`${API_URL}/me`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ name, email })
//   });

//   const data = await res.json();
//   if (!res.ok) return alert(data.error);

//   alert("Profile updated!");
//   window.location.href = "profile.html";
// });

// document.addEventListener("DOMContentLoaded", loadExisting);











const API_URL = "https://online-store-backend-oxl9.onrender.com/api/auth";
const token = localStorage.getItem("token");

// ---------------------- INIT -------------------------
// If no token → send user to login page immediately
if (!token) {
  window.location.href = "login.html";
}

// Initialize Lucide Icons
lucide.createIcons();

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(t => t.remove());

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  // Icon based on type
  const iconHTML = type === 'success' 
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

  toast.innerHTML = `${iconHTML} <span>${message}</span>`;

  document.body.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(10px)";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ---------------------- DATA LOADING -----------------
async function loadExisting() {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      if(res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }
      throw new Error("Failed to load profile data");
    }

    const data = await res.json();

    // Populate fields
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (nameInput) nameInput.value = data.name || "";
    if (emailInput) emailInput.value = data.email || "";

  } catch (err) {
    console.error(err);
    showToast("Could not load user data", "error");
  }
}

// ---------------------- FORM HANDLING ----------------
const editForm = document.getElementById("editForm");
const submitBtn = document.getElementById("submitBtn");

function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.classList.add("btn-loading");
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove("btn-loading");
    submitBtn.disabled = false;
  }
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name.trim() || !email.trim()) {
    return showToast("Please fill in all fields", "error");
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update profile");
    }

    // Success
    showToast("✔ Profile updated successfully!");
    
    // Optional: Update local storage if you cache user data
    // localStorage.setItem("user", JSON.stringify(data));

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);

  } catch (err) {
    console.error(err);
    showToast(err.message, "error");
    setLoading(false);
  }
});

// ---------------------- LOGOUT LOGIC ------------------
document.getElementById("logout-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// ---------------------- INITIAL LOAD ------------------
document.addEventListener("DOMContentLoaded", loadExisting);