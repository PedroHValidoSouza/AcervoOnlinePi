// 741 — router.js é o agregador de rotas da aplicação.
// Centraliza todos os sub-roteadores em um único ponto,
// tornando fácil adicionar novos módulos (ex: usuarioRouter) no futuro.

const router = require("express").Router();
const livroRouter = require("./livroRouter");

// 741 — Monta o livroRouter na raiz do prefixo /Api/
// Todas as rotas definidas em livroRouter.js serão acessíveis em /Api/livros/...
router.use("/", livroRouter);

module.exports = router;
