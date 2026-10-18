# Fluxos de Negócio — Chapada Conectada

## Fluxo principal (MVP)

```
Turista acessa Home
  → Busca atrativo (ex: Poço Azul)
  → Abre /atrativos/poco-azul
  → Visualiza fotos e informações
  → Escolhe data, horário e quantidade
  → Sistema verifica disponibilidade
  → Login/cadastro (se necessário)
  → Confirma reserva
  → Pagamento (mock → Mercado Pago)
  → Recebe confirmação com bookingCode
  → Reserva aparece em /dashboard
  → Após visita: avaliação
```

## Reserva

1. Turista seleciona atrativo + data + horário + pessoas
2. Service calcula preço e verifica capacidade
3. Cria `Booking` (status PENDING) + `BookingItem`
4. Gera `bookingCode` único
5. Redireciona para pagamento
6. Pagamento confirmado → status PAID → CONFIRMED
7. Notificação enviada ao turista

## Disponibilidade (Guias)

1. Guia configura slots em `/partner/agenda`
2. Cada slot: data, horário, capacidade, preço
3. Guia pode bloquear datas
4. Reserva consome capacidade do slot
5. UNIQUE constraint impede conflitos

## Avaliação

1. Reserva deve ter status COMPLETED
2. Um review por booking (UNIQUE)
3. Nota 1-5 + comentário opcional + fotos
4. Atualiza rating médio do atrativo/guia

## Cancelamento

1. Turista solicita cancelamento
2. Verifica política (prazo mínimo)
3. Atualiza booking → CANCELLED
4. Aciona refund via PaymentProvider
5. Libera capacidade do slot

## Comissão (futuro)

1. Booking confirmada gera Commission
2. Admin aprova repasse
3. Mercado Pago split ou transferência manual
