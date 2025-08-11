const Router = require('express')
const router = new Router()

const worksRouter = require('./content-routes')
const toolsRouter = require('./tools-routes')
const userRouter = require('./user-routes')
const booksRouter = require('./books-routes')
const genresRouter = require('./genre-router')
const articleTypesRouter = require('./article-types-router')
const authorRouter = require('./author-router')

router.use("/articles", worksRouter)
router.use("/tools", toolsRouter)
router.use("/user", userRouter)
router.use("/books", booksRouter)
router.use("/genres", genresRouter)
router.use("/article-types", articleTypesRouter)
router.use("/authors", authorRouter)

module.exports = router