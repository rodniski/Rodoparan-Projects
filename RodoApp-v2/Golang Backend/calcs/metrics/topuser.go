package metrics

import (
    "sort"
    "time"
)


// UsuarioCount representa a contagem de pré-notas por usuário.
type UsuarioCount struct {
    Usuario string `json:"usuario"`
    Count   int    `json:"count"`
}

// TopUsuariosMesEAllTime retorna os top 5 usuários do mês atual e de todos os tempos.
func TopUsuariosMesEAllTime(preNotas []PreNota) (mesAtualTop5 []UsuarioCount, todosTemposTop5 []UsuarioCount) {
    usuarioTodosTemposMap := make(map[string]int)
    usuarioMesAtualMap := make(map[string]int)
    currentMonth := time.Now().Month()
    currentYear := time.Now().Year()

    // Conta as pré-notas por usuário para todos os tempos e para o mês atual
    for _, nota := range preNotas {
        usuarioTodosTemposMap[nota.Usuario]++
        if nota.Inclusao.Month() == currentMonth && nota.Inclusao.Year() == currentYear {
            usuarioMesAtualMap[nota.Usuario]++
        }
    }

    // Converte os mapas para slices de UsuarioCount
    var todosTemposUsuarios []UsuarioCount
    var mesAtualUsuarios []UsuarioCount
    for usuario, countTodosTempos := range usuarioTodosTemposMap {
        todosTemposUsuarios = append(todosTemposUsuarios, UsuarioCount{
            Usuario: usuario,
            Count:   countTodosTempos,
        })
    }
    for usuario, countMesAtual := range usuarioMesAtualMap {
        mesAtualUsuarios = append(mesAtualUsuarios, UsuarioCount{
            Usuario: usuario,
            Count:   countMesAtual,
        })
    }

    // Ordena os usuários por quantidade de pré-notas (do maior para o menor)
    sort.Slice(todosTemposUsuarios, func(i, j int) bool {
        return todosTemposUsuarios[i].Count > todosTemposUsuarios[j].Count
    })
    sort.Slice(mesAtualUsuarios, func(i, j int) bool {
        return mesAtualUsuarios[i].Count > mesAtualUsuarios[j].Count
    })

    // Retorna os cinco primeiros usuários
    if len(todosTemposUsuarios) > 5 {
        todosTemposUsuarios = todosTemposUsuarios[:5]
    }
    if len(mesAtualUsuarios) > 5 {
        mesAtualUsuarios = mesAtualUsuarios[:5]
    }

    return mesAtualUsuarios, todosTemposUsuarios
}
