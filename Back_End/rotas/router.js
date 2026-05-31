const router = require('express').Router()

const livroRouter = require('./livroRouter');
router.use("/", livroRouter)
//use("/", livroRouter)

module.exports = router;