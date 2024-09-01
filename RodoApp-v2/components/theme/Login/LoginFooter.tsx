import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LoginFooter = () => {
  return (
    <motion.div
      className="flex w-full space-x-2 2xl:space-x-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}  // Adiciona delay para animar após outros elementos
    >
      <Button
        variant={"ghost"}
        className="text-blue-500/80 hover:text-blue-400 2xl:text-xl 2xl:py-6"
      >
        Precisa de Suporte?
      </Button>
      <Button
        variant={"ghost"}
        className="text-blue-500/80 hover:text-blue-400 2xl:text-xl 2xl:py-6"
      >
        Acesse nossa Intranet
      </Button>
    </motion.div>
  );
};

export default LoginFooter;
