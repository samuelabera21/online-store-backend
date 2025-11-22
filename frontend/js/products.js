// // frontend/js/products.js
// // If you used the module version of utils.js import:
// // import { API_URL, authHeaders } from './utils.js';

// const API_URL = "http://localhost:5000/api";

// function createProductCard(p) {
//   const div = document.createElement("div");
//   div.className = "product-card";
//   div.innerHTML = `
//     <img src="${p.image_url || 'https://via.placeholder.com/200'}" alt="${escapeHtml(p.name)}" />
//     <h3>${escapeHtml(p.name)}</h3>
//     <p class="price">$${Number(p.price).toFixed(2)}</p>
//     <p class="desc">${escapeHtml((p.description || '').slice(0, 120))}${(p.description || '').length>120?'...':''}</p>
//     <div class="actions">
//       <a class="btn" href="product.html?id=${p.id}">View</a>
//       <button class="btn add-cart" data-id="${p.id}">Add to cart</button>
//     </div>
//   `;
//   return div;
// }

// function escapeHtml(str = "") {
//   return str.replace(/[&<>"']/g, (m) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' }[m]));
// }

// async function loadProducts() {
//   const list = document.getElementById("products-list");
//   list.innerHTML = "<p>Loading...</p>";
//   try {
//     const res = await fetch(`${API_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");
//     const products = await res.json();
//     list.innerHTML = "";
//     if (!products.length) {
//       list.innerHTML = "<p>No products found.</p>";
//       return;
//     }
//     products.forEach(p => {
//       const card = createProductCard(p);
//       list.appendChild(card);
//     });

//     // attach add-to-cart click handlers
//     document.querySelectorAll(".add-cart").forEach(btn => {
//       btn.addEventListener("click", async (e) => {
//         const id = btn.dataset.id;
//         // Add to cart (requires auth). If not logged in show alert.
//         const token = localStorage.getItem("token");
//         if (!token) {
//           alert("Please login to add items to cart.");
//           return;
//         }
//         try {
//           const resp = await fetch(`${API_URL}/cart`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({ product_id: id, quantity: 1 })
//           });
//           if (!resp.ok) {
//             const err = await resp.json().catch(()=>({error:'Unknown'}));
//             alert("Could not add to cart: " + (err.error || resp.statusText));
//             return;
//           }
//           alert("Added to cart!");
//         } catch (err) {
//           console.error(err);
//           alert("Network error");
//         }
//       });
//     });

//   } catch (err) {
//     console.error(err);
//     list.innerHTML = "<p>Error loading products.</p>";
//   }
// }

// // call on page load
// document.addEventListener("DOMContentLoaded", loadProducts);



// // frontend/js/products.js
// const API_URL = "http://localhost:5000/api";

// // Sanitize text to avoid XSS attacks
// function escapeHtml(str = "") {
//   return str.replace(/[&<>"']/g, (m) => ({
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#39;"
//   }[m]));
// }

// // Create product card dynamically
// function createProductCard(p) {
//   const div = document.createElement("div");
//   div.className = "product-card";
//   div.innerHTML = `
//     <img src="${p.image_url || 'https://via.placeholder.com/200'}" alt="${escapeHtml(p.name)}" />
//     <h3>${escapeHtml(p.name)}</h3>
//     <p class="price">$${Number(p.price).toFixed(2)}</p>
//     <p class="desc">${escapeHtml((p.description || '').slice(0, 120))}${(p.description || '').length > 120 ? '...' : ''}</p>
//     <div class="actions">
//       <a class="btn" href="product.html?id=${p.id}">View</a>
//       <button class="btn add-cart" data-id="${p.id}">Add to cart</button>
//     </div>
//   `;
//   return div;
// }

// // Fetch and display products
// async function loadProducts() {
//   const list = document.getElementById("products-list");
//   list.innerHTML = "<p>Loading products...</p>";

//   try {
//     const res = await fetch(`${API_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");

//     const products = await res.json();
//     list.innerHTML = "";

//     if (products.length === 0) {
//       list.innerHTML = "<p>No products available.</p>";
//       return;
//     }

//     products.forEach((p) => {
//       const card = createProductCard(p);
//       list.appendChild(card);
//     });

//     // Add event listeners for "Add to Cart" buttons
//     document.querySelectorAll(".add-cart").forEach((btn) => {
//       btn.addEventListener("click", () => addToCart(btn.dataset.id));
//     });

//   } catch (err) {
//     console.error(err);
//     list.innerHTML = "<p>⚠️ Error loading products.</p>";
//   }
// }

// // Handle Add to Cart
// async function addToCart(productId) {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Please log in to add items to your cart!");
//     window.location.href = "/login.html";
//     return;
//   }

//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ product_id: productId, quantity: 1 }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to add to cart");

//     alert("✅ Product added to cart!");
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// }

// // Run on page load
// document.addEventListener("DOMContentLoaded", loadProducts);

















// frontend/js/products.js
const API_URL = "http://localhost:5000/api";

// Sanitize text to avoid XSS attacks
function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

// Global store for all products so search/filter can work
let allProducts = [];

// Create product card dynamically
function createProductCard(p) {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${p.image_url || 'https://via.placeholder.com/200'}" alt="${escapeHtml(p.name)}" />
    <h3>${escapeHtml(p.name)}</h3>
    <p class="price">$${Number(p.price).toFixed(2)}</p>
    <p class="desc">${escapeHtml((p.description || '').slice(0, 120))}${(p.description || '').length > 120 ? '...' : ''}</p>
    <div class="actions">
      <a class="btn" href="product.html?id=${p.id}">View</a>
      <button class="btn add-cart" data-id="${p.id}">Add to cart</button>
    </div>
  `;
  return div;
}

// Render products to UI
function renderProducts(products) {
  const list = document.getElementById("products-list");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>No matching products found.</p>";
    return;
  }

  products.forEach((p) => list.appendChild(createProductCard(p)));

  // Re-bind Add to Cart events
  document.querySelectorAll(".add-cart").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.id));
  });
}

// Fetch and store all products
async function loadProducts() {
  const list = document.getElementById("products-list");
  list.innerHTML = "<p>Loading products...</p>";

  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");

    allProducts = await res.json();
    renderProducts(allProducts);

  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>⚠️ Error loading products.</p>";
  }
}

// ⭐ APPLY SEARCH + FILTER + SORT
function applyFilters() {
  let filtered = [...allProducts];

  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const price = document.getElementById("priceFilter")?.value || "all";
  const sort = document.getElementById("sortFilter")?.value || "default";

  // 🔍 SEARCH
  filtered = filtered.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
  );

  // 💰 PRICE FILTER
  if (price !== "all") {
    filtered = filtered.filter((p) => {
      const value = parseFloat(p.price);

      if (price === "0-50") return value <= 50;
      if (price === "50-100") return value > 50 && value <= 100;
      if (price === "100-200") return value > 100 && value <= 200;
      if (price === "200+") return value > 200;
    });
  }

  // ↕ SORTING
  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  // Re-render
  renderProducts(filtered);
}

// Handle Add to Cart
async function addToCart(productId) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to add items to your cart!");
    window.location.href = "/login.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add to cart");

    alert("✅ Product added to cart!");
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  // Attach filter listeners only if filters exist in DOM
  const searchBox = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (searchBox) searchBox.addEventListener("input", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
  if (sortFilter) sortFilter.addEventListener("change", applyFilters);
});
