# Regras de Negócio — Chapada Conectada

## Autenticação

- Senhas hasheadas com bcrypt (cost 12)
- Email único por usuário
- Contas suspensas não podem fazer login
- Verificação de email obrigatória em produção

## Reservas

- `bookingCode` gerado automaticamente, formato: `CC-YYYYMMDD-XXXXXX`
- Reserva PENDING expira após 30 minutos sem pagamento
- Capacidade do slot decrementada atomicamente na confirmação
- Cancelamento gratuito até 24h antes da visita (configurável)

## Disponibilidade

- Guia não pode ter dois slots no mesmo horário (UNIQUE constraint)
- Bloqueio de data impede novas reservas naquele dia
- Capacidade mínima: 1, máxima: configurável pelo parceiro

## Pagamentos

- MVP: MockPaymentProvider simula PIX e cartão
- Futuro: MercadoPagoProvider com webhook IPN
- Pagamento PAID → Booking CONFIRMED automaticamente
- Reembolso → Booking REFUNDED

## Avaliações

- Apenas reservas COMPLETED podem ser avaliadas
- Uma avaliação por reserva (UNIQUE bookingId)
- Nota de 1 a 5 (inteiro)
- Rating médio recalculado a cada nova avaliação
- Fotos opcionais via Cloudinary

## Comissões (futuro)

- Taxa padrão: 10% sobre valor da reserva
- Comissão gerada na confirmação do pagamento
- Repasse manual no MVP, automático com Mercado Pago split

## RBAC

| Ação | TOURIST | GUIDE | ATTRACTION | ADMIN |
|------|---------|-------|------------|-------|
| Ver atrativos | ✅ | ✅ | ✅ | ✅ |
| Reservar | ✅ | ❌ | ❌ | ✅ |
| Gerenciar agenda | ❌ | ✅ | ❌ | ✅ |
| Gerenciar horários | ❌ | ❌ | ✅ | ✅ |
| Ver todas reservas | ❌ | Próprias | Próprias | ✅ |
| Avaliar | ✅ | ❌ | ❌ | ❌ |
