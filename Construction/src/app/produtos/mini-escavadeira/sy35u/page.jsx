import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import sy35u from "@/data/produtos/mini-escavadeira/sy35u/sy35u"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={sy35u} />
  );
}
export default ProductPage;