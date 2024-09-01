'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AddPneus } from "./drawer";
import { Badge } from "@/components/ui/badge";

export type DadosNotaFiscal = {
  Cliente: string;
  NotaFiscal: string;
  Data: string; // A data deve ser uma string no formato dd-MM-yyyy
  Modelo: string;
  Status: "pending" | "processing" | "success" | "failed";
  Saldo: number;
  ValorInicial: number;
};

const badgeColors: Record<DadosNotaFiscal["Status"], string> = {
  success: "bg-green-200 text-green-800",
  processing: "bg-yellow-200 text-yellow-800",
  failed: "bg-red-200 text-red-800",
  pending: "bg-blue-200 text-blue-800",
};

function getBadgeColor(status: DadosNotaFiscal["Status"]): string {
  return badgeColors[status] || "bg-gray-200 text-gray-800";
}

export const Columns: ColumnDef<DadosNotaFiscal>[] = [
  {
    accessorKey: "Cliente",
    header: () => <div>Cliente</div>,
    cell: ({ row }) => <div>{row.getValue("Cliente")}</div>,
    meta: { width: "250px" },
  },
  {
    accessorKey: "NotaFiscal",
    header: () => <div>Nota Fiscal</div>,
    cell: ({ row }) => <div>{row.getValue("NotaFiscal")}</div>,
    meta: { width: "150px" },
  },
  {
    accessorKey: "Data",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 hover:bg-transparent" // Remove o hover e adiciona padding
      >
        Data
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.getValue("Data");

      return typeof data === "string" ? <div>{data}</div> : <div>Data Inválida</div>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = rowA.getValue(columnId);
      const dateB = rowB.getValue(columnId);

      return typeof dateA === "string" && typeof dateB === "string"
        ? dateA.split('-').reverse().join('').localeCompare(dateB.split('-').reverse().join(''))
        : 0;
    },
    meta: { width: "150px" },
  },
  {
    accessorKey: "Modelo",
    header: () => <div>Modelo</div>,
    cell: ({ row }) => <div>{row.getValue("Modelo")}</div>,
    meta: { width: "150px" },
  },
  {
    accessorKey: "Status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-2 py-1 hover:bg-transparent" // Remove o hover e adiciona padding
      >
        Status
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("Status") as DadosNotaFiscal["Status"];
      return (
        <Badge className={`${getBadgeColor(status)} pointer-events-none`}>
          {status === "success" ? "Disponível" : "Indisponível"}
        </Badge>
      );
    },
    meta: { width: "100px" },
  },
  {
    accessorKey: "Saldo",
    header: () => <div className="text-right">Saldo</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("Saldo")}</div>,
    meta: { width: "100px" },
  },
  {
    accessorKey: "ValorInicial",
    header: () => <div className="text-right">Valor Inicial</div>,
    cell: ({ row }) => {
      const valorInicial = row.getValue("ValorInicial") as number;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorInicial);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    meta: { width: "150px" },
  },
  {
    id: "actions",
    header: () => <div className="flex justify-end">Adicionar Pneus</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <AddPneus saldo={row.getValue("Saldo")} />
      </div>
    ),
    meta: { width: "150px" },
  },
];
