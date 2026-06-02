// 741 — api.js centraliza todas as chamadas HTTP para o backend.
// Em vez de espalhar fetch() por vários componentes, todas as requisições
// passam por aqui. Isso facilita manutenção: se o endereço da API mudar,
// você altera apenas este arquivo.

// 741 — BASE_URL aponta para o prefixo da API.
// Em desenvolvimento o Vite proxy redireciona /Api → localhost:3000/Api.
// Em produção, altere para a URL completa do seu servidor.
const BASE_URL = '/Api';

// 741 — Função auxiliar interna: faz fetch, verifica erros HTTP
// e retorna o JSON já parseado. Centraliza o tratamento de erros de rede.
async function request(path, options = {}) {
    const resposta = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });

    // 741 — Se o status HTTP não for 2xx, lança um erro com a mensagem da API.
    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({ erro: 'Erro desconhecido' }));
        throw new Error(erro.erro || erro.mensagem || `Erro HTTP ${resposta.status}`);
    }

    // 741 — Tenta parsear o JSON. Se a resposta for vazia (ex: 204 No Content), retorna null.
    return resposta.json().catch(() => null);
}

// ─────────────────────────────────────────────────────────────────
// 741 — FUNÇÕES EXPORTADAS — usadas pelos componentes React
// ─────────────────────────────────────────────────────────────────

// 741 — Retorna array com todas as obras do banco
export function getLivros() {
    return request('/livros');
}

// 741 — Retorna uma obra específica pelo IDO
export function getLivro(idO) {
    return request(`/livros/${idO}`);
}

// 741 — Cria uma nova obra completa.
// body deve seguir o formato do LivroExemplo.json (IDO, titulo, autoria, Edicoes...)
export function criarLivro(body) {
    return request('/livros', {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

// 741 — Atualiza campos de uma obra pelo IDO.
// body pode ser parcial (só os campos que mudaram).
export function atualizarLivro(idO, body) {
    return request(`/livros/${idO}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });
}

// 741 — Remove uma obra inteira do banco pelo IDO.
export function deletarLivro(idO) {
    return request(`/livros/${idO}`, { method: 'DELETE' });
}

// 741 — Adiciona uma nova edição a uma obra existente.
// body deve seguir o EdicaoSchema (ISBN, publicadora, anoPublicacao, etc.)
export function criarEdicao(idO, body) {
    return request(`/livros/${idO}/edicoes`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

// 741 — Remove uma edição de uma obra pelo ISBN.
export function deletarEdicao(idO, iSBN) {
    return request(`/livros/${idO}/edicoes/${iSBN}`, { method: 'DELETE' });
}

// 741 — Adiciona um exemplar físico a uma edição específica.
// body deve seguir o ExemplarSchema (IDEx, disponivel, localizacao).
export function criarExemplar(idO, iSBN, body) {
    return request(`/livros/${idO}/edicoes/${iSBN}/exemplares`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

// 741 — Remove um exemplar pelo IDEx dentro de uma edição.
export function deletarExemplar(idO, iSBN, idEx) {
    return request(`/livros/${idO}/edicoes/${iSBN}/exemplares/${idEx}`, {
        method: 'DELETE'
    });
}
