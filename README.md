# Chapada Conectada

Plataforma de turismo da **Chapada das Mesas**, Maranhão — conectando turistas, atrativos, guias e parceiros em um ecossistema completo de descoberta, reserva e pagamento.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui |
| Backend | Next.js Route Handlers + Server Actions |
| Banco | PostgreSQL 16 + Prisma ORM |
| Auth | Auth.js (NextAuth v5) |
| Validação | Zod |
| Pagamentos | Interface desacoplada — Mock (MVP) → Mercado Pago |
| Mídia | Cloudinary (storage externo) |
| Infra local | Docker Compose |
| Deploy | Vercel + Neon (PostgreSQL gerenciado) |

## Pré-requisitos

- Node.js 20+
- Docker Desktop
- npm

## Instalação

```bash
# 1. Clonar e instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Subir PostgreSQL
docker compose up -d

# 4. Aplicar migrations e seed
npm run db:migrate
npm run db:seed

# 5. Iniciar desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint |
| `npm run test` | Testes (Vitest) |
| `npm run db:migrate` | Prisma migrate dev |
| `npm run db:seed` | Popular banco com dados iniciais |
| `npm run db:studio` | Prisma Studio |

## Estrutura

```
src/
├── app/           # Rotas Next.js (App Router)
├── components/    # UI e componentes de domínio
├── config/        # Configurações do site
├── lib/           # Utilitários e clientes
├── server/        # Lógica de negócio (services, payments)
└── generated/     # Prisma Client (gerado)
```

## Documentação

Consulte a pasta [`docs/`](./docs/) para arquitetura, banco de dados, API, fluxos e variáveis de ambiente.

## MVP — Escopo atual

- [x] Setup do projeto
- [x] Schema do banco de dados
- [x] Interface de pagamento (mock)
- [ ] Autenticação
- [ ] Atrativos (CRUD + páginas públicas)
- [ ] Guias + disponibilidade
- [ ] Reservas + pagamento
- [ ] Dashboards (turista, parceiro, admin)

## Licença

Proprietário — Chapada Conectada © 2026
