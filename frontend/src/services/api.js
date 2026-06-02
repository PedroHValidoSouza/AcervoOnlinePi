
const BASE_URL = '/Api';

async function request(path, options = {}) {
    const resposta = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({ erro: 'Erro desconhecido' }));
        throw new Error(erro.erro || erro.mensagem || `Erro HTTP ${resposta.status}`);
    }

    return resposta.json().catch(() => null);
}

export function getLivros() {
    return request('/livros');
}


export function getLivro(idO) {
    return request(`/livros/${idO}`);
}

export function criarLivro(body) {
    return request('/livros', {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function atualizarLivro(idO, body) {
    return request(`/livros/${idO}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });
}

export function deletarLivro(idO) {
    return request(`/livros/${idO}`, { method: 'DELETE' });
}

export function criarEdicao(idO, body) {
    return request(`/livros/${idO}/edicoes`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function deletarEdicao(idO, iSBN) {
    return request(`/livros/${idO}/edicoes/${iSBN}`, { method: 'DELETE' });
}

export function criarExemplar(idO, iSBN, body) {
    return request(`/livros/${idO}/edicoes/${iSBN}/exemplares`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export function deletarExemplar(idO, iSBN, idEx) {
    return request(`/livros/${idO}/edicoes/${iSBN}/exemplares/${idEx}`, {
        method: 'DELETE'
    });
}
