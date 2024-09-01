import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import sy75c from "@/data/produtos/mini-escavadeira/sy75c/sy75c"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={sy75c} />
  );
}
export default ProductPage;