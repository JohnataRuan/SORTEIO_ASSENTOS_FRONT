import {request} from "../request.js";

export async function fetchSalas(adicionarSalasnoHtmlMedio, adicionarSalasnoHtmlFundamental, salasEnsinoMedio,salasEnsinoFundamental) {
    try {
        // Obtém o token do local storage
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token não encontrado no local storage");
            mostrarPopup("Erro de autenticação: token inválido ou expirado.", 'error');
            setTimeout(() => {
                window.location.href = '../../Componentes/login/login.html';
            }, 3000);
            return;
        }

        // Faz a requisição para obter as salas
        const salas = await request('/student/salas', 'GET', token);

        // Ordena as salas por série e turma
        const salasOrdenadas = salas.sort((a, b) => {
            return a.serie - b.serie || a.turma.localeCompare(b.turma);
        });

        // Adiciona as salas no HTML, evitando duplicatas
        salasOrdenadas.forEach((sala) => {
            if (sala.ensino === 'medio' && !salasEnsinoMedio.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                adicionarSalasnoHtmlMedio(sala);
                salasEnsinoMedio.push(sala);
            } else if (sala.ensino === 'fundamental' && !salasEnsinoFundamental.some(s => s.serie === sala.serie && s.turma === sala.turma)) {
                adicionarSalasnoHtmlFundamental(sala);
                salasEnsinoFundamental.push(sala);
            }
        });

    } catch (error) {
        // Trata erros de requisição ou lógicos
        console.error(`Erro ao buscar as salas: ${error.message}`);
        mostrarPopup("Erro ao buscar as salas.", 'error');
    }
}