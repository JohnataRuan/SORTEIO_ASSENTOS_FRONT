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
monitorarCampo('nome', validarNomeSobrenome);
monitorarCampo('email', validarEmail);
monitorarCampo('senha', validarSenha);
monitorarCampo('senhaRepetida', validarRepetirSenha);

                // Parte que valida os campos do cadastro

// Função para monitorar campos e validar ao perder o foco
function monitorarCampo(campoId, funcaoValidacao) {
    const campo = document.getElementById(campoId);

    campo.addEventListener('blur', () => {
        // Executa a validação e aplica classe `invalid` se necessário
        if (!funcaoValidacao()) {
            campo.classList.add('invalid');
        } else {
            campo.classList.remove('invalid');
        }
    });

    // Remove a classe de erro ao digitar novamente
    campo.addEventListener('input', () => {
        campo.classList.remove('invalid');
    });
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


// Função de validação do formulário
function validarFormulario() {
    const nomeValido = validarNomeSobrenome();
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    const repetirSenhaValida = validarRepetirSenha();

    return nomeValido && emailValido && senhaValida && repetirSenhaValida;
}


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
            mostrarPopup('Cadastro realizado com sucesso!', "success")

        } else {
            mostrarPopup('Erro ao cadastrar usuário.', "error")
        }

         setTimeout(() => {
            window.location.href = '../login/login.html'; // Caminho ajustado
        }, 2000);
    } catch (error) {
        // Caso ocorra algum erro na requisição
        mostrarPopup('Erro ao enviar a requisição!', "error")
    }
}