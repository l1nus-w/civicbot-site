// CivicBot — minimal, dependency-free interaction layer.

document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Count-up for registry card stats (data-count-to attribute)
  const counters = document.querySelectorAll('[data-count-to]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  counters.forEach((el) => {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = target.toLocaleString('en-US');
      return;
    }
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
});
