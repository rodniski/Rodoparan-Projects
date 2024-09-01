// src/components/theme/header/links.ts

import { IconAffiliate, IconGraph, IconUserFilled, IconWheel } from "@tabler/icons-react";
import { ReactNode } from "react";

// Defina a estrutura dos links do menu com tipos explícitos
type SubMenuLink = {
  title: string;
  href?: string;
  description?: string;
};

type MenuLink = {
  title: string;
  icon?: ReactNode; // Ícone pode ser qualquer componente React
  href?: string;
  submenu?: SubMenuLink[];
};

export const links: MenuLink[] = [
  {
    title: "Pré Notas",
    icon: <IconGraph className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />,
    submenu: [
      { title: "Dashboard", href: "/inicio", description: "Visão geral das pré notas" },
      { title: "Incluir", href: "/inicio/incluir", description: "Adicionar nova pré nota" },
      { title: "Dados", href: "/inicio/dados", description: "Gerenciamento de dados" },
    ],
  },
  {
    title: "Controle de Portaria",
    icon: <IconWheel className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />,
    href: "/inicio/portaria",
  },
  {
    title: "Usuário",
    icon: <IconUserFilled className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />,
    submenu: [
      { title: "Sair", href: "/logout", description: "Encerrar sessão" },
      { title: "Tema", href: "#", description: "Alternar tema do sistema" },
    ],
  },
  {
    title: "Links Externos",
    icon: <IconAffiliate className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />,
    submenu: [
      { title: "Intranet", href: "https://sites.google.com/site/baserodoparana/home", description: "Acesse a intranet" },
      { title: "Suporte", href: "http://hesk.rodoparana.com.br/", description: "Acesse o suporte técnico" },
    ],
  },
];
