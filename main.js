// Slideshow + Lightbox
(function () {
  const mainImg   = document.querySelector('.slide-main-img');
  const thumbs    = document.querySelectorAll('.thumb');
  const prevBtn   = document.querySelector('.slide-prev');
  const nextBtn   = document.querySelector('.slide-next');
  if (!mainImg || !thumbs.length) return;

  let current = 0;

  function goTo(index) {
    thumbs[current].classList.remove('active');
    current = (index + thumbs.length) % thumbs.length;
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = thumbs[current].src;
      mainImg.alt = thumbs[current].alt;
      mainImg.style.opacity = '1';
    }, 150);
    thumbs[current].classList.add('active');
    thumbs[current].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => goTo(i)));
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // --- Lightbox ---
  const overlay   = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbClose   = document.getElementById('lightbox-close');
  const lbPrev    = document.getElementById('lightbox-prev');
  const lbNext    = document.getElementById('lightbox-next');
  const lbCounter = document.getElementById('lightbox-counter');

  function openLightbox() {
    lbImg.src = thumbs[current].src;
    lbImg.alt = thumbs[current].alt;
    lbCounter.textContent = (current + 1) + ' / ' + thumbs.length;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function lbGoTo(index) {
    goTo(index);
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = thumbs[current].src;
      lbImg.alt = thumbs[current].alt;
      lbCounter.textContent = (current + 1) + ' / ' + thumbs.length;
      lbImg.style.opacity = '1';
    }, 150);
  }

  mainImg.style.cursor = 'zoom-in';
  mainImg.addEventListener('click', openLightbox);
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => lbGoTo(current - 1));
  lbNext.addEventListener('click', () => lbGoTo(current + 1));
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });

  // Keyboard navigation (slideshow + lightbox)
  document.addEventListener('keydown', e => {
    if (overlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft')  lbGoTo(current - 1);
      if (e.key === 'ArrowRight') lbGoTo(current + 1);
      if (e.key === 'Escape')     closeLightbox();
    } else {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    }
  });
})();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Consent-Loader für Google Maps & Calendar
document.querySelectorAll('.consent-load-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const placeholder = btn.closest('.consent-placeholder');
    const { src, type, height, title, link } = placeholder.dataset;

    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = '100%';
    iframe.height = height || '400';
    iframe.title = title || '';
    iframe.style.border = '0';

    if (type === 'map') {
      iframe.style.borderRadius = '6px';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.setAttribute('aria-label', 'Karte öffnen');
        a.appendChild(iframe);
        placeholder.replaceWith(a);
        return;
      }
    } else if (type === 'calendar') {
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';
    }

    placeholder.replaceWith(iframe);
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const links = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));
