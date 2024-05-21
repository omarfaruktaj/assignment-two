import Product from './product.interface'
import productModel from './product.model'

const createAProduct = (data: Product) => {
  return productModel.create(data)
}

const getAllProducts = () => {
  return productModel.find()
}

export default {
  createAProduct,
  getAllProducts
}
