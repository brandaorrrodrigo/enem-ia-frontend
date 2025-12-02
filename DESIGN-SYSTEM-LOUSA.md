# 🎨 Sistema de Design ENEM-IA - Tema Lousa Escolar

## 📋 Visão Geral

Sistema de design completo e consistente para o ENEM-IA, com tema visual de lousa escolar (chalkboard) moderna. Todas as páginas foram refatoradas para seguir o mesmo padrão visual, garantindo uma experiência unificada e profissional.

---

## 🎯 Objetivos Alcançados

✅ **Tema visual consistente** em todas as páginas
✅ **Classes utilitárias reutilizáveis** para manter padrão
✅ **Contraste adequado** para legibilidade (textos brancos sobre fundo verde)
✅ **Design responsivo** (mobile-first)
✅ **Acessibilidade** melhorada
✅ **Performance** otimizada com CSS puro

---

## 🎨 Paleta de Cores

```css
--chalkboard-green: #0d5f3a;  /* Fundo principal da lousa */
--chalkboard-dark:  #0b4a30;  /* Verde mais escuro */
--chalk-white:      #f0f0e8;  /* Branco giz (textos) */
--chalk-yellow:     #ffd966;  /* Amarelo giz (destaques) */
```

### Cores Auxiliares
- **Sucesso**: `rgba(34, 197, 94, 0.2)` + `#86efac`
- **Erro**: `rgba(239, 68, 68, 0.2)` + `#fca5a5`
- **Info**: `rgba(59, 130, 246, 0.2)` + `#93c5fd`

---

## 🧩 Classes Utilitárias

### Cards

#### `.card-ia` - Card Principal
```css
background: rgba(0, 0, 0, 0.6);
backdrop-filter: blur(16px);
border-radius: 20px;
border: 2px solid rgba(255, 255, 255, 0.25);
padding: 2rem;
```

**Uso:**
```tsx
<div className="card-ia">
  <h2 className="title-ia-sm">Título do Card</h2>
  <p className="subtitle-ia">Conteúdo do card...</p>
</div>
```

#### `.card-ia-sm` - Card Pequeno
Versão compacta para elementos menores.

---

### Botões

#### `.btn-ia` - Botão Primário
```css
background: linear-gradient(135deg, #ffd966 0%, #ffb347 100%);
color: #0b4a30;
font-weight: 700;
padding: 1rem 2rem;
border-radius: 12px;
```

**Uso:**
```tsx
<button className="btn-ia">
  🚀 Iniciar Simulado
</button>
```

#### `.btn-ia-secondary` - Botão Secundário
Fundo transparente com borda branca.

#### `.btn-ia-outline` - Botão Outline
Apenas borda, sem fundo.

---

### Títulos

#### `.title-ia` - Título Principal
```css
font-size: clamp(2rem, 5vw, 3.5rem);
font-weight: 800;
color: var(--chalk-white);
text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
```

**Uso:**
```tsx
<h1 className="title-ia">
  ENEM<span className="text-yellow-300">-IA</span>
</h1>
```

#### `.title-ia-sm` - Título Secundário
Versão menor para subtítulos.

#### `.subtitle-ia` - Subtítulo
Para textos descritivos abaixo dos títulos.

---

### Badges

#### `.badge-ia` - Badge Padrão
```tsx
<span className="badge-ia">Novo</span>
```

#### `.badge-ia-success` - Verde
```tsx
<span className="badge-ia-success">Concluído</span>
```

#### `.badge-ia-error` - Vermelho
```tsx
<span className="badge-ia-error">Erro</span>
```

#### `.badge-ia-info` - Azul
```tsx
<span className="badge-ia-info">10 respondidas</span>
```

---

### Inputs e Forms

#### `.input-ia` - Input/Select
```tsx
<input
  type="text"
  className="input-ia"
  placeholder="Digite aqui..."
/>

<select className="input-ia">
  <option>Opção 1</option>
</select>
```

---

### Layout

#### `.container-ia` - Container Centralizado
```tsx
<div className="container-ia">
  {/* Conteúdo centralizado, max-width 1200px */}
</div>
```

#### `.grid-ia` - Grid Responsivo
```tsx
<div className="grid-ia">
  <div className="card-ia">Item 1</div>
  <div className="card-ia">Item 2</div>
  <div className="card-ia">Item 3</div>
</div>
```
Auto-responsivo:
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas

#### `.hero-ia` - Hero Section
```tsx
<section className="hero-ia">
  <h1 className="title-ia">Título Grande</h1>
  <p className="subtitle-ia">Descrição...</p>
</section>
```

---

### Utilitários

#### `.divider-ia` - Divisor
Linha horizontal decorativa.

#### `.progress-ia` - Barra de Progresso
```tsx
<div className="progress-ia">
  <div className="progress-ia-bar" style={{ width: '75%' }}></div>
</div>
```

#### `.spinner-ia` - Loading Spinner
```tsx
<div className="spinner-ia"></div>
```

#### `.stat-ia` - Card de Estatística
```tsx
<div className="stat-ia">
  <span className="stat-ia-value">10.3k+</span>
  <span className="stat-ia-label">Questões</span>
</div>
```

---

## 📄 Páginas Refatoradas

### 1. `/enem/page.tsx` - Home ENEM-IA

**Estrutura:**
- ✅ Hero Section com título grande
- ✅ Subtítulo explicativo
- ✅ 3 Cards de recursos (Simulados, IA, Acompanhamento)
- ✅ Seção "Como Funciona" (5 passos)
- ✅ CTA final

**Classes principais:**
- `hero-ia`
- `title-ia`
- `subtitle-ia`
- `card-ia`
- `btn-ia`

---

### 2. `/enem/simulado/page.tsx` - Configuração do Simulado

**Estrutura:**
- ✅ Card central com formulário
- ✅ Seleção de quantidade (4 botões visuais)
- ✅ Select de área de conhecimento
- ✅ Info box com detalhes
- ✅ Cards de estatísticas no rodapé

**Classes principais:**
- `card-ia`
- `card-ia-sm`
- `input-ia`
- `divider-ia`
- `stat-ia`
- `btn-ia`

---

### 3. `/enem/simulado/[id]/page.tsx` - Página da Questão

**Estrutura:**
- ✅ Header com barra de progresso
- ✅ Card da questão com enunciado
- ✅ Alternativas como botões grandes
- ✅ Navegação (Anterior / Finalizar / Próxima)
- ✅ Mini navegador de questões

**Classes principais:**
- `container-ia`
- `card-ia`
- `card-ia-sm`
- `badge-ia`
- `progress-ia`
- `btn-ia-secondary`
- `divider-ia`

---

### 4. `/enem/dashboard/page.tsx` ⏳ (Pendente)

**Estrutura planejada:**
- Card de progresso geral
- Grid de estatísticas por área
- Card de pontos e conquistas
- Lista de desafios semanais
- Gráficos de evolução

---

### 5. `/enem/desafios/page.tsx` ⏳ (Pendente)

**Estrutura planejada:**
- Grid de cards de desafios
- Estados: ativo, concluído, premiado
- Badges de recompensas
- Mensagem quando não há desafios

---

### 6. `/enem/resultado/[id]/page.tsx` ✅ (Já estava implementado)

A página de resultados já foi implementada anteriormente com tema lousa.

---

## 🔧 Configuração Técnica

### Arquivo: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --chalkboard-green: #0d5f3a;
  --chalkboard-dark: #0b4a30;
  --chalk-white: #f0f0e8;
  --chalk-yellow: #ffd966;
}

/* + 400+ linhas de classes utilitárias */
```

### Componente ChalkBoard (Rabiscos de Fundo)

Já implementado em `components/ChalkBoard.tsx`:
- 45+ rabiscos de giz
- Equações matemáticas
- Frases motivacionais
- Opacidade baixa (não atrapalha leitura)

---

## 📱 Responsividade

Todos os componentes são **mobile-first**:

```css
/* Mobile: padrão */
.grid-ia {
  grid-template-columns: 1fr;
}

/* Tablet: 640px+ */
@media (min-width: 640px) {
  .grid-ia {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .grid-ia {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## ✨ Efeitos e Animações

### Hover nos Cards
```css
.card-ia:hover {
  border-color: rgba(255, 217, 102, 0.4);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  transform: translateY(-4px);
}
```

### Hover nos Botões
```css
.btn-ia:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(255, 217, 102, 0.5);
}
```

### Spinner Animado
```css
@keyframes spin-ia {
  to { transform: rotate(360deg); }
}

.spinner-ia {
  animation: spin-ia 0.8s linear infinite;
}
```

---

## 📚 Exemplos de Uso

### Exemplo 1: Hero Section

```tsx
<section className="hero-ia">
  <h1 className="title-ia text-center mb-6">
    ENEM<span className="text-yellow-300">-IA</span>
  </h1>

  <p className="subtitle-ia text-center max-w-2xl mx-auto mb-12">
    Prepare-se para o ENEM com Inteligência Artificial
  </p>

  <button className="btn-ia text-lg px-8 py-4">
    🚀 Começar agora
  </button>
</section>
```

### Exemplo 2: Grid de Cards

```tsx
<div className="grid-ia">
  <div className="card-ia">
    <div className="text-6xl mb-4">📝</div>
    <h3 className="title-ia-sm">Simulados</h3>
    <p className="subtitle-ia">Questões reais do ENEM</p>
  </div>

  <div className="card-ia">
    <div className="text-6xl mb-4">🧠</div>
    <h3 className="title-ia-sm">IA</h3>
    <p className="subtitle-ia">Explicações personalizadas</p>
  </div>

  <div className="card-ia">
    <div className="text-6xl mb-4">📈</div>
    <h3 className="title-ia-sm">Dashboard</h3>
    <p className="subtitle-ia">Acompanhe seu progresso</p>
  </div>
</div>
```

### Exemplo 3: Form com Input

```tsx
<div className="card-ia">
  <label className="block text-white font-bold mb-3">
    📚 Área de Conhecimento
  </label>

  <select className="input-ia w-full">
    <option>Todas as Áreas</option>
    <option>Matemática</option>
    <option>Linguagens</option>
  </select>

  <div className="divider-ia"></div>

  <button className="btn-ia w-full">
    Continuar
  </button>
</div>
```

---

## 🎯 Checklist de Qualidade

### Design
- [x] Contraste adequado (branco sobre verde)
- [x] Hierarquia visual clara
- [x] Espaçamento consistente
- [x] Tipografia legível (Kalam + Inter)
- [x] Cores acessíveis

### UX
- [x] Feedback visual nos botões (hover, active)
- [x] Loading states (spinner)
- [x] Estados de erro claros
- [x] Navegação intuitiva
- [x] Responsividade completa

### Performance
- [x] CSS puro (sem bibliotecas extras)
- [x] Classes reutilizáveis
- [x] Animações GPU-accelerated
- [x] Imagens otimizadas (usando emojis)

### Acessibilidade
- [x] Textos com bom contraste
- [x] Tamanhos de fonte responsivos (clamp)
- [x] Focus states nos inputs
- [x] Botões desabilitados com indicação visual

---

## 🚀 Próximos Passos

### Pendentes
1. **Dashboard** - Implementar com cards de estatísticas e gráficos
2. **Desafios** - Criar grid de desafios com badges
3. **Loja** - Página de itens/recompensas (se aplicável)

### Melhorias Futuras
- [ ] Tema dark/light toggle
- [ ] Animações de transição de página
- [ ] Modo de alto contraste
- [ ] Preferências de acessibilidade
- [ ] Easter eggs nos rabiscos

---

## 📝 Notas Importantes

### ⚠️ Não Modificar
- **Backend** - Nenhum arquivo .py foi alterado
- **Lógica de negócio** - Apenas UI foi refatorada
- **Endpoints** - Todos mantidos iguais

### ✅ Pode Modificar Livremente
- Todas as classes em `globals.css`
- Componentes `.tsx` (apenas UI)
- Cores e espaçamentos

### 🎨 Padrão de Nomenclatura
Todas as classes utilitárias terminam com `-ia`:
- `card-ia`
- `btn-ia`
- `title-ia`
- `badge-ia`
- etc.

---

## 📞 Suporte

Para dúvidas sobre o sistema de design:
1. Consultar este documento
2. Verificar `globals.css` para todas as classes disponíveis
3. Ver páginas implementadas como referência

---

**Sistema de Design ENEM-IA v1.0**
Tema Lousa Escolar - Moderno, Limpo e Responsivo 🎓
