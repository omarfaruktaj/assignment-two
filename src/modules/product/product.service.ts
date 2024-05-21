import Product from './product.interface'
import productModel from './product.model'

const createAProduct = (data: Product) => {
  return productModel.create(data)
}

const getAllProducts = () => {
  return productModel.find()
}
const getAProductById = (id: string) => {
  return productModel.findById(id)
}

const updateProductById = (id: string, data: Product) => {
  return productModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

export default {
  createAProduct,
  getAllProducts,
  getAProductById,
  updateProductById
}
