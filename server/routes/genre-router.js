const Router = require('express')
const router = new Router()

const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const genreController = require("../controllers/genre-controller");

router.get("/", genreController.getGenre)
router.get("/:id", genreController.getGenre)
router.post("/new", checkRoleMiddleware("ADMIN"), genreController.addGenre)
router.delete("/:id", checkRoleMiddleware("ADMIN"), genreController.removeGenre)

module.exports = router