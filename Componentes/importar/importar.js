
function importarTurma() {
    const importacaoBemSucedida = true; // Simula o sucesso da importação

    if (importacaoBemSucedida) {
        mostrarPopup("Turma importada com sucesso!", 'success');
    } else {
        mostrarPopup("Erro ao importar a turma.", 'error');
    }
}
document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); // Previne o recarregamento da página
    importarTurma();
});
document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault(); // Previne o recarregamento da página
    importarTurma();   
});

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

// Chame a função para importar o cabeçalho quando a página carregar
window.addEventListener('DOMContentLoaded', importarCabecalho);

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

// Chame a função para importar o rodapé quando a página carregar
window.addEventListener('DOMContentLoaded', importarRodape);

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


    // Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
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

    setTimeout(fecharPopup, 4000);
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Requisição para fazer o upload do CSV e mandar para o banco de dados
document.addEventListener('DOMContentLoaded', function () {
    const uploadFile = async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const ensino = document.getElementById('tipoEnsino');
        const serieSelect = document.getElementById('qualSerie');
        const turmaSelect = document.getElementById('turmaDesejada');
        const formData = new FormData();

        // Verifica se um arquivo foi selecionado
        if (!fileInput.files[0]) {
            console.error('Nenhum arquivo selecionado.');
            mostrarPopup("Nenhum arquivo foi selecionado", 'error');
            return;
        }

        formData.append('file', fileInput.files[0]);
        formData.append('ensino', ensino.value);
        formData.append('serie', serieSelect.value);
        formData.append('turma', turmaSelect.value);

        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado no local storage.');
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
                }
            });

            if (response.ok) {
                console.log('Arquivo enviado com sucesso!');
                mostrarPopup("Arquivo enviado com sucesso!", 'success');
            } else {
                console.error('Erro ao enviar arquivo:', response.statusText);
                mostrarPopup("Erro ao enviar arquivo", 'error');
            }
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            mostrarPopup("Erro ao enviar arquivo", 'error');
        }
    };

    // Adicione o event listener para o formulário ou botão de upload
    document.getElementById('salvar').addEventListener('click', uploadFile); // ID do formulário ou botão

});