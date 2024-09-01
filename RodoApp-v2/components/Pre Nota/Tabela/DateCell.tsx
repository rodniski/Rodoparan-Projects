// src/components/DateCell.tsx

import React from "react";
import { parse, differenceInDays } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DateCellProps {
  rawDateInclusion: string;
  rawDateEmission: string;
  rawDateDue: string;
}

export const DateCell: React.FC<DateCellProps> = ({
  rawDateInclusion,
  rawDateEmission,
  rawDateDue,
}) => {
  let differenceInDaysValueInclusion = 0;
  let differenceInDaysValueDue = 0;

  try {
    // Parse the dates assuming they are in "dd-MM-yyyy" format
    const parsedInclusionDate = parse(rawDateInclusion, "dd-MM-yyyy", new Date());
    const parsedEmissionDate = parse(rawDateEmission, "dd-MM-yyyy", new Date());
    const parsedDueDate = parse(rawDateDue, "dd-MM-yyyy", new Date());/*  */
    
    const currentDate = new Date();

    // Calculate the difference in days between inclusion and emission dates
    differenceInDaysValueInclusion = differenceInDays(parsedInclusionDate, parsedEmissionDate);

    // Calculate the difference in days between due date and current date
    differenceInDaysValueDue = differenceInDays(parsedDueDate, currentDate);
  } catch (e) {
    console.error("Erro ao parsear datas:", e);
  }

  // Determine the class based on the difference in days for inclusion
  let inclusionTextClass = "text-lime-600"; // Default color
  if (differenceInDaysValueInclusion > 10) {
    inclusionTextClass = "text-rose-600";
  } else if (differenceInDaysValueInclusion > 5) {
    inclusionTextClass = "text-amber-600";
  }

  // Determine the class based on the difference in days for due date
  let dueTextClass = "text-lime-600 2xl:text-lg"; // Default color
  if (differenceInDaysValueDue < 0) {
    dueTextClass = "text-rose-600 2xl:text-lg";
  } else if (differenceInDaysValueDue < 2) {
    dueTextClass = "text-amber-600 2xl:text-lg";
  } else if (differenceInDaysValueDue > 3) {
    dueTextClass = "text-lime-600 2xl:text-lg";
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className={dueTextClass}>{rawDateDue}</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit 2xl:text-lg">
        <p>Inclusão: {rawDateInclusion}</p>
        <p className={inclusionTextClass}>Emissão: {rawDateEmission}</p>
        <p className={dueTextClass}>Vencimento: {rawDateDue}</p>
      </HoverCardContent>
    </HoverCard>
  );
};
