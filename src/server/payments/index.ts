import type { PaymentProvider } from "./payment-provider.interface";
import { MercadoPagoProviderStub } from "./mercadopago-provider.stub";
import { MockPaymentProvider } from "./mock-payment-provider";

export function getPaymentProvider(): PaymentProvider {
  const provider = process.env.PAYMENT_PROVIDER ?? "mock";

  switch (provider) {
    case "mercadopago":
      return new MercadoPagoProviderStub();
    case "mock":
    default:
      return new MockPaymentProvider();
  }
}

export type { PaymentProvider } from "./payment-provider.interface";
