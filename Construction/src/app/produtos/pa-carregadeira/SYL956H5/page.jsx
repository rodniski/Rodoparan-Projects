import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SYL956H5 from "@/data/produtos/pa-carregadeira/SYL956H5/SYL956H5"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SYL956H5} />
  );
}
export default ProductPage;