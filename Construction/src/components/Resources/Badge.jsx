import React from "react";

const Badge = ({ peso, potencia, capacidade, tipo, controle, cargaNominal, tipoLamina, forcaCentrifuga, pesoBruto }) => {
  // Função para determinar a cor com base no tipo
  const getBadgeColor = (tipo) => {
    switch (tipo) {
      case "Elétrica":
        return "bg-blue-800 text-blue-50 ring-blue-600/20";
      case "Combustão":
        return "bg-red-800 text-red-50 ring-red-600/20";
      case "Off-Road":
        return "bg-orange-800 text-orange-50 ring-orange-600/20";
      default:
        return "bg-amber-50 text-amber-800 ring-amber-600/20";
    }
  };
  const getDotColor = (tipo) => {
    switch (tipo) {
      case "Elétrica":
      case "Combustão":
      case "Off-Road":
        return "";
      default:
        return "bg-amber-500";
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Renderiza os badges correspondentes ao produto */}
      {tipo && (
        <div className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getBadgeColor(tipo)} ring-1 ring-inset`}>
          {getDotColor(tipo) && <span className={`inline-block h-2 w-2 ${getDotColor(tipo)} mr-2 rounded-full`}></span>}
          {`${tipo}`}
        </div>
      )}
      {peso && (
        <div className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
          <span className="inline-block h-2 w-2 bg-amber-500 mr-2 rounded-full"></span>
          {`Peso: ${peso}`}
        </div>
      )}
      {potencia && (
        <div className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
          <span className="inline-block h-2 w-2 bg-amber-500 mr-2 rounded-full"></span>
          {`Potência: ${potencia}`}
        </div>
      )}
      {capacidade && (
        <div className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20">
          <span className="inline-block h-2 w-2 bg-amber-500 mr-2 rounded-full"></span>
          {`Capacidade: ${capacidade}`}
        </div>
      )}
      {controle && (
        <div className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="inline-block h-2 w-2 bg-orange-500 mr-2 rounded-full"></span>
          {`Controle: ${controle}`}
        </div>
      )}
      {cargaNominal && (
        <div className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="inline-block h-2 w-2 bg-orange-500 mr-2 rounded-full"></span>
          {`Carga Nominal: ${cargaNominal}`}
        </div>
      )}
      {tipoLamina && (
        <div className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="inline-block h-2 w-2 bg-orange-500 mr-2 rounded-full"></span>
          {`Tamanho da Lâmina: ${tipoLamina}`}
        </div>
      )}
      {forcaCentrifuga && (
        <div className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="inline-block h-2 w-2 bg-orange-500 mr-2 rounded-full"></span>
          {`Força Centrífuga: ${forcaCentrifuga}`}
        </div>
      )}
      {pesoBruto && (
        <div className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">
          <span className="inline-block h-2 w-2 bg-orange-500 mr-2 rounded-full"></span>
          {`Peso Bruto: ${pesoBruto}`}
        </div>
      )}
    </div>
  );
};

export default Badge;
