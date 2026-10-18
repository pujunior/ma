import { nanoid } from "nanoid";

import type {
  CreatePaymentInput,
  PaymentProvider,
  PaymentResult,
  RefundResult,
  WebhookResult,
} from "./payment-provider.interface";

export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    const externalId = `mock_${nanoid(12)}`;

    if (input.method === "PIX") {
      return {
        externalId,
        status: "PENDING",
        pixQrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${externalId}`,
        pixCopyPaste: `00020126580014br.gov.bcb.pix0136${externalId}`,
      };
    }

    return {
      externalId,
      status: "PENDING",
      checkoutUrl: `/pagamento/mock/${externalId}`,
    };
  }

  async getPaymentStatus(externalId: string) {
    // MVP: simula pagamento aprovado após consulta
    void externalId;
    return "PAID" as const;
  }

  async handleWebhook(payload: unknown): Promise<WebhookResult> {
    const data = payload as { externalId?: string };
    return {
      externalId: data.externalId ?? "unknown",
      status: "PAID",
      paidAt: new Date(),
    };
  }

  async refund(externalId: string): Promise<RefundResult> {
    return {
      externalId,
      status: "REFUNDED",
      refundedAt: new Date(),
    };
  }
}
