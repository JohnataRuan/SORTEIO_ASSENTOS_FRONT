export async function request(route, method, token, body = null) {
    // Definindo os cabeçalhos padrão
    let headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    // Se a rota começar com '/pdf', adicionar o cabeçalho 'Accept: application/pdf'
    if (route.startsWith('/pdf')) {
        headers = {
            ...headers,
            'Accept': 'application/pdf',
        };
    }

    // Fazendo a requisição com os cabeçalhos adequados
    const response = await fetch(`http://localhost:3000${route}`, {
        method: method.toUpperCase(),
        headers: headers,
        body: method.toUpperCase() === 'POST' && body ? JSON.stringify(body) : null,
    });

    // Verificando se a resposta foi bem-sucedida
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    // Retornando a resposta em formato JSON, caso contrário, o corpo pode ser tratado como PDF
    if (route.startsWith('/pdf')) {
        return response.blob();  // Se for PDF, retorna como blob
    }

    return response.json();  // Caso contrário, retorna como JSON
}

