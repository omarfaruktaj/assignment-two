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
    const searchTerm: string | undefined = req.query.searchTerm as string

    const products = await productService.getAllProducts(searchTerm)

    if (searchTerm) {
      return res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: products
      })
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: products
    })
  } catch (error) {
    next(error)
  }
}
const getAProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params

    const product = await productService.getAProductById(productId)

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: product
    })
  } catch (error) {
    next(error)
  }
}
const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    const result = productValidationSchema.safeParse(req.body)

    if (!result.success) {
      return next(result.error)
    }

    const product = await productService.updateProductById(productId, result.data)

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: product
    })
  } catch (error) {
    next(error)
  }
}
const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params

    await productService.deleteProductById(productId)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createAProduct,
  getAllProduct,
  getAProductById,
  updateProductById,
  deleteProductById
}
