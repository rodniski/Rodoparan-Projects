import { Icons } from "@/components/ui/sidebar-components";
import { useTheme } from "next-themes";

export function topMenu(
) {
  return [
{
    items: [
      {
        icon: Icons.search,
        label: "Pesquisa Rápida",
        href: "/inicio/quick-search",
      },
    ],
  },
  {
    items: [
      {
        icon: Icons.inbox,
        label: "Mensagens",
        href: "/inicio/soon",
        badge: "Breve",
      },
      {
        icon: Icons.bell,
        label: "Notificações",
        href: "/inicio/soon",
        badge: "Breve",
      },
    ],
  },
]}


export function getMenuItems(
) {
  return [

    {
      section: "Pré Nota",
      items: [
        {
          icon: Icons.analytics,
          label: "Dashboard",
          href: "/inicio",
        },
        {
          icon: Icons.xml,
          label: "Incluir XML",
          href: "/inicio/incluir",
        },
        {
          icon: Icons.report,
          label: "Incluir Manualmente",
          href: "/inicio/manual",
        },
      ],
    },
    {
      section: "Finanças - Em breve",
      items: [
        {
          icon: Icons.note,
          label: "Despesa de Viagem",
          href: "/inicio/soon",
        },
        {
          icon: Icons.bank,
          label: "Consórcio",
          href: "/inicio/soon",
        },
        {
          icon: Icons.coin,
          label: "Credito",
          href: "/inicio/soon",
        },
      ],
    },
    {
      section: "Outros - Em breve",
      items: [
        {
          icon: Icons.door,
          label: "Controle de Portaria",
          href: "/inicio/soon",
        },
        {
          icon: Icons.box,
          label: "Inventário",
          href: "/inicio/soon",
        },
        {
          icon: Icons.archive,
          label: "Gestão de Documentos",
          href: "/inicio/soon",
        },
      ],
    },
  ];
}

export function BottomMenu(
  theme: string,
  toggleDarkMode: () => void

) {
  return [
    {
      items: [
        {
          icon: theme === "light" ? Icons.moon : Icons.sun,
          label: theme === "light" ? "Dark Mode" : "Light Mode",
          href: "#",
          onClick: toggleDarkMode,
        },
        {
          icon: Icons.book,
          label: "Tutoriais",
          badge: "Breve",
          href: "/inicio/soon",
        },
        {
          icon: Icons.users,
          label: "Intranet",
          href: "https://sites.google.com/site/baserodoparana/home",
        },
        {
          icon: Icons.help,
          label: "Suporte",
          href: "http://hesk.rodoparana.com.br/",
        },
      ],
    },
  ];
}
