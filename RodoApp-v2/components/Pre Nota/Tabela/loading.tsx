import React from "react";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
    <h1 className="text-xl font-bold animate-pulse">Aguarde, estamos montando a tabela para você...</h1>
      <Image src={"/sponge.webp"} height={100} width={380} alt={"Loading"} />
    </div>
  );
};

export default Loading;
