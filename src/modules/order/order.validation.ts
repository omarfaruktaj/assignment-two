import { z } from 'zod'

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string(),
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().positive('Quantity must be a positive number')
})

export default orderValidationSchema
