// Header turns solid once the hero is scrolled past; sections fade in as they arrive.
(() => {
  const top = document.getElementById('top');
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));

  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
