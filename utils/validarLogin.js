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

export {validarEmail,validarSenha};