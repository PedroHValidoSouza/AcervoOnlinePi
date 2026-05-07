
const LivroController = require("../controladores/LivroController");
const router = require("express").Router();

router.route("/Livros")
.post((requisicao, resposta) => LivroController.create(requisicao, resposta))

module.exports = router;