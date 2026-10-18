import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌿 Seeding Chapada Conectada...");

  const destination = await prisma.destination.upsert({
    where: { slug: "chapada-das-mesas" },
    update: {},
    create: {
      name: "Chapada das Mesas",
      slug: "chapada-das-mesas",
      description:
        "Paraíso natural no Maranhão com cachoeiras, poços azuis e formações rochosas únicas.",
      state: "MA",
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "natureza" },
    update: {},
    create: {
      name: "Natureza",
      slug: "natureza",
      description: "Cachoeiras, poços e trilhas",
      icon: "trees",
    },
  });

  const adminPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@chapadaconectada.com.br" },
    update: {},
    create: {
      email: "admin@chapadaconectada.com.br",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  const attractions = [
    {
      slug: "poco-azul",
      name: "Poço Azul",
      shortDescription: "Águas cristalinas em meio à natureza",
      description:
        "Um dos cartões-postais da Chapada das Mesas, o Poço Azul encanta visitantes com suas águas azul-turquesa e entorno preservado.",
      latitude: -7.01234567,
      longitude: -46.05432109,
      priceFrom: 45,
      difficulty: "EASY" as const,
      avgVisitMinutes: 120,
      capacity: 80,
    },
    {
      slug: "encanto-azul",
      name: "Encanto Azul",
      shortDescription: "Poço de águas azuis profundas",
      description:
        "Experiência única de flutuação em águas azuis profundas, cercado pela vegetação nativa do cerrado maranhense.",
      latitude: -7.02345678,
      longitude: -46.0654321,
      priceFrom: 40,
      difficulty: "EASY" as const,
      avgVisitMinutes: 90,
      capacity: 60,
    },
    {
      slug: "complexo-pedra-caida",
      name: "Complexo Pedra Caída",
      shortDescription: "Cachoeira impressionante entre rochas",
      description:
        "Formação rochosa espetacular com queda d'água de mais de 100 metros, ideal para aventura e contemplação.",
      latitude: -7.03456789,
      longitude: -46.07654321,
      priceFrom: 35,
      difficulty: "MODERATE" as const,
      avgVisitMinutes: 180,
      capacity: 100,
    },
    {
      slug: "cachoeira-do-prata",
      name: "Cachoeira do Prata",
      shortDescription: "Cachoeira com piscinas naturais",
      description:
        "Cachoeira de grande porte com várias piscinas naturais, perfeita para banho e relaxamento em meio à natureza.",
      latitude: -7.0456789,
      longitude: -46.08765432,
      priceFrom: 30,
      difficulty: "MODERATE" as const,
      avgVisitMinutes: 150,
      capacity: 70,
    },
  ];

  for (const attr of attractions) {
    const location = await prisma.location.create({
      data: {
        city: "Carolina",
        state: "MA",
        latitude: attr.latitude,
        longitude: attr.longitude,
        address: "Chapada das Mesas, MA",
      },
    });

    await prisma.attraction.upsert({
      where: { slug: attr.slug },
      update: {},
      create: {
        destinationId: destination.id,
        categoryId: category.id,
        locationId: location.id,
        slug: attr.slug,
        name: attr.name,
        description: attr.description,
        shortDescription: attr.shortDescription,
        difficulty: attr.difficulty,
        avgVisitMinutes: attr.avgVisitMinutes,
        capacity: attr.capacity,
        priceFrom: attr.priceFrom,
        status: "ACTIVE",
        rules: "Respeite a natureza. Não deixe lixo. Use protetor solar biodegradável.",
      },
    });
  }

  console.log("✅ Seed concluído!");
  console.log("   Admin: admin@chapadaconectada.com.br / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
