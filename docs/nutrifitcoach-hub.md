# NutriFitCoach Hub - Documentação

## Visão Geral

O NutriFitCoach Hub é uma plataforma completa de conteúdo sobre saúde feminina, integrada ao sistema ENEM Pro. O hub apresenta 60 artigos científicos detalhados sobre ciclo hormonal, nutrição, treinamento e condições de saúde específicas da mulher.

## Estrutura do Projeto

```
app/nutrifitcoach/
├── page.tsx                          # Página principal do hub
└── artigo/[slug]/page.tsx           # Página individual de artigo

app/api/nutrifitcoach/
└── article/[id]/route.ts            # API para servir artigos HTML

lib/nutrifitcoach/
├── types.ts                         # Tipos TypeScript
└── articles-data.ts                 # Dados dos 60 artigos

components/nutrifitcoach/
└── (componentes futuros)
```

## Características

### Página Principal (/nutrifitcoach)

- **Hero Section**: Apresentação visual com gradiente pink/purple
- **Artigos em Destaque**: 6 artigos principais destacados
- **7 Categorias Temáticas**:
  - 🌸 Ciclo Hormonal (10 artigos)
  - 💎 Hormônios Femininos (12 artigos)
  - 🏥 Condições de Saúde (18 artigos)
  - 🥗 Nutrição Feminina (5 artigos)
  - 💪 Treinamento (4 artigos)
  - 🧘 Saúde Mental (4 artigos)
  - 🤰 Reprodução & Fertilidade (7 artigos)

- **Sistema de Busca**: Busca por título, descrição ou tags
- **Filtro por Categoria**: Navegação intuitiva por categorias
- **60 Artigos Catalogados**: Todos com metadados completos

### Página de Artigo (/nutrifitcoach/artigo/[slug])

- **Header Sticky**: Navegação e botão de compartilhamento
- **Hero do Artigo**: Informações completas (categoria, tempo de leitura, tags)
- **Conteúdo HTML**: Renderização do artigo completo com estilos originais
- **CTA NutriFitCoach**: Call-to-action para visitar o site oficial
- **Artigos Relacionados**: Sugestões baseadas na mesma categoria

## API Endpoints

### GET /api/nutrifitcoach/article/[id]

Retorna o conteúdo HTML do artigo especificado.

**Parâmetros:**
- `id`: ID do artigo (01-60)

**Resposta:**
- `Content-Type: text/html; charset=utf-8`
- Cache: 1 hora
- Conteúdo HTML limpo (sem tags HTML/HEAD/BODY)

## Dados dos Artigos

Cada artigo contém:

```typescript
{
  id: string;              // "01" a "60"
  slug: string;            // URL-friendly
  title: string;           // Título completo
  description: string;     // Meta descrição
  category: ArticleCategory;
  tags: string[];          // Tags para busca
  readTime: number;        // Minutos de leitura
  htmlPath: string;        // Caminho para arquivo HTML
  emoji: string;           // Emoji representativo
  featured?: boolean;      // Destaque na homepage
}
```

## Como Adicionar Novos Artigos

1. **Adicionar HTML**: Coloque o arquivo HTML em `D:\ebooks\artigos_feminino\`

2. **Atualizar dados**: Em `lib/nutrifitcoach/articles-data.ts`, adicione:

```typescript
{
  id: '61',
  slug: 'novo-artigo-slug',
  title: 'Título do Artigo',
  description: 'Descrição breve',
  category: 'categoria-apropriada',
  tags: ['tag1', 'tag2'],
  readTime: 20,
  htmlPath: 'D:\\ebooks\\artigos_feminino\\artigo_61_novo.html',
  emoji: '🌟',
  featured: false,
}
```

3. **Rebuild**: Execute `npm run build` para verificar

## Funcionalidades Futuras

### Sugeridas:
- [ ] Sistema de favoritos
- [ ] Comentários nos artigos
- [ ] Newsletter por categoria
- [ ] Quiz interativo baseado nos artigos
- [ ] Modo escuro
- [ ] Print/PDF dos artigos
- [ ] Estatísticas de leitura
- [ ] Recomendações personalizadas baseadas em histórico

## Integração com ENEM Pro

O hub está totalmente integrado ao sistema ENEM Pro, usando:
- Layout e componentes do Next.js 16
- Sistema de roteamento App Router
- Tailwind CSS para estilização
- Lucide React para ícones

## SEO e Performance

- **SSG (Static Site Generation)**: Página principal pré-renderizada
- **Cache de API**: 1 hora para conteúdo HTML
- **Meta Tags**: Todos os artigos têm title e description
- **Responsive Design**: Mobile-first, otimizado para todos os dispositivos
- **Core Web Vitals**: Otimizado para LCP, FID, CLS

## Acesso

- **URL Principal**: `http://localhost:3000/nutrifitcoach`
- **Artigo Individual**: `http://localhost:3000/nutrifitcoach/artigo/[slug]`
- **Site Oficial**: https://nutrifitcoach.com.br

## Manutenção

### Atualizar Artigo Existente
1. Edite o arquivo HTML em `D:\ebooks\artigos_feminino\`
2. Se necessário, atualize metadados em `articles-data.ts`
3. Cache da API se limpa automaticamente após 1 hora

### Alterar Categorias
1. Edite `categories` em `lib/nutrifitcoach/articles-data.ts`
2. Ajuste cores e emojis conforme necessário
3. Rebuild do projeto

## Suporte

Para questões sobre o conteúdo dos artigos ou sistema NutriFitCoach:
- Site: https://nutrifitcoach.com.br
- Blog: www.nutrifitcoach.com.br

---

**Desenvolvido como parte do ENEM Pro Platform**
**© 2025 NutriFitCoach - Conteúdo baseado em evidências científicas**
