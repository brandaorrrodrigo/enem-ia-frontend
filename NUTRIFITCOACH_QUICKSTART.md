# 🌸 NutriFitCoach Hub - Guia Rápido

## ✨ O que foi criado?

Um hub completo com **60 artigos científicos** sobre saúde feminina, integrado ao seu projeto ENEM Pro.

## 🚀 Como Acessar

### 1. Iniciar o servidor

```bash
cd D:\enem-ia\enem-pro
npm run dev
```

### 2. Acessar no navegador

**Página Principal:**
```
http://localhost:3000/nutrifitcoach
```

**Exemplo de Artigo:**
```
http://localhost:3000/nutrifitcoach/artigo/fisiologia-ciclo-menstrual
```

## 📚 Recursos Disponíveis

### Página Principal
- ✅ 60 artigos catalogados
- ✅ 7 categorias temáticas
- ✅ Sistema de busca por texto e tags
- ✅ Filtro por categoria
- ✅ Artigos em destaque
- ✅ Design responsivo (mobile/desktop)

### Página de Artigo
- ✅ Renderização completa do HTML original
- ✅ Botão de compartilhamento
- ✅ Informações de tempo de leitura
- ✅ Tags e categorias
- ✅ Artigos relacionados
- ✅ CTA para NutriFitCoach.com.br

## 🎨 Categorias

1. **🌸 Ciclo Hormonal** (10 artigos)
   - Fisiologia do ciclo
   - Fases e periodização
   - Sono e retenção hídrica

2. **💎 Hormônios Femininos** (12 artigos)
   - Estrogênio, progesterona, testosterona
   - Cortisol e insulina
   - Contraceptivos e menopausa

3. **🏥 Condições de Saúde** (18 artigos)
   - SOP, endometriose, miomas
   - Tireoide, anemia, osteoporose
   - Acne, celulite, queda de cabelo

4. **🥗 Nutrição Feminina** (5 artigos)
   - Seed cycling
   - Fitoestrógenos
   - Anti-inflamatórios naturais

5. **💪 Treinamento** (4 artigos)
   - Periodização feminina
   - Tríade da atleta
   - RED-S

6. **🧘 Saúde Mental** (4 artigos)
   - Depressão e ansiedade
   - Transtornos alimentares
   - TDPM

7. **🤰 Reprodução & Fertilidade** (7 artigos)
   - Fertilidade e pré-concepção
   - Nutrição na gravidez
   - Amamentação

## 🔍 Como Usar

### Buscar Artigos
1. Use a barra de busca na página principal
2. Digite palavras-chave (ex: "SOP", "treino", "progesterona")
3. Os resultados filtram em tempo real

### Filtrar por Categoria
1. Clique em qualquer categoria
2. Veja apenas artigos daquela categoria
3. Clique em "Todos os Artigos" para voltar

### Compartilhar Artigos
1. Abra qualquer artigo
2. Clique no botão "Compartilhar" no topo
3. Use o menu nativo do seu dispositivo

## 📁 Estrutura de Arquivos

```
D:\enem-ia\enem-pro\
├── app/
│   ├── nutrifitcoach/
│   │   ├── page.tsx                 # Hub principal
│   │   └── artigo/[slug]/page.tsx   # Página de artigo
│   └── api/
│       └── nutrifitcoach/
│           └── article/[id]/route.ts # API de artigos
├── lib/
│   └── nutrifitcoach/
│       ├── types.ts                  # TypeScript types
│       └── articles-data.ts          # Dados dos 60 artigos
└── docs/
    └── nutrifitcoach-hub.md         # Documentação completa
```

## 🎯 Próximos Passos

### Personalização
- Edite cores em `app/nutrifitcoach/page.tsx`
- Altere categorias em `lib/nutrifitcoach/articles-data.ts`
- Adicione novos artigos seguindo o padrão existente

### Produção
```bash
npm run build    # Build de produção
npm start        # Servidor de produção
```

### Deploy
O sistema está pronto para deploy em:
- Vercel (recomendado)
- Netlify
- AWS
- Qualquer hosting Node.js

## ⚠️ Importante

Os artigos HTML estão em:
```
D:\ebooks\artigos_feminino\
```

Certifique-se de que esse diretório esteja acessível no servidor de produção ou mova os arquivos para dentro do projeto.

## 🔗 Links

- **Hub Local:** http://localhost:3000/nutrifitcoach
- **Site NutriFitCoach:** https://nutrifitcoach.com.br
- **Blog:** www.nutrifitcoach.com.br

## 💡 Dicas

1. **Mobile First**: O design é otimizado para mobile
2. **SEO Pronto**: Cada artigo tem meta tags apropriadas
3. **Performance**: Cache de 1 hora nos artigos HTML
4. **Acessibilidade**: Cores e contrastes otimizados

---

**Desenvolvido em:** 08/12/2025
**Tecnologias:** Next.js 16, TypeScript, Tailwind CSS, Lucide Icons
**Total de Artigos:** 60
**Categorias:** 7
