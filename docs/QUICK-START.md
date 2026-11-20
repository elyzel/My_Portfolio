# ⚡ Quick Start Guide

Guia rápido para começar a trabalhar com o projeto em **5 minutos**.

---

## 🎯 Objetivo

Este guia vai te ajudar a:
1. ✅ Entender a estrutura básica
2. ✅ Fazer suas primeiras modificações
3. ✅ Ver as mudanças ao vivo

**Tempo estimado**: 5-10 minutos

---

## 🚀 Passo 1: Abrir o Projeto (30 segundos)

### Método 1: Duplo clique
1. Navegue até a pasta do projeto
2. Dê duplo clique em `index.html`
3. O site abre no seu navegador padrão

### Método 2: Servidor local (recomendado)
```bash
# Com Python 3
cd "My Portfolio"
python -m http.server 8000

# Abra: http://localhost:8000
```

---

## ✏️ Passo 2: Sua Primeira Modificação (2 minutos)

### Mudar o Nome no Header

**Arquivo**: `index.html` (linha ~72)

**Encontre:**
```html
<a class="brand" href="#inicio">Eliseu Marinho</a>
```

**Altere para:**
```html
<a class="brand" href="#inicio">Seu Nome Aqui</a>
```

**Salve** e **recarregue** o navegador → Veja a mudança! ✨

---

## 🎨 Passo 3: Mudar a Cor Principal (2 minutos)

### Alterar a Cor de Destaque

**Arquivo**: `assets/css/variables.css` (linha ~15)

**Encontre:**
```css
--accent: #086957;     /* Verde atual */
```

**Experimente:**
```css
--accent: #0066cc;     /* Azul */
/* ou */
--accent: #7c3aed;     /* Roxo */
/* ou */
--accent: #dc2626;     /* Vermelho */
```

**Salve** e **recarregue** → Todos os links e destaques mudaram de cor! 🎨

O seletor na navegação alterna entre os temas claro e escuro. A escolha fica salva neste navegador; sem escolha manual, o site acompanha a aparência do sistema.

---

## 📝 Passo 4: Personalizar o Hero (3 minutos)

### Mudar o Título Principal

**Arquivo**: `index.html` (linha ~90-92)

**Encontre:**
```html
<h1>
    <span>Segurança desde</span>
    <span>a primeira linha</span>
    <span>de código.</span>
</h1>
```

**Altere para:**
```html
<h1>
    <span>Seu título</span>
    <span>profissional</span>
    <span>aqui.</span>
</h1>
```

### Mudar a Descrição

**Encontre (linha ~94):**
```html
<p>Estudante de Engenharia de Software...</p>
```

**Altere para:**
```html
<p>Sua descrição profissional curta e impactante.</p>
```

**Salve** e **recarregue** → Seu hero está personalizado! 🎯

---

## 🔧 Checklist Rápido

Use esta checklist para personalização básica em 15 minutos:

- [ ] **Nome no header** (index.html, linha ~72)
- [ ] **Título do hero** (index.html, linha ~90)
- [ ] **Descrição** (index.html, linha ~94)
- [ ] **Cor principal** (variables.css, linha ~15)
- [ ] **Links de navegação** (index.html, linha ~75-79)
- [ ] **Botões de CTA** (index.html, linha ~96-99)

---

## 🎓 Próximos Passos

### Personalizações Intermediárias (30 min)

1. **Adicionar suas redes sociais**
   - Arquivo: `index.html`
   - Seção: `.actions`
   - Adicione links para GitHub, LinkedIn, etc.

2. **Mudar as fontes**
   - Arquivo: `variables.css`
   - Variável: `--display`
   - [Guia completo](./CUSTOMIZATION.md#modificando-tipografia)

3. **Adicionar um novo projeto**
   - [Guia completo](./CUSTOMIZATION.md#adicionando-novos-projetos)

### Customizações Avançadas (1-2 horas)

1. **Criar tema escuro customizado**
   - [Guia completo](./CUSTOMIZATION.md#customizando-cores-e-tema)

2. **Adicionar novas animações**
   - [Guia completo](./CUSTOMIZATION.md#customizando-animações)

3. **Modificar o layout**
   - [Guia completo](./CUSTOMIZATION.md#alterando-layout)

---

## 📚 Documentação Completa

Para informações detalhadas, consulte:

- 📘 [README.md](./README.md) - Visão geral completa
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura técnica
- 🎨 [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Guia de customização
- 📊 [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) - Estrutura detalhada

---

## 🐛 Problemas Comuns

### A página não abre
- ✅ Verifique se o arquivo `index.html` está na raiz do projeto
- ✅ Tente abrir com outro navegador

### As mudanças não aparecem
- ✅ Salve o arquivo (Ctrl+S)
- ✅ Recarregue a página (F5 ou Ctrl+R)
- ✅ Limpe o cache (Ctrl+Shift+R)

### As cores não mudaram
- ✅ Verifique se você editou `variables.css` (não outro arquivo)
- ✅ Confirme que salvou o arquivo
- ✅ Recarregue com cache limpo (Ctrl+Shift+R)

---

## 💡 Dicas Profissionais

### 1. Use um editor de código
- **VS Code** (recomendado): Suporte completo
- **Sublime Text**: Leve e rápido
- **WebStorm**: Poderoso, mas pago

### 2. Ative o Live Reload
```bash
# Com VS Code + Live Server extension
# Clique direito em index.html → "Open with Live Server"
```

### 3. Use DevTools do navegador
- **F12** ou **Ctrl+Shift+I**: Abre as ferramentas de desenvolvedor
- Experimente mudanças ao vivo
- Veja console para erros

---

## 🎯 Desafios para Praticar

### Iniciante (15 min cada)
1. ✏️ Mude todas as cores do tema
2. 📝 Personalize todo o texto para você
3. 🔗 Adicione links para suas redes

### Intermediário (30 min cada)
1. 🎨 Crie uma paleta de cores totalmente nova
2. ✍️ Mude as fontes do site
3. 📱 Ajuste os breakpoints responsivos

### Avançado (1-2 horas cada)
1. 🎬 Crie uma nova animação customizada
2. 📂 Adicione uma nova seção completa
3. 🚀 Implemente um formulário de contato

---

## 🎉 Parabéns!

Você agora sabe:
- ✅ Onde está cada coisa no projeto
- ✅ Como fazer modificações básicas
- ✅ Como ver suas mudanças ao vivo

**Continue explorando** e consulte a [documentação completa](./README.md) quando precisar de mais detalhes!

---

## 🆘 Precisa de Ajuda?

1. 📖 Consulte [CUSTOMIZATION.md](./CUSTOMIZATION.md) para guias detalhados
2. 🏗️ Veja [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura
3. 📊 Confira [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) para navegação

---

**Criado por**: Eliseu Marinho  
**Tempo de leitura**: 5 minutos  
**Nível**: Iniciante
