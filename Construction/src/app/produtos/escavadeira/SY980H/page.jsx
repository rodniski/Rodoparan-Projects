import React from "react";
import Product from "@components/Produtos/Product";  // Importando o componente ProductPage
import SY980H from "@/data/produtos/escavadeira/SY980H/SY980H"; // Importando as informações específicas do produto SY980H

function ProductPage() {
  return (
    <Product product={SY980H} />
  );
}

export default ProductPage;
