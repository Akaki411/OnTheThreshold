const Router = require('express')
const router = new Router()

const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const authorController = require("../controllers/author-controller");

router.get("/", authorController.getAllAuthors)
router.get("/:id", authorController.getAuthor)
router.post("/new", checkRoleMiddleware("ADMIN"), authorController.createAuthor)
router.put("/:id", checkRoleMiddleware("ADMIN"), authorController.updateAuthor)
router.delete("/:id", checkRoleMiddleware("ADMIN"), authorController.deleteAuthor)

module.exports = router