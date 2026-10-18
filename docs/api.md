# API — Chapada Conectada

## Convenções

- Base: `/api`
- Formato: JSON
- Validação: Zod em todas as entradas
- Auth: session cookie via Auth.js
- Erros: `{ error: string, details?: unknown }`

## Endpoints planejados

### Auth
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Cadastro turista |
| * | `/api/auth/[...nextauth]` | Auth.js handlers |

### Atrativos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/attractions` | Listar (filtros: q, category) |
| GET | `/api/attractions/[slug]` | Detalhe por slug |
| POST | `/api/attractions` | Criar (ADMIN) |
| PATCH | `/api/attractions/[id]` | Atualizar (ADMIN/PARTNER) |

### Guias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/guides` | Listar guias |
| GET | `/api/guides/[slug]` | Perfil do guia |
| GET | `/api/guides/[id]/availability` | Slots disponíveis |

### Reservas
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/bookings` | Criar reserva |
| GET | `/api/bookings` | Minhas reservas |
| GET | `/api/bookings/[code]` | Detalhe por código |
| PATCH | `/api/bookings/[id]/cancel` | Cancelar |

### Pagamentos
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/payments` | Iniciar pagamento |
| POST | `/api/webhooks/payment` | Webhook do gateway |

### Avaliações
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/reviews` | Criar avaliação |
| GET | `/api/reviews?itemType=&itemId=` | Listar por entidade |

## Rate limiting (futuro)

- Auth endpoints: 10 req/min
- API pública: 100 req/min
- Webhooks: sem limit (validação por signature)
