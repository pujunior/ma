export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Atrativos", href: "/atrativos" },
  { label: "Guias", href: "/guias" },
  { label: "Hotéis", href: "/hoteis", disabled: true },
  { label: "Restaurantes", href: "/restaurantes", disabled: true },
  { label: "Passeios", href: "/passeios", disabled: true },
  { label: "Agências", href: "/agencias", disabled: true },
  { label: "Blog", href: "/blog", disabled: true },
] as const;

export const categoryCards = [
  {
    label: "Atrativos",
    href: "/atrativos",
    description: "Cachoeiras, poços e mirantes",
    enabled: true,
  },
  {
    label: "Guias",
    href: "/guias",
    description: "Profissionais locais certificados",
    enabled: true,
  },
  {
    label: "Hotéis e pousadas",
    href: "/hoteis",
    description: "Hospedagem na região",
    enabled: false,
  },
  {
    label: "Restaurantes",
    href: "/restaurantes",
    description: "Sabores do Maranhão",
    enabled: false,
  },
  {
    label: "Passeios",
    href: "/passeios",
    description: "Experiências organizadas",
    enabled: false,
  },
  {
    label: "Agências",
    href: "/agencias",
    description: "Pacotes completos",
    enabled: false,
  },
] as const;
