const router = require("express").Router();

const LivroController = require("../controladores/livroController");


router
    .route("/livros")
    .post((requisicao, resposta) => LivroController.create(requisicao, resposta));

router
    .route("/livros")
    .get((requisicao, resposta) => LivroController.get(requisicao, resposta));

router
    .route("/livros_params")
    .get((requisicao, resposta) => LivroController.getParams(requisicao, resposta));    

module.exports = router;