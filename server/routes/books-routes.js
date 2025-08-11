const Router = require('express')
const router = new Router()

const booksController = require("../controllers/books-controller")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/", booksController.getBooks)
router.get("/:id", booksController.getBook)
router.post("/new", checkRoleMiddleware("ADMIN"), booksController.createBook)
router.put("/:id", checkRoleMiddleware("ADMIN"), booksController.updateBook)
router.delete("/:id", checkRoleMiddleware("ADMIN"), booksController.deleteBook)


module.exports = router