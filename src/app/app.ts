import express, { Request, Response } from 'express'
import cors from 'cors'

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

export default app
