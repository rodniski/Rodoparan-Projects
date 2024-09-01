"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ProductHero({ product }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const staggerDelay = 0.1;

  return (
    <div className="bg-slate-100 flex md:justify-between my-20 xl:h-[75vh] xl:flex-row flex-col items-center mx-6 gap-5">
      {/* Conteúdo da esquerda */}
      <div className="w-full mb-6 md:mb-0">
        {/* Categoria */}
        <div className="flex flex-col  xl:w-full lg:flex-row">
          <div className="lg:w-1/2 xl:w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl lg:text-xl xl:text-2xl uppercase font-bold text-slate-600"
            >
              {product.categoria}
            </motion.h2>
            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold md:font-black text-red-600 mb-3"
            >
              {product.name}
            </motion.h1>
            {/* Em estoque */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center mb-4"
            >
              <img
                src="/svgs/check.svg"
                alt="Check icon"
                className="w-6 xl:w-[30px] mr-2 text-black"
              />
              <p className="text-xs md:text-sm lg:text-base xl:text-base  text-slate-600">
                Em estoque e a pronta entrega
              </p>
            </motion.div>
            {/* Imagem do produto (SM:) */}
            <motion.img
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              src={product.image}
              alt={`Imagem do ${product.name}`}
              className="sm:max-h-96 mb-3 md:max-h-auto w-full object-cover lg:hidden rounded-3xl"
            />
            {/* Descrição do produto */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="font-medium text-base md:text-lg lg:text-xl xl:text-xl text-slate-600 mb-4"
            >
              {product.desc}
            </motion.p>
          </div>
          <div className="">
            <img
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              src={product.Image}
              alt={`Imagem do ${product.name}`}
              className="hidden lg:block xl:hidden h-full object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {/* Destaques */}
          <ul className="mt-8 flex gap-2 md:flex-wrap justify-center xl:justify-start">
            {Object.values(product.features).map((highlight, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.6 + staggerDelay * index }}
                className="flex items-center mb-4"
              >
                <img
                  src={highlight.image}
                  alt="Highlight icon"
                  className="mr-2"
                />
                <div>
                  <p className="text-base md:text-base lg:text-lg xl:text-xl text-black font-medium">
                    {highlight.descrição}
                  </p>
                  <p className="text-gray-600">{highlight.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
          {/* Botão de fazer orçamento */}
          <a href="#form">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="rounded-lg bg-red-600 hover:bg-red-500 text-lg text-white font-medium py-3 px-8 lg:mt-8 flex justify-center items-center"
              action="window.location='#form'"
            >
              Fazer Orçamento
            </motion.button>
          </a>
        </div>
      </div>
      {/* Imagem (MD:) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
        className="w-full"
      >
        <motion.img
          src={product.image}
          alt={`Imagem do ${product.name}`}
          className="w-full rounded-3xl hidden xl:block"
        />
      </motion.div>
    </div>
  );
}

export default ProductHero;
