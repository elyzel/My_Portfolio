# 📊 Estrutura Visual do Projeto

Este documento apresenta uma visão visual e detalhada de como o projeto está organizado.

## 🌳 Árvore de Arquivos Completa

```
My Portfolio/
│
├── 📄 index.html                           # Página principal do portfólio
├── 📄 Meu Currículo.pdf                   # Currículo em PDF
├── 📄 .gitignore                          # Arquivos ignorados pelo Git
│
├── 📁 assets/                              # Todos os recursos do site
│   │
│   ├── 📁 css/                            # Estilos organizados por responsabilidade
│   │   ├── 🎨 variables.css              # Variáveis CSS e design tokens
│   │   ├── 🎨 base.css                   # Reset e estilos fundamentais
│   │   ├── 🎨 layout.css                 # Estrutura e layouts
│   │   ├── 🎨 components.css             # Componentes reutilizáveis
│   │   ├── 🎨 projects.css               # Estilos específicos de projetos
│   │   └── 🎨 animations.css             # Animações e transições
│   │
│   └── 📁 js/                             # Scripts JavaScript
│       ├── site-navigation.js            # Seção ativa e altura do cabeçalho
│       ├── scroll-animations.js          # Palcos e cópia de e-mail
│       └── projects.js                   # Vitrine, detalhes e navegação
│
└── 📁 docs/                                # Documentação completa
    ├── 📘 README.md                       # Documentação principal
    ├── 📘 QUICK-START.md                  # Início rápido
    ├── 📘 ARCHITECTURE.md                 # Arquitetura técnica detalhada
    ├── 📘 CUSTOMIZATION.md                # Guia de customização
    └── 📘 PROJECT-STRUCTURE.md            # Este arquivo
```

---

## 📏 Tamanho dos Arquivos

`index.html` carrega seis folhas de estilo e três scripts. Cada módulo tem um papel descrito na árvore acima. O currículo é um PDF servido diretamente pela página.

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

1. O `<head>` carrega as fontes e as seis folhas de estilo.
2. O `<main>` contém Sobre (`#inicio`), Experiência, Stack, Projetos e Contato. O template dos cards e os templates dos palcos ficam junto de Projetos.
3. Após o rodapé, `site-navigation.js` observa as seções. `scroll-animations.js` registra os controladores das demonstrações. `projects.js` usa esses controladores ao montar a seleção.

---

## 🧩 Componentes do Projeto

### Seções Principais (index.html)

| Seção | Componentes |
|-------|-------------|
| Sobre | Hero com apresentação e botões Ver projetos e Falar comigo |
| Experiência | Linha do tempo profissional |
| Stack | Linguagens, web, ferramentas e automação, segurança |
| Projetos | Vitrine, setas, indicadores, painel e demonstração sob demanda |
| Contato | Cards de E-mail, LinkedIn e GitHub e download centralizado do currículo |

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

- `.project-heading` e `.project-pagination` — Setas e indicadores
- `.project-body` — Conteúdo e dados do painel
- `.project-animation-slot` — Seção “Veja funcionando”
- `.story` - Container de história
- `.steps` - Lista de passos
- `.step` - Um passo individual
- `.sf-*` - Componentes do Salom Finance

---

## 📱 Breakpoints Responsivos

- Até 36rem, o cabeçalho é empilhado e admite uma linha adicional de links.
- Até 42rem, o painel e o contato usam uma coluna. As setas exibem só os glifos e mantêm os nomes acessíveis.
- A partir de 53rem de largura e 38rem de altura, as histórias usam palco sticky quando o movimento é permitido. Em telas menores ou com movimento reduzido, mostram mini-palcos 2D.

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

1. A vitrine é o estado inicial. Um link direto para um projeto abre o painel correspondente. Fechar o painel volta à vitrine.
2. Setas, indicadores, teclado e swipe selecionam um projeto e atualizam histórico, foco e anúncio acessível.
3. A troca desmonta o palco anterior. O novo palco, quando presente, aparece abaixo de **Veja funcionando**.
4. Ao rolar, o controlador calcula o progresso pela posição dos passos. O menu destaca a seção abaixo do cabeçalho.

---

## 📊 Estatísticas do Projeto

### Complexidade

- **Seções**: 5 principais (Sobre, Experiência, Stack, Projetos, Contato)
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

1. Acrescente o objeto à lista em `assets/js/projects.js` com um ID único.
2. Use `animacao: null` para mostrar só o painel. O card, o painel, o indicador e o fragmento são gerados a partir da lista.

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
