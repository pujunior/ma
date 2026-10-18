# Arquitetura — Chapada Conectada

## Visão geral

Monolito modular em **Next.js App Router** com separação clara de camadas:

```
UI (React + shadcn/ui)
  ↓
Route Handlers / Server Actions (validação Zod)
  ↓
Services (regras de negócio)
  ↓
Repositories (Prisma)
  ↓
PostgreSQL
```

## Decisões arquiteturais

### Next.js full-stack (vs NestJS separado)

**Escolha:** Next.js monolito modular.

**Motivos:**
- Equipe pequena — um repositório, um deploy
- Auth.js integra nativamente
- SEO/SSR nativo para atrativos e guias
- Time-to-MVP mais rápido

**Consequência:** Lógica de negócio em `src/server/`, não nas rotas. Permite extrair para microserviço futuro.

### Deploy: Vercel + Neon

**Escolha:** Vercel (frontend/API) + Neon (PostgreSQL serverless).

**Motivos:**
- Zero config para Next.js
- Neon tem free tier generoso
- Backups automáticos
- Connection pooling nativo

**Local:** Docker Compose com PostgreSQL 16.

### Mídia: Cloudinary

**Escolha:** Cloudinary para fotos, vídeos e reels.

**Motivos:**
- Upload, resize e CDN inclusos
- Free tier adequado para MVP
- SDK simples — sem gerenciar buckets S3

**Consequência:** Entidade `Media` armazena URLs; arquivos ficam no Cloudinary.

### Pagamentos: Mercado Pago (futuro)

**Escolha:** Interface `PaymentProvider` com mock no MVP.

**Motivos:**
- Mercado Pago é o gateway mais usado no Brasil
- Suporte nativo a PIX
- Split de pagamento para comissões futuras

**Implementação futura:** `MercadoPagoProvider` substituindo `MockPaymentProvider`.

## RBAC

| Role | Permissões MVP |
|------|----------------|
| TOURIST | Reservar, favoritar, avaliar |
| GUIDE | Gerenciar agenda, preços, reservas |
| ATTRACTION | Gerenciar horários e capacidade |
| ADMIN | Acesso total |
| HOTEL, RESTAURANT, AGENCY | Schema pronto, UI pós-MVP |

## Módulos futuros (stubs)

- **Mapa interativo:** `Location` com lat/lng; componente de mapa na Fase pós-MVP
- **Roteiro IA:** endpoint `/api/itinerary/generate` com interface preparada
- **PWA:** `manifest.json` + service worker na Fase 14

## Diagrama

```
┌─────────────┐     ┌──────────────────┐     ┌────────────┐
│   Browser   │────▶│  Next.js App     │────▶│ PostgreSQL │
│  (React)    │     │  Route Handlers  │     │   (Neon)   │
└─────────────┘     │  Auth.js         │     └────────────┘
                    │  Services        │
                    └────────┬─────────┘
                             │
                    ┌────────┴─────────┐
                    │ Cloudinary │ Mock │
                    │  (mídia)   │ Pay │
                    └──────────────────┘
```
