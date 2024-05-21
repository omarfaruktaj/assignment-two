import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import AppError from '../utils/app-error'

const validateObjectId = (paramName: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const id = req.params[paramName]

    if (!mongoose.isValidObjectId(id)) {
      return next(new AppError(`Please provide a valid ${paramName}.`, 400))
    }
    next()
  }
}

export default validateObjectId
