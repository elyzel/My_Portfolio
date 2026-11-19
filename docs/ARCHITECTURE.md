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

### Padrão: Vanilla JS com Observers

**Arquivo único**: `scroll-animations.js`

#### Estrutura do Código

```javascript
// 1. Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSalomFinanceScroll();
});

// 2. Funções de Inicialização
function initScrollAnimations() { /* ... */ }
function initSalomFinanceScroll() { /* ... */ }

// 3. Funções de Atualização
function updateStageState(step) { /* ... */ }
function updateSalomScene(stepIndex, scenes) { /* ... */ }

// 4. Funções de Animação
function animateSalomScene(sceneIndex) { /* ... */ }
function animateGoal(scene) { /* ... */ }

// 5. Utilitários
function debounce(func, wait) { /* ... */ }
```

#### Intersection Observer API

**Por que usar?**
- ✅ Performance superior a scroll listeners
- ✅ Detecção precisa de visibilidade
- ✅ Suporte nativo em navegadores modernos

**Implementação**:

```javascript
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Elemento está visível
                entry.target.setAttribute('aria-current', 'step');
                updateStageState(entry.target);
            }
        });
    },
    {
        threshold: 0.6,              // 60% visível
        rootMargin: '-20% 0px -20% 0px'  // Área de detecção
    }
);
```

#### Gerenciamento de Estado

**Estado via CSS Custom Properties**:

```javascript
// JavaScript manipula variáveis CSS
scene.style.setProperty('--goal', '0.75');
scene.style.setProperty('--opacity', '1');
```

```css
/* CSS reage às variáveis */
.sf-cube i {
    height: calc(var(--goal, 0) * 100%);
}
```

**Vantagens**:
- ✅ CSS cuida da transição suave
- ✅ JavaScript apenas atualiza valores
- ✅ Separação de responsabilidades

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

### Mobile-First Approach

**Base**: Design para mobile
```css
.wrap {
    width: calc(100% - 2rem);  /* Mobile primeiro */
}
```

**Enhancement**: Melhorias progressivas
```css
@media (min-width: 42rem) {
    .wrap {
        width: calc(100% - 3rem);  /* Mais espaço em telas maiores */
    }
}
```

### Breakpoints Estratégicos

| Breakpoint | Tamanho | Propósito |
|------------|---------|-----------|
| `25rem` | 400px | Smartphones pequenos |
| `42rem` | 672px | Tablets |
| `53rem` | 848px | Desktop - scroll animations |

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

```html
<!-- Navegação -->
<nav aria-label="Navegação principal">

<!-- Seção de projeto -->
<section aria-labelledby="safevoice-title">

<!-- Estado atual -->
<li aria-current="step">
```

### Respeito a Preferências

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

---

## 🔄 Fluxo de Dados

### Scroll-Triggered State Management

```
User Scrolls
    ↓
Intersection Observer detecta
    ↓
JavaScript callback executa
    ↓
Atualiza CSS Custom Properties
    ↓
CSS anima transição
    ↓
Visual feedback ao usuário
```

### Exemplo Completo: SafeVoice

```
1. Usuário rola até step "Enviar localização"
2. Observer detecta: entry.isIntersecting = true
3. JS executa: updateStageState(step)
4. JS adiciona classe: .stage-location
5. CSS ativa: --location: 1
6. SVG mostra: location pin (opacity animada)
```

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
