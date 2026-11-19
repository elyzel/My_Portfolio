/**
 * scroll-animations.js
 * TODAS as animações do portfólio (SafeVoice e Salom Finance)
 * Inclui animações 2D (CSS) e 3D (Three.js/WebGL)
 */

// =============================================
// SAFEVOICE ANIMATIONS
// =============================================

const desktopStory = matchMedia('(min-width: 53rem) and (min-height: 38rem) and (prefers-reduced-motion: no-preference)');
const motionAllowed = matchMedia('(prefers-reduced-motion: no-preference)');
const stage = document.querySelector('.sticky-stage');
const caption = stage.querySelector('figcaption');
const steps = [...document.querySelectorAll('.step')];
const titles = steps.map(step => step.querySelector('h3').textContent);
let frame = null;
let activeStep = -1;

function progress(value, start, end) {
  return Math.min(1, Math.max(0, (value - start) / Math.max(1, end - start)));
}

function updateStory() {
  frame = null;
  const readingLine = innerHeight * .57;
  const [alertCenter, locationCenter, contactsCenter] = steps.map(step => {
    const rect = step.getBoundingClientRect();
    return rect.top + rect.height / 2;
  });
  const locationStart = (alertCenter + locationCenter) / 2;
  const contactsStart = (locationCenter + contactsCenter) / 2;
  const alert = progress(readingLine, alertCenter - 180, alertCenter);
  const location = progress(readingLine, locationStart, locationCenter);
  const contacts = progress(readingLine, contactsStart, contactsCenter);

  stage.style.setProperty('--alert', .45 + .55 * alert);
  stage.style.setProperty('--signal-offset', 1 - location);
  stage.style.setProperty('--location', location);
  stage.style.setProperty('--contacts', contacts);

  const nextStep = readingLine >= contactsStart ? 2 : readingLine >= locationStart ? 1 : 0;
  if (nextStep !== activeStep) {
    steps[activeStep]?.removeAttribute('aria-current');
    steps[nextStep].setAttribute('aria-current', 'step');
    caption.textContent = titles[nextStep];
    activeStep = nextStep;
  }
}

function scheduleStory() {
  if (desktopStory.matches && frame === null) frame = requestAnimationFrame(updateStory);
}

function syncStory() {
  document.documentElement.classList.toggle('scroll-ready', desktopStory.matches);
  if (desktopStory.matches) {
    scheduleStory();
    return;
  }
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  steps[activeStep]?.removeAttribute('aria-current');
  activeStep = -1;
}

syncStory();
desktopStory.addEventListener('change', syncStory);
addEventListener('scroll', scheduleStory, { passive: true });
addEventListener('resize', scheduleStory);
addEventListener('pageshow', scheduleStory);
document.fonts?.ready.then(scheduleStory);

// =============================================
// SALOM FINANCE ANIMATIONS
// =============================================

(() => {
  const section = document.querySelector('#salom');
  const story = section.querySelector('.sf-story');
  const stage = section.querySelector('.sf-stage');
  const viewport = stage.querySelector('.sf-viewport');
  const steps = [...section.querySelectorAll('.sf-step')];
  const miniStages = [...section.querySelectorAll('.sf-mini')];
  const scenes = [...viewport.querySelectorAll('.sf-scene')];
  const titles = steps.map(step => step.querySelector('h3').textContent);
  const caption = stage.querySelector('figcaption span');
  const count = stage.querySelector('.sf-count');
  const goalScene = scenes[2];
  const goalNumber = goalScene.querySelector('.sf-goal-number');
  const goalState = goalScene.querySelector('.sf-goal-state');
  const contribution = goalScene.querySelector('.sf-contribution');
  const periods = [...scenes[4].querySelectorAll('.sf-periods li')];
  const bars = [...scenes[4].querySelectorAll('.sf-bars i')];
  const wealth = scenes[5].querySelector('.sf-wealth-value');
  const cipher = scenes[6].querySelector('.sf-cipher');
  const finalCipher = cipher.textContent;
  const lock = scenes[6];
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const darkTheme = matchMedia('(prefers-color-scheme: dark)');
  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const barProfiles = [
    [24, 60, 38, 57, 45, 33],
    [65, 31, 74, 56, 38, 64],
    [48, 75, 53, 81, 39, 73],
    [42, 69, 49, 80, 57, 89]
  ];
  const glyphs = '8Qz@4#h!2x$A%?W6';
  const cipherFrames = Array.from({ length: 16 }, (_, frameIndex) =>
    Array.from(finalCipher, (character, index) => {
      if (character === '\n' || index % 16 < frameIndex) return character;
      return glyphs[(index * 7 + frameIndex * 3) % glyphs.length];
    }).join('')
  );

  let frame = null;
  let inView = false;
  let current = 0;
  let target = 0;
  let sampleScroll = true;
  let active = -1;
  let displayedPeriod = -1;
  let lastWealth = -1;
  let lastCipher = -1;
  let mouseX = 0;
  let mouseY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let model = null;
  let library = null;
  let triedModel = false;

  function cue(value, start, end) {
    return progress(value * 1000, start * 1000, end * 1000);
  }

  function smooth(value) {
    return value * value * (3 - 2 * value);
  }

  function setText(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }

  function fraction(scene) {
    return cue(current, scene, scene + .78);
  }

  function goalProgress() {
    const elapsed = fraction(2);
    return elapsed < .38
      ? cue(elapsed, .02, .38) * .003
      : .003 + .997 * cue(elapsed, .38, .88) ** 2.1;
  }

  function readScroll() {
    const readingLine = innerHeight * .57;
    for (let index = steps.length - 1; index >= 0; index--) {
      const rect = steps[index].getBoundingClientRect();
      if (readingLine >= rect.top) return index + progress(readingLine, rect.top, rect.bottom);
    }
    return 0;
  }

  function setActive(index) {
    if (index === active) return;
    if (active >= 0) {
      steps[active].removeAttribute('aria-current');
      scenes[active].setAttribute('aria-hidden', 'true');
    }
    if (active < 0) scenes[0].setAttribute('aria-hidden', 'true');
    active = index;
    steps[index].setAttribute('aria-current', 'step');
    scenes[index].setAttribute('aria-hidden', 'false');
    setText(caption, titles[index]);
    setText(count, (index + 1) + ' / ' + steps.length);
  }

  function setLayers() {
    const index = Math.min(scenes.length - 1, Math.floor(current));
    const overlap = index < scenes.length - 1 ? smooth(cue(current - index, .78, 1)) : 0;
    const outgoing = 1 - smooth(cue(overlap, .30, 1));
    for (let layer = 0; layer < scenes.length; layer++) {
      const scene = scenes[layer];
      scene.style.setProperty('--scene-opacity', layer === index ? outgoing : layer === index + 1 ? overlap : 0);
      scene.style.setProperty('--scene-z', layer === index && overlap < .68 ? 2 : 1);
    }
    setActive(overlap >= .68 ? index + 1 : index);
  }

  function drawGoal(fill) {
    const elapsed = fraction(2);
    const complete = fill >= 1;
    const percent = fill * 100;
    const pulse = .62 + .38 * Math.sin(Math.PI * cue(elapsed, .02, .38) * 3) ** 2;
    const burst = cue(elapsed, .88, 1);
    goalScene.style.setProperty('--goal', fill === 1 ? 1 : (1 - (1 - fill) ** 1.55));
    goalScene.style.setProperty('--scene-p', elapsed);
    goalScene.style.setProperty('--contribution', elapsed < .38 ? pulse : 1);
    goalScene.style.setProperty('--burst', .2 + burst * .8);
    goalScene.style.setProperty('--celebrate', complete ? 1 - smooth(burst) : 0);
    goalScene.classList.toggle('sf-goal-complete', complete);
    setText(goalNumber, complete ? '100%' : percent < 1 ? percent.toFixed(1).replace('.', ',') + '%' : Math.floor(percent) + '%');
    setText(goalState, complete ? 'Meta concluída' : elapsed >= .38 ? 'Tempo acelerado' : 'Guardado');
    setText(contribution, complete ? 'R$ 100.000 guardados' : '+R$ 100 por mês');
  }

  function drawDashboard(value) {
    const position = value * (barProfiles.length - 1);
    const index = Math.floor(position);
    const next = Math.min(index + 1, barProfiles.length - 1);
    const between = smooth(position - index);
    const selected = Math.round(position);
    if (selected !== displayedPeriod) {
      periods[displayedPeriod]?.removeAttribute('aria-current');
      periods[selected].setAttribute('aria-current', 'true');
      displayedPeriod = selected;
    }
    for (let bar = 0; bar < bars.length; bar++) {
      const start = barProfiles[index][bar];
      bars[bar].style.setProperty('--bar', (start + (barProfiles[next][bar] - start) * between) + '%');
    }
    scenes[4].style.setProperty('--draw', smooth(cue(value, .02, .6)));
  }

  function drawInvestment(value) {
    const draw = smooth(cue(value, .05, .87));
    const amount = Math.round((1200 + 800 * draw) / 5) * 5;
    const scene = scenes[5];
    scene.style.setProperty('--draw', draw);
    scene.style.setProperty('--point-first', cue(draw, .02, .1));
    scene.style.setProperty('--point-middle', cue(draw, .48, .57));
    scene.style.setProperty('--point-last', cue(draw, .9, 1));
    if (amount === lastWealth) return;
    setText(wealth, currency.format(amount));
    lastWealth = amount;
  }

  function drawSecurity(value) {
    const textFrame = Math.floor(cue(value, .04, .58) * cipherFrames.length);
    if (textFrame !== lastCipher) {
      setText(cipher, cipherFrames[textFrame] ?? finalCipher);
      lastCipher = textFrame;
    }
    lock.style.setProperty('--cipher-opacity', .52 + .48 * smooth(cue(value, .02, .57)));
    lock.style.setProperty('--locked', smooth(cue(value, .43, .72)));
    lock.style.setProperty('--restored', smooth(cue(value, .7, .94)));
  }

  function drawFrame() {
    frame = null;
    if (!inView || !desktopStory.matches) return;
    if (sampleScroll) {
      target = readScroll();
      sampleScroll = false;
    }
    current += (target - current) * .12;
    pointerX += (mouseX - pointerX) * .12;
    pointerY += (mouseY - pointerY) * .12;

    const fill = goalProgress();
    const importProgress = fraction(1);
    setLayers();
    scenes[0].style.setProperty('--import', .38 + .36 * fraction(0));
    scenes[1].style.setProperty('--import', smooth(cue(importProgress, .05, .66)));
    scenes[1].style.setProperty('--categories', smooth(cue(importProgress, .47, .82)));
    scenes[3].style.setProperty('--ring', .48 + .52 * smooth(fraction(3)));
    drawGoal(fill);
    drawDashboard(fraction(4));
    drawInvestment(fraction(5));
    drawSecurity(fraction(6));
    model?.render(current, fill, fraction(2), pointerX, pointerY);
    if (Math.abs(target - current) > .001 || Math.abs(mouseX - pointerX) > .001 || Math.abs(mouseY - pointerY) > .001) queueFrame();
  }

  function queueFrame() {
    if (inView && desktopStory.matches && frame === null) frame = requestAnimationFrame(drawFrame);
  }

  function resample() {
    sampleScroll = true;
    queueFrame();
  }

  function loadThree() {
    if (window.THREE) return Promise.resolve(window.THREE);
    if (!library) {
      library = new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => resolve(window.THREE ?? null);
        script.onerror = () => resolve(null);
        document.head.append(script);
      });
    }
    return library;
  }

  async function enableModel() {
    if (triedModel || !inView || !desktopStory.matches) return;
    triedModel = true;
    const three = await loadThree();
    if (!desktopStory.matches || !three || model) return;
    if (!inView) {
      triedModel = false;
      return;
    }
    model = createModel(three);
    if (model) section.classList.add('sf-has-webgl');
    queueFrame();
  }

  function disableModel() {
    section.classList.remove('sf-has-webgl');
    model?.dispose();
    model = null;
  }


  function createModel(THREE) {
    const canvas = document.createElement('canvas');
    canvas.className = 'sf-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const attributes = { alpha: true, antialias: true, powerPreference: 'low-power' };
    let renderer;
    try {
      const context = canvas.getContext('webgl2', attributes) || canvas.getContext('webgl', attributes);
      if (!context) return null;
      renderer = new THREE.WebGLRenderer({ ...attributes, canvas, context });
    } catch {
      return null;
    }

    const world = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 20);
    camera.position.z = 5.4;
    const core = new THREE.Group();
    const form = new THREE.Group();
    const ring = new THREE.Group();
    world.add(core);
    core.add(form, ring);

    const blockGeometry = new THREE.BoxGeometry(1.18, 1.18, 1.18, 10, 10, 10);
    const vertices = blockGeometry.attributes.position;
    const vertex = new THREE.Vector3();
    const clamped = new THREE.Vector3();
    const inner = .43;
    const roundness = .16;
    for (let index = 0; index < vertices.count; index++) {
      vertex.fromBufferAttribute(vertices, index);
      clamped.set(
        THREE.MathUtils.clamp(vertex.x, -inner, inner),
        THREE.MathUtils.clamp(vertex.y, -inner, inner),
        THREE.MathUtils.clamp(vertex.z, -inner, inner)
      );
      vertex.sub(clamped).normalize().multiplyScalar(roundness).add(clamped);
      vertices.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    blockGeometry.computeVertexNormals();

    const edgeGeometry = new THREE.EdgesGeometry(blockGeometry, 25);
    const surface = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
    const edges = new THREE.LineBasicMaterial({ transparent: true, depthWrite: false });
    const liquidMaterial = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
    const block = new THREE.Mesh(blockGeometry, surface);
    const outline = new THREE.LineSegments(edgeGeometry, edges);
    const liquid = new THREE.Mesh(blockGeometry, liquidMaterial);
    form.add(block, outline, liquid);
    liquid.renderOrder = 1;
    block.renderOrder = 2;
    outline.renderOrder = 3;

    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = iconCanvas.height = 128;
    const iconContext = iconCanvas.getContext('2d');
    if (!iconContext) {
      renderer.dispose();
      return null;
    }
    iconContext.font = '76px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    iconContext.textAlign = 'center';
    iconContext.textBaseline = 'middle';
    iconContext.fillText('✈️', 64, 65);
    const iconTexture = new THREE.CanvasTexture(iconCanvas);
    const iconMaterial = new THREE.MeshBasicMaterial({ map: iconTexture, transparent: true, depthWrite: false });
    const iconGeometry = new THREE.PlaneGeometry(.78, .78);
    const icon = new THREE.Mesh(iconGeometry, iconMaterial);
    icon.position.z = .605;
    icon.renderOrder = 4;
    form.add(icon);

    const pageGeometry = new THREE.PlaneGeometry(1, 1);
    const pageMaterial = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
    const pageLines = [-.05, -.20, -.35].map((y, index) => {
      const line = new THREE.Mesh(pageGeometry, pageMaterial);
      line.position.set(-.08, y, .603);
      line.scale.set(index === 2 ? .43 : .69, .024, 1);
      line.renderOrder = 4;
      form.add(line);
      return line;
    });

    const shares = [.675, .16875, .15625];
    const ringMaterials = shares.map(() => new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }));
    let angle = Math.PI / 2;
    const ringSegments = shares.map((share, index) => {
      const arc = Math.PI * 2 * share;
      const segment = new THREE.Mesh(new THREE.TorusGeometry(.68, .125, 12, 56, arc - .055), ringMaterials[index]);
      segment.rotation.z = angle;
      angle += arc;
      ring.add(segment);
      return segment;
    });

    const particleMaterial = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
    const particleGeometry = new THREE.SphereGeometry(.023, 5, 4);
    const particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, 112);
    particles.frustumCulled = false;
    core.add(particles);
    const particleTransform = new THREE.Object3D();
    const particleColor = new THREE.Color();
    const warm = new THREE.Color();
    const mint = new THREE.Color();
    const gold = new THREE.Color();
    const stageText = new THREE.Color();
    const stageMuted = new THREE.Color();
    const backdrop = new THREE.Color();
    let width = 0;
    let height = 0;
    let ratio = 0;

    function refreshColors() {
      const colors = getComputedStyle(section);
      warm.set(colors.getPropertyValue('--signal').trim());
      mint.set(colors.getPropertyValue('--mint').trim());
      gold.set(colors.getPropertyValue('--gold').trim());
      stageText.set(colors.getPropertyValue('--stage-text').trim());
      stageMuted.set(colors.getPropertyValue('--stage-muted').trim());
      backdrop.set(colors.getPropertyValue('--stage').trim());
      liquidMaterial.color.copy(mint);
      pageMaterial.color.copy(stageMuted);
      ringMaterials[0].color.copy(mint);
      ringMaterials[1].color.copy(warm);
      ringMaterials[2].color.copy(stageMuted);
      for (let index = 0; index < particles.count; index++) {
        particleColor.copy(index % 4 === 0 ? warm : mint);
        particles.setColorAt(index, particleColor);
      }
      particles.instanceColor.needsUpdate = true;
    }

    function drawParticles(value) {
      particles.visible = value > .015 && value < .985;
      if (!particles.visible) return;
      particleMaterial.opacity = Math.sin(value * Math.PI) * .82;
      const attraction = smooth(value);
      for (let index = 0; index < particles.count; index++) {
        const angle = index * 2.39996;
        const distance = .18 + .47 * ((index % 19) / 18);
        const spread = Math.sin(value * Math.PI) * (.18 + (index % 7) * .055);
        const radius = distance + (.72 - distance) * attraction + spread;
        particleTransform.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.cos(index * .68) * (.48 - .36 * attraction)
        );
        particleTransform.scale.setScalar(.55 + .55 * Math.sin(value * Math.PI));
        particleTransform.updateMatrix();
        particles.setMatrixAt(index, particleTransform.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;
    }

    function resize() {
      const nextWidth = viewport.clientWidth;
      const nextHeight = viewport.clientHeight;
      const nextRatio = Math.min(devicePixelRatio || 1, 2);
      if (!nextWidth || !nextHeight || (width === nextWidth && height === nextHeight && ratio === nextRatio)) return;
      width = nextWidth;
      height = nextHeight;
      ratio = nextRatio;
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function render(phase, fill, goalTime, x, y) {
      const flatten = smooth(cue(phase, 3.72, 4.0));
      if (flatten >= 1) {
        canvas.hidden = true;
        return;
      }
      canvas.hidden = false;
      resize();
      const fold = smooth(cue(phase, 1.76, 2.36));
      const collapse = smooth(cue(phase, 2.76, 3.27));
      const solid = 1 - smooth(cue(collapse, .26, .85));
      const ringOpacity = smooth(cue(collapse, .20, .88));
      const fileDrop = Math.sin(cue(phase, 1, 1.73) * Math.PI * .5);
      const glow = fill >= 1 ? 1 - .6 * cue(goalTime, .88, 1) : 0;
      core.position.y = .49 - fileDrop * .12 * (1 - fold) - .36 * flatten;
      core.rotation.set(y * .0698, x * .0698, 0);
      form.rotation.set(-.08 + .37 * fold, -.15 + .55 * fold + .25 * goalTime, -.16 * (1 - fold));
      form.scale.set((.75 + .25 * fold) * (1 - .63 * collapse), (1.15 - .15 * fold) * (1 - .63 * collapse), .047 + .95 * fold);
      surface.color.copy(backdrop).lerp(stageText, .23 + .25 * (1 - fold)).lerp(gold, glow * .5);
      surface.opacity = solid * (.95 - .61 * fold);
      edges.color.copy(stageText).lerp(mint, fold).lerp(gold, glow);
      edges.opacity = solid * .8;
      liquid.visible = fold > .15 && fill > 0 && solid > .02;
      const liquidHeight = 1 - (1 - fill) ** 1.55;
      liquid.scale.set(.86, Math.max(.002, liquidHeight * .85), .83);
      liquid.position.y = -.49 + liquidHeight * .5;
      liquidMaterial.opacity = fold * solid * .58;
      iconMaterial.opacity = fold * solid;
      pageMaterial.opacity = (1 - fold) * solid;
      for (const line of pageLines) line.visible = fold < .99;
      form.visible = solid > .01;
      ring.visible = ringOpacity > 0;
      ring.rotation.set(.27 + flatten * 1.24, .1, -.18 + .18 * flatten);
      ring.scale.set(1 + flatten * .4, 1 - flatten * .68, 1);
      for (let index = 0; index < ringMaterials.length; index++) {
        ringMaterials[index].opacity = ringOpacity * (1 - flatten);
      }
      drawParticles(collapse);
      renderer.render(world, camera);
    }

    function contextLost(event) {
      event.preventDefault();
      disableModel();
      queueFrame();
    }

    function dispose() {
      canvas.removeEventListener('webglcontextlost', contextLost);
      for (const geometry of [blockGeometry, edgeGeometry, iconGeometry, pageGeometry, particleGeometry]) geometry.dispose();
      for (const segment of ringSegments) segment.geometry.dispose();
      for (const material of [surface, edges, liquidMaterial, iconMaterial, pageMaterial, particleMaterial, ...ringMaterials]) material.dispose();
      iconTexture.dispose();
      renderer.dispose();
      canvas.remove();
    }

    canvas.addEventListener('webglcontextlost', contextLost);
    viewport.prepend(canvas);
    refreshColors();
    return { render, resize, refreshColors, dispose };
  }

  const stageObserver = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (!inView) {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      return;
    }
    current = target = readScroll();
    sampleScroll = true;
    queueFrame();
    enableModel();
  });

  const mobileObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('sf-in-view');
      mobileObserver.unobserve(entry.target);
    }
  }, { threshold: .18 });

  function syncLayout() {
    section.classList.toggle('sf-ready', desktopStory.matches);
    stageObserver.disconnect();
    mobileObserver.disconnect();
    if (desktopStory.matches) {
      stageObserver.observe(stage);
      return;
    }
    inView = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (active >= 0) {
      steps[active].removeAttribute('aria-current');
      scenes[active].setAttribute('aria-hidden', 'true');
      active = -1;
    }
    disableModel();
    triedModel = false;
    if (motionAllowed.matches) {
      for (const mini of miniStages) {
        if (!mini.classList.contains('sf-in-view')) mobileObserver.observe(mini);
      }
    }
  }

  function refreshPalette() {
    model?.refreshColors();
    queueFrame();
  }

  stage.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return;
    const rect = stage.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouseY = (event.clientY - rect.top) / rect.height * 2 - 1;
    queueFrame();
  });
  stage.addEventListener('pointerleave', () => {
    mouseX = mouseY = 0;
    queueFrame();
  });
  desktopStory.addEventListener('change', syncLayout);
  motionAllowed.addEventListener('change', syncLayout);
  darkTheme.addEventListener('change', refreshPalette);
  new MutationObserver(refreshPalette).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('scroll', resample, { passive: true });
  addEventListener('resize', resample);
  addEventListener('pageshow', resample);
  document.fonts?.ready.then(resample);
  syncLayout();
})();


/**
 * CONTACT - Copy Email Functionality
 */
(function initContactCopy() {
  const emailLink = document.getElementById('contact-email-link');
  const copyButton = document.querySelector('.contact-copy');
  const statusElement = document.querySelector('.contact-copy-status');
  
  if (!emailLink || !copyButton || !statusElement) return;
  
  // Show copy button if clipboard API is available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    copyButton.hidden = false;
  }
  
  copyButton.addEventListener('click', async function() {
    const email = emailLink.textContent;
    
    try {
      await navigator.clipboard.writeText(email);
      
      // Update button text
      const originalText = copyButton.textContent;
      copyButton.textContent = 'Copiado!';
      copyButton.disabled = true;
      
      // Update status for screen readers
      statusElement.textContent = 'E-mail copiado para a área de transferência';
      
      // Reset after 2 seconds
      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.disabled = false;
        statusElement.textContent = '';
      }, 2000);
      
    } catch (error) {
      // Show error message
      statusElement.setAttribute('data-copy-error', '');
      statusElement.textContent = 'Não foi possível copiar. Use Ctrl+C para copiar manualmente.';
      
      // Clear error after 3 seconds
      setTimeout(() => {
        statusElement.removeAttribute('data-copy-error');
        statusElement.textContent = '';
      }, 3000);
    }
  });
})();
