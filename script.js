<<<<<<< HEAD
// Enhanced Script - Advanced Animations, Parallax, Navbar Scroll, Particles Ready
document.addEventListener('DOMContentLoaded', function() {
  // Loading animation enhanced
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 2000);
  
  // Language & Theme from localStorage
  const currentLang = localStorage.getItem('lang') || 'id';
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.lang = currentLang;
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
  }
  updateContent(currentLang);
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Theme Toggle enhanced
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? languages.en.toggleLight : languages.en.toggleDark;
  });
  
  // Lang Toggle
  const langToggle = document.querySelector('.lang-toggle');
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'id' ? 'en' : 'id';
    updateContent(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    langToggle.textContent = languages[newLang].toggleLang;
  });
  
  // Mobile Menu enhanced
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
  
  // Advanced Scroll Animations - Staggered
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150); // Stagger effect
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in, .service-card, .product-card, .shopping-card').forEach(el => {
    observer.observe(el);
  });
  
  // Hero Parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax');
    const speed = scrolled * -0.5;
    if (parallax) {
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
  
  // Brands Carousel - Smooth infinite
  const carousels = document.querySelectorAll('.brands-carousel');
  carousels.forEach(carousel => {
    let scrollPos = 0;
    setInterval(() => {
      scrollPos += 2;
      carousel.scrollLeft = scrollPos;
      if (scrollPos >= carousel.scrollWidth) {
        scrollPos = 0;
      }
    }, 50);
  });
  
  // WA Float tooltip
  const waFloat = document.querySelector('.whatsapp-float');
  waFloat.addEventListener('mouseenter', () => {
    waFloat.querySelector('span').style.opacity = '1';
  });
  waFloat.addEventListener('mouseleave', () => {
    waFloat.querySelector('span').style.opacity = '0';
  });
  
  // Mouse trail cursor effect (light particles)
  let mouseParticles = [];
  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--accent-orange), var(--accent-green));
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        animation: particleFloat 1.5s ease-out forwards;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  });
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      to {
        transform: translateY(-60px) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Counter animations (for stats if added)
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const increment = target / 100;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 20);
    });
  }
  
  // Hamburger animation
  const hamburgerSpans = document.querySelectorAll('.hamburger span');
  document.querySelector('.hamburger').addEventListener('click', () => {
    hamburgerSpans.forEach((span, index) => {
      setTimeout(() => {
        span.style.transform = hamburger.classList.contains('active') ? 
          `rotate(${index * 90 + 45}deg) translateX(8px)` : 'none';
      }, 100);
    });
  });
});

// Update all translatable content
=======
// HARRIS ELEKTRONIK - Enhanced JS (Form, Parallax, Back-to-Top, Animations)
document.addEventListener('DOMContentLoaded', function() {
  // Loading screen
  setTimeout(() => document.body.classList.remove('loading'), 1500);

  // Lang/Theme persistence
  let currentLang = localStorage.getItem('lang') || 'id';
  let currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.lang = currentLang;
  if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  
  updateContent(currentLang);

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 100);
    
    // Hero parallax
    const hero = document.querySelector('#home');
    if (hero) hero.style.backgroundPositionY = `${50 + window.scrollY * 0.3}px`;
    
    // Back to top
    document.getElementById('back-to-top').classList.toggle('show', window.scrollY > 500);
  });

  // Theme toggle
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  // Lang toggle
  document.querySelector('.lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateContent(currentLang);
    localStorage.setItem('lang', currentLang);
    document.documentElement.lang = currentLang;
  });

  // Mobile hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Smooth scroll + close mobile menu
  document.querySelectorAll('a[href^=\"#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Staggered scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) 
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
    });
  }, { threshold: 0.1, rootMargin: '-50px 0px -100px 0px' });

  document.querySelectorAll('.fade-in, .service-card, .product-card, .shopping-card, .testimoni-card').forEach(el => observer.observe(el));

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=\"submit\"]');
    const text = btn.textContent;
    btn.textContent = 'Mengirim...';
    btn.disabled = true;
    
    // Simulate send
    setTimeout(() => {
      btn.textContent = '✅ Terkirim!';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = text;
        btn.disabled = false;
      }, 2000);
    }, 1500);
  });

  // Back to top
  document.getElementById('back-to-top').addEventListener('click', () => 
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Preload critical images
  ['image/toko.jpg', 'image/logo_sosmed/logo haris full.png'].forEach(src => {
    const img = new Image();
    img.src = src;
  });
});

// i18n update function
>>>>>>> 0ba5c46 (3commit)
function updateContent(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = languages[lang]?.[key] || el.textContent;
  });
<<<<<<< HEAD
  
  // Update toggles
  const langToggle = document.querySelector('.lang-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  if (langToggle && themeToggle) {
    langToggle.textContent = languages[lang].toggleLang || 'EN';
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? (languages[lang]?.toggleLight || 'Light Mode') : (languages[lang]?.toggleDark || 'Dark Mode');
=======

  // Update toggles
  const langToggle = document.querySelector('.lang-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  if (langToggle) langToggle.textContent = languages[lang]?.toggleLang || (lang === 'id' ? 'EN' : 'ID');
  if (themeToggle) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? languages[lang]?.toggleLight || 'Light' : languages[lang]?.toggleDark || 'Dark';
>>>>>>> 0ba5c46 (3commit)
  }
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && document.querySelector('.nav-links.active')) {
    document.querySelector('.nav-links').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Preload key images for smooth experience
const keyImages = [
  'image/toko.jpg',
  'image/harris electronik.png',
  'image/logo_sosmed/wa.png'
];
keyImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

