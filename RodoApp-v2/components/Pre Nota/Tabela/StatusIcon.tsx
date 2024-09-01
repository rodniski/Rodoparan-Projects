import React from "react";
import {
  ChevronsUp,
  Minus,
  ChevronsDown,
  Flag,
  CheckCheck,
  Clock,
  MessageSquareQuote,
  FolderSync,
  Boxes,
  Shirt,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface StatusIconProps {
  type: "Status" | "Prioridade" | "tipo";
  value: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ type, value }) => {
  let IconComponent: React.ElementType = Flag;
  let colorClass = "text-gray-600";

  switch (type) {
    case "Status":
      switch (value) {
        case "Classificado":
          IconComponent = CheckCheck;
          colorClass = "text-emerald-500";
          break;
        case "Revisar":
          IconComponent = MessageSquareQuote;
          colorClass = "text-red-500";
          break;
        case "Pendente":
          IconComponent = Clock;
          colorClass = "text-amber-500";
          break;
        default:
          IconComponent = Flag;
          colorClass = "text-gray-600";
          break;
      }
      break;

    case "Prioridade":
      switch (value?.toLowerCase().trim()) {
        case "alta":
          IconComponent = ChevronsUp;
          colorClass = "text-red-500 ";
          break;
        case "media":
          IconComponent = Minus;
          colorClass = "text-amber-500";
          break;
        case "baixa":
          IconComponent = ChevronsDown;
          colorClass = "text-emerald-500";
          break;
        default:
          IconComponent = Flag;
          colorClass = "text-gray-600";
          break;
      }
      break;

    case "tipo":
      switch (value) {
        case "Despesa/Imobilizado":
          IconComponent = Boxes;
          colorClass = "text-teal-500";
          break;
        case "Revenda":
          IconComponent = FolderSync;
          colorClass = "text-teal-500";
          break;

        case "Materia Prima":
          IconComponent = FolderSync;
          colorClass = "text-violet-600";
          break;
        case "Collection":
          IconComponent = Shirt;
          colorClass = "text-teal-500";
          break;
      }
      break;

    default:
      IconComponent = Flag;
      colorClass = "text-gray-600";
      break;
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="w-full flex items-center justify-center">
          <IconComponent className={`size-5 2xl:size-7 ${colorClass}`} />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <p>{value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A"}</p>
      </HoverCardContent>
    </HoverCard>
  );
};
