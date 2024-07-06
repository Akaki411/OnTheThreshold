const Router = require('express')
const router = new Router()

const contentController = require("../controllers/content-controller")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.get("/", contentController.GetAllArticles)
router.get("/:id", contentController.GetArticle)
router.post("/new", checkRoleMiddleware("ADMIN"), contentController.CreateArticle)

module.exports = router
