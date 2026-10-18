# Guia de Instalação

## 1. Clonar repositório

```bash
git clone <repo-url> chapada-conectada
cd chapada-conectada
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Configurar ambiente

```bash
cp .env.example .env
```

Edite `.env` com seus valores. Para desenvolvimento local, os defaults do `.env.example` funcionam.

## 4. Subir banco de dados

```bash
docker compose up -d
```

Verifique: `docker compose ps` deve mostrar postgres healthy.

## 5. Aplicar schema

```bash
npm run db:migrate
npm run db:seed
```

## 6. Rodar

```bash
npm run dev
```

## 7. Verificar

- App: http://localhost:3000
- Prisma Studio: `npm run db:studio`

## Troubleshooting

### Porta 5432 ocupada
Altere a porta no `docker-compose.yml` e atualize `DATABASE_URL`.

### Erro de conexão Prisma
Aguarde o healthcheck do Postgres (`docker compose logs postgres`).

### AUTH_SECRET
Gere um valor seguro:
```bash
openssl rand -base64 32
```
