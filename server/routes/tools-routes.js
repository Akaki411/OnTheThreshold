const Router = require('express')
const router = new Router()

const toolsController = require("../controllers/tools-controller")

router.get("/parse-link", toolsController.LinkParser)
router.post("/upload-image", toolsController.UploadImage)


module.exports = router
