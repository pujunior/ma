import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = ["", "/atrativos", "/guias", "/app"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const attractions = [
    "poco-azul",
    "encanto-azul",
    "complexo-pedra-caida",
    "cachoeira-do-prata",
  ].map((slug) => ({
    url: `${baseUrl}/atrativos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...attractions];
}
