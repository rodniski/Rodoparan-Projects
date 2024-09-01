import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import sy26u from "@/data/produtos/mini-escavadeira/sy26u/sy26u"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={sy26u} />
  );
}
export default ProductPage;