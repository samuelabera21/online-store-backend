// // admin/js/manage-users.js
// const API_URL = "http://localhost:5000/api/auth/users";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "/login.html";
// }

// // 🧩 Fetch all users
// async function loadUsers() {
//   const tbody = document.getElementById("user-body");
//   tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

//   try {
//     const res = await fetch(API_URL, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (!res.ok) throw new Error("Failed to fetch users");

//     const users = await res.json();
//     tbody.innerHTML = "";

//     if (!users.length) {
//       tbody.innerHTML = "<tr><td colspan='6'>No users found.</td></tr>";
//       return;
//     }

//     users.forEach((u) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${u.id}</td>
//         <td>${u.name}</td>
//         <td>${u.email}</td>
//         <td>${u.role}</td>
//         <td>${new Date(u.created_at).toLocaleString()}</td>
//         <td>
//           <button class="btn-small btn-role" onclick="toggleRole(${u.id}, '${u.role}')">Make ${u.role === 'admin' ? 'User' : 'Admin'}</button>
//           <button class="btn-small btn-delete" onclick="deleteUser(${u.id})">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });
//   } catch (err) {
//     console.error(err);
//     tbody.innerHTML = "<tr><td colspan='6'>Error loading users.</td></tr>";
//   }
// }

// // 🧩 Toggle user role (Admin <-> User)
// async function toggleRole(id, currentRole) {
//   const newRole = currentRole === "admin" ? "user" : "admin";

//   try {
//     const res = await fetch(`http://localhost:5000/api/auth/users/${id}/role`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ role: newRole }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to update role");

//     alert(`✅ Role changed to ${newRole}`);
//     loadUsers();
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// }

// // 🧩 Delete user
// async function deleteUser(id) {
//   if (!confirm("Are you sure you want to delete this user?")) return;

//   try {
//     const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to delete user");

//     alert("🗑️ User deleted!");
//     loadUsers();
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// }

// // 🧩 Logout
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "/login.html";
// });

// // Auto-load
// document.addEventListener("DOMContentLoaded", loadUsers);





































// admin/js/manage-users.js

// ---------------------- CONFIG -----------------------
const API_URL = "http://localhost:5000/api/auth/users";
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("role");

// State Management
let allUsers = [];
let deleteTargetId = null;

// ---------------------- AUTH CHECK -------------------
if (!token || userRole !== "admin") {
  window.location.href = "/login.html"; // Redirect immediately if not admin
}

// ---------------------- DOM ELEMENTS -----------------
const tableBody = document.getElementById("user-body");
const searchInput = document.getElementById("search-input");
const roleFilter = document.getElementById("role-filter");
const totalCountEl = document.getElementById("total-users-count");
const logoutBtn = document.getElementById("logout-btn");

// Modal Elements
const modal = document.getElementById("confirm-modal");
const confirmBtn = document.getElementById("confirm-modal-btn");
const cancelBtn = document.getElementById("cancel-modal-btn");

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : ""}`;
  
  // Add icon based on type
  const icon = type === "error" ? "alert-circle" : "check-circle";
  
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  lucide.createIcons(); // Render icon in toast

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ---------------------- LOADING STATE ----------------
function showLoading() {
  const shimmerRow = `
    <tr>
      <td class="p-5"><div class="h-4 w-8 shimmer"></div></td>
      <td class="p-5">
        <div class="h-4 w-32 mb-2 shimmer"></div>
        <div class="h-3 w-48 shimmer"></div>
      </td>
      <td class="p-5"><div class="h-6 w-20 shimmer rounded-full"></div></td>
      <td class="p-5"><div class="h-4 w-24 shimmer"></div></td>
      <td class="p-5 text-right"><div class="h-8 w-20 shimmer inline-block rounded-lg"></div></td>
    </tr>
  `;
  // Repeat shimmer row 5 times
  tableBody.innerHTML = shimmerRow.repeat(5);
}

// ---------------------- RENDER TABLE -----------------
function renderUsers(usersToRender) {
  tableBody.innerHTML = "";
  
  // Update Header Count
  totalCountEl.textContent = `${usersToRender.length} User${usersToRender.length !== 1 ? 's' : ''}`;

  if (usersToRender.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-10 text-center text-gray-400">
            <div class="flex flex-col items-center gap-3">
                <i data-lucide="search-x" class="w-10 h-10 text-gray-300"></i>
                <p>No users found matching your criteria.</p>
            </div>
        </td>
      </tr>`;
    lucide.createIcons();
    return;
  }

  usersToRender.forEach(user => {
    const isSelf = user.email === localStorage.getItem("email"); // Prevent deleting self if needed (optional logic)
    
    // Badge Styles
    const isAdmin = user.role === 'admin';
    const badgeClass = isAdmin 
      ? "bg-red-100 text-red-700 border-red-200" 
      : "bg-blue-100 text-primary border-blue-200";
    const badgeIcon = isAdmin ? "shield" : "user";

    const tr = document.createElement("tr");
    tr.className = "group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none";
    
    tr.innerHTML = `
      <td class="p-5 text-sm font-medium text-gray-500">#${user.id}</td>
      <td class="p-5">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br ${isAdmin ? 'from-red-100 to-red-50 text-red-600' : 'from-blue-100 to-blue-50 text-primary'} flex items-center justify-center font-bold text-lg shadow-sm">
                ${user.name.charAt(0).toUpperCase()}
            </div>
            <div>
                <div class="text-sm font-semibold text-gray-800">${user.name}</div>
                <div class="text-xs text-gray-500">${user.email}</div>
            </div>
        </div>
      </td>
      <td class="p-5">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}">
            <i data-lucide="${badgeIcon}" class="w-3 h-3"></i>
            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>
      <td class="p-5 text-sm text-gray-500">
        <div class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-3 h-3 text-gray-400"></i>
            ${new Date(user.created_at).toLocaleDateString()}
        </div>
      </td>
      <td class="p-5 text-right">
        <div class="flex items-center justify-end gap-2">
            <button onclick="toggleRole(${user.id}, '${user.role}')" 
                class="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm group/btn tooltip-container" 
                title="${isAdmin ? 'Demote to User' : 'Promote to Admin'}">
                <i data-lucide="${isAdmin ? 'arrow-down-circle' : 'arrow-up-circle'}" class="w-4 h-4"></i>
            </button>
            
            <button onclick="openDeleteModal(${user.id})" 
                class="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm group/btn" 
                title="Delete User">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  lucide.createIcons(); // Refresh icons
}

// ---------------------- DATA FILTERING -----------------
function filterUsers() {
  const term = searchInput.value.toLowerCase();
  const roleType = roleFilter.value;

  const filtered = allUsers.filter(user => {
    // 1. Text Search
    const matchesSearch = 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term) || 
        user.id.toString().includes(term);
    
    // 2. Role Filter
    const matchesRole = roleType === "all" || user.role === roleType;

    return matchesSearch && matchesRole;
  });

  renderUsers(filtered);
}

// ---------------------- API ACTIONS --------------------

// 1. Fetch All Users
async function loadUsers() {
  showLoading();
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) throw new Error("Failed to fetch users");
    
    allUsers = await res.json();
    renderUsers(allUsers); // Initial render
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-red-500 p-5">Error loading users.</td></tr>`;
    showToast("Failed to load users", "error");
  }
}

// 2. Toggle Role
window.toggleRole = async (id, currentRole) => {
  const newRole = currentRole === "admin" ? "user" : "admin";
  const actionText = newRole === "admin" ? "Promoted to Admin" : "Demoted to User";

  // Optimistic UI update (optional, but looks faster)
  // For now, we wait for server to ensure data integrity
  
  try {
    const res = await fetch(`${API_URL}/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update role");

    // Update local data and re-render without fetching
    const userIndex = allUsers.findIndex(u => u.id === id);
    if (userIndex > -1) {
        allUsers[userIndex].role = newRole;
        filterUsers(); // Re-render preserving filters
    }

    showToast(`✅ ${actionText}`);
  } catch (err) {
    showToast(err.message, "error");
  }
};

// 3. Delete User (Modal Handling)
window.openDeleteModal = (id) => {
    deleteTargetId = id;
    modal.classList.remove("hidden");
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => modal.classList.add("show"), 10);
};

function closeModal() {
    deleteTargetId = null;
    modal.classList.remove("show");
    setTimeout(() => modal.classList.add("hidden"), 300);
}

// Confirm Delete API Call
confirmBtn.addEventListener("click", async () => {
    if (!deleteTargetId) return;
    
    // Change button state to loading
    const originalBtnText = confirmBtn.innerHTML;
    confirmBtn.innerText = "Deleting...";
    confirmBtn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/${deleteTargetId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete user");

        // Remove from local array
        allUsers = allUsers.filter(u => u.id !== deleteTargetId);
        filterUsers(); // Re-render

        showToast("🗑️ User deleted successfully");
        closeModal();

    } catch (err) {
        showToast(err.message, "error");
    } finally {
        confirmBtn.innerHTML = originalBtnText;
        confirmBtn.disabled = false;
        closeModal();
    }
});

cancelBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});


// ---------------------- EVENT LISTENERS ----------------
searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);

logoutBtn.addEventListener("click", () => {
  localStorage.clear(); // Or remove specific items
  window.location.href = "/login.html";
});

// Initialize
document.addEventListener("DOMContentLoaded", loadUsers);






















































// const API_URL = "http://localhost:5000/api/auth";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// // Ensure admin is logged in
// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "../frontend/login.html";
// }

// async function fetchUsers() {
//   try {
//     const res = await fetch(`${API_URL}/users`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (!res.ok) throw new Error("Failed to fetch users");
//     const users = await res.json();

//     const tbody = document.getElementById("users-body");
//     tbody.innerHTML = "";

//     if (users.length === 0) {
//       tbody.innerHTML = `<tr><td colspan="6">No users found</td></tr>`;
//       return;
//     }

//     users.forEach((u) => {
//       const tr = document.createElement("tr");
//       tr.innerHTML = `
//         <td>${u.id}</td>
//         <td>${u.name}</td>
//         <td>${u.email}</td>
//         <td>${u.role}</td>
//         <td>${new Date(u.created_at).toLocaleDateString()}</td>
//         <td><button class="delete-btn" data-id="${u.id}">🗑️ Delete</button></td>
//       `;
//       tbody.appendChild(tr);
//     });

//     // Attach delete listeners
//     document.querySelectorAll(".delete-btn").forEach((btn) =>
//       btn.addEventListener("click", () => deleteUser(btn.dataset.id))
//     );
//   } catch (err) {
//     console.error(err);
//     document.getElementById("users-body").innerHTML =
//       `<tr><td colspan="6">Error loading users</td></tr>`;
//   }
// }

// async function deleteUser(id) {
//   if (!confirm("Are you sure you want to delete this user?")) return;

//   try {
//     const res = await fetch(`${API_URL}/users/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to delete user");

//     alert(data.message || "User deleted successfully!");
//     fetchUsers(); // refresh table
//   } catch (err) {
//     console.error("Delete user error:", err);
//     alert(err.message || "Error deleting user");
//   }
// }

// document.addEventListener("DOMContentLoaded", fetchUsers);
