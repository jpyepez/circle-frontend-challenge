import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const port = 8000

app.use(express.json())

app.use('/books', booksRouter)

app.use(errorHandler)

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})
