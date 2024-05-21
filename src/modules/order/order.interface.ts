import mongoose from 'mongoose'

interface Order {
  email: string
  productId: mongoose.Schema.Types.ObjectId
  price: number
  quantity: number
}

export default Order
