// // frontend/js/utils.js
// const API_URL = "http://localhost:5000/api";

// export function getToken() {
//   return localStorage.getItem("token");
// }

// export function authHeaders() {
//   const token = getToken();
//   const headers = { "Content-Type": "application/json" };
//   if (token) headers["Authorization"] = `Bearer ${token}`;
//   return headers;
// }


// frontend/js/utils.js
const API_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// make available globally
window.API_URL = API_URL;
window.getToken = getToken;
window.authHeaders = authHeaders;
