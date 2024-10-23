import Express from 'express'
import controller from '../controllers/controllers_authentication.js'
import cookieValidator from '../middlewares/validator_cookies.js'
const router = Express.Router()

router.post('/login', controller.loginAuth)
router.get('/logout', cookieValidator, controller.logoutAuth)

export default router
