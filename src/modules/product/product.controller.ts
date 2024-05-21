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

const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAllProducts()

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: products
    })
  } catch (error) {
    next(error)
  }
}

export default { createAProduct, getAllProduct }
