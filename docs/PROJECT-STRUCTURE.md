# 📊 Estrutura Visual do Projeto

Este documento apresenta uma visão visual e detalhada de como o projeto está organizado.

## 🌳 Árvore de Arquivos Completa

```
My Portfolio/
│
├── 📄 index.html                           # Página principal do portfólio
├── 📄 portfolio - backup.html              # Backup da versão original
├── 📄 Meu Currículo.pdf                   # Currículo em PDF
├── 📄 .gitignore                          # Arquivos ignorados pelo Git
│
├── 📁 assets/                              # Todos os recursos do site
│   │
│   ├── 📁 css/                            # Estilos organizados por responsabilidade
│   │   ├── 🎨 variables.css              # [159 linhas] Variáveis CSS e design tokens
│   │   ├── 🎨 base.css                   # [58 linhas] Reset e estilos fundamentais
│   │   ├── 🎨 layout.css                 # [142 linhas] Estrutura e layouts
│   │   ├── 🎨 components.css             # [184 linhas] Componentes reutilizáveis
│   │   ├── 🎨 projects.css               # [486 linhas] Estilos específicos de projetos
│   │   └── 🎨 animations.css             # [85 linhas] Animações e transições
│   │
│   └── 📁 js/                             # Scripts JavaScript
│       └── ⚡ scroll-animations.js        # [243 linhas] Lógica de scroll e animações
│
└── 📁 docs/                                # Documentação completa
    ├── 📘 README.md                       # Documentação principal
    ├── 📘 ARCHITECTURE.md                 # Arquitetura técnica detalhada
    ├── 📘 CUSTOMIZATION.md                # Guia de customização
    └── 📘 PROJECT-STRUCTURE.md            # Este arquivo
```

---

## 📏 Tamanho dos Arquivos

### Código Fonte

| Arquivo | Linhas de Código | Propósito |
|---------|------------------|-----------|
| `index.html` | ~400 | Estrutura HTML completa |
| `variables.css` | 159 | Tokens de design |
| `base.css` | 58 | Reset e base |
| `layout.css` | 142 | Layouts e estrutura |
| `components.css` | 184 | Componentes UI |
| `projects.css` | 486 | Features de projetos |
| `animations.css` | 85 | Animações |
| `scroll-animations.js` | 243 | Interatividade |
| **TOTAL** | **~1.757** | **Linhas de código** |

### Documentação

| Arquivo | Palavras | Propósito |
|---------|----------|-----------|
| `README.md` | ~1.200 | Visão geral |
| `ARCHITECTURE.md` | ~2.500 | Detalhes técnicos |
| `CUSTOMIZATION.md` | ~2.800 | Guia de customização |
| **TOTAL** | **~6.500** | **Palavras de documentação** |

---

## 🎯 Mapa de Dependências

### Ordem de Carregamento CSS

```
1. variables.css       (Define variáveis globais)
         ↓
2. base.css           (Reset e fundação)
         ↓
3. layout.css         (Estrutura da página)
         ↓
4. components.css     (Componentes reutilizáveis)
         ↓
5. projects.css       (Features específicas)
         ↓
6. animations.css     (Camada de polimento)
```

### Fluxo HTML → CSS → JS

```
index.html
    ├─→ <head>
    │     ├─→ Fonts (Google Fonts)
    │     ├─→ variables.css
    │     ├─→ base.css
    │     ├─→ layout.css
    │     ├─→ components.css
    │     ├─→ projects.css
    │     └─→ animations.css
    │
    ├─→ <body>
    │     ├─→ SVG symbols
    │     ├─→ Header (navegação)
    │     ├─→ Main
    │     │     ├─→ Hero section
    │     │     ├─→ Projects sections
    │     │     └─→ Experience section
    │     └─→ Footer
    │
    └─→ </body>
          └─→ scroll-animations.js (antes de </body>)
```

---

## 🧩 Componentes do Projeto

### Seções Principais (index.html)

```
┌─────────────────────────────────────┐
│           HEADER (sticky)           │
│  Brand | Nav: Projetos Experiência  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│              HERO                   │
│  • Título principal (3 linhas)      │
│  • Descrição                        │
│  • CTAs (Ver projetos, Contato)     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          PROJETO: SAFEVOICE         │
│  • Header (título + meta)           │
│  • Story (steps com scroll)         │
│  • Stage interativo (SVG)           │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│       PROJETO: SALOM FINANCE        │
│  • Header (título + descrição)      │
│  • Steps com cenas interativas      │
│  • Gráficos e visualizações         │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│           EXPERIÊNCIA               │
│  • Timeline de trabalhos            │
│  • Descrições e datas               │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│             FOOTER                  │
│  • Copyright e informações          │
└─────────────────────────────────────┘
```

---

## 🎨 Sistema de Design

### Variáveis CSS (Design Tokens)

```css
/* CORES */
--bg             → Fundo principal
--panel          → Painéis e cards
--ink            → Texto principal
--muted          → Texto secundário
--line           → Bordas
--accent         → Destaque (links, botões)
--signal         → Alertas
--mint           → Sucesso

/* STAGE (Demonstrações) */
--stage          → Fundo de demonstração
--stage-text     → Texto no stage
--stage-muted    → Texto secundário stage
--stage-line     → Linhas no stage

/* DIMENSÕES */
--header         → Altura do header
--safe-top       → Área segura (mobile)

/* TIPOGRAFIA */
--display        → Fonte de títulos
```

### Classes Principais

#### Layout
- `.wrap` - Container com largura máxima
- `.section` - Seção da página
- `.hero` - Seção hero
- `.project-header` - Cabeçalho de projeto

#### Componentes
- `.button` - Botão padrão
- `.button.primary` - Botão primário
- `.meta` - Informações meta
- `.intro` - Texto introdutório
- `.timeline` - Linha do tempo
- `.stage` - Área de demonstração

#### Projetos
- `.story` - Container de história
- `.steps` - Lista de passos
- `.step` - Um passo individual
- `.sf-*` - Componentes do Salom Finance

---

## 📱 Breakpoints Responsivos

```
Mobile First Approach:

0px - 400px (25rem)
├─ Mobile pequeno
├─ Header empilhado
└─ 1 coluna

400px - 672px (42rem)
├─ Mobile/Tablet
├─ 1-2 colunas
└─ Espaçamento ajustado

672px - 848px (53rem)
├─ Tablet/Desktop pequeno
├─ 2 colunas
└─ Mais espaçamento

848px+ (53rem+)
├─ Desktop completo
├─ Scroll animations ativadas
├─ Sticky stages
└─ Layout expandido
```

---

## ⚡ Performance

### Estratégias Implementadas

```
┌─────────────────────────────┐
│    Otimizações de Carga     │
├─────────────────────────────┤
│ ✓ Preconnect para fontes    │
│ ✓ CSS modular (cache)       │
│ ✓ JS assíncrono             │
│ ✓ SVG inline (sem requests) │
└─────────────────────────────┘

┌─────────────────────────────┐
│  Otimizações de Runtime     │
├─────────────────────────────┤
│ ✓ Intersection Observer     │
│ ✓ CSS Custom Properties     │
│ ✓ GPU acceleration          │
│ ✓ Debounce em eventos       │
└─────────────────────────────┘
```

---

## 🔄 Fluxo de Interação

### Scroll-Based Animations

```
1. Página carrega
   ↓
2. DOMContentLoaded event
   ↓
3. initScrollAnimations()
   ↓
4. Intersection Observer setup
   ↓
5. User scrolls
   ↓
6. Observer detecta elemento visível
   ↓
7. Callback executa
   ↓
8. Atualiza CSS custom properties
   ↓
9. CSS anima transição
   ↓
10. Visual feedback
```

---

## 📊 Estatísticas do Projeto

### Complexidade

- **Seções**: 5 principais (Hero, SafeVoice, Salom, Experiência, Contato)
- **Componentes reutilizáveis**: 12+
- **Animações**: 8 principais
- **Breakpoints**: 3 principais
- **Variáveis CSS**: 15+ cores, 3+ dimensões

### Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Acessibilidade

- ✅ WCAG 2.1 Level AA
- ✅ Navegação por teclado
- ✅ ARIA labels
- ✅ Contraste adequado
- ✅ Suporte a leitores de tela

---

## 🎓 Para Estudar

### Conceitos CSS Demonstrados

1. **CSS Custom Properties (Variáveis)**
   - Arquivo: `variables.css`
   - Linha: Todas

2. **CSS Grid**
   - Arquivo: `layout.css`
   - Classes: `.project-header`, `.experience`

3. **Flexbox**
   - Arquivo: `components.css`
   - Classes: `.button`, `.actions`, `.meta`

4. **Media Queries**
   - Arquivo: Todos os CSS
   - Responsividade e tema escuro

5. **CSS Animations**
   - Arquivo: `animations.css`
   - Keyframes e transições

### Conceitos JavaScript Demonstrados

1. **Intersection Observer API**
   - Arquivo: `scroll-animations.js`
   - Função: `initScrollAnimations()`

2. **DOM Manipulation**
   - Arquivo: `scroll-animations.js`
   - Várias funções de atualização

3. **Event Listeners**
   - Arquivo: `scroll-animations.js`
   - DOMContentLoaded

4. **CSS Custom Properties via JS**
   - Arquivo: `scroll-animations.js`
   - `element.style.setProperty()`

---

## 🔍 Como Navegar no Código

### Para entender o layout:
1. Comece com `index.html` - veja a estrutura
2. Depois `layout.css` - entenda os containers
3. Por último `components.css` - veja os blocos

### Para entender as cores:
1. Abra `variables.css`
2. Veja as variáveis definidas
3. Busque `var(--nome)` nos outros arquivos

### Para entender as animações:
1. Veja `animations.css` para as definições
2. Depois `scroll-animations.js` para a lógica
3. Teste mudando valores de `--scene-opacity`

### Para adicionar um projeto:
1. Copie uma `<section>` existente no `index.html`
2. Ajuste IDs e conteúdo
3. Adicione estilos específicos em `projects.css`

---

## 🚀 Próximos Passos

### Implementar
- [ ] Formulário de contato funcional
- [ ] Seção de blog (opcional)
- [ ] Mais projetos
- [ ] Galeria de imagens

### Otimizar
- [ ] Lazy loading de imagens
- [ ] Service Worker
- [ ] Minificação CSS/JS

### Expandir
- [ ] Versão em inglês
- [ ] Tema de alto contraste
- [ ] Mais animações interativas

---

**Criado por**: Eliseu Marinho  
**Data**: Novembro 2026  
**Versão**: 1.0
