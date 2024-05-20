import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/app-error'
import { envConfig } from '../config/env'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: AppError, req: Request, res: Response, next: NextFunction) => {
  const nodeEnv = envConfig.get('NODE_ENV')
  if (nodeEnv == 'development') {
    handleDevelopmentError(error, req, res)
  } else if (nodeEnv == 'production') {
    const err = { ...error }

    err.message = error.message
    err.status = err.status || 'error'
    err.statusCode = err.statusCode || 500

    handleProductionError(err, req, res)
  }
}
