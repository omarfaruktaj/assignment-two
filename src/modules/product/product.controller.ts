import { Request, Response, NextFunction } from 'express'
import productValidationSchema from './product.validation'
import productService from './product.service'

const createAProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = productValidationSchema.safeParse(req.body)

    if (!result.success) {
      return next(result.error)
    }
    const product = await productService.createAProduct(result.data)

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: product
    })
  } catch (error) {
    next(error)
  }
}

export default { createAProduct }
