// 741 — app.js é o ponto de entrada do backend.
// Aqui o Express é configurado, os middlewares são registrados,
// as rotas são montadas e o servidor é iniciado.

// 741 — dotenv carrega as variáveis do arquivo .env para process.env,
// permitindo que MONGO_URI e PORT sejam lidas sem estar escritas no código.
require("dotenv").config();

const express = require("express");

// 741 — cors (Cross-Origin Resource Sharing) permite que o frontend React
// (rodando em localhost:5173) faça requisições para a API (localhost:3000)
// sem que o navegador bloqueie por política de segurança de mesma origem.
const cors = require("cors");

const app = express();

// 741 — Registra o middleware CORS antes de qualquer rota.
// Em produção, substitua cors() por cors({ origin: "https://seu-dominio.com" })
app.use(cors());

// 741 — express.json() é um middleware que transforma automaticamente
// o body das requisições com Content-Type: application/json em req.body (objeto JS).
app.use(express.json());

// 741 — Importa e executa a função de conexão com o MongoDB.
// A conexão é estabelecida uma vez na inicialização do servidor.
const conectar = require("./bd/coneccao");
conectar();

// 741 — Importa o roteador principal e o monta no prefixo /Api/
// Todas as rotas da API começarão com /Api/ (ex: GET /Api/livros)
const router = require("./rotas/router");
app.use("/Api/", router);

// 741 — Lê a porta do .env ou usa 3000 como fallback.
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log(`🚀 API-Biblioteca rodando em http://localhost:${PORTA}/Api/`);
    console.log(`   Rotas disponíveis:`);
    console.log(`   GET    /Api/livros`);
    console.log(`   POST   /Api/livros`);
    console.log(`   GET    /Api/livros/:idO`);
    console.log(`   PATCH  /Api/livros/:idO`);
    console.log(`   DELETE /Api/livros/:idO`);
    console.log(`   POST   /Api/livros/:idO/edicoes`);
    console.log(`   DELETE /Api/livros/:idO/edicoes/:iSBN`);
    console.log(`   POST   /Api/livros/:idO/edicoes/:iSBN/exemplares`);
    console.log(`   DELETE /Api/livros/:idO/edicoes/:iSBN/exemplares/:idEx`);
});
