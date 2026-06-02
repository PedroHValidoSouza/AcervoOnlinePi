// 741 — LoginPage: página de autenticação simples.
// Credenciais fixas (admin/biblioteca123) para fins de demonstração.
// Em produção, substitua por uma chamada real à API de usuários (FuncionarioSchema).

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 741 — Credenciais de demonstração hardcoded.
// Para integrar com o banco, crie uma rota POST /Api/login no backend
// que valide CPF/senha contra o FuncionarioSchema.
const CREDENCIAIS_DEMO = { usuario: 'admin', senha: 'biblioteca123' }

export default function LoginPage({ aoLogar }) {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha]     = useState('')
    const [erro, setErro]       = useState('')
    const navigate              = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        // 741 — Verifica credenciais localmente. Substitua por fetch à API se necessário.
        if (usuario === CREDENCIAIS_DEMO.usuario && senha === CREDENCIAIS_DEMO.senha) {
            aoLogar()
            navigate('/admin/home')
        } else {
            setErro('Usuário ou senha inválidos.')
        }
    }

    return (
        <div className="pagina-login">
            <div className="card login-card">
                <h1>Libzary</h1>
                <p>Acesso à área administrativa</p>

                {/* 741 — Exibe mensagem de erro apenas se houver tentativa falha */}
                {erro && <div className="msg-erro">{erro}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grupo">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            id="usuario"
                            type="text"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-grupo">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primario">Entrar</button>
                </form>

                {/* 741 — Dica visível no ambiente de desenvolvimento */}
                <p className="texto-leve" style={{ marginTop: 12, fontSize: 11 }}>
                    Demo: admin / biblioteca123
                </p>
            </div>
        </div>
    )
}
