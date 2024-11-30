                // Variáveis

let bntArquivosImportados = document.getElementById('arquivosImportados');
let elementoBarraInformativa = document.getElementById('barraInformativa');
const salasEnsinoMedio = [];
const salasEnsinoFundamental = [];


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


// Efeito Rolagem
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 0)
})


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

//Ao clickar do botão a função é acionada
bntArquivosImportados.addEventListener('click', fetchSalas);


async function fetchSalas() {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token inválido ou expirado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html';
            }, 3000);
            return;
        }

        // Faz a requisição ao backend com o token no cabeçalho
        const response = await fetch('http://localhost:3000/student/salas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            if (response.status === 401) { // Caso o token seja inválido ou expirado
                console.log("Token inválido ou sessão expirada");
                mostrarPopup("Erro de autenticação: token inválido ou expirado.", 'error');
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html';
                }, 3000);
            }
            console.log(`Erro na requisição: ${response.statusText}`);
            return;
        }

        const salas = await response.json();

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

    } catch (error) {
        console.log(`Erro ao buscar as salas: ${error}`);
    }
}




    // Função para exibir o pop-up
    function mostrarPopup(mensagem, tipo) {
        console.log("Poupop chamado!")
            const popup = document.getElementById('popup');
            const popupMessage = document.getElementById('popupMessage');
            const popupIcon = document.getElementById('popupIcon');
        
            popupMessage.textContent = mensagem;
            if (tipo === 'success') {
                popup.className = 'popup popup-success show';
                popupIcon.textContent = '✔️';
            } else if (tipo === 'error') {
                popup.className = 'popup popup-error show';
                popupIcon.textContent = '❌';
            }
        
            setTimeout(fecharPopup, 3000);
    }
        
        // Função para fechar o pop-up
    function fecharPopup() {
            const popup = document.getElementById('popup');
            popup.classList.remove('show');
    }