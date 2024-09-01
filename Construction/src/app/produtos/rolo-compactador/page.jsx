import React from "react";
import Product from "@components/Produtos/Product"; // Importando o componente ProductPage
import SSR120C10 from "@/data/produtos/rolo-compactador/SSR120C10"; // Importando as informações específicas do produto SY135C
function ProductPage() {
  return (
    <Product product={SSR120C10} />
  );
}
export default ProductPage;