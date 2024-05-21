import { Router } from 'express'
import orderController from './order.controller'

const router = Router()

router.route('/orders').post(orderController.createOrder).get(orderController.getOrders)
export default router
