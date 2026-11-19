(() => {
  const projects = [
    {
      id: 'salom',
      titulo: 'Salom Finance',
      logo: '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5v22h22M9 21l6-7 5 3 7-10m-6 0h6v6"/></svg>',
      resumo: 'Orçamento mensal, metas e investimentos em um só painel.',
      chips: ['Python', 'PDF'],
      descricao: [
        'Monte seu orçamento mensal e acompanhe quanto sobra depois das despesas. Registre transações manualmente ou importe um extrato em PDF. O Salom usa palavras-chave das descrições para categorizar gastos, como Mercado e Lazer.',
        'Registre também seus aportes em CDB e ações negociadas na bolsa e acompanhe a evolução do patrimônio investido em um painel mensal.'
      ],
      problema: 'O Salom Finance ajuda a organizar as finanças domésticas.',
      stack: ['Python'],
      funcionalidades: [
        'Registro manual de transações e importação de extratos bancários em PDF.',
        'Orçamento mensal com receita fixa, despesas fixas, aportes e saldo disponível.',
        'Metas de economia com acompanhamento do percentual concluído.',
        'Painel de movimentações em períodos diário, trimestral, semestral e anual.',
        'Aportes em CDB e ações com metas próprias e acompanhamento do patrimônio.'
      ],
      decisoesTecnicas: [
        { texto: 'Os lançamentos importados são categorizados por palavras-chave nas descrições.' },
        { titulo: 'Segurança', texto: 'Os registros são guardados em um arquivo criptografado. O arquivo criptografado pode ser importado no Salom com a chave correta.', seguranca: true }
      ],
      status: 'Projeto pessoal · Aplicação web',
      dados: 'Dados fictícios',
      github: 'https://github.com/elyzel/Salom_Finance',
      demo: null,
      animacao: 'salom'
    },
    {
      id: 'safevoice',
      titulo: 'SafeVoice',
      logo: '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3l10 4v8c0 6-4 11-10 14-6-3-10-8-10-14V7l10-4Z"/><path d="M10 16h3l2-4 2 8 2-4h3"/></svg>',
      resumo: 'Alertas de emergência com localização em tempo real.',
      chips: ['Python', 'Dart', 'Flutter'],
      descricao: [
        'Protótipo de segurança pessoal que envia a localização em tempo real e avisa contatos de confiança quando um alerta de emergência é acionado.'
      ],
      stack: ['Python', 'Dart', 'Flutter'],
      funcionalidades: [
        'Acionar o alerta de emergência pelo botão de volume ou de ligar do celular.',
        'Compartilhar a localização em tempo real no alerta.',
        'Notificar os contatos de confiança.'
      ],
      status: 'Protótipo',
      ano: 2026,
      destaque: '2º lugar na FETIN 2026',
      github: null,
      demo: null,
      animacao: 'safevoice'
    }
  ];

  const header = document.querySelector('body > header');
  const showcase = document.querySelector('#projetos');
  const template = document.querySelector('#project-template');
  const cardList = showcase.querySelector('.project-cards');
  const detailSlot = showcase.querySelector('.project-detail-slot');
  const animationSlot = showcase.querySelector('.project-animation-slot');
  const animationStage = showcase.querySelector('.project-animation-stage');
  const announcement = showcase.querySelector('.project-announcement');
  const previousButton = showcase.querySelector('.project-previous');
  const nextButton = showcase.querySelector('.project-next');
  const pagination = showcase.querySelector('.project-pagination');
  const indicator = pagination.querySelector('.project-indicator');
  const dots = pagination.querySelector('.project-dots');
  const hoverGlow = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let active = null;
  let unmountStory = null;
  let panelTransition = null;
  let swipe = null;

  function addText(parent, tag, value, className) {
    const element = document.createElement(tag);
    element.textContent = value;
    if (className) element.className = className;
    parent.append(element);
    return element;
  }

  function addGroup(parent, label) {
    const group = document.createElement('section');
    addText(group, 'h4', label);
    parent.append(group);
    return group;
  }

  function renderProject(project) {
    const item = template.content.firstElementChild.cloneNode(true);
    const button = item.querySelector('.project-card');
    const logo = item.querySelector('.project-logo');
    const cardTitle = item.querySelector('.project-card-title');
    const panel = item.querySelector('.project-detail');
    const title = panel.querySelector('h3');
    const meta = panel.querySelector('.project-meta');
    const info = panel.querySelector('.project-info');
    const facts = panel.querySelector('.project-facts');

    cardTitle.textContent = title.textContent = project.titulo;
    cardTitle.id = 'project-card-' + project.id;
    title.id = 'project-title-' + project.id;
    panel.id = 'project-detail-' + project.id;
    panel.setAttribute('aria-labelledby', title.id);
    button.setAttribute('aria-labelledby', cardTitle.id);
    button.setAttribute('aria-controls', panel.id);
    logo.setAttribute('aria-hidden', 'true');
    if (project.logo) logo.innerHTML = project.logo;
    else logo.textContent = project.titulo.split(/\s+/).slice(0, 2).map(word => word[0]).join('');

    const summary = item.querySelector('.project-summary');
    const chips = item.querySelector('.project-chips');
    summary.id = 'project-summary-' + project.id;
    summary.textContent = project.resumo;
    const descriptions = [summary.id];
    for (const chip of project.chips ?? []) addText(chips, 'span', chip);
    if (project.destaque) {
      const badge = item.querySelector('.project-badge');
      badge.id = 'project-badge-' + project.id;
      badge.textContent = project.destaque;
      badge.hidden = false;
      descriptions.push(badge.id);
    }
    button.setAttribute('aria-describedby', descriptions.join(' '));
    meta.textContent = [project.status, project.ano].filter(Boolean).join(' · ');
    meta.hidden = !meta.textContent;

    for (const paragraph of project.descricao ?? []) addText(info, 'p', paragraph, 'intro');
    if (project.problema) addText(addGroup(info, 'O problema'), 'p', project.problema);
    if (project.meuPapel) addText(addGroup(info, 'Meu papel'), 'p', project.meuPapel);
    if (project.funcionalidades?.length) {
      const list = document.createElement('ul');
      for (const feature of project.funcionalidades) addText(list, 'li', feature);
      addGroup(info, 'Funcionalidades').append(list);
    }
    if (project.decisoesTecnicas?.length) {
      const group = addGroup(info, 'Decisões técnicas');
      for (const decision of project.decisoesTecnicas) {
        const paragraph = addText(group, 'p', decision.texto, decision.seguranca ? 'project-security' : '');
        if (decision.titulo) {
          const label = document.createElement('strong');
          label.textContent = decision.titulo;
          paragraph.prepend(label);
        }
      }
    }
    if (project.stack?.length) {
      const tags = document.createElement('ul');
      tags.className = 'stack-tags';
      tags.setAttribute('role', 'list');
      for (const technology of project.stack) addText(tags, 'li', technology);
      addGroup(facts, 'Tecnologias').append(tags);
    }
    if (project.status || project.ano) {
      const data = document.createElement('dl');
      for (const [label, value] of [['Status', project.status], ['Ano', project.ano]]) {
        if (!value) continue;
        addText(data, 'dt', label);
        addText(data, 'dd', value);
      }
      facts.append(data);
    }
    if (project.destaque) addText(addGroup(facts, 'Destaque'), 'p', project.destaque);
    if (project.dados) addText(facts, 'p', project.dados, 'project-data');
    facts.hidden = !facts.childElementCount;

    const github = panel.querySelector('.project-github');
    const demo = panel.querySelector('.project-demo');
    if (project.github) {
      github.href = project.github;
      github.hidden = false;
    } else {
      panel.querySelector('.project-private').hidden = false;
    }
    if (project.demo) {
      demo.href = project.demo;
      demo.hidden = false;
    }

    cardList.append(item);
    return { project, item, button, panel, title };
  }

  const entries = projects.map(renderProject);
  const byId = new Map(entries.map(entry => [entry.project.id, entry]));
  const fragments = showcase.querySelector('.project-fragments');

  function openAnimation() {
    const name = active.project.animacao;
    if (!name) return;
    const story = document.getElementById('story-' + name).content.firstElementChild.cloneNode(true);
    animationStage.append(story);
    animationSlot.hidden = false;
    unmountStory = projectStories[name](story);
  }

  function select(next, { focus = false, reveal = false, direction = 0 } = {}) {
    if (next === active) return;
    const previous = active;

    panelTransition?.cancel();
    panelTransition = null;
    swipe = null;
    unmountStory?.();
    unmountStory = null;
    animationStage.replaceChildren();
    animationSlot.hidden = true;

    if (previous) {
      previous.button.setAttribute('aria-expanded', 'false');
      previous.dot.removeAttribute('aria-current');
      previous.panel.hidden = true;
      previous.item.append(previous.panel);
    }

    active = next;
    cardList.hidden = Boolean(active);
    detailSlot.hidden = !active;
    pagination.hidden = nextButton.hidden = previousButton.hidden = !active || entries.length < 2;

    if (active) {
      active.button.setAttribute('aria-expanded', 'true');
      active.dot.setAttribute('aria-current', 'true');
      active.panel.hidden = false;
      detailSlot.append(active.panel);
      indicator.textContent = (entries.indexOf(active) + 1) + ' de ' + entries.length + ' · ' + active.project.titulo;
      openAnimation();
      if (direction && motionAllowed.matches && typeof active.panel.animate === 'function') {
        panelTransition = active.panel.animate([
          { opacity: .55, transform: 'translateX(' + direction * 20 + 'px)' },
          { opacity: 1, transform: 'none' }
        ], { duration: 300, easing: 'cubic-bezier(.22,.75,.25,1)' });
      }
    }

    const focusTarget = active?.title ?? previous?.button;
    if (focus) focusTarget?.focus({ preventScroll: true });
    if (reveal && focusTarget) {
      const target = active?.panel ?? focusTarget;
      const bounds = target.getBoundingClientRect();
      const headerBottom = header.getBoundingClientRect().bottom;
      if (bounds.top < headerBottom || focusTarget.getBoundingClientRect().bottom > innerHeight) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }
    announcement.textContent = active ? 'Projeto ' + active.project.titulo + ' aberto' : 'Projeto fechado';
  }

  function choose(next, direction = 0) {
    if (next === active) return;
    const hash = next ? '#projetos/' + next.project.id : '#projetos';
    history.pushState(history.state, '', hash);
    select(next, { focus: true, reveal: true, direction });
  }

  function move(direction) {
    if (!active || entries.length < 2) return;
    const index = entries.indexOf(active);
    choose(entries[(index + direction + entries.length) % entries.length], direction);
  }

  function route() {
    const hash = location.hash;
    if (hash === '#salom') return byId.get('salom');
    if (hash.startsWith('#projetos/')) return byId.get(hash.slice('#projetos/'.length));
    if (!hash || hash === '#projetos') return null;
    return undefined;
  }

  function syncRoute() {
    const next = route();
    if (next === undefined) return;
    select(next, { focus: showcase.contains(document.activeElement) });
  }

  for (const [index, entry] of entries.entries()) {
    const { button, panel, project } = entry;
    const anchor = document.createElement('span');
    anchor.id = 'projetos/' + project.id;
    fragments.append(anchor);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Ir para ' + project.titulo);
    dot.setAttribute('aria-controls', 'project-detail-slot');
    dots.append(dot);
    entry.dot = dot;

    dot.addEventListener('click', () => choose(entry, Math.sign(index - entries.indexOf(active))));
    button.addEventListener('click', () => choose(entry));
    panel.querySelector('.project-close').addEventListener('click', () => choose(null));
    button.addEventListener('pointermove', event => {
      if (!hoverGlow.matches || event.pointerType === 'touch') return;
      button.style.setProperty('--mx', event.offsetX + 'px');
      button.style.setProperty('--my', event.offsetY + 'px');
    });
  }

  previousButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  showcase.addEventListener('keydown', event => {
    if (!active || entries.length < 2 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });

  addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !active || event.defaultPrevented) return;
    const focused = document.activeElement;
    const bounds = showcase.getBoundingClientRect();
    if (!showcase.contains(focused) &&
        !(focused === document.body && bounds.top < innerHeight && bounds.bottom > header.offsetHeight)) return;
    event.preventDefault();
    choose(null);
  });

  detailSlot.addEventListener('pointerdown', event => {
    if (entries.length < 2 || event.pointerType !== 'touch' || !event.isPrimary ||
        event.target.closest('a, button')) return;
    swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  detailSlot.addEventListener('pointerup', event => {
    if (swipe?.id !== event.pointerId) return;
    const distanceX = event.clientX - swipe.x;
    const distanceY = event.clientY - swipe.y;
    swipe = null;
    if (Math.abs(distanceX) >= 50 && Math.abs(distanceX) > Math.abs(distanceY) * 1.25) {
      move(distanceX < 0 ? 1 : -1);
    }
  });
  detailSlot.addEventListener('pointercancel', () => { swipe = null; });

  motionAllowed.addEventListener('change', () => panelTransition?.cancel());
  addEventListener('popstate', syncRoute);
  addEventListener('hashchange', syncRoute);

  const initial = route();
  select(initial ?? null, { focus: Boolean(initial) });
  if (initial && performance.getEntriesByType('navigation')[0]?.type !== 'back_forward') {
    showcase.scrollIntoView({ behavior: 'instant' });
    const initialHash = location.hash;
    // A navegação nativa da âncora pode redefinir o foco ao terminar o carregamento.
    addEventListener('load', () => {
      requestAnimationFrame(() => {
        if (active === initial && location.hash === initialHash && document.activeElement === document.body) {
          initial.title.focus({ preventScroll: true });
        }
      });
    }, { once: true });
  }
})();
