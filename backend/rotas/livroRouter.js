

const router = require("express").Router();
const livroController = require("../controladores/livroController");


router.route("/livros")
    .get((req, res)  => livroController.get(req, res))
    .post((req, res) => livroController.create(req, res));


router.route("/livros/:idO")
    .get((req, res)    => livroController.getById(req, res))
    .patch((req, res)  => livroController.update(req, res))
    .delete((req, res) => livroController.delete(req, res));


router.route("/livros/:idO/edicoes")
    .post((req, res) => livroController.createEdicao(req, res));

router.route("/livros/:idO/edicoes/:iSBN")
    .delete((req, res) => livroController.deleteEdicao(req, res));


router.route("/livros/:idO/edicoes/:iSBN/exemplares")
    .post((req, res) => livroController.createExemplar(req, res));

router.route("/livros/:idO/edicoes/:iSBN/exemplares/:idEx")
    .delete((req, res) => livroController.deleteExemplar(req, res));

module.exports = router;
