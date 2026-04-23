// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  // Loading Screen
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = '0';
      setTimeout(() => loading.remove(), 500);
    }, 2000);
  }

  // Navbar
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar Background on Scroll - Orange fixed
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(238, 107, 0, 0.98)';
    } else {
      navbar.style.background = 'rgba(238, 107, 0, 0.95)';
    }
  });

  // Scroll Animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Stagger animation for grids
        const children = entry.target.querySelectorAll('.card, .product-card, .contact-item');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll, .card, .product-card, section').forEach(el => {
    observer.observe(el);
  });

  // Product Slider
  class Slider {
    constructor(container, slideClass = '.product-card', dots = true) {
      this.container = document.querySelector(container);
      this.slides = this.container ? this.container.querySelectorAll(slideClass) : [];
      this.current = 0;
      this.slideWidth = this.slides[0] ? this.slides[0].offsetWidth + 20 : 300;
      this.init();
    }

    init() {
      if (!this.slides.length) return;
      
      this.container.style.width = `${this.slideWidth * 3}px`;
      this.updateSlider();
      
      // Auto slide
      setInterval(() => this.next(), 4000);
    }

    updateSlider() {
      if (!this.container) return;
      this.container.style.transform = `translateX(-${this.current * this.slideWidth}px)`;
    }

    next() {
      this.current = (this.current + 1) % this.slides.length;
      this.updateSlider();
    }

    prev() {
      this.current = this.current === 0 ? this.slides.length - 1 : this.current - 1;
      this.updateSlider();
    }
  }

  // Init sliders
  new Slider('#produk-slider .slider-track');
  new Slider('#reviews-slider .slider-track');

  // Review Slider
  let reviewCurrent = 0;
  const reviews = document.querySelectorAll('.review-slide');
  
  function showReview(index) {
    reviews.forEach((review, i) => {
      review.classList.toggle('active', i === index);
    });
  }

  setInterval(() => {
    reviewCurrent = (reviewCurrent + 1) % reviews.length;
    showReview(reviewCurrent);
  }, 5000);

  // Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Terima kasih! Pesan Anda telah dikirim.');
      this.reset();
    });
  }

  // Parallax Effect
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    parallax.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Hover Animations
  document.querySelectorAll('.product-card, .card, .btn').forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    el.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Counter Animation (for stats if added)
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = +counter.textContent;
      const increment = target / 200;
      
      if (count < target) {
        counter.textContent = Math.ceil(count + increment);
        setTimeout(() => animateCounters(), 10);
      } else {
        counter.textContent = target;
      }
    });
  }

  // Typing Effect for Hero
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Initialize typing if hero has it
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => typeWriter(heroTitle, originalText), 500);
  }

  // Particles Background (Hero)
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
      hero.appendChild(particle);
    }
  }
  createParticles();

  // Scroll to Top Button - Orange
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: #ff7300;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(255, 115, 0, 0.4);
  `;
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.transform = 'scale(1)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.transform = 'scale(0)';
    }
  });

  console.log('Harris Elektronik Website loaded with animations!');
});
