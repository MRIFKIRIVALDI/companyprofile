// HARRIS ELEKTRONIK - Full Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // Loading remove
  setTimeout(() => document.body.classList.remove('loading'), 1500);
  
  // LocalStorage theme/lang
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedLang = localStorage.getItem('lang') || 'id';
  
  if (savedTheme === 'dark') document.body.classList.add('dark');
  updateLanguage(savedLang);
  
  // Navbar scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = '#ff6b0060';
    } else {
      header.style.background = '#ff6b00';
    }
    
    // Back to top
    const backTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  });
  
  // Back to top click
  document.getElementById('back-to-top').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Theme toggle
  document.querySelector('.theme-toggle').onclick = () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.querySelector('.theme-toggle').textContent = isDark ? '☀️ Light' : '🌙 Dark';
  };
  
  // Language toggle
  document.querySelector('.lang-toggle').onclick = () => {
    const currentLang = localStorage.getItem('lang') || 'id';
    const newLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('lang', newLang);
    updateLanguage(newLang);
    document.querySelector('.lang-toggle').textContent = newLang === 'id' ? '🇺🇸 EN' : '🇮🇩 ID';
    document.documentElement.lang = newLang;
  };
  
  // Mobile menu
  document.querySelector('.hamburger').onclick = () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };
  
  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu
      document.querySelector('.nav-links').classList.remove('active');
      document.querySelector('.hamburger').classList.remove('active');
      document.body.classList.remove('no-scroll');
    };
  });
  
  // Scroll animations observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Contact form
  document.getElementById('contact-form').onsubmit = e => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda sudah terkirim. Kami akan balas segera.');
    e.target.reset();
  };
  
  // Brands carousel pause on hover
  document.querySelector('.brands-wrapper').onmouseenter = () => {
    document.querySelector('.brands-wrapper').style.animationPlayState = 'paused';
  };
  document.querySelector('.brands-wrapper').onmouseleave = () => {
    document.querySelector('.brands-wrapper').style.animationPlayState = 'running';
  };
});

function updateLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = languages[lang][key] || el.textContent;
  });
}

