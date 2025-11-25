document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Animate Card Entrance
    const card = document.getElementById('loginCard');
    if (card) {
        // Small delay to ensure smooth loading appearance
        setTimeout(() => {
            card.classList.add('fade-up');
        }, 100);
    }

    // 3. Input Focus Effects (Extra UI polish beyond CSS)
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const wrapper = input.parentElement;
        
        input.addEventListener('focus', () => {
            wrapper.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                wrapper.classList.remove('active');
            }
        });

        // Initialize state on load (if browser auto-fills)
        if (input.value.trim() !== '') {
            wrapper.classList.add('active');
        }
    });

    // 4. Password Visibility Toggle
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toggleIcon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Update Icon
        if (type === 'text') {
            toggleBtn.innerHTML = '<i data-lucide="eye-off"></i>';
        } else {
            toggleBtn.innerHTML = '<i data-lucide="eye"></i>';
        }
        lucide.createIcons();
    });

    // 5. Error Handling & Shake Animation
    // Since we can't modify auth.js, we listen for its triggers.
    // Assuming auth.js uses window.alert or returns false, we can try to intercept.
    
    // Method A: Monkey-patch window.alert to detect "Invalid credentials"
    const originalAlert = window.alert;
    window.alert = function(message) {
        // Call original
        originalAlert(message);
        
        // Check for specific backend error messages
        if (message && (message.includes("Invalid") || message.includes("Error") || message.includes("Failed"))) {
            triggerShake();
        }
    };

    // Method B: Also add a shake utility if the backend script wants to call it directly
    // (You can add `window.triggerShake()` to your auth.js if you want explicit control)
    window.triggerShake = function() {
        if (card) {
            card.classList.remove('shake'); // Reset if already there
            void card.offsetWidth; // Trigger reflow
            card.classList.add('shake');
            
            // Highlight inputs red temporarily
            const wrappers = document.querySelectorAll('.input-wrapper');
            wrappers.forEach(w => w.style.borderColor = '#ef4444');
            setTimeout(() => {
                wrappers.forEach(w => w.style.borderColor = '');
            }, 500);
        }
    };

    // Optional: Demo listener for the submit button to ensure animation works if auth.js fails silently
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        // Note: We do NOT preventDefault here because auth.js handles the submission.
        // We just watch for the UI effect.
        
        // If inputs are invalid HTML5-wise, the browser stops it.
        // If it submits, we assume auth.js takes over.
    });
});