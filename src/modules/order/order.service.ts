import Order from './order.interface'
import productService from '../product/product.service'
import OrderModel from './order.model'

const createOrder = async (data: Order) => {
  const { email, price, productId, quantity } = data

  await productService.updateProductInventory(productId, quantity)

  const order = await OrderModel.create({ email, productId, price, quantity })
  return order
}
const getOrders = (email?: string) => {
  if (email) {
    return OrderModel.find({ email })
  }
  return OrderModel.find()
}

export default {
  createOrder,
  getOrders
}
