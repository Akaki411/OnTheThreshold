const Router = require('express')
const router = new Router()

const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const articleTypeController = require("../controllers/article-type-controller");

router.get("/", articleTypeController.getAllArticleTypes)
router.get("/visible", articleTypeController.getAllVisibleArticleTypes)
router.get("/name", articleTypeController.getArticleTypeByName)
router.get("/:id", articleTypeController.getArticleTypeById)
router.put("/", checkRoleMiddleware("ADMIN"), articleTypeController.changeShowPages)
router.post("/new", checkRoleMiddleware("ADMIN"), articleTypeController.createArticleType)
router.delete("/:id", checkRoleMiddleware("ADMIN"), articleTypeController.deleteArticleType)

module.exports = router