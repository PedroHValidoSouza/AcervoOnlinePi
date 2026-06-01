import { useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'
import hero from './assets/hero.png'

const DEMO_USER = { username: 'admin', password: 'biblioteca123' }

const BOOKS = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    categories: ['Romance', 'Clássico Brasileiro'],
    year: 1899,
    publisher: 'Livraria Garnier',
    description: 'Narrativa sobre memória, ciúme e relações familiares.',
  },
  {
    id: '2',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    categories: ['Romance', 'Drama Social'],
    year: 1937,
    publisher: 'Companhia Editora Nacional',
    description: 'Grupo de jovens em situação de rua na cidade de Salvador.',
  },
  {
    id: '3',
    title: 'A Hora da Estrela',
    author: 'Clarice Lispector',
    categories: ['Ficção', 'Literatura Brasileira'],
    year: 1977,
    publisher: 'José Olympio',
    description: 'História de Macabéa e sua busca por pertencimento.',
  },
  {
    id: '4',
    title: 'O Hobbit',
    author: 'J. R. R. Tolkien',
    categories: ['Fantasia', 'Aventura'],
    year: 1937,
    publisher: 'Allen & Unwin',
    description: 'Jornada de Bilbo Bolseiro para recuperar um tesouro.',
  },
]

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      onLogin()
      navigate('/admin/home')
      return
    }
    setError('Usuário ou senha inválidos.')
  }

  return (
    <main className="page login-page">
      <section className="card login-card">
        <h1>Home</h1>
        <p>Entrar na área administrativa</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <span className="error-message">{error}</span>}
          <button type="submit">Entrar</button>
        </form>
        <small>Demo: admin / biblioteca123</small>
      </section>
    </main>
  )
}

function AdminLayout({ onLogout }) {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
          <NavLink to="/admin/home">Home</NavLink>
          <NavLink to="/admin/cadastrar">Cadastrar</NavLink>
          <NavLink to="/admin/emprestar">Emprestar</NavLink>
          <NavLink to="/admin/apagar">Apagar</NavLink>
          <NavLink to="/admin/alterar">Alterar</NavLink>
          <Link to="/busca">Busca</Link>
        </nav>
        <button type="button" onClick={onLogout} className="ghost-button">
          Sair
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

function AdminHome() {
  return (
    <section className="card profile-card">
      <img src={hero} alt="Bibliotecária" className="profile-image" />
      <div>
        <h1>Maria Helena</h1>
        <p>Administradora da Biblioteca</p>
      </div>
    </section>
  )
}

function AdminSection({ title }) {
  return (
    <section className="card">
      <h1>{title}</h1>
      <p>Conteúdo reservado para implementação.</p>
    </section>
  )
}

function SearchPage() {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const normalizedAuthor = author.trim().toLowerCase()
    const normalizedCategory = category.trim().toLowerCase()

    return BOOKS.filter((book) => {
      const matchQuery =
        !normalizedQuery ||
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery)
      const matchAuthor =
        !normalizedAuthor || book.author.toLowerCase().includes(normalizedAuthor)
      const matchCategory =
        !normalizedCategory ||
        book.categories.some((item) =>
          item.toLowerCase().includes(normalizedCategory),
        )
      return matchQuery && matchAuthor && matchCategory
    })
  }, [author, category, query])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearched(true)
  }

  return (
    <main className="page search-page">
      <header className="search-header">
        <h1>Busca de livros</h1>
        <Link to="/admin/home">Voltar ao admin</Link>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-row">
          <input
            type="text"
            value={query}
            placeholder="Pesquisar por título ou autor"
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            className="ghost-button"
            onClick={() => setShowFilters((current) => !current)}
          >
            Filtros
          </button>
          <button type="submit">Pesquisar</button>
        </div>
        {showFilters && (
          <div className="filters-row">
            <input
              type="text"
              value={author}
              placeholder="Filtrar por autor"
              onChange={(event) => setAuthor(event.target.value)}
            />
            <input
              type="text"
              value={category}
              placeholder="Filtrar por categoria"
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>
        )}
      </form>

      {searched && results.length === 0 && (
        <p className="empty-state">não encontrado</p>
      )}

      {searched && results.length > 0 && (
        <section className="cards-grid">
          {results.map((book) => (
            <article
              key={book.id}
              className="book-card"
              onClick={() => navigate(`/livro/${book.id}`)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') navigate(`/livro/${book.id}`)
              }}
              role="button"
              tabIndex={0}
            >
              <span className="category-badge">{book.categories[0]}</span>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

function BookDetailsPage() {
  const { bookId } = useParams()
  const book = BOOKS.find((item) => item.id === bookId)

  if (!book) {
    return (
      <main className="page">
        <section className="card">
          <h1>Livro não encontrado</h1>
          <Link to="/busca">Voltar para busca</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="card book-details">
        <h1>{book.title}</h1>
        <p>
          <strong>Autor:</strong> {book.author}
        </p>
        <p>
          <strong>Categorias:</strong> {book.categories.join(', ')}
        </p>
        <p>
          <strong>Ano:</strong> {book.year}
        </p>
        <p>
          <strong>Editora:</strong> {book.publisher}
        </p>
        <p>
          <strong>Resumo:</strong> {book.description}
        </p>
        <Link to="/busca">Voltar para busca</Link>
      </section>
    </main>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              replace
              to={isAuthenticated ? '/admin/home' : '/admin/login'}
            />
          }
        />
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? (
              <Navigate replace to="/admin/home" />
            ) : (
              <LoginPage onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate replace to="/admin/login" />
            )
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="cadastrar" element={<AdminSection title="Cadastrar" />} />
          <Route path="emprestar" element={<AdminSection title="Emprestar" />} />
          <Route path="apagar" element={<AdminSection title="Apagar" />} />
          <Route path="alterar" element={<AdminSection title="Alterar" />} />
          <Route index element={<Navigate replace to="home" />} />
        </Route>
        <Route path="/busca" element={<SearchPage />} />
        <Route path="/livro/:bookId" element={<BookDetailsPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App