document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('registerCard');
    const form = document.getElementById('registerForm');
    
    // 1. Initial Fade In
    setTimeout(() => {
        card.classList.remove('opacity-0', 'translate-y-5');
        card.classList.add('fade-in');
    }, 100);

    // 2. Ripple Effect Logic
    const buttons = document.querySelectorAll('.ripple-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Create ripple element
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            const rect = this.getBoundingClientRect();
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            // Remove existing ripple
            const ripple = this.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);
        });
    });

    // 3. Form Validation & Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('input').forEach(el => {
            el.classList.remove('border-red-500');
            el.classList.add('border-gray-200');
        });

        // Get values
        const fullName = document.getElementById('full_name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        let isValid = true;

        // Validation Rules
        if (!fullName) {
            showError('full_name', 'Full name is required');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!isValid) return;

        // API Submission
        const btn = form.querySelector('button');
        const originalBtnText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin h-5 w-5 mr-2 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Creating Account...`;

        try {
            const response = await fetch('https://online-store-backend-oxl9.onrender.com/api/auth/register', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: fullName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok || response.status === 201) {
                showToast('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 1500);


                
            } else {
                showToast(data.message || 'Registration failed', 'error');
                resetButton(btn, originalBtnText);
            }
        } catch (error) {
            console.error(error);
            showToast('Network error. Please try again.', 'error');
            resetButton(btn, originalBtnText);
        }
    });

    // Helper: Show Input Error
    function showError(inputId, msg) {
        const input = document.getElementById(inputId);
        const errorText = input.parentNode.querySelector('.error-msg');
        
        input.classList.remove('border-gray-200');
        input.classList.add('border-red-500');
        
        errorText.textContent = msg;
        errorText.classList.remove('hidden');
    }

    // Helper: Reset Button
    function resetButton(btn, html) {
        btn.disabled = false;
        btn.innerHTML = html;
    }

    // Helper: Toast Notification
    function showToast(message, type) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        // Styles
        const baseClasses = "toast-enter pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300";
        const typeClasses = type === 'success' 
            ? "bg-green-50 text-green-700 border-green-200" 
            : "bg-red-50 text-red-700 border-red-200";

        toast.className = `${baseClasses} ${typeClasses}`;
        
        // Icon
        const icon = type === 'success' 
            ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
            : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

        toast.innerHTML = `${icon}<span>${message}</span>`;

        container.appendChild(toast);

        // Remove after delay
        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-exit');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    // Clear validation on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('border-red-500')) {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-200');
                const error = this.parentNode.querySelector('.error-msg');
                if (error) error.classList.add('hidden');
            }
        });
    });
});