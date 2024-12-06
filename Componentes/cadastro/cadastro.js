import { validarNomeSobrenome, validarEmail, validarSenha, validarRepetirSenha, validarFormulario } from '../../../utils/validarCadastro.js';

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
// Carregar o pop-up assim que a página for carregada
carregarPopup();

// Redireciona o Entrar --> Página de Login
document.getElementById("paginaLogin").addEventListener("click", function () {
    window.location.href = "../login/login.html";
});

// Redireciona para a página de login com a validação do formulário no clique do botão
document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio do formulário até a validação ser feita

    // Verifica se o formulário é válido
    if (validarFormulario()) {
        cadastrarUsuario();  // Chama a função para realizar o cadastro
    }
});

// Adiciona os listeners de validação para os campos
monitorarCampo('nome', validarNomeSobrenome, 'Nome inválido! Apenas letras são permitidas.');
monitorarCampo('email', validarEmail, 'E-mail inválido! Verifique o formato.');
monitorarCampo('senha', validarSenha, 'Senha deve ter pelo menos 6 caracteres.');
monitorarCampo('senhaRepetida', validarRepetirSenha, 'As senhas não coincidem.');

// Função para monitorar os campos e exibir mensagens de erro
export function monitorarCampo(campoId, funcaoValidacao, errorMessage) {
    const campo = document.getElementById(campoId);
    const errorSpan = document.getElementById(campoId + 'Error'); // Identificador da mensagem de erro

    // Adiciona evento de "blur" para validar quando o campo perde o foco
    campo.addEventListener('blur', () => {
        // Executa a validação e aplica classe `invalid` se necessário
        if (!funcaoValidacao()) {
            campo.classList.add('invalid');
            errorSpan.textContent = errorMessage; // Mensagem de erro personalizada
        } else {
            campo.classList.remove('invalid');
            errorSpan.textContent = ''; // Limpa a mensagem de erro
        }
    });

    // Remove a classe de erro ao digitar novamente (evento "input")
    campo.addEventListener('input', () => {
        campo.classList.remove('invalid');
        errorSpan.textContent = ''; // Limpa a mensagem ao digitar
    });
}

// Função para cadastrar o usuário
async function cadastrarUsuario() {
    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Prepara os dados para enviar
    const usuario = { nome, email, senha };

    try {
        // Envia a requisição POST para o backend
        const response = await fetch('http://localhost:3000/auth/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),  // Converte os dados em JSON
        });

        const data = await response.json();

        if (response.ok) {
            mostrarPopup('Cadastro realizado com sucesso!', "success");
        } else {
            mostrarPopup('Erro ao cadastrar usuário.', "error");
        }

        setTimeout(() => {
            window.location.href = '../login/login.html'; // Caminho ajustado
        }, 2000);
    } catch (error) {
        // Caso ocorra algum erro na requisição
        mostrarPopup('Erro ao enviar a requisição!', "error");
    }
}


