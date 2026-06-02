
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage    from './pages/LoginPage.jsx'
import AdminLayout  from './pages/AdminLayout.jsx'
import AdminHome    from './pages/AdminHome.jsx'
import LivrosPage   from './pages/LivrosPage.jsx'
import CadastrarPage from './pages/CadastrarPage.jsx'
import EditarPage   from './pages/EditarPage.jsx'
import BuscaPage    from './pages/BuscaPage.jsx'

export default function App() {

    const [isAutenticado, setIsAutenticado] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to={isAutenticado ? '/admin/home' : '/admin/login'} />}
                />

                <Route
                    path="/admin/login"
                    element={
                        isAutenticado
                            ? <Navigate replace to="/admin/home" />
                            : <LoginPage aoLogar={() => setIsAutenticado(true)} />
                    }
                />

                <Route
                    path="/admin"
                    element={
                        isAutenticado
                            ? <AdminLayout aoSair={() => setIsAutenticado(false)} />
                            : <Navigate replace to="/admin/login" />
                    }
                >
                    <Route index        element={<Navigate replace to="home" />} />
                    <Route path="home"       element={<AdminHome />} />
                    <Route path="livros"     element={<LivrosPage />} />
                    <Route path="cadastrar"  element={<CadastrarPage />} />
                    <Route path="editar/:idO" element={<EditarPage />} />
                    <Route path="busca"      element={<BuscaPage />} />
                </Route>

                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}
