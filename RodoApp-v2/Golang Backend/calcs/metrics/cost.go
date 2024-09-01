package metrics

import (
    "fmt"
    "time"
)

// QuinzenaGastos representa o valor total gasto em um período quinzenal.
type QuinzenaGastos struct {
    PeriodoInicio string  `json:"periodo_inicio"`
    PeriodoFim    string  `json:"periodo_fim"`
    ValorTotal    string  `json:"valor_total"`
}

// SumGastosPorQuinzena calcula o valor gasto total para os últimos três meses, agrupado quinzenalmente.
func SumGastosPorQuinzena(preNotas []PreNota) []QuinzenaGastos {
    now := time.Now()
    startPeriod := now.AddDate(0, -3, 0) // Três meses atrás
    quinzenas := []QuinzenaGastos{}

    // Loop para percorrer os últimos três meses em períodos quinzenais
    for start := startPeriod; start.Before(now); start = start.AddDate(0, 0, 15) {
        end := start.AddDate(0, 0, 15)
        if end.After(now) {
            end = now
        }

        valorTotal := 0.0

        // Soma os valores das pré-notas para o período atual
        for _, nota := range preNotas {
            if nota.Inclusao.After(start) && nota.Inclusao.Before(end) {
                valorTotal += nota.Valor
            }
        }

        // Formata o valor total com duas casas decimais
        formattedValorTotal := fmt.Sprintf("%.2f", valorTotal)

        quinzenas = append(quinzenas, QuinzenaGastos{
            PeriodoInicio: start.Format("02-01-2006"),
            PeriodoFim:    end.Format("02-01-2006"),
            ValorTotal:    formattedValorTotal,
        })
    }

    // Retorna os gastos quinzenais
    return quinzenas
}
