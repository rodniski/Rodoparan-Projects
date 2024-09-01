import React from "react";
import Categorias from "@/components/Categorias";
import productsData from "@/data/productsData";

export default function pacarregadeiraPage() {
  // Acessando os produtos da Retro Escavadeira
  const category = "Pá Carregadeira";
  const pacarregadeiraCategoryData = productsData[category];
  const pacarregadeiraProducts = pacarregadeiraCategoryData.products;
  return (
    <Categorias
      category={category}
      products={pacarregadeiraProducts}
    />
  );
}
