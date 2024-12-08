// Função para validar nome e sobrenome
export function validarNomeSobrenome() {
    const nome = document.getElementById('nome').value.trim(); // .trim() para remover espaços extras
    const nomeRegex = /^[a-zA-Z\s]+$/; // Regex para nome (apenas letras)
    const nomeValido = nomeRegex.test(nome);
    return nomeValido;
}

// Função para validar email
export function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para e-mail
    const emailValido = emailRegex.test(email);
    return emailValido;
}

// Função para validar senha (mínimo 6 caracteres)
export function validarSenha() {
    const senha = document.getElementById('senha').value;
    const senhaValida = senha.length >= 6; // Senha deve ter no mínimo 6 caracteres
    return senhaValida;
}

// Função para validar repetição de senha
export function validarRepetirSenha() {
    const senha = document.getElementById('senha').value;
    const senhaRepetida = document.getElementById('senhaRepetida').value;
    return senha === senhaRepetida; // Verifica se as senhas coincidem
}

// Função para validar o formulário inteiro
export function validarFormulario() {
    return validarNomeSobrenome() && validarEmail() && validarSenha() && validarRepetirSenha();
}
