import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY365H from "@/data/produtos/escavadeira/SY365H/SY365H"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY365H} />
  );
}
export default ProductPage;