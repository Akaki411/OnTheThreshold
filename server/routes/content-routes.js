const Router = require('express')
const router = new Router()

const contentController = require("../controllers/content-controller")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware")

router.get("/", contentController.getAllArticles)
router.get("/:id", contentController.getArticle)
router.post("/new", checkRoleMiddleware("ADMIN"), contentController.createArticle)
router.put("/:id", checkRoleMiddleware("ADMIN"), contentController.updateArticle)
router.delete("/:id", checkRoleMiddleware("ADMIN"), contentController.deleteArticle)

module.exports = router
