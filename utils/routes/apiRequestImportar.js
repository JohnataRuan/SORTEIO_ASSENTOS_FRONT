export async function uploadFile(event, fileInputId, tipoEnsino, qualSerie, turmaDesejada) {
    event.preventDefault();

        const fileInput = document.getElementById(fileInputId);
        const ensino = document.getElementById(tipoEnsino);
        const serieSelect = document.getElementById(qualSerie);
        const turmaSelect = document.getElementById(turmaDesejada);
        const formData = new FormData();

        // Verifica se um arquivo foi selecionado
        if (!fileInput.files[0]) {
            console.error('Nenhum arquivo selecionado.');
            mostrarPopup("Nenhum arquivo foi selecionado", 'error');
            return;
        }

        formData.append('file', fileInput.files[0]);
        formData.append('ensino', ensino.value);
        formData.append('serie', serieSelect.value);
        formData.append('turma', turmaSelect.value);

        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado no local storage.');
            mostrarPopup("Erro de autenticação: token não encontrado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html'; // Caminho ajustado
            }, 3000);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/upload/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho
                }
            });

            if (response.ok) {
                console.log('Arquivo enviado com sucesso!');
                mostrarPopup("Arquivo enviado com sucesso!", 'success');
            } else {
                const errorData = await response.json(); // Obtém detalhes do erro do backend
                console.error('Erro ao enviar arquivo:', errorData.message);

                // Trata erros de autenticação
                if (response.status === 401 || response.status === 403) {
                    mostrarPopup("Erro de autenticação: redirecionando para login...", 'error');
                    setTimeout(() => {
                        window.location.href = '../../Componentes/login/login.html'; // Caminho ajustado
                    }, 3000);
                   
                } else {
                    mostrarPopup("Erro ao enviar arquivo", 'error');
                }
            }
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            mostrarPopup("Erro ao enviar arquivo", 'error');
        }
}


