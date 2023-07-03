import { Request, Response } from 'express'
import prisma from '../db/client'

export const getAllBooks = async (_: Request, res: Response) => {
    const books = await prisma.book.findMany()
    res.status(200).json({ books })
}

export const getUniqueBook = async (req: Request, res: Response) => {
    // TODO: handle errors
    const book = await prisma.book.findUnique({
        where: { id: Number(req.params.id) },
    })
    res.status(200).json({ book })
}

export const purchaseBook = async (req: Request, res: Response) => {
    // TODO: trigger purchase
    // TODO: handle errors
    const book = await prisma.book.update({
        where: { id: Number(req.params.id) },
        data: { availableStock: { decrement: 1 } },
    })

    res.status(200).send({ message: 'Purchase successful', book })
}
