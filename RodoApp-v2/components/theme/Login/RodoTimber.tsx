import React from "react";
import Image from "next/image";
const RodoTimber = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {" "}
      <Image src={"/rodo.png"} width={5000} height={1000} alt={""}  className="w-28 lg:w-32 xl:w-40 object-contain "/>{" "}
      <span className="text-3xl font-light">|</span>
      <Image src={"/timber.svg"} width={5000} height={1000} alt={""} className="w-28 lg:w-32 xl:w-40 object-contain"/>
    </div>
  );
};

export default RodoTimber;
