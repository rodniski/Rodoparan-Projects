import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SW936K from "@/data/produtos/pa-carregadeira/SW936K/SW936K"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SW936K} />
  );
}
export default ProductPage;