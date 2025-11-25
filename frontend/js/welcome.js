// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // --- 1. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('nav-scrolled');
      navbar.classList.remove('py-6');
    } else {
      navbar.classList.remove('nav-scrolled');
      navbar.classList.add('py-6');
    }
  });

  // --- 2. Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = menuBtn.querySelector('i'); // Placeholder if using i tags, but we used SVG directly

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      // Reset icon to Menu (handled by swapping innerHTML or classes in a real implementation, 
      // but here simply toggling the visibility is enough)
    } else {
      mobileMenu.classList.add('open');
    }
  });

  // --- 3. Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger when 15% visible
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 4. Product Carousel Auto-Slide ---
  const carousel = document.getElementById('product-carousel');
  let scrollAmount = 0;
  const cardWidth = 300; // Approx width of card + gap
  const scrollDelay = 3000;

  function autoScroll() {
    if (!carousel) return;
    
    // Check if we've reached the end
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
      scrollAmount = 0;
    } else {
      carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }

  let slideInterval = setInterval(autoScroll, scrollDelay);

  // Pause on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => slideInterval = setInterval(autoScroll, scrollDelay));
  }

  // --- 5. Login/State Toggle (Simulation) ---
  const loginBtn = document.getElementById('login-btn');
  const userActions = document.getElementById('user-actions');
  const guestActions = document.getElementById('guest-actions');
  
  // Simple toggle function for demo purposes
  if(loginBtn) {
    loginBtn.addEventListener('click', () => {
      // Logic to switch view would go here. 
      // For this static page, we simply link to the main app or show a modal.
      console.log("Navigate to Login");
    });
  }

  // --- 6. Newsletter Validation ---
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const msgContainer = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        msgContainer.textContent = "Thanks for subscribing!";
        msgContainer.className = "text-green-400 mt-2 text-sm font-medium";
        emailInput.value = "";
        
        // Clear message after 3 seconds
        setTimeout(() => {
          msgContainer.textContent = "";
        }, 3000);
      } else {
        msgContainer.textContent = "Please enter a valid email address.";
        msgContainer.className = "text-red-400 mt-2 text-sm font-medium";
      }
    });
  }
});
