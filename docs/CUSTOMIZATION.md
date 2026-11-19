# 🎨 Guia de Customização

Este guia ensina como personalizar o portfólio para criar sua própria versão única.

## 📋 Índice

1. [Alterando Informações Pessoais](#alterando-informações-pessoais)
2. [Customizando Cores e Tema](#customizando-cores-e-tema)
3. [Modificando Tipografia](#modificando-tipografia)
4. [Adicionando Novos Projetos](#adicionando-novos-projetos)
5. [Customizando Animações](#customizando-animações)
6. [Alterando Layout](#alterando-layout)

---

## 👤 Alterando Informações Pessoais

### 1. Nome e Título

**Arquivo**: `index.html`

```html
<!-- Header -->
<a class="brand" href="#inicio">Seu Nome Aqui</a>

<!-- Hero Section -->
<h1>
    <span>Seu título</span>
    <span>profissional</span>
    <span>aqui.</span>
</h1>

<p>Sua descrição profissional curta e impactante.</p>
```

### 2. Navegação

Edite a ordem do menu no `<nav>` de `index.html`. Cada `href` deve apontar para um ID de seção. Sobre e a marca apontam para o hero (`#inicio`). `site-navigation.js` usa os links do menu para atualizar o destaque durante a rolagem.

### 3. Links de Contato

Edite os três `.contact-card` de `#contato` no `index.html`. Para o e-mail, atualize o `mailto:` e o texto de `#contact-email-link`, que alimenta o botão Copiar. Atualize a URL e o valor visível de cada perfil social. Para trocar o currículo, aponte o `href` para o PDF e defina em `download` o nome que será salvo.

---

## 🎨 Customizando Cores e Tema

### Paleta de Cores Principal

**Arquivo**: `assets/css/variables.css`

```css
:root {
    /* === TEMA CLARO === */
    
    /* Cores de fundo */
    --bg: #f3f5f2;        /* Fundo da página */
    --panel: #fff;         /* Fundo de cards/painéis */
    
    /* Cores de texto */
    --ink: #102725;        /* Texto principal (escuro) */
    --muted: #4a615d;      /* Texto secundário (mais claro) */
    
    /* Cores de interface */
    --line: #c8d6d1;       /* Bordas e divisores */
    --accent: #086957;     /* Cor de destaque (links, botões) */
    
    /* Cores especiais */
    --signal: #ff9d8f;     /* Alertas e notificações */
    --mint: #8de5c6;       /* Sucesso e confirmações */
}
```

### Criando Seu Tema Escuro

```css
@media (prefers-color-scheme: dark) {
    :root {
        /* Inverta as cores de fundo e texto */
        --bg: #121e1d;          /* Fundo escuro */
        --panel: #192926;       /* Painéis escuros */
        --ink: #ecf6f2;         /* Texto claro */
        --muted: #aec3bc;       /* Texto secundário claro */
        --line: #374d47;        /* Bordas sutis */
        --accent: #94e4ca;      /* Destaque mais claro */
    }
}
```

### Paletas de Cores Sugeridas

#### 1. **Azul Profissional**
```css
:root {
    --bg: #f0f4f8;
    --ink: #102a43;
    --accent: #0066cc;
    --signal: #ff6b6b;
    --mint: #51cf66;
}
```

#### 2. **Roxo Criativo**
```css
:root {
    --bg: #f5f3ff;
    --ink: #2d1b4e;
    --accent: #7c3aed;
    --signal: #f59e0b;
    --mint: #10b981;
}
```

#### 3. **Verde Sustentável**
```css
:root {
    --bg: #f0fdf4;
    --ink: #14532d;
    --accent: #16a34a;
    --signal: #ea580c;
    --mint: #22d3ee;
}
```

### Testando Seu Tema

1. Abra o arquivo `variables.css`
2. Altere os valores das cores
3. Salve e recarregue a página
4. Ajuste conforme necessário

**Dica**: Use ferramentas como [Coolors](https://coolors.co/) para gerar paletas harmônicas.

---

## ✍️ Modificando Tipografia

### Alterando Fontes

**Arquivo**: `index.html` (seção `<head>`)

```html
<!-- 1. Importe novas fontes do Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Sua+Fonte+Display:wght@700;800&family=Sua+Fonte+Body:wght@400;600&display=swap" rel="stylesheet">
```

**Arquivo**: `assets/css/variables.css`

```css
:root {
    /* 2. Defina as novas fontes */
    --display: 'Sua Fonte Display', system-ui, sans-serif;  /* Para títulos */
}
```

**Arquivo**: `assets/css/base.css`

```css
body {
    /* 3. Aplique a fonte do corpo */
    font-family: 'Sua Fonte Body', system-ui, sans-serif;
}
```

### Combinações de Fontes Recomendadas

#### 1. **Elegante e Moderno**
- Display: Playfair Display
- Body: Inter

#### 2. **Tech e Limpo**
- Display: Space Grotesk
- Body: IBM Plex Sans

#### 3. **Criativo e Dinâmico**
- Display: Syne
- Body: DM Sans

### Ajustando Tamanhos de Fonte

**Arquivo**: `assets/css/base.css`

```css
/* Títulos principais */
h2 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    /* Ajuste: min    ideal  max */
}

/* Títulos secundários */
h3 {
    font-size: clamp(1.6rem, 3vw, 2.5rem);
}

/* Texto do corpo */
body {
    font-size: 1.0625rem;  /* 17px */
    line-height: 1.6;      /* Espaçamento entre linhas */
}
```

---

## 📂 Adicionando Novos Projetos

Acrescente um objeto à lista `projects` em `assets/js/projects.js`. A seção suporta até cinco entradas. A ordem da lista determina a sequência das setas, do swipe e dos indicadores.

```js
{
  id: 'novo-projeto',
  titulo: 'Novo projeto',
  resumo: 'Uma linha para a vitrine.',
  chips: ['Python'],
  descricao: ['Descrição apresentada no painel.'],
  stack: ['Python'],
  funcionalidades: ['Funcionalidade do projeto.'],
  github: null,
  demo: null,
  animacao: null
}
```

Use um `id` único para o link `#projetos/novo-projeto`. Campos como `logo`, `problema`, `meuPapel`, `decisoesTecnicas`, `status`, `ano`, `destaque` e `dados` aparecem quando preenchidos. Use `github: null` para mostrar “Repositório privado” e `animacao: null` para exibir só o painel. A página abre na vitrine. Cada card ou link direto abre o painel correspondente.

---

## 🎬 Customizando Animações

### Desabilitando Animações

Defina `animacao: null` no projeto para remover **Veja funcionando** daquela entrada. Emule `prefers-reduced-motion: reduce` no navegador para testar os palcos 2D estáticos.

### Ajustando Velocidade das Animações

A entrada do painel dura 300 ms em `projects.js`. As transições de `.button` ficam em `components.css`. Os tokens `--button-hover-bg` e `--button-hover-text` em `variables.css` definem as cores dos primários no hover e no foco dos dois temas.

### Criando Nova Animação

**Arquivo**: `assets/css/animations.css`

```css
/* 1. Defina o keyframe */
@keyframes sua-animacao {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* 2. Aplique ao elemento */
.seu-elemento {
    animation: sua-animacao 0.5s ease-out;
}
```

### Animação ao Passar o Mouse

```css
.seu-card {
    transition: transform 0.3s ease;
}

.seu-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
```

---

## 📐 Alterando Layout

### Mudando Largura Máxima do Container

**Arquivo**: `assets/css/layout.css`

```css
.wrap {
    /* Original: 72rem (1152px) */
    width: min(100% - 3rem, 90rem);  /* Mais largo */
    /* ou */
    width: min(100% - 3rem, 60rem);  /* Mais estreito */
}
```

### Alterando Altura do Header

`--header` em `variables.css` define a altura mínima de referência. O cabeçalho pode crescer quando o menu quebra. `site-navigation.js` mede a altura real para posicionar âncoras e palcos sticky.

### Grid de Projetos

Ajuste `.project-cards` em `projects.css` para alterar a grade da vitrine. `.project-detail-slot` controla a largura do painel e `.project-body` controla as colunas. Até 42rem, o conteúdo usa uma coluna.

### Espaçamento Entre Seções

**Arquivo**: `assets/css/layout.css`

```css
.section {
    /* Original: 3rem a 6rem responsivo */
    padding-block: clamp(3rem, 7vw, 6rem);
    
    /* Mais espaço: */
    padding-block: clamp(5rem, 10vw, 10rem);
    
    /* Menos espaço: */
    padding-block: clamp(2rem, 5vw, 4rem);
}
```

---

## 🖼️ Adicionando Imagens aos Projetos

### Método 1: Imagem Simples

```html
<figure class="project-image">
    <img src="assets/images/seu-projeto.jpg" 
         alt="Screenshot do Seu Projeto"
         loading="lazy">
    <figcaption>Descrição da imagem</figcaption>
</figure>
```

### Método 2: Galeria de Imagens

```html
<div class="project-gallery">
    <img src="assets/images/projeto-1.jpg" alt="Tela principal">
    <img src="assets/images/projeto-2.jpg" alt="Dashboard">
    <img src="assets/images/projeto-3.jpg" alt="Configurações">
</div>
```

**Arquivo**: `assets/css/projects.css`

```css
.project-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-block: 2rem;
}

.project-gallery img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    border: 1px solid var(--line);
}
```

---

## 🔧 Dicas Avançadas

### 1. Adicionando Modo de Alto Contraste

**Arquivo**: `assets/css/variables.css`

```css
@media (prefers-contrast: high) {
    :root {
        --bg: #000;
        --ink: #fff;
        --accent: #ffff00;
        --line: #fff;
    }
}
```

### 2. Suporte a Múltiplos Idiomas

```html
<!-- Inglês -->
<html lang="en">
<p>I'm a software developer...</p>

<!-- Português -->
<html lang="pt-BR">
<p>Sou um desenvolvedor de software...</p>
```

### 3. Favicon Personalizado

```html
<head>
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
</head>
```

---

## ✅ Checklist de Customização

- [ ] Informações pessoais atualizadas
- [ ] Cores do tema alteradas
- [ ] Fontes customizadas
- [ ] Projetos adicionados/modificados
- [ ] Links de contato funcionando
- [ ] Imagens otimizadas
- [ ] Testado em mobile
- [ ] Testado em diferentes navegadores
- [ ] Validado HTML e CSS
- [ ] Performance verificada

---

## 🆘 Troubleshooting

### Problema: Cores não aparecem

**Solução**: Verifique se `variables.css` está sendo carregado antes dos outros arquivos CSS no `index.html`.

### Problema: Animações não funcionam

**Solução**: 
1. Verifique se `scroll-animations.js` está carregado
2. Abra o Console do navegador (F12) para ver erros
3. Verifique se a classe `.scroll-ready` está sendo adicionada

### Problema: Layout quebrado no mobile

**Solução**:
1. Teste usando DevTools do navegador (F12)
2. Verifique media queries em `layout.css`
3. Ajuste breakpoints conforme necessário

---

## 📚 Recursos Úteis

- **Cores**: [Coolors.co](https://coolors.co/)
- **Fontes**: [Google Fonts](https://fonts.google.com/)
- **Ícones**: [Font Awesome](https://fontawesome.com/)
- **Imagens**: [Unsplash](https://unsplash.com/)
- **Validação**: [W3C Validator](https://validator.w3.org/)

---

**Precisa de ajuda?** Consulte a [documentação principal](./README.md) ou a [arquitetura](./ARCHITECTURE.md) para mais detalhes técnicos.

---

**Mantido por**: Eliseu Marinho  
**Última atualização**: Novembro 2026
