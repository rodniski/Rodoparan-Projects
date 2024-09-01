import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SY215C10 from "@/data/produtos/escavadeira/SY215C10/SY215C10"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SY215C10} />
  );
}
export default ProductPage;