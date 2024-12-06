import {validarEmail,validarSenha} from '../../utils/validarLogin.js';

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
// Redireciona o Login --> Página de Login
document.getElementById("cadastrar").addEventListener("click", function () {
    window.location.href = "../cadastro/cadastro.html";
});

// Ao clickar em entrar chama a função que envia dados para o backEnd
document.getElementById('entrar').addEventListener('click', enviarDados);

// Função para adicionar validação dinâmica com interação
function monitorarCampo(campoId, funcaoValidacao) {
    const campo = document.getElementById(campoId);

    campo.addEventListener('blur', () => {
        // Marca o campo como "tocado"
        campo.classList.add('touched');
        
        // Executa a validação e aplica classe `invalid` se necessário
        if (!funcaoValidacao()) {
            campo.classList.add('invalid');
        } else {
            campo.classList.remove('invalid');
        }
    });

    // Remove classe `invalid` ao digitar novamente
    campo.addEventListener('input', () => {
        campo.classList.remove('invalid');
    });
}


// Adiciona monitoramento para email e senha
monitorarCampo('email', validarEmail);
monitorarCampo('senha', validarSenha);


// Requisição para o backEnd para validar o usuário logado
async function enviarDados() {
    // Realiza validações antes de enviar
    const emailValido = validarEmail();
    const senhaValida = validarSenha();

    if (!emailValido || !senhaValida) {
        mostrarPopup('Usuário ou senha inválido', "error");
        return;
    }

    // Prepara os dados para envio
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            mostrarPopup(`Bem-vindo, ${data.nome} !`, 'success'); // Ajuste para usar data.nome
            // Armazena o token no localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            // Redireciona após 3 segundos
            setTimeout(() => {
                window.location.href = '../principal/principal.html'; // Caminho ajustado
            }, 3000);
        } else {
            // Exibir mensagem de erro do servidor
            mostrarPopup(`Erro: ${data.mensagem || 'Erro ao realizar login.'}`, 'error');
        }   
    } catch (error) {
        // Exibir mensagem de erro de conexão
        console.error(error);
        document.getElementById('mensagem').textContent = 'Erro ao conectar ao servidor!';
    }
}