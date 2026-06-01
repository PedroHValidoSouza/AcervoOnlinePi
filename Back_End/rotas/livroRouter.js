const router = require("express").Router();

const livroController = require("../controladores/livroController");


router
    .route("/livros")
    .post((requisicao, resposta) => livroController.create(requisicao, resposta));

router
    .route("/livros")
    .get((requisicao, resposta) => livroController.get(requisicao, resposta));

router
    .route("/livrosUpd")
    .patch((requisicao, resposta) => livroController.update(requisicao, resposta));

router
    .route("/livrosDel")
    .delete((requisicao, resposta) => livroController.delete(requisicao, resposta));    

module.exports = router;