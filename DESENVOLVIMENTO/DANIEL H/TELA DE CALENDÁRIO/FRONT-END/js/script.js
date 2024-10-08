let dataAtual = new Date();

function gerarCalendario(mes, ano) {
    const diasPorMes = [31, (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const diasDaSemana = new Date(ano, mes, 1).getDay(); // Dia da semana do primeiro dia do mês

    const calendarioCorpo = document.getElementById('calendario-corpo');
    const calendarioTitulo = document.getElementById('calendario-titulo');

    // Nomes dos meses
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // Definir o título do calendário
    calendarioTitulo.textContent = `${meses[mes]} ${ano}`;

    // Limpar o calendário
    calendarioCorpo.innerHTML = '';

    let linha = document.createElement('tr');
    
    // Preencher o calendário com os dias
    for (let i = 0; i < diasDaSemana; i++) {
        let celula = document.createElement('td');
        linha.appendChild(celula); // Células vazias antes do primeiro dia
    }

    for (let dia = 1; dia <= diasPorMes[mes]; dia++) {
        if (linha.children.length === 7) { // Nova linha a cada 7 dias (semana completa)
            calendarioCorpo.appendChild(linha);
            linha = document.createElement('tr');
        }
        let celula = document.createElement('td');
        celula.textContent = dia;
        linha.appendChild(celula);
    }

    if (linha.children.length > 0) {
        calendarioCorpo.appendChild(linha); // Adicionar a última linha ao corpo da tabela
    }
}

function mudarMes(direcao) {
    dataAtual.setMonth(dataAtual.getMonth() + direcao);
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
}

function voltarPagina() {
    window.history.back();
}

// Inicializar o calendário com o mês e ano atuais
document.addEventListener('DOMContentLoaded', function() {
    gerarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
});
