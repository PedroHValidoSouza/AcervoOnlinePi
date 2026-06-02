
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLivros } from '../services/api'

export default function AdminHome() {
    const [livros, setLivros]     = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro]         = useState('')

    useEffect(() => {
        getLivros()
            .then(dados => {
                setLivros(dados || [])
                setCarregando(false)
            })
            .catch(e => {
                setErro('Não foi possível conectar à API. Verifique se o backend está rodando.')
                setCarregando(false)
            })
    }, [])

    const totalObras = livros.length
    const totalEdicoes = livros.reduce((acc, l) => acc + (l.Edicoes?.length || 0), 0)
    const totalExemplares = livros.reduce((acc, l) =>
        acc + (l.Edicoes?.reduce((a, e) => a + (e.Exemplares?.length || 0), 0) || 0), 0
    )
    const totalDisponiveis = livros.reduce((acc, l) =>
        acc + (l.Edicoes?.reduce((a, e) =>
            a + (e.Exemplares?.filter(ex => ex.disponivel).length || 0), 0) || 0), 0
    )

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard</h1>
            </div>

            {erro && <div className="msg-erro">{erro}</div>}

            {carregando ? (
                <p className="texto-leve">Carregando dados...</p>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                        <StatCard titulo="Total de Obras" valor={totalObras} />
                        <StatCard titulo="Edições" valor={totalEdicoes} />
                        <StatCard titulo="Exemplares" valor={totalExemplares} />
                        <StatCard titulo="Disponíveis" valor={totalDisponiveis} cor="verde" />
                    </div>

                    <div className="card">
                        <div className="flex-gap mb-16" style={{ justifyContent: 'space-between' }}>
                            <strong>Obras recentes</strong>
                            <Link to="/admin/livros" className="btn-link">Ver todas</Link>
                        </div>
                        {livros.length === 0 ? (
                            <p className="estado-vazio">Nenhuma obra cadastrada ainda.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>IDO</th>
                                        <th>Título</th>
                                        <th>Autoria</th>
                                        <th>Categoria</th>
                                        <th>Edições</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {livros.slice(-5).reverse().map(livro => (
                                        <tr key={livro._id}>
                                            <td className="texto-leve">{livro.IDO}</td>
                                            <td className="negrito">{livro.titulo}</td>
                                            <td>
                                                {livro.autoria?.map(a => `${a.nome} ${a.sobreNome}`).join(', ') || '—'}
                                            </td>
                                            <td>{livro.categoria || '—'}</td>
                                            <td>
                                                <span className="badge badge-azul">{livro.Edicoes?.length || 0}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

function StatCard({ titulo, valor, cor }) {
    const corBadge = cor === 'verde' ? '#dcfce7' : '#dbeafe'
    const corTexto = cor === 'verde' ? '#15803d' : '#1d4ed8'
    return (
        <div className="card" style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', marginBottom: 6 }}>
                {titulo}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: corTexto }}>
                {valor}
            </div>
        </div>
    )
}
