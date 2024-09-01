"use client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathName} className="w-screen h-screen bg-slate-100">
        {/* Animação do topo */}
        <motion.div
          className="h-screen w-screen fixed z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "100vh" }} // Modificado para 100vh para cobrir toda a tela
          transition={{ duration: 0.2, ease: "easeInOut" }} // Ajustado a duração e a função de easing
        />

        {/* Animação do conteúdo */}
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }} // Ajustado a duração e a função de easing
        />

        {/* Animação do fundo */}
        <motion.div
          className="h-screen w-screen fixed rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "100vh" }} // Modificado para 100vh para cobrir toda a tela
          animate={{ height: "0vh" }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }} // Ajustado a duração, a função de easing e o atraso
        />
        {/* Conteúdo */}
        <div className="h-[100vh]">{children}</div>
      </div>
      {/* Navegação */}
      <div className="h-auto w-full top-0 absolute">
        <Nav />
      </div>
      <Analytics />
      <SpeedInsights />
    </AnimatePresence>
  );
};

export default TransitionProvider;
