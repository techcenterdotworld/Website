// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const menuBtn = document.getElementById('nb-menu-btn');
    const closeBtn = document.getElementById('nb-close-btn');
    const mobileMenu = document.getElementById('nb-mobile-menu');
    const overlay = document.getElementById('nb-overlay');
    const navLinks = document.querySelectorAll('.nb-nav-links a, .nb-mobile-nav a');
    const body = document.body;

    // Open mobile menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('nb-menu-open');
    });

    // Close mobile menu function
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('nb-menu-open');
    }

    // Close button event listener
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });
    
    // Overlay click to close menu
    overlay.addEventListener('click', closeMenu);
    
    // Handle active menu selection
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            closeMenu();
        });
    });
    
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    let slideInterval;
    const autoSlideDelay = 5000; // 5 seconds
    
    // Clear existing dots to prevent duplication
    dotsContainer.innerHTML = '';

    // Ensure dots are dynamically created and no duplicates exist
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Function to change slide
    function goToSlide(index) {
        // Remove active class from current slide and dot
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Update current index
        currentIndex = index;
        
        // Add active class to new slide and dot
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        
        // Reset timer
        resetTimer();
    }
    
    // Next slide function
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        goToSlide(newIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        goToSlide(newIndex);
    }
    
    // Start auto slider
    function startTimer() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Reset timer
    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }
    
    // Arrow navigation event listeners
    arrowLeft.addEventListener('click', prevSlide);
    arrowRight.addEventListener('click', nextSlide);
    
    // Start the slider
    startTimer();
    
    // Pause auto-slider when hovering over slides
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startTimer();
    });
    
});


document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.advantage-item, .stat-item');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation class
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Unobserve after animation is applied
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      // Set initial state and observe each element
      elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
      });
      
      // Animate stats with counting effect
      const statNumbers = document.querySelectorAll('.stat-number');
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const finalValue = element.textContent;
            
            // Only animate if it's a number
            if (finalValue.match(/^\d+[\+]?$/)) {
              // Remove any + symbol for calculation
              const numericValue = parseInt(finalValue.replace('+', ''));
              
              // Animate counting from 0 to final value
              let startValue = 0;
              const duration = 2000; // 2 seconds
              const increment = numericValue / (duration / 50); // Update every 50ms
              
              const counter = setInterval(() => {
                startValue += increment;
                
                if (startValue >= numericValue) {
                  element.textContent = finalValue; // Restore original text with + if present
                  clearInterval(counter);
                } else {
                  element.textContent = Math.floor(startValue) + (finalValue.includes('+') ? '+' : '');
                }
              }, 50);
            }
            
            // Unobserve after animation is applied
            statsObserver.unobserve(element);
          }
        });
      }, { threshold: 0.5 });
      
      // Observe stat numbers
      statNumbers.forEach(stat => {
        statsObserver.observe(stat);
      });
    };
    
    // Initialize the animation
    animateOnScroll();
  });


  // formValidation.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  // Utility: simple email validation regex
  const isValidEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Utility: simple phone validation regex (optional field)
  const isValidPhone = phone => {
    const re = /^\+?[\d\s\-()]{7,20}$/;
    return re.test(phone);
  };

  // Clear all error messages
  function clearErrors() {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(el => el.textContent = '');
  }

  // Show an error message for a specific field
  function showError(fieldId, message) {
    const errorDiv = document.getElementById(fieldId + 'Error');
    if (errorDiv) errorDiv.textContent = message;
  }

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    // Read and trim form values
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const phone   = form.phone.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    let isValid = true;

    // Validate Full Name
    if (!name) {
      showError('name', 'Please enter your full name.');
      isValid = false;
    }

    // Validate Email Address
    if (!email) {
      showError('email', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate Phone Number (optional)
    if (phone && !isValidPhone(phone)) {
      showError('phone', 'Please enter a valid phone number.');
      isValid = false;
    }

    // Validate Subject
    if (!subject) {
      showError('subject', 'Please enter a subject.');
      isValid = false;
    }

    // Validate Message
    if (!message) {
      showError('message', 'Please enter your message.');
      isValid = false;
    }

    // If any validation failed, abort submission
    if (!isValid) return;

    // All checks passed, submit the form to FormSubmit.co
    // This will POST to the action URL defined on the <form>
    form.submit();
  });
});