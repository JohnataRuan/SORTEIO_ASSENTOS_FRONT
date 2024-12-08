import { request } from "../request.js";

export async function cadastrarUsuario(nome, email, senha) {
    // Prepara os dados para enviar
    const usuario = { nome, email, senha };

    try {
        // Faz a requisição usando a função genérica `request`
        const response = await request('/auth/cadastrar', 'POST', null, usuario);

        // Trata o sucesso
        mostrarPopup('Cadastro realizado com sucesso!', "success");

        // Redireciona após 2 segundos
        setTimeout(() => {
            window.location.href = '../../Componentes/login/login.html'; // Caminho ajustado
        }, 2000);

    } catch (error) {
        // Trata erros da requisição
        console.error('Erro ao cadastrar usuário:', error);
        mostrarPopup(error.message || 'Erro ao cadastrar usuário.', "error");
    }
}
