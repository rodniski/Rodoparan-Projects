package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "strconv"

    _ "github.com/lib/pq"
    "github.com/joho/godotenv"
)

// Conexão global com o banco de dados
var DB *sql.DB

func main() {
    // Carregar variáveis de ambiente e conectar ao banco de dados
    ConnectDB()
    defer DB.Close()

    // Configurar os endpoints
    http.HandleFunc("/prenotas", GetPreNotasHandler)        // Sem filtro de usuário
    http.HandleFunc("/prenotas/user", GetPreNotasUserHandler) // Com filtro de usuário

    log.Println("Serviço de consulta iniciado na porta 172.16.99.144:8082")
    log.Fatal(http.ListenAndServe("172.16.99.144:8082", nil))
}

// Conectar ao banco de dados PostgreSQL
func ConnectDB() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Erro ao carregar o arquivo .env")
    }

    connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_NAME"))

    DB, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal("Erro ao conectar ao banco de dados:", err)
    }

    err = DB.Ping()
    if err != nil {
        log.Fatal("Não foi possível conectar ao banco de dados:", err)
    }

    log.Println("Conectado ao banco de dados com sucesso!")
}

// Handler para consultar pre_notas sem filtro de usuário
func GetPreNotasHandler(w http.ResponseWriter, r *http.Request) {
    // Pegar os parâmetros de paginação
    pageStr := r.URL.Query().Get("page")
    limitStr := r.URL.Query().Get("limit")

    // Converter para inteiros e definir valores padrão
    page, err := strconv.Atoi(pageStr)
    if err != nil || page < 1 { // Garantir que page seja no mínimo 1
        page = 1
    }

    limit, err := strconv.Atoi(limitStr)
    if err != nil || limit < 1 {
        limit = 10
    }

    prenotas, err := GetPreNotasFiltered("", page, limit)
    if err != nil {
        log.Printf("Erro ao buscar preNotas: %v", err)
        http.Error(w, "Erro ao buscar preNotas", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(prenotas)
}

// Handler para consultar pre_notas com filtro de usuário
func GetPreNotasUserHandler(w http.ResponseWriter, r *http.Request) {
    usuario := r.URL.Query().Get("usuario")
    
    // Pegar os parâmetros de paginação
    pageStr := r.URL.Query().Get("page")
    limitStr := r.URL.Query().Get("limit")

    // Converter para inteiros e definir valores padrão
    page, err := strconv.Atoi(pageStr)
    if err != nil || page < 1 { // Garantir que page seja no mínimo 1
        page = 1
    }

    limit, err := strconv.Atoi(limitStr)
    if err != nil || limit < 1 {
        limit = 10
    }

    prenotas, err := GetPreNotasFiltered(usuario, page, limit)
    if err != nil {
        log.Printf("Erro ao buscar preNotas: %v", err)
        http.Error(w, "Erro ao buscar preNotas", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(prenotas)
}

// Função para buscar as pre_notas com ou sem filtro de usuário
func GetPreNotasFiltered(usuario string, page, limit int) ([]PreNota, error) {
    offset := (page - 1) * limit

    query := `
    SELECT filial, nf, transferencia, status, fornece, emissao, inclusao,
           valor, tipo, prioridade, origem, usuario, obs, obs_rev, revisar, vencimento, rec
    FROM pre_notas`

    var args []interface{}

    // Ajustar a query dependendo se o usuário foi fornecido ou não
    if usuario != "" {
        query += " WHERE usuario = $1 ORDER BY emissao DESC LIMIT $2 OFFSET $3"
        args = append(args, usuario, limit, offset)
    } else {
        query += " ORDER BY emissao DESC LIMIT $1 OFFSET $2"
        args = append(args, limit, offset)
    }

    rows, err := DB.Query(query, args...)
    if err != nil {
        return nil, fmt.Errorf("erro na execução da query: %v", err)
    }
    defer rows.Close()

    var prenotas []PreNota
    for rows.Next() {
        var preNota PreNota
        err = rows.Scan(
            &preNota.Filial, &preNota.NF, &preNota.Transferencia, &preNota.Status, &preNota.Fornece,
            &preNota.Emissao, &preNota.Inclusao, &preNota.Valor, &preNota.Tipo, &preNota.Prioridade,
            &preNota.Origem, &preNota.Usuario, &preNota.Obs, &preNota.ObsRev, &preNota.Revisar,
            &preNota.Vencimento, &preNota.Rec)
        if err != nil {
            return nil, fmt.Errorf("erro ao escanear a linha: %v", err)
        }
        prenotas = append(prenotas, preNota)
    }

    return prenotas, nil
}
// Estrutura da pre_nota
type PreNota struct {
    Filial         string  `json:"filial"`
    NF             string  `json:"nf"`
    Transferencia  string  `json:"transferencia"`
    Status         string  `json:"status"`
    Fornece        string  `json:"fornece"`
    Emissao        string  `json:"emissao"`
    Inclusao       string  `json:"inclusao"`
    Valor          float64 `json:"valor"`
    Tipo           string  `json:"tipo"`
    Prioridade      string  `json:"prioridade"`
    Origem         string  `json:"origem"`
    Usuario        string  `json:"usuario"`
    Obs            string  `json:"obs"`
    ObsRev         string  `json:"obs_rev"`
    Revisar        string  `json:"revisar"`
    Vencimento     string  `json:"vencimento"`
    Rec            string  `json:"rec"`
}
