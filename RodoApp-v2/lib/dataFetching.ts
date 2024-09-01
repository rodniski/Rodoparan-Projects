import axios from "axios";
import { saveData } from "./idb"; // Importando a função saveData para armazenar os dados

interface PreNota {
  Usuario: string;
  [key: string]: any; // Caso existam outras propriedades
}

// Função para buscar, processar e armazenar os dados
export const dataFetching = async () => {
  try {
    console.log("Iniciando o processo de dataFetching");

    // 1. Obtenha o token do localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado no localStorage");
    }

    // 2. Configure a requisição com o token
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/api/prenotas?page=1&pageSize=99999', // Use /api ao invés do URL completo
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`  // Adicionando o token no cabeçalho
      }
    };

    // 3. Faça a requisição para o endpoint
    const response = await axios.request(config);
    
    if (response.status === 200) {
      const data = response.data;

      // 4. Salve todos os dados no IndexedDB
      await saveData("originalData", data);
      console.log("Dados gerais salvos:", data);

      // 5. Filtre os dados pelo campo Usuario
      const filteredData = filterDataByUsername(data);

      // 6. Salve os dados filtrados no IndexedDB
      await saveData("filteredData", filteredData);
      console.log("Dados filtrados salvos:", filteredData);

      console.log("Processo de dataFetching concluído com sucesso.");
      return { generalData: data, filteredData };  // Retorna os dados gerais e filtrados
    } else {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return { generalData: [], filteredData: [] };  // Retorna array vazio em caso de erro
  }
};

// Função para filtrar os dados pelo username
const filterDataByUsername = (data: PreNota[]) => {
  const username = localStorage.getItem("username");
  if (!username) {
    console.warn("Username não encontrado no localStorage");
    return [];
  }
  return data.filter((item) => item.Usuario === username);
};
