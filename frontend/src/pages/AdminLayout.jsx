// 741 — AdminLayout: estrutura de layout para todas as páginas autenticadas.
// Renderiza a sidebar de navegação à esquerda e o conteúdo da rota atual
// através do componente <Outlet /> do React Router.

import { NavLink, Outlet, Link } from 'react-router-dom'

export default function AdminLayout({ aoSair }) {
    return (
        <div className="layout">
            {/* 741 — Sidebar fixa com links de navegação. NavLink adiciona automaticamente
                a classe "active" na rota atual, que o CSS usa para destacar o item. */}
            <aside className="sidebar">
                <div className="sidebar-logo">📚 Libzary</div>

                <nav>
                    <NavLink to="/admin/home">Dashboard</NavLink>
                    <NavLink to="/admin/livros">Acervo de Livros</NavLink>
                    <NavLink to="/admin/cadastrar">Cadastrar Livro</NavLink>
                    <NavLink to="/admin/busca">Buscar Livros</NavLink>
                </nav>

                <div className="sidebar-footer">
                    {/* 741 — Botão de logout chama a função aoSair passada pelo App.jsx,
                        que limpa o estado de autenticação e redireciona ao login. */}
                    <button className="btn btn-secundario" onClick={aoSair} style={{ width: '100%' }}>
                        Sair
                    </button>
                </div>
            </aside>

            {/* 741 — <Outlet /> é o espaço onde o React Router renderiza
                o componente filho da rota atual (ex: LivrosPage, CadastrarPage). */}
            <main className="conteudo-principal">
                <Outlet />
            </main>
        </div>
    )
}
