import { request } from "../request.js";

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
await carregarPopup();

export async function enviarDados(emailValido, senhaValida, emailId, senhaId) {
    // Realiza validações antes de enviar
    if (!emailValido || !senhaValida) {
        mostrarPopup('Usuário ou senha inválido', "error");
        return;
    }

    // Prepara os dados para envio
    const email = document.getElementById(emailId).value.trim();
    const senha = document.getElementById(senhaId).value;

    try {
        // Faz a requisição usando a função genérica `request`
        const data = await request('/auth/login', 'POST', null, { email, senha });

        // Exibe mensagem de sucesso
        mostrarPopup(`Bem-vindo, ${data.nome}!`, 'success'); 

        // Armazena o token no localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
        }

        // Redireciona após 3 segundos
        setTimeout(() => {
            window.location.href = '../../Componentes/principal/principal.html'; // Caminho ajustado
        }, 3000);

    } catch (error) {
        // Trata erros da requisição
        console.error(error);
        mostrarPopup(error.message || 'Erro ao realizar login.', 'error');
    }
}
