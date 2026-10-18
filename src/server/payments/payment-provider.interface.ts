import type { PaymentMethod, PaymentStatus } from "@/generated/prisma";

export interface CreatePaymentInput {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  payerEmail: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  externalId: string;
  status: PaymentStatus;
  checkoutUrl?: string;
  pixQrCode?: string;
  pixCopyPaste?: string;
}

export interface WebhookResult {
  externalId: string;
  status: PaymentStatus;
  paidAt?: Date;
}

export interface RefundResult {
  externalId: string;
  status: PaymentStatus;
  refundedAt: Date;
}

/**
 * Interface desacoplada para gateways de pagamento.
 * Implementações: MockPaymentProvider (MVP), MercadoPagoProvider (futuro).
 */
export interface PaymentProvider {
  readonly name: string;

  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;

  getPaymentStatus(externalId: string): Promise<PaymentStatus>;

  handleWebhook(payload: unknown, signature?: string): Promise<WebhookResult>;

  refund(externalId: string, amount?: number): Promise<RefundResult>;
}
