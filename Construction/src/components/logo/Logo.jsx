import Image from "next/image";
import React from "react";
const Logo = () => {
  return (
    <div className="flex gap-2 divide-x divide-black/90">
      <div className="flex flex-col items-end">
        <Image
          className="relative"
          src="/logo/timber.svg"
          alt="Timber Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: '20px' }} 
        />
        <h1 className="text-2xl leading-3 font-medium text-rose-700 font-darker">
          construction
        </h1>
      </div>
      <Image
        className="relative pl-2"
        src="/logo/sany.svg"
        alt="Timber Logo"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '35px' }} 
      />
    </div>
  );
};

export default Logo;
