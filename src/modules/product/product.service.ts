import Product from './product.interface'
import productModel from './product.model'

const createAProduct = (data: Product) => {
  return productModel.create(data)
}

export default {
  createAProduct
}
