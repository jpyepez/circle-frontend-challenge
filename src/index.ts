import express from 'express'
import prisma from './db/client'

const app = express()
const port = 8000

app.use(express.json())

app.get('/books', async (_, res) => {
    const books = await prisma.book.findMany()
    res.status(200).json(books)
})

app.get('/book/:id', (req, res) => {
    res.status(200).send(`Book ${req.params.id}`)
})

app.post('/book/:id/reviews/new', (req, res) => {
    res.status(200).send(`New Review for book ${req.params.id}`)
})

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})
