import AppError from '../../utils/app-error'
import Product from './product.interface'
import ProductModel from './product.model'

const createAProduct = (data: Product) => {
  return ProductModel.create(data)
}

const getAllProducts = () => {
  return ProductModel.find()
}
const getAProductById = (id: string) => {
  return ProductModel.findById(id)
}

const updateProductById = async (id: string, data: Product) => {
  const product = await ProductModel.findById(id)

  if (!product) throw new AppError('No product found.', 400)

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })

  return updatedProduct
}

const deleteProductById = async (id: string) => {
  const product = await ProductModel.findById(id)

  if (!product) throw new AppError('No product found.', 400)

  const deletedProduct = await ProductModel.findByIdAndDelete(id)

  return deletedProduct
}

export default {
  createAProduct,
  getAllProducts,
  getAProductById,
  updateProductById,
  deleteProductById
}
