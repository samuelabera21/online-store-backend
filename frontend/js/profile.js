// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first!");
//   window.location.href = "login.html";
// }

// // Load user profile
// async function loadProfile() {
//   try {
//     const res = await fetch(`${API_URL}/me`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     document.getElementById("user-name").textContent = data.name;
//     document.getElementById("user-email").textContent = data.email;
//     document.getElementById("user-date").textContent = new Date(data.created_at).toLocaleString();

//   } catch (err) {
//     console.error(err);
//     alert("Error loading profile");
//   }
// }

// // Logout
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });

// document.addEventListener("DOMContentLoaded", loadProfile);






// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) {
//   alert("Please login first!");
//   window.location.href = "/login.html";
// }

// // Load Profile
// async function loadProfile() {
//   try {
//     const res = await fetch(`${API_URL}/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     document.getElementById("user-name").textContent = data.name;
//     document.getElementById("user-email").textContent = data.email;
//     document.getElementById("user-date").textContent = new Date(data.created_at).toLocaleString();

//     // Pre-fill form
//     document.getElementById("edit-name").value = data.name;
//     document.getElementById("edit-email").value = data.email;

//   } catch (err) {
//     alert("Error loading profile");
//   }
// }

// // Update Profile
// document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const updated = {
//     name: document.getElementById("edit-name").value.trim(),
//     email: document.getElementById("edit-email").value.trim(),
//     currentPassword: document.getElementById("current-password").value.trim(),
//     newPassword: document.getElementById("new-password").value.trim(),
//   };

//   // If user tries to change password without entering old password
//   if (updated.newPassword && !updated.currentPassword) {
//     alert("Enter your current password to change password.");
//     return;
//   }

//   try {
//     const res = await fetch(`${API_URL}/me`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updated),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error);

//     alert("Profile updated!");

//     loadProfile();

//   } catch (err) {
//     alert(err.message);
//   }
// });

// // Logout
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "/login.html";
// });

// document.addEventListener("DOMContentLoaded", loadProfile);


// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");

// if (!token) {
//   window.location.href = "login.html";
// }



// async function loadProfile() {
//   const res = await fetch(`${API_URL}/me`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });

//   const user = await res.json();

//   document.getElementById("profile-avatar").src =
//     user.avatar ? `http://localhost:5000${user.avatar}` : "img/default-avatar.png";

//   document.getElementById("user-name").textContent = user.name;
//   document.getElementById("user-email").textContent = user.email;
//   document.getElementById("user-date").textContent =
//     new Date(user.created_at).toLocaleString();
// }

// // Upload avatar
// document.getElementById("avatarForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const file = document.getElementById("avatar").files[0];
//   if (!file) return alert("Select an image!");

//   const formData = new FormData();
//   formData.append("avatar", file);

//   const res = await fetch(`${API_URL}/upload-avatar`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });

//   const data = await res.json();

//   if (!res.ok) return alert(data.error);

//   alert("Profile picture updated!");

//   loadProfile();
// });

// document.addEventListener("DOMContentLoaded", loadProfile);



















// ---------------------- CONFIG -----------------------
const API_URL = "http://localhost:5000/api/auth";
const token = localStorage.getItem("token");

// If no token → send user to login page
if (!token) window.location.href = "login.html";

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

// ---------------------- LOAD PROFILE -----------------
async function loadProfile() {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Unable to load profile data");

    const user = await res.json();

    document.getElementById("profile-avatar").src =
      user.avatar ? `http://localhost:5000${user.avatar}` : "img/default-avatar.png";

    document.getElementById("user-name").textContent = user.name || "Unknown User";
    document.getElementById("user-email").textContent = user.email || "Not available";
    document.getElementById("user-date").textContent =
      "Member since " + new Date(user.created_at).toLocaleDateString();

  } catch (err) {
    console.error(err);
    showToast("⚠ Failed to load user data", "error");
  }
}

// ---------------------- UPLOAD AVATAR -----------------
document.getElementById("avatarForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("avatar").files[0];
  if (!file) return showToast("Please select an image first!", "error");

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const res = await fetch(`${API_URL}/upload-avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Upload failed");

    showToast("✔ Profile picture updated!");

    loadProfile();
  } catch (err) {
    console.error(err);
    showToast("⚠ Upload failed", "error");
  }
});

// ---------------------- LOGOUT ------------------------
document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Load profile automatically
document.addEventListener("DOMContentLoaded", loadProfile);
