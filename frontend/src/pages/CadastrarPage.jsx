// 741 — CadastrarPage: formulário para criação de uma nova obra no acervo.
// Ao submeter, envia um POST /Api/livros com a estrutura completa do ObraSchema,
// incluindo ao menos uma edição e ao menos um exemplar, conforme a API exige.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarLivro } from '../services/api'

// 741 — Estado inicial do formulário mapeando os campos do ObraSchema.
// Os campos obrigatórios são IDO e titulo. Os demais são opcionais.
const FORM_INICIAL = {
    IDO: '',
    titulo: '',
    subTitulo: '',
    sumario: '',
    textoAuxiliar: '',
    ficcao: '',
    categoria: '',
    // autoria: array de { nome, sobreNome }
    autorNome: '',
    autorSobreNome: '',
    // Edicao única inicial
    ISBN: '',
    nomeEdicao: '',
    publicadora: '',
    anoPublicacao: '',
    lingua: 'Português-Brasil',
    quantidadePaginas: '',
    // Exemplar único inicial
    IDEx: '',
    disponivel: 'true',
    localizacao: ''
}

export default function CadastrarPage() {
    const [form, setForm]         = useState(FORM_INICIAL)
    const [erro, setErro]         = useState('')
    const [enviando, setEnviando] = useState(false)
    const navigate                = useNavigate()

    // 741 — Atualiza o campo correspondente no estado do formulário.
    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErro('')
        setEnviando(true)

        // 741 — Monta o objeto seguindo exatamente o formato do ObraSchema/LivroExemplo.json.
        // A API espera Edicoes como array de objetos com Exemplares embutidos.
        const corpo = {
            IDO:           Number(form.IDO),
            titulo:        form.titulo,
            subTitulo:     form.subTitulo,
            sumario:       form.sumario,
            textoAuxiliar: form.textoAuxiliar,
            ficcao:        form.ficcao === 'true' ? true : form.ficcao === 'false' ? false : undefined,
            categoria:     form.categoria,
            autoria: [{
                nome:      form.autorNome,
                sobreNome: form.autorSobreNome
            }],
            Edicoes: [{
                ISBN:              Number(form.ISBN),
                nomeEdicao:        form.nomeEdicao,
                publicadora:       form.publicadora,
                // 741 — anoPublicacao é enviado como string ISO (YYYY-MM-DD).
                // O Mongoose converte automaticamente para Date.
                anoPublicacao:     form.anoPublicacao || undefined,
                lingua:            form.lingua,
                quantidadePaginas: form.quantidadePaginas ? Number(form.quantidadePaginas) : undefined,
                Exemplares: [{
                    IDEx:        Number(form.IDEx),
                    disponivel:  form.disponivel === 'true',
                    localizacao: form.localizacao
                }]
            }]
        }

        try {
            await criarLivro(corpo)
            navigate('/admin/livros')
        } catch (e) {
            setErro(e.message)
            setEnviando(false)
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Cadastrar Nova Obra</h1>
            </div>

            {erro && <div className="msg-erro">{erro}</div>}

            <form onSubmit={handleSubmit}>

                {/* ── DADOS DA OBRA ────────────────────────────────── */}
                {/* 741 — Seção 1: campos que descrevem a obra abstrata (independente da edição) */}
                <div className="card">
                    <strong className="mb-8" style={{ display: 'block' }}>Dados da Obra</strong>
                    <div className="form-grid">
                        <div className="form-grupo">
                            <label htmlFor="IDO">IDO (ID da Obra) *</label>
                            <input id="IDO" name="IDO" type="number" min="100000"
                                value={form.IDO} onChange={handleChange} required
                                placeholder="Ex: 100001" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="titulo">Título *</label>
                            <input id="titulo" name="titulo" type="text"
                                value={form.titulo} onChange={handleChange} required
                                placeholder="Ex: Dom Casmurro" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="subTitulo">Subtítulo</label>
                            <input id="subTitulo" name="subTitulo" type="text"
                                value={form.subTitulo} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="categoria">Categoria</label>
                            <input id="categoria" name="categoria" type="text"
                                value={form.categoria} onChange={handleChange}
                                placeholder="Ex: Romance, Ficção Científica" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="ficcao">Tipo</label>
                            {/* 741 — ficcao é Boolean no Schema; convertemos a string do select no submit */}
                            <select id="ficcao" name="ficcao" value={form.ficcao} onChange={handleChange}>
                                <option value="">— Selecionar —</option>
                                <option value="true">Ficção</option>
                                <option value="false">Não-ficção</option>
                            </select>
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="autorNome">Nome do Autor</label>
                            <input id="autorNome" name="autorNome" type="text"
                                value={form.autorNome} onChange={handleChange}
                                placeholder="Ex: Machado" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="autorSobreNome">Sobrenome do Autor</label>
                            <input id="autorSobreNome" name="autorSobreNome" type="text"
                                value={form.autorSobreNome} onChange={handleChange}
                                placeholder="Ex: de Assis" />
                        </div>
                        <div className="form-grupo span-2">
                            <label htmlFor="sumario">Sumário / Sinopse</label>
                            <textarea id="sumario" name="sumario"
                                value={form.sumario} onChange={handleChange}
                                placeholder="Breve descrição do conteúdo..." />
                        </div>
                    </div>
                </div>

                {/* ── DADOS DA EDIÇÃO ──────────────────────────────── */}
                {/* 741 — Seção 2: campos do EdicaoSchema para a primeira edição da obra */}
                <div className="card">
                    <strong className="mb-8" style={{ display: 'block' }}>Primeira Edição</strong>
                    <div className="form-grid col-3">
                        <div className="form-grupo">
                            <label htmlFor="ISBN">ISBN (13 dígitos) *</label>
                            <input id="ISBN" name="ISBN" type="number"
                                value={form.ISBN} onChange={handleChange} required
                                placeholder="Ex: 9788535910667" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="publicadora">Publicadora</label>
                            <input id="publicadora" name="publicadora" type="text"
                                value={form.publicadora} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="nomeEdicao">Nome da Edição</label>
                            <input id="nomeEdicao" name="nomeEdicao" type="text"
                                value={form.nomeEdicao} onChange={handleChange}
                                placeholder="Ex: 2ª Edição Revisada" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="anoPublicacao">Ano de Publicação</label>
                            {/* 741 — Input date; enviamos como YYYY-MM-DD e o Mongoose converte para Date */}
                            <input id="anoPublicacao" name="anoPublicacao" type="date"
                                value={form.anoPublicacao} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="lingua">Língua</label>
                            <input id="lingua" name="lingua" type="text"
                                value={form.lingua} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="quantidadePaginas">Qtd. Páginas</label>
                            <input id="quantidadePaginas" name="quantidadePaginas" type="number"
                                value={form.quantidadePaginas} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* ── DADOS DO EXEMPLAR ─────────────────────────────── */}
                {/* 741 — Seção 3: campos do ExemplarSchema para o primeiro exemplar físico */}
                <div className="card">
                    <strong className="mb-8" style={{ display: 'block' }}>Primeiro Exemplar Físico</strong>
                    <div className="form-grid col-3">
                        <div className="form-grupo">
                            <label htmlFor="IDEx">IDEx (ID do Exemplar) *</label>
                            <input id="IDEx" name="IDEx" type="number"
                                value={form.IDEx} onChange={handleChange} required
                                placeholder="Ex: 101" />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="disponivel">Disponibilidade</label>
                            <select id="disponivel" name="disponivel" value={form.disponivel} onChange={handleChange}>
                                <option value="true">Disponível</option>
                                <option value="false">Indisponível</option>
                            </select>
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="localizacao">Localização</label>
                            <input id="localizacao" name="localizacao" type="text"
                                value={form.localizacao} onChange={handleChange}
                                placeholder="Ex: Estante B-3" />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secundario"
                        onClick={() => navigate('/admin/livros')}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primario" disabled={enviando}>
                        {enviando ? 'Salvando...' : 'Cadastrar Obra'}
                    </button>
                </div>
            </form>
        </div>
    )
}
