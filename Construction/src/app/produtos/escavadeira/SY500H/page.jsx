import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY500H from "@/data/produtos/escavadeira/SY500H/SY500H"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY500H} />
  );
}
export default ProductPage;