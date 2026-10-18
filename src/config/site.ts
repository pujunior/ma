export const siteConfig = {
  name: "Chapada Conectada",
  tagline: "Descubra. Planeje. Viva.",
  destination: "Chapada das Mesas",
  description:
    "Plataforma de turismo da Chapada das Mesas, Maranhão — descubra atrativos, contrate guias, reserve passeios e viva experiências inesquecíveis.",
  url: process.env.APP_URL ?? "http://localhost:3000",
  locale: "pt_BR" as const,
  keywords: [
    "Chapada das Mesas",
    "turismo Maranhão",
    "Poço Azul",
    "passeios",
    "guias turísticos",
    "reservas",
  ],
};

export type SiteConfig = typeof siteConfig;
