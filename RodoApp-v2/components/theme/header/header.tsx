"use client";
import * as React from "react";

import Link from "next/link";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Logo from "@/public/logo";
import { Menu, Search } from "lucide-react";
import { DarkInner } from "@theme-toggles/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";

const portaria: { title: string; href: string; description: string }[] = [
  {
    title: "Dashboard",
    href: "/inicio/portaria/",
    description:
      "Verifique métricas relacionadas ao controle de saída de Pneus",
  },
  {
    title: "Borracharia",
    href: "/inicio/portaria/borracharia",
    description:
      "Cliente levando pneus? Adicione a quantidade para ser verificada pela portaria",
  },
  {
    title: "Inspeção Portaria",
    href: "/inicio/portaria/inspecao",
    description: "Inspecione a quantidade de pneus sendo levados.",
  },
];
export function Header() {
  const [username, setUsername] = React.useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  // Buscando o username no localStorage quando o componente é montado
  React.useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Função para realizar logout
  const handleLogout = () => {
    // Remover o token e o nome de usuário do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Remover o token dos cookies
    Cookies.remove("token");

    // Redirecionar para a página de login
    window.location.href = "/"; // Ajuste o caminho da página de login conforme necessário
  };

  const handleThemeToggle = () => {
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 500); // Atraso de 300ms para a animação
  };

  return (
    <div className="w-full flex h-20 items-center gap-4 border-b bg-card p-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 flex-1">
        <div className="flex space-x-1 justify-center items-center">
          <Logo className="size-10" />
          <span className="lg:text-xl 2xl:text-2xl">RodoApp</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="lg:text-lg bg-card">
                Pré Documento de Entrada
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-card">
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <motion.a
                        whileHover={{ scale: 1.03 }} // Slightly grows the card on hover
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }} // Smooth animation
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/inicio"
                      >
                        <Logo className="size-6 lg:size-20" />
                        <div className="mb-2 mt-4 text-lg font-medium lg:text-2xl">
                          RodoApp
                        </div>
                        <p className="text-sm leading text-muted-foreground">
                          Ferramentas intuitiva para gerenciamento de operações
                          logísticas. Simplifique processos, aumente a
                          produtividade e mantenha o controle em tempo real.
                        </p>
                      </motion.a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <div className="flex flex-col justify-between h-full">
                      <ListItem href="/inicio/prenota/xml" title="Incluir XML">
                        Adicione sua XML para importar a nota do Conexão NFE.
                      </ListItem>
                      <ListItem
                        href="/docs/installation"
                        title="Incluir Manualmente"
                      >
                        Sem XML? Adicione sua pré nota manualmente.
                      </ListItem>
                      <ListItem
                        href="/inicio/prenota/dados"
                        title="Ver Notas Lançadas"
                      >
                        Analise as notas já lançadas no nosso sistema.
                      </ListItem>
                      <ListItem href="/inicio" title="Dashboard">
                        Acompanhe as métricas relacionadas às Pré notas.
                      </ListItem>
                    </div>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="lg:text-lg bg-card">
                Controle de Portaria
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 bg-card">
                  {portaria.map((portaria) => (
                    <ListItem
                      key={portaria.title}
                      title={portaria.title}
                      href={portaria.href}
                    >
                      {portaria.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="lg:text-lg bg-card">
                Empresa
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-card">
                <NavigationMenuItem>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <ListItem href="/inicio" title="Suporte">
                      Precisando de ajuda do administrativo? Abra um chamado!
                    </ListItem>
                    <ListItem href="/inicio" title="Intranet">
                      Acesse documentações e itens do RH? Acesse já.
                    </ListItem>
                  </ul>
                </NavigationMenuItem>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <div>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        
        </div></SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo className="size-10" />
              <span className="sr-only">RodoApp</span>
            </Link>
            <Link href="#" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div
          className="scale-150 hover:bg-transparent"
          onClick={handleThemeToggle}
        >
          <DarkInner
            duration={500}
            className="scale-150 h-12"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span>
              <Image
                src={"/avatar.png"}
                height={40}
                width={40}
                alt=""
                className="rounded-full"
              />
              <span className="sr-only">Toggle user menu</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <span className="text-red-500 ">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-transform hover:translate-x-1 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
