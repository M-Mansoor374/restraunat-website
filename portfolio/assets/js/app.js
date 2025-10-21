(function(){
  const docEl = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function setTheme(mode){
    if (mode === 'dark') {
      docEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      iconSun && (iconSun.style.display = 'inline');
      iconMoon && (iconMoon.style.display = 'none');
    } else {
      docEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      iconSun && (iconSun.style.display = 'none');
      iconMoon && (iconMoon.style.display = 'inline');
    }
  }

  // Initialize icons based on current theme
  if (docEl.classList.contains('dark')) {
    iconSun && (iconSun.style.display = 'inline');
    iconMoon && (iconMoon.style.display = 'none');
  } else {
    iconSun && (iconSun.style.display = 'none');
    iconMoon && (iconMoon.style.display = 'inline');
  }

  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = docEl.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Mobile menu toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
    });

    // Close on nav click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Reveal on scroll (simple, no heavy libs)
  const revealEls = Array.from(document.querySelectorAll('section'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-4');
      observer.observe(el);
    });

    // Inject minimal keyframes via JS once
    const style = document.createElement('style');
    style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn .6s cubic-bezier(.22,1,.36,1) both; }`;
    document.head.appendChild(style);
  }
})();
