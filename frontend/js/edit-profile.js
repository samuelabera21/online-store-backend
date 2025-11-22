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


const API_URL = "http://localhost:5000/api/auth";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

async function loadExisting() {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  document.getElementById("name").value = data.name;
  document.getElementById("email").value = data.email;
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const res = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  alert("Profile updated!");
  window.location.href = "profile.html";
});

document.addEventListener("DOMContentLoaded", loadExisting);
