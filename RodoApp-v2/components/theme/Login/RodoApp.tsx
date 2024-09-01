import Logo from "@/public/logo";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

const RodoApp = () => {
  const words = ["Rodoparaná", "Grupo Timber", "RodoApp."];
  return (
    <div className="flex justify-start items-center w-96 h-fit">
      <Logo className="text-blue-800 h-10 w-10 2xl:size-20" />
      <span className="text-3xl xl:text-4xl  font-bold underline text-white decoration-blue-800">
      <FlipWords words={words} /> <br />
      </span>
    </div>
  );
};

export default RodoApp;
