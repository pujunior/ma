import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MapPin,
  Mountain,
  Star,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categoryCards } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const featuredAttractions = [
  {
    slug: "poco-azul",
    name: "Poço Azul",
    location: "Carolina, MA",
    description: "Águas cristalinas em meio à natureza exuberante.",
    rating: 4.9,
    priceFrom: 45,
  },
  {
    slug: "encanto-azul",
    name: "Encanto Azul",
    location: "Carolina, MA",
    description: "Poço de águas azuis profundas para flutuação.",
    rating: 4.8,
    priceFrom: 40,
  },
  {
    slug: "complexo-pedra-caida",
    name: "Complexo Pedra Caída",
    location: "Carolina, MA",
    description: "Cachoeira impressionante entre formações rochosas.",
    rating: 4.7,
    priceFrom: 35,
  },
  {
    slug: "cachoeira-do-prata",
    name: "Cachoeira do Prata",
    location: "Carolina, MA",
    description: "Piscinas naturais e paisagens de tirar o fôlego.",
    rating: 4.8,
    priceFrom: 30,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-white/10 text-white backdrop-blur-sm"
            >
              {siteConfig.destination}, Maranhão
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Descubra a Chapada das Mesas
            </h1>
            <p className="mt-6 text-lg leading-8 text-emerald-100">
              Natureza exuberante, águas cristalinas, aventuras e experiências
              inesquecíveis te esperam aqui.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-10 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Para onde você quer ir?
                </label>
                <Input placeholder="Ex: Poço Azul" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Quando?
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Quantas pessoas?
                </label>
                <Input type="number" min={1} defaultValue={2} />
              </div>
              <div className="flex items-end">
                <Button className="w-full" size="lg">
                  Buscar passeios
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            Explore por categoria
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tudo o que você precisa para sua aventura
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((cat) => {
            const icons: Record<string, React.ReactNode> = {
              Atrativos: <Mountain className="size-6" />,
              Guias: <Compass className="size-6" />,
            };
            return (
              <Link
                key={cat.label}
                href={cat.enabled ? cat.href : "#"}
                className={!cat.enabled ? "pointer-events-none" : undefined}
              >
                <Card
                  className={`group h-full transition-all hover:shadow-lg ${!cat.enabled ? "opacity-50" : "hover:-translate-y-1"}`}
                >
                  <CardHeader>
                    <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {icons[cat.label] ?? <MapPin className="size-6" />}
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {cat.label}
                      {!cat.enabled && (
                        <Badge variant="secondary" className="text-xs">
                          Em breve
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Destinos em destaque
              </h2>
              <p className="mt-2 text-muted-foreground">
                Os lugares mais procurados da região
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <Link href="/atrativos">
                Ver todos
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAttractions.map((attr) => (
              <Card
                key={attr.slug}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-600 to-teal-700" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{attr.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {attr.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    {attr.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                      {attr.rating}
                    </div>
                    <p className="text-sm font-semibold">
                      A partir de R$ {attr.priceFrom}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/atrativos/${attr.slug}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground sm:px-16">
          <Users className="mx-auto size-10 opacity-80" />
          <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
            Pronto para sua aventura?
          </h2>
          <p className="mx-auto mt-2 max-w-lg opacity-90">
            Reserve passeios, contrate guias locais e viva experiências
            inesquecíveis na Chapada das Mesas.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-6"
          >
            <Link href="/atrativos">
              Explorar atrativos
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
