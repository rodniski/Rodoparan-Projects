package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "strconv"
    "strings"
    "sync"
    "time"

    "github.com/joho/godotenv"
)

var preNotasCache []PreNota
var mutex sync.Mutex

func main() {
    // Carregar variáveis de ambiente
    loadEnv()

    // Iniciar busca periódica de NFs
    go startFetchingPreNotas()

    // Configurar rotas da API
    http.HandleFunc("/prenotas", getPreNotas)

    // Iniciar o servidor HTTP
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    log.Printf("Servidor rodando na porta %s", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Função para carregar variáveis de ambiente
func loadEnv() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Erro ao carregar o arquivo .env")
    }
}

// startFetchingPreNotas busca NFs periodicamente
func startFetchingPreNotas() {
    for {
        log.Println("Buscando NFs...")
        preNotas, err := fetchPreNotas()
        if err != nil {
            log.Printf("Erro ao buscar NFs: %v", err)
        } else {
            processedPreNotas := processPreNotas(preNotas)
            mutex.Lock()
            preNotasCache = processedPreNotas // Atualiza o cache com os novos dados
            mutex.Unlock()
        }
        time.Sleep(10 * time.Minute) // Espera 10 minutos antes de buscar novamente
    }
}

// Função para buscar as pre_notas do endpoint externo
func fetchPreNotas() ([]RawPreNota, error) {
    url := os.Getenv("API_URL")
    resp, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("erro ao fazer a requisição: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("resposta inesperada do servidor: %d %s", resp.StatusCode, resp.Status)
    }

    var rawPreNotas []RawPreNota
    err = json.NewDecoder(resp.Body).Decode(&rawPreNotas)
    if err != nil {
        return nil, fmt.Errorf("erro ao fazer o parsing do JSON: %v", err)
    }

    return rawPreNotas, nil
}

// Função para processar e ajustar os dados das pre_notas
func processPreNotas(rawPreNotas []RawPreNota) []PreNota {
    var processed []PreNota
    for _, raw := range rawPreNotas {
        // Verifica o status com base em Revisao e Status
        status := determineStatus(raw.Status, raw.Rev)

        preNota := PreNota{
            Filial:     raw.Filial,
            NF:         strings.TrimSpace(raw.Doc) + " - " + strings.TrimSpace(raw.Serie),
            Status:     status,
            Fornecedor: raw.Fornece,
            Emissao:    formatDate(raw.Emissao),
            Inclusao:   formatDate(raw.Inclusao),
            Vencimento: formatDate(raw.Vencimento),
            Valor:      formatCurrency(raw.ValBrut), // Formatar como Real
            Tipo:       raw.Tipo,
            Prioridade: raw.Prior,
            Usuario:    raw.UsrRa,
            Obs:        raw.Obs,
            ObsRev:     raw.ObsRev,
            Revisao:    raw.Rev,
            Rec:        raw.Rec,
        }
        processed = append(processed, preNota)
    }
    return processed
}

// Função para determinar o status com base em Revisao e Status
func determineStatus(status, revisao string) string {
    if strings.TrimSpace(revisao) != "" {
        return "Revisar"
    }
    if strings.TrimSpace(status) != "" {
        return "Classificado"
    }
    return "Pendente"
}

// Função para formatar a data no formato DDMMYYYY para DD/MM/YYYY
func formatDate(dateStr string) string {
    if len(dateStr) == 8 {
        return dateStr[6:8] + "-" + dateStr[4:6] + "-" + dateStr[0:4]
    }
    return dateStr
}

// Função para formatar valores como moeda brasileira (Real)
func formatCurrency(valueStr string) string {
    value, err := strconv.ParseFloat(strings.TrimSpace(valueStr), 64)
    if err != nil {
        log.Printf("Erro ao formatar valor: %v", err)
        return valueStr
    }
    return fmt.Sprintf("%.2f", value)
}

// Handler HTTP para servir as pre_notas via API com paginação
func getPreNotas(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    // Pegar os parâmetros de paginação
    page, pageSize := getPaginationParams(r)

    mutex.Lock()
    defer mutex.Unlock()

    if len(preNotasCache) == 0 {
        http.Error(w, "Nenhuma pre_nota disponível no momento.", http.StatusNotFound)
        return
    }

    // Aplicar paginação
    paginatedPreNotas := paginate(preNotasCache, page, pageSize)

    json.NewEncoder(w).Encode(paginatedPreNotas)
}

// Função para pegar parâmetros de paginação
func getPaginationParams(r *http.Request) (int, int) {
    page := 1
    pageSize := 10

    pageParam := r.URL.Query().Get("page")
    pageSizeParam := r.URL.Query().Get("pageSize")

    if p, err := strconv.Atoi(pageParam); err == nil && p > 0 {
        page = p
    }
    if ps, err := strconv.Atoi(pageSizeParam); err == nil && ps > 0 {
        pageSize = ps
    }

    return page, pageSize
}

// Função para aplicar a paginação nos dados
func paginate(preNotas []PreNota, page, pageSize int) []PreNota {
    start := (page - 1) * pageSize
    end := start + pageSize

    if start > len(preNotas) {
        return []PreNota{}
    }
    if end > len(preNotas) {
        end = len(preNotas)
    }

    return preNotas[start:end]
}

// Estrutura da pre_nota processada para exposição via API
type PreNota struct {
    Filial     string `json:"Filial"`
    NF         string `json:"NF"` // Combinação de Doc e Serie
    Status     string `json:"Status"`
    Fornecedor string `json:"Fornecedor"`
    Emissao    string `json:"Emissao"`
    Inclusao   string `json:"Inclusao"`
    Vencimento string `json:"Vencimento"`
    Valor      string `json:"Valor"` // Formato de moeda brasileira
    Tipo       string `json:"Tipo"`
    Prioridade string `json:"Prioridade"`
    Usuario    string `json:"Usuario"`
    Obs        string `json:"Obs"`
    ObsRev     string `json:"ObsRev"`
    Revisao    string `json:"Revisao"`
    Rec        string `json:"Rec"`
}

// Estrutura para representar os dados recebidos do endpoint
type RawPreNota struct {
    Filial     string `json:"F1_FILIAL"`
    Doc        string `json:"F1_DOC"`
    Serie      string `json:"F1_SERIE"`
    Status     string `json:"F1_STATUS"`
    Fornece    string `json:"FORNECE"`
    Emissao    string `json:"F1_EMISSAO"`
    Inclusao   string `json:"F1_DTDIGIT"`
    Vencimento string `json:"VENCIMENTO"`
    ValBrut    string `json:"F1_VALBRUT"`
    Tipo       string `json:"F1_XTIPO"`
    Prior      string `json:"F1_XPRIOR"`
    UsrRa      string `json:"F1_XUSRRA"`
    Obs        string `json:"F1_XOBS"`
    ObsRev     string `json:"F1_ZOBSREV"`
    Rev        string `json:"F1_XREV"`
    Rec        string `json:"REC"`
}
