import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import AppError from '../utils/app-error'
import globalErrorHandler from '../middlewares/globalErrorHandler'
import productRoute from '../modules/product/product.route'
import orderRoute from '../modules/order/order.route'
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api', productRoute)
app.use('/api', orderRoute)
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
