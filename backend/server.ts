import './load-env'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/error.middleware'
import reportRouter from './routes/report.routes'

const app = express()
const port = Number(process.env.PORT) || 4000

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Mount report routes under /api/reports
app.use('/api/reports', reportRouter)

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Pulseboard API listening on http://localhost:${port}`)
})

export default app
