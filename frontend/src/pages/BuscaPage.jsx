
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLivros } from '../services/api'

export default function BuscaPage() {
    const [livros, setLivros]         = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro]             = useState('')
    const [busca, setBusca]           = useState('')
    const [filtroCategoria, setFiltroCategoria] = useState('')
    const [filtroFiccao, setFiltroFiccao]       = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getLivros()
            .then(dados => { setLivros(dados || []); setCarregando(false) })
            .catch(e    => { setErro(e.message); setCarregando(false) })
    }, [])

    const resultado = useMemo(() => {
        const q     = busca.trim().toLowerCase()
        const cat   = filtroCategoria.trim().toLowerCase()
        const ficcao = filtroFiccao

        return livros.filter(livro => {
            const matchTexto = !q ||
                livro.titulo?.toLowerCase().includes(q) ||
                livro.autoria?.some(a =>
                    `${a.nome} ${a.sobreNome}`.toLowerCase().includes(q)
                )
            const matchCategoria = !cat ||
                livro.categoria?.toLowerCase().includes(cat)
            const matchFiccao = ficcao === '' ||
                (ficcao === 'true' && livro.ficcao === true) ||
                (ficcao === 'false' && livro.ficcao === false)

            return matchTexto && matchCategoria && matchFiccao
        })
    }, [livros, busca, filtroCategoria, filtroFiccao])

    return (
        <div>
            <div className="page-header">
                <h1>Buscar Livros</h1>
            </div>

            {erro && <div className="msg-erro">{erro}</div>}

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                    <div className="form-grupo">
                        <label>Título ou Autor</label>
                        <input
                            type="text"
                            placeholder="Ex: Dom Casmurro, Machado..."
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                        />
                    </div>
                    <div className="form-grupo">
                        <label>Categoria</label>
                        <input
                            type="text"
                            placeholder="Ex: Romance"
                            value={filtroCategoria}
                            onChange={e => setFiltroCategoria(e.target.value)}
                        />
                    </div>
                    <div className="form-grupo">
                        <label>Tipo</label>
                        <select value={filtroFiccao} onChange={e => setFiltroFiccao(e.target.value)}>
                            <option value="">Todos</option>
                            <option value="true">Ficção</option>
                            <option value="false">Não-ficção</option>
                        </select>
                    </div>
                </div>
                <p className="texto-leve" style={{ marginTop: 10, fontSize: 12 }}>
                    {carregando ? 'Carregando...' : `${resultado.length} resultado(s) encontrado(s)`}
                </p>
            </div>

            {!carregando && resultado.length === 0 && (
                <p className="estado-vazio">Nenhuma obra encontrada com os filtros aplicados.</p>
            )}

            {resultado.length > 0 && (
                <div className="card">
                    <div className="tabela-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>IDO</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Categoria</th>
                                    <th>Tipo</th>
                                    <th>Edições</th>
                                    <th>Disponíveis</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map(livro => {
                                    const disponiveis = livro.Edicoes?.reduce((acc, e) =>
                                        acc + (e.Exemplares?.filter(ex => ex.disponivel).length || 0), 0) || 0

                                    return (
                                        <tr key={livro._id}>
                                            <td className="texto-leve">{livro.IDO}</td>
                                            <td className="negrito">{livro.titulo}</td>
                                            <td>
                                                {livro.autoria?.map(a => `${a.nome} ${a.sobreNome}`).join(', ') || '—'}
                                            </td>
                                            <td>{livro.categoria || '—'}</td>
                                            <td>
                                                {livro.ficcao === true
                                                    ? <span className="badge badge-azul">Ficção</span>
                                                    : livro.ficcao === false
                                                    ? <span className="badge badge-cinza">Não-ficção</span>
                                                    : '—'}
                                            </td>
                                            <td>{livro.Edicoes?.length || 0}</td>
                                            <td>
                                                {disponiveis > 0
                                                    ? <span className="badge badge-verde">{disponiveis} disponível</span>
                                                    : <span className="badge badge-vermelho">Indisponível</span>}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-secundario btn-pequeno"
                                                    onClick={() => navigate(`/admin/livros`)}
                                                >
                                                    Ver no acervo
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
