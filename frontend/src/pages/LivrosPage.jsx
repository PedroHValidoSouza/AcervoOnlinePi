// 741 — LivrosPage: exibe a lista completa de obras do acervo.
// Os dados são carregados diretamente da API MongoDB via getLivros().
// Permite expandir cada obra para ver suas edições e exemplares,
// além de deletar obras diretamente desta tela.

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLivros, deletarLivro, deletarEdicao, deletarExemplar } from '../services/api'

export default function LivrosPage() {
    const [livros, setLivros]         = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro]             = useState('')
    const [mensagem, setMensagem]     = useState('')
    // 741 — expandido: controla qual obra está com suas edições visíveis na tabela
    const [expandido, setExpandido]   = useState(null)

    // 741 — Carrega todos os livros ao montar o componente.
    function carregarLivros() {
        setCarregando(true)
        getLivros()
            .then(dados => { setLivros(dados || []); setCarregando(false) })
            .catch(e    => { setErro(e.message); setCarregando(false) })
    }

    useEffect(() => { carregarLivros() }, [])

    // 741 — Confirma e deleta uma obra pelo IDO. Após remover, recarrega a lista.
    async function handleDeletar(idO, titulo) {
        if (!confirm(`Remover a obra "${titulo}" (IDO: ${idO}) do acervo?\nEssa ação é irreversível.`)) return
        try {
            await deletarLivro(idO)
            setMensagem(`Obra "${titulo}" removida com sucesso.`)
            carregarLivros()
        } catch (e) {
            setErro(e.message)
        }
    }

    // 741 — Deleta uma edição específica pelo ISBN dentro de uma obra.
    async function handleDeletarEdicao(idO, iSBN) {
        if (!confirm(`Remover a edição ISBN ${iSBN}?`)) return
        try {
            await deletarEdicao(idO, iSBN)
            setMensagem('Edição removida.')
            carregarLivros()
        } catch (e) {
            setErro(e.message)
        }
    }

    // 741 — Deleta um exemplar físico específico dentro de uma edição.
    async function handleDeletarExemplar(idO, iSBN, idEx) {
        if (!confirm(`Remover exemplar IDEx ${idEx}?`)) return
        try {
            await deletarExemplar(idO, iSBN, idEx)
            setMensagem('Exemplar removido.')
            carregarLivros()
        } catch (e) {
            setErro(e.message)
        }
    }

    return (
        <div>
            <div className="page-header">
                <h1>Acervo de Livros</h1>
                <Link to="/admin/cadastrar" className="btn btn-primario">+ Cadastrar obra</Link>
            </div>

            {erro     && <div className="msg-erro">{erro}</div>}
            {mensagem && <div className="msg-sucesso">{mensagem}</div>}

            {carregando ? (
                <p className="texto-leve">Carregando acervo...</p>
            ) : livros.length === 0 ? (
                <div className="card estado-vazio">
                    Nenhuma obra cadastrada. <Link to="/admin/cadastrar">Cadastre a primeira.</Link>
                </div>
            ) : (
                <div className="card">
                    <div className="tabela-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>IDO</th>
                                    <th>Título</th>
                                    <th>Autoria</th>
                                    <th>Categoria</th>
                                    <th>Ficção</th>
                                    <th>Edições</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {livros.map(livro => (
                                    <>
                                        {/* 741 — Linha principal da obra */}
                                        <tr key={livro._id}>
                                            <td className="texto-leve">{livro.IDO}</td>
                                            <td className="negrito">{livro.titulo}
                                                {livro.subTitulo && <span className="texto-leve"> — {livro.subTitulo}</span>}
                                            </td>
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
                                            <td>
                                                {/* 741 — Botão expande/colapsa as edições na tabela */}
                                                <button
                                                    className="btn btn-secundario btn-pequeno"
                                                    onClick={() => setExpandido(expandido === livro.IDO ? null : livro.IDO)}
                                                >
                                                    {livro.Edicoes?.length || 0} edição(ões)
                                                    {expandido === livro.IDO ? ' ▲' : ' ▼'}
                                                </button>
                                            </td>
                                            <td>
                                                <div className="acoes-linha">
                                                    <Link
                                                        to={`/admin/editar/${livro.IDO}`}
                                                        className="btn btn-secundario btn-pequeno"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        className="btn btn-perigo btn-pequeno"
                                                        onClick={() => handleDeletar(livro.IDO, livro.titulo)}
                                                    >
                                                        Remover
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* 741 — Linhas de edições: mostradas apenas quando a obra está expandida */}
                                        {expandido === livro.IDO && livro.Edicoes?.map(edicao => (
                                            <>
                                                <tr key={edicao.ISBN} style={{ background: '#f8fafc' }}>
                                                    <td></td>
                                                    <td colSpan={2} style={{ paddingLeft: 28 }}>
                                                        <span className="badge badge-cinza" style={{ marginRight: 6 }}>Edição</span>
                                                        {edicao.nomeEdicao || `ISBN ${edicao.ISBN}`}
                                                        <span className="texto-leve"> — {edicao.publicadora}</span>
                                                    </td>
                                                    <td>
                                                        <span className="texto-leve">
                                                            {edicao.anoPublicacao
                                                                ? new Date(edicao.anoPublicacao).getFullYear()
                                                                : '—'}
                                                        </span>
                                                    </td>
                                                    <td>{edicao.lingua}</td>
                                                    <td>
                                                        <span className="badge badge-azul">{edicao.Exemplares?.length || 0} ex.</span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-perigo btn-pequeno"
                                                            onClick={() => handleDeletarEdicao(livro.IDO, edicao.ISBN)}
                                                        >
                                                            Remover edição
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* 741 — Linhas de exemplares dentro da edição expandida */}
                                                {edicao.Exemplares?.map(ex => (
                                                    <tr key={ex.IDEx} style={{ background: '#f1f5f9' }}>
                                                        <td></td>
                                                        <td colSpan={2} style={{ paddingLeft: 52 }}>
                                                            <span className="badge badge-cinza" style={{ marginRight: 6 }}>Exemplar</span>
                                                            IDEx {ex.IDEx}
                                                            {ex.localizacao && <span className="texto-leve"> — {ex.localizacao}</span>}
                                                        </td>
                                                        <td colSpan={2}>
                                                            {ex.disponivel
                                                                ? <span className="badge badge-verde">Disponível</span>
                                                                : <span className="badge badge-vermelho">Indisponível</span>}
                                                        </td>
                                                        <td></td>
                                                        <td>
                                                            <button
                                                                className="btn btn-perigo btn-pequeno"
                                                                onClick={() => handleDeletarExemplar(livro.IDO, edicao.ISBN, ex.IDEx)}
                                                            >
                                                                Remover
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
