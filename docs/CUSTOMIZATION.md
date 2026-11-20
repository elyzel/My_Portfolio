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

Edite os quatro `.contact-card` de `#contato` em `index.html`.

- **E-mail** — Atualize o `mailto:`, o endereço visível e o `data-copy` do botão.
- **WhatsApp** — Atualize os dígitos com código do país no caminho `https://wa.me/<numero>`. Atualize o número visível, o `aria-label` do link e o número internacional formatado em `data-copy`. Para trocar a mensagem, use `encodeURIComponent(mensagem)` e substitua o valor após `?text=`.
- **Cópia** — `data-copy` fornece o texto copiado. `data-copy-label` fornece o nome usado no anúncio após a cópia.
- **Perfis e currículo** — Atualize a URL e o texto visível de cada perfil. Para trocar o currículo, aponte `href` para o PDF e defina em `download` o nome que será salvo.

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

### Cores do tema escuro

Edite os tokens em `:root[data-theme="dark"]` dentro de `assets/css/variables.css`. O botão de tema exibe o ícone do tema ativo e usa `--accent` como cor. `color-scheme` também é definido por tema.

O tema inicial vem da chave `theme` no `localStorage`; sem valor salvo, acompanha `prefers-color-scheme` até uma escolha manual.

```css
:root[data-theme="dark"] {
    color-scheme: dark;
    --bg: #121e1d;
    --panel: #192926;
    --ink: #ecf6f2;
    --muted: #aec3bc;
    --line: #607b72;
    --accent: #94e4ca;
}
```

O tamanho do botão fica no bloco `THEME TOGGLE` de `assets/css/components.css` (`.theme-toggle`, largura e altura); a duração da revelação circular fica em `assets/js/theme-toggle.js` (760 ms).

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

### Chuva digital do hero

Ajuste a constante `CONFIG` em `assets/js/digital-rain.js`.

| Parâmetro | Valor atual |
|-----------|-------------|
| `layers` fundo | Fonte 11 px, intervalo 14 px, rastro de 0,085–0,105, ponta +0,08, velocidade 20–70 px/s |
| `layers` frente | Fonte 16 px, intervalo 18 px, rastro de 0,12–0,135, ponta +0,10, velocidade 30–110 px/s |
| `activeFraction`, `trailLength` | 0,5 das colunas e 10–16 células por rastro |
| `restartDelay`, `glyphChangesPerSecond` | Pausa de 0,2–1,4 s entre quedas e chance de 2% por segundo de trocar cada caractere |
| `calmPadding`, `calmAlpha` | Margem suave de 24 px e multiplicador de 0,45 sobre o texto |
| `fps`, `mobileFps`, `maxDpr` | Limites de 60 e 30 quadros/s e densidade 1,5 |
| `maxDelta`, `resizeDelay` | Intervalo máximo de 0,05 s por atualização e debounce de 150 ms |

Para clarear ou enfraquecer a chuva por tema, ajuste `--rain-alpha-scale` em `variables.css`. Para mudar apenas uma camada, ajuste sua faixa `trailAlpha` ou o brilho `headBoost`. Mantenha a zona calma e confira o contraste do texto depois de aumentar a opacidade.

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
