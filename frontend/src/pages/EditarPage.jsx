
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLivro, atualizarLivro } from '../services/api'

export default function EditarPage() {
    const { idO }                 = useParams() 
    const navigate                = useNavigate()
    const [form, setForm]         = useState(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro]         = useState('')
    const [enviando, setEnviando] = useState(false)

    useEffect(() => {
        getLivro(idO)
            .then(livro => {
                if (!livro) { setErro('Obra não encontrada'); setCarregando(false); return }
                setForm({
                    titulo:        livro.titulo || '',
                    subTitulo:     livro.subTitulo || '',
                    sumario:       livro.sumario || '',
                    textoAuxiliar: livro.textoAuxiliar || '',
                    categoria:     livro.categoria || '',
                    ficcao:        livro.ficcao === true ? 'true' : livro.ficcao === false ? 'false' : '',
                    autorNome:     livro.autoria?.[0]?.nome || '',
                    autorSobreNome: livro.autoria?.[0]?.sobreNome || ''
                })
                setCarregando(false)
            })
            .catch(e => { setErro(e.message); setCarregando(false) })
    }, [idO])

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErro('')
        setEnviando(true)


        const corpo = {
            titulo:        form.titulo,
            subTitulo:     form.subTitulo,
            sumario:       form.sumario,
            textoAuxiliar: form.textoAuxiliar,
            categoria:     form.categoria,
            ficcao:        form.ficcao === 'true' ? true : form.ficcao === 'false' ? false : undefined,
            autoria: [{ nome: form.autorNome, sobreNome: form.autorSobreNome }]
        }

        try {
            await atualizarLivro(idO, corpo)
            navigate('/admin/livros')
        } catch (e) {
            setErro(e.message)
            setEnviando(false)
        }
    }

    if (carregando) return <p className="texto-leve" style={{ padding: 28 }}>Carregando...</p>
    if (!form)      return <div className="msg-erro" style={{ margin: 28 }}>{erro}</div>

    return (
        <div>
            <div className="page-header">
                <h1>Editar Obra — IDO {idO}</h1>
            </div>

            {erro && <div className="msg-erro">{erro}</div>}

            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="form-grid">
                        <div className="form-grupo">
                            <label htmlFor="titulo">Título *</label>
                            <input id="titulo" name="titulo" type="text"
                                value={form.titulo} onChange={handleChange} required />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="subTitulo">Subtítulo</label>
                            <input id="subTitulo" name="subTitulo" type="text"
                                value={form.subTitulo} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="categoria">Categoria</label>
                            <input id="categoria" name="categoria" type="text"
                                value={form.categoria} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="ficcao">Tipo</label>
                            <select id="ficcao" name="ficcao" value={form.ficcao} onChange={handleChange}>
                                <option value="">— Selecionar —</option>
                                <option value="true">Ficção</option>
                                <option value="false">Não-ficção</option>
                            </select>
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="autorNome">Nome do Autor</label>
                            <input id="autorNome" name="autorNome" type="text"
                                value={form.autorNome} onChange={handleChange} />
                        </div>
                        <div className="form-grupo">
                            <label htmlFor="autorSobreNome">Sobrenome do Autor</label>
                            <input id="autorSobreNome" name="autorSobreNome" type="text"
                                value={form.autorSobreNome} onChange={handleChange} />
                        </div>
                        <div className="form-grupo span-2">
                            <label htmlFor="sumario">Sumário / Sinopse</label>
                            <textarea id="sumario" name="sumario"
                                value={form.sumario} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ background: '#fffbeb', borderColor: '#fcd34d' }}>
                    <p style={{ fontSize: 13, color: '#92400e' }}>
                        ℹ️ Para adicionar ou remover edições e exemplares, acesse a página
                        <strong> Acervo de Livros</strong> e expanda a obra desejada.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secundario"
                        onClick={() => navigate('/admin/livros')}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primario" disabled={enviando}>
                        {enviando ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    )
}
