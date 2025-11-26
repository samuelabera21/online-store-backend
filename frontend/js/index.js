// // Mock Data (Placeholder until you connect your Node/MySQL backend)
// const products = [
//     { id: 1, name: "Minimalist Leather Watch", price: 129.99, rating: 4.8, category: "Accessories", image: "https://picsum.photos/400/500?random=1" },
//     { id: 2, name: "Noise-Cancelling Headphones", price: 299.00, rating: 5.0, category: "Electronics", image: "https://picsum.photos/400/500?random=2" },
//     { id: 3, name: "Premium Cotton T-Shirt", price: 35.00, rating: 4.5, category: "Apparel", image: "https://picsum.photos/400/500?random=3" },
//     { id: 4, name: "Modern Desk Lamp", price: 89.50, rating: 4.7, category: "Home", image: "https://picsum.photos/400/500?random=4" },
//     { id: 5, name: "Canvas Backpack", price: 65.00, rating: 4.6, category: "Accessories", image: "https://picsum.photos/400/500?random=5" },
//     { id: 6, name: "Wireless Mechanical Keyboard", price: 145.00, rating: 4.9, category: "Electronics", image: "https://picsum.photos/400/500?random=6" },
//     { id: 7, name: "Ceramic Coffee Mug Set", price: 42.00, rating: 4.3, category: "Home", image: "https://picsum.photos/400/500?random=7" },
//     { id: 8, name: "Running Sneakers", price: 110.00, rating: 4.7, category: "Footwear", image: "https://picsum.photos/400/500?random=8" },
//     { id: 9, name: "Sunglasses Aviator", price: 155.00, rating: 4.8, category: "Accessories", image: "https://picsum.photos/400/500?random=9" },
//     { id: 10, name: "Smart Fitness Tracker", price: 79.99, rating: 4.4, category: "Electronics", image: "https://picsum.photos/400/500?random=10" },
//     { id: 11, name: "Leather Wallet", price: 45.00, rating: 4.6, category: "Accessories", image: "https://picsum.photos/400/500?random=11" },
//     { id: 12, name: "Bluetooth Speaker", price: 59.99, rating: 4.5, category: "Electronics", image: "https://picsum.photos/400/500?random=12" },
// ];

// document.addEventListener('DOMContentLoaded', () => {
    
//     // 1. Initialize State
//     initAuthLinks();
//     renderProducts(products);
//     updateCartCount();
//     lucide.createIcons();
//     initAnimations();
//     initNavbarListeners();

//     // 2. Event Listeners for Filters
//     document.getElementById('searchInput').addEventListener('input', handleSearch);
//     document.getElementById('priceFilter').addEventListener('change', handleFilters);
//     document.getElementById('sortFilter').addEventListener('change', handleFilters);
// });

// /* ==========================
//    RENDER LOGIC
// ========================== */
// function renderProducts(items) {
//     const grid = document.getElementById('products-list');
//     grid.innerHTML = '';

//     if (items.length === 0) {
//         grid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">No products found matching your criteria.</p>';
//         return;
//     }

//     items.forEach(product => {
//         // Generate Star Rating HTML
//         let starsHtml = '';
//         for(let i = 0; i < 5; i++) {
//             if(i < Math.floor(product.rating)) {
//                 starsHtml += `<i data-lucide="star" class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"></i>`;
//             } else {
//                 starsHtml += `<i data-lucide="star" class="w-3.5 h-3.5 text-gray-300"></i>`;
//             }
//         }

//         const card = document.createElement('div');
//         card.className = "group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 reveal flex flex-col h-full";
        
//         card.innerHTML = `
//             <div class="relative overflow-hidden aspect-[4/5] bg-gray-100">
//                 <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
                
//                 <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <button class="bg-white text-gray-900 px-6 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
//                         <i data-lucide="eye" class="w-4 h-4"></i> View Product
//                     </button>
//                 </div>
//             </div>

//             <div class="p-4 flex flex-col flex-grow">
//                 <div class="mb-2">
//                     <h3 class="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
//                         ${product.name}
//                     </h3>
//                 </div>
                
//                 <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">${product.category}</p>

//                 <div class="flex items-center gap-1 mb-3">
//                     ${starsHtml}
//                     <span class="text-xs text-gray-400 ml-1">(${product.rating})</span>
//                 </div>

//                 <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
//                     <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
//                     <button onclick="addToCart(${product.id})" class="p-2 rounded-full bg-gray-50 text-gray-900 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm">
//                         <i data-lucide="shopping-cart" class="w-5 h-5"></i>
//                     </button>
//                 </div>
//             </div>
//         `;
//         grid.appendChild(card);
//     });

//     // Re-initialize icons for newly added elements
//     lucide.createIcons();
    
//     // Observe new elements
//     const newReveals = document.querySelectorAll('.reveal:not(.active)');
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('active');
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.1 });
//     newReveals.forEach(el => observer.observe(el));
// }

// /* ==========================
//    CART FUNCTIONALITY
// ========================== */
// function addToCart(id) {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const product = products.find(p => p.id === id);
    
//     // Check if item exists
//     const existingItem = cart.find(item => item.id === id);
//     if(existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
//     showToast();
// }

// function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//     const badge = document.getElementById('cart-badge');
    
//     badge.innerText = count;
//     if (count > 0) {
//         badge.classList.remove('opacity-0');
//     } else {
//         badge.classList.add('opacity-0');
//     }
// }

// function showToast() {
//     const toast = document.getElementById('toast');
//     toast.classList.add('show');
//     setTimeout(() => {
//         toast.classList.remove('show');
//     }, 3000);
// }

// /* ==========================
//    NAVBAR & AUTH
// ========================== */
// function initAuthLinks() {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
    
//     const desktopContainer = document.getElementById('auth-links-desktop');
//     const mobileContainer = document.getElementById('auth-links-mobile');
    
//     let html = '';
    
//     if (token) {
//         html += `<a href="/orders.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Orders</a>`;
//         html += `<a href="/profile.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Profile</a>`;
//         if (role === "admin") {
//             html += `<a href="/admin/dashboard.html" class="text-sm font-medium text-red-600 hover:text-red-700">Admin</a>`;
//         }
//         html += `<a href="#" onclick="logout()" class="text-sm font-medium text-gray-600 hover:text-blue-600">Logout</a>`;
//     } else {
//         html += `<a href="/login.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Login</a>`;
//         html += `<a href="/register.html" class="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Register</a>`;
//     }

//     desktopContainer.innerHTML = html;
    
//     // Mobile HTML (slightly different styling if needed, but reusing for simplicity)
//     const mobileHtml = html.replace(/text-sm/g, 'block text-base text-gray-700 mb-2').replace(/bg-blue-600 px-4 py-2 text-white/g, 'text-blue-600 font-bold');
//     mobileContainer.innerHTML = mobileHtml;
// }

// function logout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     window.location.reload();
// }

// function initNavbarListeners() {
//     const navbar = document.getElementById('navbar');
//     const mobileBtn = document.getElementById('mobile-menu-btn');
//     const mobileMenu = document.getElementById('mobile-menu');

//     // Scroll Effect
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 10) {
//             navbar.classList.add('scrolled');
//         } else {
//             navbar.classList.remove('scrolled');
//         }
//     });

//     // Mobile Toggle
//     mobileBtn.addEventListener('click', () => {
//         mobileMenu.classList.toggle('hidden');
//         mobileMenu.classList.toggle('flex');
//     });
// }

// /* ==========================
//    ANIMATIONS
// ========================== */
// function initAnimations() {
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('active');
//             }
//         });
//     }, { threshold: 0.1 });

//     document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
// }

// /* ==========================
//    SEARCH & FILTER
// ========================== */
// function handleSearch(e) {
//     const term = e.target.value.toLowerCase();
//     const filtered = products.filter(p => p.name.toLowerCase().includes(term));
//     renderProducts(filtered);
// }

// function handleFilters() {
//     const priceVal = document.getElementById('priceFilter').value;
//     const sortVal = document.getElementById('sortFilter').value;
    
//     let filtered = [...products];

//     // Price Filter
//     if(priceVal !== 'all') {
//         const [min, max] = priceVal.replace('+', '').split('-').map(Number);
//         filtered = filtered.filter(p => {
//             if (priceVal === '200+') return p.price >= 200;
//             return p.price >= min && p.price <= max;
//         });
//     }

//     // Sort
//     if(sortVal === 'low-high') {
//         filtered.sort((a,b) => a.price - b.price);
//     } else if(sortVal === 'high-low') {
//         filtered.sort((a,b) => b.price - a.price);
//     }

//     renderProducts(filtered);
// }




























// frontend/js/index.js
// Only handles navbar/auth, animations, toast and cart badge — no product rendering here.

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide?.createIcons) lucide.createIcons();

  initAuthLinks();
  initNavbarListeners();
  initAnimations();
  updateCartCount();
});

/* ------------------------------
   AUTH / NAV LINKS
   ------------------------------ */
function initAuthLinks() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const desktopContainer = document.getElementById('auth-links-desktop');
  const mobileContainer = document.getElementById('auth-links-mobile');

  if (!desktopContainer || !mobileContainer) return;

  let html = '';
  if (token) {
    html += `<a href="/orders.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Orders</a>`;
    html += `<a href="/profile.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Profile</a>`;
    if (role === "admin") {
      html += `<a href="/admin/dashboard.html" class="text-sm font-medium text-red-600 hover:text-red-700">Admin</a>`;
    }
    html += `<a href="#" onclick="logout()" class="text-sm font-medium text-gray-600 hover:text-blue-600">Logout</a>`;
  } else {
    html += `<a href="/login.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Login</a>`;
    html += `<a href="/register.html" class="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Register</a>`;
  }

  desktopContainer.innerHTML = html;

  // mobile: reuse but convert to block style
  const mobileHtml = html
    .replace(/text-sm/g, 'block text-base text-gray-700')
    .replace(/bg-blue-600 px-4 py-2 rounded-lg text-white/g, 'text-blue-600 font-bold');
  mobileContainer.innerHTML = mobileHtml;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  // optionally clear cart or leave it
  // localStorage.removeItem("cart");
  window.location.reload();
}

/* ------------------------------
   NAVBAR, MOBILE MENU, SCROLL
   ------------------------------ */
function initNavbarListeners() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navbar) return;

  // scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // mobile toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });
  }
}

/* ------------------------------
   ANIMATIONS (reveal)
   ------------------------------ */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
      });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ------------------------------
   TOAST & CART BADGE
   ------------------------------ */
window.showToast = function(message = "Done") {
  const toast = document.getElementById('toast');
  if (!toast) {
    alert(message);
    return;
  }
  toast.querySelector('p') && (toast.querySelector('p').textContent = message);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
};

window.updateCartCount = async function() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;

  const token = localStorage.getItem('token');

  // If logged in, try to fetch server cart count
  if (token) {
    try {
      const res = await fetch('http://online-store-backend-oxl9.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // assume server returns an array of cart items
        const count = Array.isArray(data) ? data.reduce((s,i)=>s + (i.quantity||0), 0) : (data.count || 0);
        badge.innerText = count;
        badge.classList.toggle('opacity-0', count === 0);
        return;
      }
    } catch (err) {
      // fallback to localStorage below
      console.warn("Could not fetch server cart:", err);
    }
  }

  // fallback: localStorage cart
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  badge.innerText = count;
  badge.classList.toggle('opacity-0', count === 0);
};
