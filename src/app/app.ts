import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import AppError from '../utils/app-error'
import globalErrorHandler from '../middlewares/globalErrorHandler'

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routes

// check health
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running smoothly.'
  })
})

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server.`, 404))
})

app.use(globalErrorHandler)

export default app
