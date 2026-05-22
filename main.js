/* Edgewood Solutions — main.js */

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile menu ── */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle?.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
  document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
});
links?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll animations ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.12 });
document.querySelectorAll('.au').forEach(el => observer.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Billing toggle (GHL plans page) ── */
const sw = document.querySelector('.switch');
const monthlyPrices = document.querySelectorAll('[data-monthly]');
const yearlyPrices  = document.querySelectorAll('[data-yearly]');
const monthLabel    = document.getElementById('monthLabel');
const yearLabel     = document.getElementById('yearLabel');

if (sw) {
  sw.addEventListener('click', () => {
    const isYearly = sw.classList.toggle('yearly');
    monthLabel?.classList.toggle('active-label', !isYearly);
    yearLabel?.classList.toggle('active-label',  isYearly);
    monthlyPrices.forEach(el => { el.style.display = isYearly ? 'none' : ''; });
    yearlyPrices.forEach(el  => { el.style.display = isYearly ? '' : 'none'; });
  });
}

/* ── Smooth counter animation for hero stats ── */
function animateCount(el, end, duration = 1800) {
  const start = 0;
  const step = (end / duration) * 16;
  let cur = start;
  const tick = () => {
    cur = Math.min(cur + step, end);
    el.textContent = Math.round(cur) + (el.dataset.suffix || '');
    if (cur < end) requestAnimationFrame(tick);
  };
  tick();
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const counters = e.target.querySelectorAll('[data-count]');
      counters.forEach(c => animateCount(c, +c.dataset.count));
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));
