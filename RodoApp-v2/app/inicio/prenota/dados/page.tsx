"use client";
import React from "react";
import Tabela from "./table/tabela";
import { motion } from "framer-motion";


// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

export const dados = () => {
  return (
    <div className="2xl:p-10 p-8 w-full h-full">
      <motion.div
        className="flex justify-center items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Tabela />
      </motion.div>
    </div>
  );
};

export default dados;
