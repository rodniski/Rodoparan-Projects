package metrics

import (
    "time"
)

// PreNota representa a estrutura de uma pré-nota.
type PreNota struct {
    Filial      string    `json:"Filial"`
    NF          string    `json:"NF"`
    Status      string    `json:"Status"`
    Fornecedor  string    `json:"Fornecedor"`
    Emissao     time.Time `json:"Emissao"`
    Inclusao    time.Time `json:"Inclusao"`
    Vencimento  time.Time `json:"Vencimento"`
    Valor       float64   `json:"Valor"`
    Tipo        string    `json:"Tipo"`
    Prioridade  string    `json:"Prioridade"`
    Usuario     string    `json:"Usuario"`
    Obs         string    `json:"Obs"`
    ObsRev      string    `json:"ObsRev"`
    Revisao     string    `json:"Revisao"`
    Rec         string    `json:"Rec"`
}

// StatusCount representa a contagem de pré-notas por status.
type StatusCount struct {
    Status string `json:"status"`
    MonthCount int `json:"month_count"`
    Count  int `json:"count"`
}

// CountPreNotasByStatus calcula a contagem de pré-notas por status no período mensal e anual.

// StatusResponse representa a estrutura final do JSON, incluindo o total.
type StatusResponse struct {
    Total  int           `json:"total"`
    Status []StatusCount `json:"status"`
}

// CountPreNotas calcula a contagem de pré-notas por status e o total geral para o mês atual.
func CountStatus(preNotas []PreNota) StatusResponse {
    currentMonth := time.Now().Month()
    currentYear := time.Now().Year()

    statusCountMap := map[string]int{
        "Pendente":    0,
        "Classificado": 0,
        "Revisar":     0,
    }

    totalCount := 0

    for _, nota := range preNotas {
        // Considera apenas as pré-notas do mês atual
        if nota.Inclusao.Month() == currentMonth && nota.Inclusao.Year() == currentYear {
            statusCountMap[nota.Status]++
            totalCount++
        }
    }

    var statusCounts []StatusCount
    for status, count := range statusCountMap {
        statusCounts = append(statusCounts, StatusCount{
            Status: status,
            Count:  count,
        })
    }

    // Retorna o total e a lista de status com suas contagens
    return StatusResponse{
        Total:  totalCount,
        Status: statusCounts,
    }
}