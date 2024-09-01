import React from "react";
import { ChevronsUp, ChevronsDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps {
  title: string;
  isSorted: "asc" | "desc" | false | undefined; // Ajuste no tipo para refletir estados de ordenação
  onClick: () => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  title,
  isSorted,
  onClick,
}) => {
  // Determinar qual ícone exibir com base no estado de ordenação
  let Icon = ChevronsUpDown;
  if (isSorted === "asc") {
    Icon = ChevronsUp;
  } else if (isSorted === "desc") {
    Icon = ChevronsDown;
  }

  return (
    <Button
    variant={'ghost'}
      onClick={onClick}
      className="flex items-center justify-center text-center space-x-2 hover:text-foreground/70 focus:outline-none"
    >
      <span>{title}</span>
      <Icon className="h-4 w-4" />
    </Button>
  );
};