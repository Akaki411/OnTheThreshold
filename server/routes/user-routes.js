const Router = require('express')
const router = new Router()

const userController = require("../controllers/user-controller")
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/check/nickname', userController.check_nickname)
router.get('/check/email', userController.check_email)
router.get('/check/reg-token', userController.check_reg_token)

module.exports = router
