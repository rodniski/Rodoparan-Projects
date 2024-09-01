import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash, FileText, History, ListPlus, Paperclip, PackageSearch } from "lucide-react";
import TimeSheet from "../Sheet/Timeline";
import ProSheet from "@/components/Pre Nota/Sheet/Products";
import { events, products, infos } from "@/data/filters";

export function TabelaSelect({ onAction }: { onAction: (action: string) => void }) {
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false);
  const [isProductsSheetOpen, setIsProductsSheetOpen] = useState(false);

  const handleHistoryClick = () => {
    setIsHistorySheetOpen(true);
  };

  const handleProductsClick = () => {
    setIsProductsSheetOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={'icon'} className="flex items-center space-x-2">
            <ListPlus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction('alterar')}>
            <Edit className="mr-2 h-4 w-4" />
            Alterar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction('excluir')}>
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction('revisar')}>
            <FileText className="mr-2 h-4 w-4" />
            Revisar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleHistoryClick}>
            <History className="mr-2 h-4 w-4" />
            Histórico
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleProductsClick}>
            <PackageSearch className="mr-2 h-4 w-4" />
            Produtos
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction('anexo')}>
            <Paperclip className="mr-2 h-4 w-4" />
            Anexo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TimeSheet
        events={events}
        isOpen={isHistorySheetOpen}
        onClose={() => setIsHistorySheetOpen(false)}
      />
      <ProSheet
        products={products}
        infos={infos}
        isOpen={isProductsSheetOpen}
        onClose={() => setIsProductsSheetOpen(false)}
      />
    </>
  );
}
