// frontend/js/order-confirmation.js

document.addEventListener("DOMContentLoaded", () => {
    const confirmationContainer = document.getElementById("confirmation-container");
    
    // 1. Retrieve Order Data
    // We use a try-catch to safely parse localStorage to avoid JSON errors
    let lastOrder = {};
    try {
        lastOrder = JSON.parse(localStorage.getItem("last_order") || "{}");
    } catch (e) {
        console.error("Error parsing order data", e);
    }

    // 2. Security/Redirection Check
    // If no order ID exists, the user shouldn't be here.
    if (!lastOrder.orderId) {
        showToast("No order found — complete checkout first.", "error");
        setTimeout(() => {
            window.location.href = "/cart.html";
        }, 2000);
        return;
    }

    // 3. Render Order Details
    renderOrderDetails(lastOrder, confirmationContainer);

    // 4. Trigger Success Effects
    triggerConfetti();
    showToast("Order Placed Successfully 🎉", "success");

    // 5. Clean up "Temporary" checkout data
    // We KEEP 'last_order' so if the user refreshes, the receipt is still there.
    // We REMOVE the cart and form drafts so they can start fresh next time.
    localStorage.removeItem("cart");
    localStorage.removeItem("payment_method");
    localStorage.removeItem("shipping");
    localStorage.removeItem("checkout_summary");
    
    // Re-initialize icons for the injected content
    lucide.createIcons();
});

/**
 * Renders the HTML for the receipt
 */
function renderOrderDetails(order, container) {
    const dateStr = new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const totalFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(order.total || 0);

    const shippingInfo = order.shipping || {};

    container.innerHTML = `
        <div class="flex flex-col w-full">
            <!-- Receipt Header -->
            <div class="receipt-header p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <p class="text-sm text-gray-500 font-medium uppercase tracking-wide">Order Number</p>
                    <p class="text-2xl font-bold text-primary font-display">#${order.orderId}</p>
                </div>
                <div class="text-left md:text-right">
                    <p class="text-sm text-gray-500">Date Placed</p>
                    <p class="font-medium text-gray-800">${dateStr}</p>
                </div>
            </div>

            <div class="p-6 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12">
                
                <!-- Left Column: Shipping & Payment -->
                <div class="space-y-6">
                    <div>
                        <h3 class="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                            <i data-lucide="map-pin" class="w-5 h-5 text-primary"></i> Shipping Details
                        </h3>
                        <div class="space-y-3 text-sm text-gray-600 pl-1">
                            <div>
                                <p class="info-label">Name</p>
                                <p class="info-value text-base">${shippingInfo.fullName || 'N/A'}</p>
                            </div>
                            <div>
                                <p class="info-label">Address</p>
                                <p class="info-value">
                                    ${shippingInfo.address || ''}<br>
                                    ${shippingInfo.city || ''}, ${shippingInfo.country || ''} ${shippingInfo.postal || ''}
                                </p>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="info-label">Email</p>
                                    <p class="info-value truncate">${shippingInfo.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <p class="info-label">Phone</p>
                                    <p class="info-value">${shippingInfo.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4 border-b pb-2 pt-2">
                            <i data-lucide="credit-card" class="w-5 h-5 text-primary"></i> Payment Method
                        </h3>
                        <p class="text-gray-700 font-medium pl-1 capitalize">
                            ${(order.payment_method || 'card').replace('_', ' ')}
                        </p>
                    </div>
                </div>

                <!-- Right Column: Summary -->
                <div class="bg-gray-50 rounded-xl p-6 border border-gray-100 h-fit">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                    
                    <!-- We don't have individual items in 'last_order' based on typical checkout flow usually storing total, 
                         but if your backend sends items back, we could map them here. 
                         For now, we show the totals. -->
                    
                    <div class="space-y-3 border-b border-gray-200 pb-4 mb-4">
                        <div class="flex justify-between text-gray-600">
                            <span>price</span>
                            <span>${totalFormatted}</span> <!-- Simplified assuming total is passed -->
                        </div>
                        <div class="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span class="text-green-600 font-medium">Free</span>
                        </div>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-gray-900">Total Paid</span>
                        <span class="text-2xl font-bold text-primary">${totalFormatted}</span>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Decoration -->
            <div class="h-1.5 w-full bg-gradient-to-r from-blue-400 via-primary to-green-400"></div>
        </div>
    `;
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-white border-l-4 border-green-500' : 'bg-white border-l-4 border-red-500';
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    const textClass = type === 'success' ? 'text-green-600' : 'text-red-600';

    toast.className = `toast pointer-events-auto w-auto max-w-sm shadow-xl rounded-lg p-4 flex items-center gap-3 transform transition-all duration-300 ${bgClass}`;
    
    toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-6 h-6 ${textClass} flex-shrink-0"></i>
        <div class="flex-1">
            <h4 class="text-sm font-bold text-gray-800">${type === 'success' ? 'Success' : 'Attention'}</h4>
            <p class="text-sm text-gray-600 mt-0.5">${message}</p>
        </div>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hiding');
        toast.addEventListener('animationend', () => toast.remove());
    }, 4000);
}

/**
 * Confetti Effect using canvas-confetti
 */
function triggerConfetti() {
    // Basic burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007bff', '#10b981', '#fbbf24']
    });

    // Side cannons
    setTimeout(() => {
        var end = Date.now() + 1000;
        var colors = ['#007bff', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, 300);
}