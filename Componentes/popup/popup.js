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

// Exportar funções globalmente
window.mostrarPopup = mostrarPopup;
window.fecharPopup = fecharPopup;
