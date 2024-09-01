package main

import (
	"calcs/metrics" // Importa o pacote calcs/metrics
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/rs/cors"
)

// ---------------------------
// Funções Principais
// ---------------------------

// A função main é responsável por configurar os endpoints da API
// e iniciar o servidor HTTP. Cada endpoint está associado a uma
// função que processa e retorna uma métrica específica.

func main(){
	// Configuração de CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Permite requisições do localhost
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	// Cria um mux (multiplexer) para manusear as rotas
	mux := http.NewServeMux()

	// Define as rotas e seus manipuladores
	mux.HandleFunc("/prenotas/calcs/status-mes", StatusMes)
	mux.HandleFunc("/prenotas/calcs/trim-types", TiposTrim)
	mux.HandleFunc("/prenotas/calcs/trim-cost", GastosTrim)
	mux.HandleFunc("/prenotas/calcs/top-user", TopUsers)
    http.HandleFunc("/prenotas/list", ListPreNotas)

	// Inicia o servidor HTTP com o middleware de CORS aplicado ao mux
	http.ListenAndServe(":8081", c.Handler(mux))
}
func ListPreNotas(w http.ResponseWriter, r *http.Request) {
    // Adicione um log para confirmar que a função está sendo chamada
    log.Println("Endpoint /prenotas/list foi chamado")

    // Chama a função fetchPreNotas para buscar e decodificar as pré-notas.
    preNotas, err := fetchPreNotas()
    if err != nil {
        // Se houver um erro ao buscar as pré-notas, retorna uma mensagem de erro.
        http.Error(w, "Erro ao buscar pré-notas", http.StatusInternalServerError)
        return
    }

    // Define o tipo de conteúdo como JSON e envia a lista de pré-notas para o cliente.
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(preNotas)
}

// A função parseDate converte uma string de data no formato "02-01-2006"
// para o tipo de dado time.Time do Go. É utilizada para converter datas
// das pré-notas no formato adequado.
func parseDate(dateStr string) time.Time {
    layout := "02-01-2006"
    // Converte a string da data para o formato de tempo do Go (time.Time).
    // Se houver um erro na conversão, a data será retornada como zero time.
    t, _ := time.Parse(layout, dateStr)
    return t
}

// A função fetchPreNotas faz uma requisição HTTP para buscar os dados de
// pré-notas de um endpoint externo, decodifica o JSON recebido e converte
// para uma slice de estruturas PreNota.
func fetchPreNotas() ([]metrics.PreNota, error) {
	resp, err := http.Get("http://rodoapp:8080/prenotas?page=1&pageSize=99999")
	if err != nil {
		// Se houver um erro na requisição, retorna o erro.
		return nil, err
	}
	defer resp.Body.Close()

	// Decodifica o JSON recebido em uma estrutura genérica (mapa).
	var rawPreNotas []map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&rawPreNotas); err != nil {
		// Se houver um erro na decodificação, retorna o erro.
		return nil, err
	}

	// Converte o JSON decodificado em uma slice de `metrics.PreNota`.
	var preNotas []metrics.PreNota
	for _, rawNota := range rawPreNotas {
		// Converte os dados recebidos do JSON em uma estrutura `PreNota`.
		preNota := metrics.PreNota{
			Status:   rawNota["Status"].(string),
			Tipo:     rawNota["Tipo"].(string),
			Usuario:  rawNota["Usuario"].(string),
			Inclusao: parseDate(rawNota["Inclusao"].(string)),
		}

		// Se houver um campo "Valor", converte-o para float64.
		if val, ok := rawNota["Valor"]; ok {
			preNota.Valor, _ = strconv.ParseFloat(val.(string), 64)
		}

		// Adiciona a pré-nota convertida à slice.
		preNotas = append(preNotas, preNota)
	}

	// Retorna a slice de pré-notas e nenhum erro.
	return preNotas, nil
}

// ---------------------------
// Funções de Métricas
// ---------------------------

// StatusMes é uma função que lida com requisições HTTP para o endpoint "/prenotas/calcs/status-mes".
// Esta função recupera dados de pré-notas, calcula a contagem de pré-notas por status para o mês atual,
// e retorna esses dados no formato JSON.
func StatusMes(w http.ResponseWriter, r *http.Request) {
    // Chama a função fetchPreNotas para buscar e decodificar as pré-notas.
    preNotas, err := fetchPreNotas()
    if err != nil {
        // Se houver um erro ao buscar as pré-notas, retorna uma mensagem de erro.
        http.Error(w, "Erro ao buscar pré-notas", http.StatusInternalServerError)
        return
    }

    // Calcula a contagem de pré-notas por status para o mês atual.
    statusResponse := metrics.CountStatus(preNotas)

    // Define o tipo de conteúdo como JSON e envia a resposta para o cliente.
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(statusResponse)
}

// TiposTrim é uma função que lida com requisições HTTP para o endpoint "/prenotas/calcs/trim-types".
// Esta função recupera dados de pré-notas, calcula a contagem de pré-notas por tipo em períodos quinzenais
// para os últimos três meses, e retorna esses dados no formato JSON.
func TiposTrim(w http.ResponseWriter, r *http.Request) {
    // Chama a função fetchPreNotas para buscar e decodificar as pré-notas.
    preNotas, err := fetchPreNotas()
    if err != nil {
        // Se houver um erro ao buscar as pré-notas, retorna uma mensagem de erro.
        http.Error(w, "Erro ao buscar pré-notas", http.StatusInternalServerError)
        return
    }

    // Calcula a contagem de pré-notas por tipo para os últimos três meses, agrupadas quinzenalmente.
    quinzenalResponse := metrics.CountTipos(preNotas)

    // Define o tipo de conteúdo como JSON e envia a resposta para o cliente.
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(quinzenalResponse)
}

// GastosTrim é uma função que lida com requisições HTTP para o endpoint "/prenotas/calcs/trim-cost".
// Esta função recupera dados de pré-notas, calcula o valor total gasto em períodos quinzenais
// para os últimos três meses, e retorna esses dados no formato JSON.
func GastosTrim(w http.ResponseWriter, r *http.Request) {
    // Chama a função fetchPreNotas para buscar e decodificar as pré-notas.
    preNotas, err := fetchPreNotas()
    if err != nil {
        // Se houver um erro ao buscar as pré-notas, retorna uma mensagem de erro.
        http.Error(w, "Erro ao buscar pré-notas", http.StatusInternalServerError)
        return
    }

    // Calcula o valor gasto por quinzena para os últimos três meses.
    gastosResponse := metrics.SumGastosPorQuinzena(preNotas)

    // Define o tipo de conteúdo como JSON e envia a resposta para o cliente.
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(gastosResponse)
}

// TopUsers é uma função que lida com requisições HTTP para o endpoint "/prenotas/calcs/top-user".
// Esta função recupera dados de pré-notas, calcula os top 5 usuários por quantidade de pré-notas
// para o mês atual e todos os tempos, e retorna esses dados no formato JSON.
func TopUsers(w http.ResponseWriter, r *http.Request) {
    // Chama a função fetchPreNotas para buscar e decodificar as pré-notas.
    preNotas, err := fetchPreNotas()
    if err != nil {
        // Se houver um erro ao buscar as pré-notas, retorna uma mensagem de erro.
        http.Error(w, "Erro ao buscar pré-notas", http.StatusInternalServerError)
        return
    }

    // Calcula os top 5 usuários do mês atual e de todos os tempos.
    topMesAtual, topTodosTempos := metrics.TopUsuariosMesEAllTime(preNotas)

    // Cria uma estrutura de resposta contendo ambos os resultados.
    response := map[string]interface{}{
        "mes_atual":   topMesAtual,
        "todos_tempos": topTodosTempos,
    }

    // Define o tipo de conteúdo como JSON e envia a resposta para o cliente.
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

