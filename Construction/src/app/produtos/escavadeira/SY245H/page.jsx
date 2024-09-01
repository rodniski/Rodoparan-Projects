import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY245H from "@/data/produtos/escavadeira/SY245H/SY245H"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY245H} />
  );
}
export default ProductPage;