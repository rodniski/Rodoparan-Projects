import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import sy16c from "@/data/produtos/mini-escavadeira/sy16c/sy16c"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={sy16c} />
  );
}
export default ProductPage;