import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Baixar o App",
  description: `Em breve: aplicativo ${siteConfig.name} para iOS e Android.`,
};

export default function AppDownloadPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Smartphone className="size-10" />
      </div>
      <h1 className="mt-8 font-heading text-3xl font-bold tracking-tight">
        App em desenvolvimento
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Estamos construindo o aplicativo {siteConfig.name} para iOS e Android.
        Enquanto isso, use nossa plataforma web — totalmente responsiva e
        otimizada para mobile.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          Voltar ao início
        </Link>
      </Button>
    </div>
  );
}
