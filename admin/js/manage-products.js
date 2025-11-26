// admin/js/manage-products.js
// const API_URL = "http://localhost:5000/api/products";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "/login.html";
// }

// // 🧩 Fetch all products
// async function loadProducts() {
//   const tbody = document.getElementById("product-body");
//   tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

//   try {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error("Failed to fetch products");

//     const products = await res.json();
//     tbody.innerHTML = "";

//     products.forEach((p) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${p.id}</td>
//         <td>${p.name}</td>
//         <td>$${parseFloat(p.price).toFixed(2)}</td>
//         <td>${p.stock}</td>
//         <td>
//           <button class="btn-small btn-edit" onclick="editProduct(${p.id})">Edit</button>
//           <button class="btn-small btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });
//   } catch (err) {
//     console.error("Error loading products:", err);
//     tbody.innerHTML = "<tr><td colspan='5'>Error loading products.</td></tr>";
//   }
// }







// document.getElementById("productForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const id = document.getElementById("productId").value;
//   const formData = new FormData();

//   formData.append("name", document.getElementById("name").value);
//   formData.append("description", document.getElementById("description").value);
//   formData.append("price", document.getElementById("price").value);
//   formData.append("stock", document.getElementById("stock").value);

//   const imageFile = document.getElementById("image").files[0];
//   if (imageFile) formData.append("image", imageFile);

//   const method = id ? "PUT" : "POST";
//   const url = id ? `${API_URL}/${id}` : API_URL;

//   const res = await fetch(url, {
//     method,
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData
//   });

//   const data = await res.json();
//   if (!res.ok) return alert(data.error);

//   alert(data.message);
//   e.target.reset();
//   loadProducts();
// });
















// // 🧩 Edit product
// async function editProduct(id) {
//   try {
//     const res = await fetch(`${API_URL}/${id}`);
//     const p = await res.json();
//     document.getElementById("productId").value = p.id;
//     document.getElementById("name").value = p.name;
//     document.getElementById("description").value = p.description;
//     document.getElementById("price").value = p.price;
//     document.getElementById("image_url").value = p.image_url;
//     document.getElementById("stock").value = p.stock;
//     document.getElementById("form-title").textContent = "Edit Product";
//   } catch (err) {
//     alert("❌ Failed to load product");
//   }
// }

// // 🧩 Delete product
// async function deleteProduct(id) {
//   if (!confirm("Are you sure you want to delete this product?")) return;
//   try {
//     const res = await fetch(`${API_URL}/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to delete product");
//     alert("🗑️ Product deleted!");
//     loadProducts();
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// }

// // 🧩 Logout
// document.getElementById("logout-btn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "/login.html";
// });

// // Load products on page start
// document.addEventListener("DOMContentLoaded", loadProducts);





















// // admin/js/manage-products.js
// const API_URL = "http://localhost:5000/api/products";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// // Global state for client-side filtering
// let allProducts = [];

// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "/login.html";
// }

// // ---------------------- TOAST SYSTEM -----------------
// function showToast(message, type = "success") {
//   const toast = document.createElement("div");
//   toast.className = `toast toast-${type}`;
//   let icon = type === 'error' ? 'alert-circle' : 'check-circle';
  
//   toast.innerHTML = `
//     <i data-lucide="${icon}" class="w-5 h-5 ${type === 'error' ? 'text-red-500' : 'text-green-500'}"></i>
//     <span>${message}</span>
//   `;
  
//   document.body.appendChild(toast);
//   lucide.createIcons();

//   requestAnimationFrame(() => {
//     toast.classList.add("show");
//   });

//   setTimeout(() => {
//     toast.classList.remove("show");
//     setTimeout(() => toast.remove(), 500);
//   }, 3000);
// }

// // ---------------------- UI HELPERS -------------------
// let deleteId = null;

// function toggleLoading(isLoading, buttonId = 'save-btn', defaultText = 'Save Product') {
//   const btn = document.getElementById(buttonId);
//   if (isLoading) {
//     btn.disabled = true;
//     btn.innerHTML = `<span class="spinner"></span> Processing...`;
//     btn.classList.add('opacity-75', 'cursor-not-allowed');
//   } else {
//     btn.disabled = false;
//     btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>${defaultText}</span>`;
//     btn.classList.remove('opacity-75', 'cursor-not-allowed');
//     lucide.createIcons();
//   }
// }

// // Image Preview Logic
// const imageInput = document.getElementById('image');
// const imagePreviewContainer = document.getElementById('image-preview-container');
// const imagePreview = document.getElementById('image-preview');
// const fileNameDisplay = document.getElementById('file-name-display');

// imageInput.addEventListener('change', function(e) {
//   const file = e.target.files[0];
//   if (file) {
//     fileNameDisplay.textContent = file.name;
//     const reader = new FileReader();
//     reader.onload = function(e) {
//       imagePreview.src = e.target.result;
//       imagePreviewContainer.classList.remove('hidden');
//     }
//     reader.readAsDataURL(file);
//   } else {
//     fileNameDisplay.textContent = "";
//   }
// });

// // Reset Form UI
// function resetFormState() {
//   document.getElementById("productForm").reset();
//   document.getElementById("productId").value = "";
//   document.getElementById("image_url").value = ""; // Clear hidden input
//   document.getElementById("form-title").innerHTML = `<i data-lucide="package-plus" class="w-5 h-5 text-primary"></i> Add New Product`;
  
//   const saveBtn = document.getElementById("save-btn");
//   saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>Save Product</span>`;
//   saveBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
//   saveBtn.classList.add("bg-primary", "hover:bg-blue-600");
  
//   document.getElementById("cancel-btn").classList.add("hidden");
  
//   imagePreview.src = "";
//   imagePreviewContainer.classList.add("hidden");
//   fileNameDisplay.textContent = "";
//   lucide.createIcons();
// }

// // ---------------------- FILTER & RENDER LOGIC -------------------

// // Listeners for Search & Filter
// document.getElementById('search-input').addEventListener('input', applyFilters);
// document.getElementById('filter-select').addEventListener('change', applyFilters);

// function applyFilters() {
//     const searchTerm = document.getElementById('search-input').value.toLowerCase();
//     const filterValue = document.getElementById('filter-select').value;

//     let filtered = allProducts.filter(p => {
//         // Search logic
//         const matchesSearch = 
//             p.name.toLowerCase().includes(searchTerm) || 
//             p.description?.toLowerCase().includes(searchTerm) || 
//             p.id.toString().includes(searchTerm);
        
//         // Filter logic
//         let matchesFilter = true;
//         if (filterValue === 'low_stock') matchesFilter = p.stock < 10;
//         if (filterValue === 'out_stock') matchesFilter = p.stock == 0;
        
//         return matchesSearch && matchesFilter;
//     });

//     // Sort logic
//     if (filterValue === 'price_asc') {
//         filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//     } else if (filterValue === 'price_desc') {
//         filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//     }

//     renderTable(filtered);
// }

// function renderTable(products) {
//     const tbody = document.getElementById("product-body");
//     tbody.innerHTML = "";

//     if (products.length === 0) {
//       tbody.innerHTML = "<tr><td colspan='5' class='p-8 text-center text-gray-500'>No products found matching your criteria.</td></tr>";
//       return;
//     }

//     products.forEach((p) => {
//       const row = document.createElement("tr");
//       row.className = "hover:bg-gray-50 transition-colors border-b border-gray-100 group";
      
//       const priceFormatted = parseFloat(p.price).toFixed(2);
//       const stockClass = p.stock < 10 ? "text-red-500 font-bold" : "text-gray-700";
      
//       // Determine image source
//       const imgSrc = p.image_url ? `http://localhost:5000${p.image_url}` : null;
//       const imgHtml = imgSrc 
//         ? `<img src="${imgSrc}" class="w-full h-full object-cover" alt="${p.name}">` 
//         : `<div class="w-full h-full flex items-center justify-center text-gray-300"><i data-lucide="image" class="w-5 h-5"></i></div>`;

//       row.innerHTML = `
//         <td class="p-4 font-mono text-xs text-gray-500">#${p.id}</td>
//         <td class="p-4">
//             <div class="flex items-center gap-3">
//                 <div class="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
//                    ${imgHtml}
//                 </div>
//                 <div>
//                     <div class="font-medium text-gray-800">${p.name}</div>
//                     <div class="text-xs text-gray-400 truncate max-w-[150px]">${p.description || ''}</div>
//                 </div>
//             </div>
//         </td>
//         <td class="p-4 font-medium text-gray-700">$${priceFormatted}</td>
//         <td class="p-4 text-center ${stockClass}">${p.stock}</td>
//         <td class="p-4 text-right">
//           <div class="flex justify-end gap-2">
//               <button class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" onclick="editProduct(${p.id})" title="Edit">
//                 <i data-lucide="edit-2" class="w-4 h-4"></i>
//               </button>
//               <button class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" onclick="initDeleteProduct(${p.id})" title="Delete">
//                 <i data-lucide="trash-2" class="w-4 h-4"></i>
//               </button>
//           </div>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });
//     lucide.createIcons();
// }

// // ---------------------- DATA LOADING -------------------

// // 🧩 Fetch all products
// async function loadProducts() {
//   const tbody = document.getElementById("product-body");
  
//   if(tbody.children.length <= 1 && allProducts.length === 0) {
//     tbody.innerHTML = "<tr><td colspan='5' class='p-8 text-center text-gray-400'>Loading...</td></tr>";
//   }

//   try {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error("Failed to fetch products");

//     allProducts = await res.json();
    
//     // Apply whatever current filters are selected
//     applyFilters();

//   } catch (err) {
//     console.error("Error loading products:", err);
//     showToast("Error loading products.", "error");
//     tbody.innerHTML = "<tr><td colspan='5' class='p-4 text-center text-red-500'>Error loading data.</td></tr>";
//   }
// }

// // ---------------------- FORM HANDLING -------------------

// // 🧩 Form Submit
// document.getElementById("productForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const id = document.getElementById("productId").value;
//   const isEdit = !!id;
  
//   toggleLoading(true, 'save-btn', isEdit ? "Update Product" : "Save Product");

//   const formData = new FormData();
//   formData.append("name", document.getElementById("name").value);
//   formData.append("description", document.getElementById("description").value);
//   formData.append("price", document.getElementById("price").value);
//   formData.append("stock", document.getElementById("stock").value);

//   const imageFile = document.getElementById("image").files[0];
  
//   if (imageFile) {
//       // New image selected
//       formData.append("image", imageFile);
//   } else if (isEdit) {
//       // Fix: If no new image, send the existing URL if available to ensure persistence
//       // We read from the hidden input we populated during editProduct
//       const existingUrl = document.getElementById("image_url").value;
//       if (existingUrl) {
//           formData.append("image_url", existingUrl);
//       }
//   }

//   const method = id ? "PUT" : "POST";
//   const url = id ? `${API_URL}/${id}` : API_URL;

//   try {
//     const res = await fetch(url, {
//       method,
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Operation failed");

//     showToast(data.message || (isEdit ? "Product updated successfully!" : "Product created successfully!"));
//     resetFormState();
//     loadProducts();
//   } catch (err) {
//     showToast(err.message, "error");
//   } finally {
//     toggleLoading(false, 'save-btn', "Save Product");
//   }
// });

// // 🧩 Edit product
// async function editProduct(id) {
//   try {
//     showToast("Fetching product details...", "info");
    
//     // Scroll to form
//     document.querySelector('section:last-child').scrollIntoView({ behavior: 'smooth' });

//     // Use cached data if available, otherwise fetch
//     let p = allProducts.find(prod => prod.id === id);
    
//     if (!p) {
//         const res = await fetch(`${API_URL}/${id}`);
//         p = await res.json();
//     }
    
//     document.getElementById("productId").value = p.id;
//     document.getElementById("name").value = p.name;
//     document.getElementById("description").value = p.description;
//     document.getElementById("price").value = p.price;
//     document.getElementById("stock").value = p.stock;
    
//     // Populate hidden input with existing image URL
//     const hiddenUrlInput = document.getElementById("image_url");
//     if(hiddenUrlInput) hiddenUrlInput.value = p.image_url || "";

//     // Show preview of existing image
//     if (p.image_url) {
//         imagePreview.src = `http://localhost:5000${p.image_url}`;
//         imagePreviewContainer.classList.remove('hidden');
//     } else {
//         imagePreviewContainer.classList.add('hidden');
//     }

//     // Update UI for Edit Mode
//     const titleEl = document.getElementById("form-title");
//     titleEl.innerHTML = `<i data-lucide="edit" class="w-5 h-5 text-orange-500"></i> Edit Product #${p.id}`;
    
//     const saveBtn = document.getElementById("save-btn");
//     saveBtn.innerHTML = `<span>Update Product</span>`;
//     saveBtn.classList.remove("bg-primary", "hover:bg-blue-600");
//     saveBtn.classList.add("bg-orange-500", "hover:bg-orange-600");
    
//     document.getElementById("cancel-btn").classList.remove("hidden");
    
//     lucide.createIcons();

//   } catch (err) {
//     console.error(err);
//     showToast("Failed to load product details", "error");
//   }
// }

// // 🧩 Delete Product Logic (Custom Modal)

// // Triggered by the delete button in the table
// function initDeleteProduct(id) {
//     deleteId = id;
//     const modal = document.getElementById('deleteModal');
//     modal.classList.remove('hidden');
// }

// // Triggered by Cancel button in modal
// function closeDeleteModal() {
//     deleteId = null;
//     document.getElementById('deleteModal').classList.add('hidden');
// }

// // Triggered by Delete button in modal
// document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
//     if (!deleteId) return;
    
//     const btn = document.getElementById('confirm-delete-btn');
//     const originalText = btn.innerText;
//     btn.innerText = "Deleting...";
//     btn.disabled = true;

//     try {
//         const res = await fetch(`${API_URL}/${deleteId}`, {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
        
//         if (!res.ok) throw new Error(data.error || "Failed to delete product");
        
//         showToast("Product deleted successfully!");
//         loadProducts();
//     } catch (err) {
//         showToast(err.message, "error");
//     } finally {
//         closeDeleteModal();
//         btn.innerText = originalText;
//         btn.disabled = false;
//     }
// });

// // Original function kept for backward compatibility if needed, but overridden by initDeleteProduct in HTML
// function deleteProduct(id) {
//     initDeleteProduct(id); 
// }

// // 🧩 Logout
// document.getElementById("logout-btn").addEventListener("click", (e) => {
//   e.preventDefault();
//   localStorage.clear();
//   window.location.href = "/login.html";
// });

// // Load products on page start
// document.addEventListener("DOMContentLoaded", () => {
//     loadProducts();
//     lucide.createIcons();
// });






















// // admin/js/manage-products.js
const API_URL = "http://localhost:5000/api/products";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// Global state for client-side filtering
let allProducts = [];

if (!token || role !== "admin") {
  alert("Access denied! Please login as admin.");
  window.location.href = "/login.html";
}

// ---------------------- TOAST SYSTEM -----------------
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let icon = type === 'error' ? 'alert-circle' : 'check-circle';
  
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-5 h-5 ${type === 'error' ? 'text-red-500' : 'text-green-500'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ---------------------- UI HELPERS -------------------
let deleteId = null;

function toggleLoading(isLoading, buttonId = 'save-btn', defaultText = 'Save Product') {
  const btn = document.getElementById(buttonId);
  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Processing...`;
    btn.classList.add('opacity-75', 'cursor-not-allowed');
  } else {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>${defaultText}</span>`;
    btn.classList.remove('opacity-75', 'cursor-not-allowed');
    lucide.createIcons();
  }
}

// Image Preview Logic
const imageInput = document.getElementById('image');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const fileNameDisplay = document.getElementById('file-name-display');

imageInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreviewContainer.classList.remove('hidden');
    }
    reader.readAsDataURL(file);
  } else {
    fileNameDisplay.textContent = "";
  }
});

// Reset Form UI
function resetFormState() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("image_url").value = ""; // Clear hidden input
  document.getElementById("form-title").innerHTML = `<i data-lucide="package-plus" class="w-5 h-5 text-primary"></i> Add New Product`;
  
  const saveBtn = document.getElementById("save-btn");
  saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>Save Product</span>`;
  saveBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
  saveBtn.classList.add("bg-primary", "hover:bg-blue-600");
  
  document.getElementById("cancel-btn").classList.add("hidden");
  
  imagePreview.src = "";
  imagePreviewContainer.classList.add("hidden");
  fileNameDisplay.textContent = "";
  lucide.createIcons();
}

// ---------------------- FILTER & RENDER LOGIC -------------------

// Listeners for Search & Filter
document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('filter-select').addEventListener('change', applyFilters);

function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filterValue = document.getElementById('filter-select').value;

    let filtered = allProducts.filter(p => {
        // Search logic
        const matchesSearch = 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description?.toLowerCase().includes(searchTerm) || 
            p.id.toString().includes(searchTerm);
        
        // Filter logic
        let matchesFilter = true;
        if (filterValue === 'low_stock') matchesFilter = p.stock < 10;
        if (filterValue === 'out_stock') matchesFilter = p.stock == 0;
        
        return matchesSearch && matchesFilter;
    });

    // Sort logic
    if (filterValue === 'price_asc') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filterValue === 'price_desc') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    renderTable(filtered);
}

function renderTable(products) {
    const tbody = document.getElementById("product-body");
    tbody.innerHTML = "";

    if (products.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5' class='p-8 text-center text-gray-500'>No products found matching your criteria.</td></tr>";
      return;
    }

    products.forEach((p) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50 transition-colors border-b border-gray-100 group";
      
      const priceFormatted = parseFloat(p.price).toFixed(2);
      const stockClass = p.stock < 10 ? "text-red-500 font-bold" : "text-gray-700";
      
      // Determine image source with cache busting timestamp
      // using p._ts added during fetch to prevent flickering on filter, but ensuring fresh load
      const timestamp = p._ts || new Date().getTime();
      const imgSrc = p.image_url ? `http://localhost:5000${p.image_url}?t=${timestamp}` : null;
      
      const imgHtml = imgSrc 
        ? `<img src="${imgSrc}" class="w-full h-full object-cover" alt="${p.name}">` 
        : `<div class="w-full h-full flex items-center justify-center text-gray-300"><i data-lucide="image" class="w-5 h-5"></i></div>`;

      row.innerHTML = `
        <td class="p-4 font-mono text-xs text-gray-500">#${p.id}</td>
        <td class="p-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                   ${imgHtml}
                </div>
                <div>
                    <div class="font-medium text-gray-800">${p.name}</div>
                    <div class="text-xs text-gray-400 truncate max-w-[150px]">${p.description || ''}</div>
                </div>
            </div>
        </td>
        <td class="p-4 font-medium text-gray-700">$${priceFormatted}</td>
        <td class="p-4 text-center ${stockClass}">${p.stock}</td>
        <td class="p-4 text-right">
          <div class="flex justify-end gap-2">
              <button class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" onclick="editProduct(${p.id})" title="Edit">
                <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <button class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" onclick="initDeleteProduct(${p.id})" title="Delete">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
    lucide.createIcons();
}

// ---------------------- DATA LOADING -------------------

// 🧩 Fetch all products
async function loadProducts() {
  const tbody = document.getElementById("product-body");
  
  if(tbody.children.length <= 1 && allProducts.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5' class='p-8 text-center text-gray-400'>Loading...</td></tr>";
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");

    allProducts = await res.json();
    
    // Add timestamp for cache busting images, ensuring they refresh on new fetch
    const ts = new Date().getTime();
    allProducts = allProducts.map(p => ({...p, _ts: ts}));
    
    // Apply whatever current filters are selected
    applyFilters();

  } catch (err) {
    console.error("Error loading products:", err);
    showToast("Error loading products.", "error");
    tbody.innerHTML = "<tr><td colspan='5' class='p-4 text-center text-red-500'>Error loading data.</td></tr>";
  }
}

// ---------------------- FORM HANDLING -------------------

// 🧩 Form Submit
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const isEdit = !!id;
  
  toggleLoading(true, 'save-btn', isEdit ? "Update Product" : "Save Product");

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("stock", document.getElementById("stock").value);

  const imageFile = document.getElementById("image").files[0];
  
  if (imageFile) {
      // New image selected - backend should prioritize this file
      formData.append("image", imageFile);
  } else if (isEdit) {
      // If no new image is selected during edit, send existing URL.
      // The backend should use this to persist the old image.
      const existingUrl = document.getElementById("image_url").value;
      if (existingUrl) {
          formData.append("image_url", existingUrl);
      }
  }

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Operation failed");

    showToast(data.message || (isEdit ? "Product updated successfully!" : "Product created successfully!"));
    resetFormState();
    loadProducts(); // This will refresh timestamps and images
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    toggleLoading(false, 'save-btn', "Save Product");
  }
});

// 🧩 Edit product
async function editProduct(id) {
  try {
    showToast("Fetching product details...", "info");
    
    // Scroll to form
    document.querySelector('section:last-child').scrollIntoView({ behavior: 'smooth' });

    // Use cached data if available, otherwise fetch
    let p = allProducts.find(prod => prod.id === id);
    
    if (!p) {
        const res = await fetch(`${API_URL}/${id}`);
        p = await res.json();
    }
    
    // --- KEY FIX: Clear file input to prevent stale file upload ---
    document.getElementById("image").value = "";
    document.getElementById("file-name-display").textContent = "";
    // -------------------------------------------------------------

    document.getElementById("productId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("description").value = p.description;
    document.getElementById("price").value = p.price;
    document.getElementById("stock").value = p.stock;
    
    // Populate hidden input with existing image URL
    const hiddenUrlInput = document.getElementById("image_url");
    if(hiddenUrlInput) hiddenUrlInput.value = p.image_url || "";

    // Show preview of existing image
    if (p.image_url) {
        // Force fresh load with new timestamp for preview
        imagePreview.src = `http://localhost:5000${p.image_url}?t=${new Date().getTime()}`;
        imagePreviewContainer.classList.remove('hidden');
    } else {
        imagePreviewContainer.classList.add('hidden');
    }

    // Update UI for Edit Mode
    const titleEl = document.getElementById("form-title");
    titleEl.innerHTML = `<i data-lucide="edit" class="w-5 h-5 text-orange-500"></i> Edit Product #${p.id}`;
    
    const saveBtn = document.getElementById("save-btn");
    saveBtn.innerHTML = `<span>Update Product</span>`;
    saveBtn.classList.remove("bg-primary", "hover:bg-blue-600");
    saveBtn.classList.add("bg-orange-500", "hover:bg-orange-600");
    
    document.getElementById("cancel-btn").classList.remove("hidden");
    
    lucide.createIcons();

  } catch (err) {
    console.error(err);
    showToast("Failed to load product details", "error");
  }
}

// 🧩 Delete Product Logic (Custom Modal)

// Triggered by the delete button in the table
function initDeleteProduct(id) {
    deleteId = id;
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
}

// Triggered by Cancel button in modal
function closeDeleteModal() {
    deleteId = null;
    document.getElementById('deleteModal').classList.add('hidden');
}

// Triggered by Delete button in modal
document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
    if (!deleteId) return;
    
    const btn = document.getElementById('confirm-delete-btn');
    const originalText = btn.innerText;
    btn.innerText = "Deleting...";
    btn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/${deleteId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to delete product");
        
        showToast("Product deleted successfully!");
        loadProducts();
    } catch (err) {
        showToast(err.message, "error");
    } finally {
        closeDeleteModal();
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

// Original function kept for backward compatibility if needed, but overridden by initDeleteProduct in HTML
function deleteProduct(id) {
    initDeleteProduct(id); 
}

// 🧩 Logout
document.getElementById("logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "/login.html";
});

// Load products on page start
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    lucide.createIcons();
});






// // admin/js/manage-products.js
// const API_URL = "http://localhost:5000/api/products";
// const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

// // Global state for client-side filtering
// let allProducts = [];

// if (!token || role !== "admin") {
//   alert("Access denied! Please login as admin.");
//   window.location.href = "/login.html";
// }

// // ---------------------- TOAST SYSTEM -----------------
// function showToast(message, type = "success") {
//   const toast = document.createElement("div");
//   toast.className = `toast toast-${type}`;
//   let icon = type === "error" ? "alert-circle" : "check-circle";

//   toast.innerHTML = `
//     <i data-lucide="${icon}" class="w-5 h-5 ${type === "error" ? "text-red-500" : "text-green-500"}"></i>
//     <span>${message}</span>
//   `;

//   document.body.appendChild(toast);
//   lucide.createIcons();

//   // animate in
//   requestAnimationFrame(() => {
//     toast.classList.add("show");
//   });

//   setTimeout(() => {
//     toast.classList.remove("show");
//     setTimeout(() => toast.remove(), 500);
//   }, 3200);
// }

// // ---------------------- UI HELPERS -------------------
// let deleteId = null;

// function toggleLoading(isLoading, buttonId = "save-btn", defaultText = "Save Product") {
//   const btn = document.getElementById(buttonId);
//   if (!btn) return;
//   if (isLoading) {
//     btn.disabled = true;
//     btn.innerHTML = `<span class="spinner"></span> Processing...`;
//     btn.classList.add("opacity-75", "cursor-not-allowed");
//   } else {
//     btn.disabled = false;
//     btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>${defaultText}</span>`;
//     btn.classList.remove("opacity-75", "cursor-not-allowed");
//     lucide.createIcons();
//   }
// }

// // ---------------------- IMAGE PREVIEW -------------------
// const imageInput = document.getElementById("image");
// const imagePreviewContainer = document.getElementById("image-preview-container");
// const imagePreview = document.getElementById("image-preview");
// const fileNameDisplay = document.getElementById("file-name-display");

// // Defensive guards if elements missing
// if (imageInput) {
//   imageInput.addEventListener("change", function (e) {
//     const file = e.target.files[0];
//     if (file) {
//       fileNameDisplay.textContent = file.name;
//       const reader = new FileReader();
//       reader.onload = function (ev) {
//         imagePreview.src = ev.target.result;
//         imagePreviewContainer.classList.remove("hidden");
//       };
//       reader.readAsDataURL(file);
//     } else {
//       fileNameDisplay.textContent = "";
//     }
//   });
// }

// // Reset Form UI
// function resetFormState() {
//   const form = document.getElementById("productForm");
//   if (form) form.reset();

//   document.getElementById("productId").value = "";
//   const hiddenUrl = document.getElementById("image_url");
//   if (hiddenUrl) hiddenUrl.value = "";

//   const titleEl = document.getElementById("form-title");
//   if (titleEl)
//     titleEl.innerHTML = `<i data-lucide="package-plus" class="w-5 h-5 text-primary"></i> Add New Product`;

//   const saveBtn = document.getElementById("save-btn");
//   if (saveBtn) {
//     saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>Save Product</span>`;
//     saveBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
//     saveBtn.classList.add("bg-primary", "hover:bg-blue-600");
//   }

//   const cancelBtn = document.getElementById("cancel-btn");
//   if (cancelBtn) cancelBtn.classList.add("hidden");

//   if (imagePreview) imagePreview.src = "";
//   if (imagePreviewContainer) imagePreviewContainer.classList.add("hidden");
//   if (fileNameDisplay) fileNameDisplay.textContent = "";

//   // Clear file input value to avoid stale File objects in some browsers
//   if (imageInput) imageInput.value = "";

//   lucide.createIcons();
// }

// // ---------------------- FILTER & RENDER LOGIC -------------------

// // Listeners for Search & Filter (defensive)
// const searchEl = document.getElementById("search-input");
// const filterEl = document.getElementById("filter-select");
// if (searchEl) searchEl.addEventListener("input", applyFilters);
// if (filterEl) filterEl.addEventListener("change", applyFilters);

// function applyFilters() {
//   const searchTerm = (document.getElementById("search-input")?.value || "").toLowerCase();
//   const filterValue = document.getElementById("filter-select")?.value || "all";

//   let filtered = allProducts.filter((p) => {
//     const matchesSearch =
//       p.name.toLowerCase().includes(searchTerm) ||
//       (p.description || "").toLowerCase().includes(searchTerm) ||
//       p.id.toString().includes(searchTerm);

//     let matchesFilter = true;
//     if (filterValue === "low_stock") matchesFilter = p.stock < 10;
//     if (filterValue === "out_stock") matchesFilter = p.stock == 0;

//     return matchesSearch && matchesFilter;
//   });

//   // Sort logic
//   if (filterValue === "price_asc") {
//     filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//   } else if (filterValue === "price_desc") {
//     filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//   }

//   renderTable(filtered);
// }

// function renderTable(products) {
//   const tbody = document.getElementById("product-body");
//   if (!tbody) return;

//   tbody.innerHTML = "";

//   if (!products || products.length === 0) {
//     tbody.innerHTML =
//       "<tr><td colspan='5' class='p-8 text-center text-gray-500'>No products found matching your criteria.</td></tr>";
//     return;
//   }

//   products.forEach((p) => {
//     const row = document.createElement("tr");
//     row.className = "hover:bg-gray-50 transition-colors border-b border-gray-100 group";

//     const priceFormatted = parseFloat(p.price).toFixed(2);
//     const stockClass = p.stock < 10 ? "text-red-500 font-bold" : "text-gray-700";

//     // Determine image source with cache busting timestamp
//     const timestamp = p._ts || new Date().getTime();
//     const imgSrc = p.image_url ? `http://localhost:5000${p.image_url}?t=${timestamp}` : null;

//     const imgHtml = imgSrc
//       ? `<img src="${imgSrc}" class="w-full h-full object-cover" alt="${escapeHtml(p.name)}">`
//       : `<div class="w-full h-full flex items-center justify-center text-gray-300"><i data-lucide="image" class="w-5 h-5"></i></div>`;

//     row.innerHTML = `
//       <td class="p-4 font-mono text-xs text-gray-500">#${p.id}</td>
//       <td class="p-4">
//           <div class="flex items-center gap-3">
//               <div class="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
//                  ${imgHtml}
//               </div>
//               <div>
//                   <div class="font-medium text-gray-800">${escapeHtml(p.name)}</div>
//                   <div class="text-xs text-gray-400 truncate max-w-[150px]">${escapeHtml(p.description || "")}</div>
//               </div>
//           </div>
//       </td>
//       <td class="p-4 font-medium text-gray-700">$${priceFormatted}</td>
//       <td class="p-4 text-center ${stockClass}">${p.stock}</td>
//       <td class="p-4 text-right">
//         <div class="flex justify-end gap-2">
//             <button class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" onclick="editProduct(${p.id})" title="Edit">
//               <i data-lucide="edit-2" class="w-4 h-4"></i>
//             </button>
//             <button class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" onclick="initDeleteProduct(${p.id})" title="Delete">
//               <i data-lucide="trash-2" class="w-4 h-4"></i>
//             </button>
//         </div>
//       </td>
//     `;
//     tbody.appendChild(row);
//   });

//   lucide.createIcons();
// }

// // ---------------------- DATA LOADING -------------------

// // 🧩 Fetch all products
// async function loadProducts() {
//   const tbody = document.getElementById("product-body");

//   if (tbody && tbody.children.length <= 1 && allProducts.length === 0) {
//     tbody.innerHTML = "<tr><td colspan='5' class='p-8 text-center text-gray-400'>Loading...</td></tr>";
//   }

//   try {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error("Failed to fetch products");

//     allProducts = await res.json();

//     // Add timestamp for cache busting images
//     const ts = new Date().getTime();
//     allProducts = allProducts.map((p) => ({ ...p, _ts: ts }));

//     // Apply current filters
//     applyFilters();
//   } catch (err) {
//     console.error("Error loading products:", err);
//     showToast("Error loading products.", "error");
//     if (tbody) tbody.innerHTML = "<tr><td colspan='5' class='p-4 text-center text-red-500'>Error loading data.</td></tr>";
//   }
// }

// // ---------------------- FORM HANDLING -------------------

// // 🧩 Form Submit
// document.getElementById("productForm")?.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const id = document.getElementById("productId").value;
//   const isEdit = !!id;

//   toggleLoading(true, "save-btn", isEdit ? "Update Product" : "Save Product");

//   const formData = new FormData();
//   formData.append("name", document.getElementById("name").value);
//   formData.append("description", document.getElementById("description").value);
//   formData.append("price", document.getElementById("price").value);
//   formData.append("stock", document.getElementById("stock").value);

//   const imageFile = document.getElementById("image").files[0];

//   if (imageFile) {
//     // New image selected - backend should prioritize this file
//     formData.append("image", imageFile);
//   } else if (isEdit) {
//     // If no new image is selected during edit, send existing URL so backend can keep it
//     const existingUrl = document.getElementById("image_url")?.value;
//     if (existingUrl) {
//       formData.append("image_url", existingUrl);
//     }
//   }

//   const method = id ? "PUT" : "POST";
//   const url = id ? `${API_URL}/${id}` : API_URL;

//   try {
//     const res = await fetch(url, {
//       method,
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Operation failed");

//     showToast(data.message || (isEdit ? "Product updated successfully!" : "Product created successfully!"));
//     resetFormState();
//     await loadProducts(); // refresh data
//   } catch (err) {
//     showToast(err.message || "Operation failed", "error");
//   } finally {
//     toggleLoading(false, "save-btn", "Save Product");
//   }
// });

// // ---------------------- EDIT PRODUCT -------------------

// // Helper: simple HTML escape for safety when injecting text
// function escapeHtml(str = "") {
//   return String(str)
//     .replace(/&/g, "&amp;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#39;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;");
// }

// async function editProduct(id) {
//   try {
//     showToast("Fetching product details...", "info");

//     // Scroll to form
//     document.querySelector("section:last-child")?.scrollIntoView({ behavior: "smooth" });

//     // Use cached data if available, otherwise fetch
//     let p = allProducts.find((prod) => prod.id === id);

//     if (!p) {
//       const res = await fetch(`${API_URL}/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch product");
//       p = await res.json();
//     }

//     // --- KEY FIX: Clear file input to prevent stale file upload ---
//     if (imageInput) imageInput.value = "";
//     if (fileNameDisplay) fileNameDisplay.textContent = "";
//     // -------------------------------------------------------------

//     document.getElementById("productId").value = p.id || "";
//     document.getElementById("name").value = p.name || "";
//     document.getElementById("description").value = p.description || "";
//     document.getElementById("price").value = p.price || "";
//     document.getElementById("stock").value = p.stock || "";

//     // Populate hidden input with existing image URL
//     const hiddenUrlInput = document.getElementById("image_url");
//     if (hiddenUrlInput) hiddenUrlInput.value = p.image_url || "";

//     // Show preview of existing image
//     if (p.image_url) {
//       imagePreview.src = `http://localhost:5000${p.image_url}?t=${new Date().getTime()}`;
//       imagePreviewContainer.classList.remove("hidden");
//     } else {
//       imagePreviewContainer.classList.add("hidden");
//     }

//     // Update UI for Edit Mode
//     const titleEl = document.getElementById("form-title");
//     if (titleEl) titleEl.innerHTML = `<i data-lucide="edit" class="w-5 h-5 text-orange-500"></i> Edit Product #${p.id}`;

//     const saveBtn = document.getElementById("save-btn");
//     if (saveBtn) {
//       saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> <span>Update Product</span>`;
//       saveBtn.classList.remove("bg-primary", "hover:bg-blue-600");
//       saveBtn.classList.add("bg-orange-500", "hover:bg-orange-600");
//     }

//     document.getElementById("cancel-btn")?.classList.remove("hidden");

//     lucide.createIcons();
//   } catch (err) {
//     console.error(err);
//     showToast("Failed to load product details", "error");
//   }
// }

// // ---------------------- DELETE PRODUCT LOGIC -------------------

// // Triggered by the delete button in the table
// function initDeleteProduct(id) {
//   deleteId = id;
//   const modal = document.getElementById("deleteModal");
//   modal?.classList.remove("hidden");
// }

// // Triggered by Cancel button in modal
// function closeDeleteModal() {
//   deleteId = null;
//   document.getElementById("deleteModal")?.classList.add("hidden");
// }

// // Triggered by Delete button in modal
// document.getElementById("confirm-delete-btn")?.addEventListener("click", async () => {
//   if (!deleteId) return;

//   const btn = document.getElementById("confirm-delete-btn");
//   const originalText = btn.innerText;
//   btn.innerText = "Deleting...";
//   btn.disabled = true;

//   try {
//     const res = await fetch(`${API_URL}/${deleteId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();

//     if (!res.ok) throw new Error(data.error || "Failed to delete product");

//     showToast("Product deleted successfully!");
//     await loadProducts();
//   } catch (err) {
//     showToast(err.message || "Delete failed", "error");
//   } finally {
//     closeDeleteModal();
//     btn.innerText = originalText;
//     btn.disabled = false;
//   }
// });

// // Backwards-compatible delete function
// function deleteProduct(id) {
//   initDeleteProduct(id);
// }

// // ---------------------- LOGOUT -------------------
// document.getElementById("logout-btn")?.addEventListener("click", (e) => {
//   e.preventDefault();
//   localStorage.clear();
//   window.location.href = "/login.html";
// });

// // ---------------------- INIT -------------------
// document.addEventListener("DOMContentLoaded", () => {
//   loadProducts();
//   lucide.createIcons();
// });
