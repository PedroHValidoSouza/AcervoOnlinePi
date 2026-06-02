// 741 — livroRouter define todas as rotas HTTP relacionadas a livros.
// Cada rota mapeia um verbo HTTP + caminho para uma função do livroController.
// Prefixo das rotas (definido no router.js): /Api/
// Portanto: GET /Api/livros, POST /Api/livros, etc.

const router = require("express").Router();
const livroController = require("../controladores/livroController");

// 741 — Rotas principais da obra (nível raiz do livro)
// GET  /Api/livros        → lista todos os livros
// POST /Api/livros        → cria um livro novo (body completo com Edicoes e Exemplares)
router.route("/livros")
    .get((req, res)  => livroController.get(req, res))
    .post((req, res) => livroController.create(req, res));

// 741 — Rota para obra específica por IDO
// GET   /Api/livros/:idO  → retorna os dados de uma obra
// PATCH /Api/livros/:idO  → atualiza campos da obra
// DELETE /Api/livros/:idO → remove a obra inteira
router.route("/livros/:idO")
    .get((req, res)    => livroController.getById(req, res))
    .patch((req, res)  => livroController.update(req, res))
    .delete((req, res) => livroController.delete(req, res));

// 741 — Rota para adicionar edição a uma obra existente
// POST /Api/livros/:idO/edicoes → adiciona nova edição ao array Edicoes
router.route("/livros/:idO/edicoes")
    .post((req, res) => livroController.createEdicao(req, res));

// 741 — Rota para remover uma edição específica pelo ISBN
// DELETE /Api/livros/:idO/edicoes/:iSBN
router.route("/livros/:idO/edicoes/:iSBN")
    .delete((req, res) => livroController.deleteEdicao(req, res));

// 741 — Rota para adicionar exemplar físico a uma edição
// POST /Api/livros/:idO/edicoes/:iSBN/exemplares
router.route("/livros/:idO/edicoes/:iSBN/exemplares")
    .post((req, res) => livroController.createExemplar(req, res));

// 741 — Rota para remover exemplar específico pelo IDEx
// DELETE /Api/livros/:idO/edicoes/:iSBN/exemplares/:idEx
router.route("/livros/:idO/edicoes/:iSBN/exemplares/:idEx")
    .delete((req, res) => livroController.deleteExemplar(req, res));

module.exports = router;
