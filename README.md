# Libzary — Sistema de Acervo

Aplicação full-stack unificada combinando o **AcervoOnlinePi** (API Node/Express/MongoDB) com o **frontend React** do ArchitectUI, reescrita de forma simples, sem animações e totalmente integrada à API real.

---

## Estrutura do projeto

```
biblioteca-unificada/
├── backend/              ← API REST (Node.js + Express + MongoDB)
│   ├── app.js            ← Entrada do servidor
│   ├── .env              ← Variáveis de ambiente (MONGO_URI, PORT)
│   ├── bd/
│   │   └── coneccao.js   ← Conexão com o MongoDB via Mongoose
│   ├── modelos/
│   │   └── Livro/
│   │       ├── obraSchema.js     ← Schema principal da obra
│   │       ├── edicaoSchema.js   ← Sub-schema de edição
│   │       └── exemplarSchema.js ← Sub-schema de exemplar + empréstimo
│   ├── controladores/
│   │   └── livroController.js ← Lógica CRUD (Create/Read/Update/Delete)
│   └── rotas/
│       ├── router.js      ← Roteador principal (/Api/)
│       └── livroRouter.js ← Rotas específicas de livros
│
└── frontend/             ← Interface React (Vite)
    ├── vite.config.js    ← Proxy /Api → localhost:3000
    ├── src/
    │   ├── main.jsx      ← Ponto de entrada React
    │   ├── App.jsx       ← Rotas e controle de autenticação
    │   ├── index.css     ← Estilos globais (sem animações)
    │   ├── services/
    │   │   └── api.js    ← Todas as chamadas HTTP à API
    │   └── pages/
    │       ├── LoginPage.jsx    ← Tela de login
    │       ├── AdminLayout.jsx  ← Layout com sidebar
    │       ├── AdminHome.jsx    ← Dashboard com estatísticas reais
    │       ├── LivrosPage.jsx   ← Lista do acervo com CRUD
    │       ├── CadastrarPage.jsx ← Formulário de cadastro
    │       ├── EditarPage.jsx    ← Edição de obra
    │       └── BuscaPage.jsx    ← Busca com filtros
```

---

## Como rodar

### 1. Configurar o MongoDB

Edite `backend/.env` com sua string de conexão:

```env
MONGO_URI=mongodb://localhost:27017/biblioteca
PORT=3000
```

### 2. Iniciar o backend

```bash
cd backend
npm install
npm run dev
```

A API estará em: `http://localhost:3000/Api/`

### 3. Iniciar o frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará em: `http://localhost:5173`

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | /Api/livros | Lista todas as obras |
| POST   | /Api/livros | Cria obra completa |
| GET    | /Api/livros/:idO | Busca obra por IDO |
| PATCH  | /Api/livros/:idO | Atualiza obra |
| DELETE | /Api/livros/:idO | Remove obra |
| POST   | /Api/livros/:idO/edicoes | Adiciona edição |
| DELETE | /Api/livros/:idO/edicoes/:iSBN | Remove edição |
| POST   | /Api/livros/:idO/edicoes/:iSBN/exemplares | Adiciona exemplar |
| DELETE | /Api/livros/:idO/edicoes/:iSBN/exemplares/:idEx | Remove exemplar |

---

## Acesso admin

Login de demonstração: `admin` / `biblioteca123`

---

## Exemplo de corpo para POST /Api/livros

```json
{
  "IDO": 100001,
  "titulo": "Dom Casmurro",
  "subTitulo": "",
  "sumario": "Narrativa sobre memória e ciúme.",
  "autoria": [{ "nome": "Machado", "sobreNome": "de Assis" }],
  "ficcao": true,
  "categoria": "Romance",
  "Edicoes": [{
    "ISBN": 9788535910667,
    "publicadora": "Companhia das Letras",
    "anoPublicacao": "1899-01-01",
    "lingua": "Português-Brasil",
    "quantidadePaginas": 256,
    "Exemplares": [{
      "IDEx": 101,
      "disponivel": true,
      "localizacao": "Estante A-2"
    }]
  }]
}
```
