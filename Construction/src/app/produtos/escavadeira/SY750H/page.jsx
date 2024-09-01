import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY750H from "@/data/produtos/escavadeira/SY750H/SY750H"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY750H} />
  );
}
export default ProductPage;