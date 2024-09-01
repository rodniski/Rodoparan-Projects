import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY135C from "@/data/produtos/mini-escavadeira/sy135c/SY135C"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY135C} />
  );
}
export default ProductPage;