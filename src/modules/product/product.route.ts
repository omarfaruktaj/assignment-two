import { Router } from 'express'
import productController from './product.controller'
import validateObjectId from '../../middlewares/validateObjectId'

const router = Router()

router
  .route('/products')
  .post(productController.createAProduct)
  .get(productController.getAllProduct)

router
  .route('/products/:productId')
  .get(validateObjectId('productId'), productController.getAProductById)
  .put(validateObjectId('productId'), productController.updateProductById)
  .delete(validateObjectId('productId'), productController.deleteProductById)

export default router
