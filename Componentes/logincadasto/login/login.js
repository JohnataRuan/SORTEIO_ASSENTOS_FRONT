// Redireciona o Login --> Página de Login
document.getElementById("cadastrar").addEventListener("click", function () {
    window.location.href = "../cadastro/cadastro.html";
});

document.getElementById('entrar').addEventListener('click', enviarDados);


    // Função para exibir o pop-up
function mostrarPopup(mensagem, tipo) {
    console.log("Poupop chamado!")
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
    
        setTimeout(fecharPopup, 3000);
}
    
    // Função para fechar o pop-up
function fecharPopup() {
        const popup = document.getElementById('popup');
        popup.classList.remove('show');
}

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

// Validações específicas
function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const emailErro = document.getElementById('emailErro');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailErro.textContent = 'O campo email é obrigatório.';
        return false;
    } else if (!emailRegex.test(email)) {
        emailErro.textContent = 'Digite um email válido.';
        return false;
    }

    emailErro.textContent = '';
    return true;
}

function validarSenha() {
    const senha = document.getElementById('senha').value;
    const senhaErro = document.getElementById('senhaErro');
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!senha) {
        senhaErro.textContent = 'O campo senha é obrigatório.';
        return false;
    } else if (!senhaRegex.test(senha)) {
        senhaErro.textContent =
            'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
        return false;
    }

    senhaErro.textContent = '';
    return true;
}

// Adiciona monitoramento para email e senha
monitorarCampo('email', validarEmail);
monitorarCampo('senha', validarSenha);

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
        const response = await fetch('http://localhost:3000/login', {
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
                window.location.href = '../../principal/principal.html'; // Caminho ajustado
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