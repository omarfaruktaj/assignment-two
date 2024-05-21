import Order from './order.interface'
import productService from '../product/product.service'
import OrderModel from './order.model'
import AppError from '../../utils/app-error'

const createOrder = async (data: Order) => {
  const { email, price, productId, quantity } = data

  await productService.updateProductInventory(productId, quantity)

  const order = await OrderModel.create({ email, productId, price, quantity })
  return order
}
const getOrders = async (email?: string) => {
  if (email) {
    const orders = await OrderModel.find({ email })

    if (orders.length == 0) {
      throw new AppError('Order not found', 404)
    }

    return orders
  }
  return OrderModel.find()
}

export default {
  createOrder,
  getOrders
}
