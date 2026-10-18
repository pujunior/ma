# Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores.

## Obrigatórias (desenvolvimento)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://chapada:chapada_dev@localhost:5432/chapada_conectada` |
| `AUTH_SECRET` | Secret do Auth.js | Gerar com `openssl rand -base64 32` |
| `AUTH_URL` | URL base da app | `http://localhost:3000` |

## App

| Variável | Descrição | Default |
|----------|-----------|---------|
| `APP_NAME` | Nome da aplicação | `Chapada Conectada` |
| `APP_URL` | URL pública | `http://localhost:3000` |
| `NODE_ENV` | Ambiente | `development` |

## Cloudinary (mídia)

| Variável | Descrição |
|----------|-----------|
| `CLOUDINARY_CLOUD_NAME` | Nome do cloud |
| `CLOUDINARY_API_KEY` | API key |
| `CLOUDINARY_API_SECRET` | API secret |

## Mercado Pago (futuro)

| Variável | Descrição |
|----------|-----------|
| `MERCADOPAGO_ACCESS_TOKEN` | Token de acesso |
| `MERCADOPAGO_PUBLIC_KEY` | Chave pública |
| `MERCADOPAGO_WEBHOOK_SECRET` | Secret para validar webhooks |

## Pagamento

| Variável | Descrição | Default |
|----------|-----------|---------|
| `PAYMENT_PROVIDER` | `mock` ou `mercadopago` | `mock` |

## Produção (Vercel + Neon)

1. Crie projeto no [Neon](https://neon.tech) e copie a `DATABASE_URL`
2. Configure as variáveis no dashboard da Vercel
3. Gere `AUTH_SECRET` seguro para produção
4. Configure domínio em `APP_URL` e `AUTH_URL`
