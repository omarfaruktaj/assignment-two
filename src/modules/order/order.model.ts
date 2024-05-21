import mongoose, { Schema, model } from 'mongoose'
import Order from './order.interface'
import isEmail from 'validator/lib/isEmail'

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (value: string) => isEmail(value),
      message: (props) => `${props} is not valid email.`
    }
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.']
  },
  quantity: { type: Number, required: [true, 'Product quantity is required'] }
})

const OrderModel = model<Order>('Order', orderSchema)

export default OrderModel
