import { Request, Response } from 'express'
import prisma from '../db/client'

export const getAllBooks = async (_: Request, res: Response) => {
    const books = await prisma.book.findMany()
    return res.status(200).json({ books })
}

export const getUniqueBook = async (req: Request, res: Response) => {
    const book = await prisma.book.findUnique({
        where: { id: +req.params.id },
    })

    if (!book) return res.status(404).json({ message: 'Book not found' })
    return res.status(200).json({ book })
}

const purchase = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        try {
            const book = await tx.book.update({
                where: { id },
                data: { availableStock: { decrement: 1 } },
            })

            if (book.availableStock < 0) {
                throw new Error(
                    `Book '${book.title}' is currently out of stock`
                )
            }
            return book
        } catch (err) {
            if (err instanceof Error) {
                if (/record to update not found/i.test(err.message)) {
                    throw new Error('Book not found')
                } else {
                    throw err
                }
            }
        }
    })
}

export const purchaseBook = async (req: Request, res: Response) => {
    try {
        const book = await purchase(+req.params.id)
        return res.status(200).send({ message: 'Purchase successful', book })
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({ message: err.message })
        } else {
            return res.status(500).send({ message: 'Something went wrong' })
        }
    }
}
