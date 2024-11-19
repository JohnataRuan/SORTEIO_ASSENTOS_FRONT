// Redireciona o Entrar --> Página de Login
document.getElementById("paginaLogin").addEventListener("click", function () {
    window.location.href = "../login/login.html";
});

// Validação e envio do formulário
document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio do formulário até a validação ser feita

    // Verifica se o formulário é válido
    if (validarFormulario()) {
        cadastrarUsuario();  // Chama a função para realizar o cadastro
    }
});

                            // Parte da validação dos dados

// Função de validação do formulário
function validarFormulario() {
    const nomeValido = validarNomeSobrenome();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    const repetirSenhaValida = validarRepetirSenha();

    return nomeValido && emailValido && senhaValida && repetirSenhaValida;
}

// Validação do nome completo (nome e sobrenome)
function validarNomeSobrenome() {
    const nome = document.getElementById('nome').value.trim();
    const partesNome = nome.split(" ");
    const erroNome = document.getElementById('nomeError');

    if (partesNome.length < 2) {
        erroNome.textContent = "Por favor, insira seu nome completo (nome e sobrenome).";
        erroNome.style.display = "block";
        return false;
    }
    erroNome.style.display = "none";
    return true;
}

// Validação do e-mail
function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const erroEmail = document.getElementById('emailError');

    if (!regexEmail.test(email)) {
        erroEmail.textContent = "Por favor, insira um email válido.";
        erroEmail.style.display = "block";
        return false;
    }
    erroEmail.style.display = "none";
    return true;
}

// Validação da senha
function validarSenha() {
    const senha = document.getElementById('senha').value.trim();
    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>?]).{8,}$/;
    const erroSenha = document.getElementById('senhaError');

    if (!regexSenha.test(senha)) {
        erroSenha.textContent = "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.";
        erroSenha.style.display = "block";
        return false;
    }
    erroSenha.style.display = "none";
    return true;
}

// Validação da repetição da senha
function validarRepetirSenha() {
    const senha = document.getElementById('senha').value.trim();
    const senhaRepetida = document.getElementById('senhaRepetida').value.trim();
    const erroSenhaRepetida = document.getElementById('senhaRepetidaError');

    if (senha !== senhaRepetida) {
        erroSenhaRepetida.textContent = "As senhas não coincidem. Por favor, verifique.";
        erroSenhaRepetida.style.display = "block";
        return false;
    }
    erroSenhaRepetida.style.display = "none";
    return true;
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
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),  // Converte os dados em JSON
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('mensagem').textContent = data.mensagem || 'Cadastro realizado com sucesso!';
        } else {
            document.getElementById('mensagem').textContent = `Erro: ${data.mensagem || 'Erro ao cadastrar usuário.'}`;
        }

    } catch (error) {
        // Caso ocorra algum erro na requisição
        document.getElementById('mensagem').textContent = 'Erro ao enviar a requisição!';
    }
}