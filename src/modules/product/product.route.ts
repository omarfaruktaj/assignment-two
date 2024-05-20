import { Router } from 'express'
import productController from './product.controller'

const router = Router()

router.post('/products', productController.createAProduct)

export default router
