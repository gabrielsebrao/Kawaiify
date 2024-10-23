import Express from 'express'
import controller from '../controllers/controllers_clients.js'
import cookieValidator  from '../middlewares/validator_cookies.js'
const router = Express.Router()

router.post('/signup', controller.createClient)
router.delete('/', cookieValidator, controller.deleteClient)

export default router
