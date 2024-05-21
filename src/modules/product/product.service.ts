import AppError from '../../utils/app-error'
import Product from './product.interface'
import ProductModel from './product.model'

const createAProduct = (data: Product) => {
  return ProductModel.create(data)
}

const getAllProducts = (searchTerm?: string) => {
  if (searchTerm) {
    return ProductModel.find({ $text: { $search: searchTerm as string } })
  }
  return ProductModel.find()
}
const getAProductById = (id: string) => {
  return ProductModel.findById(id)
}

const updateProductById = async (id: string, data: Product) => {
  const product = await ProductModel.findById(id)

  if (!product) throw new AppError('No product found.', 404)

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })

  return updatedProduct
}

const deleteProductById = async (id: string) => {
  const product = await ProductModel.findById(id)

  if (!product) throw new AppError('No product found.', 404)

  const deletedProduct = await ProductModel.findByIdAndDelete(id)

  return deletedProduct
}

const updateProductInventory = async (productId: string, quantity: number) => {
  const product = await ProductModel.findById(productId)

  if (!product) throw new AppError('No product found.', 404)

  if (product.inventory.quantity < quantity) throw new AppError('Insufficient stock', 400)

  const updatedQuantity = product.inventory.quantity - quantity

  product.inventory.quantity = updatedQuantity

  product.inventory.inStock = updatedQuantity > 0

  await product.save()
  return product
}

export default {
  createAProduct,
  getAllProducts,
  getAProductById,
  updateProductById,
  deleteProductById,
  updateProductInventory
}
