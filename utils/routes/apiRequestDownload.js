import {request} from '../request.js';

async function carregarPopup() {
    try {
        // Importar o HTML do pop-up
        const response = await fetch('../../Componentes/popup/popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Adicionar o CSS dinamicamente
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../Componentes/popup/popup.css';
        document.head.appendChild(cssLink);

        // Importar o JavaScript do pop-up
        await import('../../Componentes/popup/popup.js');
    } catch (error) {
        console.error('Erro ao carregar o pop-up:', error);
    }
}
// Carregar o pop-up assim que a página for carregada
carregarPopup();


// Função responsável pelas requisições e manipulação das salas
export async function fetchSalas(adicionarSalasnoHtmlMedio, adicionarSalasnoHtmlFundamental, salasEnsinoMedio, salasEnsinoFundamental, adicionarEtiquetasEnsino,exibirMensagemBancoVazio) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Caminho ajustado
            }, 3000);
            return;
        }

        // Aguarda a resposta da requisição
        const response = await request('/student/salas', 'GET', token);

        // Verifica se a resposta é válida
        if (!response) {
            console.log("Resposta indefinida ou erro ao processar a requisição");
            return;
        }

        // Verifica se a resposta contém algum erro HTTP
        if (response.error) {
            console.log(`Erro na requisição: ${response.error.message}`);
            return;
        }

        // Se não houver salas importadas, exibe a mensagem
        if (response.length === 0) {
            exibirMensagemBancoVazio();  // Chama a função para exibir a mensagem
            return;
        }

        // Ordena e processa as salas recebidas
        const salasOrdenadas = response.sort((a, b) => {
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

        // Adiciona as etiquetas
        adicionarEtiquetasEnsino();
    } catch (error) {
        console.log(`Erro ao buscar as salas: ${error}`);
        mostrarPopup(`Erro ao buscar as salas: ${error.message}`, 'error');
    }
}



// Requisição para sortear os alunos com verificação de token
export async function sortearAlunos(salasSelecionadas) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html';
            }, 3000);
            return;
        }

        // Faz a requisição ao backend usando a função request
        const data = await request('/sort/sortearAlunos', 'POST', token, { salasSelecionadas });

        // Retorna os dados processados
        return data;

    } catch (error) {
        console.error('Erro ao realizar o sorteio:', error);
        mostrarPopup("Erro ao realizar o sorteio", 'error');
        if (error.message.includes('401')) {
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html';
            }, 3000);
        }
    }
}

// Requisição Gerar Lista de Assinatura
export async function gerarListaAssinatura(dadosNuvem, nomeSala) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Caminho ajustado
            }, 3000);
            return;
        }

        // Usando a função request para gerar o PDF
        const blob = await request('/pdf/leituraPDF', 'POST', token, { dadosNuvem, nomeSala });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lista_assinatura_${nomeSala}.pdf`; // Define o nome do arquivo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        mostrarPopup("Erro ao gerar o PDF", 'error');
    }
}

// Requisição Gerar Mapa de Sala
export async function gerarMapaDeSala(alunos, nomeSala) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Usando a função request para gerar o PDF
        const blob = await request('/pdf/gerarMapaDeSala', 'POST', token, { alunos, nomeSala });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MapaDeSala_${nomeSala}.pdf`; // Define o nome do arquivo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
    }
}

// Requisição Gerar Localização de Alunos
export async function gerarLocalizacaoDeAlunos(dadosNuvem, nomeSala) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Usando a função request para gerar o PDF
        const blob = await request('/pdf/gerarLocalizacaoDeAlunos', 'POST', token, { arrayDeAlunos: dadosNuvem, nomeSala });

        const url = window.URL.createObjectURL(blob);
        const currentDate = new Date().toISOString().split('T')[0]; // Formato: AAAA-MM-DD
        const a = document.createElement('a');
        a.href = url;
        a.download = `LocalizacaoDeAlunos_${nomeSala}_${currentDate}.pdf`; // Nome do arquivo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Erro ao gerar o mapa de sala:', error);
        mostrarPopup("Erro ao gerar o mapa de sala", 'error');
        setTimeout(() => {
            window.location.href = '../../Componentes/login/login.html'; // Ajuste o caminho conforme necessário
        }, 3000);
    }
}

//Função deletar alunos
export async function deletarAlunos() {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Ajuste o caminho conforme necessário
            }, 3000);
            return;
        }

        // Exibe uma mensagem de carregamento
        mostrarPopup("Deletando alunos...", 'loading');

        const response = request('/student/deletaralunos','DELETE',token)
        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            if (response.status === 401) {
                mostrarPopup("Erro de autenticação: sessão expirada.", 'error');
                setTimeout(() => {
                    window.location.href = '../../Componentes/login/login.html'; // Ajuste o caminho conforme necessário
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
