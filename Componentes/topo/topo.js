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
//Função para fazer o Get apenas das salas e series
async function fetchSalas() {
    try {
        // Chama a função fetchComToken, que já vai adicionar o token ao cabeçalho
        const salas = await fetchComToken('http://localhost:3000/salas', {
            method: 'GET', // Método GET para obter os dados das salas
        });

        if (!salas) {
            console.log('Não foi possível obter as salas!');
            return;
        }

        // Ordena as salas antes de processá-las
        const salasOrdenadas = salas.sort((a, b) => {
            // Primeiro compara a série (como número) e depois a turma (alfabética)
            return a.serie - b.serie || a.turma.localeCompare(b.turma);
        });

        salasOrdenadas.map((sala) => {
            if (sala.ensino === 'medio') {
                // Verifica se a sala do Ensino Médio já foi exibida
                if (!salasEnsinoMedio.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                    adicionarSalasnoHtmlMedio(sala);
                    salasEnsinoMedio.push(sala); // Adiciona ao array de controle
                }
            } else {
                // Verifica se a sala do Ensino Fundamental já foi exibida
                if (!salasEnsinoFundamental.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                    adicionarSalasnoHtmlFundamental(sala); // Função correta para ensino fundamental
                    salasEnsinoFundamental.push(sala); // Adiciona ao array de controle
                }
            }
        });
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

//  Autenticação do token
async function fetchComToken(url, options = {}) {
        // Obtém o token do localStorage
        const token = localStorage.getItem('token');
    
        // Verifica se o token existe
        if (!token) {
            console.log('Usuário não autenticado!');
            return; // Retorna ou lida com o erro de alguma forma
        }
    
        // Adiciona o cabeçalho Authorization com o token em todas as requisições
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers, // Adiciona os cabeçalhos extras que foram passados
        };
    
        // Realiza a requisição com os cabeçalhos configurados
        try {
            const response = await fetch(url, { ...options, headers });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.log('Erro:', data.error || 'Erro na requisição.');
                return;
            }
    
            return data; // Retorna a resposta da requisição
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    }