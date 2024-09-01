import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import sy55c from "@/data/produtos/mini-escavadeira/sy55c/sy55c"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={sy55c} />
  );
}
export default ProductPage;