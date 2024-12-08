export async function request(route, method, token, body = null) {
    // Define os cabeçalhos padrão
    let headers = {
        'Authorization': `Bearer ${token}`,
    };

    // Adiciona cabeçalho específico para PDFs
    if (route.startsWith('/pdf')) {
        headers = {
            ...headers,
            'Accept': 'application/pdf',
        };
    } else if (!(body instanceof FormData)) {
        // Adiciona Content-Type se o corpo não for FormData
        headers['Content-Type'] = 'application/json';
    }

    // Configura o corpo da requisição
    const options = {
        method: method.toUpperCase(),
        headers,
        body: body instanceof FormData
            ? body // Se for FormData, usa diretamente
            : method.toUpperCase() === 'POST' && body 
                ? JSON.stringify(body) // Para POST com JSON
                : null,
    };

    // Faz a requisição
    const response = await fetch(`http://localhost:3000${route}`, options);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // Retorna o resultado adequado
    if (route.startsWith('/pdf')) {
        return response.blob(); // Retorna blob para PDFs
    }

    return response.json(); // Retorna JSON para outras rotas
}
