let meuGraficoDoughnut = null;

function atualizarKPIs(dados) {
    const kpiTotal = document.getElementById("kpiTotal");
    const kpiPendentes = document.getElementById("kpiPendentes");
    const kpiAguardandoSup = document.getElementById("kpiAguardandoSup");
    const kpiAguardandoCom = document.getElementById("kpiAguardandoCom");
    const kpiProgramados = document.getElementById("kpiProgramados");

    const total = dados.length;
    const pendentes = dados.filter(x => x.status === "PENDENTE").length;
    const agSup = dados.filter(x => x.status === "AGUARDANDO SUPRIMENTOS").length;
    const agCom = dados.filter(x => x.status === "AGUARDANDO COMERCIAL").length;
    const programados = dados.filter(x => x.status === "PROGRAMADO").length;

    if (kpiTotal) kpiTotal.innerText = total;
    if (kpiPendentes) kpiPendentes.innerText = pendentes;
    if (kpiAguardandoSup) kpiAguardandoSup.innerText = agSup;
    if (kpiAguardandoCom) kpiAguardandoCom.innerText = agCom;
    if (kpiProgramados) kpiProgramados.innerText = programados;

    // Atualizar ou Criar o Gráfico de Rosca (Doughnut)
    const ctx = document.getElementById('doughnutChart');
    if (ctx) {
        if (meuGraficoDoughnut) {
            meuGraficoDoughnut.data.datasets[0].data = [pendentes, agSup, agCom, programados];
            meuGraficoDoughnut.update();
        } else {
            meuGraficoDoughnut = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Pendentes', 'Ag. Suprimentos', 'Ag. Comercial', 'Programados'],
                    datasets: [{
                        data: [pendentes, agSup, agCom, programados],
                        backgroundColor: ['#d97706', '#0284c7', '#9333ea', '#16a34a'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    }
}