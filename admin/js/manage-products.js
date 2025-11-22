// admin/js/manage-products.js
const API_URL = "http://localhost:5000/api/products";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "admin") {
  alert("Access denied! Please login as admin.");
  window.location.href = "/login.html";
}

// 🧩 Fetch all products
async function loadProducts() {
  const tbody = document.getElementById("product-body");
  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");

    const products = await res.json();
    tbody.innerHTML = "";

    products.forEach((p) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>$${parseFloat(p.price).toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>
          <button class="btn-small btn-edit" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    tbody.innerHTML = "<tr><td colspan='5'>Error loading products.</td></tr>";
  }
}

// 🧩 Add or update product
// document.getElementById("productForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const id = document.getElementById("productId").value;
//   const name = document.getElementById("name").value;
//   const description = document.getElementById("description").value;
//   const price = document.getElementById("price").value;
//   const image_url = document.getElementById("image_url").value;
//   const stock = document.getElementById("stock").value;

//   const payload = { name, description, price, image_url, stock };

//   try {
//     const method = id ? "PUT" : "POST";
//     const url = id ? `${API_URL}/${id}` : API_URL;

//     const res = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Error saving product");

//     alert(data.message || "✅ Saved successfully!");
//     e.target.reset();
//     document.getElementById("form-title").textContent = "Add New Product";
//     loadProducts();
//   } catch (err) {
//     alert("❌ " + err.message);
//   }
// });






document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("productId").value;
  const formData = new FormData();

  formData.append("name", document.getElementById("name").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("stock", document.getElementById("stock").value);

  const imageFile = document.getElementById("image").files[0];
  if (imageFile) formData.append("image", imageFile);

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error);

  alert(data.message);
  e.target.reset();
  loadProducts();
});
















// 🧩 Edit product
async function editProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const p = await res.json();
    document.getElementById("productId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("description").value = p.description;
    document.getElementById("price").value = p.price;
    document.getElementById("image_url").value = p.image_url;
    document.getElementById("stock").value = p.stock;
    document.getElementById("form-title").textContent = "Edit Product";
  } catch (err) {
    alert("❌ Failed to load product");
  }
}

// 🧩 Delete product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete product");
    alert("🗑️ Product deleted!");
    loadProducts();
  } catch (err) {
    alert("❌ " + err.message);
  }
}

// 🧩 Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/login.html";
});

// Load products on page start
document.addEventListener("DOMContentLoaded", loadProducts);
