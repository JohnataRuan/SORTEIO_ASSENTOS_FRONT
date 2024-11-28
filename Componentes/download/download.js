                // Parte Responsável pela importação dos outros html

//Função para importar cabeçalho
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

    //Chame a função para importar o cabeçalho quando a página carregar
window.addEventListener('DOMContentLoaded', importarCabecalho);

    //Função para adicionar o rodapé do site
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

    //Redireciona o botão de Voltar --> Página de Início//
document.addEventListener('DOMContentLoaded', function() {

    var div = document.getElementById('voltar');

    div.addEventListener("click", function() {
        event.preventDefault();
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

                // Parte Responsável pela exibição dos CheckBoxs no HTML

const salasEnsinoMedio = [];
const salasEnsinoFundamental = [];
document.addEventListener('DOMContentLoaded', fetchSalas());

    //Botão para aparecer a box de confirmação
document.getElementById('limpar').addEventListener('click',function(event){
    event.preventDefault();
    boxConfimacao();
});

    //Função para exibir a box de confirmação 
function boxConfimacao(){
    const boxConfimacao = document.getElementById("boxConfirmacao");
    boxConfimacao.style.display = 'block';
}

//Função para deixar de exibir a box de confirmação 
function boxConfimacaoNao(){
    const boxConfimacao = document.getElementById("boxConfirmacao");
    boxConfimacao.style.display = 'none';
}

    //Botão para apagar salas
document.getElementById('bntSim').addEventListener('click',function(event){
    deletarAlunos();
    location.reload();
});

    //Botão para sair da tela de apagar alunos
document.getElementById('bntNao').addEventListener('click',function(event){
    event.preventDefault();
    boxConfimacaoNao();
});


    //Funções da mensagem de Error
function mostrarErro(titulo, mensagem) {
    const tituloElemento = document.getElementById('tituloErro');
    const mensagemElemento = document.getElementById('mensagemErro');
    const erroElemento = document.getElementById('erro');

    // Atualiza os elementos com os dados da mensagem
    tituloElemento.textContent = titulo;
    mensagemElemento.textContent = mensagem;

    // Torna o elemento de erro visível
    erroElemento.style.display = 'block';
}

    // Função para fechar a mensagem de erro
function fecharErro() {
    const erroElemento = document.getElementById('erro');
    erroElemento.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('iconeX').addEventListener('click', fecharErro);
});


                    // Parte Responsável pelo funcionamento dos CheckBoxs


    // Array global para armazenar as salas selecionadas
const salasSelecionadas = []; 

    // Função para atualizar a cor do botão 'sortear'
function atualizarCorBotao() {
        const sortear = document.getElementById('sortear');
        if (salasSelecionadas.length >= 2) {
            sortear.style.backgroundColor = '#1B8EFF';
        } else {
            sortear.style.backgroundColor = ''; // Cor padrão (ou vazio para resetar)
        }
}
function deixarBotaoLimparVisivel(){
    const limpar = document.getElementById('limpar');
    limpar.style.display = 'block';
};

// Função para verificar se há mistura entre ensino médio e fundamental
function verificarMisturaEnsinos(salaSelecionada) {
    const ensinoMedio = ['1', '2', '3'];
    const ensinoFundamental = ['6', '7', '8', '9'];

    const salasEnsinoMedio = salasSelecionadas.filter(s => ensinoMedio.includes(s.serie));
    const salasEnsinoFundamental = salasSelecionadas.filter(s => ensinoFundamental.includes(s.serie));

    // Se a salaSelecionada for do ensino médio e já houver salas do ensino fundamental
    if (ensinoMedio.includes(salaSelecionada.serie) && salasEnsinoFundamental.length > 0) {
        return true;
    }

    // Se a salaSelecionada for do ensino fundamental e já houver salas do ensino médio
    if (ensinoFundamental.includes(salaSelecionada.serie) && salasEnsinoMedio.length > 0) {
        
        return true;
    }

    return false;
}

// Função genérica para adicionar as salas no HTML
function adicionarSalasNoHtml(sala, containerId) {
    // Obtém o container global sempre presente no HTML
    const barraDownload = document.querySelector('.Barra-download');
    
    // Verifica se o container específico (checkbox1 ou checkbox2) existe dentro de Barra-download; se não, cria-o
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'checkboxs';
        barraDownload.appendChild(container);
    }

    const novaSala = document.createElement('input');
    novaSala.type = 'checkbox';
    novaSala.dataset.serie = sala.serie; // Adicionando o atributo data-serie
    novaSala.dataset.turma = sala.turma; // Adicionando o atributo data-turma
    novaSala.id = `sala-${sala.serie}-${sala.turma}`;

    const label = document.createElement('label');
    label.textContent = `${sala.serie}° ${sala.turma}`;
    label.htmlFor = novaSala.id;

    const item = document.createElement('div');
    item.className = 'item';
    item.appendChild(novaSala);
    item.appendChild(label);
    container.appendChild(item);

    // Adiciona o event listener para atualizar salasSelecionadas quando o checkbox for alterado
    novaSala.addEventListener('change', () => {
        const salaSelecionada = { serie: novaSala.dataset.serie, turma: novaSala.dataset.turma };

        // Verifica se há mistura antes de adicionar ou remover
        if (novaSala.checked) {
            // Verifica se há mistura entre ensino médio e fundamental
            if (verificarMisturaEnsinos(salaSelecionada)) {
                novaSala.checked = false; // Desmarca o checkbox se houver mistura
                mostrarPopup("Não misture os Ensinos", "Turmas do ensino médio e fundamental não devem ser misturadas",'error');
                return; // Impede a adição ao array
            }

            // Adiciona a sala ao array se ainda não estiver presente
            const salaExiste = salasSelecionadas.some(s => 
                s.serie === salaSelecionada.serie && s.turma === salaSelecionada.turma
            );

            if (!salaExiste) {
                salasSelecionadas.push(salaSelecionada);
                console.log(`Sala ${salaSelecionada.serie}° ${salaSelecionada.turma} adicionada ao array.`);
            }
        } else {
            // Remove a sala do array se ela estiver presente
            const index = salasSelecionadas.findIndex(s => 
                s.serie === salaSelecionada.serie && s.turma === salaSelecionada.turma
            );

            if (index !== -1) {
                salasSelecionadas.splice(index, 1);
                console.log(`Sala ${salaSelecionada.serie}° ${salaSelecionada.turma} removida do array.`);
            }
        }

        // Exibe o array atualizado no console
        atualizarCorBotao();
        console.log('Salas selecionadas:', salasSelecionadas);
    });
}

// Funções para adicionar as salas de Ensino Médio e Fundamental no HTML
function adicionarSalasnoHtmlMedio(sala) {
    adicionarSalasNoHtml(sala, 'checkbox1');
}

function adicionarSalasnoHtmlFundamental(sala) {
    adicionarSalasNoHtml(sala, 'checkbox2');
}

// Função para exibir uma mensagem caso nenhuma sala seja importada
function exibirMensagemBancoVazio() {
    const barraDownload = document.querySelector('.Barra-download');
    mostrarPopup("Nenhuma sala foi importada", 'error');

    // Cria e exibe a mensagem de "Nenhuma Sala foi Importada"
    const textoNaoImportado = document.createElement('div');
    textoNaoImportado.className = 'textoNaoImportado';
  
    textoNaoImportado.innerHTML = `
        <h2>Nenhuma Sala foi Importada.</h2>
        <br>
        <br>
        <p class="texto-naoImportado">
            Importe salas na página de 
            <a href="../importar/importar.html" class="linkTexto-naoImportado">Importar Arquivos</a> 
            para ter acesso ao Sorteio.
        </p>
    `;

    // Adiciona o elemento ao container de download
    barraDownload.prepend(textoNaoImportado);
}
// Função para adicionar etiquetas de Ensino Médio e Fundamental acima dos checkboxes
function adicionarEtiquetasEnsino() {
    const labelEnsinoMedio = document.getElementById('checkbox1');
    const labelEnsinoFundamental = document.getElementById('checkbox2');

    // Adiciona etiqueta "Ensino Médio" uma vez, no topo, se houver alguma turma de Ensino Médio
    if (salasEnsinoMedio.length > 0 && !labelEnsinoMedio.querySelector('.ensinoMedio')) {
        const ensinoMedioEtiqueta = document.createElement('p');
        ensinoMedioEtiqueta.textContent = 'Ensino Médio';
        ensinoMedioEtiqueta.className = 'ensinoMedio';
        labelEnsinoMedio.prepend(ensinoMedioEtiqueta); // Adiciona no topo
    }

    // Adiciona etiqueta "Ensino Fundamental" uma vez, no topo, se houver alguma turma de Ensino Fundamental
    if (salasEnsinoFundamental.length > 0 && !labelEnsinoFundamental.querySelector('.ensinoFundamental')) {
        const ensinoFundamentalEtiqueta = document.createElement('p');
        ensinoFundamentalEtiqueta.textContent = 'Ensino Fundamental';
        ensinoFundamentalEtiqueta.className = 'ensinoFundamental';
        labelEnsinoFundamental.prepend(ensinoFundamentalEtiqueta); // Adiciona no topo
    }
}


                    //Parte Responsável pelo funcionamento das Nuvens 

// Exemplo de como executar a função ao clicar no botão
document.getElementById('sortear').addEventListener('click', async function (event) {
    event.preventDefault();
    if(salasSelecionadas.length <2){
        mostrarPopup("Numero de Salas insuficiente,Selecione no minimo duas salas para realizar um sorteio.", 'error');
    }else{
        const arraysDasSalas = await sortearAlunos(salasSelecionadas);
    const salasSelecionadasArray = arraysDasSalas.salasSelecionadas;
    const salasSorteadasArray = arraysDasSalas.salasSorteadas;
    console.log(salasSelecionadasArray);
    console.log(salasSorteadasArray);
    adicionarNuvensNoHtml(salasSelecionadasArray,salasSorteadasArray);
    deixarBotaoLimparVisivel();
    }
});


 // Função para criar os containers e adicionar os blocos de nuvens
function adicionarNuvensNoHtml(salasSelecionadas, salasSorteadas) {
    const barraDownload = document.querySelector('.Barra-download');
    
    if (!barraDownload) {
        console.error('Contêiner principal Barra-download não encontrado.');
        return;
    }

    // Cria os containers para os diferentes tipos de nuvens, caso ainda não existam
    function criarContainerIfNotExists(className, titleText) {
        let container = document.querySelector(`.Barra-download .${className}`);
        
        if (!container) {
            // Cria o contêiner principal
            container = document.createElement('div');
            container.className = className;
            barraDownload.appendChild(container);

            // Cria o título do contêiner
            const title = document.createElement('h2');
            title.className = 'nuvens';
            title.textContent = titleText;
            container.appendChild(title);

            // Cria o subcontainer interno onde os blocos de nuvem serão adicionados
            const subcontainer = document.createElement('div');
            subcontainer.className = 'blocosNuvem';
            container.appendChild(subcontainer);
        }

        return container.querySelector('.blocosNuvem');
    }

    // Cria os containers principais para cada tipo de nuvem
    const subContainerAssinatura = criarContainerIfNotExists('container-assinatura', "Lista de Assinatura");
    const subContainerMapa = criarContainerIfNotExists('container-mapa', "Mapa de Sala");
    const subContainerLocalizacao = criarContainerIfNotExists('container-localizacao', "Lista de Localização");

    // Cria os containers internos para cada tipo de nuvem
    const subContainerInternoAssinatura = document.createElement('div');
    subContainerInternoAssinatura.className = 'nuvensDownload';
    subContainerAssinatura.appendChild(subContainerInternoAssinatura);

    const subContainerInternoMapa = document.createElement('div');
    subContainerInternoMapa.className = 'nuvensDownload';
    subContainerMapa.appendChild(subContainerInternoMapa);

    const subContainerInternoLocalizacao = document.createElement('div');
    subContainerInternoLocalizacao.className = 'nuvensDownload';
    subContainerLocalizacao.appendChild(subContainerInternoLocalizacao);

    // Cria os blocos de nuvens dentro dos containers principais e internos
    for (let i = 0; i < salasSorteadas.length; i++) {
        const sala = salasSelecionadas[i];

        if (sala && sala.length > 0) {
            const salaSerie = sala[0].serie;
            const salaTurma = sala[0].turma;
            const nomeSala = `${salaSerie}${salaTurma}`;
            const arrayOrganizado = organizaAlunos(salasSorteadas, salaSerie, salaTurma);
            
            // Cria as nuvens para assinatura e adiciona no subcontainer interno de assinatura
            criarNuvensAssinatura(nomeSala, salasSorteadas[i], subContainerAssinatura,subContainerInternoAssinatura);
            // Cria as nuvens para mapa de sala e adiciona no subcontainer interno de mapa
            criarNuvensMapaSala(nomeSala, salasSorteadas[i], subContainerMapa,subContainerInternoMapa);
            // Cria as nuvens para localização e adiciona no subcontainer interno de localização
            criarNuvensLocalizacao(nomeSala, arrayOrganizado, subContainerLocalizacao,subContainerInternoLocalizacao);
        }
    }
}

// Funções para criar as nuvens (não alteradas, apenas passando o subcontainer como argumento)

function criarNuvensAssinatura(tituloSala, valorDoArray, subContainer, containerInterno) {
    const blocoNuvens = document.createElement('div');
    blocoNuvens.className = 'blocoNuvem';

    const tituloNuvens = document.createElement('p');
    tituloNuvens.className = 'tituloNuvem';
    tituloNuvens.textContent = `Sala ${tituloSala}`;

    const novoElemento = document.createElement('img');
    novoElemento.src = '../../Assets/Icones/ic--baseline-cloud-download.svg';
    novoElemento.alt = 'Imagem Nuvem';
    novoElemento.className = 'nuvem';

    blocoNuvens.setAttribute('data-valor', JSON.stringify(valorDoArray));
    blocoNuvens.appendChild(tituloNuvens);
    blocoNuvens.appendChild(novoElemento);

    blocoNuvens.addEventListener('click', function() {
        const dadosNuvem = JSON.parse(blocoNuvens.getAttribute('data-valor'));
        gerarListaAssinatura(dadosNuvem, tituloSala);
    });

    containerInterno.appendChild(blocoNuvens);
    subContainer.appendChild(containerInterno);
}

function criarNuvensMapaSala(tituloSala, valorDoArray, subContainer, containerInterno) {

    const blocoNuvens = document.createElement('div');
    blocoNuvens.className = 'blocoNuvem';

    const tituloNuvens = document.createElement('p');
    tituloNuvens.className = 'tituloNuvem';
    tituloNuvens.textContent = `Sala ${tituloSala}`;

    const novoElemento = document.createElement('img');
    novoElemento.src = '../../Assets/Icones/ic--baseline-cloud-download.svg';
    novoElemento.alt = 'Imagem Nuvem';
    novoElemento.className = 'nuvem';

    blocoNuvens.setAttribute('data-valor', JSON.stringify(valorDoArray));
    blocoNuvens.appendChild(tituloNuvens);
    blocoNuvens.appendChild(novoElemento);

    blocoNuvens.addEventListener('click', function() {
        const dadosNuvem = JSON.parse(blocoNuvens.getAttribute('data-valor'));
        gerarMapaDeSala(dadosNuvem, tituloSala);
    });

    containerInterno.appendChild(blocoNuvens);
    subContainer.appendChild(containerInterno);
}

function criarNuvensLocalizacao(tituloSala, valorDoArray, subContainer, containerInterno) {

    const blocoNuvens = document.createElement('div');
    blocoNuvens.className = 'blocoNuvem';

    const tituloNuvens = document.createElement('p');
    tituloNuvens.className = 'tituloNuvem';
    tituloNuvens.textContent = `Sala ${tituloSala}`;

    const novoElemento = document.createElement('img');
    novoElemento.src = '../../Assets/Icones/ic--baseline-cloud-download.svg';
    novoElemento.alt = 'Imagem Nuvem';
    novoElemento.className = 'nuvem';

    blocoNuvens.setAttribute('data-valor', JSON.stringify(valorDoArray));
    blocoNuvens.appendChild(tituloNuvens);
    blocoNuvens.appendChild(novoElemento);

    blocoNuvens.addEventListener('click', function() {
        const dadosNuvem = JSON.parse(blocoNuvens.getAttribute('data-valor'));
        gerarLocalizacaoDeAlunos(dadosNuvem, tituloSala);
    });

    containerInterno.appendChild(blocoNuvens);
    subContainer.appendChild(containerInterno);
}


function organizaAlunos(array, serieAluno, turmaAluno) {
    let resultado = [];

    // Percorre cada subarray (sala) dentro do array principal
    array.forEach(subarray => {
        // Filtra os alunos que possuem a mesma série e turma passados como parâmetros
        const alunosFiltrados = subarray.filter(aluno => 
            aluno.serie === serieAluno && aluno.turma === turmaAluno
        );

        // Adiciona os alunos filtrados ao array resultado
        resultado = resultado.concat(alunosFiltrados);
    });

    return resultado;
}

                    // Parte Responsável pelas Requisições

               
async function fetchSalas() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            return;
        }

        const response = await fetch('http://localhost:3000/salas', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.log("Erro de autenticação: redirecionando para login.");
                mostrarPopup("Erro de autenticação: token inválido ou expirado.", 'error');
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html';
                }, 3000);
                return;
            }
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

        adicionarEtiquetasEnsino();
    } catch (error) {
        console.log(`Erro ao buscar as salas: ${error}`);
    }
}

// Requisição para sortear os alunos com verificação de token

async function sortearAlunos(salasSelecionadas) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
            }, 3000);
            return;
        }

        // Faz a requisição ao backend com o token no cabeçalho
        const response = await fetch('http://localhost:3000/sortearAlunos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ salasSelecionadas }),
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.log(`Erro na requisição: ${response.statusText}`);
            mostrarPopup("Erro ao realizar o sorteio", 'error');
            if (response.status === 401) { // Caso o token seja inválido ou expirado
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
                }, 3000);
            }
            return;
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro ao buscar PDFs:', error);
        mostrarPopup("Erro ao buscar PDFs", 'error');
        setTimeout(() => {
            window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
        }, 3000);
    }
}

// Requisição Gera o pdf de Assinatura

async function gerarListaAssinatura(dadosNuvem, nomeSala) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
            }, 3000);
            return;
        }

        // Faz a requisição para o backend para gerar o PDF
        const response = await fetch('http://localhost:3000/leituraPDF', {
            method: 'POST',
            body: JSON.stringify({ dadosNuvem, nomeSala }), // Envia os dados dos alunos e o nome da sala
            headers: {
                'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
                'Content-Type': 'application/json', // Define que estamos enviando JSON
                'Accept': 'application/pdf', // Espera um PDF de resposta
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.log(`Erro na requisição: ${response.statusText}`);
            mostrarPopup("Erro ao gerar o PDF", 'error');

            if (response.status === 401) { // Caso o token seja inválido ou expirado
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
                }, 3000);
            }
            return;
        }

        // Converte a resposta em um Blob e cria um link para download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lista_assinatura_${nomeSala}.pdf`; // Define o nome do arquivo de download
        document.body.appendChild(a); // Adiciona o link ao DOM
        a.click(); // Simula o clique para iniciar o download
        a.remove(); // Remove o link do DOM após o clique
        window.URL.revokeObjectURL(url); // Libera o objeto URL

    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        mostrarPopup("Erro ao gerar o PDF", 'error');
        setTimeout(() => {
            window.location.href = '../logincadastro/login/login.html'; // Caminho ajustado
        }, 3000);
    }
}

// Requisição Gerar o pdf Mapa de Sala
async function gerarMapaDeSala(alunos, nomeSala) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Envia uma requisição POST para gerar o PDF e receber o arquivo
        const response = await fetch('http://localhost:3000/gerarMapaDeSala', {
            method: 'POST',
            body: JSON.stringify({ alunos, nomeSala }),
            headers: {
                'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
                'Content-Type': 'application/json',
                'Accept': 'application/pdf' // Informa que esperamos um PDF como resposta
            }
        });

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            console.log(`Erro na requisição: ${response.statusText}`);
            mostrarPopup("Erro ao gerar o PDF", 'error');

            // Redireciona para login se o token for inválido ou expirado (erro 401)
            if (response.status === 401) {
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
                }, 3000);
            }
            return;
        }

        // Converte a resposta em Blob para o download do PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MapaDeSala_${nomeSala}.pdf`; // Define o nome do arquivo para download
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Libera o objeto URL

    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        mostrarPopup("Erro ao gerar o PDF", 'error');
        setTimeout(() => {
            window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
        }, 3000);
    }
}

// Requisição Gerar Lista de Localização
async function gerarLocalizacaoDeAlunos(dadosNuvem, nomeSala) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Faz a requisição para o backend
        const response = await fetch('http://localhost:3000/gerarLocalizacaoDeAlunos', {
            method: 'POST',
            body: JSON.stringify({ arrayDeAlunos: dadosNuvem, nomeSala }),
            headers: {
                'Authorization': `Bearer ${token}`, // Inclui o token no cabeçalho
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        });

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            console.error(`Erro ao gerar o mapa de sala: ${response.statusText}`);
            mostrarPopup("Erro ao gerar o mapa de sala", 'error');

            if (response.status === 401) {
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
                }, 3000);
            }
            return;
        }

        // Converte a resposta em Blob para o download do PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Define um nome dinâmico para o arquivo de download
        const currentDate = new Date().toISOString().split('T')[0]; // Formato: AAAA-MM-DD
        const a = document.createElement('a');
        a.href = url;
        a.download = `LocalizacaoDeAlunos_${nomeSala}_${currentDate}.pdf`; // Nome do arquivo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Libera o objeto URL

    } catch (error) {
        console.error('Erro ao gerar o mapa de sala:', error);
        mostrarPopup("Erro ao gerar o mapa de sala", 'error');
        setTimeout(() => {
            window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
        }, 3000);
    }
}

//Função deletar alunos
async function deletarAlunos() {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Exibe uma mensagem de carregamento
        mostrarPopup("Deletando alunos...", 'loading');

        // Faz a requisição para deletar os alunos
        const response = await fetch('http://localhost:3000/deletaralunos', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
            }
        });

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            if (response.status === 401) {
                mostrarPopup("Erro de autenticação: sessão expirada.", 'error');
                setTimeout(() => {
                    window.location.href = '../logincadastro/login/login.html'; // Ajuste o caminho conforme necessário
                }, 3000);
            }
            throw new Error(`Erro ao deletar os alunos: ${response.statusText}`);
        }

        const mensagem = await response.text();
        console.log(mensagem);
        mostrarPopup("Alunos deletados com sucesso.", 'success');

    } catch (error) {
        console.error(`Erro ao deletar os alunos: ${error}`);
        mostrarPopup("Erro ao deletar os alunos. Tente novamente mais tarde.", 'error');
    }
}
