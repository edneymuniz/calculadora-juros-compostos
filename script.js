let grafico;

function calcular() {
    let capital = +capitalInput.value || 0;
    let aporte = +aporteInput.value || 0;
    let taxa = +taxaInput.value / 100;
    let tempo = +tempoInput.value;
    let moeda = moedaSelect.value;
    let tipo = tipoJuros.value;

    if (tipo === "anual") {
        taxa = Math.pow(1 + taxa, 1/12) - 1;
    }

    let saldo = capital;
    let totalInvestido = capital;
    let dados = [];
    tabelaBody.innerHTML = "";

    for (let i = 1; i <= tempo; i++) {
        saldo += aporte;
        totalInvestido += aporte;
        saldo *= (1 + taxa);

        dados.push(saldo);

        tabelaBody.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${moeda} ${saldo.toFixed(2)}</td>
            </tr>
        `;
    }

    montante.innerText = `Montante: ${moeda} ${saldo.toFixed(2)}`;
    investido.innerText = `Investido: ${moeda} ${totalInvestido.toFixed(2)}`;
    juros.innerText = `Juros: ${moeda} ${(saldo - totalInvestido).toFixed(2)}`;

    criarGrafico(dados);
}

function criarGrafico(dados) {
    if (grafico) grafico.destroy();

    grafico = new Chart(document.getElementById("grafico"), {
        type: "line",
        data: {
            labels: dados.map((_, i) => i + 1),
            datasets: [{
                label: "Evolução do saldo",
                data: dados,
                borderWidth: 2
            }]
        }
    });
}

function exportarExcel() {
    let tabela = document.getElementById("tabela").outerHTML;
    let blob = new Blob([tabela], { type: "application/vnd.ms-excel" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "juros_compostos.xls";
    link.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* atalhos */
const capitalInput = document.getElementById("capital");
const aporteInput = document.getElementById("aporte");
const taxaInput = document.getElementById("taxa");
const tempoInput = document.getElementById("tempo");
const moedaSelect = document.getElementById("moeda");
const tipoJuros = document.getElementById("tipoJuros");
const tabelaBody = document.querySelector("#tabela tbody");

const montante = document.getElementById("montante");
const investido = document.getElementById("investido");
const juros = document.getElementById("juros");
