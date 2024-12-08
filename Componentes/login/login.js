import {validarEmail,validarSenha} from '../../utils/validarLogin.js';
import { enviarDados } from '../../utils/routes/apiRequestLogin.js';

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

document.getElementById('entrar').addEventListener('click', () => {
    const emailValido = validarEmail(); // Validações devem ser chamadas no momento do clique
    const senhaValida = validarSenha();

    enviarDados(emailValido, senhaValida, 'email', 'senha');
});


