import type { PaymentProvider } from "./payment-provider.interface";

/**
 * Stub para integração futura com Mercado Pago.
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs
 *
 * Endpoints relevantes:
 * - POST /v1/payments (PIX e cartão)
 * - GET  /v1/payments/:id
 * - POST /v1/payments/:id/refunds
 * - Webhooks de notificação IPN
 */
export class MercadoPagoProviderStub implements PaymentProvider {
  readonly name = "mercadopago";

  createPayment() {
    throw new Error(
      "Mercado Pago ainda não configurado. Defina MERCADOPAGO_ACCESS_TOKEN.",
    );
  }

  getPaymentStatus() {
    throw new Error("Mercado Pago ainda não configurado.");
  }

  handleWebhook() {
    throw new Error("Mercado Pago ainda não configurado.");
  }

  refund() {
    throw new Error("Mercado Pago ainda não configurado.");
  }
}
