import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface UserAvatarProps {
  username: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ username }) => {
  // Função para pegar as iniciais a partir do username
  const getInitials = (username?: string) => {
    if (!username) return "??"; // Valor padrão se username for undefined

    const [firstName, lastName] = username.split(".");
    const firstInitial = firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = lastName?.charAt(0).toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  // Função para formatar o nome completo
  const getFullName = (username?: string) => {
    if (!username) return "Nome Desconhecido"; // Valor padrão se username for undefined

    const [firstName, lastName] = username.split(".");
    const formattedFirstName = firstName ? capitalize(firstName) : "";
    const formattedLastName = lastName ? capitalize(lastName) : "";
    return `${formattedFirstName} ${formattedLastName}`.trim();
  };

  // Função para capitalizar a primeira letra de cada nome
  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarFallback className="text-xs size-9 2xl:text-base 2xl:size-10">{getInitials(username)}</AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <p className="text-sm font-medium">{getFullName(username)}</p>
      </HoverCardContent>
    </HoverCard>
  );
};
