import React from "react";
import Head from "next/head";
import Categorias from "@/components/Categorias";
import productsData from "@/data/productsData";

export default function escavadeiraPage() {
  // Acessando os produtos da Retro Escavadeira
  const category = "Escavadeira";
  const escavadeiraCategoryData = productsData[category];
  const escavadeiraProducts = escavadeiraCategoryData.products;
  return (
    <>
      <Head>
        <title>Escavadeiras Sany - Grupo Timber</title>
        <meta
          name="description"
          content="Nossas escavadeiras são construídas com tecnologia de ponta e características inovadoras para garantir a máxima produtividade e durabilidade em qualquer ambiente de trabalho."
        />
      </Head>
      <Categorias category={category} products={escavadeiraProducts} />
    </>
  );
}
