import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY215H from "@/data/produtos/escavadeira/SY215H/SY215H"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY215H} />
  );
}
export default ProductPage;