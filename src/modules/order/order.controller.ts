import { NextFunction, Request, Response } from 'express'
import orderService from './order.service'
import orderValidationSchema from './order.validation'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const result = orderValidationSchema.safeParse(req.body)

  if (!result.success) return next(result.error)

  try {
    const order = await orderService.createOrder(result.data)

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createOrder
}
