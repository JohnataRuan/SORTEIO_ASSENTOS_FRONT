import {fetchSalas,sortearAlunos,gerarListaAssinatura,gerarMapaDeSala,gerarLocalizacaoDeAlunos,deletarAlunos} from '../../utils/routes/apiRequestDownload.js';
// Parte Responsável pela importação dos outros html
async function carregarPopup() {
    try {
        // Importar o HTML do pop-up
        const response = await fetch('../popup/popup.css');
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
// Carregar o pop-up assim que a página for carregada
carregarPopup();


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

                // Parte Responsável pela exibição dos CheckBoxs no HTML

const salasEnsinoMedio = [];
const salasEnsinoFundamental = [];

// Chama a função fetchSalas normalmente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    fetchSalas(adicionarSalasnoHtmlMedio, adicionarSalasnoHtmlFundamental, salasEnsinoMedio, salasEnsinoFundamental, adicionarEtiquetasEnsino,exibirMensagemBancoVazio);
});
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
document.getElementById('bntSim').addEventListener('click',function(){
    deletarAlunos();
    location.reload();
});

    //Botão para sair da tela de apagar alunos
document.getElementById('bntNao').addEventListener('click',function(event){
    event.preventDefault();
    boxConfimacaoNao();
});

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
        <h2 class ="tituloNaoImportado" >Nenhuma Sala foi Importada.</h2>
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



