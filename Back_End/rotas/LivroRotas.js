const router = require("express").Router();

const LivroController = require("../controladores/LivroController");


router
    .route("/Livros")
    .post((requisicao, resposta) => LivroController.create(requisicao, resposta));

router
    .route("/Livros")
    .get((requisicao, resposta) => LivroController.getAll(requisicao, resposta));

module.exports = router;