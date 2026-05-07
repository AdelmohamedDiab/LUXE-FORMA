// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 700);
  }, 2200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== DARK / LIGHT THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
const savedTheme = localStorage.getItem('luxe-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('luxe-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ===== AOS SCROLL ANIMATIONS =====
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.aosDelay || 0);
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
aosElements.forEach(el => aosObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
    if (link) {
      link.style.color = scrollPos >= top && scrollPos < bottom ? 'var(--gold)' : '';
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.style.display = 'none';
      formSuccess.style.display = 'block';
      contactForm.reset();
    }, 1500);
  });
}

// ===== SMOOTH HERO PARALLAX =====
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const heroImg = hero.querySelector('.hero-img');
  if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
});

// ===== ADD TO CART FEEDBACK =====
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = '✓ Added';
    this.style.background = 'var(--gold)';
    this.style.color = '#0a0908';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
      this.style.color = '';
    }, 1800);
  });
});

// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.action-btn').forEach(btn => {
  if (btn.title === 'Wishlist') {
    btn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      icon.style.color = icon.classList.contains('fas') ? 'var(--gold)' : '';
    });
  }
});

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:10000;
  display:none;align-items:center;justify-content:center;cursor:zoom-out;
`;
lightbox.innerHTML = `
  <img id="lightbox-img" style="max-width:90vw;max-height:88vh;border-radius:8px;object-fit:contain;box-shadow:0 20px 80px rgba(0,0,0,0.8);" />
  <button id="lightbox-close" style="position:absolute;top:1.5rem;right:2rem;color:#fff;font-size:2rem;background:none;border:none;cursor:pointer;line-height:1;">&#x2715;</button>
`;
document.body.appendChild(lightbox);
const lbImg = document.getElementById('lightbox-img');
const lbClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.style.cursor = 'zoom-in';
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lbImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

[lightbox, lbClose].forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === lightbox || e.target === lbClose || e.target.parentElement === lbClose) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { lightbox.style.display = 'none'; document.body.style.overflow = ''; }
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent;
        if (text.includes('2,400')) animateCounter(num, 2400, '+');
        else if (text.includes('18')) animateCounter(num, 18, '');
        else if (text.includes('96')) animateCounter(num, 96, '%');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
