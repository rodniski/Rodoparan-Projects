import { ColumnDef } from "@tanstack/react-table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { PreNota } from "@/types/PreNota";
import { TabelaSelect } from "@/components/Pre Nota/Tabela/Select";
import { SortableHeader } from "@/components/Pre Nota/Tabela/SortableHeader";
import { StatusIcon } from "@/components/Pre Nota/Tabela/StatusIcon";
import { SearchPopover } from "@/components/Pre Nota/Tabela/SearchPopover";
import { UserAvatar } from "@/components/Pre Nota/Tabela/UserName";
import { IconFlag, IconFold, IconFoldDown, IconFoldUp } from "@tabler/icons-react";

export const columns: ColumnDef<PreNota>[] = [
  {
    accessorKey: "usuario",
    header: "Usuário",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <UserAvatar username={row.original.usuario} />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Status"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start">
        <StatusIcon type="status" value={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "filial",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Filial"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => <div className="text-start">{row.original.filial}</div>,
  },
  {
    accessorKey: "nf",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Nota Fiscal"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start truncate max-w-64">{row.original.nf}</div>
    ),
  },
  {
    accessorKey: "fornece",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Fornecedor"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start truncate w-fit max-w-86">{row.original.fornece}</div>
    ),
  },
  {
    accessorKey: "emissao",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Emissão"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => <div className="text-start">{row.original.emissao}</div>,
  },
  {
    accessorKey: "inclusao",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Inclusão"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => <div className="text-start">{row.original.inclusao}</div>,
  },
  {
    accessorKey: "vencimento",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Vencimento"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => <div className="text-start">{row.original.vencimento}</div>,
  },
  {
    accessorKey: "valor",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Valor"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start">
        {row.original.valor
          ? row.original.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "R$ 0,00"}
      </div>
    ),
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Tipo"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start">
        <StatusIcon type="tipo" value={row.original.tipo} />
      </div>
    ),
  },
  {
    accessorKey: "obs",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Observações"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ getValue }) => {
      const obs = getValue() as string;
      return (
        <div className="max-w-48 text-ellipsis overflow-hidden text-start">
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate">{obs}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <p>{obs}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      );
    },
  },
  {
    header: "Prioridade",
    cell: ({ row }) => {
      const priority = row.original.prioridade
        ? row.original.prioridade.toLowerCase().trim()
        : "";
  
      let IconComponent;
      let iconClass;
  
      switch (priority) {
        case "alta":
          IconComponent = IconFoldUp;
          iconClass = "text-red-500";
          break;
        case "media":
          IconComponent = IconFoldDown;
          iconClass = "text-yellow-500";
          break;
        case "baixa":
          IconComponent = IconFold;
          iconClass = "text-green-500";
          break;
        default:
          IconComponent = IconFlag;
          iconClass = "text-gray-500";
      };
  
      return (
        <div className={`flex items-center space-x-2 ${iconClass}`}>
          <IconComponent />
          <span>{priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : "N/A"}</span>
        </div>
      );
    },
  },  
  {
    id: "actions",
    header: ({ table }) => (
      <div className="flex justify-center">
        <SearchPopover
          columns={table.getAllColumns().map((column) => column.id as string)} // Convert to string if needed
          onFilterChange={(column, value) => {
            const tableColumn = table.getColumn(column);
            if (tableColumn) {
              tableColumn.setFilterValue(value);
            }
          }}
          table={table} // Pass table instance as prop
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start flex justify-center">
        <TabelaSelect
          onAction={(action) => {
            console.log(`Action selected: ${action}`, row.original);
          }}
        />
      </div>
    ),
  },
];
