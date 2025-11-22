// admin/js/manage-users.js
const API_URL = "http://localhost:5000/api/auth/users";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  alert("Access denied! Please login as admin.");
  window.location.href = "/login.html";
}

// 🧩 Fetch all users
async function loadUsers() {
  const tbody = document.getElementById("user-body");
  tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();
    tbody.innerHTML = "";

    if (!users.length) {
      tbody.innerHTML = "<tr><td colspan='6'>No users found.</td></tr>";
      return;
    }

    users.forEach((u) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${new Date(u.created_at).toLocaleString()}</td>
        <td>
          <button class="btn-small btn-role" onclick="toggleRole(${u.id}, '${u.role}')">Make ${u.role === 'admin' ? 'User' : 'Admin'}</button>
          <button class="btn-small btn-delete" onclick="deleteUser(${u.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = "<tr><td colspan='6'>Error loading users.</td></tr>";
  }
}

// 🧩 Toggle user role (Admin <-> User)
async function toggleRole(id, currentRole) {
  const newRole = currentRole === "admin" ? "user" : "admin";

  try {
    const res = await fetch(`http://localhost:5000/api/auth/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update role");

    alert(`✅ Role changed to ${newRole}`);
    loadUsers();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// 🧩 Delete user
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete user");

    alert("🗑️ User deleted!");
    loadUsers();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// 🧩 Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/login.html";
});

// Auto-load
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
