// // frontend/js/product.js
// const productId = new URLSearchParams(window.location.search).get("id");
// const productContainer = document.getElementById("product-details");

// if (!productId) {
//   productContainer.innerHTML = "<p>Invalid product.</p>";
// } else {
//   fetch(`http://localhost:5000/api/products/${productId}`)
//     .then((res) => res.json())
//     .then((product) => {
//       productContainer.innerHTML = `
//         <div class="product-detail-card">
//           <img src="${product.image_url}" alt="${product.name}" />
//           <h2>${product.name}</h2>
//           <p>${product.description}</p>
//           <h3>$${product.price}</h3>
//           <button onclick="addToCart(${product.id})">Add to Cart</button>
//         </div>
//       `;
//     })
//     .catch(() => {
//       productContainer.innerHTML = "<p>Error loading product.</p>";
//     });
// }

// // Reuse token from utils.js
// function addToCart(id) {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     alert("Please log in to add to cart!");
//     window.location.href = "/login.html";
//     return;
//   }

//   fetch("http://localhost:5000/api/cart", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ product_id: id, quantity: 1 }),
//   })
//     .then((res) => res.json())
//     .then((data) => alert(data.message || "Added to cart!"))
//     .catch(() => alert("Error adding to cart"));
// }












// ---------------------- CONFIG -----------------------
const API_BASE_URL = "http://localhost:5000/api";
const productId = new URLSearchParams(window.location.search).get("id");
const token = localStorage.getItem("token");

// Elements
const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
const productContent = document.getElementById("product-content");
const navLinksContainer = document.getElementById("nav-links");

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(t => t.remove()); // Remove old toasts to prevent stacking

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = type === 'success' 
    ? `<i data-lucide="check-circle" class="w-5 h-5"></i> <span>${message}</span>`
    : `<i data-lucide="alert-circle" class="w-5 h-5"></i> <span>${message}</span>`;

  document.body.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ---------------------- NAVBAR LOGIC -----------------
function renderNavbar() {
  if (token) {
    navLinksContainer.innerHTML = `
      <a href="orders.html" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Orders</a>
      <a href="profile.html" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center gap-2">
        <i data-lucide="user" class="w-4 h-4"></i> Profile
      </a>
      <button id="logout-btn" class="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
        <i data-lucide="log-out" class="w-4 h-4"></i> Logout
      </button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  } else {
    navLinksContainer.innerHTML = `
      <a href="login.html" class="text-sm font-medium text-primary hover:text-blue-700 transition-colors">Login</a>
    `;
  }
  lucide.createIcons();
}

// ---------------------- PRODUCT LOGIC ----------------
async function fetchProduct() {
  if (!productId) {
    showError();
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error("Product not found");

    const product = await response.json();
    renderProduct(product);
  } catch (error) {
    console.error(error);
    showError();
  }
}

function renderProduct(product) {
  loadingSpinner.classList.add("hidden");
  productContent.classList.remove("hidden");
  productContent.classList.add("flex");

  // Fix image URL if it's relative
  const imageUrl = product.image_url.startsWith("http") 
    ? product.image_url 
    : `http://localhost:5000${product.image_url}`;

  // Fake original price for visual appeal (20% markup)
  const originalPrice = (Number(product.price) * 1.2).toFixed(2);
  const currentPrice = Number(product.price).toFixed(2);

  productContent.innerHTML = `
    <!-- Left Side: Image -->
    <div class="md:w-1/2 p-2">
        <div class="product-image-container relative h-[400px] md:h-full bg-gray-50 rounded-[1.2rem] group cursor-zoom-in">
            <img 
                src="${imageUrl}" 
                alt="${product.name}" 
                class="w-full h-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    </div>

    <!-- Right Side: Details -->
    <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        
        <div class="mb-3">
            <span class="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                In Stock
            </span>
        </div>

        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
            ${product.name}
        </h1>

        <div class="flex items-baseline gap-4 mb-8">
            <span class="text-3xl font-bold text-success font-display">
                $${currentPrice}
            </span>
            <span class="text-lg text-gray-400 line-through decoration-gray-300">
                $${originalPrice}
            </span>
        </div>

        <div class="prose prose-blue text-gray-600 mb-10 leading-relaxed text-sm md:text-base">
            <p>${product.description}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
                onclick="addToCart(${product.id})"
                id="add-to-cart-btn"
                class="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 group"
            >
                <i data-lucide="shopping-cart" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                <span>Add to Cart</span>
            </button>
        </div>

        <!-- Trust Badges -->
        <div class="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3 text-sm text-gray-500">
                <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-success">
                    <i data-lucide="shield-check" class="w-4 h-4"></i>
                </div>
                <span>Secure Checkout</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-500">
                <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                    <i data-lucide="truck" class="w-4 h-4"></i>
                </div>
                <span>Fast Shipping</span>
            </div>
        </div>
    </div>
  `;

  // Re-initialize icons for dynamic content
  lucide.createIcons();
}

function showError() {
  loadingSpinner.classList.add("hidden");
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("flex");
  lucide.createIcons();
}

// ---------------------- CART LOGIC -------------------
async function addToCart(id) {
  if (!token) {
    showToast("Please log in to add to cart!", "error");
    setTimeout(() => {
        window.location.href = "/login.html";
    }, 1500);
    return;
  }

  const btn = document.getElementById("add-to-cart-btn");
  const originalText = btn.innerHTML;
  
  // Loading state
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span>Adding...</span>`;
  lucide.createIcons();

  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error adding to cart");

    showToast(data.message || "Item added to your cart!");
    
  } catch (err) {
    console.error(err);
    showToast(err.message || "Failed to add to cart", "error");
  } finally {
    // Reset button
    btn.disabled = false;
    btn.innerHTML = originalText;
    lucide.createIcons();
  }
}

// ---------------------- INIT -------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  fetchProduct();
});
