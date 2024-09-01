package metrics

import (
    "time"
)


// QuinzenaCount representa a contagem de pré-notas por tipo em um período quinzenal.
type QuinzenaCount struct {
    PeriodoInicio string      `json:"periodo_inicio"`
    PeriodoFim    string      `json:"periodo_fim"`
    Types         []TypeCount `json:"types"`
}

// TypeCount representa a contagem de pré-notas por tipo.
type TypeCount struct {
    Tipo  string `json:"tipo"`
    Count int    `json:"count"`
}

// QuinzenalResponse representa a estrutura final do JSON sem o total geral.
type QuinzenalResponse struct {
    Quinzenas []QuinzenaCount `json:"quinzenas"`
}

// CountPreNotasPorTipoQuinzenal calcula a contagem de pré-notas por tipo para os últimos três meses, agrupados quinzenalmente.
func CountTipos(preNotas []PreNota) []interface{} {
    now := time.Now()
    startPeriod := now.AddDate(0, -3, 0) // Três meses atrás
    quinzenas := []interface{}{}

    // Loop para percorrer os últimos três meses em períodos quinzenais
    for start := startPeriod; start.Before(now); start = start.AddDate(0, 0, 15) {
        end := start.AddDate(0, 0, 15)
        if end.After(now) {
            end = now
        }

        // Inicializa o mapa de contagens para o período atual
        typeCountMap := map[string]int{
            "Despesa/Imobilizado": 0,
            "Revenda":             0,
            "Matéria Prima":       0,
            "Collection":          0,
        }

        // Conta as pré-notas para o período atual
        for _, nota := range preNotas {
            if nota.Inclusao.After(start) && nota.Inclusao.Before(end) {
                typeCountMap[nota.Tipo]++
            }
        }

        // Converte o mapa de contagens para a estrutura QuinzenaCount
        var typeCounts []TypeCount
        for tipo, count := range typeCountMap {
            typeCounts = append(typeCounts, TypeCount{
                Tipo:  tipo,
                Count: count,
            })
        }

        quinzenas = append(quinzenas, map[string]interface{}{
            "periodo_inicio": start.Format("02-01-2006"),
            "periodo_fim":    end.Format("02-01-2006"),
            "types":          typeCounts,
        })
    }

    // Retorna diretamente os períodos e tipos sem lista aninhada
    return quinzenas
}