import { Router } from 'express'
import productController from './product.controller'

const router = Router()

router.post('/products', productController.createAProduct)
router
  .route('/products')
  .post(productController.createAProduct)
  .get(productController.getAllProduct)
export default router
