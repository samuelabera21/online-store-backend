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



const API_URL = "http://localhost:5000/api/auth";
const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

document.getElementById("passwordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;

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
  if (!res.ok) return alert(data.error);

  alert("Password updated!");
  window.location.href = "profile.html";
});
