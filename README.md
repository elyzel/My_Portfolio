# 🎨 Portfólio Profissional - Eliseu Marinho

> Portfólio web moderno e responsivo, desenvolvido com HTML5, CSS3 e JavaScript vanilla

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌟 Visão Geral

Este é um portfólio profissional desenvolvido seguindo as **melhores práticas de desenvolvimento web**:

- ✅ **Arquitetura Modular**: Código organizado e fácil de manter
- ✅ **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
- ✅ **Acessibilidade**: WCAG 2.1 Level AA
- ✅ **Performance**: Carregamento rápido e otimizado
- ✅ **Tema Claro/Escuro**: Suporte automático
- ✅ **Zero Dependências**: Vanilla JS - sem frameworks

### 📋 Seções do Portfólio

1. **Hero** - Apresentação com nome, descrição e botões de ação
2. **SafeVoice** - App de segurança pessoal (animações 2D CSS/SVG)
3. **Salom Finance** - App financeiro (animações 3D Three.js)
4. **Experiência** - Timeline profissional
5. **Stack Técnica** - Linguagens, web e ferramentas
6. **Contato** - Cards de email/LinkedIn com botão copiar

---

## 📂 Estrutura do Projeto

```
My Portfolio/
│
├── 📄 index.html              # Página principal
│
├── 📁 assets/                 # Recursos do projeto
│   ├── css/                   # Estilos organizados
│   │   ├── variables.css     # Tokens de design
│   │   ├── base.css          # Reset e base
│   │   ├── layout.css        # Layouts
│   │   ├── components.css    # Componentes
│   │   ├── projects.css      # Projetos
│   │   └── animations.css    # Animações
│   │
│   └── js/                    # Scripts
│       └── scroll-animations.js
│
└── 📁 docs/                   # Documentação completa
    ├── README.md             # Doc principal
    ├── QUICK-START.md        # Início rápido (5 min)
    ├── ARCHITECTURE.md       # Arquitetura técnica
    ├── CUSTOMIZATION.md      # Guia de customização
    └── PROJECT-STRUCTURE.md  # Estrutura detalhada
```

---

## 🚀 Quick Start

### 1. Clone ou baixe o projeto
```bash
git clone [seu-repositorio]
cd "My Portfolio"
```

### 2. Abra no navegador

**Opção A: Duplo clique**
- Dê duplo clique em `index.html`

**Opção B: Servidor local** (recomendado)
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### 3. Comece a personalizar! 🎨

Siga o [**Quick Start Guide**](./docs/QUICK-START.md) para fazer suas primeiras modificações em **5 minutos**.

---

## 📖 Documentação

| Documento | Descrição | Tempo de leitura |
|-----------|-----------|------------------|
| [**Quick Start**](./docs/QUICK-START.md) | Comece em 5 minutos | ⏱️ 5 min |
| [**README Completo**](./docs/README.md) | Visão geral detalhada | ⏱️ 15 min |
| [**Architecture**](./docs/ARCHITECTURE.md) | Arquitetura técnica | ⏱️ 25 min |
| [**Customization**](./docs/CUSTOMIZATION.md) | Guia de personalização | ⏱️ 20 min |
| [**Project Structure**](./docs/PROJECT-STRUCTURE.md) | Estrutura visual | ⏱️ 10 min |

---

## 🎯 Features

### Projetos Destacados

#### 🔐 SafeVoice
- Aplicativo de segurança pessoal
- 🏆 2º lugar na FETIN 2026
- Python • Dart • Flutter

#### 💰 Salom Finance
- Gerenciador financeiro pessoal
- Controle de orçamento e investimentos
- Python • Web App

### Características Técnicas

- 🎨 **CSS Modular**: 6 arquivos especializados
- ⚡ **Intersection Observer**: Animações performáticas
- 📱 **Mobile First**: Design responsivo
- ♿ **A11Y**: Navegação por teclado e leitores de tela
- 🌓 **Auto Theme**: Tema claro/escuro automático
- 🎭 **CSS Variables**: Customização fácil

---

## 🛠 Tecnologias

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos avançados
  - CSS Grid & Flexbox
  - Custom Properties
  - Animações nativas
- **JavaScript**: Interatividade
  - Vanilla JS (zero frameworks)
  - Intersection Observer API

### Design
- **Fontes**: Google Fonts
  - Bricolage Grotesque
  - Instrument Sans

---

## 🎨 Customização

### Cores

Edite `assets/css/variables.css`:

```css
:root {
    --accent: #086957;    /* Sua cor de destaque */
    --bg: #f3f5f2;        /* Cor de fundo */
    --ink: #102725;       /* Cor do texto */
}
```

### Conteúdo

Edite `index.html`:

```html
<!-- Seu nome -->
<a class="brand" href="#inicio">Seu Nome</a>

<!-- Seu título -->
<h1>
    <span>Seu título</span>
    <span>profissional</span>
    <span>aqui.</span>
</h1>
```

**📘 Guia completo**: [CUSTOMIZATION.md](./docs/CUSTOMIZATION.md)

---

## 📱 Responsividade

O site se adapta perfeitamente a todos os tamanhos de tela:

| Dispositivo | Breakpoint | Layout |
|-------------|------------|--------|
| 📱 Mobile pequeno | < 400px | 1 coluna, header empilhado |
| 📱 Mobile | 400px - 672px | 1-2 colunas |
| 📱 Tablet | 672px - 848px | 2 colunas |
| 💻 Desktop | > 848px | Layout completo + animações |

---

## ♿ Acessibilidade

- ✅ **WCAG 2.1 Level AA**
- ✅ Navegação por teclado
- ✅ ARIA labels apropriadas
- ✅ Contraste adequado
- ✅ Foco visível
- ✅ Semântica HTML5
- ✅ Respeita `prefers-reduced-motion`

---

## ⚡ Performance

### Otimizações Implementadas

- ✅ CSS modular (cache eficiente)
- ✅ JavaScript assíncrono
- ✅ Preconnect para fontes
- ✅ Intersection Observer (não scroll listeners)
- ✅ CSS Custom Properties (GPU)
- ✅ SVG inline (sem requests HTTP)

### Métricas Esperadas

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Total Blocking Time**: < 200ms

---

## 🌐 Compatibilidade

| Navegador | Versão Mínima |
|-----------|---------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile (iOS/Android) | ✅ |

---

## 📊 Estatísticas

- **Linhas de código**: ~1.757
- **Arquivos CSS**: 6
- **Arquivos JS**: 1
- **Componentes**: 12+
- **Seções**: 5
- **Documentação**: ~6.500 palavras

---

## 🎓 Para Estudar

Este projeto é excelente para aprender:

### CSS
- ✅ CSS Custom Properties (variáveis)
- ✅ CSS Grid e Flexbox
- ✅ Media Queries
- ✅ Animações e Transitions
- ✅ Metodologia modular

### JavaScript
- ✅ Intersection Observer API
- ✅ DOM Manipulation
- ✅ Event Listeners
- ✅ ES6+ features

### Boas Práticas
- ✅ Separação de responsabilidades
- ✅ Código modular
- ✅ Documentação completa
- ✅ Nomenclatura semântica
- ✅ Arquitetura escalável

---

## 🚀 Deploy

Este projeto pode ser hospedado gratuitamente em:

- **GitHub Pages**: Gratuito e fácil
- **Netlify**: Deploy contínuo
- **Vercel**: Performance otimizada
- **Render**: Alternativa moderna

### Deploy no GitHub Pages

```bash
# 1. Crie um repositório no GitHub
# 2. Faça push do código
git init
git add .
git commit -m "Initial commit"
git remote add origin [seu-repositorio]
git push -u origin main

# 3. Ative GitHub Pages nas configurações do repo
# Settings → Pages → Source: main branch
```

---

## 🔄 Roadmap

### Implementar
- [ ] Formulário de contato funcional
- [ ] Seção de blog
- [ ] Mais projetos
- [ ] Galeria de imagens

### Otimizar
- [ ] Lazy loading de imagens
- [ ] Service Worker
- [ ] Minificação CSS/JS
- [ ] Critical CSS inline

### Expandir
- [ ] Versão em inglês
- [ ] Modo de alto contraste
- [ ] Animações 3D (Three.js)

---

## 📄 Licença

Este projeto é de **uso pessoal**. Sinta-se livre para usar como **inspiração** para seu próprio portfólio, mas por favor, **não copie diretamente**.

---

## 👤 Autor

**Eliseu Marinho**

- 🎓 Estudante de Engenharia de Software no Inatel
- 💼 Estagiário em Segurança da Informação
- 🚀 Em busca da primeira vaga como desenvolvedor

---

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## ⭐ Agradecimentos

- **Google Fonts** pelas fontes tipográficas
- **MDN Web Docs** pela documentação
- **CSS-Tricks** pelas técnicas avançadas
- Comunidade dev brasileira 🇧🇷

---

## 📞 Contato

Para mais informações ou colaborações, entre em contato através das informações disponíveis no site.

---

<div align="center">

**Desenvolvido com ❤️ e ☕ por Eliseu Marinho**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](.)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/elyzel)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

**Última atualização**: Novembro 2026

</div>
