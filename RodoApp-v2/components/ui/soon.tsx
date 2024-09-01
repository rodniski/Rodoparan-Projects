import React from "react";
import Image from "next/image";
import svgImage from "@/public/soon.svg";

const soon = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-10">
      <div className="flex flex-col ">
        <h1 className="font-extrabold text-6xl text-center leading-relaxed">
          Em Breve
        </h1>
        <h2 className="text-2xl text-foreground/60 text-center leading-relaxed">
          Estamos trabalhando arduamente para lhe trazer algo incrível. <br />{" "}
          Fique atento a atualizações!
        </h2>
      </div>{" "}
      <Image
        src={svgImage}
        height={600}
        width={500}
        alt="Coming Soon"
        className="opacity-70"
      />
    </div>
  );
};

export default soon;
