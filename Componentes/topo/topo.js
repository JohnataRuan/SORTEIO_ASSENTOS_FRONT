// Efeito Rolagem
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 0)
})

let bntArquivosImportados = document.getElementById('arquivosImportados');
let elementoBarraInformativa = document.getElementById('barraInformativa');
const salasEnsinoMedio = [];
const salasEnsinoFundamental = [];
//Função para adicionar as salas do ensino Medio na página
function adicionarSalasnoHtmlMedio (sala){
    const salaVazia = document.getElementById('nenhumaSala1');
    salaVazia.style.display = 'none';

    const novaSala = document.createElement('h4');
    novaSala.textContent = `${sala.serie}°Ano ${sala.turma}`;
    novaSala.className = 'salinhas';

    const ensinoMedioHtml = document.getElementById('Ensino_M');
    ensinoMedioHtml.appendChild(novaSala);
};
//Função para adicionar as salas do ensino Fundamental na página
function adicionarSalasnoHtmlFundamental(sala){
    const salaVazia = document.getElementById('nenhumaSala2');
    salaVazia.style.display = 'none';

    const novaSala = document.createElement('h4');
    novaSala.textContent = `${sala.serie}°Ano ${sala.turma}`;
     novaSala.className = 'salinhas';

    const ensinoMedioHtml = document.getElementById('Ensino_F');
    ensinoMedioHtml.appendChild(novaSala);
};
// Função para fazer a Barra Informativa aparecer ao clicar em Arquivos Importados
bntArquivosImportados.addEventListener('click', function () {
    if (elementoBarraInformativa.style.display === 'none') {
        elementoBarraInformativa.style.display = 'block';
    } else {
        elementoBarraInformativa.style.display = 'none';
    }
});



// Requisição para fazer o Get apenas das salas e séries com verificação de token
async function fetchSalas() {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            return;
        }

        // Faz a requisição ao backend com o token no cabeçalho
        const response = await fetch('http://localhost:3000/salas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.log(`Erro na requisição: ${response.statusText}`);
            return;
        }

        const salas = await response.json();

        if (salas.length === 0) {
            exibirMensagemBancoVazio();
            return;
        }

        const salasOrdenadas = salas.sort((a, b) => {
            return a.serie - b.serie || a.turma.localeCompare(b.turma);
        });

        salasOrdenadas.forEach((sala) => {
            if (sala.ensino === 'medio' && !salasEnsinoMedio.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                adicionarSalasnoHtmlMedio(sala);
                salasEnsinoMedio.push(sala);
            } else if (sala.ensino === 'fundamental' && !salasEnsinoFundamental.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                adicionarSalasnoHtmlFundamental(sala);
                salasEnsinoFundamental.push(sala);
            }
        });

        // Adiciona as etiquetas conforme as turmas importadas
        adicionarEtiquetasEnsino();

    } catch (error) {
        console.log(`Erro ao buscar as salas: ${error}`);
    }
}

//Ao clickar do botão a função é acionada
bntArquivosImportados.addEventListener('click', fetchSalas);

// Redireciona o botão de Início --> Página de Início
document.getElementById("Inicio").addEventListener("click", function () {
    window.location.href = "../principal/principal.html";
});

// Redireciona o botão de Importar Arquivos --> Página de Importar Arquivos
document.getElementById('Importar_Arquivos').addEventListener("click", function () {
    window.location.href = "../importar/importar.html";
});

// Redireciona o botão de Download Arquivos --> Página de Download Arquivos
document.getElementById("Download_Arquivos").addEventListener("click", function () {
    window.location.href = "../download/download.html";
    });

