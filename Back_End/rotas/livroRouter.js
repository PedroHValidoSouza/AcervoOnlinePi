const router = require("express").Router();

const livroController = require("../controladores/livroController");


router
    .route("/livros")
    .post((requisicao, resposta) => livroController.create(requisicao, resposta));

router
    .route("/livros")
    .get((requisicao, resposta) => livroController.get(requisicao, resposta));

router
    .route("/livros_params")
    .get((requisicao, resposta) => livroController.getParams(requisicao, resposta));    

module.exports = router;