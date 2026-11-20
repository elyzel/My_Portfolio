(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const colorMeta = document.querySelector('meta[name="theme-color"]');
  if (!button || !colorMeta) return;

  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let manuallyChosen = false;
  let animating = false;
  let releaseTimer;

  try {
    const saved = localStorage.getItem('theme');
    manuallyChosen = saved === 'dark' || saved === 'light';
  } catch {}

  function syncControl(theme) {
    const dark = theme === 'dark';
    button.setAttribute('aria-checked', String(dark));
    button.dataset.theme = theme;
    colorMeta.setAttribute('content', dark ? '#121e1d' : '#f3f5f2');
  }

  syncControl(root.dataset.theme || 'light');

  function persist(theme) {
    try { localStorage.setItem('theme', theme); } catch {}
  }

  function updateTheme(theme, { save = true, animate = true, origin } = {}) {
    if (theme === root.dataset.theme) return;
    if (save) {
      manuallyChosen = true;
      persist(theme);
    }

    const apply = () => {
      root.dataset.theme = theme;
      syncControl(theme);
    };
    const canReveal = animate && !reducedMotion.matches &&
      typeof document.startViewTransition === 'function';

    if (canReveal) {
      const transition = document.startViewTransition(apply);
      transition.ready.then(() => {
        const rect = (origin || button).getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 760, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(() => {});
    } else {
      root.classList.add('theme-fallback');
      apply();
      setTimeout(() => root.classList.remove('theme-fallback'), reducedMotion.matches ? 180 : 420);
    }
  }

  function unlock() {
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => {
      animating = false;
      button.removeAttribute('data-animating');
    }, reducedMotion.matches ? 200 : 820);
  }

  function choose(theme, origin) {
    if (animating || theme === root.dataset.theme) return;
    animating = true;
    button.setAttribute('data-animating', '');
    updateTheme(theme, { origin });
    unlock();
  }

  button.addEventListener('click', () => {
    choose(root.dataset.theme === 'dark' ? 'light' : 'dark', button);
  });

  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    choose(event.key === 'ArrowRight' ? 'dark' : 'light', button);
  });

  systemTheme.addEventListener('change', event => {
    if (!manuallyChosen) updateTheme(event.matches ? 'dark' : 'light', { save: false, animate: false });
  });

  addEventListener('storage', event => {
    if (event.key !== 'theme' && event.key !== null) return;
    if (event.newValue === 'dark' || event.newValue === 'light') {
      manuallyChosen = true;
      updateTheme(event.newValue, { save: false, animate: false });
    } else if (event.key === 'theme' || event.key === null) {
      manuallyChosen = false;
      updateTheme(systemTheme.matches ? 'dark' : 'light', { save: false, animate: false });
    }
  });
})();
