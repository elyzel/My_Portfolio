(() => {
  // Densidade, brilho e ritmo da chuva, em pixels CSS e segundos.
  const CONFIG = {
    activeFraction: .5,
    trailLength: [10, 16],
    restartDelay: [.2, 1.4],
    glyphChangesPerSecond: .02,
    calmPadding: 24,
    calmAlpha: .45,
    maxDpr: 1.5,
    fps: 60,
    mobileFps: 30,
    maxDelta: .05,
    resizeDelay: 150,
    layers: [
      { fontSize: 11, spacing: 14, trailAlpha: [.085, .105], headBoost: .08, speed: [20, 70] },
      { fontSize: 16, spacing: 18, trailAlpha: [.12, .135], headBoost: .10, speed: [30, 110] }
    ]
  };

  const canvas = document.querySelector('.hero-rain');
  const hero = canvas?.parentElement;
  if (!hero) return;

  const text = [hero.querySelector('h1'), hero.querySelector('.hero > p'), hero.querySelector('.hero .actions')];
  const calmBounds = new Float32Array(text.length * 4);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(pointer: coarse), (width < 42rem)');
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  let layers = [];
  let context;
  let resizeObserver;
  let intersectionObserver;
  let themeObserver;
  let resizeTimer;
  let frame = null;
  let inView = false;
  let painted = false;
  let width = 0;
  let height = 0;
  let dpr = 0;
  let color = '';
  let alphaScale = 1;
  let lastPaint = null;
  let nextPaint = 0;
  let glyphTime = 0;

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = lastPaint = null;
    nextPaint = 0;
  }

  function disable() {
    stop();
    clearTimeout(resizeTimer);
    listeners.abort();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    themeObserver?.disconnect();
    canvas.hidden = true;
  }

  function between(range) {
    return range[0] + Math.random() * (range[1] - range[0]);
  }

  function makeAtlas(layer) {
    const atlas = document.createElement('canvas');
    const spriteWidth = Math.ceil((layer.settings.fontSize * .75 + 2) * dpr);
    const spriteHeight = Math.ceil(layer.rowHeight * dpr);
    atlas.width = spriteWidth * 2;
    atlas.height = spriteHeight;
    const brush = atlas.getContext('2d');
    if (!brush) throw new Error('Canvas 2D unavailable');
    brush.fillStyle = color;
    brush.font = Math.round(layer.settings.fontSize * dpr) + 'px ui-monospace, Consolas, monospace';
    brush.textAlign = 'center';
    brush.textBaseline = 'middle';
    brush.fillText('0', spriteWidth / 2, spriteHeight / 2);
    brush.fillText('1', spriteWidth * 1.5, spriteHeight / 2);
    layer.atlas = atlas;
    layer.spriteWidth = spriteWidth;
    layer.spriteHeight = spriteHeight;
  }

  function resetStream(layer, slot, y) {
    layer.y[slot] = y;
    layer.speed[slot] = between(layer.settings.speed);
    layer.opacity[slot] = between(layer.settings.trailAlpha);
    const minLength = CONFIG.trailLength[0];
    layer.length[slot] = minLength + Math.floor(Math.random() * (CONFIG.trailLength[1] - minLength + 1));
    layer.wait[slot] = 0;
    const start = slot * CONFIG.trailLength[1];
    for (let index = start; index < start + CONFIG.trailLength[1]; index++) {
      layer.bits[index] = Math.random() < .5 ? 0 : 1;
    }
  }

  function makeLayer(settings) {
    const count = Math.ceil(width / settings.spacing) + 1;
    const active = Math.max(1, Math.round(count * CONFIG.activeFraction));
    const layer = {
      settings,
      rowHeight: settings.fontSize + 2,
      x: new Float32Array(count),
      columns: new Uint16Array(count),
      active,
      y: new Float32Array(active),
      speed: new Float32Array(active),
      opacity: new Float32Array(active),
      length: new Uint8Array(active),
      wait: new Float32Array(active),
      bits: new Uint8Array(active * CONFIG.trailLength[1])
    };
    const offset = Math.random() * settings.spacing;
    for (let index = 0; index < count; index++) {
      layer.columns[index] = index;
      layer.x[index] = index * settings.spacing - offset + Math.random() * 2 - 1;
    }
    for (let index = count - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      const column = layer.columns[index];
      layer.columns[index] = layer.columns[other];
      layer.columns[other] = column;
    }
    for (let slot = 0; slot < active; slot++) resetStream(layer, slot, Math.random() * height);
    makeAtlas(layer);
    return layer;
  }

  function measureCalm(canvasBounds) {
    for (let index = 0; index < text.length; index++) {
      const rect = text[index].getBoundingClientRect();
      calmBounds[index * 4] = rect.left - canvasBounds.left;
      calmBounds[index * 4 + 1] = rect.top - canvasBounds.top;
      calmBounds[index * 4 + 2] = rect.right - canvasBounds.left;
      calmBounds[index * 4 + 3] = rect.bottom - canvasBounds.top;
    }
  }

  function calmOpacity(x, y, halfWidth, halfHeight) {
    let opacity = 1;
    for (let index = 0; index < calmBounds.length; index += 4) {
      const dx = Math.max(0, calmBounds[index] - x - halfWidth, x - calmBounds[index + 2] - halfWidth);
      const dy = Math.max(0, calmBounds[index + 1] - y - halfHeight, y - calmBounds[index + 3] - halfHeight);
      if (dx === 0 && dy === 0) return CONFIG.calmAlpha;
      if (dx >= CONFIG.calmPadding || dy >= CONFIG.calmPadding) continue;
      const distance = Math.min(1, Math.hypot(dx, dy) / CONFIG.calmPadding);
      const fade = distance * distance * (3 - 2 * distance);
      opacity = Math.min(opacity, CONFIG.calmAlpha + (1 - CONFIG.calmAlpha) * fade);
    }
    return opacity;
  }

  function advance(delta) {
    glyphTime += delta;
    const updateGlyphs = glyphTime >= 1;
    if (updateGlyphs) glyphTime -= 1;
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
      const layer = layers[layerIndex];
      for (let slot = 0; slot < layer.active; slot++) {
        if (layer.wait[slot] > 0) {
          layer.wait[slot] -= delta;
          if (layer.wait[slot] <= 0) {
            const free = layer.active + Math.floor(Math.random() * (layer.columns.length - layer.active));
            const column = layer.columns[slot];
            layer.columns[slot] = layer.columns[free];
            layer.columns[free] = column;
            resetStream(layer, slot, -layer.rowHeight);
          }
        } else {
          layer.y[slot] += layer.speed[slot] * delta;
          if (layer.y[slot] - layer.length[slot] * layer.rowHeight > height) {
            layer.wait[slot] = between(CONFIG.restartDelay);
          }
        }
      }
      if (!updateGlyphs) continue;
      for (let index = 0; index < layer.bits.length; index++) {
        if (Math.random() < CONFIG.glyphChangesPerSecond) layer.bits[index] ^= 1;
      }
    }
  }

  function draw() {
    context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
      const layer = layers[layerIndex];
      const spriteWidth = layer.spriteWidth / dpr;
      const spriteHeight = layer.spriteHeight / dpr;
      const halfWidth = spriteWidth / 2 + .5;
      const halfHeight = spriteHeight / 2 + .5;
      for (let slot = 0; slot < layer.active; slot++) {
        if (layer.wait[slot] > 0) continue;
        const x = layer.x[layer.columns[slot]];
        const left = Math.round((x - spriteWidth / 2) * dpr) / dpr;
        const length = layer.length[slot];
        const start = slot * CONFIG.trailLength[1];
        for (let cell = 0; cell < length; cell++) {
          const y = layer.y[slot] - cell * layer.rowHeight;
          if (y < -spriteHeight || y >= height) continue;
          const fade = 1 - cell / length;
          const opacity = cell === 0
            ? layer.opacity[slot] + layer.settings.headBoost
            : layer.opacity[slot] * fade * fade;
          context.globalAlpha = opacity * alphaScale * calmOpacity(x, y + spriteHeight / 2, halfWidth, halfHeight);
          context.drawImage(layer.atlas, layer.bits[start + cell] * layer.spriteWidth, 0,
            layer.spriteWidth, layer.spriteHeight, left, Math.round(y * dpr) / dpr, spriteWidth, spriteHeight);
        }
      }
    }
    context.globalAlpha = 1;
    painted = true;
  }

  function tick(time) {
    frame = null;
    if (!inView || document.hidden || reducedMotion.matches) {
      stop();
      return;
    }
    try {
      const interval = 1000 / (mobile.matches ? CONFIG.mobileFps : CONFIG.fps);
      if (time + .5 >= nextPaint) {
        const delta = lastPaint === null ? 0 : Math.min(CONFIG.maxDelta, (time - lastPaint) / 1000);
        advance(delta);
        draw();
        nextPaint = lastPaint === null ? time + interval : Math.max(nextPaint + interval, time + interval / 2);
        lastPaint = time;
      }
      frame = requestAnimationFrame(tick);
    } catch {
      disable();
    }
  }

  function syncPlayback() {
    if (!inView || document.hidden || reducedMotion.matches) stop();
    if (!inView || document.hidden || !layers.length) return;
    if (reducedMotion.matches) {
      if (!painted) draw();
    } else if (frame === null) {
      frame = requestAnimationFrame(tick);
    }
  }

  function refresh() {
    try {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const nextDpr = Math.min(devicePixelRatio || 1, CONFIG.maxDpr);
      const style = getComputedStyle(canvas);
      const nextColor = style.getPropertyValue('--rain-color').trim();
      alphaScale = Number(style.getPropertyValue('--rain-alpha-scale'));
      const rebuild = width !== bounds.width || height !== bounds.height || dpr !== nextDpr;
      if (rebuild) {
        width = bounds.width;
        height = bounds.height;
        dpr = nextDpr;
        canvas.width = Math.ceil(width * dpr);
        canvas.height = Math.ceil(height * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.imageSmoothingEnabled = false;
        color = nextColor;
        layers = CONFIG.layers.map(makeLayer);
      } else if (color !== nextColor) {
        color = nextColor;
        for (const layer of layers) makeAtlas(layer);
      }
      measureCalm(bounds);
      painted = false;
      syncPlayback();
    } catch {
      disable();
    }
  }

  function queueRefresh() {
    if (options.signal.aborted) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, CONFIG.resizeDelay);
  }

  function syncSafely() {
    try {
      syncPlayback();
    } catch {
      disable();
    }
  }

  try {
    context = canvas.getContext('2d');
    if (!context) {
      disable();
      return;
    }
    refresh();
    if (options.signal.aborted) return;
    resizeObserver = new ResizeObserver(queueRefresh);
    resizeObserver.observe(hero);
    for (const element of text) resizeObserver.observe(element);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncSafely();
    }, { rootMargin: '32px 0px' });
    intersectionObserver.observe(hero);
    themeObserver = new MutationObserver(refresh);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        for (const layer of layers) {
          for (let slot = 0; slot < layer.active; slot++) {
            layer.y[slot] = Math.random() * height;
            layer.wait[slot] = 0;
          }
        }
        painted = false;
      }
      syncSafely();
    }, options);
    addEventListener('resize', queueRefresh, options);
    document.addEventListener('visibilitychange', syncSafely, options);
    document.fonts?.ready.then(queueRefresh);
  } catch {
    disable();
  }
})();
