"use client"

import { ColumnDef } from "@tanstack/react-table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { PreNota } from "@/types/PreNota";
import { TabelaSelect } from "@/components/Pre Nota/Tabela/Select";
import { SortableHeader } from "@/components/Pre Nota/Tabela/SortableHeader";
import { StatusIcon } from "@/components/Pre Nota/Tabela/StatusIcon";
import { SearchPopover } from "@/components/Pre Nota/Tabela/SearchPopover";
import { UserAvatar } from "@/components/Pre Nota/Tabela/UserName";
import { DateCell } from "@/components/Pre Nota/Tabela/DateCell";

export const columns: ColumnDef<PreNota>[] = [
  {
    accessorKey: "usuario",
    header: "Usuário",
    cell: ({ row }) => (
      <div className="flex justify-center ">
        <UserAvatar username={row.original.Usuario} />
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
    cell: ({ row }) => <div className="text-start 2xl:text-lg">{row.original.Filial}</div>,
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
      <div className="text-start truncate 2xl:text-lg">{row.original.NF}</div>
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
      <div className="text-start truncate w-fit max-w-80 2xl:max-w-full 2xl:text-base">{row.original.Fornecedor}</div>
    ),
  },
  {
    accessorKey: "dates",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Vencimento"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <DateCell
        rawDateInclusion={row.original.Inclusao}
        rawDateEmission={row.original.Emissao}
        rawDateDue={row.original.Vencimento}
      />
    ),
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
      <div className="text-start 2xl:text-lg">
        {row.original.Valor
          ? `${Number(row.original.Valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
          : "R$ 0,00"}
      </div>
    ),
  },  
  {
    accessorKey: "Tipo",
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
        <StatusIcon type="tipo" value={row.original.Tipo} />
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
        <StatusIcon type="Status" value={row.original.Status} />
      </div>
    ),
  },
  {
    accessorKey: "Prioridade",
    header: ({ column }) => (
      <div className="text-start">
        <SortableHeader
          title="Prioridade"
          isSorted={column.getIsSorted()}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-start">
        <StatusIcon type="Prioridade" value={row.original.Prioridade} />
      </div>
    ),
  },  
  {
    accessorKey: "Obs",
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
      const Obs = getValue() as string;
      return (
        <div className="max-w-48 2xl:max-w-80 text-ellipsis overflow-hidden text-start">
          <HoverCard>
            <HoverCardTrigger>
              <span className="truncate">{Obs}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <p>{Obs}</p>
            </HoverCardContent>
          </HoverCard>
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