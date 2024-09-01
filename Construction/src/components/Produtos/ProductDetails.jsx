"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Importa useInView

function ProductDetails({ product }) {
  const { dev, name } = product;
  const [ref, inView] = useInView(); // Usa o hook useInView para detectar a visibilidade do componente

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        type: "spring", // Tipo de transição desejado
        stiffness: 100, // Rigidez desejada
      },
    },
  };

  return (
    <div
      className="flex justify-between items-center pb-2 px-6 bg-slate-100"
      ref={ref}
    >
      {/* Detalhes do desenvolvimento */}
      <motion.div
        className=""
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={itemVariants}
      >
        <div className="mb-8">
          <motion.h3
            className="text-red-600 text-lg font-bold"
            variants={itemVariants}
          >
            {name}
          </motion.h3>
          <motion.h1
            className="text-3xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            {dev.titulo}
          </motion.h1>
          <motion.p className="text-base text-gray-700" variants={itemVariants}>
            {dev.segDesc}
          </motion.p>
        </div>

        {/* Highlights */}
        {dev.High && (
          <motion.div variants={itemVariants}>
            {[dev.High.High1, dev.High.High2, dev.High.High3].map((highlight, index) => (
              <div key={index} className="flex items-center mb-4 max-w-48">
                <img
                  src={highlight.image}
                  alt="Highlight icon"
                  className="mr-2"
                />
                <div>
                  <h4 className="text-black font-semibold text-lg">
                    {highlight.title}
                  </h4>
                  <p className="text-base text-gray-700">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ProductDetails;
