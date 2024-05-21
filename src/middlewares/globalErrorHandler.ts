import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/app-error'
import { envConfig } from '../config/env'
import { ZodError } from 'zod'

const handleDevelopmentError = (err: AppError, _req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  })
}

const handleProductionError = (err: AppError, req: Request, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  })
}

const handleZodError = (err: ZodError) => {
  const message = err.errors.reduce<string[]>((acc, err) => {
    acc.push(err.message)

    return acc
  }, [])

  return new AppError(message.join(','), 400)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const nodeEnv = envConfig.get('NODE_ENV')
  if (nodeEnv == 'development') {
    handleDevelopmentError(error, req, res)
  } else if (nodeEnv == 'production') {
    let err = { ...error }

    err.message = error.message
    err.status = err.status || 'error'
    err.statusCode = err.statusCode || 500

    if (error instanceof ZodError) err = handleZodError(error)
    handleProductionError(err, req, res)
  }
}
