const router = require('express').Router()

const livroRouters = require('./LivroRotas');

router.use("/", livroRouters)

module.exports = router;