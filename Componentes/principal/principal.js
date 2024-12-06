
                            // Importação do Cabeçalho e Footer do site

//Função para adicionar o topo do site
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


                            // Botões de direcionamento da página

// Redireciona o BotaoImportarArquivos --> Página de Importar Arquivos
document.getElementById("BotaoImportarArquivos").addEventListener("click", function () {
    window.location.href = "../importar/importar.html";
});

// Redireciona o BotaoConfiguracao --> Página de Configurações de Sorteio
document.getElementById("BotaoDownload").addEventListener("click", function () {
    window.location.href = "../download/download.html";
});

