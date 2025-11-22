const API_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

async function loadCheckout() {
  const container = document.getElementById("checkout-items");

  try {
    const res = await fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const items = await res.json();
    if (!res.ok) throw new Error("Failed loading cart");

    container.innerHTML = "";
    let subtotal = 0;

    items.forEach(item => {
      subtotal += item.price * item.quantity;

      container.innerHTML += `
        <div class="checkout-item">
          <p><strong>${item.name}</strong> (x${item.quantity})</p>
          <p>$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `;
    });

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    const shipping = 10;
    document.getElementById("shipping").textContent = shipping;
    document.getElementById("total").textContent = (subtotal + shipping).toFixed(2);

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading checkout.</p>";
  }
}

document.getElementById("proceed-shipping").addEventListener("click", () => {
  window.location.href = "shipping.html";
});

document.addEventListener("DOMContentLoaded", loadCheckout);
