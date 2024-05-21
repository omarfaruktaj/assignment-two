import { Router } from 'express'
import productController from './product.controller'

const router = Router()

router
  .route('/products')
  .post(productController.createAProduct)
  .get(productController.getAllProduct)

router
  .route('/products/:productId')
  .get(productController.getAProductById)
  .put(productController.updateProductById)

export default router
