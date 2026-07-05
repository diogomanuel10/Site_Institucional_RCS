# Site Institucional — Real Clube Senhorense

Site institucional público do **Real Clube Senhorense (RCS)**, clube de voleibol
da Senhora da Hora, Matosinhos. É a montra pública do clube e **consome os dados
desportivos** (jogos, resultados, escalões) do **RCSGestão** através de uma API só
de leitura. O RCSGestão continua a ser a fonte de verdade.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** com os tokens de design da marca (navy + dourado + creme)
- Tipografia: **Oswald** (títulos/placard) + **Inter** (corpo)
- **MDX** para notícias (versionadas no repositório)
- **Upstash Redis** + **Resend** para as encomendas da loja (fase 1)
- Deploy na **Vercel**, com ISR/cache nos dados desportivos

## Arranque

```bash
npm install
cp .env.example .env.local   # preencher variáveis (ver abaixo)
npm run dev                  # http://localhost:3000
```

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`.

## Variáveis de ambiente

Ver `.env.example`. Todas são **opcionais em desenvolvimento** — o site funciona
com dados fictícios e sem loja ativa:

| Variável | Para quê |
| --- | --- |
| `RCSGESTAO_API_URL` / `RCSGESTAO_API_TOKEN` | API de leitura do RCSGestão. Sem ela, usam-se dados fictícios (`lib/data/fixtures.ts`). |
| `RESEND_API_KEY`, `ENCOMENDAS_FROM_EMAIL`, `ENCOMENDAS_TO_EMAIL` | Email de confirmação de encomendas. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Registo das encomendas para consulta posterior. |

## Estrutura

```
app/
  layout.tsx            # layout global, fontes, nav + footer
  page.tsx              # homepage (todas as secções)
  noticias/             # lista + página de notícia (MDX)
  loja/                 # grelha de produtos + formulário
  api/encomendas/       # serverless function das encomendas
components/
  layout/               # Navbar, Footer
  sections/             # Hero, Notícias, Jogos, Equipas, Iniciativas, Loja, Clube
  shop/                 # grelha + formulário de encomenda
  ui/                   # Crest (emblema), Button, Section
content/noticias/       # artigos .mdx (ficheiro = slug)
lib/
  rcsgestao/            # cliente + tipos da API do RCSGestão
  data/                 # dados fictícios / conteúdo institucional
  news.ts, format.ts, orders.ts
```

## Integração com o RCSGestão

O cliente está em `lib/rcsgestao/client.ts` e espera os endpoints:

- `GET /teams` → escalões ativos (`Team[]`)
- `GET /matches` → jogos agendados e terminados (`Match[]`)

Os tipos do contrato estão em `lib/rcsgestao/types.ts` e devem ser confirmados
contra o esquema real do RCSGestão. Enquanto `RCSGESTAO_API_URL` não estiver
definida, o site usa os dados fictícios de `lib/data/fixtures.ts`.

## Notícias (MDX)

Criar um ficheiro `.mdx` em `content/noticias/` (o nome do ficheiro é o slug),
com frontmatter `title`, `date`, `excerpt` e, opcionalmente, `author`,
`category`, `featured`. Push → deploy. Sem base de dados nem painel.

## Loja (fase 1)

Sem pagamento online. O formulário de encomenda envia para a serverless function
`/api/encomendas`, que valida (Zod), grava no Redis e dispara email (Resend). A
confirmação instrui o utilizador a pagar por MB WAY/transferência e a levantar no
pavilhão.

## Conteúdo real ainda em falta

Marcado com `TODO(conteúdo real)` / `PLACEHOLDER` no código:

- Escalões verdadeiros, contactos, morada e redes sociais (`lib/data/club.ts`)
- Estatísticas do clube, próximos jogos e resultados reais
- Fotos reais (equipa, pavilhão, jogo)
- **Emblema oficial em SVG** (substituir `components/ui/Crest.tsx` e
  `public/emblema.svg`)
