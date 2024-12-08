import { uploadFile } from '../../utils/routes/apiRequestImportar.js';

// Função para carregar o pop-up automaticamente
async function carregarPopup() {
    try {
        // Importar o HTML do pop-up
        const response = await fetch('../popup/popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Adicionar o CSS dinamicamente
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../popup/popup.css';
        document.head.appendChild(cssLink);

        // Importar o JavaScript do pop-up
        await import('../popup/popup.js');
    } catch (error) {
        console.error('Erro ao carregar o pop-up:', error);
    }
}

//importar cabeçalho
async function importarCabecalho() {
    try {
        // Importa o conteúdo HTML do topo
        const response = await fetch('../topo/topo.html');
        const cabecalhoHTML = await response.text();
        document.body.insertAdjacentHTML('afterbegin', cabecalhoHTML); // Insere o HTML do cabeçalho

        // Adiciona o CSS dinamicamente
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../topo/topo.css'; // Certifique-se de que o caminho para o CSS esteja correto
        document.head.appendChild(cssLink);

        // Importa e executa o módulo JavaScript do topo.js
        await import('../topo/topo.js'); // Certifique-se de que o caminho esteja correto

    } catch (error) {
        console.error('Erro ao importar o cabeçalho:', error);
    }
}

// Função para adicionar o rodapé do site
async function importarRodape() {
    try {
        // Importa o conteúdo HTML do rodapé
        const response = await fetch('../footer/footer.html');
        const rodapeHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', rodapeHTML); // Insere o HTML do rodapé

        // Adiciona o CSS dinamicamente
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../footer/footer.css'; // Certifique-se de que o caminho para o CSS esteja correto
        document.head.appendChild(cssLink);

    } catch (error) {
        console.error('Erro ao importar o rodapé:', error);
    }
}


// Chame a função para importar o rodapé quando a página carregar
window.addEventListener('DOMContentLoaded', importarRodape);
// Chame a função para importar o cabeçalho quando a página carregar
window.addEventListener('DOMContentLoaded', importarCabecalho);
// Carregar o pop-up assim que a página for carregada
carregarPopup();


// Função que atualiza a cor do botão
function updateButtonColor() {
    const fileInput = document.getElementById('fileInput');
    const qualSerie = document.getElementById('qualSerie');
    const turmaDesejada = document.getElementById('turmaDesejada');
    const bntSalvar = document.getElementById('salvar');

    // Verifica se os campos têm valores e se um arquivo foi selecionado
    if (qualSerie.value !== '' && turmaDesejada.value !== '' && fileInput.files.length > 0) {
        bntSalvar.style.backgroundColor = '#1B8EFF';
    } else {
        bntSalvar.style.backgroundColor = ''; // ou a cor padrão
    }
}

// Adiciona os event listeners para os campos relevantes
document.getElementById('qualSerie').addEventListener('change', updateButtonColor);
document.getElementById('turmaDesejada').addEventListener('change', updateButtonColor);
document.getElementById('fileInput').addEventListener('change', updateButtonColor);

//Código para atualizar turmas ao selecionar o tipo de ensino
document.addEventListener("DOMContentLoaded", function() {
    const primeiroSelect = document.getElementById('tipoEnsino');
    const segundoSelect = document.getElementById('qualSerie');

    // Ajuste para corresponder aos novos valores em minúsculas
    const opcoes = {
        fundamental: ['6°Ano', '7°Ano', '8°Ano', '9°Ano'], // Altere para minúsculo
        medio: ['1°Ano', '2°Ano', '3°Ano'] // Altere para minúsculo
    };

    function atualizarSegundoSelect() {
        segundoSelect.innerHTML = '';
        const valorSelect1 = primeiroSelect.value; // Isso pegará os valores em minúsculas
        const resultado = opcoes[valorSelect1]; // Use o valor correspondente

        if (resultado) { // Verifica se existe uma opção para o valor selecionado
            resultado.forEach(function(opcao) {
                const optionElement = document.createElement("option");
                optionElement.value = opcao.charAt(0); // Mantém o valor do primeiro caractere
                optionElement.textContent = opcao; // O texto da opção
                segundoSelect.appendChild(optionElement);
            });
        }
    }

    // Atualizar o segundo select quando o primeiro select mudar
    primeiroSelect.addEventListener("change", atualizarSegundoSelect);

    // Atualizar o segundo select inicialmente com base no valor padrão do primeiro select
    atualizarSegundoSelect();
});

//Redireciona o botão de Voltar --> Página de Início//
document.addEventListener('DOMContentLoaded', function() {

    var div = document.getElementById('voltar');

    div.addEventListener("click", function() {

        window.location.href = "../principal/principal.html";
    });
});


document.getElementById('salvar').addEventListener('click', (event) => {
    uploadFile(event, 'fileInput', 'tipoEnsino', 'qualSerie', 'turmaDesejada');
});





