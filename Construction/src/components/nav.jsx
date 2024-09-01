"use client"; // Sessão de importações:
import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { motion } from "framer-motion"; // Importe motion
import Logo from "./logo/Logo";
import {
  Bars3Icon,
  XMarkIcon,
  BuildingStorefrontIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TbBackhoe } from "react-icons/tb";
import { MdEditRoad } from "react-icons/md";
import { FaMountainCity } from "react-icons/fa6";
import { GiHorizonRoad, GiMiningHelmet } from "react-icons/gi";
import { BiSolidCategoryAlt } from "react-icons/bi";

//JSONs
const categorias = [
  {
    name: "Terraplanagem",
    description: "Inclui Mini Escavadeira, Escavadeira e Retroescavadeira",
    items: [
      {
        name: "Mini Escavadeiras",
        description: "Versatilidade e eficiência em espaços restritos.",
        href: "/produtos/mini-escavadeira",
        icon: BuildingStorefrontIcon,
      },
      {
        name: "Escavadeiras",
        description: "Potência para a sua obra.",
        href: "/produtos/escavadeira",
        icon: BuildingOffice2Icon,
      },
      {
        name: "SANY BHL75",
        description: "Retroescavadeira Versátil para projetos diversos.",
        href: "/produtos/retroescavadeira",
        icon: TbBackhoe,
      },
    ],
  },
  {
    name: "Pavimentação",
    description: "Inclui Rolo Compactador, Pá Carregadeira e Motoniveladora",
    items: [
      {
        name: "Pá Carregadeira",
        description: "Eficácia em cada movimento.",
        href: "/produtos/pa-carregadeira",
        icon: FaMountainCity,
      },
      {
        name: "SANY STG190C-8",
        description: "Motoniveladora de precisão",
        href: "/produtos/motoniveladora",
        icon: MdEditRoad,
      },
      {
        name: "SANY SSR120C10",
        description: "Rolo Compactador de Alta Performance",
        href: "/produtos/rolo-compactador",
        icon: GiHorizonRoad,
      },
    ],
  },
  {
    name: "Mineração",
    description: "Inclui Caminhão para Mineração",
    items: [
      {
        name: "SANY STK90S",
        description: "Caminhão para Mineração",
        href: "/produtos/caminhao",
        icon: GiMiningHelmet,
      },
    ],
  },
];
const callsToAction = [
  { name: "Mineração", href: "/produtos/caminhao", icon: GiMiningHelmet },
  { name: "Categorias", href: "/produtos", icon: BiSolidCategoryAlt },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveringCategoria, setHoveringCategoria] = useState(null); // Estado para controlar qual categoria está sendo hover

  return (
    <header className="p-2 md:p-2 backdrop-blur-xl bg-slate-100 bg-opacity-90 shadow-sm">
      <nav
        className="flex w-full bg-transparent justify-between items-center md:px-8"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Timber | Sany</span>
            <Logo />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden mx-6 lg:flex gap-x-3 focus:text-slate-600">
          {categorias.map((categoria) => (
            <Popover
              key={categoria.name}
              className="relative"
              onMouseEnter={() => setHoveringCategoria(categoria.name)} // Atualiza o estado da categoria ao entrar
              onMouseLeave={() => setHoveringCategoria(null)} // Reseta o estado da categoria ao sair
            >
              <Popover.Button className="flex items-center gap-x-1 lg:text-xs xl:text-base xl:py-4 uppercase font-bold leading-6 text-slate-950 hover:text-slate-600">
                {categoria.name}
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-slate-800"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                show={hoveringCategoria === categoria.name} // Exibe o submenu apenas se a categoria estiver sendo hover
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg">
                  <div className="p-4 ">
                    {categoria.items.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-lg leading-6 hover:bg-slate-300"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                          className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                        >
                          <item.icon
                            className="h-6 w-6 text-stone-800 group-hover:text-red-700"
                            aria-hidden="true"
                          />
                        </motion.div>
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block font-semibold text-stone-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="https://grupotimber.com.br"
            className="text-lg font-semibold uppercase leading-6 text-slate-800 hover:text-red-700"
          >
            Grupo Timber
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Dialog.Panel className="fixed inset-0 z-50 flex justify-end">
          <Transition
            show={mobileMenuOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel
              as={motion.div}
              initial={{ x: "100%" }}
              animate={{ x: mobileMenuOpen ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-200"
            >
              {/* Conteúdo do menu Mobile */}
              <div className="p-6">
                {/* LOGO */}
                <div className="flex items-center justify-between mb-6">
                  <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Timber | Sany</span>
                    <img
                      className="h-8 w-auto"
                      src="/Timber x Sany BL.png"
                      alt=""
                    />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* MENU CONTENT */}
                <div>
                  {/* Produtos */}
                  <div className="my-6">
                    {categorias.map((categoria) => (
                      <Disclosure
                        key={categoria.name}
                        as="div"
                        className="mb-2"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                "flex w-full items-center justify-between pr-3.5 font-semibold text-slate-800",
                                open ? "text-red-500" : ""
                              )}
                            >
                              {categoria.name}
                              <ChevronDownIcon
                                className={classNames(
                                  open ? "transform rotate-180" : "",
                                  "h-8 w-8 flex-none"
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 rounded-xl">
                              {categoria.items.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="block py-2 bg-slate-100 pl-6 pr-3 font-semibold text-gray-900 flex items-center"
                                >
                                  <item.icon
                                    className="h-8 w-8 flex-none text-red-600 mr-3"
                                    aria-hidden="true"
                                  />
                                  <span>{item.name}</span>
                                </a>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>

                  {/* Grupo Timber */}
                  <div className="my-6 ">Grupo Timber</div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition>
        </Dialog.Panel>

        {/* Fundo escuro para fechar o menu ao clicar fora */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </Dialog>
    </header>
  );
}
