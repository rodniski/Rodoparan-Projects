"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { clearAuthData, getAuthData } from "@/lib/idb";
import { Button } from "./button";
import {
  Search,
  Mail,
  Bell,
  Grid,
  BarChart,
  FileText,
  ShoppingBag,
  CreditCard,
  Package,
  Trash2,
  UserCircle,
  ChevronDown,
  Orbit,
  PanelRightDashed,
  HelpCircle,
  Moon,
  Sun,
  FileCode2,
  UsersRound,
  DoorOpen,
  Banknote,
  Landmark,
  HandCoins,
  PackageOpen,
  FileArchive,
  BookOpenCheck,
} from "lucide-react";

// Define os ícones utilizados no Sidebar
export const Icons = {
  xml: FileCode2,
  search: Search,
  inbox: Mail,
  bell: Bell,
  dashboard: Grid,
  analytics: BarChart,
  report: FileText,
  summary: ShoppingBag,
  invoice: CreditCard,
  manufacture: Package,
  trash: Trash2,
  user: UserCircle,
  chevronDown: ChevronDown,
  orbit: Orbit,
  panel: PanelRightDashed,
  help: HelpCircle,
  moon: Moon,
  users: UsersRound,
  sun: Sun,
  door: DoorOpen,
  note: Banknote,
  box: PackageOpen,
  bank: Landmark,
  coin: HandCoins,
  archive: FileArchive,
  book: BookOpenCheck,
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  badge?: string;
  isExpanded: boolean;
  href?: string;
  className?: string;
  onClick?: () => void; // Certifique-se de que é uma função opcional
}

export function SidebarItem({
  icon: Icon,
  label,
  href = "#",
  badge,
  isExpanded,
  className,
  onClick, // Desestrutura onClick
}: SidebarItemProps) {
  return (
    <Link href={href} passHref>
      <div
        onClick={onClick} // Usa a função onClick se ela estiver definida
        className={`flex items-center justify-between py-2 px-2 text-sm font-medium bg-card rounded-md transition-all duration-300 cursor-pointer ${
          isExpanded ? "" : "justify-center"
        } ${className}`}
      >
        <div className={`flex items-center space-x-3`}>
          <Icon className="w-5 h-5" />
          {isExpanded && <span>{label}</span>}
        </div>
        {isExpanded && badge && (
          <span className="px-2 py-1 text-xs text-white bg-blue-500/60 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}

// Componente para a seção do Sidebar
interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  isExpanded: boolean;  
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="">
      <h3 className="mb-2 text-xs font-semibold text-gray-500">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// Componente para o menu do usuário no Sidebar
interface UserMenuProps {
  isExpanded: boolean;
}

export function SidebarLinks({
  title,
  children,
  isExpanded,
}: SidebarSectionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title || ""}>
        <AccordionTrigger className="text-foreground/80 active:text-foreground">
          {title}
        </AccordionTrigger>
        <AccordionContent className="space-y-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function UserMenu({ isExpanded }: UserMenuProps) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Recupera os dados de autenticação armazenados no IndexedDB
    getAuthData().then((authData) => {
      if (authData.username) {
        setUsername(authData.username);
      }
    });
  }, []);

  const handleLogout = () => {
    // Limpa todos os dados armazenados
    clearAuthData();

    // Redireciona o usuário para a página de login
    window.location.href = "/";
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="user-menu">
        <AccordionTrigger className="w-full border-t">
          <div className={`flex items-center w-full justify-between px-5 py-2 text-sm font-medium bg-card rounded-md transition-all duration-300 ${!isExpanded && "justify-center"}`}>
            <div className="flex items-center space-x-1">
              <Icons.user className="w-6 h-6 text-blue-500" />
              {isExpanded && (
                <div>
                  <p>{username || "Carregando..."}</p>
                </div>
              )}
            </div>
            {isExpanded && <Icons.chevronDown className="w-4 h-4" />}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="mx-5 mt-2">
            <Button
              variant={"destructive"}
              onClick={handleLogout}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
