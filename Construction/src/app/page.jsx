"use client";
import { motion } from "framer-motion";
import Head from "next/head";

const Homepage = () => {
  return (
    <>
      <Head>
        <title>Excelência na Construção - Inovação em Maquinário</title>
        <meta
          property="og:title"
          content="Excelência na Construção - Inovação em Maquinário"
        />
        <meta
          property="og:description"
          content="Com dedicação à qualidade e domínio da tecnologia de construção, nosso portfólio destaca uma variedade de projetos de maquinário que incorporam nosso compromisso com o desempenho superior."
        />
        <meta property="og:image" content="/roloCompactador/highlight.png" />
        <meta
          property="og:url"
          content="https://construction.grupotimber.com.br"
        />
      </Head>
      <motion.div
        className="h-screen flex items-end justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/site/LP.mp4" type="video/mp4" />
        </video>
        <div className="absolute bg-gradient-to-t from-black to-transparent p-3 md:p-8 w-full rounded-2xl flex flex-col items-center justify-center shadow-lg">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            Maquinas SANY
          </h1>
          <p className="text-white text-base md:text-lg lg:text-xl px-2 mb-8 text-center">
            Construa um lugar melhor
          </p>
          <div className="flex gap-2 md:gap-4">
            <a
              href="/produtos"
              className="p-1 text-center font-bold text-lg text-white flex items-center rounded-lg  bg-red-600 md:bg-transparent md:ring-2 md:ring-white md:p-4 hover:ring-red-700 hover:bg-red-700 hover:text-white"
            >
              Nossos Produtos
            </a>
          </div>
        </div>
      </motion.div>

    </>
  );
};

export default Homepage;
