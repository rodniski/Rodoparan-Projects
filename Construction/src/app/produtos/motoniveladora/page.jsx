import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import STG190C8 from "@/data/produtos/motoniveladora/STG190C8"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={STG190C8} />
  );
}
export default ProductPage;
