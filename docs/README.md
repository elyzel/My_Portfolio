# 📁 Portfólio - Eliseu Marinho

> Portfólio pessoal profissional com foco em segurança da informação e desenvolvimento de software

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Arquitetura](#arquitetura)
- [Customização](#customização)
- [Projetos Destacados](#projetos-destacados)

---

## 🎯 Sobre o Projeto

Este é um portfólio profissional desenvolvido com HTML5, CSS3 e JavaScript vanilla (puro), sem frameworks externos. O projeto foi estruturado seguindo as melhores práticas de desenvolvimento web, com código modular, bem documentado e fácil de manter.

### Características principais:

- ✅ **Design Responsivo**: Adapta-se perfeitamente a todos os tamanhos de tela
- ✅ **Tema Claro/Escuro**: Alternância manual, preferência do sistema e escolha sincronizada entre abas
- ✅ **Acessibilidade**: Seguindo padrões WCAG com navegação por teclado e leitores de tela
- ✅ **Performance**: Carregamento rápido e otimizado
- ✅ **Animações Suaves**: Experiência visual agradável respeitando preferências de movimento

---

## 📂 Estrutura do Projeto

```
My Portfolio/
│
├── index.html                      # Arquivo HTML principal
├── portfolio - backup.html         # Backup da versão original
├── Meu Currículo.pdf              # Currículo em PDF
│
├── assets/                         # Recursos do projeto
│   ├── css/                        # Arquivos de estilo
│   │   ├── variables.css          # Variáveis CSS (cores, espaçamentos, etc.)
│   │   ├── base.css               # Reset e estilos base
│   │   ├── layout.css             # Estrutura e layout da página
│   │   ├── components.css         # Componentes reutilizáveis
│   │   ├── projects.css           # Estilos específicos de projetos
│   │   └── animations.css         # Animações e transições
│   │
│   └── js/                         # Scripts JavaScript
│       ├── scroll-animations.js   # Animações baseadas em scroll
│       └── theme-toggle.js       # Alternância e persistência de tema
│
└── docs/                           # Documentação
    ├── README.md                   # Este arquivo
    ├── ARCHITECTURE.md             # Detalhes da arquitetura
    └── CUSTOMIZATION.md            # Guia de customização
```

### Descrição dos Arquivos CSS

| Arquivo | Propósito |
|---------|-----------|
| `variables.css` | Define todas as variáveis CSS customizadas (cores, fontes, espaçamentos) |
| `base.css` | Reset CSS e estilos fundamentais de elementos HTML |
| `layout.css` | Estruturas de layout (grid, flexbox, containers) |
| `components.css` | Componentes reutilizáveis (botões, cards, timeline) |
| `projects.css` | Estilos específicos dos projetos (SafeVoice, Salom Finance) |
| `animations.css` | Todas as animações e transições do site |

---

## 🛠 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada
  - CSS Grid & Flexbox
  - CSS Custom Properties (variáveis)
  - Media Queries (responsividade)
  - Animações CSS
- **JavaScript**: Funcionalidades interativas
  - Vanilla JS (sem frameworks)
  - Intersection Observer API
  - DOM Manipulation

### Design
- **Google Fonts**: 
  - Bricolage Grotesque (títulos)
  - Instrument Sans (corpo de texto)

---

## 🚀 Como Usar

### Visualização Local

1. **Clone ou baixe o projeto**
   ```bash
   git clone [seu-repositorio]
   cd "My Portfolio"
   ```

2. **Abra o arquivo index.html**
   - Dê um duplo clique no arquivo `index.html`
   - Ou use um servidor local (recomendado):
     ```bash
     # Com Python 3
     python -m http.server 8000
     
     # Com Node.js (http-server)
     npx http-server
     ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Deploy

Este projeto é estático e pode ser hospedado em qualquer serviço:

- **GitHub Pages**: Gratuito e fácil
- **Netlify**: Deploy automático via Git
- **Vercel**: Otimizado para performance
- **Servidor próprio**: Apenas hospede os arquivos

---

## 🏗 Arquitetura

### Princípios de Design

1. **Separação de Responsabilidades**
   - HTML para estrutura
   - CSS para apresentação
   - JavaScript para comportamento

2. **Modularidade**
   - Cada arquivo CSS tem uma responsabilidade específica
   - JavaScript organizado em funções bem definidas

3. **Manutenibilidade**
   - Código bem comentado
   - Nomenclatura clara e consistente
   - Documentação detalhada

### Fluxo de Dados

```
index.html (estrutura)
    ↓
CSS files (estilo)
    ↓
JavaScript (interação)
    ↓
User Experience
```

Para mais detalhes, consulte [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🎨 Customização

### Alterando Cores

Edite o arquivo `assets/css/variables.css`:

```css
:root {
    --bg: #f3f5f2;        /* Cor de fundo */
    --accent: #086957;     /* Cor de destaque */
    --ink: #102725;        /* Cor do texto */
    /* ... */
}
```

### Adicionando Novo Projeto

1. Adicione a seção no `index.html`
2. Crie estilos específicos em `assets/css/projects.css`
3. Configure animações se necessário

Para um guia completo, veja [CUSTOMIZATION.md](./CUSTOMIZATION.md)

---

## 🎯 Projetos Destacados

### 1. SafeVoice
**Aplicativo de Segurança Pessoal**
- 🏆 2º lugar na FETIN 2026
- 🔧 Python, Dart, Flutter
- 📍 Rastreamento em tempo real
- 🚨 Sistema de alerta de emergência

### 2. Salom Finance
**Gerenciador Financeiro Pessoal**
- 💰 Controle de orçamento
- 📊 Visualização de dados
- 🔐 Criptografia de dados
- 📈 Acompanhamento de investimentos

---

## 📱 Responsividade

O site se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com animações de scroll
- **Tablet**: Layout adaptado
- **Mobile**: Interface otimizada para toque

Breakpoints principais:
- `53rem` (848px): Layout de scroll para projetos
- `42rem` (672px): Grid de 2 colunas para 1 coluna
- `25rem` (400px): Ajustes para telas muito pequenas

---

## ♿ Acessibilidade

- ✅ Navegação por teclado
- ✅ Suporte a leitores de tela
- ✅ Contraste adequado (WCAG AA)
- ✅ Respeita preferências de movimento reduzido
- ✅ Suporte a tema escuro do sistema
- ✅ Elementos semânticos HTML5

---

## 📄 Licença

Este projeto está sob licença pessoal. Sinta-se livre para usar como inspiração para seu próprio portfólio, mas por favor, não copie diretamente.

---

## 👤 Autor

**Eliseu Marinho**
- Estudante de Engenharia de Software no Inatel
- Estagiário em Segurança da Informação
- Em busca da primeira vaga como desenvolvedor

---

## 📞 Contato

Para mais informações ou colaborações, entre em contato através das informações disponíveis no site.

---

**Última atualização**: Novembro 2026
