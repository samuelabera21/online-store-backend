// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// document.getElementById("passwordForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const currentPassword = document.getElementById("current-password").value;
//   const newPassword = document.getElementById("new-password").value;

//   try {
//     const res = await fetch(`${API_URL}/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         password: newPassword,
//         currentPassword
//       })
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     alert("Password updated!");
//     window.location.href = "profile.html";

//   } catch (err) {
//     alert("Error: " + err.message);
//   }
// });













// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// document.getElementById("passwordForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const currentPassword = document.getElementById("current-password").value;
//   const newPassword = document.getElementById("new-password").value;

//   const res = await fetch(`${API_URL}/change-password`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       currentPassword,
//       newPassword
//     })
//   });

//   const data = await res.json();
//   if (!res.ok) return alert(data.error);

//   alert("Password updated!");
//   window.location.href = "profile.html";
// });






// ---------------------- CONFIG -----------------------
const API_URL = "http://online-store-backend-oxl9.onrender.com/api/auth";
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
  // Remove existing toasts to prevent stacking too many
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

// ---------------------- FORM HANDLING ----------------
const passwordForm = document.getElementById("passwordForm");
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

passwordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;

  // Basic Frontend Validation
  if (currentPassword === newPassword) {
    return showToast("New password must be different from current password", "error");
  }

  if (newPassword.length < 6) {
    return showToast("New password must be at least 6 characters", "error");
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update password");
    }

    // Success
    showToast("✔ Password updated successfully!");
    passwordForm.reset();

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