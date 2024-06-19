const Router = require('express')
const router = new Router()

const worksRouter = require('./works-routes')

router.use("/articles", worksRouter)

module.exports = router
