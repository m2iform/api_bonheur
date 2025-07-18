// Slider Hero
const sliderImgs = document.querySelectorAll('.slider-img');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;
if (sliderImgs.length) {
  function showSlide(idx) {
    sliderImgs.forEach((img, i) => {
      img.style.opacity = i === idx ? '1' : '0';
    });
  }
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + sliderImgs.length) % sliderImgs.length;
    showSlide(currentSlide);
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % sliderImgs.length;
    showSlide(currentSlide);
  });
  showSlide(currentSlide);
}
// Bouton retour en haut
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Navigation active
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.href === window.location.href || link.href === window.location.origin + window.location.pathname) {
    link.classList.add('font-semibold', 'border-b-2', 'border-yellow-400', 'text-yellow-700');
  } else {
    link.classList.remove('font-semibold', 'border-b-2', 'border-yellow-400', 'text-yellow-700');
  }
});
// Menu burger mobile
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const burgerLine1 = document.getElementById('burgerLine1');
const burgerLine2 = document.getElementById('burgerLine2');
const burgerLine3 = document.getElementById('burgerLine3');
if (burgerBtn && mobileMenu && closeMenu && mobileOverlay) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full', 'opacity-0');
    mobileMenu.classList.add('show', 'opacity-100');
    mobileOverlay.classList.add('opacity-100');
    mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => mobileOverlay.classList.add('pointer-events-auto'), 10);
    closeMenu.focus();
    // Animation burger en croix
    burgerLine1.style.transform = 'translateY(8px) rotate(45deg)';
    burgerLine2.style.opacity = '0';
    burgerLine3.style.transform = 'translateY(-8px) rotate(-45deg)';
  });
  function closeMobileMenu() {
    mobileMenu.classList.remove('show', 'opacity-100');
    mobileMenu.classList.add('translate-x-full', 'opacity-0');
    mobileOverlay.classList.remove('opacity-100');
    mobileOverlay.classList.add('opacity-0');
    setTimeout(() => mobileOverlay.classList.add('pointer-events-none'), 300);
    burgerBtn.focus();
    // Animation burger normale
    burgerLine1.style.transform = '';
    burgerLine2.style.opacity = '1';
    burgerLine3.style.transform = '';
  }
  closeMenu.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  // Fermer le menu au clic sur un lien
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      setTimeout(() => {
        window.location.href = link.href;
      }, 300); // 300ms = durée de la transition
      e.preventDefault();
    });
  });
  // Accessibilité : fermer avec Echap
  document.addEventListener('keydown', (e) => {
    if (mobileMenu.classList.contains('show') && e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}
// Animation fade/slide au scroll
const fadeSections = document.querySelectorAll('.fade-section');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeSections.forEach(section => observer.observe(section));
} else {
  // Fallback : tout afficher
  fadeSections.forEach(section => section.classList.add('visible'));
}
// Lightbox images produits/actualités
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImages = document.querySelectorAll('.bg-yellow-50 img, .bg-white img');
lightboxImages.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxOverlay.classList.add('opacity-100');
    lightboxOverlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => lightboxOverlay.classList.add('pointer-events-auto'), 10);
    lightboxClose.focus();
  });
});
function closeLightbox() {
  lightboxOverlay.classList.remove('opacity-100', 'pointer-events-auto');
  lightboxOverlay.classList.add('opacity-0', 'pointer-events-none');
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (lightboxOverlay.classList.contains('opacity-100') && e.key === 'Escape') closeLightbox();
});
