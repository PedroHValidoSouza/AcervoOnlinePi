// 741 — App.jsx: componente raiz da aplicação.
// Define as rotas principais com React Router e controla o estado de autenticação.
// A estrutura de rotas separa claramente as páginas públicas (login) das protegidas (admin).

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// 741 — Importa todas as páginas da aplicação
import LoginPage    from './pages/LoginPage.jsx'
import AdminLayout  from './pages/AdminLayout.jsx'
import AdminHome    from './pages/AdminHome.jsx'
import LivrosPage   from './pages/LivrosPage.jsx'
import CadastrarPage from './pages/CadastrarPage.jsx'
import EditarPage   from './pages/EditarPage.jsx'
import BuscaPage    from './pages/BuscaPage.jsx'

export default function App() {
    // 741 — isAutenticado: estado simples de sessão em memória.
    // Em produção, persista o token JWT no localStorage e valide no backend.
    const [isAutenticado, setIsAutenticado] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                {/* 741 — Rota raiz: redireciona para home se logado, ou para login */}
                <Route
                    path="/"
                    element={<Navigate replace to={isAutenticado ? '/admin/home' : '/admin/login'} />}
                />

                {/* 741 — Rota de login: se já autenticado, vai direto para home */}
                <Route
                    path="/admin/login"
                    element={
                        isAutenticado
                            ? <Navigate replace to="/admin/home" />
                            : <LoginPage aoLogar={() => setIsAutenticado(true)} />
                    }
                />

                {/* 741 — Rotas protegidas: envoltas no AdminLayout (sidebar + conteúdo).
                    Se não autenticado, redireciona para login. */}
                <Route
                    path="/admin"
                    element={
                        isAutenticado
                            ? <AdminLayout aoSair={() => setIsAutenticado(false)} />
                            : <Navigate replace to="/admin/login" />
                    }
                >
                    {/* 741 — Rotas filhas do AdminLayout. O <Outlet /> no layout as renderiza. */}
                    <Route index        element={<Navigate replace to="home" />} />
                    <Route path="home"       element={<AdminHome />} />
                    <Route path="livros"     element={<LivrosPage />} />
                    <Route path="cadastrar"  element={<CadastrarPage />} />
                    <Route path="editar/:idO" element={<EditarPage />} />
                    <Route path="busca"      element={<BuscaPage />} />
                </Route>

                {/* 741 — Rota curinga: qualquer URL desconhecida vai para raiz */}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}
