import app from './app/app'
import connectDatabase from './config/db'
import { envConfig } from './config/env'

const port = envConfig.get('PORT')

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
  })
}

connectDatabase().then(startServer)
