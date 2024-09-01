import React from "react";
import ProductHero from "./ProductHero"; // Importando o componente ProductHero
import ProductDetails from "./ProductDetails";
import ProductFooter from "./ProductFooter"; // Importando o componente 
function Product({ product }) {
  return (
    <div className="container h-auto mx-auto mt-15  flex flex-col justify-center bg-slate-100"> {/* Adicione a classe bg-slate-100 aqui */}
      {/* Hero do produto */}
      <ProductHero product={product}/>

      {/* Detalhes do produto */}
      <ProductDetails product={product} className="pt-12" />

      {/* Rodapé do produto */}
      <div id="form">
      <ProductFooter specs={product.specs} />
      </div>
    </div>
  );
}

export default Product;


