(() => {
  const header = document.querySelector('body > header');
  const links = [...header.querySelectorAll('nav a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  const finalSection = sections.indexOf(document.querySelector('main > section:last-child'));
  const visible = new Set();
  let observer;
  let headerHeight = 0;
  let viewportHeight = 0;
  let activeIndex = -1;
  let footerVisible = false;

  function updateActive() {
    const index = footerVisible && finalSection >= 0 ? finalSection :
      sections.findLastIndex(section => visible.has(section));
    if (index < 0 || index === activeIndex) return;
    links[activeIndex]?.removeAttribute('aria-current');
    links[index].setAttribute('aria-current', 'true');
    activeIndex = index;
  }

  function observeSections() {
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height === headerHeight && innerHeight === viewportHeight) return;
    headerHeight = height;
    viewportHeight = innerHeight;
    document.documentElement.style.setProperty('--header-height', height + 'px');

    observer?.disconnect();
    visible.clear();
    // Uma faixa logo abaixo do cabeçalho acompanha a seção que chegou ao topo.
    const anchorGap = 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const top = Math.min(height + anchorGap, Math.max(0, viewportHeight - 2));
    observer = new IntersectionObserver((entries, source) => {
      if (source !== observer) return;
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      updateActive();
    }, { rootMargin: '-' + top + 'px 0px -' + Math.max(0, viewportHeight - top - 2) + 'px 0px' });
    for (const section of sections) observer.observe(section);
  }

  // Em telas altas, Contato pode terminar antes de alcançar a faixa no topo.
  new IntersectionObserver(([entry]) => {
    footerVisible = entry.intersectionRatio >= 1;
    updateActive();
  }, { threshold: 1 }).observe(document.querySelector('body > footer'));

  observeSections();
  new ResizeObserver(observeSections).observe(header);
  addEventListener('resize', observeSections);
})();
