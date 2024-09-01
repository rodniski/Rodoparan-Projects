import React from "react";
import Categorias from "@/components/Categorias";
import productsData from "@/data/productsData";

export default function miniEscavadeiraPage() {
  // Acessando os produtos da Retro Escavadeira
  const category = "Mini Escavadeira";
  const miniEscavadeiraCategoryData = productsData[category];
  const miniEscavadeiraProducts = miniEscavadeiraCategoryData.products;
  return (
    <Categorias
      category={category}
      products={miniEscavadeiraProducts}
    />
  );
}
