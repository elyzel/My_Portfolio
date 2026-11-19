# 🏗 Arquitetura do Projeto

Este documento detalha a arquitetura técnica do portfólio, explicando decisões de design, padrões utilizados e como os diferentes componentes interagem.

## 📐 Visão Geral

O projeto segue uma arquitetura **modular e em camadas**, separando claramente as responsabilidades de cada parte do código.

```
┌─────────────────────────────────────┐
│         Camada de Apresentação      │
│            (index.html)             │
└─────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        ↓                 ↓
┌───────────────┐  ┌──────────────────┐
│  Camada de    │  │   Camada de      │
│   Estilo      │  │  Comportamento   │
│  (CSS files)  │  │  (JavaScript)    │
└───────────────┘  └──────────────────┘
```

---

## 🎨 Arquitetura CSS

### Estratégia: CSS Modular com Variáveis

O CSS está dividido em **6 arquivos especializados**, cada um com uma responsabilidade única:

#### 1. **variables.css** - Camada de Design Tokens
```css
:root {
    /* Cores, espaçamentos, fontes */
}
```

**Propósito**: Centralizar todas as variáveis de design
- ✅ Facilita mudanças globais de tema
- ✅ Mantém consistência visual
- ✅ Suporte a tema escuro via media query

#### 2. **base.css** - Camada de Reset e Fundação
```css
*, html, body, h1, h2, h3, p, a { /* ... */ }
```

**Propósito**: Normalizar comportamento de elementos HTML
- ✅ Remove inconsistências entre navegadores
- ✅ Define tipografia base
- ✅ Configura foco para acessibilidade

#### 3. **layout.css** - Camada de Estrutura
```css
.wrap, header, .hero, .section { /* ... */ }
```

**Propósito**: Definir estruturas macro da página
- ✅ Grid e flexbox para layouts
- ✅ Containers responsivos
- ✅ Seções principais

#### 4. **components.css** - Camada de Componentes
```css
.button, .meta, .timeline, .stage { /* ... */ }
```

**Propósito**: Componentes reutilizáveis
- ✅ Botões, cards, meta info
- ✅ Timeline de experiências
- ✅ Componentes de demonstração (stages)

#### 5. **projects.css** - Camada de Features
```css
.project-header, .sf-*, .steps { /* ... */ }
```

**Propósito**: Estilos específicos de projetos
- ✅ SafeVoice
- ✅ Salom Finance (prefixo `sf-`)
- ✅ Visualizações de dados

#### 6. **animations.css** - Camada de Interação
```css
@keyframes, @media (prefers-reduced-motion) { /* ... */ }
```

**Propósito**: Animações e transições
- ✅ Respeita preferências de acessibilidade
- ✅ Scroll-triggered animations
- ✅ Micro-interações

### Fluxo de Cascata

```
variables.css (tokens)
    ↓
base.css (fundação)
    ↓
layout.css (estrutura)
    ↓
components.css (blocos reutilizáveis)
    ↓
projects.css (features específicas)
    ↓
animations.css (camada de polimento)
```

### Nomenclatura de Classes

**Convenções seguidas**:

1. **BEM-like para componentes**
   ```css
   .sf-card           /* Bloco */
   .sf-card__header   /* Elemento */
   .sf-card--active   /* Modificador */
   ```

2. **Prefixos semânticos**
   - `sf-*`: Salom Finance
   - `timeline-*`: Componentes de timeline
   - `stage-*`: Áreas de demonstração

3. **Nomes descritivos**
   - `.hero` ao invés de `.section-1`
   - `.intro` ao invés de `.text`

---

## 💻 Arquitetura JavaScript

| Arquivo | Responsabilidade |
|---------|------------------|
| `site-navigation.js` | Observa as seções logo abaixo do cabeçalho com `IntersectionObserver` e atualiza `aria-current="true"` no menu. Mede a altura real do cabeçalho com `ResizeObserver`. |
| `scroll-animations.js` | Monta e desmonta os palcos. Carrega Three.js r128 ao chegar ao palco do Salom em uma tela compatível. |
| `projects.js` | Gera cards e painéis a partir de `#project-template`. Controla seleção, histórico, foco, setas, indicadores e swipe. |
| `digital-rain.js` | Desenha o fundo do hero em um canvas 2D decorativo, carregado com `defer`. |
| `contact.js` | Delega a cópia dos valores em `data-copy`. Usa Clipboard API em contexto seguro e um `textarea` temporário como alternativa. |

#### Ações de contato

O link principal cobre os cards de e-mail e WhatsApp. O botão de cópia fica fora do link e acima da área clicável. A ordem de foco segue link e botão. Cada botão tem seu temporizador, e a região `role="status"` anuncia o resultado da ação mais recente.

#### Chuva digital do hero

Duas camadas usam atlas de `0` e `1`, estados em arrays tipados e limpeza integral do canvas antes de cada quadro. A zona calma mede o título, o parágrafo e as ações. O fundo e o texto mantêm os tokens e as dimensões do site.

O `ResizeObserver` agenda a medição após 150 ms. `IntersectionObserver` e `visibilitychange` pausam o laço. O tema atualiza a cor dos atlas e a escala de opacidade. Com movimento reduzido, o canvas mostra um quadro estático.

#### Estado da seção Projetos

- A vitrine abre por padrão. Selecionar um card abre o painel, e fechar o painel volta à vitrine. Com vários projetos, Anterior e Próximo percorrem a lista de forma circular.
- `history.pushState` atualiza o fragmento. `popstate` e `hashchange` restauram a seleção. `#salom` continua válido.
- A abertura foca o título do painel. Esc devolve o foco ao card, e `.project-announcement` anuncia a seleção.
- O painel entra na direção da navegação em 300 ms. O projeto anterior libera observadores, listeners e WebGL antes da montagem do próximo. Com movimento reduzido, a troca é imediata.

---

## 🎭 Sistema de Temas

### Tema Claro/Escuro Automático

**Implementação via media query**:

```css
:root {
    --bg: #f3f5f2;  /* Claro por padrão */
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: #121e1d;  /* Escuro no tema escuro */
    }
}
```

**Fluxo**:
1. Sistema operacional define preferência
2. Browser detecta via `prefers-color-scheme`
3. CSS aplica variáveis correspondentes
4. Sem JavaScript necessário!

---

## 📱 Estratégia Responsiva

| Condição | Layout |
|----------|--------|
| Até `36rem` | Cabeçalho empilhado com quebra de links |
| Até `42rem` | Detalhe e contato em uma coluna, setas de projeto compactas |
| Acima de `42rem` | Detalhe em duas colunas, cards sociais lado a lado |
| A partir de `53rem` × `38rem` | Palco sticky quando o movimento é permitido |

Desktop e celular usam o mesmo painel. O swipe fica restrito ao painel.

### Unidades Responsivas

```css
/* Clamp: min, ideal, max */
font-size: clamp(1.5rem, 3vw, 2.5rem);

/* Min: escolhe o menor */
width: min(100% - 3rem, 72rem);

/* Max: escolhe o maior */
padding: max(1rem, env(safe-area-inset-top));
```

---

## ⚡ Performance

### Estratégias Implementadas

1. **CSS Modular**
   - Carregamento paralelo de arquivos
   - Cache eficiente

2. **JavaScript Assíncrono**
   - Carrega após HTML
   - Não bloqueia renderização

3. **Preconnect de Fontes**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   ```

4. **Intersection Observer**
   - Alternativa performática a scroll listeners
   - Processamento nativo do browser

5. **CSS Custom Properties**
   - Animações via GPU
   - Melhor que manipular classes

### Métricas Esperadas

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Total Blocking Time**: < 200ms

---

## ♿ Acessibilidade

### Princípios POUR

1. **Perceivable** (Perceptível)
   - Contraste adequado (WCAG AA)
   - Textos alternativos em imagens
   - Tema escuro disponível

2. **Operable** (Operável)
   - Navegação por teclado
   - `:focus-visible` indicators
   - Áreas de clique adequadas (min 44x44px)

3. **Understandable** (Compreensível)
   - HTML semântico
   - Labels claros
   - Hierarquia de headings

4. **Robust** (Robusto)
   - Válido HTML5
   - Compatibilidade com assistive technologies
   - Fallbacks apropriados

### ARIA Attributes

- **Menu e indicadores** — `aria-current="true"` identifica a seção visível e o projeto selecionado em seus respectivos grupos.
- **Cards e painel** — Os botões da vitrine apontam para o painel com `aria-controls` e refletem a seleção com `aria-expanded`. O título rotula o artigo.
- **Anúncios e passos** — `.project-announcement` usa `aria-live="polite"`. O passo atual de cada história usa `aria-current="step"`.

### Respeito a Preferências

Com `prefers-reduced-motion: reduce`, o painel troca sem animação, as histórias usam palcos 2D estáticos e os botões primários mudam de cor sem transição.

---

## 🔄 Fluxo de Dados

1. `projects.js` abre a vitrine por padrão e resolve a seleção quando o fragmento aponta para um projeto.
2. Se houver animação, o template correspondente é clonado em **Veja funcionando**. Sua montagem devolve uma função de desmontagem.
3. `requestAnimationFrame` e `progress()` convertem a posição da linha de leitura na cena atual. As coordenadas dos passos são recalculadas quando o layout muda, inclusive após alterações de altura do primeiro passo.
4. O palco do Salom tenta iniciar WebGL quando entra na área visível. As cenas 2D assumem quando o contexto ou o script do Three.js estiverem indisponíveis.

---

## 🧩 Padrões de Design

### 1. **Observer Pattern**
- Intersection Observer para detectar scroll
- Callbacks desacoplados

### 2. **Separation of Concerns**
- HTML: Estrutura
- CSS: Apresentação
- JS: Comportamento

### 3. **Progressive Enhancement**
- Funciona sem JS (conteúdo visível)
- JS adiciona experiência melhorada
- CSS moderno com fallbacks

### 4. **DRY (Don't Repeat Yourself)**
- Variáveis CSS reutilizáveis
- Funções JS modulares
- Componentes CSS reutilizáveis

---

## 🔮 Futuras Melhorias

### Performance
- [ ] Lazy loading de imagens
- [ ] Service Worker para cache
- [ ] Critical CSS inline

### Features
- [ ] Filtros de projetos
- [ ] Formulário de contato
- [ ] Modo de contraste alto

### Acessibilidade
- [ ] Skip links
- [ ] Atalhos de teclado customizados
- [ ] Suporte a mais idiomas

---

## 📚 Referências

- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

---

**Mantido por**: Eliseu Marinho  
**Última atualização**: Novembro 2026
