# Banco de Dados — Chapada Conectada

## Provider

PostgreSQL 16 via Prisma ORM.

## Entidades MVP

| Modelo | Descrição |
|--------|-----------|
| User | Conta base com role e status |
| TouristProfile | Perfil do turista |
| Guide | Marketplace de guias |
| GuideAvailability | Slots de disponibilidade |
| Attraction | Atrativos turísticos |
| AttractionSchedule | Horários por dia da semana |
| Booking | Reserva com código único |
| BookingItem | Itens da reserva |
| Payment | Pagamento vinculado à reserva |
| Review | Avaliação (1 por reserva concluída) |
| Media | URLs de mídia externa |
| Location | Coordenadas geográficas |
| Destination | Destino turístico (Chapada das Mesas) |
| Category | Categorias de atrativos |

## Entidades preparadas (pós-MVP)

Hotel, Room, Restaurant, Agency, Tour, Package, Partner, Commission, Coupon, Notification, Message, Favorite.

## Regras importantes

### Disponibilidade
- `GuideAvailability`: UNIQUE(guideId, date, startTime)
- Transações Prisma para evitar double-booking

### Reservas
- `bookingCode`: identificador único legível (ex: `CC-20260816-ABC123`)
- Campo `qrCodeData` preparado para QR Code futuro

### Avaliações
- UNIQUE(bookingId) — uma avaliação por reserva
- Somente reservas com status COMPLETED

### Soft delete
- User, Guide, Attraction, Booking: campo `deletedAt`

## Migrations

```bash
npm run db:migrate    # Criar/aplicar migration
npm run db:seed       # Dados iniciais
npm run db:studio     # Interface visual
```

## Seed

O seed cria:
- Destino "Chapada das Mesas"
- 4 atrativos (Poço Azul, Encanto Azul, Pedra Caída, Cachoeira do Prata)
- Usuário admin: `admin@chapadaconectada.com.br`
