// Cookie Functions
function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  document.getElementById("cookieBanner").style.display = "none";
}

function declineCookies() {
  localStorage.setItem("cookiesAccepted", "false");
  document.getElementById("cookieBanner").style.display = "none";
}

// Initialize on load
window.addEventListener("load", () => {
  const banner = document.getElementById("cookieBanner");
  const toggle = document.getElementById("toggleInfo");
  const details = document.getElementById("cookieDetails");

  if (banner && !localStorage.getItem("cookiesAccepted")) {
    banner.style.display = "block";
  }

  // Toggle cookie info
  if (toggle) {
    let expanded = false;
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      expanded = !expanded;
      details.classList.toggle("hidden");
      toggle.textContent = expanded ? "Minder info" : "Meer info";
    });
  }

  // Initialize reviews if on homepage
  initReviews();
  
  // Initialize scroll animations
  initScrollAnimations();

  // Initialize mobile menu
  initMobileMenu();
});

// Reviews Slider
let currentReviewIndex = 0;
let reviewInterval;

function initReviews() {
  const dots = document.querySelectorAll('.dot');
  if (dots.length === 0) return;
  
  // Start auto-rotation
  reviewInterval = setInterval(() => {
    nextReview();
  }, 5000);
}

function currentReview(index) {
  showReview(index);
  // Reset timer on manual navigation
  clearInterval(reviewInterval);
  reviewInterval = setInterval(() => {
    nextReview();
  }, 5000);
}

function nextReview() {
  const cards = document.querySelectorAll('.review-card');
  currentReviewIndex = (currentReviewIndex + 1) % cards.length;
  showReview(currentReviewIndex);
}

function showReview(index) {
  const cards = document.querySelectorAll('.review-card');
  const dots = document.querySelectorAll('.dot');
  
  cards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === index) {
      card.classList.add('active');
    }
  });
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
  
  currentReviewIndex = index;
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in class to elements
  document.querySelectorAll('.section h2, .column, .stat-item, .pricing-box').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  // Sluit menu bij klik op een link
  mobileMenu.querySelectorAll('.mobile-menu-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Sluit menu bij Escape toets
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {

    const href = this.getAttribute("href");

    if (href === "#") return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });
});