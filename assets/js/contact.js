(() => {
  const states = new WeakMap();
  const copiedDuration = 2000;
  const errorDuration = 4000;
  let latestRequest = 0;
  let announceTimer;
  let clearStatusTimer;

  function copyWithTextarea(value) {
    const focused = document.activeElement;
    const selection = window.getSelection();
    const ranges = [];
    for (let index = 0; selection && index < selection.rangeCount; index++) {
      ranges.push(selection.getRangeAt(index).cloneRange());
    }
    const anchor = selection?.anchorNode;
    const anchorOffset = selection?.anchorOffset;
    const focus = selection?.focusNode;
    const focusOffset = selection?.focusOffset;
    const fieldStart = focused?.selectionStart;
    const fieldEnd = focused?.selectionEnd;
    const fieldDirection = focused?.selectionDirection;
    const x = scrollX;
    const y = scrollY;

    const field = document.createElement('textarea');
    field.value = value;
    field.readOnly = true;
    field.tabIndex = -1;
    field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    document.body.append(field);
    try {
      field.focus({ preventScroll: true });
      field.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      field.remove();
      focused?.focus({ preventScroll: true });
      if (typeof fieldStart === 'number') {
        focused.setSelectionRange(fieldStart, fieldEnd, fieldDirection);
      } else if (selection) {
        selection.removeAllRanges();
        if (ranges.length === 1 && anchor?.isConnected && focus?.isConnected &&
            typeof selection.setBaseAndExtent === 'function') {
          selection.setBaseAndExtent(anchor, anchorOffset, focus, focusOffset);
        } else {
          for (const range of ranges) selection.addRange(range);
        }
      }
      if (scrollX !== x || scrollY !== y) window.scrollTo({ left: x, top: y, behavior: 'instant' });
    }
  }

  async function copy(value) {
    try {
      if (window.isSecureContext && typeof navigator.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      // O método legado também atende contextos sem permissão para Clipboard API.
    }
    try {
      return copyWithTextarea(value);
    } catch {
      return false;
    }
  }

  function announce(status, message, failed) {
    if (!status) return;
    clearTimeout(announceTimer);
    clearTimeout(clearStatusTimer);
    status.textContent = '';
    status.removeAttribute('data-copy-error');
    // Uma breve pausa permite anunciar duas cópias consecutivas do mesmo valor.
    announceTimer = setTimeout(() => {
      status.toggleAttribute('data-copy-error', failed);
      status.textContent = message;
      clearStatusTimer = setTimeout(() => {
        status.textContent = '';
        status.removeAttribute('data-copy-error');
      }, failed ? errorDuration : copiedDuration);
    }, 40);
  }

  // Delegar no documento permite carregar o script antes dos cards.
  document.addEventListener('click', async event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button[data-copy]');
    if (!button) return;

    const request = ++latestRequest;
    const state = states.get(button) ?? { request: 0, timer: undefined };
    state.request = request;
    states.set(button, state);
    const success = await copy(button.dataset.copy);
    if (state.request !== request) return;

    const text = button.querySelector('.contact-copy-text');
    clearTimeout(state.timer);
    button.toggleAttribute('data-copied', success);
    if (text) text.textContent = success ? 'Copiado!' : 'Copiar';

    if (success) {
      state.timer = setTimeout(() => {
        button.removeAttribute('data-copied');
        if (text) text.textContent = 'Copiar';
      }, copiedDuration);
    }
    if (request === latestRequest) {
      announce(document.querySelector('.contact-copy-status'), success
        ? button.dataset.copyLabel + ' copiado para a área de transferência'
        : 'Não foi possível copiar. Selecione e copie manualmente.', !success);
    }
  });
})();
