// frontend/js/product.js
const productId = new URLSearchParams(window.location.search).get("id");
const productContainer = document.getElementById("product-details");

if (!productId) {
  productContainer.innerHTML = "<p>Invalid product.</p>";
} else {
  fetch(`http://localhost:5000/api/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      productContainer.innerHTML = `
        <div class="product-detail-card">
          <img src="${product.image_url}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <h3>$${product.price}</h3>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    })
    .catch(() => {
      productContainer.innerHTML = "<p>Error loading product.</p>";
    });
}

// Reuse token from utils.js
function addToCart(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to add to cart!");
    window.location.href = "/login.html";
    return;
  }

  fetch("http://localhost:5000/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id: id, quantity: 1 }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message || "Added to cart!"))
    .catch(() => alert("Error adding to cart"));
}
