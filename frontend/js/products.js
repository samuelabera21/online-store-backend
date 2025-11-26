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

// // Global store for all products so search/filter can work
// let allProducts = [];

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

// // Render products to UI
// function renderProducts(products) {
//   const list = document.getElementById("products-list");
//   list.innerHTML = "";

//   if (products.length === 0) {
//     list.innerHTML = "<p>No matching products found.</p>";
//     return;
//   }

//   products.forEach((p) => list.appendChild(createProductCard(p)));

//   // Re-bind Add to Cart events
//   document.querySelectorAll(".add-cart").forEach((btn) => {
//     btn.addEventListener("click", () => addToCart(btn.dataset.id));
//   });
// }

// // Fetch and store all products
// async function loadProducts() {
//   const list = document.getElementById("products-list");
//   list.innerHTML = "<p>Loading products...</p>";

//   try {
//     const res = await fetch(`${API_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");

//     allProducts = await res.json();
//     renderProducts(allProducts);

//   } catch (err) {
//     console.error(err);
//     list.innerHTML = "<p>⚠️ Error loading products.</p>";
//   }
// }

// // ⭐ APPLY SEARCH + FILTER + SORT
// function applyFilters() {
//   let filtered = [...allProducts];

//   const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
//   const price = document.getElementById("priceFilter")?.value || "all";
//   const sort = document.getElementById("sortFilter")?.value || "default";

//   // 🔍 SEARCH
//   filtered = filtered.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search) ||
//       p.description.toLowerCase().includes(search)
//   );

//   // 💰 PRICE FILTER
//   if (price !== "all") {
//     filtered = filtered.filter((p) => {
//       const value = parseFloat(p.price);

//       if (price === "0-50") return value <= 50;
//       if (price === "50-100") return value > 50 && value <= 100;
//       if (price === "100-200") return value > 100 && value <= 200;
//       if (price === "200+") return value > 200;
//     });
//   }

//   // ↕ SORTING
//   if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
//   if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

//   // Re-render
//   renderProducts(filtered);
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
// document.addEventListener("DOMContentLoaded", () => {
//   loadProducts();

//   // Attach filter listeners only if filters exist in DOM
//   const searchBox = document.getElementById("searchInput");
//   const priceFilter = document.getElementById("priceFilter");
//   const sortFilter = document.getElementById("sortFilter");

//   if (searchBox) searchBox.addEventListener("input", applyFilters);
//   if (priceFilter) priceFilter.addEventListener("change", applyFilters);
//   if (sortFilter) sortFilter.addEventListener("change", applyFilters);
// });






















// frontend/js/products.js
const API_URL = "https://online-store-backend-oxl9.onrender.com/api";

// small escape to avoid XSS when inserting server values into innerHTML
function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

// deterministic frontend rating (backend doesn't provide ratings). Keeps UI consistent.
function computeRating(p) {
  // stable rating between 3.5 and ~4.7 based on id
  const id = Number(p.id) || 0;
  const r = 3.5 + (id % 5) * 0.3;
  return Math.round(r * 10) / 10;
}

let allProducts = [];

// Create tailwind-style product card (matches welcome page style)
function createProductCard(p) {
  const rating = computeRating(p);
  // build stars html (full stars only, for simplicity)
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHtml += `<i data-lucide="star" class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"></i>`;
    } else {
      starsHtml += `<i data-lucide="star" class="w-3.5 h-3.5 text-gray-300"></i>`;
    }
  }

  const div = document.createElement("div");
  // Tailwind-like classes used in your theme; keep compatible with your index.css as well
  div.className = "group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 reveal flex flex-col h-full";

  // Use image_url from backend, fallback to placeholder
  const imgSrc = p.image_url ? escapeHtml(p.image_url) : "https://via.placeholder.com/400x500?text=No+Image";

  div.innerHTML = `
    <div class="relative overflow-hidden aspect-[4/5] bg-gray-100">
      <img src="${imgSrc}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="flex gap-3">
          <a href="/product.html?id=${encodeURIComponent(p.id)}" class="bg-white text-gray-900 px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
            <i data-lucide="eye" class="w-4 h-4"></i> View
          </a>
          <button data-id="${encodeURIComponent(p.id)}" class="add-cart-inline bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
            <i data-lucide="shopping-cart" class="w-4 h-4"></i> Add
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <div class="mb-2">
        <h3 class="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">${escapeHtml(p.name)}</h3>
      </div>
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">${escapeHtml((p.description || "").slice(0, 40))}</p>

      <div class="flex items-center gap-1 mb-3">
        ${starsHtml}
        <span class="text-xs text-gray-400 ml-1">(${rating})</span>
      </div>

      <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
        <span class="text-xl font-bold text-gray-900">$${Number(p.price).toFixed(2)}</span>
        <button data-id="${encodeURIComponent(p.id)}" class="add-cart-btn p-2 rounded-full bg-gray-50 text-gray-900 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i>
        </button>
      </div>
    </div>
  `;

  return div;
}

// render
function renderProducts(products) {
  const grid = document.getElementById("products-list");
  if (!grid) return;
  grid.innerHTML = "";

  if (!products || products.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No products found.</p>`;
    return;
  }

  products.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });

  // re-create lucide icons for new nodes
  if (window.lucide?.createIcons) lucide.createIcons();

  // bind add-to-cart buttons (two types in card)
  document.querySelectorAll(".add-cart-btn, .add-cart-inline").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.id;
      // if id was encoded with encodeURIComponent, decode it
      addToCart(decodeURIComponent(id));
    });
  });

  // intersection observer reveal animation
  const newReveals = document.querySelectorAll('.reveal:not(.active)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  newReveals.forEach(el => observer.observe(el));
}

// load products from backend
async function loadProducts() {
  const grid = document.getElementById("products-list");
  if (grid) grid.innerHTML = `<p class="text-center text-gray-500 py-8">Loading products...</p>`;

  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to load products from API");
    allProducts = await res.json();

    // if backend returns an object wrapper, try to use .data
    if (!Array.isArray(allProducts) && allProducts?.data) allProducts = allProducts.data;

    renderProducts(allProducts || []);
  } catch (err) {
    console.error(err);
    if (grid) grid.innerHTML = `<p class="text-center text-red-500 py-8">Error loading products.</p>`;
  }
}

// apply search / filter / sort using the in-memory allProducts
function applyFilters() {
  if (!Array.isArray(allProducts)) return;
  let filtered = [...allProducts];

  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const price = document.getElementById("priceFilter")?.value || "all";
  const sort = document.getElementById("sortFilter")?.value || "default";

  if (search) {
    filtered = filtered.filter(p =>
      (p.name || "").toLowerCase().includes(search) ||
      (p.description || "").toLowerCase().includes(search)
    );
  }

  if (price !== "all") {
    if (price === "200+") {
      filtered = filtered.filter(p => Number(p.price) > 200);
    } else {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter(p => {
        const v = Number(p.price);
        return v >= (min || 0) && v <= (max || Infinity);
      });
    }
  }

  if (sort === "low-high") filtered.sort((a,b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a,b) => b.price - a.price);

  renderProducts(filtered);
}

// add to cart uses backend POST (keeps your server flow)
async function addToCart(productId) {
  const token = localStorage.getItem("token");
  if (!token) {
    // if you prefer local cart for guests, you could implement that here.
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

    // call global badge updater if present
    if (typeof window.updateCartCount === "function") {
      window.updateCartCount();
    }

    // a nicer UI feedback instead of alert could be a toast (index.js provides showToast())
    if (typeof window.showToast === "function") {
      window.showToast("Added to cart");
    } else {
      alert("Product added to cart!");
    }
  } catch (err) {
    console.error(err);
    alert("Error adding to cart: " + err.message);
  }
}

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const searchBox = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (searchBox) searchBox.addEventListener("input", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
  if (sortFilter) sortFilter.addEventListener("change", applyFilters);
});
