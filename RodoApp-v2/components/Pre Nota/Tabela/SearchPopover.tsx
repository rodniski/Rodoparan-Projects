import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

interface SearchPopoverProps {
  columns: string[];
  onFilterChange: (column: string, value: string) => void;
  table: any; // Passe a instância da tabela como uma prop
}

export const SearchPopover: React.FC<SearchPopoverProps> = ({
  columns,
  onFilterChange,
  table,
}) => {
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onFilterChange(selectedColumn, searchValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Search className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3 w-86" align="end">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger className="p-2 border rounded-md w-24 border-none focus:border-none">
                <SelectValue placeholder="Escolha uma coluna" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((column) => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Digite para buscar..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Separator />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto w-full">
                  Visualizar Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column: Column<any, any>) => column.getCanHide()) // Adicione o tipo aqui
                  .map(
                    (
                      column: Column<any, any> // E aqui também
                    ) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={handleSearch}
            size={"sm"}
            className="mt-2 text-white"
          >
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
