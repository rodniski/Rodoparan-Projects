import { DadosNotaFiscal } from "../columns";

const BASE_URL = "http://172.16.99.174:8400/rest/MovPortaria";

export async function NFSaidasDisponiveis(): Promise<DadosNotaFiscal[]> {
  const response = await fetch(`${BASE_URL}/NFSaidasDisponiveis`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar NFSaidasDisponiveis");
  }

  const data = await response.json();

  const mappedData: DadosNotaFiscal[] = data.map((item: any) => {
    // Concatena D2_CLIENTE, D2_LOJA, e A1_NOME
    const cliente = `${item.D2_CLIENTE} ${item.D2_LOJA} - ${item.A1_NOME}`;

    // Formata a data para dd-MM-yyyy
    const dataEmissao = item.D2_EMISSAO;
    const dateParts = dataEmissao.match(/(\d{4})(\d{2})(\d{2})/);
    let formattedDate = "Data Inválida";
    if (dateParts) {
      const year = parseInt(dateParts[1], 10);
      const month = parseInt(dateParts[2], 10) - 1;
      const day = parseInt(dateParts[3], 10);
      formattedDate = new Date(year, month, day).toLocaleDateString('pt-BR');
    }

    return {
      Cliente: cliente, // Cliente agregado
      NotaFiscal: item.D2_DOC,
      Data: formattedDate, // Data formatada
      Modelo: item.D2_SERIE.trim(),
      Status: "success", // Ajuste conforme necessário
      Saldo: item.SALDO,
      ValorInicial: parseFloat(item.D2_VALOR_INICIAL || "0"), // Substitua com a chave real
    };
  });

  // Ordena os dados do mais recente para o mais antigo
  const sortedData = mappedData.sort((a, b) => {
    const dateA = new Date(a.Data.split('/').reverse().join('-'));
    const dateB = new Date(b.Data.split('/').reverse().join('-'));
    return dateB.getTime() - dateA.getTime(); // Ordenação decrescente
  });

  return sortedData;
}

// Outras funções permanecem inalteradas

export async function CarregamentoSaida(): Promise<any[]> {
  const response = await fetch(`${BASE_URL}/CarregamentoSaida`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar CarregamentoSaida");
  }

  return response.json();
}

export async function ListaItensNF(): Promise<any[]> {
  const response = await fetch(`${BASE_URL}/ListaItensNF`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar ListaItensNF");
  }

  return response.json();
}

export async function VldSaldo(params: { filial: string; documento: string; serie: string; cliente: string; loja: string; produto: string; item: string; quantidade: number }): Promise<any> {
  const response = await fetch(`${BASE_URL}/VldSaldo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Erro ao validar saldo");
  }

  return response.json();
}

export async function IncluirItem(itemData: any): Promise<any> {
  const response = await fetch(`${BASE_URL}/IncluirItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error("Erro ao incluir item");
  }

  return response.json();
}

export async function ConferenciaSaida(Z08recno: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/ConferenciaSaida`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Z08recno }),
  });

  if (!response.ok) {
    throw new Error("Erro ao conferir saída");
  }

  return response.json();
}
