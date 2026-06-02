import { NavLink, Outlet, Link } from 'react-router-dom'

export default function AdminLayout({ aoSair }) {
    return (
        <div className="layout">

            <aside className="sidebar">
                <div className="sidebar-logo">📚 Libzary</div>

                <nav>
                    <NavLink to="/admin/home">Dashboard</NavLink>
                    <NavLink to="/admin/livros">Acervo de Livros</NavLink>
                    <NavLink to="/admin/cadastrar">Cadastrar Livro</NavLink>
                    <NavLink to="/admin/busca">Buscar Livros</NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn btn-secundario" onClick={aoSair} style={{ width: '100%' }}>
                        Sair
                    </button>
                </div>
            </aside>

            <main className="conteudo-principal">
                <Outlet />
            </main>
        </div>
    )
}
