// const API_URL = "http://localhost:5000/api/auth";

// // REGISTER
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");

//       alert("✅ Registered successfully! Please login.");
//       window.location.href = "login.html";
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

// // LOGIN
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");

//       localStorage.setItem("token", data.token);
//       alert("✅ Login successful!");
//       window.location.href = "index.html";
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }
// LOGOUT



// const API_URL = "http://localhost:5000/api/auth";

// // REGISTER
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");
//       alert("✅ Registered successfully! Please login.");
//       window.location.href = "login.html";
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

// // LOGIN
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");

//       // Save token + role
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       alert("✅ Login successful!");

//       // Redirect based on role
//       if (data.role === "admin") {
//         window.location.href = "../admin/dashboard.html";
//       } else {
//         window.location.href = "index.html";
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }
// LOGOUT











// const API_URL = "http://localhost:5000/api/auth";

// REGISTER
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");
//       alert("✅ Registered successfully! Please login.");
//       window.location.href = "login.html";
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

// // LOGIN
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     try {
//       const res = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");

//       // Save token + role + name
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("name", data.name);

//       alert("✅ Login successful!");

//       // Redirect based on role
//       if (data.role === "admin") {
//         window.location.href = "../admin/dashboard.html";
//       } else {
//         window.location.href = "index.html";
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   });
// }

// // LOGOUT (optional utility)
// document.addEventListener("click", (e) => {
//   if (e.target.id === "logout-btn") {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("name");
//     window.location.href = "login.html";
//   }
// });














// // frontend/js/auth.js
const API_URL = "http://online-store-backend-oxl9.onrender.com/api/auth";

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      alert("✅ Registered successfully! Please login.");
      window.location.href = "/login.html";
    } catch (err) {
      alert(err.message || "Registration error");
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      if (data.role) localStorage.setItem("role", data.role);
      if (data.name) localStorage.setItem("name", data.name);

      alert("✅ Login successful!");

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard.html";
      } else {
        window.location.href = "/index.html";
      }
    } catch (err) {
      alert(err.message || "Login error");
    }
  });
}

// LOGOUT (works on all pages)
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "logout-btn") {
    localStorage.clear();
    window.location.href = "/login.html";
  }
});
