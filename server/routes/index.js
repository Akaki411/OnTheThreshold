const Router = require('express')
const router = new Router()

const worksRouter = require('./works-routes')
const toolsRouter = require('./tools-routes')
const userRouter = require('./user-routes')

router.use("/articles", worksRouter)
router.use("/tools", toolsRouter)
router.use("/user", userRouter)

module.exports = router