import { DataTable } from "@/components/Portaria/data-table"; // Corrija o caminho de importação
import { Columns } from "@/components/Portaria/columns"; // Corrija o caminho de importação
import { NFSaidasDisponiveis } from "@/components/Portaria/data/dados"; // Corrija o caminho de importação

export default async function Page() {
  const data = await NFSaidasDisponiveis();

  return (
    <div className="h-full flex flex-col items-center py-14">
      <h1 className="text-2xl font-bold mb-4">Tabela de Dados dos Pneus</h1>
      <div className="max-w-[80vw]">
        <DataTable columns={Columns} data={data} />
        </div>
    </div>
  );
}