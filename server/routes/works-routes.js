const Router = require('express')
const router = new Router()

const contentController = require("../controllers/content-controller")

router.get("/", contentController.GetAllArticles)
router.get("/:id", contentController.GetArticle)
router.post("/new", contentController.CreateArticle)

module.exports = router
